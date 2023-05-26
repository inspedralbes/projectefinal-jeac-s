<?php

namespace App\Http\Controllers\Api;

use ZipArchive;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\Game;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GameController extends Controller
{
    public function upload(Request $request)
    {
        $game = new Game();
        $game->user_id = $request->user_id;
        $game->name = $request->name;
        $game->img = $request->img;
        $game->description = $request->description;
        $game->path = $request->path;

        $game->save();

        return $game->id;
    }    

    public function listGames()
    {
        $games = Game::with('user')->get();
        return response()->json(["games" => $games], Response::HTTP_OK);
    }

    public function deleteGame($id)
    {
        $game = Game::find($id);

        $game->delete();

        return response()->json(['message' => 'Juego eliminado correctamente']);
    }

    public function updateGame(Request $request, $id)
    {
        $game = Game::find($id);

        if ($request->has('name') && !empty($request->input('name'))) {
            $game->name = $request->input('name');
        }

        if ($request->has('img') && !empty($request->input('img'))) {
            $game->img = $request->input('img');
        }

        if ($request->has('description') && !empty($request->input('description'))) {
            $game->description = $request->input('description');
        }

        if ($request->has('path') && !empty($request->input('path'))) {
            $game->path = $request->input('path');
        }

        $game->save();

        return response()->json(['message' => 'Juego actualizado correctamente']);
    }
    
}
