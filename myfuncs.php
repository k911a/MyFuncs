<?php
    /* Ф-я удаления PHP символов из строки */
    function btw($b1){
        $b1 = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $b1);
        $b1 = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $b1);
        return $b1;
    }

    /* Ф-я замены символов в строкие */
    function replace($str,$search,$replaced){
        $str = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $str);
        $str = str_replace($search, $replaced, $str);
        return $str;
    }

    /* Разбить строку на массив подстрок */
    $pieces = explode("|", $str);

    /* Чтение в массив */
    $arr = file('example.txt');

    /* Чтение в строку */
    $str = file_get_contents('example.txt');
/>
    