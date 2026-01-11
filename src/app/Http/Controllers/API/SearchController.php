<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PatientCase;
use App\Models\SeminarNote;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * 症例とセミナーノートを横断検索
     */
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $userId = $request->user()->id;

        if (empty($query)) {
            return response()->json([
                'patient_cases' => [],
                'seminar_notes' => [],
            ]);
        }

        // 症例を検索（動物種、品種、主訴、診断、病歴、メモなど）
        $patientCases = PatientCase::where('user_id', $userId)
            ->where(function ($q) use ($query) {
                $q->where('animal_type', 'like', "%{$query}%")
                    ->orWhere('breed', 'like', "%{$query}%")
                    ->orWhere('chief_complaint', 'like', "%{$query}%")
                    ->orWhere('diagnosis', 'like', "%{$query}%")
                    ->orWhere('history', 'like', "%{$query}%")
                    ->orWhere('examination', 'like', "%{$query}%")
                    ->orWhere('treatment', 'like', "%{$query}%")
                    ->orWhere('progress', 'like', "%{$query}%")
                    ->orWhere('memo', 'like', "%{$query}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        // セミナーノートを検索（セミナー名、講師、テーマ、内容）
        $seminarNotes = SeminarNote::where('user_id', $userId)
            ->where(function ($q) use ($query) {
                $q->where('seminar_name', 'like', "%{$query}%")
                    ->orWhere('lecturer', 'like', "%{$query}%")
                    ->orWhere('theme', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'patient_cases' => $patientCases,
            'seminar_notes' => $seminarNotes,
        ]);
    }
}
