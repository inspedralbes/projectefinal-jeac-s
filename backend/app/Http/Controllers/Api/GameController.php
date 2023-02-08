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
        $game->description = $request->description;
        info("Nom del joc: =>".$request->name);

        $game->save();
        
        return $game->id;
    }

    public function extractUploadedZip(Request $request){
        // $zip = new ZipArchive();
        // $status = $zip->open($request->$zip->getRealPath());
        // if ($status !== true) {
        //  throw new \Exception($status);
        // }
        // else{
        //     $storageDestinationPath= storage_path('../../../../frontend/src/Games/{'.$request -> name.'}');
       
        //     if (!\File::exists( $storageDestinationPath)) {
        //         \File::makeDirectory($storageDestinationPath, 0755, true);
        //     }
        //     $zip->extractTo($storageDestinationPath);
        //     $zip->close();
        //     return back()
        //      ->with('success','You have successfully extracted zip.');
        // }

        // $file = request()->file('zip-file');
        // $zip = new ZipArchive();
        // $file_new_path = $file->storeAs($dir_path . 'zip' , $filename, 'local');
        // $zipFile = $zip-> open(Storage::disk('local')->path($file_new_path));
        // if ($zipFile === TRUE){
        //     $zip-> extractTo('../../../../frontend/src/Games/' . 'zip');
        //     $zip -> close();
        // }




        // $filename = 'a';
        // $dir_path = date('Y') . '/' . date('m') . '/';
        // $file = request()->file('zip_file');
        // $zip = new ZipArchive();
        // $file_new_path = $file->storeAs($dir_path . 'zip' , $filename, 'local');
        // $zipFile = $zip->open(Storage::disk('local')->path($file_new_path));
        // if ($zipFile === TRUE) {
        //     $zip->extractTo(Storage::disk('local')->path($dir_path . 'zip')); 
        //     $zip->close();
        // }
        
    
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
