<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\User_x_items;

class StoreController extends Controller
{
    public function createStoreItem(Request $request)
    {
        $store = new Store;
        $store->name = $request->name;
        $store->description = $request->description;
        $store->price = $request->price;
        $store->image_url = $request->image_url;
        $store->save();
    }
    public function getStoreItems()
    {
        $storeItems = Store::all();

        return $storeItems;
    }

    public function buyItems(Request $request)
    {

    }

    public function userItems(Request $request)
    {
        $items = new User_x_items;
        $items->userId = $request->userId;
        $items->itemId = $request->itemId;

        $items->save();
    }
}
