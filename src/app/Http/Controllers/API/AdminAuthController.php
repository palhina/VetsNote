<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        Log::info('admin login request', ['email' => $request->email]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        if ($user->role !== 'admin') {
            Auth::logout();
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Admin login successful',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
