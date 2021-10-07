<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .mail-table{
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #dddddd;
            border-collapse: collapse;
        }
        .mail-table tbody tr:nth-child(even){
            background: #eee;
        }
        .mail-table td{
            border: 1px solid #dddddd;
            padding: 5px;
        }
    </style>
</head>
<body>

<p>Имя: {{$formData['name']}}</p>
<p>Телефон: {{$formData['phone']}}</p>

<table class="mail-table">
    <tr style="font-weight: bold;background: #eee;">
        <td>Наименование</td>
        <td>Цена</td>
        <td>Кол-во</td>
        <td>Сумма</td>
    </tr>
    @php
        $itog = 0
    @endphp
@foreach($products as $p)
    @php
        $sum = $p[1] * $p[2]
    @endphp
    <tr>
        <td>{{$p[0]}}</td>
        <td>{{$p[1]}}р.</td>
        <td>{{$p[2]}}шт.</td>
        <td>{{$sum}}р.</td>
    </tr>
        @php
            $itog += $sum
        @endphp
@endforeach
    <tr>
        <td>Итого: <b>{{$itog}}р.</b></td>
    </tr>
</table>
</body>
</html>