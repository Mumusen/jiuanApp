var analog = {
  // 判断是否注册配资账户
  buyPwdIf: function () {
    $("#ifPwdBtn").click(function () {
      api.ajax({
        url: url() + 'userManager/checkUserStatusByPhone',
        data: {
          values: {
            phone: $api.getStorage("userId")
            // phone: '18310499911'
          }
        }
      }, function (ret, err) {
        console.log(JSON.stringify(ret));
        if (ret.success) {
          if (ret.userStatus == "1") {
            // 未提交审核
            openWindow('setBuyPwd', {}, 'push');
          } else if (ret.userStatus == "2") {
            // 审核ing
            commonAlertWindow({
              message: '正在审核中'
            })
            setTimeout(function () {
              api.closeToWin({
                name: 'analogUser'
              });
            }, 2000);
          } else if (ret.userStatus == "3") {
            // 审核未通过
            commonAlertWindow({
              message: '审核未通过</br>请重新提交'
            })
            setTimeout(function () {
              openWindow('setBuyPwd', {}, 'push');
            }, 2000);
          } else if (ret.userStatus == "4") {
            // 审核通过
            openWindow('setDeal', {}, 'push');
          }
        } else {
          commonAlertWindow({
            message: ret.errMsg
          });
          closeWindow('analog');
        }
      })
    })
  },
  // 设置交易密码 注册配资账户
  setBuyPwd: function () {
    $("#registerConfirm").click(function () {
      var pwd = $("#userPassword");
      var pwdCon = $("#userPasswordConfirm");
      var userId = $api.getStorage('userId');
      if (testNull(pwd) || testNull(pwdCon)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (pwd.val().length != 6) {
        commonAlertWindow({
          message: '请输入6位数字密码'
        })
      } else if (pwd.val() !== pwdCon.val()) {
        commonAlertWindow({
          message: '两次输入的密码' + '</br>' + '不同,请重新输入'
        })
      } else {
        if ($(this).attr("data-code") == "0") {
          api.ajax({
            url: url() + 'userManager/saveTradePassword',
            method: 'post',
            data: {
              values: {
                // sessionId: '18310499911',
                sessionId: $api.getStorage("userId"),
                tradePwd: pwdCon.val()
              }
            }
          }, function (ret, err) {
            console.log(JSON.stringify(ret))
            if (ret.success === true) {
              commonAlertWindow({
                message: '设置密码成功'
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
              //如果不成功
            } else {
              commonAlertWindow({
                message: '提交失败，请检查网络'
              })
            }
          })
        } else {
          console.log("重置")
          api.ajax({
            url: 'http://106.75.17.91/frontUser/resetUserPwd',
            data: {
              values: {
                sysUserName: 'admin',
                sysPwd: 'Lever_2018',
                // userName: '18310499911',
                userName: $api.getStorage("phone"),
                pwd: pwdCon.val()
              }
            }
          }, function (ret, err) {
            console.log("重置交易密码" + JSON.stringify(ret))
            if (ret.status == "success") {
              commonAlertWindow({
                message: '设置密码成功'
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
            } else {
              commonAlertWindow({
                message: ret.message
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
            }
          })
        }
      }
    })
  },
  // 修改交易密码
  setForBuyPwd: function () {
    $("#registerConfirm").click(function () {
      var pwd = $("#userPassword");
      var pwdCon = $("#userPasswordConfirm");
      var userId = $api.getStorage('userId');
      if (testNull(pwd) || testNull(pwdCon)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (pwd.val().length != 6) {
        commonAlertWindow({
          message: '请输入6位数字密码'
        })
      } else if (pwd.val() !== pwdCon.val()) {
        commonAlertWindow({
          message: '两次输入的密码' + '</br>' + '不同,请重新输入'
        })
      } else {
        console.log($(this).attr("data-code"), "设置交易密码")
        console.log("设置交易密码" + $api.getStorage("userId"), pwdCon.val())
        if ($(this).attr("data-code") == "0") {
          console.log("修改交易密码" + $api.getStorage("userId"), pwdCon.val())
          api.ajax({
            url: url() + 'userManager/updateTransPassword',
            method: 'post',
            data: {
              values: {
                // sessionId: '18310499911',
                sessionId: $api.getStorage("userId"),
                tradePwd: pwdCon.val()
              }
            }
          }, function (ret, err) {
            console.log(JSON.stringify(ret))
            if (ret.success === true) {
              commonAlertWindow({
                message: '设置密码成功'
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
              //如果不成功
            } else {
              commonAlertWindow({
                message: '提交失败，请检查网络'
              })
            }
          })
        } else {
          console.log("重置")
          api.ajax({
            url: 'http://106.75.17.91/frontUser/resetUserPwd',
            data: {
              values: {
                sysUserName: 'admin',
                sysPwd: 'Lever_2018',
                // userName: '18310499911',
                userName: $api.getStorage("phone"),
                pwd: pwdCon.val()
              }
            }
          }, function (ret, err) {
            console.log("重置交易密码" + JSON.stringify(ret))
            if (ret.status == "success") {
              commonAlertWindow({
                message: '设置密码成功'
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
            } else {
              commonAlertWindow({
                message: ret.message
              })
              setTimeout(function () {
                api.closeToWin({
                  name: 'analogUser'
                });
              }, 2000);
            }
          })
        }
      }
    })
  },
  // 忘记交易密码
  fyFindBuyPwd: function () {
    var phone = $api.getStorage("phone");
    $('#userPhone').val(phone);
    this.forgetTestCodeClick();
    this.registerNext('FindsetBuyPwd');
  },
  // 修改密码
  // /userManager/checkOldTransPwd?sessionId=手机号&tradePwd=旧密码
  tradeBuyPwd: function () {
    $("#registerBtn").click(function () {
      var pwd = $("#tradePwd");
      var userId = $api.getStorage('userId');
      // var userId = '18310499911';
      if (testNull(pwd)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if (!numberPwd(pwd)) {
        commonAlertWindow({
          message: '请输入6位数字密码'
        })
      } else {
        api.ajax({
          url: url() + 'userManager/checkOldTransPwd',
          method: 'post',
          data: {
            values: {
              sessionId: userId,
              tradePwd: pwd.val()
            }
          }
        }, function (ret, err) {
          console.log("校验旧密码" + JSON.stringify(ret));
          if (ret.success === true) {
            console.log('校验旧密码通过');
            openWindow('setForDealPwd', {}, 'push');
          } else {
            console.log('校验旧密码失败');
            $("#forgetTxt").show();
            commonAlertWindow({
              message: '密码错误</br>请重新输入'
            })
          }
        })
      }

    })
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
              // phone: '18310499911',
              tradeSms: 1
            }
          }
        }, function (ret, err) {
          console.log("获取验证码" + JSON.stringify(ret))
          //向后台发起ajax请求，如果获取成功
          if (ret.status == 201) {
            commonAlertWindow({
              message: ret.remark
            })
          } else if (ret.status == 200) {
            commonAlertWindow({
              message: '发送成功'
            })
            testCode($$this);
            //如果不成功
          } else {
            commonAlertWindow({
              message: '发送失败'
            })
          }
        });
      }
    });
  },
  //下一步
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
          url: url() + 'find_password/checkPhonesms',
          method: 'post',
          data: {
            values: {
              phone: userPhone.val(),
              sms: testCode.val()
            }
          }
        }, function (ret, err) {
          console.log(JSON.stringify(ret))
          if (ret.success == true) {
            openWindow(win, {}, 'push');
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

}

// 判断是否注册配资账户
$.binLib.ifPwdAnalog = function () {
  analog.buyPwdIf();
};
// 提交配资账户
$.binLib.setPwdAnalog = function () {
  analog.setBuyPwd();
};
// 修改配资账户
$.binLib.setForPwdAnalog = function () {
  analog.setForBuyPwd();
};
// 忘记交易密码
$.binLib.FindsetPwdAnalog = function () {
  analog.fyFindBuyPwd();
};
$.binLib.tradePwd = function () {
  analog.tradeBuyPwd();
}