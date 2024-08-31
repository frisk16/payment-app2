<?php

namespace App\Http\Controllers;

use App\Models\Method;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class MethodController extends Controller
{
    private function validator($data)
    {
        // 
        return Validator::make($data, [
            'image' => ['required'],
            'name' => ['required', 'max:10', 'string'],
        ], [
            'image.required' => '選択必須です',
            'name.required' => '入力必須です',
            'name.max' => ':max 文字まで',
            'name.string' => '使用できない文字が含まれています',
        ]);
    }

    /**
     * 決済方法設定ページ
     */
    public function setting_page()
    {
        //
        $date = Carbon::now();

        $methods = Auth::user()->methods()->get();
        $payments_counter = [];
        foreach ($methods as $method) {
            $payments_counter[] = [
                'id' => $method->id,
                'count' => $method->payments()->count(),
            ];
        }

        return Inertia::render('Method/SettingPage', [
            'year' => $date->year,
            'paymentsCounter' => $payments_counter,
        ]);
    }

    /**
     * 決済方法毎の支払い詳細ページ
     */
    public function show_page($id)
    {
        // 
        $method = Auth::user()->methods()->where('id', $id)->first();
        if (! $method) {
            return to_route("methods.setting");
        }

        $date = new Carbon();

        return Inertia::render('Method/ShowPage', [
            'method' => $method,
            'currentYear' => $date->year,
            'currentMonth' => $date->month,
        ]);
    }

    /**
     * 決済データ取得
     */
    public function get_methods()
    {
        // 
        $methods = Auth::user()->methods()->get();

        return response()->json([
            'methods' => $methods,
        ]);
    }



    /**---------------
     * データ操作
     -----------------*/

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->methodData;
        $validator = $this->validator($data);

        if (Auth::user()->methods()->where('name', $data['name'])->first()) {
            return response()->json([
                'errors' => ['name' => '既に存在します'],
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        $method = Method::create([
            'user_id' => Auth::id(),
            'image' => $data['image'],
            'name' => $data['name'],
        ]);

        return response()->json([
            'method' => $method,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $method = Method::find($id);
        $name = $method->name;
        $method->delete();
        
        return response()->json([
            'name' => $name,
        ]);
    }
}
