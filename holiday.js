//祝日・休日の判定
function checkHoliday(year, month, day) {
    let dayOfweek = new Date(year, month - 1, day).getDay();    //曜日
    let numOfweek = Math.floor((day - 1) / 7) + 1;  //何度目の曜日か
     
    //月ごとに確認
    switch(month){

        //１月　１日　：元旦
        //１月第２月曜：成人の日

        case 1:
            if(day == 1) return true;
            if(dayOfweek == 1 && numOfweek == 2) return true;
            break;

            //２月１１日　：建国記念日
            //２月２３日　：天皇誕生日　※2020年以降
        case 2:
            if(day == 11) return true;
            if(year >= 2020 && day == 23) return true;
            break;

            //３月２１日頃：春分の日
        case 3:
            if(day == Math.floor(20.8431 + 0.242194 * (year -1980))
               - Math.floor((year - 1980) / 4)) return true;
               break;

               //４月２９日：昭和の日
        case 4:
            if(day == 29) return true;
            break;

            //５月１日：新天皇即位の日※2019年の特例
            //５月３日：憲法記念日
            //５月４日：みどりの日
            //５月５日：こどもの日
        case 5:
            if(year == 2019 && day == 1) return true;
            if(day ==  3) return true;
            if(day ==  4) return true;
            if(day ==  5) return true;
            break;

            //７月第３月曜：海の日　※2020年を除く
            //７月２３日　：海の日　※2020年の特例
            //７月２４日　：スポーツの日　※2020年の特例
        case 7:
            if(year != 2020 && dayOfweek == 1 && numOfweek == 3) return true;
            if(year == 2020 && day == 23) return true;
            if(year == 2020 && day == 24) return true;
            break;

            //８月１０日　：山の日　※2020年の特例
            //８月１１日　：山の日　※2016年以降、2020年を除く
        case 8:
            if(year == 2020 && day == 10) return true;
            if(year != 2020 && year >= 2016 && day ==11) return true;
            break;

            //９月第３月曜：敬老の日
            //９月２３日頃：秋分の日
        case 9:
            if(dayOfweek == 1 && numOfweek == 3) return true;
            if(day == Math.floor(23.2488 + 0.242194 * (year - 1980))
               - Math.floor((year - 1980) / 4)) return true;
               break;

               //１０月第２月曜：体育の日　※2020年を除く
               //１０月２２日：即位礼正殿の儀　※2019年の特例
        case 10:
            if(year != 2020 && dayOfweek == 1 && numOfweek == 2) return true;
            if(year == 2019 && day == 22) return true;
            break;

            //１１月３日：文化の日
            //１１月２３日：勤労感謝の日
        case 11:
            if(day ==  3) return true;
            if(day == 23) return true;
            break;

            //１２月２３日：天皇誕生日　※2018年まで
        case 12:
            if(year <= 2018 && day == 23) return true;
            break;
    }
     return false;
}

//振替休日判定

function checkFurikae(year, month, day) {
    let dayOfweek = new Date(year, month - 1, day).getDay();  //曜日
    let furikaeFlag = false;

    //月曜
    if(dayOfweek == 1) {
        furikaeFlag = checkHoliday(year, month, day - 1);  //曜日
    }
    //火曜
    if(dayOfweek == 2 && furikaeFlag != true) {
        furikaeFlag = checkHoliday(year, month, day - 1)
                   && checkHoliday(year, month, day - 2);
    }
    //水曜
    if(dayOfweek == 3 && furikaeFlag != true) {
        furikaeFlag = checkHoliday(year, month, day - 1)
                   && checkHoliday(year, month, day - 2)
                   && checkHoliday(year, month, day - 3);
    }
    //祝日と祝日に挟まれているかどうか(国民の祝日)
    if((dayOfweek  != 0 && dayOfweek != 6) && furikaeFlag != true){
        let prevDate = new Date(year, month - 1, day);
        let nextDate = new Date(year, month - 1, day);
        prevDate.setDate(prevDate.getDate() - 1); //前日
        nextDate.setDate(nextDate.getDate() + 1); //翌日

        furikaeFlag = checkHoliday(prevDate.getFullYear()
                                 , prevDate.getMonth() + 1
                                 , prevDate.getDate())
                   && checkHoliday(nextDate.getFullYear()
                                 , nextDate.getMonth() + 1
                                 , nextDate.getDate())

     }
     return furikaeFlag;
    }



