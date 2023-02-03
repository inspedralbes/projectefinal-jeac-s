<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class PlayersController extends Controller
{
    public function store(Request $request)
    {
        $player = new Player;
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
}