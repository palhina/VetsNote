<?php

namespace App\Services;

use App\Models\PatientCase;
use App\Models\SeminarNote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class SearchService
{
    /**
     * 症例の検索対象フィールド
     */
    private const CASE_FIELDS = [
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

    /**
     * セミナーノートの検索対象フィールド
     */
    private const NOTE_FIELDS = [
        'seminar_name',
        'lecturer',
        'theme',
        'content',
    ];

    /**
     * 症例とセミナーノートを横断検索
     *
     * @param string $query
     * @param int $userId
     * @return array{patient_cases: Collection, seminar_notes: Collection}
     */
    public function search(string $query, int $userId): array
    {
        if (empty(trim($query))) {
            return [
                'patient_cases' => collect([]),
                'seminar_notes' => collect([]),
            ];
        }

        $orGroups = $this->parseSearchQuery($query);

        if (empty($orGroups)) {
            return [
                'patient_cases' => collect([]),
                'seminar_notes' => collect([]),
            ];
        }

        return [
            'patient_cases' => $this->searchPatientCases($orGroups, $userId),
            'seminar_notes' => $this->searchSeminarNotes($orGroups, $userId),
        ];
    }

    /**
     * 症例を検索
     *
     * @param array<array<string>> $orGroups
     * @param int $userId
     * @return Collection
     */
    private function searchPatientCases(array $orGroups, int $userId): Collection
    {
        return PatientCase::where('user_id', $userId)
            ->where(function ($mainQuery) use ($orGroups) {
                $this->applySearchConditions($mainQuery, $orGroups, self::CASE_FIELDS);
            })
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * セミナーノートを検索
     *
     * @param array<array<string>> $orGroups
     * @param int $userId
     * @return Collection
     */
    private function searchSeminarNotes(array $orGroups, int $userId): Collection
    {
        return SeminarNote::where('user_id', $userId)
            ->where(function ($mainQuery) use ($orGroups) {
                $this->applySearchConditions($mainQuery, $orGroups, self::NOTE_FIELDS);
            })
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * 検索条件を適用
     *
     * @param Builder $mainQuery
     * @param array<array<string>> $orGroups
     * @param array<string> $fields
     * @return void
     */
    private function applySearchConditions(Builder $mainQuery, array $orGroups, array $fields): void
    {
        foreach ($orGroups as $andKeywords) {
            $mainQuery->orWhere(function ($andQuery) use ($andKeywords, $fields) {
                foreach ($andKeywords as $keyword) {
                    $this->addKeywordCondition($andQuery, $fields, $keyword);
                }
            });
        }
    }

    /**
     * 検索クエリをパースしてAND/OR条件の配列に変換
     * スペース区切り = AND、カンマ区切り = OR
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
}
