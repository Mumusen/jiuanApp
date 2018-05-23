/**
 * Created by Administrator on 2017/3/8.
 */
//设备类型判断  修改状态栏
$.binLib = {};
hrefArr: null,
  function judDevice(dom, num) {
    var top = parseInt(dom.parent().next().css('marginTop'));
    top += num;
    var type = api.systemType;
    var a = dom.parent().attr('class');
    //alert(a);
    var b = a.split(' ');
    var c = String(b[1]);
    console.log(c);
    if (type === 'ios') {
      dom.addClass('iosHeader');
      if (c !== undefined) {
        dom.parent().next().css({
          marginTop: top + 'px'
        });
        dom.css({
          display: 'block'
        });
      } else {
        dom.css({
          display: 'block'
        });
      }
    } else {
      dom.css({
        display: 'none'
      });
    }
  }

//关闭窗口
function closeWindow(tag) {
  api.closeWin({
    name: tag
  })
}

//关闭frame
function closeFrame(tag) {
  api.closeFrame({
    name: tag
  })
}

// 关闭窗口同时刷新
function closeFrameAtuo(tag) {
  api.closeWin({
    name: tag
  })
  api.execScript({
    name: 'root',
    frameName: 'frame2',
    script: "location.reload(); timerChoice = setInterval(function(){" +
      +"themeList.choiceAjaxList()"
      + "},15000);"
  })
}

//打开窗口
function openWindow(tag, obj) {
  api.openWin({
    name: tag,
    url: './' + tag + '.html',
    pageParam: obj,
    allowEdit: true,
    showProgress: true
  })
}

//打开frame
function openFrameWin(tag, obj) {
  api.openFrame({
    name: tag,
    url: './' + tag + '.html',
    pageParam: obj,
    rect: {
      x: 0,
      y: 0,
      w: api.winWidth,
      h: api.winHeight
    },
    bounces: false,
    animation: {
      type: "push",                //动画类型（详见动画类型常量）
      subType: "from_right",       //动画子类型（详见动画子类型常量）
      duration: 300                //动画过渡时间，默认300毫秒
    },
    showProgress: true

  })
}

//判断密码是否非法
function testPwd(pwd) {
  var exp = new RegExp('^[A-Za-z0-9]{6,12}$', 'ig'); //ig;
  var t = pwd.val();
  return exp.test(t);
}

//检测是否为空
function testNull(para) {
  if (para.val() === "") {
    return true
  } else {
    return false
  }
}

//获取验证码 定时器
function testCode(btn) {
  var s = 59;
  var timer = setInterval(function () {
    var str = s + 's';
    btn.addClass("on").css({ color: "#ccc" }).attr({ disabled: "disabled" }).html(str);
    if (s === 0) {
      clearInterval(timer);
      btn.removeAttr("disabled").css({ color: "#fc4444" }).html('重新发送');
    }
    s--;
  }, 1000)
}

//截取字符串
function substri(s, n) {
  return s.substring(0, n);
}

//调用 暂无数据 页面 frame
function openNoData(x, y) {
  api.openFrame({
    name: 'noData',
    url: './noData.html',
    rect: {
      x: x,
      y: y,
      w: api.winWidth,
      h: api.winHeight
    },
    pageParam: {
      name: 'test'
    },
    bounces: true,
    bgColor: 'rgba(0,0,0,0)',
    vScrollBarEnabled: true,
    hScrollBarEnabled: true
  });
}

//格式化金额
function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

//年月日格式化 排序  传入格式必须是arr1 = ['2017-04','2015-05','2016-07','2016-11','2017-12','2015-04','2017-04','2017-04','2017-04']
Date.prototype.format = function (type) {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var h = this.getHours();
  var m = this.getMinutes();
  var s = this.getSeconds();

  month <= 9 ? month = '0' + month : month;
  day <= 9 ? day = '0' + day : day;
  h <= 9 ? h = '0' + h : h;
  m <= 9 ? m = '0' + m : m;
  s <= 9 ? s = '0' + s : s;

  if (type === 'YYYY-MM-DD hh:mm:ss') {
    return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
  } else if (type === 'YYYY-MM-DD') {
    return year + '-' + month + '-' + day;
  } else if (type === 'MM-DD hh:mm:ss') {
    return month + '-' + day + ' ' + h + ':' + m + ':' + s;
  } else if (type === 'hh:mm:ss') {
    return h + ':' + m + ':' + s;
  } else if (type === 'MM-DD') {
    return month + '-' + day;
  } else if (type === 'hh:mm') {
    return h + ':' + m;
  } else {
    return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
  }
}

