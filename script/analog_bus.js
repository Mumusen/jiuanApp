var analog = {
  // 定时器 请求股票
  timeAjaxStock: function (code) {
    var $this = this;
    this.timer = setInterval(function () {
      console.log('股票代码' + code);
      if (code >= 6) {
        $this.stockBtnAjaxFive(code);
      }
    }, 3000);
  },
  // 单股查询数据 time
  sotckAjax: function () {
    var $this = this;
    if ($("#openPrice").val() != "") {
      var code = $("#searchStocks").attr('data-code');
      console.log("单股查询数据", JSON.stringify(code))
      $this.stockBtnAjax(code);
    }
  },
  // 买
  buyListQuery: function () {
    this.queryAllSecurityModel();
    this.queryAjax();
    this.queryHoldStockList(1);
    this.btnDealAjax();
  },
  // 卖
  buyList: function () {
    this.queryHoldStockList(1);
    this.btnDealAjax();
  },
  // 持仓
  HoldStock: function () {
    this.queryHoldStockList(1);
    this.queryStockBalance();
  },
  // 缓存所有数据
  queryAllSecurityModel: function () {
    api.ajax({
      url: url3() + 'stock/QueryAllSecurityModel',
    }, function (ret, err) {
      var sotckArray = JSON.stringify(ret);
      $api.setStorage('sotckArray', sotckArray);
    });
  },
  // 模糊查询
  queryAjax: function () {
    var stocksInterface = $('.search-list');
    var searchStocks = $('#searchStocks');
    var $this = this;
    searchStocks.keyup(function (e) {
      var val = $(this).val();
      console.log(JSON.stringify(val))
      if (val === '') {
        stocksInterface.hide();
      } else {
        $this.stockSearch(val);//发起请求
        e.stopPropagation();
        stocksInterface.show();
      }
      if (val.length < 6) {
        $('.sell-list').show();
      }
    });
    //选项选择事件
    stocksInterface.on('click', 'li', function () {
      // console.log("选择股票" + $(this).html())
      // stocksInterface.hide();
      var code = $(this).attr('data-code');
      // console.log(JSON.stringify(code));
      searchStocks.val($(this).html());
      searchStocks.attr('data-code', code)
      stocksInterface.hide();
      // 查询行情请求
      $this.stockBtnAjax(code);
    });
  },
  // 查询行情
  stockSearch: function (param) {
    var html = '';
    var searchContent = $('#searchContent');
    var sotckArray = JSON.parse($api.getStorage('sotckArray'));
    // console.log(JSON.stringify(sotckArray))
    var filterArr = sotckArray.filter(function (item) {
      return item.data.indexOf(param) !== -1 || item.name.indexOf(param) !== -1;
    });
    var arrList = filterArr.slice(0, 10);
    if (arrList) {
      // console.log(JSON.stringify(arrList))
      for (var i = 0; i < arrList.length; i++) {
        var stock = arrList[i];
        // console.log(stock)
        html += '<li calss="stockBtnAjax" data-code="' + stock.data + '">' + stock.name + stock.data + '</li>';
      }
      searchContent.html(html);
    } else {
      searchContent.html('<li>- -没有相关股票信息- -</li>')
    }
  },
  // 请求
  stockBtnAjax: function (code) {
    // console.log(JSON.stringify(code))
    var $this = this;
    var waitLoading = new WaitLoading();
    var data = { securityCode: code };
    // console.log(JSON.stringify(data))
    api.ajax({
      // 查询 单独服务器 与其他接口不一样
      url: 'http://md.icaopan.com/openapi/queryMarketDataBySecurityCode',
      data: {
        values: {
          securityCode: code
        }
      }
    }, function (ret, err) {
      console.log("请求", JSON.stringify(ret))
      clearInterval($this.timer);
      if (ret.info.result != null) {
        var ret = ret.info.result;
        if (ret.suspensionFlag == false) {
          $("#downLimit").html('跌停' + ret.downLimit);
          $("#upLimit").html('涨停' + ret.upLimit);
          $("#openPrice").val(ret.openPrice);//现价
          $("#askPrice1").html(parseInt(ret.askPrice1));//卖1价
          $("#askVolume1").html(parseInt(ret.askVolume1));//卖1量
          $("#askPrice2").html(parseInt(ret.askPrice2));//卖2价
          $("#askVolume2").html(parseInt(ret.askVolume2));//卖2量
          $("#askPrice3").html(parseInt(ret.askPrice3));//卖3价
          $("#askVolume3").html(parseInt(ret.askVolume3));//卖3量
          $("#askPrice4").html(parseInt(ret.askPrice4));//卖4价
          $("#askVolume4").html(parseInt(ret.askVolume4));//卖4量
          $("#askPrice5").html(parseInt(ret.askPrice5));//卖5价
          $("#askVolume5").html(parseInt(ret.askVolume5));//卖5量
          $("#bidPrice1").html(parseInt(ret.bidPrice1));//买1价
          $("#bidVolume1").html(parseInt(ret.bidVolume1));//买1量
          $("#bidPrice2").html(parseInt(ret.bidPrice2));//买2价
          $("#bidVolume2").html(parseInt(ret.bidVolume2));//买2量
          $("#bidPrice3").html(parseInt(ret.bidPrice3));//买3价
          $("#bidVolume3").html(parseInt(ret.bidVolume3));//买3量
          $("#bidPrice4").html(parseInt(ret.bidPrice4));//买4价
          $("#bidVolume4").html(parseInt(ret.bidVolume4));//买4量
          $("#bidPrice5").html(parseInt(ret.bidPrice5));//买5价
          $("#bidVolume5").html(parseInt(ret.bidVolume5));//买5量
          // 查可买量
          // $("#buyNum").html(ret.buyNum);
          if ($("#buyNum").attr("data-type") == "0") {
            $this.canBuyNumber();
          } else {
            $this.cansellNumber(code);
          }
          waitLoading.close();
          $this.timeAjaxStock(code);
          $this.buyNumBtn();
        } else {
          commonAlertWindow({
            message: "已停牌"
          });
        }
      } else {
        commonAlertWindow({
          message: "已停牌"
        });
      }
    });
  },
  // 请求五档查询
  stockBtnAjaxFive: function (code) {
    // console.log(JSON.stringify(code))
    var $this = this;
    var waitLoading = new WaitLoading();
    var data = { securityCode: code };
    // console.log(JSON.stringify(data))
    api.ajax({
      // 查询 单独服务器 与其他接口不一样
      url: 'http://md.icaopan.com/openapi/queryMarketDataBySecurityCode',
      data: {
        values: {
          securityCode: code
        }
      }
    }, function (ret, err) {
      console.log("请求", JSON.stringify(ret))
      clearInterval($this.timer);
      if (ret.info.result != null) {
        var ret = ret.info.result;
        if (ret.suspensionFlag == false) {
          $("#downLimit").html('跌停' + ret.downLimit);
          $("#upLimit").html('涨停' + ret.upLimit);
          $("#askPrice1").html(parseInt(ret.askPrice1));//卖1价
          $("#askVolume1").html(parseInt(ret.askVolume1));//卖1量
          $("#askPrice2").html(parseInt(ret.askPrice2));//卖2价
          $("#askVolume2").html(parseInt(ret.askVolume2));//卖2量
          $("#askPrice3").html(parseInt(ret.askPrice3));//卖3价
          $("#askVolume3").html(parseInt(ret.askVolume3));//卖3量
          $("#askPrice4").html(parseInt(ret.askPrice4));//卖4价
          $("#askVolume4").html(parseInt(ret.askVolume4));//卖4量
          $("#askPrice5").html(parseInt(ret.askPrice5));//卖5价
          $("#askVolume5").html(parseInt(ret.askVolume5));//卖5量
          $("#bidPrice1").html(parseInt(ret.bidPrice1));//买1价
          $("#bidVolume1").html(parseInt(ret.bidVolume1));//买1量
          $("#bidPrice2").html(parseInt(ret.bidPrice2));//买2价
          $("#bidVolume2").html(parseInt(ret.bidVolume2));//买2量
          $("#bidPrice3").html(parseInt(ret.bidPrice3));//买3价
          $("#bidVolume3").html(parseInt(ret.bidVolume3));//买3量
          $("#bidPrice4").html(parseInt(ret.bidPrice4));//买4价
          $("#bidVolume4").html(parseInt(ret.bidVolume4));//买4量
          $("#bidPrice5").html(parseInt(ret.bidPrice5));//买5价
          $("#bidVolume5").html(parseInt(ret.bidVolume5));//买5量
          // 查可买量
          // $("#buyNum").html(ret.buyNum);
          if ($("#buyNum").attr("data-type") == "0") {
            $this.canBuyNumber();
          } else {
            $this.cansellNumber(code);
          }
          $this.timeAjaxStock(code);
          $this.buyNumBtn();
        } else {
          commonAlertWindow({
            message: "已停牌"
          });
        }
      } else {
        commonAlertWindow({
          message: "已停牌"
        });
      }
    });
  },
  // 可买量
  canBuyNumber: function () {
    var $this = this;
    var token = $api.getStorage("token");
    var data = { token: token };
    console.log("传参:" + data)
    api.ajax({
      url: url3() + 'openapi/v1/queryStockBalance',
      // method: 'post',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      // console.log("资产查询"+JSON.stringify(ret));
      if (ret.info.rescode == "success") {
        var cashAvailableAmount = ret.info.result.cashAvailableAmount;
        var buy = $("#bidPrice1").html();
        console.log(JSON.stringify(cashAvailableAmount), JSON.stringify(buy))
        // 现金可用余额/买一价= 100整数倍   （可买）
        // Math.floor(475968.26/10.61) - Math.floor(475968.26/10.61) % 100
        var buyNub = Math.floor(cashAvailableAmount / buy) - Math.floor(cashAvailableAmount / buy) % 100;
        $("#buyNum").html("可买：" + buyNub);
        $this.numStockBtn(buyNub);
      }
    })
  },
  // 可卖量
  cansellNumber: function (stockCode) {
    var $this = this;
    var token = $api.getStorage("token");
    var data = { token: token, stockCode: stockCode };
    console.log("传参:" + data)
    api.ajax({
      url: url3() + 'openapi/v1/queryHoldedStockByStockCode',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("可卖量" + JSON.stringify(ret));
      if (ret.info.rescode == "success") {
        if (ret.info.result.availableAmount != null) {
          var availableAmount = ret.info.result.availableAmount;
          $("#buyNum").html("可卖：" + availableAmount);
          $this.numStockBtn(availableAmount);
        } else {
          $("#buyNum").html("可卖：" + 0);
          $("#buyNumBtn").val('0');
        }
      }
    })
  },
  // 加减仓
  buyNumBtn: function () {
    $("#btnBuyNum i").click(function () {
      var num = $("#openPrice").val() * 1;
      if ($("#openPrice").val() != "") {
        console.log($(this).attr("data-btn"))
        if ($(this).attr("data-btn") == "0") {
          num -= 0.01;
        } else if ($(this).attr("data-btn") == "1") {
          num += 0.01;
        }
        $("#openPrice").val(num.toFixed(2))
      } else {
        commonAlertWindow({
          message: "请选择股票"
        });
      }
    })
  },
  // 计算仓位
  numStockBtn: function (num) {
    var $li = $('#numStockBtn span');
    $li.mouseover(function () {
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      var tabNum = $this.attr('data-code');
      // waitLoading.open();
      // 向下取整、100的整数倍 提交判断  仓位100的整数倍
      if (tabNum == '0') {
        $("#buyNumBtn").val(num);
      } else if (tabNum == '1') {
        $("#buyNumBtn").val(Math.floor(num / 2) - Math.floor(num / 2) % 100);
      } else {
        $("#buyNumBtn").val(Math.floor(num / 3) - Math.floor(num / 3) % 100);
      }
    })
  },
  //股票委托交易 买/卖
  btnDealAjax: function () {
    var $this = this;
    $("#btnDeal").click(function () {
      var token = $api.getStorage('token');
      // var token = 'token';
      var sellOrBuy = $(this).attr("data-deal");
      var stockCode = $("#searchStocks").attr("data-code");
      var price = $("#openPrice").val() * 1;
      var quantity = $("#buyNumBtn").val();
      var priceBuy = quantity % 100;
      console.log("买卖类型" + JSON.stringify(sellOrBuy));
      if (stockCode == "") {
        commonAlertWindow({
          message: "请选择交易股票"
        });
      } else if (price == "") {
        commonAlertWindow({
          message: "请输入购买价格"
        });
      } else if (quantity == "") {
        commonAlertWindow({
          message: "请输入购买量"
        });
      } else if (priceBuy != 0) {
        commonAlertWindow({
          message: "至少100股<br>且为100的整数倍"
        });
      } else if (quantity == "0") {
        commonAlertWindow({
          message: "请购买"
        });
      } else {
        var waitLoading = new WaitLoading();
        // waitLoading.open();
        console.log("用户token", token, '股票代码', stockCode, '委托数量', quantity, '交易方向，0：买入，1：卖出', sellOrBuy, '委托价格', price);
        // $this.checkBuyPwdDom();
        $this.transactionAjax(token, stockCode, quantity, sellOrBuy, price);
      }
    })
  },
  // 交易买卖 委托请求
  transactionAjax: function (token, stockCode, quantity, sellOrBuy, price) {
    //用户token//股票代码//委托数量//交易方向，0：买入，1：卖出//委托价格
    var $this = this;
    var data = { token: token, stockCode: stockCode, quantity: quantity, sellOrBuy: sellOrBuy, price: price };
    api.ajax({
      url: url3() + 'openapi/v1/doPlacementStockTrade',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("ret" + JSON.stringify(ret))
      console.log("err" + JSON.stringify(err))
      if (ret.info.rescode == "success") {
        // console.log(JSON.stringify(ret.info.result))
        commonAlertWindow({
          message: ret.info.result
        });
        setTimeout(function(){
          location.reload();
        },2000)
      } else {
        commonAlertWindow({
          message: ret.info.result
        });
      }
    })
  },
  // 持仓查询列表
  queryHoldStockList: function (pageNo) {
    // var token = $api.getStorage('token');
    var $this = this;
    // var token = 'token';
    var html = "";
    var token = $api.getStorage("token");
    var data = { token: token, pageNo: pageNo, pageSize: '5' }
    if (token != '') {
      api.ajax({
        url: url3() + 'openapi/v1/queryHoldStockListByPage',
        data: {
          values: {
            paraJson: JSON.stringify(data)
          }
        }
      }, function (ret, err) {
        // console.log("的法萨芬" + JSON.stringify(ret))
        var ret = ret.info;
        if (ret.rescode == 'success') {
          // console.log("12121")
          var data = ret.result.dataList;
          // console.log("222" + JSON.stringify(data))
          for (var i = 0; i < data.length; i++) {
            var msg = data[i];
            // console.log("333" + JSON.stringify(msg))
            html += $this.holdStockDom(msg);
          }
          $("#holdStockList").append(html);
          $this.btnStockCode();
        }
      })
    }
  },
  holdStockDom: function (msg) {
    var html = classRed = '';
    if (msg.marketProfit > 0) { classRed = 'red'; }
    html =
      '<ul class="vip-list btnStockCode" data-code="' + msg.securityCode + '" data-sotck="' + msg.securityName + '" data-num="' + msg.availableAmount + '">' +
      '   <li>' +
      '      <h2>' + msg.securityName + '</h2>' +
      '      <p>' + unitConvert(msg.marketValue) + '</p>' +
      '   </li>' +
      '   <li class="' + classRed + '">' +
      '      <p>' + unitConvert(msg.marketProfit) + '</p>' +
      '      <p>' + returnFloat(msg.marketProfitPercent) + '%</p>' +
      '   </li>' +
      '   <li>' +
      '      <p>' + msg.amount + '</p>' +
      '      <p>' + msg.availableAmount + '</p>' +
      '   </li>' +
      '   <li>' +
      '     <p>' + returnFloat(msg.costPrice) + '</p>' +
      '     <p>' + returnFloat(msg.latestPrice) + '</p>' +
      '   </li>' +
      '</ul>';
    return html;
  },
  btnStockCode: function () {
    var $this = this;
    $(".btnStockCode").click(function () {
      console.log(JSON.stringify($(this).attr("data-code")));
      var code = $(this).attr("data-code");
      var stockName = $(this).attr("data-sotck") + " " + code;
      var num = $(this).attr("data-num");
      $this.btnStockCodeAjax(stockName, num, code);
    })
  },
  btnStockCodeAjax: function (stockName, num, code) {
    $("#searchStocks").val(stockName);
    $("#searchStocks").attr('data-code', code)
    $("#buyNumBtn").val(num);
    this.stockBtnAjax(code);
  },
  // 用户资产查询
  queryStockBalance: function () {
    var $this = this;
    // var token = "token";
    var token = $api.getStorage("token");
    var data = { token: token };
    if (token != '') {
      api.ajax({
        url: url3() + 'openapi/v1/queryStockBalance',
        data: {
          values: {
            paraJson: JSON.stringify(data)
          }
        }
      }, function (ret, err) {
        console.log(JSON.stringify(ret));
        if (ret.info.rescode == "success") {
          var msg = ret.info.result;
          html = $this.queryStockDom(msg);
          $("#analogUser").append(html);
        } else if (ret.info.rescode == "login") {
          $this.tokenPwdAjaxTime();
        } else {
          commonAlertWindow({
            message: "网络异常"
          });
        }
      })
    }
  },
  // 用户资产查询DOM
  queryStockDom: function (ret) {
    // console.log(JSON.stringify(ret));
    var html = classNum = "";
    if (ret.profitValue < 0) {
      classNum = "num";
    }
    if (ret.warnLine < 0) {
      classNum = "num";
    }
    html =
      '<ul>' +
      '  <li>' +
      '    <h3>总资产</h3>' +
      '    <p>' + returnFloat(ret.totalAmount) + '</p>' +
      '  </li>' +
      '  <li>' +
      '    <h3>持仓总盈亏</h3>' +
      '    <p class="' + classNum + '">' + returnFloat(ret.profitValue) + '</p>' +
      '  </li>' +
      '  <li>' +
      '    <h3>股票市值</h3>' +
      '    <p>' + returnFloat(ret.marketValue) + '</p>' +
      '  </li>' +
      '</ul>' +
      '<ul>' +
      '  <li>' +
      '    <h3>可用余额</h3>' +
      '    <p>' + returnFloat(ret.cashAvailableAmount) + '</p>' +
      '  </li>' +
      '  <li>' +
      '    <h3>亏损警告线</h3>' +
      '    <p class="' + classNum + '">' + returnFloat(ret.warnLine) + '</p>' +
      '  </li>' +
      '  <li>' +
      '    <h3>亏损平仓线</h3>' +
      '    <p>' + returnFloat(ret.openLine) + '</p>' +
      '  </li>' +
      '</ul>';
    return html;
  },
  // 当日可撤单委托列表
  cancelList: function () {
    var $this = this;
    var html = "";
    // var token = $api.getStorage('token');
    var token = $api.getStorage("token");
    var data = { token: token }
    api.ajax({
      url: url3() + 'openapi/v1/queryCurrentDayPlacementNotEnd',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret));
      if (ret.info.rescode == "success") {
        var data = ret.info.result;
        for (var i = 0; i < data.length; i++) {
          var msg = data[i];
          console.log("333" + JSON.stringify(msg))
          html += $this.cancelDome(msg);
        }
        $("#analogTodayCancel").append(html);
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
    })
  },
  cancelDome: function (msg) {
    console.log(JSON.stringify(msg))
    var className = className2 = "";
    if (msg.placementPrice > 0) {
      className = "red"
    }
    if (msg.tradeType == "BUY") {
      className2 = "red"
    } else {
      className2 = "green"
    }
    var html =
      '<ul class="vip-list">' +
      '  <li>' +
      '    <h2>' + msg.securityName + '</h2>' +
      '    <p>' + msg.createTimeStr.substring(0, 10) + '</p>' +
      '  </li>' +
      '  <li class="' + className + '">' +
      '    <div class="num">' + returnFloat(msg.placementPrice) + '</div>' +
      '  </li>' +
      '  <li>' +
      '    <p>' + msg.placementQty + '</p>' +
      '    <p>' + msg.filledQty + '</p>' +
      '  </li>' +
      '  <li>' +
      '    <p class="' + className2 + '">' + msg.tradeTypeDisplay + '</p>' +
      '    <p>' + msg.placementStatusDisplay + '</p>' +
      '  </li>' +
      '</ul>';
    return html;
  },
  // token 过期重新输入交易密码
  tokenPwdAjaxTime: function () {
    var DOM =
      '  <div class="stateLayer check-layer">' +
      '    <div class="box box-pwd">' +
      '      <h2>输入交易密码</h2>' +
      '      <div class="pwd-control" id="payPwdTime">' +
      '          <div class="box-control">' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '          </div>' +
      '      </div>' +
      '      <button id="buyBtnAjax" data-code="1">确 定</button>' +
      '      <p onclick="openWindow(\'forgetDealPwd\',{},\'push\')">忘记密码?</p>' +
      '      <i class="exitWindow"></i>' +
      '    </div>' +
      '  </div>';
    $("body").append(DOM);
    this.analogSetDeal();
  },
  // 校验交易密码
  analogSetDeal: function () {
    var pwd = "";
    var $this = this;
    $("#payPwdTime").payPwd({
      max: 6,
      type: "password",
      callback: function (arr) {
        // $("#inputtype").html(arr);
        pwd = arr;
      }
    })
    $("#buyBtnAjax").click(function () {
      $this.inputBuyPassWord(pwd);
    })
    $(".exitWindow").click(function () {
      $(".check-layer").remove();
    })
  },
  // 校验交易密码是否正确
  inputBuyPassWord: function (pwd) {
    var $this = this;
    console.log("校验交易密码是否正确" + JSON.stringify(pwd));
    if (pwd == "" || pwd == undefined) {
      commonAlertWindow({
        message: "请输入6位</br>交易密码"
      });
    } else {
      var phone = $api.getStorage("phone");
      // var pwd = pwd;
      console.log("输入" + phone, pwd);
      // var data = { userName: phone, passWord: pwd };
      var data = { userName: "test01", passWord: "111111" };
      api.ajax({
        url: url3() + "openapi/v1/login",
        data: {
          values: {
            paraJson: JSON.stringify(data)
          }
        }
      }, function (ret, err) {
        console.log("登录" + JSON.stringify(ret))
        if (ret.info.rescode == "success") {
          console.log("验证成功")
          $(".stateLayer").remove();
          commonAlertWindow({
            message: "验证成功"
          });
          var token = ret.info.result.accessToken;
          console.log(JSON.stringify(token));
          $api.setStorage("token", token);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          commonAlertWindow({
            message: "密码错误"
          });
          setTimeout(function () {
            $this.tokenPwdAjaxTime();
          }, 2000)
        }
      })
    }
  },
}

// 买交易
$.binLib.analogBuyQuery = function () {
  analog.buyListQuery();
};// 卖交易
$.binLib.analogBuy = function () {
  analog.buyList();
};
// 持仓渲染
$.binLib.analogHold = function () {
  analog.HoldStock();
};
// 撤单列表
$.binLib.analogCancel = function () {
  analog.cancelList();
};
// 主体
$.binLib.operationIndexWin = function () {
  analog.initIndexWin();
};
