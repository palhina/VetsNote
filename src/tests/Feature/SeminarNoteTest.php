<?php

namespace Tests\Feature;

use App\Models\SeminarNote;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeminarNoteTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * セミナーノート一覧取得テスト
     */
    public function test_user_can_get_seminar_notes_list(): void
    {
        SeminarNote::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/seminar-notes');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /**
     * 他のユーザーのセミナーノートは取得できない
     */
    public function test_user_cannot_get_other_users_seminar_notes(): void
    {
        $otherUser = User::factory()->create();
        SeminarNote::factory()->count(2)->create(['user_id' => $otherUser->id]);
        SeminarNote::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/seminar-notes');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    /**
     * セミナーノート詳細取得テスト
     */
    public function test_user_can_get_seminar_note_detail(): void
    {
        $note = SeminarNote::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/seminar-notes/{$note->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $note->id,
                'seminar_name' => $note->seminar_name,
            ]);
    }

    /**
     * 他のユーザーのセミナーノート詳細は取得できない
     */
    public function test_user_cannot_get_other_users_seminar_note_detail(): void
    {
        $otherUser = User::factory()->create();
        $note = SeminarNote::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/seminar-notes/{$note->id}");

        $response->assertStatus(404);
    }

    /**
     * セミナーノート作成テスト
     */
    public function test_user_can_create_seminar_note(): void
    {
        $noteData = [
            'seminar_name' => '獣医内科学セミナー',
            'held_on' => '2024-01-15',
            'lecturer' => '山田太郎先生',
            'theme' => '犬の糖尿病管理',
            'content' => 'インスリン療法について学んだ。食事療法も重要。',
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/seminar-notes', $noteData);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'seminar_name' => '獣医内科学セミナー',
                'lecturer' => '山田太郎先生',
            ]);

        $this->assertDatabaseHas('seminar_notes', [
            'user_id' => $this->user->id,
            'seminar_name' => '獣医内科学セミナー',
        ]);
    }

    /**
     * セミナーノート作成失敗テスト（バリデーションエラー）
     */
    public function test_user_cannot_create_seminar_note_without_required_fields(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/seminar-notes', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['seminar_name', 'held_on', 'content']);
    }

    /**
     * セミナーノート更新テスト
     */
    public function test_user_can_update_seminar_note(): void
    {
        $note = SeminarNote::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/seminar-notes/{$note->id}", [
                'seminar_name' => '更新されたセミナー名',
                'held_on' => '2024-02-20',
                'lecturer' => '佐藤花子先生',
                'theme' => '猫の腎臓病',
                'content' => '更新された内容',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'seminar_name' => '更新されたセミナー名',
            ]);
    }

    /**
     * 他のユーザーのセミナーノートは更新できない
     */
    public function test_user_cannot_update_other_users_seminar_note(): void
    {
        $otherUser = User::factory()->create();
        $note = SeminarNote::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/seminar-notes/{$note->id}", [
                'seminar_name' => '更新されたセミナー名',
                'held_on' => '2024-02-20',
                'content' => '更新された内容',
            ]);

        $response->assertStatus(404);
    }

    /**
     * セミナーノート削除テスト（論理削除）
     */
    public function test_user_can_delete_seminar_note(): void
    {
        $note = SeminarNote::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/seminar-notes/{$note->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'セミナーノートを削除しました',
            ]);

        $this->assertSoftDeleted('seminar_notes', ['id' => $note->id]);
    }

    /**
     * 他のユーザーのセミナーノートは削除できない
     */
    public function test_user_cannot_delete_other_users_seminar_note(): void
    {
        $otherUser = User::factory()->create();
        $note = SeminarNote::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/seminar-notes/{$note->id}");

        $response->assertStatus(404);
        $this->assertDatabaseHas('seminar_notes', ['id' => $note->id, 'deleted_at' => null]);
    }

    /**
     * 未認証ユーザーはセミナーノート一覧を取得できない
     */
    public function test_unauthenticated_user_cannot_get_seminar_notes(): void
    {
        $response = $this->getJson('/api/seminar-notes');

        $response->assertStatus(401);
    }
}
