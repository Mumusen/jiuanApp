var themeList = {
  theme: function () {
    this.choiceEditTab();
    this.riseBtn();
    this.AjaxList();
  },
  choiceEditTab: function () {
    var $li = $('#tabBox span');
    var $ul = $('.theme .rise');
    $ul.eq(0).css('display', 'block');
    $li.mouseover(function () {
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      $ul.css('display', 'none');
      $ul.eq($t).css('display', 'block');
    });
  },
  AjaxList: function () {
    var html = htmlTheme = htmlListDown = htmlInfo = htmlInfoTxt = '';
    // console.log($api.getStorage("userId"))
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.open();
    api.ajax({
      url: url() + 'indexforApp',
      data: {
        values: {
          phone: $api.getStorage("userId")
        }
      }
    }, function (ret, err) {
      // console.log('ret'+JSON.stringify(ret))
      // console.log('err'+JSON.stringify(err))
      if (ret.success == true) {
        waitLoading.close();
        // console.log(JSON.stringify(ret.sectionExponential))
        var msgList = ret.sectionExponential;
        var themeList = ret.leadConceptStock;
        var themeListDow = ret.backwardConceptStock;
        var infomationMap = ret.informationVos.infomationMap;
        var topInformationMap = ret.informationVos.topInformationMap;
        // 大盘渲染
        for (var i = 0; i < msgList.length; i++) {
          var msg = msgList[i];
          // console.log(JSON.stringify(msg))
          html += $this.indexHtml(msg);
        }
        $('#sectionExponential').html(html)
        // 领涨主题
        for (var i = 0; i < themeList.length; i++) {
          var msg = themeList[i];
          // console.log(JSON.stringify(msg))
          htmlTheme += $this.themeHtml(msg);
        }
        $('#upTheme').html(htmlTheme)
        // 领跌主题
        for (var i = 0; i < themeListDow.length; i++) {
          var msg = themeListDow[i];
          // console.log('领跌 '+JSON.stringify(msg))
          htmlListDown += $this.themeHtml(msg);
        }
        $('#duTheme').html(htmlListDown)
        // 最新资讯
        if (topInformationMap != null) {
          // 置顶内容
          for (var key in topInformationMap) {
            var infos = topInformationMap[key];
            // console.log("置顶"+JSON.stringify(key))
            htmlInfoTxt += $this.newsUpTxt(infos, key);
          }
        }
        for (var key in infomationMap) {
          var infos = infomationMap[key];
          // console.log("日期"+JSON.stringify(key))
          htmlInfo += $this.newsTxt(infos, key);
        }
        $('#newsList').append(htmlInfoTxt)
        $('#newsList').append(htmlInfo)
        $this.choiceBtnDeta();
        $this.choiceBtnDetaBig();
        $this.choiceBtnTheme();
        $this.choiceBtnBoard();
        $this.choiceBtnTxt();
      } else {
        waitLoading.close();
        commonAlertWindow({
          message: err.msg
        })
      }
    })
  },
  // 关注 添加/删除
  riseBtn: function () {
    $(".rise").on("click", "li .right a", function () {
      var _this = this;
      var userId = $api.getStorage("userId");
      var infoId = $(this).attr('infoId');
      var infoToken = $(this).attr('infoToken');
      if ($(this).hasClass("follow-no")) {
        // 删除
        // console.log('删除'+infoId)
        api.ajax({
          url: url() + 'selfSelectInfo/deleteSelfSelect',
          data: {
            values: {
              id: infoId,
              type: 0,
              phone: userId
            }
          }
        }, function (ret, err) {
          $(_this).removeClass("follow-no")
          commonAlertWindow({
            message: '从自选移除'
          })
        })
      } else {
        // 添加
        // console.log('tj'+infoId+userId)
        if (userId == undefined) {
          commonAlertWindow({
            message: '请登录'
          })
          setTimeout(function () {
            openWindow('login', {}, 'push')
          }, 1000)
        } else {
          // console.log('tianjia'+userId+'||'+infoId+'||'+infoToken)
          api.ajax({
            url: url() + 'selfSelectInfo/addInfo',
            method: 'post',
            data: {
              values: {
                userToken: userId,
                infoType: 0,
                infoId: infoId,
                infoToken: infoToken
              }
            }
          }, function (ret, err) {
            // console.log(JSON.stringify(ret))
            if (ret.success === true) {
              $(_this).addClass("follow-no")
              commonAlertWindow({
                message: '添加自选成功'
              })
            } else {
              commonAlertWindow({
                message: '请求失败'
              })
            }
          })
        }
      }
    });
  },
  // 大股渲染
  indexHtml: function (msg) {
    var html = '',
     color = '',
     stockType = '';
    if (msg.changeRate > 0) {
      // console.log('1111')
      color = 'hot'
      sign = '+'
    } else {
      color = ''
      sign = ''
      // console.log('2222')
    }
    if(msg.stockType == null){
      console.log("创新")
    }else{
      stockType = msg.stockType;
      console.log(JSON.stringify(stockType))
    }
    indexHtml =
      '    <li class="choiceBtnDetaBig ' + color + '" stockCode="'+msg.stockCode+'" stockName="'+msg.stockName+'" marketCode="'+stockType+'">' +
      '        <h3>' + msg.stockName + '</h3>' +
      '        <h4>' + msg.currentPoint.toFixed(2) + '</h4>' +
      '        <p>' +
      '            <span>' + sign + msg.currentPrice.toFixed(2) + '</span>' +
      '            <span>' + sign + msg.changeRate.toFixed(2) + '%</span>' +
      '        </p>' +
      '    </li>';
    return indexHtml;
  },
  // 今日领涨/跌主题
  themeHtml: function (msg) {
    var html = className = chgClass = codeClass = signRate = '';
    if (msg.chg > 0) {
      sign = '+'
    } else {
      sign = ''
    };
    if (msg.isAttention == 1) {
      className = 'follow follow-no';
    } else if (msg.isAttention == 2) {
      className = 'follow';
    };
    if (msg.chg > 0) {
      chgClass = '';
    } else {
      chgClass = 'green'
    }
    if (msg.stockDetailVo.changeRate > 0) {
      codeClass = '';
      signRate = '+';
    } else {
      codeClass = 'green-icon'
      signRate = '';
    }
    html =
      '        <li>' +
      '            <div class="left">' +
      '                <h2 class="choiceBtnTheme" infoId="' + msg.id + '" infoName="' + msg.conceptStockName + '">' + msg.conceptStockName + '</h2>' +
      '                <div class="txt">' +
      '                    <p class="' + chgClass + '">' + sign + msg.chg.toFixed(2) + '%</p>' +
      '                    <p class="choiceBtnDeta ' + codeClass + '" infoId="' + msg.stockDetailVo.associateStockId + '" infoName="' + msg.stockDetailVo.stockName + '" infoCode="' + msg.stockDetailVo.stockCode + '">' +
      '                        <i></i>' +
      '                        <span>' + msg.stockDetailVo.stockName + '<u>' + signRate + msg.stockDetailVo.changeRate.toFixed(2) + '%</u></span>' +
      '                    </p>' +
      '                </div>' +
      '            </div>' +
      '            <div class="right">' +
      '                <a href="#" class="' + className + '" infoId="' + msg.id + '" infoToken="' + msg.conceptStockName + '"></a>' +
      '            </div>' +
      '        </li>';
    return html;
  },
  // 置顶内容
  newsUpTxt: function (msg, key) {
    html =
      '      <div class="news-box">' +
      '        <div class="mian news-up">' +
      '          <div class="txt">' +
      '            <div class="time-date-up">' + key + '&nbsp;' + (new Date(msg.infomationTime)).format("hh:mm") +'</div>' +
      '            <h2>' + this.infoVo(msg) + '</h2>' +
      '            <p class="txt-min choiceBtnTxt"infoId="' + msg.id + '"><b>' + delHtmlNews(msg.infomationName) + '</b>&nbsp;&nbsp;&nbsp;&nbsp;' + delHtmlNews(msg.infomationContent) + '</p>' +
      '            <p class="infoTxt">' + this.newsTxtInfo(msg.stockDetails) + '</p>' +
      '          </div>' +
      '        </div>' +
      '      </div>';
    return html;
  },
  // 最新资讯
  newsTxt: function (msg, key) {
    // console.log(JSON.stringify(msg))
    newsTxt =
      '<div class="news-box">' +
      '    <div class="time-date">' + key + '</div>' + this.newsDate(msg) +
      '</div>';
    return newsTxt
  },
  newsDate: function (msg) {
    // console.log("列表"+JSON.stringify(msg))
    var html = '';
    var $this = this;
    if (msg.length > 0) {
      // console.log("xunhuan")
      for (var i = 0; i < msg.length; i++) {
        var txt = msg[i];
        html += $this.newMain(txt)
        // console.log("内容1" +JSON.stringify(txt))
      }
    } else {
      // console.log("单条")
      html =
        '    <div class="mian">' +
        '        <div class="day"><span>' + (new Date(msg.infomationTime)).format("hh:mm") + '</span><i></i></div>' +
        '        <div class="txt">' +
        '            <div>' +
        '                <h2>' + this.infoVo(msg) + '</h2>' +
        '                <p class="txt-min choiceBtnTxt"infoId="' + msg.id + '"><b>' + delHtmlNews(msg.infomationName) + '</b>&nbsp;&nbsp;&nbsp;&nbsp;' + delHtmlNews(msg.infomationContent) + '</p>' +
        '            </div>' +
        '            <p class="infoTxt">' + this.newsTxtInfo(msg.stockDetails) + '</p>' +
        '        </div>' +
        '    </div>';
    }
    return html;

  },
  newMain: function (msg) {
    // console.log("内容2" + JSON.stringify(msg))
    html =
      '    <div class="mian">' +
      '        <div class="day"><span>' + (new Date(msg.infomationTime)).format("hh:mm") + '</span><i></i></div>' +
      '        <div class="txt">' +
      '            <div>' +
      '                <h2>' + this.infoVo(msg) + '</h2>' +
      '                <p class="txt-min choiceBtnTxt"infoId="' + msg.id + '"><b>' + delHtmlNews(msg.infomationName) + '</b>&nbsp;&nbsp;&nbsp;&nbsp;' + delHtmlNews(msg.infomationContent) + '</p>' +
      '            </div>' +
      '            <p class="infoTxt">' + this.newsTxtInfo(msg.stockDetails) + '</p>' +
      '        </div>' +
      '    </div>';
    return html;
  },
  infoVo: function (msg) {
    var html = isTopClass = '';
    if (msg.isTop == 1) {
      isTopClass = '<u>置顶</u>';
    }
    var msg = msg.conceptStockInfoVo;
    if (msg != null) {
      html = '<div class="choiceBtnTheme" infoId ="' + msg.id + '" infoName="' + msg.conceptStockName + '">' + delHtmlTagTitle(msg.conceptStockName) + isTopClass + '</div>';
    }
    return html;
  },
  newsTxtInfo: function (msg) {
    var html = '';
    var $this = this;
    for (var i = 0; i < msg.length; i++) {
      var msgList = msg[i];
      html += $this.newsTxtNmb(msgList);
    }
    return html
  },
  newsTxtNmb: function (msgList) {
    var className = sym = '';
    if (msgList.changeRate > 0) {
      className = 'hot'
      sym = '+';
    } else {
      className = '';
      sym = '';
    }
    var html =
      '<span class="choiceBtnDeta ' + className + '" infoId="' + msgList.associateStockId + '" infoName="' + msgList.stockName + '" infoCode="' + msgList.stockCode + '">' + msgList.stockName + '<u>' + sym + msgList.changeRate.toFixed(2) + '%</u></span>';
    return html;
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
  // 点击跳转股票详情页-大盘
  choiceBtnDetaBig: function () {
    // console.log(JSON.stringify($('.choiceBtnDeta')))
    $('.choiceBtnDetaBig').on('click', function () {
      openWindow('stockDetails', {
        stockCode: $(this).attr('stockCode'),
        stockName: $(this).attr('stockName'),
        marketCode: $(this).attr('marketCode'),
      }, 'push');
    })
  },
  // 点击跳转主题详情页
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
  // 点击龙虎榜详情页
  choiceBtnBoard: function () {
    $('.choiceBtnBoard').on('click', function () {
      // console.log(JSON.stringify($(this).attr('infoId')))
      // console.log(JSON.stringify($(this).attr('infoName')))
      // console.log(JSON.stringify($(this).attr('themName')))
      openWindow('themeBillboard', {
        infoId: $(this).attr('infoId'),
        themeName: $(this).attr('themName'),
        // stockCode: $(this).attr('infoCode')
      }, 'push');
    })
  },
  // 点击跳转文章详情页
  choiceBtnTxt: function () {
    $('.choiceBtnTxt').on('click', function () {
      // console.log($(this).attr('infoId'))
      openWindow('txt', {
        infoId: $(this).attr('infoId'),
      }, 'push');
    })
  },

}

$.binLib.indexTheme = function () {
  themeList.theme();
}
