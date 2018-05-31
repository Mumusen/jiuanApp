var analog = {
  // 外框切换
  initIndexWin: function () {
    // this.loginAnalog();
    this.inputBuyPassWord();//临时
    this.exitClearInterval();
  },
  //打开operationGroup
  openFrameGroup: function () {
    var holdStockList = api.pageParam.holdStockList;
    var personAsset = api.pageParam.personAsset;
    var stockCode = api.pageParam.stockCodeClick;
    var stockName = api.pageParam.stockNameClick;
    api.openFrameGroup({
      name: 'analog',
      rect: {
        x: 0,
        y: 108,
        w: api.winWidth,
        h: 'auto'
      },
      scrollEnabled: false,
      frames: [{
        name: 'analog0',
        url: 'analog0.html',
        pageParam: {
          holdStockList: holdStockList,
          stockName: stockName,
          stockCode: stockCode
        }
      }, {
        name: 'analog1',
        url: 'analog1.html',
        pageParam: {
          holdStockList: holdStockList,
          stockName: stockName,
          stockCode: stockCode
        }
      }, {
        name: 'analog2',
        url: 'analog2.html',
        pageParam: {
          holdStockList: holdStockList,
          personAsset: personAsset
        }
      }, {
        name: 'analog3',
        url: 'analog3.html'
      }, {
        name: 'analog4',
        url: 'analog4.html'
      }]
    }, function (ret, err) {
    });
  },
  //点击我的交易五大操作栏，显示对应的页面
  frameGroupResponse: function () {
    var pageParam = api.pageParam;
    var opaIndex = pageParam.opaIndex;
    api.setFrameGroupIndex({
      name: 'analog',
      index: opaIndex
    });
    var liIndex = $('.header-title li');
    var liContent = liIndex.eq(opaIndex).find('a').html();

    liIndex.eq(opaIndex).find('a').addClass('active');
    liIndex.eq(opaIndex).siblings().find('a').removeClass('active');
  },
  //frame组点击切换
  frameGroupClick: function () {
    $('.header-title').on('click', 'li', function () {
      var i = $(this).attr('data-index');
      var liContent = $(this).find('a').html();
      $(this).find('a').addClass('active');
      $(this).siblings().find('a').removeClass('active');
      api.setFrameGroupIndex({
        name: 'analog',
        index: i
      });
    })
  },
  //退出界面关闭定时器
  exitClearInterval: function () {
    var $this = this;
    $('.exitWindow').click(function () {
      clearInterval($this.timer);
      closeWindow("analog");
    });
  },
  // 定时器 请求股票
  timeAjaxStock: function (code) {
    var $this = this;
    this.timer = setInterval(function () {
      console.log('股票代码' + code);
      if (code >= 6) {
        $this.stockBtnAjax(code);
      }
    }, 3000);
  },
  // 单股查询数据 time
  sotckAjax: function () {
    var $this = this;
    if ($("#openPrice").val() != "") {
      var code = $("#searchStocks").attr('data-code');
      console.log("单股查询数据", JSON.stringify(code))
      // $this.stockAjaxTime(code);
      $this.stockBtnAjax(code);
    }
  },
  // 请求
  stockAjaxTime: function (code) {
    console.log(JSON.stringify(code))
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.open();
    var data = { securityCode: code };
    console.log(JSON.stringify(data))
    api.ajax({
      url: url3() + 'openapi/v1/queryMarketDataBySecurityCode',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("请求", JSON.stringify(ret))
      // var ret = ret.info.result;
      // if (ret.suspensionFlag == false) {
      //   $("#downLimit").html('跌停' + ret.downLimit);
      //   $("#upLimit").html('涨停' + ret.upLimit);
      //   $("#openPrice").val(ret.openPrice);//现价
      //   $("#askPrice1").html(parseInt(ret.askPrice1));//卖1价
      //   $("#askVolume1").html(parseInt(ret.askVolume1));//卖1量
      //   $("#askPrice2").html(parseInt(ret.askPrice2));//卖2价
      //   $("#askVolume2").html(parseInt(ret.askVolume2));//卖2量
      //   $("#askPrice3").html(parseInt(ret.askPrice3));//卖3价
      //   $("#askVolume3").html(parseInt(ret.askVolume3));//卖3量
      //   $("#askPrice4").html(parseInt(ret.askPrice4));//卖4价
      //   $("#askVolume4").html(parseInt(ret.askVolume4));//卖4量
      //   $("#askPrice5").html(parseInt(ret.askPrice5));//卖5价
      //   $("#askVolume5").html(parseInt(ret.askVolume5));//卖5量
      //   $("#bidPrice1").html(parseInt(ret.bidPrice1));//买1价
      //   $("#bidVolume1").html(parseInt(ret.bidVolume1));//买1量
      //   $("#bidPrice2").html(parseInt(ret.bidPrice2));//买2价
      //   $("#bidVolume2").html(parseInt(ret.bidVolume2));//买2量
      //   $("#bidPrice3").html(parseInt(ret.bidPrice3));//买3价
      //   $("#bidVolume3").html(parseInt(ret.bidVolume3));//买3量
      //   $("#bidPrice4").html(parseInt(ret.bidPrice4));//买4价
      //   $("#bidVolume4").html(parseInt(ret.bidVolume4));//买4量
      //   $("#bidPrice5").html(parseInt(ret.bidPrice5));//买5价
      //   $("#bidVolume5").html(parseInt(ret.bidVolume5));//买5量
      //   // 查可买量
      //   // $("#buyNum").html(ret.buyNum);
      //   $this.canBuyNumber();
      //   waitLoading.close();
      //   $this.timeAjaxStock(code);
      // } else {
      //   waitLoading.close();
      //   commonAlertWindow({
      //     message: "已停牌"
      //   });
      // }
    });
  },
  // 用户校验 状态
  loginAnalog: function () {
    var $this = this;
    var DOM1 =
      '  <div class="stateLayer">' +
      '    <div class="box">' +
      '      <button id="openBtn">去 开 通</button>' +
      '      <i class="exitWindow"></i>' +
      '    </div>' +
      '  </div>';
    var DOM2 =
      '  <div class="stateLayer">' +
      '    <div class="box state-4">' +
      '      <button>再 次 申 请</button>' +
      '      <i class="exitWindow"></i>' +
      '    </div>' +
      '  </div>';
    var DOM3 =
      '  <div class="stateLayer">' +
      '    <div class="box state-2">' +
      '      <div class="txt">' +
      '        <p>正在为您加塞审批</p>' +
      '        <p>请耐心等候</p>' +
      '      </div>' +
      '      <i class="exitWindow"></i>' +
      '    </div>' +
      '  </div>';
    var DOM4 =
      '  <div class="stateLayer">' +
      '    <div class="box box-pwd">' +
      '      <h2>输入交易密码</h2>' +
      '      <div class="pwd-control" id="payPwd">' +
      '          <div class="box-control">' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>' +
      '          </div>' +
      '      </div>' +
      '      <button id="buyBtnAjax" data-code="0">确 定</button>' +
      '      <p onclick="openWindow(\'forgetDealPwd\',{},\'push\')">忘记密码?</p>' +
      '      <i class="exitWindow"></i>' +
      '    </div>' +
      '  </div>';
    var DOM5 =
      '  <div class="stateLayer">' +
      '    <div class="box box-pwd">' +
      '      <h2>输入交易密码</h2>' +
      '      <div class="pwd-control" id="payPwd">' +
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
    var userPhone = localStorage.getItem("userId");
    api.ajax({
      url: url() + 'userManager/checkUserStatusByPhone',
      data: {
        values: {
          // phone: localStorage.getItem("userId")
          phone: '18310499911'
        }
      }
    }, function (ret, err) {
      if (ret.success) {
        if (ret.userStatus == "1") {
          // 未提交审核
          $("body").append(DOM1);
          $("#openBtn").click(function () {
            $(".stateLayer").remove();
            $("body").append(DOM4);
            $this.analogSetDeal();
          })
        } else if (ret.userStatus == "2") {
          // 审核ing
          $("body").append(DOM3);
        } else if (ret.userStatus == "3") {
          // 审核未通过
          $("body").append(DOM2);
        } else if (ret.userStatus == "4") {
          // 审核通过
          console.log("审核通过");
          $("body").append(DOM5);
          $this.analogSetDeal();

        }
      } else {
        commonAlertWindow({
          message: ret.errMsg
        });
        closeWindow('analog');
      }
    })
  },
  // 校验交易密码
  analogSetDeal: function () {
    var pwd = "";
    var $this = this;
    $("#payPwd").payPwd({
      max: 6,
      type: "password",
      callback: function (arr) {
        $("#inputtype").html(arr);
        pwd = arr;
      }
    })
    $("#buyBtnAjax").click(function () {
      if ($(this).attr("data-code") == "0") {
        console.log("init")
        $this.loginSetBuy(pwd);
      } else {
        console.log("input")
        $this.inputBuyPassWord(pwd);
      }
    })
  },
  // 校验交易密码是否正确
  inputBuyPassWord: function (pwd) {
    var $this = this;
    console.log("校验交易密码是否正确" + JSON.stringify(pwd));
    // if (pwd == "" || pwd == undefined) {
    //   commonAlertWindow({
    //     message: "请输入6位</br>交易密码"
    //   });
    // } else {
    var phone = localStorage.getItem("userId");
    var pwd = pwd;
    console.log("输入" + phone, pwd);
    var data = { userName: 'test01', passWord: '111111' };
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
        localStorage.setItem("token", token)
        $this.openFrameGroup();
        $this.frameGroupResponse();
        $this.frameGroupClick();
        $this.exitClearInterval();
      }
    })
    // }
  },
  loginSetBuy: function (pwd) {
    console.log(JSON.stringify(pwd))
    if (pwd == "" || pwd == undefined) {
      commonAlertWindow({
        message: "请输入6位</br>交易密码"
      });
    } else {
      var phone = localStorage.getItem('userId');
      var data = { userName: 'test01', passWord: pwd };
      console.log("设置密码" + JSON.stringify(data));
      api.ajax({
        url: url3() + 'openapi/v1/login',
        data: {
          values: {
            paraJson: JSON.stringify(data)
          }
        }
      }, function (ret, err) {
        if (ret.success) {
          var token = ret.token;
          localStorage.setItem('token', token);
        }
        commonAlertWindow({
          message: "提交成功</br>等待审核"
        });
        setTimeout(function () {
          closeWindow('analog');
        }, 2000)
      })
    }
  },
  // 买卖
  buyList: function () {
    this.queryAllSecurityModel();
    this.queryAjax();
    this.btnDealAjax();
    this.queryHoldStockList(1);
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
      localStorage.setItem('sotckArray', sotckArray);
    });
  },
  // 模糊查询
  queryAjax: function () {
    var stocksInterface = $('.search-list');
    var searchStocks = $('#searchStocks');
    var $this = this;
    searchStocks.keyup(function (e) {
      var val = $(this).val();
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
    var sotckArray = JSON.parse(localStorage.getItem('sotckArray'));
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
      // 乌当查询 单独服务器 与其他接口不一样
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
          $this.canBuyNumber();
          waitLoading.close();
          $this.timeAjaxStock(code);
        }else{
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
    var token = localStorage.getItem("token");
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
    $("#btnDeal").click(function () {
      var token = localStorage.getItem('token');
      // var token = 'token';
      var sellOrBuy = $(this).attr("data-deal");
      var stockCode = $("#searchStocks").attr("data-code");
      var price = $("#openPrice").val() * 1;
      var quantity = $("#buyNumBtn").val();
      var priceBuy = quantity % 100;
      console.log("100:" + JSON.stringify(priceBuy))
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
      } else {
        var waitLoading = new WaitLoading();
        // waitLoading.open();
        console.log(token, stockCode, quantity, sellOrBuy, price)
        //用户token//股票代码//委托数量//交易方向，0：买入，1：卖出//委托价格
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
            $("#buyNumBtn").val("");
          } else if (ret.info.rescode == "login") {

            // console.log(JSON.stringify(err))
          } else {
            commonAlertWindow({
              message: ret.info.result
            });
          }
        })
      }
    })
  },
  // 持仓查询列表
  queryHoldStockList: function (pageNo) {
    // var token = localStorage.getItem('token');
    var $this = this;
    var token = 'token';
    var html = "";
    var token = localStorage.getItem("token");
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
          console.log("12121")
          var data = ret.result.dataList;
          console.log("222" + JSON.stringify(data))
          for (var i = 0; i < data.length; i++) {
            var msg = data[i];
            console.log("333" + JSON.stringify(msg))
            html += $this.holdStockDom(msg);
          }
          $("#holdStockList").append(html);
        }
      })
    }
  },
  holdStockDom: function (msg) {
    var html = classRed = '';
    if (msg.marketProfit > 0) { classRed = 'red'; }
    html =
      '<li>' +
      '        <h2>' + msg.securityName + '</h2>' +
      '        <p>' + msg.marketValue + '万</p>' +
      '      </li>' +
      '      <li class="' + classRed + '">' +
      '        <p>' + returnFloat(msg.marketProfit) + '</p>' +
      '        <p>' + returnFloat(msg.marketProfitPercent) + '%</p>' +
      '      </li>' +
      '      <li>' +
      '        <p>' + msg.amount + '</p>' +
      '        <p>' + msg.availableAmount + '</p>' +
      '      </li>' +
      '      <li>' +
      '        <p>' + returnFloat(msg.costPrice) + '</p>' +
      '        <p>' + returnFloat(msg.latestPrice) + '</p>' +
      '      </li>';
    return html;
  },
  // 用户资产查询
  queryStockBalance: function () {
    var $this = this;
    // var token = localStorage.getItem('token');
    var token = localStorage.getItem("token");
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
        // console.log(JSON.stringify(ret));
        if (ret.info.rescode == "success") {
          var msg = ret.info.result;
          html = $this.queryStockDom(msg);
          $("#analogUser").append(html);
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
    // var token = localStorage.getItem('token');
    var token = localStorage.getItem("token");
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

}
// 买卖交易
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
