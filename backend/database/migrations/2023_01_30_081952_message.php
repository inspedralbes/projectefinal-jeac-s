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
        Schema::create('message', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('userSenderId')->unsigned();
            $table->bigInteger('userRecieverId')->unsigned();
            $table->string('date');

            $table->foreign('userSenderId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('userRecieverId')->references('id')->on('users')->onDelete('cascade');

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
        Schema::dropIfExists('message');

    }
};
