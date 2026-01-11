<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PatientCaseController;
use App\Http\Controllers\API\SeminarNoteController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\AdminAuthController;
use App\Http\Controllers\API\AdminUserController;
use App\Http\Controllers\API\AdminDataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});

// Test route
Route::get('/test', function () {
    return response()->json(['ok' => true]);
});

//app route
Route::post('/users', [UserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    // ログアウト
    Route::post('/logout', [AuthController::class, 'logout']);

    // パスワード変更
    Route::put('/password', [AuthController::class, 'changePassword']);

    // 症例 CRUD
    Route::get('/patient-cases', [PatientCaseController::class, 'index']);
    Route::get('/patient-cases/{id}', [PatientCaseController::class, 'show']);
    Route::post('/patient-cases', [PatientCaseController::class, 'store']);
    Route::put('/patient-cases/{id}', [PatientCaseController::class, 'update']);
    Route::delete('/patient-cases/{id}', [PatientCaseController::class, 'destroy']);

    // セミナーノート CRUD
    Route::get('/seminar-notes', [SeminarNoteController::class, 'index']);
    Route::get('/seminar-notes/{id}', [SeminarNoteController::class, 'show']);
    Route::post('/seminar-notes', [SeminarNoteController::class, 'store']);
    Route::put('/seminar-notes/{id}', [SeminarNoteController::class, 'update']);
    Route::delete('/seminar-notes/{id}', [SeminarNoteController::class, 'destroy']);

    // 横断検索
    Route::get('/search', [SearchController::class, 'search']);
});

// 管理者ログイン（認証不要）
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// 管理者専用ルート（認証 + admin権限が必要）
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // 管理者認証
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/user', [AdminAuthController::class, 'user']);

    // ユーザー管理
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::post('/users', [AdminUserController::class, 'store']);
    Route::get('/users/{id}', [AdminUserController::class, 'show']);
    Route::put('/users/{id}', [AdminUserController::class, 'update']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);

    // 全データ閲覧
    Route::get('/patient-cases', [AdminDataController::class, 'patientCases']);
    Route::get('/seminar-notes', [AdminDataController::class, 'seminarNotes']);
    Route::get('/statistics', [AdminDataController::class, 'statistics']);
});

