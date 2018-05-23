var check = {
  checkAjax: function () {
    // this.checkIf();
    this.checkBtn();
  },
  checkBtn: function () {
    var $this = this;
    var realName = $('#realName');
    var idNumber = $('#idNumber');
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
        $this.stepOneAjax(idNumber.val(), realName.val());
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
  stepOneAjax: function (idCard, realName) {
    var $this = this;
    var phone = $api.getStorage("check");
    api.ajax({
      url: url() + 'member_index/certification',
      data: {
        values: {
          idCard: idCard,
          realName: realName,
          qutouPhone: $api.getStorage("check")
        }
      }
    }, function (ret, err) {
      console.log(JSON.stringify(ret));
      if (ret.success === true) {
        $api.setStorage('userId', phone);
        $api.rmStorage('check');
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
  },
  // checkIf: function () {
  //   var check = $api.getStorage("check");
  //   var $this = this;
  //   if (check === "true") {
  //     $("#nextStep").addClass("change-btn-no");
  //     $("input").attr("disabled", false)
  //   } else {
  //     $this.checkBtn();
  //   }
  // }
}

$.binLib.checkInit = function () {
  check.checkAjax();
}
