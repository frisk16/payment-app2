<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\ResetPassword;

class CustomResetPassword extends ResetPassword
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        //
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('【帳簿管理システム】パスワード再設定のご案内')
                    ->line('以下のボタンをクリックしてパスワード再設定を行ってください')
                    ->action('パスワード再設定', url(route('password.reset', $this->token, false)))
                    ->line('もし、このメールに見に覚えがない場合はそのまま破棄してください');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
