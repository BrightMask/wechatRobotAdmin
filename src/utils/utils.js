/*
 * @Author: your name
 * @Date: 2020-06-14 12:29:32
 * @LastEditTime: 2020-10-14 23:18:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc\src\utils\utils.js
 */ 

 // 年月日转换
export  function formdateTime(dateValue) {
    let dateNum = new Date(dateValue)

    let year = dateNum.getFullYear()
    let month = dateNum.getMonth() > 9 ? dateNum.getMonth() : '0'+ dateNum.getMonth()
    let day = dateNum.getDay() > 9 ? dateNum.getDay() : '0' + dateNum.getDay()
    let hours = dateNum.getHours() > 9 ? dateNum.getHours() : '0' + dateNum.getHours()
    let minus = dateNum.getMinutes() > 9 ? dateNum.getMinutes() : '0' + dateNum.getMinutes()
    let secnds = dateNum.getSeconds() > 9 ? dateNum.getSeconds() : '0' + dateNum.getSeconds()
    // let dateFormDate = {
    //     year: year,
    //     month: month,
    //     day: day,
    //     hours: hours,
    //     minus: minus,
    //     secnds: secnds
    // }
    let dateFormDate = year + '-' + month + '-' + day + '  ' + hours + ':' + minus + ':' + secnds
    return dateFormDate 
}

export function reamianTime(timeValue) {
    let curTime = new Date()
}


// 随机字符串
export  function randomString(randomLen, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
               'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
               'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
               'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
               'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomLen){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

let timeObj = {
    day: null,
    hour: null,
    min: null,
    sec: null
}
// 倒计时
export function remainTime(start, end) {
    var count = 0;//计时器开始时，给一个全局变量用于减少时间差（以秒为单位，每次增加1）
        count += 1;//该方法执行几次，count相应++
        var date1 = new Date(start);
        var date2 = new Date(end);
        var s1 = date1.getTime();
        var s2 = date2.getTime();//毫秒为单位
        var total = (s2 - s1) / 1000 - count;//每执行一次，减少时间差-1
        var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
        var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
        var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
        var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
        var min = parseInt(afterHour / 60); //计算整数分
        var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;

        return  timeObj = {
            day: day > 0 ? parseInt(day) : 0,
            hour:hour> 0 ? parseInt(hour): 0,
            min:min > 0 ? parseInt(min) : 0,
            sec:afterMin > 0 ? parseInt(afterMin) : 0
        }

}