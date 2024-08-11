<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->controller(CategoryController::class)->group(function() {
    Route::get('/categories', 'setting_page')->name('categories.setting');
});

Route::middleware(['auth', 'verified'])->controller(PaymentController::class)->group(function() {
    Route::get('/payments', 'current_page')->name('payments.current');
    Route::get('/payments/month_1to3', 'month_1to3_page')->name('payments.month_1to3');
    Route::get('/payments/month_4to6', 'month_4to6_page')->name('payments.month_4to6');
    Route::get('/payments/month_7to9', 'month_7to9_page')->name('payments.month_7to9');
    Route::get('/payments/month_10to12', 'month_10to12_page')->name('payments.month_10to12');
    Route::get('/payments/api/get', 'get_payments')->name('payments.get');
    Route::post('/payments/api/store', 'store')->name('payments.store');
    Route::put('/payments/api/{id}/update', 'update')->name('payments.update');
    Route::put('/payments/api/destroy', 'destroy')->name('payments.destroy');
});

require __DIR__.'/auth.php';
