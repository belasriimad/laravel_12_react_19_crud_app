<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()->load('tasks')),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class, 'logout']);
    Route::apiResource('tasks', TaskController::class)->except(['create', 'edit']);
    Route::get('category/{category}/tasks', [TaskController::class, 'filterTaskByCategory']);
    Route::get('order/{column}/{direction}/tasks', [TaskController::class, 'orderTasksByColumn']);
    Route::get('search/{searchTerm}/tasks', [TaskController::class, 'findTaskByTerm']);
});
Route::get('categories', [CategoryController::class, 'index']);
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);