<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientCaseRequest;
use App\Models\PatientCase;
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
    public function store(PatientCaseRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        $case = PatientCase::create($validated);

        return response()->json($case, 201);
    }

    /**
     * 症例更新
     */
    public function update(PatientCaseRequest $request, int $id): JsonResponse
    {
        $case = PatientCase::where('user_id', Auth::id())
            ->findOrFail($id);

        $case->update($request->validated());

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
