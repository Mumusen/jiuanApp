var themeTxt = {
  txtAjax: function () {
    this.Ajax();
    this.hideBtn();
    // this.imgBtnX();
  },
  Ajax: function () {
    var parm = api.pageParam;
    var infoId = parm.infoId;
    // 清除行内样式
    var reg = /style\s*?=\s*?([‘"])[\s\S]*?\1/ig;
    var $this = this;
    console.log('infoId' + infoId)
    api.ajax({
      url: url() + 'infomation/getInfomationById',
      data: {
        values: {
          id: infoId
        }
      }
    }, function (ret, err) {
      var min = ret.obj;
      var tit = min.infomationName;
      var read = min.infomationReaded + "阅读";
      var time = new Date(min.infomationTime).format("YYYY-MM-DD") + " 责任编辑：" + min.infomationCreater;
      var minTxt = min.infomationContent;
      $('#tit').html(tit);
      $('#time').html(time);
      $('#read').html(read);
      $('#txtMin').append(minTxt)
      $this.imgBtnX();
    })
  },
  hideBtn: function () {
    $('#inviteBtn').click(function () {
      $('.invite-layer').show();
    })
    $('.invite-close').click(function () {
      $('.invite-layer').hide();
    })
    $('body').on('click', '.invite-layer', function (e) {
      e.stopPropagation();
    });
  },
  imgBtn: function () {
    var flag = true,//状态true为正常的状态,false为放大的状态
      imgH,//图片的高度
      imgW,//图片的宽度
      img = document.getElementsByTagName('img')[0];//图片元素
    $(".warp").on('click', 'img', function () {

      imgH = img.height;
      imgW = img.width;
      if (flag) {
        flag = false;
        img.height = imgH * 3;
        img.width = imgW * 3;
      } else {
        flag = true;
        img.height = imgH / 3;
        img.width = imgW / 3;
      }
    })
  },
  imgBtnX: function () {
    var imgsObj = $('img');//需要放大的图像  
    $.each(imgsObj, function () {
      $(this).click(function () {
        var currImg = $(this);
        coverLayer(1);
        var tempContainer = $('<div class=tempContainer></div>');//图片容器  
        with (tempContainer) {//width方法等同于$(this)  
          appendTo("body");
          var windowWidth = $(window).width();
          var windowHeight = $(window).height();
          //获取图片原始宽度、高度  
          var orignImg = new Image();
          orignImg.src = currImg.attr("src");
          var currImgWidth = orignImg.width;
          var currImgHeight = orignImg.height;
          if (currImgWidth < windowWidth) {//为了让图片不失真，当图片宽度较小的时候，保留原图  
            if (currImgHeight < windowHeight) {
              var topHeight = (windowHeight - currImgHeight) / 2;
              if (topHeight > 35) {
                topHeight = topHeight - 150;
                css('top', topHeight);
              } else {
                css('top', 0);
              }
              html('<img border=0 src=' + currImg.attr('src') + '>');
            } else {
              css('top', 0);
              html('<img border=0 src=' + currImg.attr('src') + ' height=' + windowHeight + '>');
            }
          } else {
            var currImgChangeHeight = (currImgHeight * windowWidth) / currImgWidth;
            if (currImgChangeHeight < windowHeight) {
              var topHeight = (windowHeight - currImgChangeHeight) / 2;
              if (topHeight > 35) {
                topHeight = topHeight - 35;
                css('top', topHeight);
              } else {
                css('top', 0);
              }
              html('<img border=0 src=' + currImg.attr('src') + ' width=' + windowWidth + ';>');
            } else {
              css('top', 0);
              html('<img border=0 src=' + currImg.attr('src') + ' width=' + windowWidth + '; height=' + windowHeight + '>');
            }
          }
        }
        tempContainer.click(function () {
          $(this).remove();
          coverLayer(0);
        });
        //   $(document).click(function(){
        //     $(".tempContainer").hide();
        // });
      });
    });
    //使用禁用蒙层效果  
    function coverLayer(tag) {
      with ($('.over')) {
        if (tag == 1) {
          css('height', $(document).height());
          css('display', 'block');
          css('opacity', 1);
          css("background-color", "rgba(25, 25, 25,.9)");
        }
        else {
          css('display', 'none');
        }
      }
    }
  }
}
$.binLib.txtInvite = function () {
  themeTxt.txtAjax();
}


