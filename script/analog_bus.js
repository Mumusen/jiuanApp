var analog = {
  buyList: function () {
    this.queryAllSecurityModel();
    this.queryAjax();
  },
  queryAjax: function (securityCode) {
    var stocksInterface = $('.search-list');
    searchStocks.keyup(function () {
      var val = $(this).val();
      if (val === '') {
        stocksInterface.css('display', 'block');
        searchInterface.css('display', 'none');
      } else {
        $this.stockSearch(val);//发起请求
        stocksInterface.css('display', 'none');
        searchInterface.css('display', 'block');
      }
      if (val.length < 6) {
        $('.sell-list').css('display', 'none')
      }
    });
  },
  queryAllSecurityModel:function(){
    api.ajax({
      url: 'http://hangqingjingling.com/openapi/v1/queryAllSecurityModel',
    }, function (ret, err) {
      console.log(JSON.stringify(ret));
      
    })
  },
  stockSearch: function (param) {
    api.ajax({
      url: url() + 'stock/getStockInfoForApp',
      data: {
        values: {
          param: param,
          no: 6
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret));
      var html = '';
      var searchContent = $('#searchContent');
      var stocks = ret.stocks;
      if (stocks.length !== 0) {
        for (var i = 0; i < stocks.length; i++) {
          var stock = stocks[i];
          html +=
            '<li>' + stocks + '</li>';
        }
        searchContent.html(html);
      } else {
        var li = '<li class="noData">- -没有相关股票信息- -</li>';
        searchContent.html(li);
      }
    })
  },
}

$.binLib.analogBuy = function () {
  analog.initIndexWin();//主窗口方法
};
