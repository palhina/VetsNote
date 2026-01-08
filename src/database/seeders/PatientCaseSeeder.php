<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientCaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patientCases = [
            [
                'user_id' => 1,
                'animal_type' => '犬',
                'breed' => 'トイプードル',
                'age' => 8,
                'sex' => '去勢済みオス',
                'chief_complaint' => '食欲不振、多飲多尿',
                'history' => '3日前から食欲が低下。普段より水を多く飲み、排尿回数も増加。',
                'examination' => '体重4.2kg（前回5.0kg）、脱水軽度、腎臓触診で左腎腫大',
                'diagnosis' => '慢性腎臓病 IRIS Stage 2',
                'treatment' => '腎臓サポート食への変更、皮下輸液（隔日）、リン吸着剤投与開始',
                'progress' => '2週間後の再診で食欲改善、BUN/Creは横ばい。継続治療中。',
                'memo' => 'オーナーへの食事管理指導が必要',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'animal_type' => '猫',
                'breed' => 'スコティッシュフォールド',
                'age' => 5,
                'sex' => '避妊済みメス',
                'chief_complaint' => '跛行（右後肢）',
                'history' => '1週間前にキャットタワーから落下。その後、右後肢を挙上して歩行。',
                'examination' => '右膝関節に腫脹、屈曲時に疼痛あり、クレピタス(+)',
                'diagnosis' => '前十字靭帯断裂疑い',
                'treatment' => '鎮痛剤（メロキシカム）、ケージレスト2週間、整形外科専門病院への紹介検討',
                'progress' => '初診時。レントゲンで関節液貯留確認。MRI検査を推奨。',
                'memo' => '骨軟骨異形成症の既往あり、麻酔リスク要検討',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'animal_type' => '犬',
                'breed' => 'ゴールデンレトリバー',
                'age' => 10,
                'sex' => '未去勢オス',
                'chief_complaint' => '皮膚腫瘤',
                'history' => '2ヶ月前に右前肢に小さなしこりを発見。最近急速に増大。',
                'examination' => '右前肢外側に3cm大の皮下腫瘤、可動性良好、疼痛なし',
                'diagnosis' => '肥満細胞腫 Grade II（病理結果）',
                'treatment' => '外科的切除（マージン2cm確保）、術後病理で断端陰性確認',
                'progress' => '術後1ヶ月、創部治癒良好。3ヶ月毎の経過観察予定。',
                'memo' => '転移リスクあり、定期的なリンパ節・腹部エコー推奨',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'animal_type' => '猫',
                'breed' => 'アメリカンショートヘア',
                'age' => 12,
                'sex' => '去勢済みオス',
                'chief_complaint' => '嘔吐、食欲低下',
                'history' => '1週間前から間欠的な嘔吐。食欲が徐々に低下し、水も飲まなくなった。',
                'examination' => '体重減少（-0.8kg）、脱水中等度、腹部触診で腸管の肥厚を触知',
                'diagnosis' => '消化器型リンパ腫疑い',
                'treatment' => '輸液療法、制吐剤投与、内視鏡検査・生検を予定',
                'progress' => '生検結果待ち。オーナーに化学療法の選択肢について説明済み。',
                'memo' => '高齢のため麻酔リスク要注意。血液検査で軽度貧血あり。',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'user_id' => 1,
                'animal_type' => '犬',
                'breed' => 'フレンチブルドッグ',
                'age' => 4,
                'sex' => '未避妊メス',
                'chief_complaint' => '呼吸困難、いびき悪化',
                'history' => '以前からいびきがひどかったが、最近は運動後の呼吸困難が目立つ。',
                'examination' => '安静時でも努力性呼吸、軟口蓋過長、鼻腔狭窄を確認',
                'diagnosis' => '短頭種気道症候群（BOAS）',
                'treatment' => '軟口蓋切除術、外鼻孔拡大術を実施',
                'progress' => '術後2週間、呼吸状態は著明に改善。いびきも軽減。',
                'memo' => '体重管理の重要性をオーナーに指導。暑熱対策も必須。',
                'created_at' => now()->subDays(14),
                'updated_at' => now()->subDays(14),
            ],
            [
                'user_id' => 1,
                'animal_type' => 'ウサギ',
                'breed' => 'ホーランドロップ',
                'age' => 3,
                'sex' => '未去勢オス',
                'chief_complaint' => '食欲廃絶、排便停止',
                'history' => '昨日から牧草を食べず、糞が出ていない。じっとしてうずくまっている。',
                'examination' => '腹部膨満、触診で胃内容物の貯留を確認、低体温',
                'diagnosis' => '毛球症による消化管うっ滞',
                'treatment' => '輸液、消化管運動促進剤、強制給餌、腹部マッサージ',
                'progress' => '治療開始24時間後に排便再開。徐々に食欲回復中。',
                'memo' => '予防としてブラッシングの頻度を上げるよう指導。繊維質の多い食事を推奨。',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
        ];

        DB::table('patient_cases')->insert($patientCases);
    }
}
