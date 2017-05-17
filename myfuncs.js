$(document).ready(function(){
    /* Ф-я для Adobe Muse, определяющая путь к папке assets */
    function assetsPath(){
        if ((window.location.href.indexOf("/phone") != -1) || (window.location.href.indexOf("/tablet") != -1)){
            return "../assets";
        }
        if ((window.location.href.indexOf("/phone") == -1) && (window.location.href.indexOf("/tablet") == -1)){
            return "assets";
        }
    }

    /* Ф-я навешивания целей яндекс метрики на кнопки, при нажатии на них */
    function metrickTarget(){
        var this_data = $(this).data();
        if (window["yaCounter" + vf_num_counter]){
            window["yaCounter" + vf_num_counter].reachGoal(this_data.target);
        }
    }

    /* Ф-я парсинга title */
    function parsingTitle(classElem,dataName,lowerCase,separator,subSeparator){
        /*
            Ф-я парсинга title элементов

            Фактически ни один из параметров ф-ии не является обязательным. Но если не будет задан ни один из параметров,
            то ничего не произойдет. Нужно как минимум передать первым параметром класс элемента. Тогда его атрибут title
            будет распарсен, и у этого элемента будут созданы data-атрибуты с именами по умолчанию, например: data-attr-1,
            data-attr-2, и т.д.

            Если передан 2-ой параметр (строковый массив с именами data-атрибутов) в ф-ю, то в данном элементе title
            распарсится, и будут созданы соответствующие data-атрибуты по количеству имен в переданном строковм массиве.
            Если кол-во имен в строков массиве будет меньше, чем то кол-во data-атрибутов, которое можно создать, распарсив
            title, то недостающие имена будут заданы по умолчанию, например: data-attr-1, data-attr-2, и т.д.

            Если передан 3-й параметр, то все создаваемые значения data-атрибутов могут быть переведены в нижний регистр.
            Если параметр не передан, то по умолчанию будет оставлен тот регистр, который есть.

            Если передан 4-й параметр, то будет применяться указанный разделитель. Если параметр не передан, то по умолчанию
            вертикальная линия: "|".

            Если передан 5-й параметр, то будет применяться указанный суб разделитель. Если параметр не передан, то
            суб разделитель применяться не будет.

            Если в элементе нужно задать и оставить title, а также указать в title какие-либо параметры, то в title элемента
            первым значением можно прописать: "title: ххх", где xxx - текст для title, а дальше после разделителя задать
            другие параметры.

            classElem    (string)           - Класс элемента, который парсится, например: .vf_virt_input
            dataName     (string array)     - Массив имен создаваемых data-атрибутов
            lowerCase    (boolean / string) - true / false / lowerCase (нижний регистр / не переводить / нижний регистр)
            separator    (string)           - Разделитель
            subSeparator (string)           - Суб разделитель
        */

        var pClassElem    = "";             /* (p - от parametr) Класс элемента */
        var pDataNameDef  = "data-attr-";   /* (p - от parametr) Имя создаваемого data-атрибута по умолчанию. После тире будет подставлен порядковый номер */
        var pDataNameCus  = "";             /* (p - от parametr) Имя создаваемого data-атрибута, если передан массив в ф-ю. Эта переменная переопределяется ниже */
        var pLowerCase    = false;          /* (p - от parametr) Перевод значения data-атрибутов в нижний регистр */
        var pSeparator    = "|";            /* (p - от parametr) Раздилитель в title элемента*/
        var pSubSeparator = ":";            /* (p - от parametr) Подразделитель. Все что до него, включая его самого - отсекается */

        /* Определяем переменные в соответствии с переданными в ф-ю параметрами */
        if (dataName != undefined){pDataNameCus = dataName;}
        if ((lowerCase != undefined) && ((String(lowerCase).toLowerCase() == "true") || (String(lowerCase).toLowerCase() == "lowercase"))){pLowerCase = true;}
        if (separator != undefined){pSeparator = separator;}
        if (subSeparator != undefined){pSubSeparator = subSeparator;}
        if (classElem != undefined){pClassElem = classElem;}

        /* Парсим title */
        if (classElem != undefined){
            for (i=0; i < $(pClassElem).length; i++){
                if ($(pClassElem).slice(i,i+1).attr("title") != undefined){
                    var dataNameArr = $(pClassElem).slice(i,i+1).attr("title").split(pSeparator);   /* Массив с атрибутами из title */

                    var title = "";    /* Будущий title (всплывающая подсказка) */
                    var start = 0;     /* Номер для цикла с которого начнется парсинг атрибутов */
                    var nDef = 1;      /* Счетчик для дефолтных data-атрибутов */
                    var nCus = 0;      /* Счетчик для определения номера в массиве с кастомными data-атрибутами */

                    /* Определяем начало цикла для парсинга и title, который останется как title, если он задан */
                    if ((dataNameArr.length != 0) && (dataNameArr[0].toLowerCase().indexOf("title") == -1)){
                        start = 0;
                        title = "";
                    }
                    if ((dataNameArr.length != 0) && (dataNameArr[0].toLowerCase().indexOf("title") != -1)){
                        start = 1;
                        title = $.trim(dataNameArr[0].substring(dataNameArr[0].indexOf(pSubSeparator) + 1));
                    }

                    /* Цикл по кол-ву параметров в title */
                    for (j = start; j < dataNameArr.length; j++){
                        /* Если в текущем парметре из подсказки (из title) найден субразделитель, то текущий парметр равень тому, что после субразделителя */
                        if (dataNameArr[j].indexOf(pSubSeparator) != -1){
                            dataNameArr[j] = $.trim(dataNameArr[j].substring(dataNameArr[j].indexOf(pSubSeparator) + 1));
                        }

                        /* Если требуется перевод в нижний регистр, то переводим текущий параметр из подсказки (из title) в нижний регистр */
                        if (pLowerCase == true){
                            dataNameArr[j] = dataNameArr[j].toLowerCase();
                        }

                        /* Если массив с data-атрибутами не передан в ф-ю */
                        if (dataName == undefined){
                            $(pClassElem).slice(i,i+1).attr(pDataNameDef + nDef,$.trim(dataNameArr[j]));
                            nDef++;
                        }

                        /* Если массив с data-атрибутами передан в ф-ю и текущий порядковый номер элемента из подсказки (из title) меньше, либо равен кол-ву элементов в переданном в ф-ю массиве */
                        if ((dataName != undefined) && (j - start < pDataNameCus.length)){
                            $(pClassElem).slice(i,i+1).attr(pDataNameCus[nCus],$.trim(dataNameArr[j]));
                            nCus++;
                        }

                        /* Если массив с data-атрибутами передан в ф-ю и текущий порядковый номер элемента из подсказки (из title) больше кол-ва элементов в переданном в ф-ю массиве */
                        if ((dataName != undefined) && (j - start >= pDataNameCus.length)){
                            $(pClassElem).slice(i,i+1).attr(pDataNameDef + nDef,$.trim(dataNameArr[j]));
                            nDef++;
                        }
                    }

                    /* Удаление и создание title */
                    $(pClassElem).slice(i,i+1).removeAttr("title");
                    if (title != ""){$(pClassElem).slice(i,i+1).attr("title",title);}
                }
            }
        }
    }

}