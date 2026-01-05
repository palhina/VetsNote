<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PatientCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PatientCaseController extends Controller
{
    /**
     * 症例一覧取得
     */
    public function index(): JsonResponse
    {
        $cases = PatientCase::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($cases);
    }

    /**
     * 症例詳細取得
     */
    public function show(int $id): JsonResponse
    {
        $case = PatientCase::where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($case);
    }

    /**
     * 症例作成
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'animal_type' => 'required|string|max:50',
            'breed' => 'nullable|string|max:100',
            'age' => 'nullable|integer|min:0|max:255',
            'sex' => 'nullable|string|max:20',
            'chief_complaint' => 'required|string|max:255',
            'history' => 'nullable|string',
            'examination' => 'nullable|string',
            'diagnosis' => 'nullable|string|max:255',
            'treatment' => 'nullable|string',
            'progress' => 'nullable|string',
            'memo' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        $case = PatientCase::create($validated);

        return response()->json($case, 201);
    }

    /**
     * 症例更新
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $case = PatientCase::where('user_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'animal_type' => 'sometimes|required|string|max:50',
            'breed' => 'nullable|string|max:100',
            'age' => 'nullable|integer|min:0|max:255',
            'sex' => 'nullable|string|max:20',
            'chief_complaint' => 'sometimes|required|string|max:255',
            'history' => 'nullable|string',
            'examination' => 'nullable|string',
            'diagnosis' => 'nullable|string|max:255',
            'treatment' => 'nullable|string',
            'progress' => 'nullable|string',
            'memo' => 'nullable|string',
        ]);

        $case->update($validated);

        return response()->json($case);
    }

    /**
     * 症例削除（論理削除）
     */
    public function destroy(int $id): JsonResponse
    {
        $case = PatientCase::where('user_id', Auth::id())
            ->findOrFail($id);

        $case->delete();

        return response()->json(['message' => '症例を削除しました']);
    }
}
