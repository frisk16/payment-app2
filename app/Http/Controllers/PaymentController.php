<?php

namespace App\Http\Controllers;

use App\Models\Payment;
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
        return Inertia::render('Payment/Month1to3PaymentsPage');
    }

    public function month_4to6_page()
    {
        return Inertia::render('Payment/Month4to6PaymentsPage');
    }

    public function month_7to9_page()
    {
        return Inertia::render('Payment/Month7to9PaymentsPage');
    }

    public function month_10to12_page()
    {
        return Inertia::render('Payment/Month10to12PaymentsPage');
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

        if (empty($keyword) && empty($min_price) && empty($max_price)) {
            $payments = $base_payments
                ->orderBy('date', $order)
                ->orderBy('created_at', 'DESC')
                ->paginate(15);
        } else {
            $payments = $base_payments
                ->where('name', 'LIKE', "%{$keyword}%")
                ->where('price', '>=', $min_price)
                ->where('price', '<=', $max_price)
                ->orderBy('date', $order)
                ->orderBy('created_at', 'DESC')
                ->paginate(15);
        }
        
        return response()->json([
            'payments' => $payments,
        ]);
    }
    
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
    public function update(Request $request, $id)
    {
        //
        $data = $request->paymentData;
        $validator = $this->validator($data);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        $payment = Payment::find($id);
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
}
