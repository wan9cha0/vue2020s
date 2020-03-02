export default {
  // 金额转换
  moneyfn(num) {
    num = num.toFixed(2);
    num = parseFloat(num)
    // num = num.toLocaleString();
    return num;
  },
  // 手机号验证
  isPhone(e) {
    let flag = true;
    if (!/^1[34578]\d{9}$/.test(e)) {
      flag = false
    }
    return flag
  },
  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  getAllArray(array, index, callback) {
    if (array[index]) {
      index -= 1
      callback()
    } else {
      return false
    }
  },
  // 时间格式转换
  Dateformat(formatdate, format) {
    var date = {
      "M+": formatdate.getMonth() + 1,
      "d+": formatdate.getDate(),
      "h+": formatdate.getHours(),
      "m+": formatdate.getMinutes(),
      "s+": formatdate.getSeconds(),
      "q+": Math.floor((formatdate.getMonth() + 3) / 3),
      "S+": formatdate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (formatdate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
          date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  },
  // 获取当天日期
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  //获得本周的开始日期 
  getWeekStartDate(day) {
    var _this = this
    var datas = []
    var now = new Date(day); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getYear(); //当前年 
    nowYear += (nowYear < 2000) ? 1900 : 0; //ZZ
    for (var i = 0; i < 7; i++) {
      var weekStartDate = new Date(nowYear, nowMonth, nowDay + (i - nowDayOfWeek));
      datas.push(_this.Dateformat(weekStartDate, 'yyyy-MM-dd'))
    }
    return datas
  },
  // 时间格式转时间戳
  getTimes(e) {
    return new Date(e).getTime()
  },
  /**
   * 时间转为秒
   * @param time 时间(00:00:00)
   * @returns {string} 时间戳（单位：秒）
   */
  time_to_sec(time) {
    var s = '';

    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];

    s = Number(hour * 3600) + Number(min * 60) + Number(sec);

    return s;
  },
  /**
   *获取几个月前的输入日期
   *{param:DateTime} date 输入日期(YYYY-MM-DD)
   *{param:number } monthNum 月数
   */
  GetPreMonthDay(date, monthNum) {
    var dateArr = date.split("-");
    var year = dateArr[0]; //获取当前日期的年份
    var month = dateArr[1]; //获取当前日期的月份
    var day = dateArr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - monthNum;
    if (month2 <= 0) {
      var absM = Math.abs(month2);
      year2 =
        parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
      month2 = 12 - (absM % 12);
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    var t2 = year2 + "-" + month2 + "-" + day2;
    return t2;
  },
  // 调试代码
  cs(e) {
    return console.log(JSON.stringify(e, undefined, 2))
  },
  // 迭代递归法：深拷贝对象与数组
  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  // 获取时间短 /天
  // startDate: 计划开始时间； endDate：计划结束时间；dayLength：每隔几天，0-代表每天，1-代表日期间隔一天
  getDateStr(startDate, endDate, dayLength) {
    var str = startDate;
    for (var i = 0;; i++) {
      var getDate = getTargetDate(startDate, dayLength);
      startDate = getDate;
      if (getDate <= endDate) {
        str += ',' + getDate;
      } else {
        break;
      }
    }
    // startDate: 开始时间；dayLength：每隔几天，0-代表获取每天，1-代表日期间隔一天
    function getTargetDate(date, dayLength) {
      dayLength = dayLength + 1;
      var tempDate = new Date(date);
      tempDate.setDate(tempDate.getDate() + dayLength);
      var year = tempDate.getFullYear();
      var month = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
      var day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
      return year + "-" + month + "-" + day;
    }
    return str
  },
  // 获取随机数 
  randomWord() {
    var str = " "
    var range = 32
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    for (var i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * (arr.length - 1))]
    }
    return str;
  },
  // 获取服务器地址
  getOrigin(url) {
    let origin = window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    origin += url
    return origin
  }
}