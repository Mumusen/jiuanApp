var share = {
  shareContent: function () {
    this.sharePut();
  },
  sharePut: function () {
    var dataUrl;
    var $this = this;
    var html =
      '<div class="invite-layer">' +
      '    <div class="invite">' +
      '        <h2>分享给好友</h2>' +
      '        <ul class="invite-btn">' +
      '            <li><i class="invite-icon-wx"></i>微信好友</li>' +
      '            <li><i class="invite-icon-pyq"></i>微信朋友圈</li>' +
      '            <li><i class="invite-icon-qq" id="qqBtn"></i>QQ好友</li>' +
      '        </ul>' +
      '        <a href="javascript:" class="invite-close">取 消</a>' +
      '    </div>' +
      '</div>';
    $(".example").click(function (event) {
      console.log("分享")
      $("body").append(html);
      event.preventDefault();
      html2canvas($("#DOMpic"), {
        allowTaint: true,
        taintTest: false,
        onrendered: function (canvas) {
          canvas.id = "mycanvas";
          //document.body.appendChild(canvas);
          //生成base64图片数据
          dataUrl = canvas.toDataURL();
          var newImg = document.createElement("img");
          newImg.src = dataUrl;
          // document.body.appendChild(newImg);
          console.log("put" + dataUrl)
        }
      });
      $this.shareQQ(dataUrl);
      $this.hideBtnClose();
    });
  },
  shareQQ: function (imgUrl) {
    $("#qqBtn").click(function () {
      var qq = api.require('QQPlus');
      qq.installed(function (ret, err) {
        if (ret.status) {
          qq.shareImage({
            type: 'QFriend',
            imgPath: imgUrl
          }, function (ret, err) {
            console.log({ msg: JSON.stringify(err) })
            // if (ret.status) {
            //   commonAlertWindow({
            //     message: '分享成功',
            //     time: 2000
            //   })
            //   console.log("分享成功")
            // } else {
            //   console.log(err.status)
            //   if (err.status == 10009) {
            //     commonAlertWindow({
            //       message: '未安装QQ客户端',
            //       //                        message:'未安装QQ客户端',
            //       time: 2000
            //     })
            //   } else if (err.status == undefined) {
            //     commonAlertWindow({
            //       message: '取消分享',
            //       time: 2000
            //     })
            //   } else {
            //     commonAlertWindow({
            //       message: '分享失败',
            //       time: 2000
            //     })
            //   }
            // }
          });
          $(".invite-layer").hide();
        } else {
          api.alert({ msg: "没有安装" });
        }
      });

    })
  },
  hideBtnClose: function () {
    $('.invite-close').click(function () {
      console.log("关闭");
      $('.invite-layer').hide();
    })
  }
}

$.binLib.shareAjax = function () {
  share.shareContent();
}
