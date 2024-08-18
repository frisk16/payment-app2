<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class CategoryController extends Controller
{
    private function validator($data)
    {
        return Validator::make($data, [
            'name' => ['required', 'max:5', 'string'],
        ], [
            'name.required' => '入力必須です',
            'name.max' => ':max 文字まで',
            'name.string' => '使用できない文字が含まれています',
        ]);
    }

    /**
     * カテゴリー設定ページ
     */
    public function setting_page()
    {
        //
        $date = Carbon::now();

        return Inertia::render('Category/SettingPage', [
            'year' => $date->year,
        ]);
    }

    /**
     * カテゴリー毎の支払い詳細ページ
     */
    public function show_page($id)
    {
        // 
        
    }

    /**
     * カテゴリー取得
     */
    public function get_categories()
    {
        $categories = Auth::user()->categories()->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->categoryData;
        $validator = $this->validator($data);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        $category = Category::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
        ]);

        return response()->json([
            'category' => $category,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
