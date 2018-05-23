var operation = {
  userId: $api.getStorage('userId'),
  // 外框切换
  initIndexWin: function () {
    this.openFrameGroup();
    this.frameGroupResponse();
    this.frameGroupClick();
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
    $('#exitWindow').click(function () {
      console.log('exitClearInterval')
      // clearInterval($this.timer);
      closeWindow('analog');
    });
  }
}

$.binLib.operationIndexWin = function () {
  operation.initIndexWin();//主窗口方法
};
