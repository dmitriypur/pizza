<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send(Request $request)
    {
        Mail::to('vst-pcmusic@yandex.ru')->send(new OrderForm($request));
        //
        return 1;
    }
}
