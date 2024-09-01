<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MethodController;
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
    return to_route("payments.current");
})->middleware(['auth', 'verified']);

Route::middleware('auth')->controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->controller(CategoryController::class)->group(function() {
    Route::get('/categories', 'setting_page')->name('categories.setting');
    Route::get('/categories/api/get', 'get_categories')->name('categories.get');
    Route::post('/categories/api/store', 'store')->name('categories.store');
    Route::get('/categories/{category_id}', 'show_page')->name('categories.show');
    Route::put('/categories/{category_id}/api/destroy', 'destroy')->name('categories.destroy');
});

Route::middleware(['auth', 'verified'])->controller(MethodController::class)->group(function() {
    Route::get('/methods', 'setting_page')->name('methods.setting');
    Route::get('/methods/api/get', 'get_methods')->name('methods.get');
    Route::post('/methods/api/store', 'store')->name('methods.store');
    Route::get('/methods/{method_id}', 'show_page')->name('methods.show');
    Route::put('/methods/{method_id}/api/destroy', 'destroy')->name('methods.destroy');
});

Route::middleware(['auth', 'verified'])->controller(PaymentController::class)->group(function() {
    Route::get('/payments', 'current_page')->name('payments.current');
    Route::get('/payments/month_1to3', 'month_1to3_page')->name('payments.month_1to3');
    Route::get('/payments/month_4to6', 'month_4to6_page')->name('payments.month_4to6');
    Route::get('/payments/month_7to9', 'month_7to9_page')->name('payments.month_7to9');
    Route::get('/payments/month_10to12', 'month_10to12_page')->name('payments.month_10to12');
    Route::get('/payments/api/get', 'get_payments')->name('payments.get');
    Route::get('/payments/categories/{category_id}/api/get', 'get_category_payments')->name('payments.get_category_payments');
    Route::get('/payments/methods/{method_id}/api/get', 'get_method_payments')->name('payments.get_method_payments');

    Route::post('/payments/api/store', 'store')->name('payments.store');
    Route::put('/payments/{payment_id}/api/update', 'update')->name('payments.update');
    Route::put('/payments/api/destroy', 'destroy')->name('payments.destroy');

    Route::get('/payments/{payment_id}/api/get_categories', 'get_categories')->name('payments.get_categories');
    Route::put('/payments/{payment_id}/api/toggle_category', 'toggle_category')->name('payments.toggle_category');
    
    Route::get('/payments/{payment_id}/api/get_method', 'get_method')->name('payments.get_method');
    Route::put('/payments/{payment_id}/api/toggle_method', 'toggle_method')->name('payments.toggle_method');
});

require __DIR__.'/auth.php';
