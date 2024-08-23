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

        $categories = Auth::user()->categories()->get();
        $payments_counter = [];
        foreach ($categories as $category) {
            $payments_counter[] = [
                'id' => $category->id,
                'count' => $category->payments()->count(),
            ];
        }

        return Inertia::render('Category/SettingPage', [
            'year' => $date->year,
            'paymentsCounter' => $payments_counter,
        ]);
    }

    /**
     * カテゴリー毎の支払い詳細ページ
     */
    public function show_page($id)
    {
        // 
        $category = Auth::user()->categories()->where('id', $id)->first();
        if (! $category) {
            return to_route("categories.setting");
        }

        $date = new Carbon();

        return Inertia::render('Category/ShowPage', [
            'category' => $category,
            'currentYear' => $date->year,
            'currentMonth' => $date->month,
        ]);
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

        if (Auth::user()->categories()->where('name', $data['name'])->first()) {
            return response()->json([
                'errors' => ['name' => '既に存在します'],
            ]);
        }

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
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $category = Category::find($id);
        $name = $category->name;
        $category->delete();
        
        return response()->json([
            'name' => $name,
        ]);
    }
}
