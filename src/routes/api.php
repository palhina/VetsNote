<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PatientCaseController;
use App\Http\Controllers\API\SeminarNoteController;

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
});

