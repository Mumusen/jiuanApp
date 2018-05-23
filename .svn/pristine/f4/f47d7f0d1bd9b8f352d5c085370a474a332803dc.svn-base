var wxregister = {
    // 绑定手机号
    wxphoneRet: function () {
        this.testCodeClick();
        this.registerNext();
    },
    // 判断是否绑定事件
    accountBin:function(){
        this.accountIf();
    },
    //获取验证码事件
    testCodeClick: function () {
        $('#getTestCode').click(function () {
            console.log("获取验证码事件")
            var $$this = $(this);
            if(testNull($('#userPhone'))){
                commonAlertWindow({
                    message:'手机号不能为空'
                })
            }else{
                if( $('#loginBtn').length > 0){$('#loginBtn').remove();}
                api.ajax({
                    url:url() + '/member/bindMobileSendMessage',
                    data:{
                        values:{
                            phone: $('#userPhone').val(),
                            token:'bind_telphone'
                        }
                    }
                }, function (ret,err) {
                    //向后台发起ajax请求，如果获取成功
                    console.log(JSON.stringify(ret));
                    if(ret.success === true){
                        testCode($$this);
                        var type = ret.type;
                        // 如果type=1 没有登录密码 2 有登录密码
                        if(type === '1'){
                            commonAlertWindow({
                                message:ret.msg
                            })
                            wxBtn({
                                btn:'setPwdBtn',
                                txt:'下一步'
                            })
                        }else{
                            commonAlertWindow({
                                message:ret.msg
                            })
                            wxBtn({
                                btn:'wxBtnOut',
                                txt:'完成'
                            })
                        }
                    }else{
                        commonAlertWindow({
                            message:ret.msg
                        })
                    }
                });
            }
        });
    },
    //新手机号，校验验证码 下一步
    registerNext: function () {
        var userPhone = $('#userPhone');
        var testCode = $('#testCode');
        $('#setPwdBtn').click(function () {
            console.log("下一步")
            if(testNull(userPhone) || testNull(testCode)){
            commonAlertWindow({
                message:'输入不能为空'
            })
            }else{
                api.ajax({
                    url: url()+'registration/registrationForApp',
                    method:'post',
                    data: {
                        values:{
                            phone: userPhone.val(),
                            captcha: testCode.val()
                        }
                    }
                }, function (ret,err) {
                    console.log(JSON.stringify(ret))
                    if(ret.success == true){
                        openWindow('wxSetPwd',{
                            userPhone:userPhone.val(),
                            testCode:testCode.val()
                        },'push');
                        //如果不成功
                    }else if(ret.success == false){
                        commonAlertWindow({
                            message:ret.errMsg
                        })
                    }else{
                        commonAlertWindow({
                            message:'操作有误'
                        })
                    }
                });
            }
        })
    },
    //密码保存/绑定
    registerSaveClick: function () {
        var pageParam = api.pageParam;
        var userPwd = $('#userPassword');
        var userPwdCon = $('#userPasswordConfirm');
        $('#registerConfirm').click(function () {
            console.log("注册密码保存事件")
            if(testNull(userPwd) || testNull(userPwdCon)){
                commonAlertWindow({
                    message:'输入不能为空'
                })
            }else if(!testPwd(userPwd)){
                commonAlertWindow({
                    message:'请输入6-12位'+'</br>'+'含数字或字母的密码'
                })
            }else if(userPwd.val() !== userPwdCon.val()){
                commonAlertWindow({
                    message:'两次输入的密码'+'</br>'+'不同,请重新输入'
                })
            }else{
                api.ajax({
                    url:url()+'registration/bindPhone',
                    method:'post',
                    data:{
                        values:{
                            wxCode:$api.getStorage('wxCode'),
                            phone:pageParam.userPhone,
                            pwd:userPwd.val()
                        }
                    }
                }, function (ret,err) {
                    if(ret.success === true){
                        console.log(JSON.stringify(pageParam.userPhone));
                        var userId = pageParam.userPhone;
                        //如果成功 跳转到首页
                        commonAlertWindow({
                            message:'绑定成功'
                        })
                        setTimeout(function(){
                            api.closeToWin({
                                name:'accountIphone'
                            });
                        },1000);
                        $api.setStorage('userId',userId);
                        //如果不成功
                    }else if(ret.success == false){
                        commonAlertWindow({
                            message:ret.errMsg
                        })
                    }else{
                        commonAlertWindow({
                            message:'提交失败，请检查网络'
                        })
                    }
                });
            }
        });
    },
    accountIf: function(){
        var userId = $api.getStorage("userId");
        // var userId = '18310499933';
        var wxCode = $api.getStorage("wxCode");
        // var wxCode = '115645465456';
        // console.log(userId)
        // console.log(wxCode)
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        // phone
        if(!myreg.userId){
            txt = '<em class="color">已绑定</em>';
            $('#userPhone').append(txt)
        }else{
            txt =  '<em onclick="openWindow(\'accountIphone\',{},\'push\')">未绑定</em>';
            $('#userPhone').append(txt)
        }
        // wechat
        if(wxCode !== '' && wxCode !== undefined){
            txt = '<em class="color">已绑定</em>';
            $('#weChat').append(txt)
        }else{
            txt = '<em onclick="">未绑定</em>';
            $('#weChat').append(txt)
        }
    }
}

$.binLib.wxregister = function () {
    wxregister.wxphoneRet();
}

$.binLib.account = function () {
    wxregister.accountBin();
}

//按钮 下一步/确认
function wxBtn(obj) {
    var html =
    '<div class="user-box user-btn" id="loginBtn">'+
    '    <a class="list list-c tc" href="javascript:" id="'+obj.btn+'">'+obj.txt+'</a>'+
    '</div>';
    $('section').append(html);
}