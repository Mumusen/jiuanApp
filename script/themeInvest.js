var themeInvest = {
  //初始化
  init: function () {
    this.foundRendering();
    this.choiceEditTab();
    this.themeDetails();
    this.stockDetails();
  },
  //资金流向数据渲染
  foundRendering: function () {
    var $this = this;
    api.ajax({
      url: url() + 'fundflow/getFundflowAppNew'
      // method: 'get',
    }, function (ret, err) {
      console.log(JSON.stringify(ret))
      var fundflowInHtml = '';
      var fundflowOutHtml = '';
      if (ret.code == true) {
        var inResult = ret.inResult;
        for (var i = 0; i < inResult.length; i++) {
          var info = inResult[i];
          fundflowInHtml += '<li class="clearfix" data-ID="' + info.id + '" data-ms="' + info.conceptExplain + '">' +
            '    <div class="themeShow">' +
            '         <span id="conceptName">' + info.conceptStockName + '</span>' +
            '         <span>' + yuanToYi(info.pureInTotal) + '</span>' +
            '         <span>' + yuanToYi(info.dealTotal) + '</span>' +
            '         <span class="percentage" id="chg">' + (info.chg).toFixed(2) + '%</span>' +
            '    </div>' +
            '</li>'
        }
        $('.foundflowIn ul').html(fundflowInHtml);
        changeColor();
        $this.sortBtn();
      }
      else {
        $('.getFundflow').show();
      }
    });

  },
  // 资金流向排序请求
  sortFoundAjax: function (sortKey, sortType) {
    var fundflowInHtml = '';
    $('.foundflowIn ul').html(fundflowInHtml);
    api.ajax({
      url: url() + 'fundflow/getFundflowAppNew',
      data: {
        values: {
          sortKey: sortKey,
          sortType: sortType
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret))
      if (ret.code == true) {
        var inResult = ret.inResult;
        // var outResult=ret.outResult;
        for (var i = 0; i < inResult.length; i++) {
          var info = inResult[i];
          fundflowInHtml += '<li class="clearfix" data-ID="' + info.id + '" data-ms="' + info.conceptExplain + '">' +
            '    <div class="themeShow">' +
            '         <span id="conceptName">' + info.conceptStockName + '</span>' +
            '         <span>' + yuanToYi(info.pureInTotal) + '</span>' +
            '         <span>' + yuanToYi(info.dealTotal) + '</span>' +
            '         <span class="percentage" id="chg">' + (info.chg).toFixed(2) + '%</span>' +
            '    </div>' +
            '</li>'
        }
        $('.foundflowIn ul').html(fundflowInHtml);
        changeColor();
      }
      else {
        $('.getFundflow').show();
      }
    });
  },
  //龙虎榜交易数据渲染
  // billboardRenderingNew: function (days) {
  //   api.ajax({
  //     url: url() + 'stock/getConceptHeroList',
  //     data: {
  //       values: {
  //         days: days
  //       }
  //     }
  //   }, function (ret) {
  //     console.log(JSON.stringify(ret))
  //     var newHtml = '';
  //     if (ret.code == true) {
  //       var conceptStockHeroList = ret.conceptStockHeroList;
  //       for (var i = 0; i < conceptStockHeroList.length; i++) {
  //         var info = conceptStockHeroList[i];
  //         newHtml += '<li class="clearfix" data-ID="' + info.id + '">' +
  //           '   <div class="themeShow">' +
  //           '         <span id="conceptName">' + info.conceptName + '</span>' +
  //           '         <span>' + yuanToYi(info.netAmount) + '</span>' +
  //           '         <span class="valColor">' + yuanToYi(info.dealTotal) + '</span>' +
  //           '   </div>' +
  //           '   <span class="stockname" data-code="' + info.stockCode + '">' + replaceNull(info.stockName) + '</span>' +
  //           '     </li>'
  //       }
  //       $('.newest ul').html(newHtml);
  //       changeColor();
  //     }
  //     else {
  //       $('.oneDay').show();
  //     }
  //   })
  // },
  // sortBillboardAjax: function (days, sortKey, sortType) {
  //   var newHtml = '';
  //   $('.fourItem').html(newHtml);
  //   api.ajax({
  //     url: url() + 'stock/getConceptHeroList',
  //     data: {
  //       values: {
  //         days: days,
  //         sortKey: sortKey,
  //         sortType: sortType
  //       }
  //     }
  //   }, function (ret) {
  //     console.log(JSON.stringify(ret))
  //     if (ret.code == true) {
  //       var conceptStockHeroList = ret.conceptStockHeroList;
  //       for (var i = 0; i < conceptStockHeroList.length; i++) {
  //         var info = conceptStockHeroList[i];
  //         newHtml += '<li class="clearfix" data-ID="' + info.id + '">' +
  //           '   <div class="themeShow">' +
  //           '         <span id="conceptName">' + info.conceptName + '</span>' +
  //           '         <span>' + yuanToYi(info.netAmount) + '</span>' +
  //           '         <span class="valColor">' + yuanToYi(info.dealTotal) + '</span>' +
  //           '   </div>' +
  //           '   <span class="stockname" data-code="' + info.stockCode + '">' + replaceNull(info.stockName) + '</span>' +
  //           '     </li>'
  //       }
  //       // if (days == 1) {
  //       $('.fourItem').html(newHtml);
  //       // } else {
  //       //   $('.nearFive ul').html(newHtml);
  //       // }
  //       changeColor();
  //     }
  //     else {
  //       $('.oneDay').show();
  //     }
  //   })
  // },
  // 龙虎榜tab 切换
  choiceEditTab: function () {
    var bindthis = this;
    // var waitLoading = new WaitLoading();
    var $li = $('#BillboardTab span');
    $li.mouseover(function () {
      $(".topTheme").find(".liftBtn").removeClass("down up");
      $(".topTheme").find(".liftBtn").attr("data-boolean", "0");
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      inFo = $(this).attr("data-list");
      console.log(inFo)
      // bindthis.billboardRenderingNew(inFo);
    })
  },
  // billboardRenderingFive: function () {
  //   var waitLoading = new WaitLoading();
  //   waitLoading.open();
  //   api.ajax({
  //     url: url() + 'stock/getConceptHeroList',
  //     data: {
  //       values: {
  //         days: 5
  //       }
  //     }
  //   }, function (ret) {
  //     var nearlyDayHtml = '';
  //     if (ret.code == true) {
  //       waitLoading.close();
  //       var conceptStockHeroList = ret.conceptStockHeroList;
  //       for (var i = 0; i < conceptStockHeroList.length; i++) {
  //         var info = conceptStockHeroList[i];
  //         nearlyDayHtml += '<li class="clearfix" data-ID="' + info.id + '">' +
  //           '   <div class="themeShow">' +
  //           '         <span id="conceptName">' + replaceNull(info.conceptName) + '</span>' +
  //           '         <span>' + yuanToYi(info.dealTotal) + '</span>' +
  //           '         <span class="valColor">' + yuanToYi(info.netAmount) + '</span>' +
  //           '   </div>' +
  //           '   <span class="stockname" data-code="' + info.stockCode + '">' + replaceNull(info.stockName) + '</span>' +
  //           '     </li>'
  //       }
  //       $('.nearFive ul').html(nearlyDayHtml);
  //       changeColor();
  //     }
  //     else {
  //       waitLoading.close();
  //       $('.fiveDay').show();
  //     }
  //   })
  // },
  //点击进入主题详情
  themeDetails: function () {
    $('.themeList').on('click', '.themeShow', function () {
      var li = $(this).parent();
      var id = li.attr('data-ID');
      var themeName = li.find('#conceptName').text();
      openWindow('themeDetails', {
        id: id,
        themeName: themeName
      })
    })
  },
  //点击进入个股详情
  stockDetails: function () {
    $('.themeList').on('click', '.stockname', function () {
      var li = $(this);
      var name = li.text();
      var code = li.attr('data-code');
      openWindow('stockDetails', {
        stockName: name,
        stockCode: code
      })
    })
  },
  sortBtn: function () {
    var $this = this;
    $(".liftBtn").click(function () {
      var sortKey = $(this).attr("data-type");
      var sort = $(this).attr("data-boolean");
      var type = $(this).parent().attr("data-list");
      // console.log("类型" + sortKey + "升降序" + sort + "请求类型" + type)
      if (sort == "0") {
        $(sort).attr("data-boolean", true);
      }
      if (sort == "true") {
        // console.log("升序1:" + sort)
        $(this).attr("data-boolean", false);
        $(this).parent().find("span").removeClass("down up");
        $(this).addClass("down");
        // console.log("升序2:" + sort)
        $this.sortAjax(type, sortKey, "ASC")
      } else {
        // console.log("降序1:" + sort)
        $(this).attr("data-boolean", true);
        $(this).parent().find("span").removeClass("down up");
        $(this).addClass("up");
        // console.log("降序2:" + sort);
        $this.sortAjax(type, sortKey, "DESC")
      }
    })
  },
  sortAjax: function (type, sortKey, sortType) {
    var $this = this;
    if (type == "0") {
      $this.sortFoundAjax(sortKey, sortType);
    } else if (type == "1") {
      $this.sortBillboardAjax(type, sortKey, sortType);
    } else {
      $this.sortBillboardAjax(type, sortKey, sortType);
    }
  }
}
