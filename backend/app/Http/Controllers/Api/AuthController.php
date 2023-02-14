<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'psswd' => 'required|string|min:6',
        ]);

        $player = new User;
        $player->name = $validatedData['name'];
        $player->username = $validatedData['username'];
        $player->email = $validatedData['email'];
        $player->psswd = Hash::make($validatedData['psswd']);

        try {
            if ($player->save()) {
                $message = "Registered correctly.";
                return response()->json([$message, 200, 'isRegistered' => true]);
            }
        } catch (QueryException $ex) {
            $message = "Couldn't register.";
            return response()->json([$message, 500, 'isRegistered' => false]);
        }
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'psswd' => 'required|string|min:6',
        ]);

        if (Auth::attempt($validatedData)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            return response(["token"=>$token])->withoutCookie($cookie);
        } 

    }

    public function saveScore(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
            'totalScore' => 'required|integer'
        ]);
        $player = User::where('id', $validatedData['id'])->firstOrFail();
        $player->totalScore = $validatedData['totalScore'];
        $player->save();

        return response()->json(['message' => 'Score saved successfully', $player->id]);
    }
}
