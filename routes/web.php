<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ShiftController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UploadFileController;
use App\Http\Controllers\Api\ShiftsApiController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api/shiftsByTotalPay',[ShiftsApiController::class,'shiftsByTotalPay'])->name('shiftsByTotalPay');

Route::get('/', [UploadFileController::class,'index'])->name('welcome');
Route::post('upload',[UploadFileController::class,'upload'])->name('upload');
Route::resource('employees', EmployeeController::class);
Route::resource('shifts', ShiftController::class);

require __DIR__.'/auth.php';
