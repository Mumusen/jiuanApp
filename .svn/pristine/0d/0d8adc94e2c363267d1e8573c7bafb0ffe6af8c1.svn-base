var infor = {
  pageCountHistory: null,
  inforBtn: function () {
    this.inforIfBtn();
  },
  infoList: function () {
    this.inforListAjax(status, 1);
  },
  aiInforList: function () {
    this.inforAiList(1);
  },
  inforIfBtn: function () {
    $(".inforBtn").click(function () {
      console.log($(this).attr("data-infor"));
      var infor = $(this).attr("data-infor");
      var userId = $api.getStorage("userId");
      if (userId != undefined) {
        if (infor == '3') {
          openWindow('informain1', {
            status: 3
          }, 'push');
        } else if (infor == '4') {
          openWindow('informain3', {
            status: 4
          }, 'push');
        } else if (infor == '5') {
          openWindow('informain4', {
          }, 'push');
        }
      } else {
        commonAlertWindow({
          message: "请登录"
        });
        setTimeout(function () {
          openWindow('login');
        }, 1000)
      }
    })
  },
  inforListAjax: function (status, page) {
    var parm = api.pageParam,
      status = parm.status,
      html = "",
      $this = this,
      noData = '<div class="noDataBj"></div>';
    console.log(status + "::::" + page);
    var waitLoading = new WaitLoading();
    waitLoading.open();
    api.ajax({
      url: url() + 'infomation/getInfomationsByStatus',
      data: {
        values: {
          status: status,
          pageNo: page
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret))
      if (ret.success) {
        var pageCoun = ret.count;
        if(pageCoun != 0){
          for (i = 0; i < ret.list.length; i++) {
            var msg = ret.list[i];
            // console.log(JSON.stringify(msg))
            html += $this.infoHtml(msg,status);
          }
          $(".informain").append(html);
          $(".informain").attr("page", page);
          $(".informain").attr("pageCoun", pageCoun);
          $(".informain").attr("status", status);
          $this.swipeCompanyUpLoad();
          $this.choiceBtnTxt();
        }else{
          $(".informain").append(noData);
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
      waitLoading.close();
    });
  },
  infoHtml: function (msg,type) {
    var html = iconClass = '';
    console.log("当前页面"+type)
    if(type == 3){
      iconClass = "icon-nc";
    }else if(type == 4){
      iconClass = "icon-bj";
    }else{
      if(msg.infomationStatus != 1){
        iconClass = "icon-zt";
      }
    }
    html =
      '    <div class="new-box webkit choiceBtnTxt" infoId="'+msg.id+'">' +
      '        <div class="min">' +
      '            <h3><u class="'+iconClass+'"></u>'+ delHtmlTag(msg.infomationName) + '</h3>' +
      '            <p>' + delHtmlTag(msg.infomationContent) + '</p>' +
      '            <div class="txt">' +
      '                <span>' + (new Date(msg.infomationTime)).format("YYYY-MM-DD hh:mm:ss") + '</span>' +
      '                <span>' + msg.infomationReaded + '阅读</span>' +
      '            </div>' +
      '        </div>' +
      '    </div>';
    return html;
  },
  // 下拉加载更多
  swipeCompanyUpLoad: function () {
    var $this = this,
      pageCoun = $(".informain").attr("pageCoun"),
      pageNum = Math.ceil(pageCoun / 5),
      n = $(".informain").attr("page"),
      status = $(".informain").attr("status");
    var noHtml = '<p class="nolist">- - 没有更多 - -</p>';
    n++;
    // console.log("总条数" + pageCountHistory + "当前页数" + n + "总页数" + pageNum)
    // waitLoading.open();
    api.addEventListener({
      name: 'scrolltobottom',
      extra: {
        threshold: 30            //设置距离底部多少距离时触发，默认值为0，数字类型
      }
    }, function (ret, err) {
      console.log("翻页" + pageNum + ":" + n)
      if (pageNum >= n) {
        // console.log("还有数据")
        console.log("AJAX"+status + n)
        $this.inforListAjax(status, n);
        $('.informain').attr("page", n);
      } else {
        $(".nolist").remove();
        $(".informain").append(noHtml);
        // commonAlertWindow({
        //     message: "没有更多数据"
        // });
      }
    });
  },
  inforAiList: function (page) {
    console.log(12312312312);
    var html = "",
      $this = this,
      waitLoading = new WaitLoading(),
      noData = '<div class="noDataBj"></div>';
    waitLoading.open();
    api.ajax({
      url: url() + 'aiStockDataPool/getAiStocks',
      data: {
        values: {
          pageNo: page
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret))
      if (ret.success) {
        var pageCoun = ret.count;
        if (pageCoun != 0) {
          for (i = 0; i < ret.list.length; i++) {
            var msg = ret.list[i];
            // console.log(JSON.stringify(msg))
            html += $this.aiHTML(msg);
          }
          $(".infor-list").append(html);
          $(".infor-list").attr("page", page);
          $(".infor-list").attr("pageCoun", pageCoun);
          $(".infor-list").attr("status", status);
          $this.swipeCompanyUpLoadAi();
        } else {
          $(".infor-list").append(noData);
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
      waitLoading.close();
    });
  },
  aiHTML: function (msg) {
    html =
      '        <li class="choiceBtnDeta" infoId="' + msg.id + '" infoName="' + msg.name + '" infoCode="' + msg.code + '">' +
      '            <p>' +
      '                <span>' + msg.name + '</span>' +
      '                <u>' + msg.code + '</u>' +
      '            </p>' +
      '            <p>' + msg.price + '</p>' +
      '            <p>' + msg.pulishDate + '</p>' +
      '        </li>';
    return html;
  },
  // AI下拉加载更多
  swipeCompanyUpLoadAi: function () {
    var $this = this,
      pageCoun = $(".infor-list").attr("pageCoun"),
      pageNum = Math.ceil(pageCoun / 5),
      n = $(".infor-list").attr("page"),
      status = $(".infor-list").attr("status");
    var noHtml = '<p class="nolist">- - 没有更多 - -</p>';
    n++;
    // console.log("总条数" + pageCountHistory + "当前页数" + n + "总页数" + pageNum)
    // waitLoading.open();
    api.addEventListener({
      name: 'scrolltobottom',
      extra: {
        threshold: 30            //设置距离底部多少距离时触发，默认值为0，数字类型
      }
    }, function (ret, err) {
      console.log("翻页" + pageNum + ":" + n)
      if (pageNum >= n) {
        // console.log("还有数据")
        $this.inforAiList(page);
        $('.infor-list').attr("page", n);
      } else {
        $(".nolist").remove();
        $(".infor-list").append(noHtml);
        // commonAlertWindow({
        //     message: "没有更多数据"
        // });
      }
    });
  },
  // 点击跳转股票详情页
  choiceBtnDeta: function () {
    // console.log(JSON.stringify($('.choiceBtnDeta')))
    $('.choiceBtnDeta').on('click', function () {
      openWindow('stockDetails', {
        id: $(this).attr('infoId'),
        stockName: $(this).attr('infoName'),
        stockCode: $(this).attr('infoCode')
      }, 'push');
    })
  },
  // 点击跳转文章详情页
  choiceBtnTxt: function () {
    $('.choiceBtnTxt').on('click', function () {
      console.log($(this).attr('infoId'))
      openWindow('txt', {
        infoId: $(this).attr('infoId'),
      }, 'push');
    })
  }
}
$.binLib.inforAjaxBtn = function () {
  infor.inforBtn();
}
$.binLib.inforTypeList = function () {
  infor.infoList();
}
$.binLib.inforAiListBox = function () {
  infor.aiInforList();
}

