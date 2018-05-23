var themeList = {
  PAGE_boolean: false,
  PAGE_NUM: 1,
  autoN: true,
  timerChoice: null,
  timeAuto: false,
  // 用户自选股-外
  slideList: function () {
    // this.choiceAjaxInitial();
    // this.hotListAjax(1);
    this.choiceAjaxList(3);
    this.hotBtnAjax();
    this.hotBtnUp();
    this.editBtnMin();
    this.addSing();
    this.liftAjax();
  },
  // 用户自选股-编辑
  choiceEdit: function () {
    this.choiceEditAjaxList(2);
    this.choiceEditTab();
    this.layerBtn();
    this.choicesBtnAll();
    this.lyaerDel();
    this.inputDelBtn();
    this.layerBtnBox();
    this.submitBtn();
  },
  // 热门推荐渲染
  hotListAjax: function (init) {
    var $this = this,
      html = '',
      ThemeHtml = '',
      noData = '<div class="noDataBj"></div>';
    $('#hotTList span').remove();
    $('#hotSlist span').remove();
    $('.hotBox').remove();
    $("body").append('<section class="por hotBox">' +
      '    <i class="back"></i>' +
      '    <div class="title chio-box">' +
      '        <h2>添加自选</h2>' +
      '        <h3>体验智能预警超强功能</h3>' +
      '        <a href="#" class="signout" id="addSing">立 即 添 加</a>' +
      '    </div>' +
      '    <div class="chio-min">' +
      '        <h2>热门推荐</h2>' +
      '        <h3>大数据挖掘牛股</h3>' +
      '        <a href="#" class="btn-change">换一换</a>' +
      '        <!-- theme-txt 备用 -->' +
      '        <p id="hotTList" class="them-list"></p>' +
      '        <p id="hotSlist" class="shares-txt"></p>' +
      '        <a href="#" class="signout" id="hotBtn">一 键 添 加</a>' +
      '    </div>' +
      '</section>');
    console.log('热门推荐渲染传值' + init)
    api.ajax({
      url: url() + 'selfSelectInfo/getRecommend',
      data: {
        values: {
          pageNo: init
        }
      }
    }, function (ret, err) {
      // console.log('hostlist+++++++' + JSON.stringify(ret))
      if (ret.success == true) {
        if (ret.dataExist == true) {
          if (ret.info.conceptCount != 0) {
            // console.log("jinru info hot")
            var list = ret.info;
            var msgListStock = list.hotStockList;
            var msgListTheme = list.hotConceptList;
            var conceptCount = parseInt(list.conceptCount / 3);
            // console.log(conceptCount);
            $this.PAGE_NUM = conceptCount;
            // console.log(JSON.stringify(msgList))
            for (var i = 0; i < msgListTheme.length; i++) {
              // console.log(JSON.stringify(msg))
              var msg = msgListTheme[i];
              ThemeHtml += $this.hotHtml(msg);
            }
            for (var i = 0; i < 3; i++) {
              var msg = msgListStock[i];
              html += $this.hotHtml(msg);
              // console.log(JSON.stringify(msg))
            }
            $('#hotSlist').append(html)
            $('#hotTList').append(ThemeHtml)
            $this.choiceBtnDeta();
          } else {
            console.log("热门推荐没有数据")
            $(".chio-min").hide();
            $(".noDataBj").remove();
            $("body").append(noData);
            htmlHotBtn();
          }
        } else {
          console.log("热门推荐没有数据")
          $(".chio-min").hide();
          $(".noDataBj").remove();
          $("body").append(noData);
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
      timeAuto = false;
    })
  },
  // hot HTML 渲染
  hotHtml: function (msg) {
    hotHtml =
      '<span class="choiceBtnDeta" infoType="' + msg.infoType + '" infoId="' + msg.infoId + '" infoCode="' + msg.infoToken + '" infoName=" ' + msg.infoName + ' ">' + msg.infoName + '</span>';
    return hotHtml;
  },
  // 换一换
  hotBtnAjax: function () {
    var _this = this;
    // var i = 1;
    $('body').on('click', '.btn-change', function () {
      // console.log('换一换'+_this.PAGE_NUM);
      var random = Math.floor(Math.random() * (_this.PAGE_NUM + 1));
      // var random = '0';
      if (random === '0') {
        // console.log('碰到0了' + '0')
        random = 1;
      }
      console.log(random)
      _this.hotListAjax(random);

    })
  },
  // 判断是否登录
  addSing: function () {
    $('#addSing').click(function () {
      console.log("立即添加")
      var userId = $api.getStorage("userId");
      if (userId != undefined) {
        openWindow('moreThemeFromFrame1', {}, 'push');
      } else {
        commonAlertWindow({
          message: '请登录'
        })
        setTimeout(function () {
          openWindow('login', {}, 'push')
        }, 1000)
      }
    })
  },
  // hotBtn 一键添加
  hotBtnUp: function () {
    $('body').on('click', '#hotBtn', function () {
      // console.log("一键添加")
      // console.log(JSON.stringify(list))
      var userId = $api.getStorage("userId");
      var sale_list = [];
      $('.chio-min p span').each(function () {
        var saleAttr = $(this).attr('infoId') + ":" + $(this).attr('infoType') + ":" + $(this).attr('infoToken');
        sale_list.push(saleAttr)
      })
      // console.log(sale_list.join(','))
      // console.log(sale_list)
      if (userId != undefined) {
        api.ajax({
          url: url() + 'selfSelectInfo/quickAdd',
          method: 'post',
          data: {
            values: {
              infos: sale_list.join(','),
              userToken: userId
            }
          }
        }, function (ret, err) {
          // console.log('addd')
          // console.log(JSON.stringify(ret))
          if (ret.success == true) {
            commonAlertWindow({
              message: '添加成功'
            })
            location.reload();
          } else {
            commonAlertWindow({
              message: '添加失败'
            })
          }
        })
      } else {
        commonAlertWindow({
          message: '请登录'
        })
        setTimeout(function () {
          openWindow('login', {}, 'push')
        }, 1000)
      }
      // e.stopPropagation();
      // console.log(JSON.stringify(sale_list))
    })
  },
  // 进入编辑页面
  editBtnMin: function () {
    var userId = $api.getStorage("userId");
    $('#editBtnMin').click(function () {
      if (userId != undefined) {
        openWindow('choiceshares', {}, 'push');
      } else {
        commonAlertWindow({
          message: '请登录'
        })
        setTimeout(function () {
          openWindow('login', {}, 'push')
        }, 1000)
      }
    })
  },
  // 用户自选股数据列表渲染
  choiceAjaxList: function (inFo) {
    var html = '';
    var $this = this;
    var userId = $api.getStorage("userId");
    var waitLoading = new WaitLoading();
    var status = true;
    $('#listAll li').remove(html)
    $(".por").remove();
    $(".hotBox").remove();
    waitLoading.close();
    $this.tabChoic();
    inFo = $("#ture").attr("inFo");
    console.log("自选股渲染页面");
    // console.log(inFo + "tab 位置")
    // waitLoading.open();
    // console.log('用户自选股数据列表渲染传值' + userId + "*****" + $this.autoN)
    if (userId != undefined && $this.autoN === true) {
      // DiGui = function(){
      // console.log($this.autoN + "666666666666")
      console.log("userId"+ userId + "infoType" + inFo)
      api.ajax({
        url: url() + 'selfSelectInfo/showMySelect',
        data: {
          values: {
            userToken: userId,
            infoType: inFo
          }
        }
      }, function (ret, err) {
        // console.log('list99999' + JSON.stringify(ret))
        if (ret.success == true) {
          // console.log("jinru1111")
          if (ret.selectExist) {
            $("body").append('<section class="por hotBox">' +
              '    <div class="choice-top">' +
              '        <i class="back"></i>' +
              '        <div class="title webkit" id="tabChoice">' +
              '            <span class="active" inFo="2">全部</span>' +
              '            <span inFo="0">主题</span>' +
              '            <span inFo="1">股票</span>' +
              '        </div>' +
              '        <div class="tit webkit frame-tit">' +
              '            <span>名称</span>' +
              '            <span>现价</span>' +
              '            <span class="liftBtn">涨跌幅</span>' +
              '        </div>' +
              '    </div>' +
              '    <div class="list">' +
              '        <ul id="listAll" class="list"></ul>' +
              '    </div>' +
              '</section>')
            console.log("jinru2222")
            if (ret.mySelect != "") {
              // console.log("jinru3333")
              var msgList = ret.mySelect;
              $('#tabBox').show();
              $('#porBox').hide();
              var msg = {};
              // console.log(JSON.stringify(msgList))
              for (var i = 0; i < msgList.length; i++) {
                msg = msgList[i];
                // console.log(JSON.stringify(msg))
                if (msg.infoType != 1) {
                  html += $this.htmlTheme(msg);
                } else {
                  html += $this.htmlShares(msg);
                }
              }
              $('#listAll').append(html)
              $this.tabChoic();
              $this.choiceBtnDeta();
              // $this.autoTime();
              $this.autoTimeSet();
              $this.hotBtnUp();
              $this.choice();
              $this.liftAjax();
              timeAuto = true;
            }
          } else {
            $('.hotBox').remove();
            $("body").append('<section class="por hotBox">' +
              '    <i class="back"></i>' +
              '    <div class="title chio-box">' +
              '        <h2>添加自选</h2>' +
              '        <h3>体验智能预警超强功能</h3>' +
              '        <a href="#" class="signout" id="addSing">立 即 添 加</a>' +
              '    </div>' +
              '    <div class="chio-min">' +
              '        <h2>热门推荐</h2>' +
              '        <h3>大数据挖掘牛股</h3>' +
              '        <a href="#" class="btn-change">换一换</a>' +
              '        <!-- theme-txt 备用 -->' +
              '        <p id="hotTList" class="them-list"></p>' +
              '        <p id="hotSlist" class="shares-txt"></p>' +
              '        <a href="#" class="signout" id="hotBtn">一 键 添 加</a>' +
              '    </div>' +
              '</section>');
            $this.hotListAjax(1);
          }
        } else {
          $this.autoN = false;
          $this.hotListAjax(1);
        }
      })
    } else {
      $this.hotListAjax(1);
    }
    $this.addSing();
  },
  // 自选股列表滑动
  tabChoic: function () {
    var $this = this;
    setTimeout(function () {
      $('.btn').show();
    }, 1000);
    var _this = this;
    var expansion = null; //是否存在展开的list
    var container = document.querySelectorAll('.list li .li');
    for (var i = 0; i < container.length; i++) {
      var x, y, X, Y, swipeX, swipeY;
      container[i].addEventListener('touchstart', function (event) {
        x = event.changedTouches[0].pageX;
        y = event.changedTouches[0].pageY;
        swipeX = true;
        swipeY = true;
        if (expansion) { //判断是否展开
          expansion.className = "li";
        }
        // 删除
        $('.btn').on('click', function () {
          // console.log(JSON.stringify($(this).parent()))
          var userId = $api.getStorage("userId");
          var _li = $(this).parent('li');
          var selectInfoId = _li.attr('selectInfoId');
          // console.log(selectInfoId)
          api.ajax({
            url: url() + 'selfSelectInfo/deleteBatch',
            data: {
              values: {
                // userId:userId,
                ids: selectInfoId
              }
            }
          }, function (ret, err) {
            // console.log(JSON.stringify(ret))
            if (ret.success == true) {
              $(_li).remove();
              commonAlertWindow({
                message: '删除成功'
              })
              // console.log($('#listAll li').length)
              if ($('#listAll li').length = '0') {
                // console.log('11111111')
                location.reload();
              }
              // _this.choiceAjaxList(2)
            } else {
              commonAlertWindow({
                message: '删除失败'
              })
            }
            event.stopPropagation();
          })
        })
      });
      container[i].addEventListener('touchmove', function (event) {
        X = event.changedTouches[0].pageX;
        Y = event.changedTouches[0].pageY;
        // 左右滑动
        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation();
          if (X - x > 10) { //右滑
            event.preventDefault();
            this.className = "li"; //右滑收起
          }
          if (x - X > 10) { //左滑
            event.preventDefault();
            this.className = "li swipeleft"; //左滑展开
            expansion = this;
          }
          swipeY = false;
        }
        // 上下滑动
        if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
          swipeX = false;
        }

      });
    };

  },
  htmlTheme: function (msg) {
    var MsgColor = '';
    var name = msg.infoName;
    var nameList = name;
    if (msg.chg < 0) {
      MsgColor = "background-color:#39c922"
    } else {
      MsgColor = "background-color:#ea1f38"
    }
    if (name.length > 6) {
      // console.log(name.length)
      nameList = name.substring(0, 6) + ".";

    }
    // console.log(name)
    // console.log(nameList)
    htmlTheme =
      '            <li class="list-themeli" selectInfoId="' + msg.selectInfoId + '">' +
      '                <div class="li choiceBtnDeta" infoId="' + msg.infoId + '" infoName="' + msg.infoName + '">' +
      '                    <span>' + msg.infoName + '<b>主题</b></span>' +
      '                    <span>--</span>' +
      '                    <span><u style="' + MsgColor + '">' + toTwo(msg.chg) + '%</u></span>' +
      '                </div>' +
      '                <i class="btn"></i>' +
      '            </li>';
    return htmlTheme;
  },
  htmlShares: function (msg) {
    var MsgColor = '';
    var MsgSize = '';
    if (msg.chg < 0) {
      MsgColor = "background-color:#39c922";
      MsgSize = "color:#39c922"
    } else {
      MsgColor = "background-color:#ea1f38"
      MsgSize = "color:#ea1f38"
    }
    htmlShares =
      '            <li class="hot-txt" selectInfoId="' + msg.selectInfoId + '">' +
      '                <div class="li choiceBtnDeta" infoId="' + msg.infoId + '" infoName="' + msg.infoName + '" infoCode="' + msg.infoCode + '" infoType="' + msg.infoType + '" marketCode="' + msg.dataType + '">' +
      '                    <span>' + msg.infoName + '<i>' + msg.infoCode + '</i></span>' +
      '                    <span style="' + MsgSize + '">' + toTwo(msg.currentPrice) + '</span>' +
      '                    <span><u style="' + MsgColor + '">' + toTwo(msg.chg) + '%</u></span>' +
      '                </div>' +
      '                <i class="btn"></i>' +
      '            </li>';
    return htmlShares;
  },
  // 定时器
  autoTime: function () {
    var userId = $api.getStorage("userId");
    var myDate = new Date();
    var hours = myDate.getHours();
    var $this = this;
    var stockTime = stockTimeIf();
    if (stockTime == true && userId != undefined) {
      // console.log("条件满足，启动定时器")
      var inFo = $("#choiceBox").attr("inFo");
      var is = $("#choiceBox").attr("is");
      // console.log("auto time" + userId + "//://" + inFo + "//*//" + is)
      if (is == "true") {
        // console.log("升序")
        $this.choiceAjax(userId, inFo, 0)
      } else if (is == "false"){
        // console.log("降序")
        $this.choiceAjax(userId, inFo, 1)
      }else{
        // console.log("默认")
        $this.choiceAjax(userId, inFo)
      }
      $this.autoTimeSet();
    } else {
      // console.log("条件不满足，不启动");
      clearInterval(this.autoTimeSet)
    }
  },
  autoTimeSet: function () {
    var $this = this;
    this.timerChoice = setTimeout(function () {
      $this.autoTime();
    }, 15000)
  },
  // 跳转新页面
  choiceBtnDeta: function () {
    $('.choiceBtnDeta').on('click', function () {
      var infoType = $(this).attr('infoType')
      // console.log(infoType)
      if (infoType != 1) {
        // 跳转主题
        openWindow('themeDetails', {
          id: $(this).attr('infoId'),
          themeName: $(this).attr('infoName')
          // stockCode: $(this).attr('infoCode')
        }, 'push');
      } else {
        // 跳转股票
        // console.log("跳转股票" + $(this).attr('infoName') + $(this).attr('infoCode'))
        openWindow('stockDetails', {
          // id: $(this).attr('infoId'),
          stockName: $(this).attr('infoName'),
          stockCode: $(this).attr('infoCode'),
          marketCode: $(this).attr('marketCode')
        }, 'push');
      }
    })
  },
  // 用户自选股-外 tab切换
  choice: function () {
    var userId = $api.getStorage("userId");
    var choicehtml = '';
    var bindthis = this;
    var waitLoading = new WaitLoading();
    var $li = $('body #tabChoice span');
    $li.mouseover(function () {
      $('#ture').attr("is", "true");
      $('.liftBtn').removeClass("up");
      $('.liftBtn').removeClass("down");
      $("#listAll").html("");
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      waitLoading.open();
      if ($t === 0) {
        $t = 2;
        $("#choiceBox").attr("inFo", "9")
      } else if ($t === 1) {
        $t = 0;
        $("#choiceBox").attr("inFo", "0")
      } else {
        $t = 1;
        $("#choiceBox").attr("inFo", "1")
      }
      inFo = $t;
      console.log($("#choiceBox").attr("inFo"))
      console.log("当前类型" + inFo)
      api.ajax({
        url: url() + 'selfSelectInfo/showMySelect',
        data: {
          values: {
            userToken: userId,
            infoType: inFo
          }
        }
      }, function (ret, err) {
        // console.log("切换" + JSON.stringify(ret))
        if (ret.success) {
          if (ret.mySelect != "") {
            // console.log("jinru3333")
            var msgList = ret.mySelect;
            // console.log(JSON.stringify(msgList))
            for (var i = 0; i < msgList.length; i++) {
              msg = msgList[i];
              // console.log(JSON.stringify(msg))
              if (msg.infoType != 1) {
                choicehtml += bindthis.htmlTheme(msg);
              } else {
                choicehtml += bindthis.htmlShares(msg);
              }
            }
            // console.log(choicehtml)
            $('#listAll').html(choicehtml)
            choicehtml = "";
            bindthis.tabChoic();
            bindthis.choiceBtnDeta();
            // bindthis.autoTime();
          }
        } else {
          commonAlertWindow({
            message: "网络异常"
          });
        }
        waitLoading.close();
      })
    })
  },
  // 升序降序AJAX请求
  choiceAjax: function (userId, inFo, sort) {
    var choicehtml = '';
    var bindthis = this;
    // $("#listAll").html("");
    console.log("升序降序AJAX请求" + userId + ":" + inFo + ":" + sort)
    var waitLoading = new WaitLoading();
    api.ajax({
      url: url() + 'selfSelectInfo/showMySelect',
      data: {
        values: {
          userToken: userId,
          infoType: inFo,
          sort: sort
        }
      }
    }, function (ret, err) {
      if (ret.success) {
        if (ret.mySelect != "") {
          // console.log("jinru3333")
          var msgList = ret.mySelect;
          // console.log(JSON.stringify(msgList))
          for (var i = 0; i < msgList.length; i++) {
            msg = msgList[i];
            // console.log(JSON.stringify(msg))
            if (msg.infoType != 1) {
              choicehtml += bindthis.htmlTheme(msg);
            } else {
              choicehtml += bindthis.htmlShares(msg);
            }
          }
          // console.log(choicehtml)
          $('#listAll').html(choicehtml)
          choicehtml = "";
          bindthis.tabChoic();
          bindthis.choiceBtnDeta();
          // bindthis.autoTime();
        }
      } else {
        commonAlertWindow({
          message: "网络异常"
        });
      }
      waitLoading.close();
    })
  },
  // 升序降序
  liftAjax: function () {
    var userId = $api.getStorage("userId");
    var bindthis = this;
    var waitLoading = new WaitLoading();
    $(".liftBtn").click(function () {
      // console.log(JSON.stringify($(".liftBtn").attr("is")))
      // $("#listAll").html("");
      var inFo = $("#choiceBox").attr("inFo");
      // console.log("is"+$("#choiceBox").attr("is"))
      if ($("#choiceBox").attr("is") == "0") {
        $('#choiceBox').attr("is", "true");
      }
      if ($("#choiceBox").attr("is") == "true") {
        console.log("升序")
        $('#choiceBox').attr("is", "false");
        $('.liftBtn').removeClass("down");
        $('.liftBtn').addClass("up");
        waitLoading.open();
        bindthis.choiceAjax(userId, inFo, 1)
      } else {
        console.log("降序")
        $('#choiceBox').attr("is", "true");
        $('.liftBtn').removeClass("up");
        $('.liftBtn').addClass("down");
        waitLoading.open();
        bindthis.choiceAjax(userId, inFo, 0)
      }

    })
  },
  // 用户编辑数据列表渲染
  choiceEditAjaxList: function (inFo) {
    var html = '';
    var $this = this;
    var userId = $api.getStorage("userId");
    var waitLoading = new WaitLoading();
    // waitLoading.open();
    $('#simpleList li').remove(html)
    if (userId != undefined) {
      api.ajax({
        url: url() + 'selfSelectInfo/showMySelect',
        data: {
          values: {
            userToken: userId,
            infoType: inFo
          }
        }
      }, function (ret, err) {
        // console.log(ret)
        // console.log(JSON.stringify(ret))
        if (ret.success === true) {
          waitLoading.close();
          var msgList = ret.mySelect;
          for (var i = 0; i < msgList.length; i++) {
            var msg = msgList[i];
            if (msg.infoType != 1) {
              html += $this.htmlThemeEdit(msg);
            } else {
              html += $this.htmlSharesEdit(msg);
            }
          }
          $('#simpleList').append(html)
          Sortable.create(simpleList, { group: 'shared' });
          $this.btnUp();
          $this.monitor();
          // $this.choicesBtnAll();
        } else {
          waitLoading.close();
          commonAlertWindow({
            message: '请登录'
          })
          setTimeout(function () {
            openWindow('login', {}, 'push')
          }, 1000)
        }
      })
    }
  },
  htmlThemeEdit: function (msg) {
    htmlThemeEdit =
      '            <li>' +
      '                <input type="checkbox" infoType="' + msg.infoType + '" infoId="' + msg.infoId + '" selectInfoId="' + msg.selectInfoId + '" infoName="' + msg.infoName + '" infoToken="' + msg.infoName + '">' +
      '                <span class="shares">' + msg.infoName + '<b>主题</b></span>' +
      '                <i class="icon-up"></i>' +
      '                <b class="icon-drag"></b>' +
      '            </li>';
    return htmlThemeEdit;
  },
  htmlSharesEdit: function (msg) {
    htmlSharesEdit =
      '            <li>' +
      '                <input type="checkbox" infoType="' + msg.infoType + '" infoId="' + msg.infoId + '" selectInfoId="' + msg.selectInfoId + '" infoName="' + msg.infoName + '" infoToken="' + msg.infoName + '">' +
      '                <span>' + msg.infoName + '<u>' + msg.infoCode + '</u></span>' +
      '                <i class="icon-up"></i>' +
      '                <b class="icon-drag"></b>' +
      '            </li>';
    return htmlSharesEdit;
  },
  // user tab
  choiceEditTab: function () {
    var userId = $api.getStorage("userId");
    var html = '';
    var bindthis = this;
    var waitLoading = new WaitLoading();
    var $li = $('#tabChoice span');
    $li.mouseover(function () {
      var $this = $(this);
      var $t = $this.index();
      $li.removeClass();
      $this.addClass('active');
      waitLoading.open();
      if ($t === 0) {
        $t = 2;
      } else if ($t === 1) {
        $t = 0;
      } else {
        $t = 1;
      }
      inFo = $t;
      console.log(inFo)
      bindthis.choiceEditAjaxList(inFo)
    })
  },
  // 自选编辑全选
  choicesBtnAll: function () {
    var $this = this;
    $('.btn-all').on('click', function (e) {
      var _this = $(this);
      var ns = _this.next();
      var btnOn = $('li').children('input');
      var is = '';
      var html =
        '<div class="lyaer-choices">' +
        '	<button>删 除</button>' +
        '</div>';
      var waitLoading = new WaitLoading();
      // console.log(btnOn.length)
      if (btnOn.length > 0) {
        if ($(this).attr('istype') == 'false') {
          is = true;
          // this.delLayer();
          $('.lyaer-choices').remove();
          $('body').append(html);
        } else {
          is = false;
          $('.lyaer-choices').remove();
        }
      } else {
        commonAlertWindow({
          message: '请添加自选'
        })
        setTimeout(function () {
          closeWindow('choiceshares');
        }, 1000)
      }
      // console.log(is)
      $(this).attr('istype', is)
      ns.children('li').children('input').each(function () {
        // console.log(is, $(this).is('checked'))
        $(this).prop('checked', is)
      });
      $this.PAGE_boolean = true;
      // $this.pageBoolean();
    })
  },
  // 置顶
  btnUp: function () {
    var $this = this;
    $('.list-choice').on('click', 'i', function () {
      // console.log("置顶")
      var _this = $(this).parent('li');
      var _thisUl = $(_this).parent('ul');
      // console.log(_this)			
      // console.log(_thisUl)
      $(_this).remove();
      $(_thisUl).prepend(_this);
      $this.PAGE_boolean = true;
      // selfSelectInfo/upSelect
      // selfSelectInfoId=1478
      // $this.pageBoolean();
    })
  },
  // 判断input点击事件
  inputDelBtn: function () {
    var $this = this;
    var Delstr = '';
    var DelName = '';
    // var selectInfoId ='';
    var html =
      '<div class="lyaer-choices">' +
      '	<button>删 除</button>' +
      '</div>';
    $(".list-choice").on('click', 'input', function () {
      $("input").each(function () {
        Delstr = $("input[type='checkbox']:checked").length;
        // selectInfoId = $(this).attr('selectInfoId');
      })
      if (Delstr > 0) {
        // console.log('进入')
        $('.lyaer-choices').remove();
        $('body').append(html);
        // $('#subBtn').html('完成');
        // DelName = $("input[type='checkbox']:checked")[0].getAttribute('infoName');
      } else {
        $('.lyaer-choices').remove();
        // $('#subBtn').html('取消');
      }
      // console.log(Delstr)
      // console.log(selectInfoId)
      event.stopPropagation();
      $this.PAGE_boolean = true;
      // $this.pageBoolean();
    })
  },
  // 删除弹框提示
  lyaerDel: function () {
    $('body').on('click', '.lyaer-choices button', function () {
      var Delstr = $("input[type='checkbox']:checked").length;
      var DelName = $("input[type='checkbox']:checked")[0].getAttribute('infoName');
      check_val = [];
      $('input [type=checkbox]:checked').each(function () {
        var saleAttr = [{
          'id': $(this).val(),
          'user': $(this).attr('suerId')
        }]
        check_val.push(saleAttr);
      })
      function choiceLayer(obj) {
        var html =
          '<div class="layer-del" style="z-index:99">' +
          '    <div class="layer-del-box">' +
          '        <p>确定删除</p>' +
          '        <p>' + DelName + '等' + Delstr + '个自选</p>' +
          '        <div class="btn">' +
          '            <a href="#" id="btnNo">取消</a>' +
          '            <a href="#" id="btnYse">确定</a>' +
          '        </div>' +
          '    </div>' +
          '</div>';
        $('body').append(html);
      };
      choiceLayer({
        name: 'zzzz',
        number: 1
      })
    })
  },
  // 弹出框取消
  layerBtnBox: function () {
    $('body').on('click', '#btnNo', function () {
      // console.log('111')
      $('.layer-del').remove();
    })
  },
  // 弹出框确定删除提交
  layerBtn: function () {
    var $this = this;
    $('body').on('click', '#btnYse', function () {
      var _this = this;
      var checkBoxArray = new Array();
      var checkBoxIndex = 0;
      var inputs = $("input");
      for (var i = 0; i < inputs.length; i++) {
        //获取input元素中的checkbox
        if (inputs[i].type == "checkbox") {
          if (inputs[i].checked) {
            //alert(inputs[i].getAttribute("checkStoremanId"));
            checkBoxArray[checkBoxIndex] = inputs[i].getAttribute("selectInfoId");
            checkBoxIndex++;
          }
        }
      }
      // console.log(checkBoxArray)
      api.ajax({
        url: url() + 'selfSelectInfo/deleteBatch',
        data: {
          values: {
            // userId:userId,
            ids: checkBoxArray.join(',')
          }
        }
      }, function (ret, err) {
        // console.log(JSON.stringify(ret))
        if (ret.success == true) {
          $('.layer-del').remove();
          commonAlertWindow({
            message: '删除成功'
          })
          location.reload();
        } else {
          commonAlertWindow({
            message: '删除失败'
          })
        }
      })
      $this.PAGE_boolean = true;
      // $this.pageBoolean();
      event.stopPropagation();
    })
  },
  // 完成 提交
  submitBtn: function () {
    $('#subBtn').click(function () {
      var userId = $api.getStorage("userId");
      var checkBoxArray = new Array();
      var inputs = $("input");
      var checkBoxIndex = 0;
      var waitLoading = new WaitLoading();
      if (inputs.length > 0) {
        for (var i = 0; i < inputs.length; i++) {
          // alert(inputs[i].getAttribute("selectInfoId"));
          // sale_list = inputs[i].getAttribute('infoId')
          // var saleAttr = $(this).attr('infoId')+":"+userId+":"+$(this).attr('infoType');
          // checkBoxArray[checkBoxIndex] = inputs[i].getAttribute("infoId") + ":" + inputs[i].getAttribute("infoToken") + ":" + inputs[i].getAttribute("infoType");
          checkBoxArray[checkBoxIndex] = inputs[i].getAttribute("selectInfoId") + ":" + inputs[i].getAttribute("infoId") + ":" + inputs[i].getAttribute("infoType") + ":" + inputs[i].getAttribute("infoToken");
          checkBoxIndex++;
        }
        // console.log(checkBoxArray)
        waitLoading.open();
        api.ajax({
          url: url() + 'selfSelectInfo/editMySelect',
          method: 'post',
          data: {
            values: {
              infos: checkBoxArray.join(','),
              userToken: userId
            }
          }
        }, function (ret, err) {
          // console.log("paixu"+JSON.stringify(ret))
          if (ret.success === true) {
            waitLoading.close();
            var js =
              'location.reload();';
            api.execScript({
              name: 'root',
              frameName: 'frame2',
              script: js
            });
            setTimeout(function () {
              api.closeToWin({
                name: 'root'
              });
            }, 1000);
          } else {
            waitLoading.close();
            commonAlertWindow({
              message: '请求失败'
            })
          }
        })
      } else {
        var js =
          'location.reload();';
        api.execScript({
          name: 'root',
          frameName: 'frame2',
          script: js
        });
        setTimeout(function () {
          api.closeToWin({
            name: 'root'
          });
        }, 1000);
      }
    })
  },
  // 监控dom 页面
  monitor: function () {
    var $this = this;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var target = document.querySelector('#simpleList');
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // console.log(mutation.type);
        if (mutation.type == 'childList') {
          // console.log('hhhhhhh')
          $this.PAGE_boolean = true;
          // $this.pageBoolean();
          observer.disconnect();
        }
      });
    });
    // 配置观察选项:
    var config = { attributes: true, childList: true, characterData: true }
    // 传入目标节点和观察选项
    observer.observe(target, config);
    // console.log('rizhi'+observer.observe(target, config))
    // 随后,你还可以停止观察
    // observer.disconnect();
    // var childList = observer.observe(target, config);

  }
};
$.binLib.SlideUser = function () {
  themeList.slideList();
}

$.binLib.choiceEditList = function () {
  themeList.choiceEdit();
}
