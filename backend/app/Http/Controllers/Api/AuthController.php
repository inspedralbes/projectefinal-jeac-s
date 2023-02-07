<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $player = new Player;
        $player->name = $request->name;
        $player->username = $request->username;
        $player->email = $request->email;
        $player->psswd = Hash::make($request->psswd);

        try {
            if ($player->save()) {
                $message = "Registered correctly.";
                return response()->json([$message, 200]);
            }
        } catch (QueryException $ex) {
            $message = "Couldn't register.";
            return response()->json([$message, 500]);
        }
    }
    public function login(Request $request)
    {
        try {
            $player = Player::where('username', $request->username)->firstOrFail();
            if ($player != null) {
                if (Hash::check($request->psswd, $player->psswd)) {
                    return response()->json([
                        $player,
                        200,
                        'isLoggedIn' => true,
                    ]);
                } else {
                    $message = "Incorrect password!!";
                    return response()->json([
                        $message,
                        500,
                        'isLoggedIn' => false,
                    ]);
                }
            }
        } catch (\Throwable $th) {
            $message = "This player doesn't exist!";
            return response()->json([
                $message,
                500,
                'isLoggedIn' => false,
            ]);
        }
    }
}
