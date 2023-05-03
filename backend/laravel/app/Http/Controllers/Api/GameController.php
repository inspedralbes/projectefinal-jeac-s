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
    
    public function index_jugar(){
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
        $game->name = $request->name;
        $game->img = $request->img;
        $game->description = $request->description;
        $game->path = $request->path;
        
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
    
    public function listGames(){
        $game = Game::all();
        return response()->json(["games" => $game], Response::HTTP_OK);
    }
}
