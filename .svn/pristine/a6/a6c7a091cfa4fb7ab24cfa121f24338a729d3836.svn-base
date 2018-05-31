var register = {
  //注册
  initRegister: function () {
    this.testCodeClick();
    this.registerNext('setPwd');
    this.registerSaveClick();
  },
  //忘记密码-重置
  initForgetPwd: function () {
    this.forgetTestCodeClick();
    this.registerNext('resetPwd');
    this.resetPWdSaveClick();
  },
  // 修改密码
  initModify: function () {
    this.modifyPwd();
    this.forgetTestCodeClick();
    this.registerNext('changeSet');
    this.modifyPWdSaveClick();
  },
  // 忘记交易密码
  fyBuyPwd:function(){
    // this.modifyPwd();
    this.forgetTestCodeClick();
    this.registerNext('setBuyPwd');
  },
  //获取验证码事件
  testCodeClick: function () {
    $('#getTestCode').click(function () {
      console.log("获取验证码事件")
      var $$this = $(this);
      if (testNull($('#userPhone'))) {
        commonAlertWindow({
          message: '手机号不能为空'
        })
      } else {
        api.ajax({
          url: url() + 'member/mobileSendMessageService',
          data: {
            values: {
              phone: $('#userPhone').val(),
              token: 'bind_telphone'
            }
          }
        }, function (ret, err) {
          //向后台发起ajax请求，如果获取成功
          console.log(JSON.stringify(ret))
          if (ret.status == 200) {
            commonAlertWindow({
              message: '发送成功'
            })
            testCode($$this);
            //如果不成功
          } else if (ret.status == 201) {
            commonAlertWindow({
              message: ret.remark
            })
          } else {
            commonAlertWindow({
              message: '发送失败'
            })
          }
        });
      }
    });
  },
  //获取验证码倒计时
  forgetTestCodeClick: function () {
    $('#getTestCode').click(function () {
      console.log("获取验证码倒计时")
      var $$this = $(this);
      if (testNull($('#userPhone'))) {
        commonAlertWindow({
          message: '手机号不能为空'
        })
      } else {
        console.log($('#userPhone').val())
        api.ajax({
          url: url() + 'member/mobileSendMessageService',
          data: {
            values: {
              phone: $('#userPhone').val(),
              sms_code_type: 'update_telphone'
            }
          }
        }, function (ret, err) {
          console.log("获取验证码" + JSON.stringify(ret))
          //向后台发起ajax请求，如果获取成功
          if (ret.status == 200) {
            commonAlertWindow({
              message: '发送成功'
            })
            testCode($$this);
            //如果不成功
          } else if (ret.status == 201) {
            commonAlertWindow({
              message: ret.remark
            })
          } else {
            commonAlertWindow({
              message: '发送失败'
            })
          }
        });
      }
    });
  },
  //注册/忘记  下一步
  registerNext: function (win) {
    var userPhone = $('#userPhone');
    var testCode = $('#testCode');
    $('#registerBtn').click(function () {
      console.log("下一步")
      if (testNull(userPhone) || testNull(testCode)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else {
        api.ajax({
          url: url() + 'registration/registrationForApp',
          method: 'post',
          data: {
            values: {
              phone: userPhone.val(),
              captcha: testCode.val()
            }
          }
        }, function (ret, err) {
          console.log(JSON.stringify(ret))
          if (ret.success == true) {
            openWindow(win, {
              userPhone: userPhone.val(),
              testCode: testCode.val()
            }, 'push');
            //如果不成功
          } else if (ret.success == false) {
            commonAlertWindow({
              message: ret.errMsg
            })
          } else {
            commonAlertWindow({
              message: '操作有误'
            })
          }
        });

      }
    })
  },
  //重置密码保存事件
  resetPWdSaveClick: function () {
    var pageParam = api.pageParam;
    var userPwd = $('#userPassword');
    var userPwdCon = $('#userPasswordConfirm');
    $('#registerConfirm').click(function () {
      console.log("重置密码保存事件")
      console.log(pageParam.userPhone)
      if (testNull(userPwd) || testNull(userPwdCon)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (!testPwd(userPwd)) {
        commonAlertWindow({
          message: '请输入6-12位' + '</br>' + '含数字或字母的密码'
        })
      } else if (userPwd.val() !== userPwdCon.val()) {
        commonAlertWindow({
          message: '两次输入的密码' + '</br>' + '不同,请重新输入'
        })
      } else {
        console.log("重置密码" + pageParam.userPhone + userPwd.val())
        api.ajax({
          url: url() + 'find_password/mobileCheckpasswordByLink',
          method: 'post',
          data: {
            values: {
              password: userPwd.val(),
              passwordagain: userPwdCon.val(),
              isApp: 1,
              phone: pageParam.userPhone
            }
          }
        }, function (ret, err) {
          console.log(JSON.stringify(ret))
          if (ret.success === true && ret.result == 1) {
            // console.log(JSON.stringify(pageParam.userPhone));
            //如果成功 跳转到首页
            commonAlertWindow({
              message: '设置新密码成功'
            })
            setTimeout(function () {
              api.closeToWin({
                name: 'login'
              });
            }, 1000);
            //如果不成功
          } else if (ret.success == false) {
            commonAlertWindow({
              message: ret.errMsg
            })
          } else {
            commonAlertWindow({
              message: '提交失败，请检查网络'
            })
          }
        });
      }
    });
  },
  //注册密码保存事件
  registerSaveClick: function () {
    var pageParam = api.pageParam;
    var userPwd = $('#userPassword')
    var userPwdCon = $('#userPasswordConfirm');
    $('#registerConfirm').click(function () {
      console.log("注册密码保存事件")
      if (testNull(userPwd) || testNull(userPwdCon)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (!testPwd(userPwd)) {
        commonAlertWindow({
          message: '请输入6-12位' + '</br>' + '含数字或字母的密码'
        })
      } else if (userPwd.val() !== userPwdCon.val()) {
        commonAlertWindow({
          message: '两次输入的密码' + '</br>' + '不同,请重新输入'
        })
      } else {
        console.log("注册密码保存事件" + userPwd + userPwdCon)
        api.ajax({
          url: url() + 'registration/registrationTwoForApp',
          method: 'post',
          data: {
            values: {
              phone: pageParam.userPhone,
              pwd: userPwd.val()
            }
          }
        }, function (ret, err) {
          console.log(JSON.stringify(ret));
          if (ret.success === true) {
            //如果成功 跳转到首页
            commonAlertWindow({
              message: '设置成功'
            })
            setTimeout(function () {
              api.closeToWin({
                name: 'login'
              });
            }, 1000);
            //如果不成功
          } else if (ret.success == false) {
            commonAlertWindow({
              message: ret.errMsg
            })
          } else {
            commonAlertWindow({
              message: '提交失败，请检查网络'
            })
          }
        });
      }
    });
  },
  // 修改密码-设定手机号
  modifyPwd: function () {
    var userId = $api.getStorage("userId");
    // var userId = '18310499939';
    // console.log(userId)
    $('#userPhone').val(userId);
    $('#userPhone').attr("readOnly", false);
    // console.log($('#userPhone').val())
  },
  // //修改密码保存事件
  modifyPWdSaveClick: function () {
    var pageParam = api.pageParam;
    var userId = $api.getStorage("userId");
    var userPwd = $('#userPassword');
    var userPwdCon = $('#userPasswordConfirm');
    $('#registerConfirm').click(function () {
      if (testNull(userPwd) || testNull(userPwdCon)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (!testPwd(userPwd)) {
        commonAlertWindow({
          message: '请输入6-12位' + '</br>' + '含数字或字母的密码'
        })
      } else if (userPwd.val() !== userPwdCon.val()) {
        commonAlertWindow({
          message: '两次输入的密码' + '</br>' + '不同,请重新输入'
        })
      } else {
        console.log("修改密码" + userId + userPwd + userPwdCon)
        api.ajax({
          url: url() + 'find_password/mobileCheckpasswordByLink',
          method: 'post',
          data: {
            values: {
              password: userPwd.val(),
              passwordagain: userPwdCon.val(),
              isApp: 1,
              phone: userId
            }
          }
        }, function (ret, err) {
          console.log("修改密码返回" + JSON.stringify(ret))
          if (ret.success === true && ret.result == 1) {
            // console.log(JSON.stringify(pageParam.userPhone));
            //如果成功 跳转到首页
            commonAlertWindow({
              message: '设置密码成功'
            })
            $api.rmStorage('userId');
            var js =
              'location.reload();';
            api.execScript({
              name: 'root',
              frameName: 'frame0',
              script: js
            });
            setTimeout(function () {
              api.closeToWin({
                name: 'root'
              });
            }, 2000);
            //如果不成功
          } else if (ret.success == false) {
            commonAlertWindow({
              message: ret.errMsg
            })
          } else {
            commonAlertWindow({
              message: '提交失败，请检查网络'
            })
          }
        });
      }
    });
  },
}

$.binLib.register = function () {
  register.initRegister();
}

$.binLib.forgetPwd = function () {
  register.initForgetPwd();
}

$.binLib.modifyPwd = function () {
  register.initModify();
}

$.binLib.modifyBuyPwd = function () {
  register.fyBuyPwd();
}
