<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderForm extends Mailable
{
    use Queueable, SerializesModels;

    protected $formData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($formData)
    {
        $this->formData = $formData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $products = json_decode($this->formData['product']);

        return $this->view('email')->with([
            "formData" => $this->formData,
            "products" => $products
        ]);
    }
}
