<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameController;

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/showProfile', [AuthController::class, 'showProfile']);
    Route::post('/saveScore', [AuthController::class, 'saveScore']);
    Route::post('/changeName', [AuthController::class, 'changeName']);
    Route::post('/changePassword', [AuthController::class, 'changePassword']);
});

// Route::prefix('api')->group(function () {
// });

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/upload', [GameController::class, 'upload']);

Route::get('/gamesList', [GameController::class, 'listGames']);

Route::get('/getRanking', [AuthController::class, 'getRanking']);