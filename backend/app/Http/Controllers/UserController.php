<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Store a new user
     *
     * @return JsonResponse
     */
    public function store(RegisterUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        User::create($data);
        return response()->json([
            'message' => 'Account created successfully'
        ]);
    }

    /**
     * Login the users
     *
     * @param LoginUserRequest $request
     * @return JsonResponse
     */
    public function auth(LoginUserRequest $request): JsonResponse
    {
        $request->validated();
        $user = User::whereEmail($request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match any of our records.'
            ]);
        }
        return response()->json([
            'user' => UserResource::make($user->load('tasks')),
            'access_token' => $user->createToken('new_user')->plainTextToken,
            'message' => 'Logged in successfully'
        ]);
    }

    /**
     * Logout users
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
