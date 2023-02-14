<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameController;



Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/upload', [GameController::class, 'upload']);

Route::get('/gamesList', [GameController::class, 'listGames']);

Route::post('/saveScore', [AuthController::class, 'saveScore']);
