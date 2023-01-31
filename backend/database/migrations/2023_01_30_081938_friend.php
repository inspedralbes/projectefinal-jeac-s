<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friend', function (Blueprint $table) {
            $table->bigInteger('userRequestId')->unsigned();
            $table->bigInteger('userRequestedId')->unsigned();

            $table->enum('status',['accepted', 'pending', 'rejected'])->default('pending');

           
            $table->foreign('userRequestId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('userRequestedId')->references('id')->on('users')->onDelete('cascade');

            $table->primary(['userRequestId', 'userRequestedId'])->index();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friend');

    }
};
