<?php

namespace App\Http\Controllers\Api;

use ZipArchive;
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
        $game->zip = $request->zip;
        $game->description = $request->description;
        info("Nom del joc: =>".$request->name);
        $game->save();
        
        
        $dir_path = date('Y') . '/' . date('m') . '/';
        $file = request()->zip;
        $zip = new ZipArchive();
        $file_new_path = $file->storeAs($dir_path . 'zip' , 'filename', 'local');
        $zipFile = $zip->open(Storage::disk('local')->path($file_new_path));
        if ($zipFile === TRUE) {
            $zip->extractTo(base_path('\frontend\Games')); 
            $zip->close();
        }
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
}
