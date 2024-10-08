<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Category;
use App\Models\Method;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Validator
     */
    private function validator($data)
    {
        // 
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:10'],
            'price' => ['required', 'integer', 'min:1'],
            'date' => ['required', 'string'],
        ], [
            'name.required' => '入力必須',
            'name.string' => '使用できない文字が含まれています',
            'name.max' => ':max 文字まで',
            'price.required' => '入力必須',
            'price.integer' => '整数で入力',
            'price.min' => '￥ :min 円以上',
            'date.required' => '入力必須',
            'date.string' => '使用できない文字が含まれています',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function current_page()
    {   
        //
        $date = new Carbon();
        $today = "{$date->year}年{$date->month}月現在";
        
        return Inertia::render('Payment/CurrentPaymentsPage', [
            'today' => $today,
            'year' => $date->year,
            'month' => $date->month,
        ]);
    }

    public function month_1to3_page()
    {
        // 
        $date = new Carbon();
        $year = $date->year;

        return Inertia::render('Payment/Month1to3PaymentsPage', [
            'year' => $year,
        ]);
    }

    public function month_4to6_page()
    {
        // 
        $date = new Carbon();
        $year = $date->year;
        
        return Inertia::render('Payment/Month4to6PaymentsPage', [
            'year' => $year,
        ]);
    }

    public function month_7to9_page()
    {
        $date = new Carbon();
        $year = $date->year;

        return Inertia::render('Payment/Month7to9PaymentsPage', [
            'year' => $year,
        ]);
    }

    public function month_10to12_page()
    {
        $date = new Carbon();
        $year = $date->year;
        
        return Inertia::render('Payment/Month10to12PaymentsPage', [
            'year' => $year,
        ]);
    }
    
    /**
     * 月ごとのデータ取得
     */
    public function get_payments(Request $request)
    {
        //
        $base_payments = Auth::user()->payments()->whereYear('date', $request->year)->whereMonth('date', $request->month);
        $payment_data = $request->paymentData;
        $order = $request->order;
        $keyword = $payment_data['keyword'];
        $min_price = !empty($payment_data['minPrice']) ? $payment_data['minPrice'] : 0;
        $max_price = !empty($payment_data['maxPrice']) ? $payment_data['maxPrice'] : $base_payments->max('price');
        $total_price = 0;

        if (empty($keyword) && empty($min_price) && empty($max_price)) {
            $payments = $base_payments
                ->orderBy('date', $order)
                ->orderBy('created_at', 'DESC')
                ->paginate(10);
            
            $total_price = $base_payments->sum('price');
        } else {
            $payments = $base_payments
                ->where('name', 'LIKE', "%{$keyword}%")
                ->where('price', '>=', $min_price)
                ->where('price', '<=', $max_price)
                ->orderBy('date', $order)
                ->orderBy('created_at', 'DESC')
                ->paginate(10);
                
            $total_price = $base_payments
                ->where('name', 'LIKE', "%{$keyword}%")
                ->where('price', '>=', $min_price)
                ->where('price', '<=', $max_price)
                ->sum('price');
        }
    
        return response()->json([
            'payments' => $payments,
            'totalPrice' => $total_price,
        ]);
    }

    /**
     * カテゴリー毎のデータ取得
     */
    public function get_category_payments(Request $request, $category_id)
    {
        $base_payments = Category::find($category_id)->payments()->whereYear('date', $request->year)->whereMonth('date', $request->month);
        $payments = $base_payments->orderBy('date', 'DESC')->orderBy('created_at', 'DESC')->paginate(10);
        $total_price = $base_payments->sum('price');
    
        return response()->json([
            'payments' => $payments,
            'totalPrice' => $total_price,
        ]);
    }

    /**
     * 決済情報毎のデータ取得
     */
    public function get_method_payments(Request $request, $method_id)
    {
        $base_payments = Method::find($method_id)->payments()->whereYear('date', $request->year)->whereMonth('date', $request->month);
        $payments = $base_payments->orderBy('date', 'DESC')->orderBy('created_at', 'DESC')->paginate(10);
        $total_price = $base_payments->sum('price');
    
        return response()->json([
            'payments' => $payments,
            'totalPrice' => $total_price,
        ]);
    }

    
    /*--------------------
     * データ操作
     --------------------*/

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 
        $data = $request->paymentData;
        $validator = $this->validator($data);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        $payment = Payment::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'price' => $data['price'],
            'date' => $data['date'],
        ]);
        
        return response()->json([
            'payment' => $payment,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $payment_id)
    {
        //
        $data = $request->paymentData;
        $validator = $this->validator($data);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        $payment = Payment::find($payment_id);
        $payment->name = $data['name'];
        $payment->price = $data['price'];
        $payment->date = $data['date'];
        $payment->update();

        return response()->json([
            'payment' => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // 
        foreach ($request->deleteIds as $id) {
            Payment::find($id)->delete();
        }

        return response()->json([
            'count' => count($request->deleteIds),
        ]);
    }

    /**
     * 各データ毎のカテゴリータグ取得
     */
    public function get_categories($payment_id)
    {
        // 
        $categories = Payment::find($payment_id)->categories()->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }
    
    /**
     * 各データ毎のカテゴリー追加、削除
     */
    public function toggle_category(Request $request, $payment_id)
    {
        // 
        if (count($request->data) > 3) {
            return response()->json([
                'error' => '最大3つまで登録可能',
            ]);
        }
        
        $payment = Payment::find($payment_id);
        $payment->categories()->sync($request->data);
        
        $current_categories = $payment->categories()->get();
        
        return response()->json([
            'currentCategories' => $current_categories,
        ]);
    }

    /**
     * 各データ毎の決済タグ取得
     */
    public function get_method($payment_id)
    {
        // 
        $method = Payment::find($payment_id)->method()->first();
    
        return response()->json([
            'method' => $method,
        ]);
    }

    /**
     * 各データの決済タグ変更
     */
    public function toggle_method(Request $request, $payment_id)
    {
        // 
        $payment = Payment::find($payment_id);
        $method_id = $request->data !== 0 ? $request->data : null;
        $payment->method_id = $method_id;
        $payment->update();

        return response()->json([
            'currentMethod' => $payment->method()->first(),
        ]);
    }
}
