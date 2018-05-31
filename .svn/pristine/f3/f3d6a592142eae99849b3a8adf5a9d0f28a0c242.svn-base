var txtList = {
  txtAjax: function () {
    this.ListAjax(1, 1);
    this.ListAjax(0, 1);
  },
  // 今日资讯列表渲染
  ListAjax: function (his, page) {
    var htmlList = todayHtml = '';
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.open();
    api.ajax({
      url: url() + 'infomation/getInfomations',
      data: {
        values: {
          his: his,
          pageNo: page
        }
      }
    }, function (ret, err) {
      // console.log(JSON.stringify(ret))
      if (ret.success) {
        if (his == 1) {
          console.log("今日")
          var list = ret.list;
          if (ret.count != "0") {
            for (var i = 0; i < list.length; i++) {
              var msg = list[i];
              todayHtml += $this.inforTxt(msg);
            }
            $(".today").append(todayHtml);
            if (list.length == 5) {
              $(".today").append(
                '<div class="btnAjax" data-type="1" data-page="' + page + '" data-count="' + ret.count + '">加载更多</div>'
              );
            } else {
              $(".today").append('<p class="nolist">- - 没有更多资讯 - -</p>');
            }
            $(".today").attr("data-page", page);
            $(".today").attr("data-count", ret.count);
            $(".today").attr("data-type", 0);
            // $this.btnAjax();
            // waitLoading.close();
            // $this.btnAjax();
          }
        } else {
          // pageCountHistory = ret.count;
          if (ret.count > 0) {
            var list = ret.list;
            for (var i = 0; i < list.length; i++) {
              var msg = list[i];
              htmlList += $this.inforTxt(msg);
            }
            $("#dayTitle").append(htmlList);
            console.log(list.length + "历史资讯")
            if (list.length < 5 || list.length == "") {
              console.log("没有了")
              $('#dayTitle').append('<p class="nolist">- - 没有更多资讯 - -</p>')
            } else {
              console.log("有" + ret.count)
              $('#dayTitle').append('<div class="btnAjax" data-type="0" data-page="' + page + '" data-count="' + ret.count + '">加载更多</div>');
            }
            $("#dayTitle").attr('data-page', page)
            // $("#dayTitle").attr("data-count", ret.count);
            $("#dayTitle").attr("data-type", 0);
            htmlList = null;
          }
        }
        $this.btnTxt();
        waitLoading.close();
        $this.btnAjax();
        $this.choiceBtnTheme();
        $this.choiceBtnDeta();
      }
    })
  },
  // 点击加载更多数据
  btnAjax: function () {
    var $this = this
    $(".btnAjax").unbind("click").click(function () {
      console.log("加载更多数据")
      var waitLoading = new WaitLoading(),
        pageCountToday = $(this).attr("data-count"),
        pageNum = Math.ceil(pageCountToday / 5),//获取总页面数
        n = $(this).attr("data-page"),
        type = $(this).attr("data-type");
      n++;
      console.log("总条数" + pageCountToday + "页数" + n + "总页数" + pageNum)
      console.log(type, n)
      if (pageNum >= n) {
        console.log("还有数据")
        $this.ListAjax(type, n);
        $(this).parent().attr("page", n);
        $(this).remove();
      } else {
        console.log("没有数据了！")
        // $(".nolist").remove();
        // $(this).parent().append(noHtml);
        // commonAlertWindow({
        //     message: "没有更多数据"
        // });
      }
    })
  },
  // 翻页
  infoListAjax: function (his, page) {
    var html = "";
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.close();
    // waitLoading.open();
    api.ajax({
      url: url() + 'infomation/getInfomations',
      data: {
        values: {
          his: his,
          pageNo: page
        }
      }
    }, function (ret, err) {
      console.log("历史资讯翻页" + JSON.stringify(ret))
      if (ret.success) {
        var infoList = ret.listHis;
        if (infoList != "") {
          for (var i = 0; i < infoList.length; i++) {
            var msg = infoList[i];
            console.log(i)
            console.log(JSON.stringify(msg))
            html += $this.inforTxt(msg);
          }
          $('section').append(html);
        } else {
          $('section').append(html);
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
      // waitLoading.close();
      $this.swipeCompanyUpLoad();
    })
  },
  // 下拉加载更多
  swipeCompanyUpLoad: function () {
    var $this = this,
      waitLoading = new WaitLoading(),
      pageNum = Math.ceil(pageCountHistory / 5),//获取总页面数
      n = $("#dayTitle").attr("page");
    var noHtml = '<p class="nolist">- - 没有更多资讯 - -</p>';
    n++;
    // console.log("总条数" + pageCountHistory + "当前页数" + n + "总页数" + pageNum)
    // waitLoading.open();
    api.addEventListener({
      name: 'scrolltobottom',
      extra: {
        threshold: 30            //设置距离底部多少距离时触发，默认值为0，数字类型
      }
    }, function (ret, err) {
      // console.log("翻页" + pageNum + ":" + n)
      if (pageNum >= n) {
        // console.log("还有数据")
        $this.ListAjax(0, n);
        $('#dayTitle').attr("page", n);
      } else {
        // console.log("没有数据了！")
        $(".nolist").remove();
        $("#dayTitle").append(noHtml);
        // commonAlertWindow({
        //     message: "没有更多数据"
        // });
      }
    });
  },
  // 资讯内容
  inforTxt: function (msg) {
    var info = msg.infomation; // 文章
    var stock = msg.stockVoList;  //股票
    var concept = msg.conceptVo;  //概念
    var _this = this;
    var html = iconClass = conceptHtml = stockHtml = '';
    if (info.infomationStatus ==  1) {
      iconClass = "icon-zt";
    }else{
      iconClass = "";
    }
    if (stock != '' || concept) {
      if (concept) {
        conceptHtml = '<a href="#" class="them choiceBtnTheme" infoId="'+concept.infoId+'" infoName="'+concept.infoName+'">' + concept.infoName + '</a>';
        if(stock != ''){
          if (stock[0].chg > 0) {
            stockClass = 'hot';
            sym = "+"
          }
          stockHtml = '<span><u class="choiceBtnDeta ' + stockClass + '" infoId="' + stock[0].infoId + '" infoName="' + stock[0].infoName + '" infoCode="' + stock[0].infoCode + '">' + stock[0].infoName +' '+ sym +stock[0].chg + '%</u></span>';
        }
      } else {
        if (stock) {
          // console.log('stock****'+JSON.stringify(stock))
          stockHtml += _this.newsTxtInfo(stock);
        }
      }
      console.log("有概念股票");
      DomHtml = '<div class="stock-theme">' + conceptHtml + stockHtml + '</div>'
    } else {
      console.log("啥都没有")
      DomHtml = ''
    }
    html =
      '    <div class="new-box webkit">' +
      '        <div class="min">' +
      '            <h3 class="btnTxt" infoId="' + info.id + '"><u class="' + iconClass + '"></u>' + delHtmlTag(info.infomationName) + '</h3>' +
      '            <p class="btnTxt" infoId="' + info.id + '">' + delHtmlTag(info.infomationContent) + '</p>' + DomHtml +
      '            <div class="txt">' +
      '                <span>' + (new Date(info.infomationTime)).format("YYYY-MM-DD hh:mm:ss") + '</span>' +
      '                <span>' + info.infomationReaded + '阅读</span>' +
      '            </div>' +
      '        </div>' +
      '    </div>';
    return html;
  },
  newsTxtInfo: function (msg) {
    console.log(JSON.stringify(msg))
    var html = '';
    var $this = this;
    for (var i = 0; i < msg.length; i++) {
      var msgList = msg[i];
      html += $this.newsTxtNmb(msgList);
    }
    return html
  },
  newsTxtNmb: function (msgList) {
    console.log(JSON.stringify(msgList))
    var className = sym = '';
    if (msgList.chg > 0) {
      className = 'hot'
      sym = '+';
    } else {
      className = '';
      sym = '';
    }
    console.log( msgList.infoId + msgList.infoName + msgList.infoCode )
    var html =
      '<u class="choiceBtnDeta ' + className + '" infoId="' + msgList.infoId + '" infoName="' + msgList.infoName + '" infoCode="' + msgList.infoCode + '">' + msgList.infoName +  ' '+ sym + msgList.chg.toFixed(2) + '%</u>';
    return html;
  },
  // 点击跳转文章详情页
  btnTxt: function () {
    $('.btnTxt').unbind("click").click(function () {
      // console.log($(this).attr('infoId'))
      openWindow('txt', {
        infoId: $(this).attr('infoId'),
      }, 'push');
    })
  },
  // 点击跳转股票详情页
  choiceBtnDeta: function () {
    $('.choiceBtnDeta').on('click', function () {
      openWindow('stockDetails', {
        id: $(this).attr('infoId'),
        stockName: $(this).attr('infoName'),
        stockCode: $(this).attr('infoCode')
      }, 'push');
    })
  },
  // 点击跳转概念详情页
  choiceBtnTheme: function () {
    $('.choiceBtnTheme').on('click', function () {
      // console.log($(this).attr('infoId'))
      // console.log($(this).attr('infoName'))
      openWindow('themeDetails', {
        id: $(this).attr('infoId'),
        themeName: $(this).attr('infoName')
        // stockCode: $(this).attr('infoCode')
      }, 'push');
    })
  },
}

$.binLib.indexText = function () {
  txtList.txtAjax();
}
