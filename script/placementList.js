var placement = {
  // 当日委托
  todayPlacement: function () {
    // var token = $api.getStorage('token');
    var html = "";
    var $this = this;
    var token = $api.getStorage("token");
    var data = { token: token };
    api.ajax({
      url: url3() + 'openapi/v1/queryPlacementCurrentDayList',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("当日委托" + JSON.stringify(ret))
      if (ret.info.rescode == "success") {
        var data = ret.info.result;
        for (var i = 0; i < data.length; i++) {
          var msg = data[i];
          console.log("333" + JSON.stringify(msg))
          html += $this.placementDom(msg);
        }
        if (html != "") {
          $("#todayEntrustList").append(html);
        } else {
          $(".noDataBj").remove();
          $("#todayEntrustList").append('<div class="noDataBj"></div>');
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
    })
  },
  placementDom: function (msg) {
    var html = className = className2 = "";
    if (msg.placementPrice > 0) {
      className = "red"
    }
    if (msg.tradeType == "BUY") {
      className2 = "buy"
    }
    // console.log("类型"+JSON.stringify(msg.tradeType))
    // console.log("时间"+JSON.stringify(msg.createTimeStr))
    html =
      '<ul class="vip-list">' +
      '  <li>' +
      '    <h2>' + msg.securityName + '</h2>' +
      '    <p>' + msg.createTimeStr.substring(0, 10) + '</p>' +
      '  </li>' +
      '  <li class="' + className + '">' +
      '    <div class="num">' + msg.placementPrice + '</div>' +
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
  // 当日成交
  queryFillCurrentDay: function () {
    this.queryFillList(1);
  },
  queryFillList: function (page) {
    var html = "";
    var $this = this;
    var token = $api.getStorage("token");
    var data = { token: token, page: page, pageSize: '10' };
    api.ajax({
      url: url3() + 'openapi/v1/queryFillCurrentDayByPage',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("当日成交" + JSON.stringify(ret))
      if (ret.info.rescode == "success") {
        var data = ret.info.result.dataList;
        for (var i = 0; i < data.length; i++) {
          var msg = data[i];
          console.log("333" + JSON.stringify(msg))
          html += $this.todayDealDom(msg);
        }
        if (html != "") {
          $("#todayDealList").append(html);
        } else {
          $(".noDataBj").remove();
          $("#todayDealList").append('<div class="noDataBj"></div>');
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
    })
  },
  todayDealDom: function (msg) {
    console.log("当日成交查询" + JSON.stringify(msg))
    var html = className = "";
    if (msg.tradeTypeDisplay == "卖出") {
      className = "red"
    }
    // console.log("类型"+JSON.stringify(msg.tradeType))
    html =
      '<ul class="vip-list">' +
      '  <li>' +
      '    <h2>' + ret.securityName + '</h2>' +
      '    <p>' + ret.createTimeStr + '</p>' +
      '  </li>' +
      '  <li class="red">' +
      '    <div class="num">' + ret.filledAmount + '</div>' +
      '  </li>' +
      '  <li>' +
      '    <p>' + ret.filledPrice + '</p>' +
      '    <p>' + ret.filledQty + '</p>' +
      '  </li>' +
      '  <li class="' + className + '">' + ret.tradeTypeDisplay + '</li>' +
      '</ul>';
    return html;
  },
  // 委托历史
  queryPlacementHistory: function () {
    this.timeChoice();
  },
  // 时间选择
  timeChoice: function () {
    var myDate = new Date().toLocaleDateString();
    var dateChoice = '2016/1/1,' + myDate;
    $(".time-box input").attr('data-lcalendar', dateChoice);
    var timeStar = new lCalendar();
    var timeEnd = new lCalendar();
    timeStar.init({
      'trigger': '#timeStar',
      'type': 'date'
    });
    timeEnd.init({
      'trigger': '#timeEnd',
      'type': 'date'
    });
  },
  // 历史查询
  historyAjax: function () {
    this.timeChoice();
    var $this = this;
    this.ifHistory();
  },
  ifHistory: function () {
    var $this = this;
    var star = end = "";
    var token = $api.getStorage("token");
    $('#timeStar').bind('input propertychange', function() {  
      // $('#result').val($(this).val());  
      star = $(this).val();
      ajax = $(this).attr("data-type");
      console.log(star)
      if(end != "" && star != ""){
        if(end >= star){
          console.log("通过")
          if(ajax == "0"){
            // 历史委托
            $this.placemenHistory(token, star, end, 1, 20);
          }else{
            // 历史成功
            $this.queryPlacementFillHistory(token, star, end, 1, 20);
          }
        }else{
          commonAlertWindow({
            message: "起始日期必须</br>小于截止日期"
          });
        }
      }
    });  
    $('#timeEnd').bind('input propertychange', function() {  
      // $('#result').val($(this).val());  
      end = $(this).val();
      ajax = $(this).attr("data-type");
      console.log($(this).val());
      if(end != "" && star != ""){
        if(end >= star){
          console.log("通过");
          if(ajax == "0"){
            // 历史委托
            $this.placemenHistory(token, star, end, 1, 20);
          }else{
            // 历史成功
            $this.queryPlacementFillHistory(token, star, end, 1, 20);
          }
        }else{
          commonAlertWindow({
            message: "起始日期必须</br>小于截止日期"
          });
        }
      }
		});  
  },
  // 历史委托
  placemenHistory: function (token, startDate, endDate, page, pageSize) {
    console.log("placemenHistory:" + token, startDate, endDate, page, pageSize)
    var $this = this;
    var html = "";
    var data = {
      token: token,
      startDate: startDate,
      endDate: endDate,
      page: page,
      pageSize: pageSize,
    }
    api.ajax({
      url: url3() + 'openapi/v1/queryPlacementHistoryByConditionsByPage',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log("历史委托" + JSON.stringify(ret))
      if (ret.info.rescode == "success") {
        var data = ret.info.result;
        for (var i = 0; i < data.length; i++) {
          var msg = data[i];
          console.log("333" + JSON.stringify(msg))
          html += $this.placementDom(msg);
        }
        console.log(JSON.stringify(html));
        if (html != "") {
          $("#todayEntrustList").append(html);
        } else {
          $(".noDataBj").remove();
          $("#todayEntrustList").append('<div class="noDataBj"></div>');
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
    })
  },
  historyEntruseDom: function (msg) {
    var html = "";
    html =
      '<ul class="vip-list">' +
      '  <li>' +
      '    <h2>' + ret.securityName + '</h2>' +
      '    <p>' + ret.createTimeStr + '</p>' +
      '  </li>' +
      '  <li class="red">' +
      '    <div class="num">' + ret.filledAmount + '</div>' +
      '  </li>' +
      '  <li>' +
      '    <p>' + ret.filledPrice + '</p>' +
      '    <p>' + ret.filledQty + '</p>' +
      '  </li>' +
      '  <li>' + ret.tradeTypeDisplay + '</li>' +
      '</ul>';
    return html;
  },
  // 历史成交
  queryPlacementFillHistory: function (token, startDate, endDate, page, pageSize) {
    console.log("历史成交:" + token, startDate, endDate, page, pageSize)
    var $this = this;
    var html = "";
    var data = {
      token: token,
      startDate: startDate,
      endDate: endDate,
      page: page,
      pageSize: pageSize,
    }
    api.ajax({
      url: url3() + 'openapi/v1/queryPlacementFillHistoryByConditionsByPage',
      data: {
        values: {
          paraJson: JSON.stringify(data)
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret));
      if (ret.info.rescode == "success") {
        var data = ret.info.result.dataList;
        for (var i = 0; i < data.length; i++) {
          var msg = data[i];
          console.log("333" + JSON.stringify(msg))
          html += $this.placementDom(msg);
        }
        console.log(JSON.stringify(html));
        if (html != "") {
          $("#todayEntrustList").append(html);
        } else {
          $(".noDataBj").remove();
          $("#todayEntrustList").append('<div class="noDataBj"></div>');
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
    })
  },
  fillHistoryDom: function (msg) {
    var html = "";
    html =
      '<ul class="vip-list">' +
      '  <li>' +
      '    <h2>' + msg.securityName + '</h2>' +
      '    <p>' + msg.createTimeStr + '</p>' +
      '  </li>' +
      '  <li class="red">' +
      '    <p>' + msg.filledPrice + '</p>' +
      '    <p>' + msg.filledQty + '</p>' +
      '  </li>' +
      '  <li>' + msg.filledAmount + '</li>' +
      '  <li>' + msg.placementStatusDisplay + '</li>' +
      '</ul>';
    return html;
  }
}
// 当日委托
$.binLib.todayEntruse = function () {
  placement.todayPlacement();
};
// 当日成交
$.binLib.todayDealList = function () {
  placement.queryFillCurrentDay();
};
// 历史委托
$.binLib.historyEntruse = function () {
  placement.historyAjax();
};
// 历史成交
$.binLib.historyDeal = function () {
  placement.queryPlacementFillHistory();
};