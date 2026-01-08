<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeminarNoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seminarNotes = [
            [
                'user_id' => 1,
                'seminar_name' => '小動物内科学セミナー2024',
                'held_on' => '2024-03-15',
                'lecturer' => '鈴木獣医師',
                'theme' => '犬の慢性腎臓病の最新治療',
                'content' => '慢性腎臓病（CKD）のステージ分類と各ステージに応じた治療戦略について学んだ。IRIS分類に基づく治療アプローチ、食事療法の重要性、リン吸着剤の使用タイミングなどが解説された。',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'seminar_name' => '猫の行動学ウェビナー',
                'held_on' => '2024-04-20',
                'lecturer' => '高橋行動学専門医',
                'theme' => '問題行動への対処法',
                'content' => '猫の不適切な排泄、攻撃行動、過剰グルーミングなどの問題行動について、原因の特定方法と行動修正テクニックを学んだ。環境エンリッチメントの重要性も強調された。',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'seminar_name' => '獣医外科手技研修会',
                'held_on' => '2024-05-10',
                'lecturer' => '伊藤外科専門医',
                'theme' => '腹腔鏡手術の基礎',
                'content' => '腹腔鏡下での避妊手術、臓器生検の手技について実習を交えて学んだ。ポート設置位置、気腹圧の管理、術後管理のポイントが詳細に解説された。',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'seminar_name' => '小動物皮膚科アップデート2024',
                'held_on' => '2024-06-22',
                'lecturer' => '渡辺皮膚科専門医',
                'theme' => 'アトピー性皮膚炎の新規治療薬',
                'content' => '犬のアトピー性皮膚炎に対するJAK阻害剤（オクラシチニブ）とIL-31モノクローナル抗体（ロキベトマブ）の使い分けについて学んだ。長期投与時のモニタリング、副作用管理、コスト比較なども解説された。',
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'user_id' => 1,
                'seminar_name' => 'エキゾチックアニマル診療入門',
                'held_on' => '2024-07-08',
                'lecturer' => '中村エキゾチック専門医',
                'theme' => 'ウサギの消化器疾患',
                'content' => 'ウサギの消化管うっ滞（GI stasis）の病態生理、診断、治療について詳細に学んだ。予防的な飼育管理指導、緊急時の対応フロー、強制給餌の実践テクニックなどが紹介された。',
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(7),
            ],
            [
                'user_id' => 1,
                'seminar_name' => '獣医麻酔・疼痛管理セミナー',
                'held_on' => '2024-08-15',
                'lecturer' => '佐々木麻酔科専門医',
                'theme' => '周術期疼痛管理のマルチモーダルアプローチ',
                'content' => 'NSAIDs、オピオイド、局所麻酔薬、α2作動薬を組み合わせたマルチモーダル鎮痛の考え方を学んだ。短頭種や高齢動物のリスク評価、術後疼痛スコアリングの実践方法も解説された。',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
        ];

        DB::table('seminar_notes')->insert($seminarNotes);
    }
}