// //退出应用提示
// function fnInitEventListenner() {
//   api.addEventListener({
//     name: 'keyback'
//   }, function (ret, err) {
//     api.confirm({
//       title: '提示',
//       msg: '是否退出应用',
//       buttons: ['确定', '取消']
//     }, function (ret, err) {
//       if (ret.buttonIndex == 1) {
//         api.closeWidget();
//       }
//     });
//   });
// }

function openLoading() {
  $('.commonLoading').css('display', 'block');
}
function closeLoading() {
  $('.commonLoading').css('display', 'none');
}
//主页面frame
function openFrameOutHF(name, url, obj, num) {
  api.openFrame({
    name: name,
    url: url,
    rect: {
      x: 0,
      y: 0,
      w: api.winWidth,
      h: $api.dom('#main').offsetHeight + num
    },
    reload: true,
    pageParam: obj,
    showProgress: true
  });
}

//关闭多个frameGroup
function closeMoreFrameGroup(arr) {
  for (var i = 0; i < arr.length; i++) {
    api.closeFrameGroup({
      name: arr[i]
    });
  }
}

//检测更新弹出框
function TestUpdateBox() {

  this.init = function (obj, callback) {
    var $this = this;
    var ret = {};
    this.pageHTML(obj);

    $('.buttonContainer').on('click', 'button', function () {
      var indextype = $(this).attr('data-index');
      //            console.log("cancel");
      //             if(indextype === 'cancel'){
      $('.testUpdate').remove();
      // }
      ret.resultCheck = indextype;
      ret.query = '.testUpdate';
      callback(ret);
      //            $('.clickEventIndex').html($(this).attr('data-index'));
    });
  }
  this.pageHTML = function (data) {
    var html =
      '<div class="testUpdate">' +
      '<div class="title">更新提示</div>' +
      '<div class="updateContent">' +
      '<p class="version">版本号: <span>' + data.version + '</span></p>' +
      '<p class="content">更新内容： <span>' + data.content + '</span></p>' +
      '</div>' +
      '<div class="buttonContainer">' +
      '<button class="cancel" data-index="cancel">取消</button>' +
      '<button class="confirm" data-index="confirm">确认</button>' +
      '</div><b class="clickEventIndex" style="display: none;"></b>' +
      '</div>';

    $('body').append(html);
  }
}

//加载更多
function LoadingMore() {
  this.open = function (obj, styleCss) {
    var isJquery = obj instanceof jQuery;//是否为jquery对象
    if (styleCss === undefined || styleCss === null) {
      styleCss = {};
    }
    if (isJquery) {//如果为jquery对象
      //styleCss可以不传入
      //传入后
      var isObject = Object.prototype.toString.call(styleCss);//是否为对象
      //判断传入的是否是对象
      if (isObject === '[object Object]') {
        var html = this.loadingHTML(styleCss);
        obj.append(html);//渲染页面
        if (styleCss.color === undefined || styleCss.color === null) {
          styleCss.color = "#49406f";
        }
        $('.loadingMore').css({
          color: styleCss.color
        });
      } else {
        throw new Error(styleCss + "is not Object");
      }

    } else {
      throw new Error(obj + "is not jquery Object");
    }
  }

  this.loadingHTML = function (styleCss) {
    //loading图路径
    if (styleCss.url === undefined || styleCss.url === null) {
      styleCss.url = "../image/loading_more.gif";
    }
    var html =
      '<div class="loadingMore">' +
      '<span><img src="' + styleCss.url + '"><b>正在加载...</b></span>' +
      '</div>';
    return html;
  }
  this.close = function () {
    $('.loadingMore').remove();
  }
}
//公共样式弹窗
function commonAlertWindow(obj) {
  var html =
    '<div class="commonAlertBox">' +
    '<div class="alertContent">' +
    obj.message +
    '</div>' +
    '</div>';
  $('body').append(html);

  setTimeout(function () {
    $('.commonAlertBox').remove();
  }, 2000)
}
// WaitLoading等待加载
// function WaitLoading(){
//     this.open = function(){
//         var html = '<div class="loading"></div>';
//         $('body').append(html);
//     }
//     this.close = function(str=600) {
//         setTimeout(function () {
//             $('.loading').remove();
//         },str)
//     }
// }
function WaitLoading() {
  this.open = function () {
    var html =
      '<div class="loading-background">' +
      '  <div class="loading"></div>' +
      '</div>';
    $('body').append(html);
  };
  this.close = function () {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1200;

    setTimeout(function () {
      $('.loading-background').remove();
    }, str);
  };
}


