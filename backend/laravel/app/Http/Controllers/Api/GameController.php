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

    public function index()
    {
        // $games = Game::find($id);
        // return $games->data;
    }

    public function index_jugar()
    {
        // $games = Game::find($id);
        // return $games->data;
    }


    public function create()
    {
        //
    }

    public function upload(Request $request)
    {
        $game = new Game();
        $game->user_id = $request->user_id;
        $game->name = $request->name;
        //$file2 = $request->img;
        //$file2->move(base_path('../frontend/public/ImageGames/'. $request->name), $file2->getClientOriginalName());        
        //$game->img = './ImageGames/'. $request->name . '/' . $file2->getClientOriginalName();
        $game->img = $request->img;
        $game->description = $request->description;
        $game->path = $request->path;


        // $path = base_path('../frontend/src/Games'. $request->name . '/./ ');
        // rename($path . '/initGame.js', base_path('../frontend/src/InitGames'. $request->name . '/initGame.js'));
        //info("Nom del joc: =>".$request->name);


        // $dir_path = date('Y') . '/' . date('m') . '/';
        // $file = request()->zip;
        // $zip = new ZipArchive();
        // $file_new_path = $file->storeAs($dir_path . 'zip' , 'filename', 'local');
        // $zipFile = $zip->open(Storage::disk('local')->path($file_new_path));
        // if ($zipFile === TRUE) {
        //     $zip->extractTo(base_path('../frontend/src/Games'. $request->name )); 
        //     $zip->close();
        // }

        // $game->initScript='/src/InitGames' . $request->name . '/initGame.js';

        $game->save();

        return $game->id;
    }

    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
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
    
}
