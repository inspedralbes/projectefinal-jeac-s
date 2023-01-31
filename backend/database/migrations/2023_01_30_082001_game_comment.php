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
        Schema::create('game_comment', function (Blueprint $table) {
            $table->bigInteger('userCommentatorId')->unsigned();
            $table->bigInteger('userCreatorId')->unsigned();

            $table->string('comment');

            $table->foreign('userCommentatorId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('userCreatorId')->references('id')->on('users')->onDelete('cascade');

            $table->primary(['userCommentatorId', 'userCreatorId'])->index();

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
        Schema::dropIfExists('game_comment');

    }
};
