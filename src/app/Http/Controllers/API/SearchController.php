<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PatientCase;
use App\Models\SeminarNote;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class SearchController extends Controller
{
    /**
     * 検索クエリをパースしてAND/OR条件の配列に変換
     * スペース区切り = AND、カンマ区切り = OR
     * 例: "犬 骨折" → [['犬', '骨折']] (AND)
     * 例: "犬,猫" → [['犬'], ['猫']] (OR)
     * 例: "犬,猫 骨折" → [['犬'], ['猫', '骨折']] (犬 OR (猫 AND 骨折))
     *
     * @param string $query
     * @return array<array<string>> ORグループの配列、各グループ内はAND条件
     */
    private function parseSearchQuery(string $query): array
    {
        $orGroups = [];

        // カンマでOR分割
        $orParts = explode(',', $query);

        foreach ($orParts as $orPart) {
            $orPart = trim($orPart);
            if (empty($orPart)) {
                continue;
            }

            // スペースでAND分割（連続スペースも考慮）
            $andKeywords = preg_split('/\s+/', $orPart, -1, PREG_SPLIT_NO_EMPTY);

            if (!empty($andKeywords)) {
                $orGroups[] = $andKeywords;
            }
        }

        return $orGroups;
    }

    /**
     * 指定フィールドに対してキーワードのLIKE条件を追加
     *
     * @param Builder $query
     * @param array<string> $fields
     * @param string $keyword
     * @return void
     */
    private function addKeywordCondition(Builder $query, array $fields, string $keyword): void
    {
        $query->where(function ($q) use ($fields, $keyword) {
            foreach ($fields as $index => $field) {
                if ($index === 0) {
                    $q->where($field, 'like', "%{$keyword}%");
                } else {
                    $q->orWhere($field, 'like', "%{$keyword}%");
                }
            }
        });
    }

    /**
     * 症例とセミナーノートを横断検索
     * スペース区切り = AND検索、カンマ区切り = OR検索
     */
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $userId = $request->user()->id;

        if (empty(trim($query))) {
            return response()->json([
                'patient_cases' => [],
                'seminar_notes' => [],
            ]);
        }

        $orGroups = $this->parseSearchQuery($query);

        if (empty($orGroups)) {
            return response()->json([
                'patient_cases' => [],
                'seminar_notes' => [],
            ]);
        }

        // 症例の検索対象フィールド
        $caseFields = [
            'animal_type',
            'breed',
            'chief_complaint',
            'diagnosis',
            'history',
            'examination',
            'treatment',
            'progress',
            'memo',
        ];

        // セミナーノートの検索対象フィールド
        $noteFields = [
            'seminar_name',
            'lecturer',
            'theme',
            'content',
        ];

        // 症例を検索
        $patientCases = PatientCase::where('user_id', $userId)
            ->where(function ($mainQuery) use ($orGroups, $caseFields) {
                foreach ($orGroups as $groupIndex => $andKeywords) {
                    $mainQuery->orWhere(function ($andQuery) use ($andKeywords, $caseFields) {
                        foreach ($andKeywords as $keyword) {
                            $this->addKeywordCondition($andQuery, $caseFields, $keyword);
                        }
                    });
                }
            })
            ->orderBy('created_at', 'desc')
            ->get();

        // セミナーノートを検索
        $seminarNotes = SeminarNote::where('user_id', $userId)
            ->where(function ($mainQuery) use ($orGroups, $noteFields) {
                foreach ($orGroups as $groupIndex => $andKeywords) {
                    $mainQuery->orWhere(function ($andQuery) use ($andKeywords, $noteFields) {
                        foreach ($andKeywords as $keyword) {
                            $this->addKeywordCondition($andQuery, $noteFields, $keyword);
                        }
                    });
                }
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'patient_cases' => $patientCases,
            'seminar_notes' => $seminarNotes,
        ]);
    }
}
