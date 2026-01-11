<?php

namespace Tests\Feature;

use App\Models\PatientCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientCaseTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * 症例一覧取得テスト
     */
    public function test_user_can_get_patient_cases_list(): void
    {
        PatientCase::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/patient-cases');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /**
     * 他のユーザーの症例は取得できない
     */
    public function test_user_cannot_get_other_users_patient_cases(): void
    {
        $otherUser = User::factory()->create();
        PatientCase::factory()->count(2)->create(['user_id' => $otherUser->id]);
        PatientCase::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/patient-cases');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    /**
     * 症例詳細取得テスト
     */
    public function test_user_can_get_patient_case_detail(): void
    {
        $case = PatientCase::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/patient-cases/{$case->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $case->id,
                'animal_type' => $case->animal_type,
            ]);
    }

    /**
     * 他のユーザーの症例詳細は取得できない
     */
    public function test_user_cannot_get_other_users_patient_case_detail(): void
    {
        $otherUser = User::factory()->create();
        $case = PatientCase::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/patient-cases/{$case->id}");

        $response->assertStatus(404);
    }

    /**
     * 症例作成テスト
     */
    public function test_user_can_create_patient_case(): void
    {
        $caseData = [
            'animal_type' => '犬',
            'breed' => '柴犬',
            'age' => 5,
            'sex' => 'オス',
            'chief_complaint' => '食欲不振',
            'history' => '3日前から食欲がない',
            'examination' => '体温39.5度、脱水あり',
            'diagnosis' => '胃腸炎',
            'treatment' => '点滴、制吐剤投与',
            'progress' => '翌日改善',
            'memo' => 'フォローアップ予定',
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/patient-cases', $caseData);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'animal_type' => '犬',
                'breed' => '柴犬',
            ]);

        $this->assertDatabaseHas('patient_cases', [
            'user_id' => $this->user->id,
            'animal_type' => '犬',
        ]);
    }

    /**
     * 症例作成失敗テスト（バリデーションエラー）
     */
    public function test_user_cannot_create_patient_case_without_required_fields(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/patient-cases', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['animal_type', 'chief_complaint', 'diagnosis']);
    }

    /**
     * 症例更新テスト
     */
    public function test_user_can_update_patient_case(): void
    {
        $case = PatientCase::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/patient-cases/{$case->id}", [
                'animal_type' => '猫',
                'breed' => 'アメリカンショートヘア',
                'age' => 3,
                'sex' => 'メス',
                'chief_complaint' => '咳',
                'diagnosis' => '気管支炎',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'animal_type' => '猫',
                'diagnosis' => '気管支炎',
            ]);
    }

    /**
     * 他のユーザーの症例は更新できない
     */
    public function test_user_cannot_update_other_users_patient_case(): void
    {
        $otherUser = User::factory()->create();
        $case = PatientCase::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/patient-cases/{$case->id}", [
                'animal_type' => '猫',
                'chief_complaint' => '咳',
                'diagnosis' => '気管支炎',
            ]);

        $response->assertStatus(404);
    }

    /**
     * 症例削除テスト（論理削除）
     */
    public function test_user_can_delete_patient_case(): void
    {
        $case = PatientCase::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/patient-cases/{$case->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => '症例を削除しました',
            ]);

        $this->assertSoftDeleted('patient_cases', ['id' => $case->id]);
    }

    /**
     * 他のユーザーの症例は削除できない
     */
    public function test_user_cannot_delete_other_users_patient_case(): void
    {
        $otherUser = User::factory()->create();
        $case = PatientCase::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/patient-cases/{$case->id}");

        $response->assertStatus(404);
        $this->assertDatabaseHas('patient_cases', ['id' => $case->id, 'deleted_at' => null]);
    }

    /**
     * 未認証ユーザーは症例一覧を取得できない
     */
    public function test_unauthenticated_user_cannot_get_patient_cases(): void
    {
        $response = $this->getJson('/api/patient-cases');

        $response->assertStatus(401);
    }
}
