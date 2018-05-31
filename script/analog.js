var operation = {
  // 外框切换
  initIndexWin: function () {
    this.loginAnalog();
    // this.inputBuyPassWord();//临时
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
    $('.exitWindow').click(function () {
      // clearInterval($this.timer);
      closeWindow("analog");
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
    var userId = $api.getStorage("userId");
    console.log("用户校验"+JSON.stringify(userId))
    // if(userId != null || userId != undefined){
    //   api.ajax({
    //     url: url() + 'userManager/checkUserStatusByPhone',
    //     data: {
    //       values: {
    //         phone: userId
    //         // phone: '18310499911'
    //       }
    //     }
    //   }, function (ret, err) {
    //     console.log("用户状态"+JSON.stringify(ret))
    //     if (ret.success) {
    //       if (ret.userStatus == "1") {
    //     //     // 未提交审核
    //         $("body").append(DOM1);
    //         $("#openBtn").click(function () {
    //           $(".stateLayer").remove();
    //           $("body").append(DOM4);
    //           $this.analogSetDeal();
    //         })
    //       } else if (ret.userStatus == "2") {
    //         // 审核ing
    //         $("body").append(DOM3);
    //       } else if (ret.userStatus == "3") {
    //         // 审核未通过
    //         $("body").append(DOM2);
    //       } else if (ret.userStatus == "4") {
            // 审核通过
            console.log("审核通过");
            $("body").append(DOM5);
            $this.analogSetDeal();
    //       }
    //     } else {
    //       commonAlertWindow({
    //         message: "系统异常"
    //       });
    //       closeWindow('analog');
    //     }
    //   })
    // }else{
    //   commonAlertWindow({
    //     message: "请登录"
    //   });
    //   setTimeout(function(){
    //     openWindow('login', {}, 'push');
    //   },2000)
    // }
  },
  // 校验交易密码
  analogSetDeal: function () {
    var pwd = "";
    var $this = this;
    $("#payPwd").payPwd({
      max: 6,
      type: "password",
      callback: function (arr) {
        // $("#inputtype").html(arr);
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
    console.log("校验交易密码是否正确"+JSON.stringify(pwd));
    if (pwd == "" || pwd == undefined) {
      commonAlertWindow({
        message: "请输入6位</br>交易密码"
      });
    } else {
      var phone = $api.getStorage("phone");
      // var pwd = pwd;
      console.log("输入"+ phone, pwd);
      // var data = { userName: phone, passWord: pwd };
      var data = { userName: "test01", passWord: "111111" };
      api.ajax({
        url: url3() + "openapi/v1/login",
        data:{
          values:{
            paraJson:JSON.stringify(data)
          }
        }
      },function(ret,err){
        console.log("登录"+JSON.stringify(ret))
        if(ret.info.rescode == "success"){
          console.log("验证成功")
          $(".stateLayer").remove();
          commonAlertWindow({
            message: "验证成功"
          });
          var token = ret.info.result.accessToken;
          console.log(JSON.stringify(token));
          $api.setStorage("token", token)
          $this.openFrameGroup();
          $this.frameGroupResponse();
          $this.frameGroupClick();
          $this.exitClearInterval();
        }
      })
    }
  },
  // 设置交易密码
  loginSetBuy: function (pwd) {
    console.log(JSON.stringify(pwd))
    if (pwd == "" || pwd == undefined) {
      commonAlertWindow({
        message: "请输入6位</br>交易密码"
      });
    } else {
      var phone = $api.getStorage('phone');
      console.log("设置密码", phone, pwd);
      api.ajax({
        url: url3() + 'userManager/saveTradePassword',
        data: {
          values: {
            sessionId:phone,
            tradePwd:pwd
          }
        }
      }, function (ret, err) {
        console.log("设置交易密码"+JSON.stringify(ret))
        if(ret.rescode = "success"){
          $(".stateLayer").remove();
          commonAlertWindow({
            message: "提交成功</br>等待审核"
          });
          setTimeout(function () {
            closeWindow('analog');
          }, 2000)
        }else{
          commonAlertWindow({
            message: "提交失败"
          });
          setTimeout(function () {
            closeWindow('analog');
          }, 2000)
        }
      })
    }
  }
}

$.binLib.operationIndexWin = function () {
  operation.initIndexWin();//主窗口方法
};
