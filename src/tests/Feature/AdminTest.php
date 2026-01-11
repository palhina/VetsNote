<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create([
            'role' => 'admin',
            'password' => Hash::make('adminpassword'),
        ]);
        $this->user = User::factory()->create([
            'role' => 'user',
        ]);
    }

    /**
     * 管理者ログイン成功テスト
     */
    public function test_admin_can_login(): void
    {
        $response = $this->postJson('/api/admin/login', [
            'email' => $this->admin->email,
            'password' => 'adminpassword',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Admin login successful',
            ])
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role'],
            ]);
    }

    /**
     * 一般ユーザーは管理者ログインできない
     */
    public function test_regular_user_cannot_admin_login(): void
    {
        $regularUser = User::factory()->create([
            'role' => 'user',
            'password' => Hash::make('userpassword'),
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => $regularUser->email,
            'password' => 'userpassword',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'Unauthorized. Admin access required.',
            ]);
    }

    /**
     * 管理者はユーザー一覧を取得できる
     */
    public function test_admin_can_get_users_list(): void
    {
        User::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'users' => [
                    '*' => ['id', 'name', 'email', 'role'],
                ],
            ]);
    }

    /**
     * 一般ユーザーはユーザー一覧を取得できない
     */
    public function test_regular_user_cannot_get_users_list(): void
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/admin/users');

        $response->assertStatus(403);
    }

    /**
     * 管理者はユーザーを作成できる
     */
    public function test_admin_can_create_user(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/users', [
                'name' => '新規ユーザー',
                'email' => 'newuser@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'user',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'User created successfully',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'role' => 'user',
        ]);
    }

    /**
     * 管理者はユーザー詳細を取得できる
     */
    public function test_admin_can_get_user_detail(): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson("/api/admin/users/{$this->user->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role'],
            ]);
    }

    /**
     * 管理者はユーザーを更新できる
     */
    public function test_admin_can_update_user(): void
    {
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/users/{$this->user->id}", [
                'name' => '更新されたユーザー名',
                'email' => $this->user->email,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User updated successfully',
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'name' => '更新されたユーザー名',
        ]);
    }

    /**
     * 管理者はユーザーを削除できる
     */
    public function test_admin_can_delete_user(): void
    {
        $userToDelete = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/users/{$userToDelete->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User deleted successfully',
            ]);

        $this->assertSoftDeleted('users', ['id' => $userToDelete->id]);
    }

    /**
     * 最後の管理者は削除できない
     */
    public function test_cannot_delete_last_admin(): void
    {
        // adminは現在1人だけ
        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/users/{$this->admin->id}");

        $response->assertStatus(400)
            ->assertJson([
                'message' => 'Cannot delete the last admin user',
            ]);
    }

    /**
     * 管理者が2人以上いれば削除可能
     */
    public function test_can_delete_admin_when_multiple_exist(): void
    {
        $anotherAdmin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/admin/users/{$anotherAdmin->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('users', ['id' => $anotherAdmin->id]);
    }

    /**
     * 管理者ログアウトテスト
     */
    public function test_admin_can_logout(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/admin/logout');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Logout successful',
            ]);
    }

    /**
     * 未認証ユーザーは管理者APIにアクセスできない
     */
    public function test_unauthenticated_user_cannot_access_admin_api(): void
    {
        $response = $this->getJson('/api/admin/users');

        $response->assertStatus(401);
    }
}
