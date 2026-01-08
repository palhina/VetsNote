<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

use App\Models\SeminarNote;
use App\Http\Resources\NoteResource;
use App\Http\Requests\SeminarNoteRequest;

class SeminarNoteController extends Controller
{
    /**
     * セミナーノート一覧取得
     */
    public function index(): JsonResponse
    {
        $notes = SeminarNote::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json(NoteResource::collection($notes));
    }

    /**
     * セミナーノート詳細取得
     */
    public function show(int $id): JsonResponse
    {
        $note = SeminarNote::where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($note);
    }

    /**
     * セミナーノート作成
     */
    public function store(SeminarNoteRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        $note = SeminarNote::create($validated);

        return response()->json($note, 201);
    }

    /**
     * セミナーノート更新
     */
    public function update(SeminarNoteRequest $request, int $id): JsonResponse
    {
        $note = SeminarNote::where('user_id', Auth::id())
            ->findOrFail($id);

        $note->update($request->validated());

        return response()->json($note);
    }

    /**
     * セミナーノート削除（論理削除）
     */
    public function destroy(int $id): JsonResponse
    {
        $note = SeminarNote::where('user_id', Auth::id())
            ->findOrFail($id);

        $note->delete();

        return response()->json(['message' => 'セミナーノートを削除しました']);
    }
}
