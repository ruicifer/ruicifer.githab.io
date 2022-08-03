//指定した年月によりカレンダーを作成
function makeCalendar(year,month) {
    //指定年月の最終日(1－31)を取得　※（月は0開始ではない）
    const monthDays = new Date(year,month, 0).getDate();
    //指定年月の最初の曜日（0－6）を取得
    const firstDay  = new Date(year,month - 1, 1).getDay();
    //指定年月の最後の曜日（0－6）を取得
    const lastDay   = new Date(year,month - 1, monthDays).getDay();
    //最初の曜日を格納
    let dayOfweek = firstDay;

    //カレンダー出力用文字列の作成
    let str ='';
    str += '<table>';
    str += '<tr>';
    str += '<th id="sun">日</th>';
    str += '<th id="mon">月</th>';
    str += '<th id="tue">火</th>';
    str += '<th id="wed">水</th>';
    str += '<th id="thu">木</th>';
    str += '<th id="fri">金</th>';
    str += '<th id="sat">土</th>';
    str += '</tr>';
    str += '<tr>';

    //その月の第一日目が始まる曜日まで空白で埋める
    for(let i = 0; i < firstDay; i++) {
        str += '<td>&nbsp;</td>'; 
    }
    //その月の日数分ループ
    for(let j = 1; j <= monthDays; j++) {
        //週替わりの処理
        if((firstDay + j) % 7 == 1) {
            dayOfweek = 0;   //日曜日に戻す
            str +='</tr>';
            str += '<tr>';
        }
        str += '<td';
        str += ' year     = "' + year + '"';
        str += ' month    = "' + month + '"';
        str += 'day       = "' + j + '"';    
        str += 'dayOfweek = "' + dayOfweek + '"';
        //当日かどうか判断
        if(   year  == new Date().getFullYear()
           && month == new Date().getMonth() + 1
           && j     == new Date().getDate()
        )
        {
            str += ' id="today"';
        }
         //日曜または休日かどうか判断
         if(dayOfweek == 0
            || checkHoliday(year, month, j)
            || checkFurikae(year, month, j)
         ){
            str += ' class="holiday"';
        }
        //日付選択時の処理
        str += ' onclick="selectDay(this);" ';

        str += '>' + j + '</td>';
        dayOfweek++;    
    }
   //その月の最終日以降を空白で埋める
    for (let k = 0; k < (6 - lastDay); k++) {
        str += '<td>&nbsp;</td>';        
    }
    str += '</tr>';
    str += '</table>';

    //カレンダーヘッダーの書き出し
    document.getElementById("headerYear").innerHTML = year;
    document.getElementById("headerMonth").innerHTML = month;
    //カレンダーの書き出し
    document.getElementById("calendar").innerHTML = str;
}

//日付選択時の処理
function selectDay(e) {

    //選択された日付の年月日を取得
    var year        =e.getAttribute("year");
    var month       =e.getAttribute("month");
    var day         =e.getAttribute("day");
    var dayOfweek   = '日月火水木金土'[e.getAttribute("dayOfweek")];

    // 選択した日付を表示
    showInputArea();
    document.getElementById("selectInfo").innerHTML = '<h2>' +
    month + '月' +day + '日 (' + dayOfweek + ') の予定</h2>';

    //選択した日付をセッションストレージに格納
    sessionStorage.setItem("day", day);

    //選択した日付のデータ(同一インデックス)を表示
    getDayData();

} 















