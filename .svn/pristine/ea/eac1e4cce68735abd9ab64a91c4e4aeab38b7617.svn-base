var login = {
  loginBtn: function () {
    this.singIn();
  },
  singIn: function () {
    $('input').focus(function () {
      $('.change-box').addClass('login-on');
    })
    $('#sign').click(function () {
      var userPhone = $('#userPhone').val();
      var userPassword = $('#userPassword').val();
      var waitLoading = new WaitLoading();
      waitLoading.close(0);
      console.log(userPhone)
      console.log(userPassword)
      if (testNull($('#userPhone')) || testNull($('#userPassword'))) {
        commonAlertWindow({
          message: '输入不能为空'
        });
      } else {
        waitLoading.open();
        api.ajax({
          url: url() + 'registration/loginMthodForApp',
          data: {
            values: {
              userName: userPhone,
              pwd: userPassword,
              isMobile: 1
            }
          }
        }, function (ret, err) {
          console.log(JSON.stringify(ret))
          // console.log(JSON.stringify(ret.isCertification))
          if (ret.success === true) {
            waitLoading.close(0);
            var userId = ret.data;
            if (ret.isCertification == "2") {
              console.log("认证")
              var js = 'location.reload()';
              $api.setStorage('userId', userId);
              var frame = $api.getStorage("frame");
              api.execScript({
                name: 'root',
                frameName: frame,
                script: js
              });
              setTimeout(function () {
                closeWindow('login');
              }, 10)
            } else {
              console.log("未认证")
              $api.setStorage('check', userId);
              openWindow('check', {}, 'push');
            }
            // 查看用户是否审核通过
            if(ret.userStatus == "1"){
              // 未提交审核
              localStorage.setItem("userStatus" , 1)
            }else if(ret.userStatus == "2"){
              // 审核ing
              localStorage.setItem("userStatus" , 2)
            }else if(ret.userStatus == "3"){
              // 审核未通过
              localStorage.setItem("userStatus" , 3)
            }else if(ret.userStatus == "4"){
              // 审核通过
              localStorage.setItem("userStatus" , 4)
            }
          } else {
            waitLoading.close(0);
            commonAlertWindow({
              message: ret.errMsg
            });
          }
        });
      }
    })
  }
}
$.binLib.loginAjax = function () {
  login.loginBtn();
}