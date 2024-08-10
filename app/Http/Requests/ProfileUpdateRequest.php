<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:10'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'ユーザー名は必須です',
            'name.string' => '文字を含んでください',
            'name.max' => '最大 :max 文字まで',
            'email.required' => 'Eメールアドレスは必須です',
            'email.email' => '正しく入力してください',
            'email.lowercase' => '小文字で入力してください',
            'email.max' => '文字数オーバーです',
            'email.unique' => 'そのEメールアドレスは現在使われています',
        ];
    }
}
