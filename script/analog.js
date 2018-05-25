var operation = {
  userId: $api.getStorage('userId'),
  // 外框切换
  initIndexWin: function () {
    this.loginAnalog();
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
      console.log('exitClearInterval')
      // clearInterval($this.timer);
      closeWindow('analog');
    });
  },
  // 用户校验 状态
  loginAnalog: function(){
    var $this = this;
    var DOM1 = 
    '  <div class="stateLayer">'+
    '    <div class="box">'+
    '      <button id="openBtn">去 开 通</button>'+
    '      <i class="exitWindow"></i>'+
    '    </div>'+
    '  </div>';
    var DOM2 = 
    '  <div class="stateLayer">'+
    '    <div class="box state-4">'+
    '      <button>再 次 申 请</button>'+
    '      <i class="exitWindow"></i>'+
    '    </div>'+
    '  </div>';
    var DOM3 =
    '  <div class="stateLayer">'+
    '    <div class="box state-2">'+
    '      <div class="txt">'+
    '        <p>正在为您加塞审批</p>'+
    '        <p>请耐心等候</p>'+
    '      </div>'+
    '      <i class="exitWindow"></i>'+
    '    </div>'+
    '  </div>';
    var DOM4 = 
    '  <div class="stateLayer">'+
    '    <div class="box box-pwd">'+
    '      <h2>输入交易密码</h2>'+
    '      <div class="pwd-control" id="payPwd">'+
    '          <div class="box-control">'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '              <div class="flex-1 item"><input maxlength="1" type="tel"></div>'+
    '          </div>'+
    '      </div>'+
    '      <button id="buyBtnAjax">确 定</button>'+
    '      <p onclick="openWindow(\'forgetDealPwd\',{},\'push\')">忘记密码?</p>'+
    '      <i class="exitWindow"></i>'+
    '    </div>'+
    '  </div>';
    // api.ajax({
    //   url: '',
    //   data: {
    //     values: {
    //       userPhone: userPhone
    //     }
    //   }
    // }, function (ret, err) {
    //   if(ret.success){
    //     if(ret.state == 1){
          console.log('12121')
          $("body").append(DOM1);
          $("#openBtn").click(function(){
            $(".stateLayer").remove();
            $("body").append(DOM4);
            $this.analogSetDeal();
          })
      //   }else if(ret.state == 2){
          
      //   }else{
      //     $this.openFrameGroup();
      //     $this.frameGroupResponse();
      //     $this.frameGroupClick();
      //     $this.exitClearInterval();
      //   }
      // }
    // })
  },
  analogSetDeal: function(){
    var pwd = "";
    var $this = this;
    $("#payPwd").payPwd({
      max:6,
      type:"password",
      callback:function(arr) {
        $("#inputtype").html(arr);
        pwd = arr;
      }
    })
    $("#buyBtnAjax").click(function(){
      $this.loginSetBuy(pwd);
    })
  },
  loginSetBuy: function(pwd){
    console.log(JSON.stringify(pwd))
    if(pwd == "" || pwd == undefined){
      commonAlertWindow({
        message: "请输入6位</br>交易密码"
      });
    }else{
        // api.ajax({
        //   url: 'http://hangqingjingling.com/openapi/v1/login',
        //   data: {
        //     values: {
        //       userName: userName,
        //       passWord: passWord
        //     }
        //   }
        // }, function (ret, err) {
        //   if(ret.success){
        //     var token = ret.token;
        //     localStorage.setItem('token', token);
        //   }
              commonAlertWindow({
                message: "提交成功</br>等待审核"
              });
              setTimeout(function(){
                closeWindow('analog');
              },2000)
        // })
    }
  }
}

$.binLib.operationIndexWin = function () {
  operation.initIndexWin();//主窗口方法
};
