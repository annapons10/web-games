<?php

use Illuminate\Support\Facades\Route;

// En routes/web.php o directamente elimínala si no usas web.php
Route::get('/', function () {
    return response()->json(['message' => 'API Laravel funcionando']);
}); 