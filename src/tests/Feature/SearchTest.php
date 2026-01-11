<?php

namespace Tests\Feature;

use App\Models\PatientCase;
use App\Models\SeminarNote;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * 症例とセミナーノートを横断検索できる
     */
    public function test_user_can_search_across_cases_and_notes(): void
    {
        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
            'diagnosis' => '骨折',
        ]);

        SeminarNote::factory()->create([
            'user_id' => $this->user->id,
            'seminar_name' => '犬の整形外科セミナー',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=犬');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'patient_cases',
                'seminar_notes',
            ])
            ->assertJsonCount(1, 'patient_cases')
            ->assertJsonCount(1, 'seminar_notes');
    }

    /**
     * AND検索テスト（スペース区切り）
     */
    public function test_search_with_and_condition(): void
    {
        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
            'diagnosis' => '骨折',
        ]);

        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
            'diagnosis' => '胃腸炎',
        ]);

        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '猫',
            'diagnosis' => '骨折',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=' . urlencode('犬 骨折'));

        $response->assertStatus(200)
            ->assertJsonCount(1, 'patient_cases');
    }

    /**
     * OR検索テスト（カンマ区切り）
     */
    public function test_search_with_or_condition(): void
    {
        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
            'diagnosis' => '骨折',
        ]);

        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '猫',
            'diagnosis' => '胃腸炎',
        ]);

        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => 'ウサギ',
            'diagnosis' => '皮膚炎',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=' . urlencode('犬,猫'));

        $response->assertStatus(200)
            ->assertJsonCount(2, 'patient_cases');
    }

    /**
     * 空のクエリでは空の結果を返す
     */
    public function test_empty_query_returns_empty_results(): void
    {
        PatientCase::factory()->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=');

        $response->assertStatus(200)
            ->assertJson([
                'patient_cases' => [],
                'seminar_notes' => [],
            ]);
    }

    /**
     * 他のユーザーのデータは検索結果に含まれない
     */
    public function test_search_does_not_include_other_users_data(): void
    {
        $otherUser = User::factory()->create();

        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
        ]);

        PatientCase::factory()->create([
            'user_id' => $otherUser->id,
            'animal_type' => '犬',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=犬');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'patient_cases');
    }

    /**
     * セミナーノートの各フィールドで検索できる
     */
    public function test_search_seminar_notes_by_different_fields(): void
    {
        SeminarNote::factory()->create([
            'user_id' => $this->user->id,
            'seminar_name' => 'テストセミナー',
            'lecturer' => '山田太郎',
            'theme' => '犬の病気',
            'content' => '猫の治療について',
        ]);

        // セミナー名で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=テストセミナー');
        $response->assertJsonCount(1, 'seminar_notes');

        // 講師名で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=山田太郎');
        $response->assertJsonCount(1, 'seminar_notes');

        // テーマで検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=犬の病気');
        $response->assertJsonCount(1, 'seminar_notes');

        // 内容で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=猫の治療');
        $response->assertJsonCount(1, 'seminar_notes');
    }

    /**
     * 症例の各フィールドで検索できる
     */
    public function test_search_patient_cases_by_different_fields(): void
    {
        PatientCase::factory()->create([
            'user_id' => $this->user->id,
            'animal_type' => '犬',
            'breed' => '柴犬',
            'chief_complaint' => '食欲不振',
            'diagnosis' => '胃腸炎',
            'treatment' => '点滴療法',
            'memo' => 'フォローアップ必要',
        ]);

        // 動物種で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=犬');
        $response->assertJsonCount(1, 'patient_cases');

        // 品種で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=柴犬');
        $response->assertJsonCount(1, 'patient_cases');

        // 主訴で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=食欲不振');
        $response->assertJsonCount(1, 'patient_cases');

        // 診断で検索
        $response = $this->actingAs($this->user)
            ->getJson('/api/search?q=胃腸炎');
        $response->assertJsonCount(1, 'patient_cases');
    }

    /**
     * 未認証ユーザーは検索できない
     */
    public function test_unauthenticated_user_cannot_search(): void
    {
        $response = $this->getJson('/api/search?q=犬');

        $response->assertStatus(401);
    }
}
