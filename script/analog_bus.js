var analog = {
  // 买卖
  buyList: function () {
    this.queryAllSecurityModel();
    this.queryAjax();
    this.btnDealAjax();
    this.queryHoldStockList(1);
  },
  // 持仓
  HoldStock: function(){
    this.queryHoldStockList(1);
  },
  
  // 缓存所有数据
  queryAllSecurityModel: function () {
    api.ajax({
      url: 'http://www.hangqingjingling.com/stock/QueryAllSecurityModel',
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
      console.log("选择股票" + $(this).html())
      // stocksInterface.hide();
      var code = $(this).attr('data-code');
      console.log(JSON.stringify(code));
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
    console.log(JSON.stringify(sotckArray))
    var filterArr = sotckArray.filter(function (item) {
      return item.data.indexOf(param) !== -1 || item.name.indexOf(param) !== -1;
    });
    var arrList = filterArr.slice(0, 10);
    if (arrList) {
      console.log(JSON.stringify(arrList))
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
    console.log(JSON.stringify(code))
    // var securityCode = strEnc(code);
    // console.log(securityCode)
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.open();
    api.ajax({
      url: 'http://md.icaopan.com/openapi/queryMarketDataBySecurityCode',
      data: {
        values: {
          securityCode: code
        }
      }
    }, function (ret, err) {
      var ret = ret.info.result;
      if (ret.suspensionFlag  == false) {
        $("#downLimit").html('跌停' + ret.downLimit);
        $("#upLimit").html('涨停' + ret.upLimit);
        $("#openPrice").val(ret.openPrice);//现价
        $("#askPrice1").html(ret.askPrice1);//卖1价
        $("#askVolume1").html(ret.askVolume1);//卖1量
        $("#askPrice2").html(ret.askPrice2);//卖2价
        $("#askVolume2").html(ret.askVolume2);//卖2量
        $("#askPrice3").html(ret.askPrice3);//卖3价
        $("#askVolume3").html(ret.askVolume3);//卖3量
        $("#askPrice4").html(ret.askPrice4);//卖4价
        $("#askVolume4").html(ret.askVolume4);//卖4量
        $("#askPrice5").html(ret.askPrice5);//卖5价
        $("#askVolume5").html(ret.askVolume5);//卖5量
        $("#bidPrice1").html(ret.bidPrice1);//买1价
        $("#bidVolume1").html(ret.bidVolume1);//买1量
        $("#bidPrice2").html(ret.bidPrice2);//买2价
        $("#bidVolume2").html(ret.bidVolume2);//买2量
        $("#bidPrice3").html(ret.bidPrice3);//买3价
        $("#bidVolume3").html(ret.bidVolume3);//买3量
        $("#bidPrice4").html(ret.bidPrice4);//买4价
        $("#bidVolume4").html(ret.bidVolume4);//买4量
        $("#bidPrice5").html(ret.bidPrice5);//买5价
        $("#bidVolume5").html(ret.bidVolume5);//买5量
        // 差可买量
        // $("#buyNum").html(ret.buyNum);
        waitLoading.close();
        $this.numStockBtn(1000);
      }else{
        waitLoading.close();
        commonAlertWindow({
          message: "已停牌"
        });
      }
    });
  },
  // 计算仓位
  numStockBtn: function(num){
    var $li = $('#numStockBtn span');
    $li.mouseover(function () {
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      var tabNum = $this.attr('data-code');
      // waitLoading.open();
      if(tabNum == '0'){
        $("#buyNumBtn").val(returnFloat(num));
      }else if(tabNum == '1'){
        $("#buyNumBtn").val(returnFloat(num/2));
      }else{
        $("#buyNumBtn").val(returnFloat(num/3));
      }
    })
  },
  //股票委托交易 买/卖
  btnDealAjax: function(){
    $("#btnDeal").click(function(){
      // var token = localStorage.getItem('token');
      var token = 'token';
      var sellOrBuy = $(this).attr("data-deal");
      var stockCode = $("#searchStocks").attr("data-code");
      var price = $("#upLimit").val();
      var quantity = $("#buyNumBtn").val();
      if(stockCode == ""){
        commonAlertWindow({
          message: "请选择交易股票"
        });
      }else if(price == ""){
        commonAlertWindow({
          message: "请输入购买价格"
        });
      }else if(quantity == ""){
        commonAlertWindow({
          message: "请输入购买量"
        });
      }else{
        var waitLoading = new WaitLoading();
        waitLoading.open();
        console.log(token,stockCode,quantity,sellOrBuy,price)
        // api.ajax({
        //   url: 'http://hangqingjingling.com/openapi/v1/doPlacementStockTrade',
        //   data: {
        //     values: {
        //       token: token,         //用户token
        //       stockCode: stockCode, //股票代码
        //       quantity: quantity,   //委托数量
        //       sellOrBuy: sellOrBuy, //交易方向，0：买入，1：卖出
        //       price: price,         //委托价格
        //     }
        //   }
        // }, function (ret, err) {
          // commonAlertWindow({
          //   message: ret.info.result
          // });
        // })
      }
    })
  },
  // 持仓查询
  queryHoldStockList: function(pageNo){
    // var token = localStorage.getItem('token');
    var $this = this;
    var token = 'token';
    var html = "";
    var paraJson = {token:token,pageNo:pageNo,pageSize:'5'}
    if(token != ''){
      api.ajax({
        url: 'http://hangqingjingling.com/openapi/v1/queryHoldStockListByPage',
        data: {
          values: {
            paraJson: paraJson
          }
        }
      }, function (ret, err) {
        var ret = ret.info.result;
        if(ret.rescode == 'success'){
          for (var i = 0; i < ret.length; i++) {
            var msg = ret[i];
            // console.log(JSON.stringify(msg))
            html += $this.holdStockDom(msg);
          }
          $("#holdStockList").append(html);
        }
      })
    }
  },
  holdStockDom: function(msg){
    var html = classRed = '';
    if(msg.marketProfit >0) { classRed = 'red';}
    html =
    '<li>'+
    '        <h2>'+msg.securityName+'</h2>'+
    '        <p>'+msg.marketValue+'万</p>'+
    '      </li>'+
    '      <li class="'+classRed+'">'+
    '        <p>'+msg.marketProfit+'</p>'+
    '        <p>'+msg.marketProfitPercent+'%</p>'+
    '      </li>'+
    '      <li>'+
    '        <p>'+msg.amount+'</p>'+
    '        <p>'+msg.availableAmount+'</p>'+
    '      </li>'+
    '      <li>'+
    '        <p>'+msg.costPrice+'</p>'+
    '        <p>'+msg.latestPrice+'</p>'+
    '      </li>';
    return html;
  },
  // 用户资产查询
  queryStockBalance: function(){
    var $this = this;
    var token = 'token';
    var paraJson = {token:token}
    if(token != ''){
      api.ajax({
        url: 'http://hangqingjingling.com/openapi/v1/queryStockBalance',
        data: {
          values: {
            paraJson: paraJson
          }
        }
      }, function (ret, err) {

      })
    }
  }
}
// 买卖交易
$.binLib.analogBuy = function () {
  analog.buyList();
};
// 持仓渲染
$.binLib.analogHold = function () {
  analog.HoldStock();
};