// 下拉刷新
function downRefresh() {
  api.setRefreshHeaderInfo({
    loadingImg: 'widget://image/refresh.png',
    bgColor: '#eee',
    textColor: '#333',
    textDown: '',
    textUp: ''
  }, function (ret, err) {
    //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
    // alert('刷新完毕')
    location.reload();

    api.refreshHeaderLoadDone();
  }
  );
}
// 状态栏显示
function scroLL() {
  $(window).scroll(function () {
    var toTop = $(window).scrollTop();
    // console.log(toTop)
    if (toTop > 93) {
      $('.barTopStu').css('opacity', '1');
    } else {
      $('.barTopStu').css('opacity', '0');
    }
  })
}
//去掉所有的html标记
function delHtmlTag(str) {
  str = str.replace(/<[^>]+>|(^\s+)|(\s+$) | &nbsp;/g, "");
  str = str.replace(/&emsp;/ig, '');
  return str.replace(/&nbsp;/ig, '');
}
// 格式化标题
function delHtmlTagTitle(str) {
  str = str.replace(/<[^>]+>/g, "")
  if (str.length > 16) {
    str = str.substring(0, 16) + "...";
  }
  //去掉所有的html标记
  return str.replace(/<[^>]+>/g, "");
}
// 格式化标题关注营业部
function followHtmlTagTitle(str) {
  str = str.replace(/<[^>]+>/g, "")
  if (str.length > 16) {
    str = str.substring(0, 14) + "...";
  }
  return str;
}
// 格式化标题咨询
function delHtmlTagTitleNew(str) {
  str = str.replace(/<[^>]+>/g, "");
  if (str.length > 16) {
    str = str.substring(0, 15) + "...";
  }
  return str;
}
// 格式化摘要
function delHtmlTagTxt(str) {
  str = str.replace(/<[^>]+>/g, "");
  return str.substring(0, 40) + "...";
}

// 格式化摘要
function delHtmlinfo(str, num) {
  str = str.replace(/<[^>]+>[ ]/g, "");
  return str.substring(0, num) + "...";
}

// 格式化摘要
function delHtmlNews(str) {
  str = str.replace(/<[^>]+>/g, "");
  return str;
}

//补齐两位小数
function toTwo(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    // alert('function:toTwo->parameter error');
    return false;
  }
  var f_x = Math.round(x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}
// 获取URL参数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

// 自动刷新
function autoAjax() {
  api.execScript({
    name: 'root',
    frameName: "frame2",
    script: 'window.clearInterval(themeList.timerChoice)'
  });
}
// 股票判断时间戳
function stockTimeIf() {
  var nowDate = new Date().getTime();
  // 现在的周几
  var nowDateWeekday = new Date().getDay();
  // 获取当天
  var now = new Date();

  
  // 当天 上午9:30 时间戳
  var am_Nine = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '9', '30')).getTime();
  // console.log("now:"+now.slice(0,4)+"---"+now.slice(5,7)+"---"+now.slice(8, now.length))
  // 当天 上午11:30 时间戳
  var am_Eleven = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '10','30')).getTime();
  // 当天 下午1:00 时间戳
  var pm_One = (new Date(now.getFullYear(), now.getMonth(), now.getDate(),'13')).getTime();
  // 当天 下午3:00 时间戳
  var pm_Three = (new Date(now.getFullYear(), now.getMonth(), now.getDate(),'15')).getTime();
  // 如果在工作日
  console.log(nowDateWeekday)
  if (nowDateWeekday >= 1 && nowDateWeekday <= 5) {
    console.log(nowDate+"***"+ am_Nine +"*"+ nowDate +"*"+ am_Eleven)
    if (nowDate >= am_Nine && nowDate <= am_Eleven) {
      console.log(22222)
      return true;
    }
    console.log(nowDate+"***"+ pm_One +"*"+ pm_Three)
    if (nowDate >= pm_One && nowDate <= pm_Three) {
    return true;
    }
  } else {
    return false;
  }
}

//ajax url公共配置
function url() {
  return 'http://39.107.14.227:80/'; 
  // return 'http://192.168.0.184:8080/';
}
