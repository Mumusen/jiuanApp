var check = {
  checkAjax: function () {
    // this.checkIf();
    this.checkBtn();
  },
  checkBtn: function () {
    var $this = this;
    var pageParm = api.pageParam;
    var phone = pageParm.phone;
    var userId = pageParm.userId;
    var realName = $('#realName');
    var idNumber = $('#idNumber');
    console.log(realName,idNumber);
    $('#nextStep').click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (testNull(realName) || testNull(idNumber)) {
        commonAlertWindow({
          message: '输入不能为空'
        })
      } else if ($this.isCardNo(idNumber.val())) {
        commonAlertWindow({
          message: '身份证号格式错误'
        })
      } else {
        $this.stepOneAjax(idNumber.val(), realName.val(),phone,userId);
      }
    })
  },
  //身份证格式判断
  isCardNo: function (card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    }
  },
  stepOneAjax: function (idCard, realName,phone,userId) {
    var $this = this;
    console.log(idCard,realName,phone,userId)
    api.ajax({
      url: url() + 'member_index/certification',
      data: {
        values: {
          idCard: idCard,
          realName: realName,
          qutouPhone: $api.getStorage("phone")
        }
      }
    }, function (ret, err) {
      console.log("身份证认证"+JSON.stringify(ret));
      if (ret.success === true) {
        $api.setStorage('userId', phone);
        $api.rmStorage('userId',userId);
        commonAlertWindow({
          message: '认证成功'
        })
        var js =
          'location.reload();';
        api.execScript({
          name: 'root',
          frameName: 'frame0',
          script: js
        });
        $api.setStorage('userId', userId);
        $api.setStorage('phone', phone);
        setTimeout(function () {
          api.closeToWin({
            name: 'root'
          });
        }, 2000);
      } else if (ret.success === false) {
        commonAlertWindow({
          message: '信息有误，请重新输入'
        })
      }
    });
  }
}

$.binLib.checkInit = function () {
  check.checkAjax();
}
