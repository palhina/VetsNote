<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PatientCaseController;

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
    return $request->user();
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
    // 症例 CRUD
    Route::get('/patient-cases', [PatientCaseController::class, 'index']);
    Route::get('/patient-cases/{id}', [PatientCaseController::class, 'show']);
    Route::post('/patient-cases', [PatientCaseController::class, 'store']);
    Route::put('/patient-cases/{id}', [PatientCaseController::class, 'update']);
    Route::delete('/patient-cases/{id}', [PatientCaseController::class, 'destroy']);
});

