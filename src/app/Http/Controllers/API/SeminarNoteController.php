<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

use App\Models\SeminarNote;
use App\Http\Resources\NoteResource;

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
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'seminar_name' => 'required|string|max:255',
            'held_on' => 'required|date',
            'lecturer' => 'nullable|string|max:255',
            'theme' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();

        $note = SeminarNote::create($validated);

        return response()->json($note, 201);
    }

    /**
     * セミナーノート更新
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $note = SeminarNote::where('user_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'seminar_name' => 'sometimes|required|string|max:255',
            'held_on' => 'sometimes|required|date',
            'lecturer' => 'nullable|string|max:255',
            'theme' => 'nullable|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $note->update($validated);

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
