var login = {
  loginBtn: function () {
    this.loginBtn();
  },
  userListAjax: function () {
    this.userList();
    // this.check();
  },
  loginBtn: function () {
    $('#loginBtn').click(function () {
      var userId = $api.getStorage("userId");
      // console.log(userId)
      var hrefArr = window.location.href.split('/');
      var frame = hrefArr[hrefArr.length - 1].replace('.html', '');
      // console.log('window'+JSON.stringify(frame))
      $api.setStorage('frame', frame);
      if (userId == undefined) {
        openWindow('login', {}, 'push')
      } else {
        openWindow('user', {}, 'push')
      }
    })
  },
  userList: function () {
    // 获取用户name   1.22 get wechat name first!!
    var userId = $api.getStorage("userId");
    var wxName = $api.getStorage("wxName");
    // var wxName = '名字';
    var str = userId.substr(0, 3) + "****" + userId.substr(7);
    if (wxName) {
      console.log(wxName)
      $('#userName').html(wxName)
    } else {
      console.log(str)
      $('#userName').html(str)
    }
    var appVersion = api.appVersion;
    $('#appVersion').html(appVersion);
    $("#singOut").click(function () {
      $api.rmStorage('userId');
      $api.rmStorage('wxCode');
      // $api.rmStorage('check');
      var js = 'location.reload();';
      var frame = $api.getStorage("frame");
      api.execScript({
        name: 'root',
        frameName: frame,
        script: js
      });
      api.closeToWin({
        name: 'root'
      });
    })
  },
  // check: function () {
  //   var check = $api.getStorage("check");
  //   if (check === "false" || check == "2") {
  //     $("#checkId").html("未认证");
  //     $("#checkIf").click(function () {
  //       openWindow('checkId', {}, 'push');
  //     })
  //   } else {
  //     $("#checkIf").click(function () {
  //       commonAlertWindow({
  //         message: "已认证"
  //       });
  //     })
  //     $("#checkId").html("已认证").addClass("green");
  //   }
  // }
}

$.binLib.loginUser = function () {
  login.loginBtn();
}
$.binLib.userList = function () {
  login.userListAjax();
}
