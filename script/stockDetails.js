var stockDetails = {
  LAST_TIME: null,
  searchDate: $('#showDate'),
  userPhone: $api.getStorage("userId"),
  dates: [],
  data: [],
  init: function () {
    // this.firstCharts();
    // this.secondCharts();
    this.getStockTitle();
    // this.getData();
    //this.renderingBillboard();
    this.departmentDetails();
    this.switchCharts();
    //this.fiveTimeCharts();
  },
  //获取数据渲染
  getData: function (name, code, rCode, market) {
    var $this = this;
    $this.dayKCharts(rCode);
    var userPhone = this.userPhone;
    if (userPhone) { //登录
      // console.log(market + ' 市场标识');
      var waitLoading = new WaitLoading();
      waitLoading.open();
      api.ajax({
        url: url() + 'stock/getStockDetails',
        data: {
          values: {
            stockCode: rCode,
            marketCode: market,
            userPhone: userPhone
          }
        }
      }, function (ret) {
        console.log(JSON.stringify(ret));
        waitLoading.close();
        if (ret.code) {
          //渲染股票详细数据展示
          var isHoliday = ret.isHoliday;
          var detail = ret.detail;
          var stockTime = $this.stockTimeIf();
          console.log(stockTime + '11:30-13:00');
          if (ret.isStoped) {
            $('#status').html('停牌');
          }
          else {
            if (!isHoliday) {//工作日
              if (stockTime) {
                $('#status').html('交易中...');
              }
              else {
                $('#status').html('已收市');
              }
            }
            else {//非工作日
              $('#status').html('已收市');
            }
          }
          $('#changePrice').html((detail.changePrice).toFixed(2)); //差价
          $('#changeRate').html(detail.changeRate + '%'); //涨跌幅
          $('#businessBalance').html(yuanToWan(detail.businessBalance));//成交额
          $('#businessAmount').html((detail.businessAmount / 100).toFixed(0)); //成交量
          var compareData = $('#preclosePrice').html(toTwo(detail.preclosePrice)).text();//昨收
          var currentPrice = $('#currentPrice').html(toTwo(detail.currentPrice)).text();//现价
          var openPrice = $('#openPrice').html(toTwo(detail.openPrice)).text();//今开
          var highPrice = $('#highPrice').html(toTwo(detail.highPrice)).text();//最高
          var lowPrice = $('#lowPrice').html(toTwo(detail.lowPrice)).text();//最低
          changeColor();
          //console.log(JSON.stringify(currentPrice));
          //根据昨收判断现价、今开、最高、最低的颜色
          if (currentPrice >= compareData) {
            $('#currentPrice').addClass('colorRed');
          }
          else {
            $('#currentPrice').addClass('colorBlue')
          }
          if (openPrice >= compareData) {
            $('#openPrice').addClass('colorRed');
          }
          else {
            $('#openPrice').addClass('colorBlue')
          }
          if (highPrice >= compareData) {
            $('#highPrice').addClass('colorRed');
          }
          else {
            $('#highPrice').addClass('colorBlue')
          }
          if (lowPrice >= compareData) {
            $('#lowPrice').addClass('colorRed');
          }
          else {
            $('#lowPrice').addClass('colorBlue')
          }
          //获取第二个扇形图的数据
          var conceptList = ret.conceptList;
          var len = conceptList.length;
          var dataArr = [];
          if (len == 0) {
            $('.secondChart').hide();
          }
          for (var i = 0; i < len; i++) {
            dataArr.push({ name: conceptList[i].conceptStockName, id: conceptList[i].id });
          }
          // [{"name":"基因测序","id":153},{"name":"医药","id":159}]
          // console.log(JSON.stringify(dataArr));
          if (dataArr.length) {
            $this.secondCharts(dataArr);
          }
          //处理曲线图数据    分时
          var minTime = ret.minTime;
          $this.oneDayCharts(minTime);

          //处理五日分时数据
          var fivedayTime = ret.fivedayTime;
          $this.fiveTimeCharts(fivedayTime);

          //判断知否关注
          var fellow = ret.fellow;
          if (fellow) { //true关注   false未关注
            $('#stockAttention').addClass('active');
          }
          else {
            $('#stockAttention').removeClass('active');
          }
          //获取龙虎榜数据
          //时间列表
          var dates = ret.dates;
          if (dates.length == 0) {
            $('.newestBillboard').hide();
          }
          else {
            // console.log(JSON.stringify(dates)+' 获取龙虎榜时间');
            var str = dates[0];
            var newStr = str.split('-');
            var month = newStr[2];
            var otherTime = newStr[1] + '.' + newStr[0];
            $this.searchDate.find('.month').html(month);
            $this.searchDate.find('.time').html(otherTime);
            $('#saveDate').val(dates[0])
            var timeHtml = '';
            for (var i = 0; i < dates.length; i++) {
              timeHtml += '<li>' + dates[i] + '</li>'
            }
            $('#popups ul').html(timeHtml);
            $this.clickDate();
            $this.renderingBillboard();
          }
        }
        else {
          $('#changePrice').html(0);
          $('#changeRate').html(0);
          $('#businessBalance').html(0);
          $('#businessAmount').html(0);
          $('#preclosePrice').html(0);
          $('#currentPrice').html(0);
          $('#openPrice').html(0);
          $('#highPrice').html(0);
          $('#lowPrice').html(0);
          $('#status').html('停牌');
          $('#firstChartsContainer').find('.noData').show();
          $('#secondChartsContainer').find('.noData').show();
          commonAlertWindow({
            message: ret.msg,
            time: 2000
          })
        }
      })
    }
    else {//未登录
      userPhone = ''
      // console.log('name:' + name, 'code:' + code, 'rCode:' + rCode);
      var waitLoading = new WaitLoading();
      waitLoading.open();
      api.ajax({
        url: url() + 'stock/getStockDetails',
        data: {
          values: {
            stockCode: rCode,
            marketCode: market,
            userPhone: userPhone
          }
        }
      }, function (ret) {
        // console.log(JSON.stringify(ret));
        waitLoading.close();
        if (ret.code) {
          //渲染股票详细数据展示
          var detail = ret.detail;
          var isHoliday = ret.isHoliday;
          var stockTime = $this.stockTimeIf();
          console.log(stockTime + '11:30-13:00');
          if (ret.isStoped) {
            $('#status').html('停牌');
          }
          else {
            if (!isHoliday) {//工作日
              if (stockTime) {
                $('#status').html('交易中...');
              }
              else {
                $('#status').html('已收市');
              }
              /*var oDate = new Date();
              var hour = oDate.getHours();
              if (hour >= 15) {
                  $('#status').html('已收市');
              }*/
            }
            else {//非工作日
              $('#status').html('已收市');
            }
          };
          $('#changePrice').html((detail.changePrice).toFixed(2)); //差价
          $('#changeRate').html(detail.changeRate + '%'); //涨跌幅
          $('#businessBalance').html(yuanToWan(detail.businessBalance));//成交额
          $('#businessAmount').html((detail.businessAmount / 100).toFixed(0)); //成交量
          var compareData = $('#preclosePrice').html(toTwo(detail.preclosePrice)).text();//昨收
          var currentPrice = $('#currentPrice').html(toTwo(detail.currentPrice)).text();//现价
          var openPrice = $('#openPrice').html(toTwo(detail.openPrice)).text();//今开
          var highPrice = $('#highPrice').html(toTwo(detail.highPrice)).text();//最高
          var lowPrice = $('#lowPrice').html(toTwo(detail.lowPrice)).text();//最低
          changeColor();
          // console.log(JSON.stringify(currentPrice));
          //根据昨收判断现价、今开、最高、最低的颜色
          if (currentPrice >= compareData) {
            $('#currentPrice').addClass('colorRed');
          }
          else {
            $('#currentPrice').addClass('colorBlue')
          }
          if (openPrice >= compareData) {
            $('#openPrice').addClass('colorRed');
          }
          else {
            $('#openPrice').addClass('colorBlue')
          }
          if (highPrice >= compareData) {
            $('#highPrice').addClass('colorRed');
          }
          else {
            $('#highPrice').addClass('colorBlue')
          }
          if (lowPrice >= compareData) {
            $('#lowPrice').addClass('colorRed');
          }
          else {
            $('#lowPrice').addClass('colorBlue')
          }
          //获取第二个扇形图的数据
          var conceptList = ret.conceptList;
          var len = conceptList.length;
          if (len == 0) {
            // console.log('没有数据')
            $('.secondChart').hide();
          }
          var dataArr = [];
          for (var i = 0; i < len; i++) {
            dataArr.push({ name: conceptList[i].conceptStockName, id: conceptList[i].id });
          }
          // [{"name":"基因测序","id":153},{"name":"医药","id":159}]
          // console.log(JSON.stringify(dataArr));
          if (dataArr.length) {
            $this.secondCharts(dataArr);
          }
          //处理曲线图数据    分时
          var minTime = ret.minTime;
          $this.oneDayCharts(minTime);

          //处理五日分时数据
          var fivedayTime = ret.fivedayTime;
          $this.fiveTimeCharts(fivedayTime);

          //判断知否关注
          var fellow = ret.fellow;
          if (fellow) { //已关注
            $('#stockAttention').addClass('active');
          }
          else {//未关注
            $('#stockAttention').removeClass('active');
          }
          //获取龙虎榜数据
          //时间列表
          var dates = ret.dates;
          if (dates.length == 0) {
            $('.newestBillboard').hide();
          }
          else {
            // console.log(JSON.stringify(dates) + ' 获取龙虎榜时间');
            var str = dates[0];
            var newStr = str.split('-');
            var month = newStr[2];
            var otherTime = newStr[1] + '.' + newStr[0];
            $this.searchDate.find('.month').html(month);
            $this.searchDate.find('.time').html(otherTime);
            $('#saveDate').val(dates[0])
            var timeHtml = '';
            for (var i = 0; i < dates.length; i++) {
              timeHtml += '<li>' + dates[i] + '</li>'
            }
            $('#popups ul').html(timeHtml);
            $this.clickDate();
            $this.renderingBillboard();
          }
        }
        else {
          $('#changePrice').html(0);
          $('#changeRate').html(0);
          $('#businessBalance').html(0);
          $('#businessAmount').html(0);
          $('#preclosePrice').html(0);
          $('#currentPrice').html(0);
          $('#openPrice').html(0);
          $('#highPrice').html(0);
          $('#lowPrice').html(0);
          $('#status').html('停牌');
          $('#firstChartsContainer').find('.noData').show();
          $('#secondChartsContainer').find('.noData').show();
        }
      })
    }
  },
  //龙虎榜数据渲染
  renderingBillboard: function () {
    var $this = this;
    var stockCode = $('#saveCode').val();
    // console.log(stockCode);
    var dateStr = $('#saveDate').val();
    // console.log(dateStr);
    api.ajax({
      url: url() + 'stock/getStockDepartment',
      data: {
        values: {
          stockCode: stockCode,
          dateStr: dateStr
        }
      }
    }, function (ret) {
      console.log(JSON.stringify(ret));
      var billboardInHtml = '';
      var billboardOutHtml = '';
      if (ret.code) {
        var sales = ret.sales;
        var buys = ret.buys;
        if (buys.length != 0) { //卖出
          for (var i = 0; i < buys.length; i++) {
            var infoIn = buys[i];
            billboardInHtml += '<li class="clearfix deShow" data-code="' + infoIn.boCode + '">' +
              '        <span class="yybName">' + infoIn.departmentName + '</span>' +
              '        <span class="colorRed">' + yuanToWan(infoIn.in) + '</span>' +
              '     </li>';
          }
          $('.buyIn ul').html(billboardInHtml);
        }
        else {
          $('.departmentBox .buyIn').find('.noData').show();
        }
        if (sales.length != 0) {
          for (i = 0; i < sales.length; i++) {
            var infoOut = sales[i];
            billboardOutHtml += '<li class="clearfix deShow" data-code="' + infoOut.boCode + '">' +
              '        <span class="yybName">' + infoOut.departmentName + '</span>' +
              '        <span class="colorBlue">' + yuanToWan(infoOut.in) + '</span>' +
              '     </li>';
          }
          $('.saleOut ul').html(billboardOutHtml);
        }
        else {
          $('.departmentBox .saleOut').find('.noData').show();
        }
        if (buys.length == 0 && sales.length == 0) {
          $('.newestBillboard').hide();
        }
      }
      else {
        commonAlertWindow({
          message: ret.msg
        });
      }
    })
  },
  //点击营业部跳转到营业部页面
  departmentDetails: function () {
    $('.departmentBox').on('click', '.deShow', function () {
      var li = $(this);
      var code = li.attr('data-code');
      var name = li.find('.yybName').text();
      if (name == '机构专用') {
        return false
      }
      else {
        openWindow('businessDepartmentDetails', {
          code: code,
          name: name
        })
      }
    })
  },
  //获取跳转页面接到的参数
  getStockTitle: function () {
    var pageParm = api.pageParam;
    // console.log(JSON.stringify(pageParm));
    var stockName = pageParm.stockName;
    var marketCode = pageParm.marketCode;
    var stockCode = pageParm.stockCode;
    var realCode = stockCode.split('.')[0];
    //  console.log(realCode);
    $('#saveCode').val(realCode);
    this.getData(stockName, stockCode, realCode, marketCode);
    this.addAttention(realCode);
    $('#stockCode').html(stockCode);
    $('#stockName').html(stockName);
  },
  //关注
  addAttention: function (infoToken) {
    // console.log(infoToken);
    var userId = this.userPhone;
    $('.stockAttention').on('click', function () {
      var icon = $(this);
      // console.log(userId);
      //已关注
      if (userId) {
        if (icon.hasClass('active')) {
          api.ajax({
            url: url() + 'selfSelectInfo/deleteSelfSelectAtHero',
            data: {    // selfSelectInfo/deleteSelfSelectAtHero
              values: {
                userToken: userId,
                infoToken: infoToken,
                infoType: 1
              }
            }
          }, function (ret, err) {
            // console.log(JSON.stringify(ret))
            icon.removeClass("active");
            commonAlertWindow({
              message: ret.msg
            })
          })
        }
        else {
          api.ajax({
            url: url() + 'selfSelectInfo/addInfoAtHero',
            method: 'post',
            data: {
              values: {
                userToken: userId,
                infoToken: infoToken,
                infoType: 1
              }
            }
          }, function (ret, err) {
            // console.log(JSON.stringify(ret))
            if (ret.success === true) {
              if (ret.attention) {
                icon.addClass("active")
                commonAlertWindow({
                  message: ret.msg
                })
              }
              else {
                //icon.addClass("active")
                commonAlertWindow({
                  message: ret.msg
                })
              }
            } else {
              commonAlertWindow({
                message: '关注失败'
              })
            }
          })
        }
      }
      else {
        commonAlertWindow({
          message: '请登录'
        })
        setTimeout(function () {
          openWindow('login', {}, 'push')
        }, 1000)
      }
    })
  },
  //一日分时
  oneDayCharts: function (minTime) {
    var $this = this;
    var xDate = []; //第一个图表的x轴坐标  时间
    var yData = []; //第一个图表的数据  x轴对应的数据
    var y2Data = []; //第二个图表的数据 x轴对应的数据
    var priceArr = [];
    for (var i = 0; i < minTime.length; i++) {
      // 涨跌幅
      yData.push(minTime[i].changeRate.toFixed(2));
      // 最新价
      priceArr.push(minTime[i].lastPrice);
      //当前时间的成交量
      var nowAmount = minTime[i].businessAmount;
      //下一时间的成交量
      var nextAmount = minTime[i + 1] ? minTime[i + 1].businessAmount : minTime[i].businessAmount;
    }
    // console.log(y2Data);
    option1 = {
      tooltip: {
        trigger: 'axis',
        //  C23531 2F4554  61A0A8
        formatter: function (params) {   //console.log(JSON.stringify(params));
          return params[0].axisValueLabel +
            '<br/>' + params[0].seriesName + ' : ' + params[0].value + "%" +
            '<br/>' + params[1].seriesName + ' : ' + params[1].value;
          /* var relVal = params[0].name;
           for (var i = 0, l = params.length; i < l; i++) {
               relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value+"%";
           }
           return relVal;*/
        }
      },
      calculable: true,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        x: 60,
        y: 20,
        containLabel: true
      },

      xAxis: {
        //show:false,
        type: 'category',
        boundaryGap: false,
        data: $this.handleXAxis(),
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        /*min: new Date(ymd + ' 09:30:00') ,
        max: new Date(ymd + ' 15:00:00'),
        minInterval: 1000 * 60,
        splitNumber: 3,*/
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#333',
          interval: function (index, name) {
            // console.log(index);
            if (name === '09:30' || name === '11:30/13:00' || name === '15:00') {
              // console.log('进来了');
              return true;
            } else {
              return false;
            }
            return true;
          }


        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#eee',
            type: 'dashed'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          show: true,
          position: 'left',
          axisLabel: {
            formatter: '{value}%',
            color: function (value, index) {
              return value < 0 ? 'green' : 'red';
            },
          },
          min: 'dataMin',
          max: 'dataMax',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              type: 'dashed'
            }
          }
        },
        {
          type: 'value',
          //name: '均价',
          show: true,
          position: 'right',
          yAxisIndex: 1,
          axisLabel: {
            formatter: '{value}',
            color: function (value, index) {
              return value < 0 ? 'green' : 'red';
            }
          },
          min: 'dataMin',
          max: 'dataMax',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
          }
        }
      ],
      series: [
        {
          name: '涨跌幅',
          type: 'line',
          // data:newData,
          symbol: 'none',  //这句就是去掉点的
          smooth: true,  //这句就是让曲线变平滑的
          data: yData,
          lineStyle: {
            //color: 'rgba(0,0,0,0)'
          },

          yAxisIndex: 0
        },
        {
          name: '现价',
          type: 'line',
          data: priceArr,
          symbol: 'none',  //这句就是去掉点的
          smooth: true,  //这句就是让曲线变平滑的
          lineStyle: {
            color: 'rgba(0,0,0,0)',
            //width:1
          },
          itemStyle: {
            opacity: 0
          },
          yAxisIndex: 1
        }
      ]
    };
    var firstCharts = echarts.init(document.getElementById('firstChartsContainer'));
    firstCharts.setOption(option1);
  },
  // 5日分时
  fiveTimeCharts: function (ret) {
    // console.log(JSON.stringify(ret));
    var $this = this;
    var x5Date = []; //临时
    var y5Data = []; //临时
    var y25Date = [];//临时
    var dateArr = []; //x轴坐标
    var columnArr = [];
    var dataArr = [];
    for (var name in ret) {
      x5Date.push(name);
      //处理x轴对应的数据
      //dataArr.concat(this.handleData(ret[name]));
      var arr = [].concat(ret[name]);
      y5Data.push(arr);
      // console.log(JSON.stringify(y5Data.concat(arr)));
    }
    // console.log(x5Date);
    y5Data = [].concat.apply([], y5Data);
    for (var i = 0; i < y5Data.length; i++) {
      var changeRate = (y5Data[i].changeRate).toFixed(2);
      columnArr.push(changeRate);
      /*var xTime=y5Data[i].mintime.substring(4,8);
      var tmpData= $this.insert_flg(xTime,'-',2);
      tmpData=tmpData.substring(0,tmpData.length-1);
      dateArr.push(tmpData);*/
      x5Date.push(y5Data[i].lastPrice);
      y25Date.push((y5Data[i].businessAmount));
    }
    //处理x轴坐标数组
    for (var i = 0; i < x5Date.length; i++) {
      if (x5Date[i].length != 8) {
        return false;
      }
      else {
        // console.log(x5Date[i]);
        var xTime = x5Date[i].substring(4, 8);
        var tmpData = $this.insert_flg(xTime, '-', 2);
        tmpData = tmpData.substring(0, tmpData.length - 1); console.log(tmpData + '临时')
        dateArr.push(tmpData);
      }
    }
    // console.log(dateArr);
    option1 = {

      tooltip: {
        trigger: 'axis',
        formatter: function (params) {   //console.log(JSON.stringify(params));
          return params[0].axisValueLabel +
            '<br/>' + params[0].seriesName + ' : ' + params[0].value + "%" +
            '<br/>' + params[1].seriesName + ' : ' + params[1].value
        }
      },
      calculable: true,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        x: 60,
        y: 20,
        containLabel: true
      },

      xAxis: {
        //show:false,
        type: 'category',
        boundaryGap: false,
        data: dateArr,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#333',
        },
        splitLine: {
          show: false,
        }
      },
      yAxis: [
        {
          type: 'value',
          show: true,
          position: 'left',
          axisLabel: {
            formatter: '{value}%',
            color: function (value, index) {
              return value < 0 ? 'green' : 'red';
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
          }
        },
        {
          type: 'value',
          //name: '均价',
          show: true,
          position: 'right',
          yAxisIndex: 1,
          axisLabel: {
            formatter: '{value}',
            color: function (value, index) {
              return value < 0 ? 'green' : 'red';
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,

          }
        }
      ],
      series: [
        {
          name: '涨跌幅',
          type: 'line',
          // data:newData,
          symbol: 'none',  //这句就是去掉点的
          smooth: true,  //这句就是让曲线变平滑的
          data: columnArr,
          lineStyle: {
            //color: 'rgba(0,0,0,0)'
          },

          yAxisIndex: 0
        },
        {
          name: '现价',
          type: 'line',
          // data:newData,
          symbol: 'none',  //这句就是去掉点的
          smooth: true,  //这句就是让曲线变平滑的
          data: x5Date,
          lineStyle: {
            color: 'rgba(0,0,0,0)',
            //width:1
          },
          yAxisIndex: 1
        }
      ]
    };
    var width = $('#firstChartsContainer').width();
    var height = $('#firstChartsContainer').height();
    $('#fiveTimeCharts').css({ 'width': width, 'height': height });
    var fiveTimeCharts = echarts.init(document.getElementById('fiveTimeCharts'));
    fiveTimeCharts.setOption(option1);
  },
  //日K图表
  dayKCharts: function (code) {
    console.log(code)
    var $this = this;
    api.ajax({
      url: url() + 'stock/getKlineByCode',
      data: {
        values: {
          stockCode: code,
          month: 3
        }
      }
    }, function (ret) {
      // console.log(JSON.stringify(ret))
      if (ret.code) {
        var arr = ret.result.prod_code;
        dataRestart(arr);
        // 数据重组
        function dataRestart(data) {
          // console.log(data);
          var dates = [];

          var datas = [];
          data.length !== 0 ? data.map(function (dItem, index) {
            var unit = [];

            var dateStr = dItem[0] + '';
            var date = dateStr.slice(0, 4) + '/' + dateStr.slice(4, 6) + '/' + dateStr.slice(6, 8);
            dates.push(date);
            var data = [dItem[1], dItem[4], dItem[3], dItem[2]];
            datas.push(data);
          }) : data;
          // console.log(kData);
          // return kData;  // 二维数组
          $this.dates = dates;
          $this.data = datas;

        };
        function calculateMA(dayCount, data) {
          var result = [];
          for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
              result.push('-');
              continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              sum += data[i - j][1];
            }
            result.push((sum / dayCount).toFixed(2));
          }
          // console.log(result);
          return result;
        }
        var option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var dayK = params[0];
              var date = dayK.axisValue;
              var MA5 = params[1];
              var MA10 = params[2];
              var MA20 = params[3];
              var MA30 = params[4];
              return 
                date+' <br />'+
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#C33733;"></span>'+
                '5日均价:  '+MA5.value+
                '<br />'+
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#676767;"></span>'+
                '10日均价:  '+MA10.value+
                '<br />'+
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#76ADB4;"></span>'+
                '20日均价:  '+MA20.value+
                '<br />'+
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#DD9C85;"></span>'+
                '30日均价:  '+MA30.value+
                '<br />';
            },
            axisPointer: {
              animation: false,
              type: 'cross',
              lineStyle: {
                color: '#376df4',
                width: 2,
                opacity: 1
              }
            }
          },
          xAxis: {
            type: 'category',
            data: $this.dates,
            axisLine: { lineStyle: { color: '#777' } }
          },
          yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: false }
          },
          grid: {
            top: 20,
            bottom: 80
          },
          dataZoom: [{
            textStyle: {
              color: '#000'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M14,26.4h-3v-10h3v10z M9,26.4h-3v-10h3v10z',
            handleSize: '70%',
            start: 70,
            end: 100,
            dataBackground: {
              areaStyle: {
                color: '#333'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#ccc'
              }
            },
            handleStyle: {
              color: '#eee',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {
            type: 'inside'
          }],
          animation: false,
          series: [
            {
              type: 'candlestick',
              name: '日K',
              data: $this.data,
              itemStyle: {
                normal: {
                  color: '#f00',
                  color0: '#1cbf7b',
                  borderColor: '#f00',
                  borderColor0: '#1cbf7b'
                }
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: calculateMA(5, $this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10, $this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20, $this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: calculateMA(30, $this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              }
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表
        var width2 = $('#firstChartsContainer').width();
        var height2 = $('#firstChartsContainer').height();
        $('#dayKCharts').css({ 'width': width2, 'height': height2 + 80 });
        var dom = document.getElementById("dayKCharts");
        var myChart = echarts.init(dom);
        myChart.setOption(option);
      }
      else {

      }
    })
  },
  //第二个图表
  secondCharts: function (dataArr) {
    if (dataArr.length == 1) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            // name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id }/*,
                            {value:10, name:2},
                            {value:10, name:3},
                            {value:10, name:4}
                        {value:20, name:'苹果产业链4'},
                        {value:35, name:'苹果产业链5'},
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 2) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //  name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id }/*
                        {value:10, name:3},
                        {value:10, name:4},
                        {value:20, name:'苹果产业链4'},
                        {value:35, name:'苹果产业链5'},
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 3) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //  name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },/*
                        {value:10, name:4},
                        {value:20, name:'苹果产业链4'},
                        {value:35, name:'苹果产业链5'},
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 4) {
      option = {
        /* tooltip : {
             trigger: 'item'
             //formatter: "{a} <br/>{b} : {c} ({d}%)"
         },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            // name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },/*
                        {value:20, name:'苹果产业链4'},
                        {value:35, name:'苹果产业链5'},
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 5) {
      option = {
        /* tooltip : {
             trigger: 'item'
             //formatter: "{a} <br/>{b} : {c} ({d}%)"
         },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            // name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },
              { value: 0, name: dataArr[4].name, id: dataArr[4].id },/*
                        {value:35, name:'苹果产业链5'},
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 6) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },
              { value: 0, name: dataArr[4].name, id: dataArr[4].id },
              { value: '', name: dataArr[5].name, id: dataArr[5].id },/*
                        {value:30, name:'苹果产业链6'},
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 7) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },
              { value: 0, name: dataArr[4].name, id: dataArr[4].id },
              { value: 0, name: dataArr[5].name, id: dataArr[5].id },
              { value: 0, name: dataArr[6].name, id: dataArr[6].id },/*
                        {value:40, name:'苹果产业链7'}*/
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 8) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },
              { value: 0, name: dataArr[4].name, id: dataArr[4].id },
              { value: 0, name: dataArr[5].name, id: dataArr[5].id },
              { value: 0, name: dataArr[6].name, id: dataArr[6].id },
              { value: 0, name: dataArr[7].name, id: dataArr[7].id },
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
    else if (dataArr.length == 9) {
      option = {
        /*tooltip : {
            trigger: 'item'
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },*/
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552'],
        calculable: false,
        series: [
          {
            //name:'面积模式',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 0, name: dataArr[0].name, id: dataArr[0].id },
              { value: 0, name: dataArr[1].name, id: dataArr[1].id },
              { value: 0, name: dataArr[2].name, id: dataArr[2].id },
              { value: 0, name: dataArr[3].name, id: dataArr[3].id },
              { value: 0, name: dataArr[4].name, id: dataArr[4].id },
              { value: 0, name: dataArr[5].name, id: dataArr[5].id },
              { value: 0, name: dataArr[6].name, id: dataArr[6].id },
              { value: 0, name: dataArr[7].name, id: dataArr[7].id },
              { value: 0, name: dataArr[8].name, id: dataArr[8].id },
            ]
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
      secondCharts.setOption(option);
      secondCharts.on('click', function (param) {
        var index = param.dataIndex;
        var name = param.name;
        var id = param.data.id;
        // console.log(id);
        openWindow('themeDetails', {
          id: id,
          themeName: name
        })
      })
    }
  },
  //在字符串中指定位置插入字符
  insert_flg: function (str, flg, sn) {
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
      var tmp = str.substring(i, i + sn);
      newstr += tmp + flg;
    }
    return newstr;
  },
  //日期选择
  clickDate: function () {
    var $this = this;
    var showDate = $('.show-date');
    var li = $('.popupsList').find('li');
    // console.log(li.length)
    showDate.on('click', function () {
      $('.bind-mark').show();
      $('.popupsList').show();
      //$('#popups ul li').first().addClass('active');
      // console.log($('#popups ul li').first() + '第一个li')
      $('.bind-mark').click(function () {
        $('.popupsList').hide();
        $(this).hide();
      })
    })
    li.on('click', function () {
      li.removeClass('active');
      $(this).addClass('active');
      var str = $(this).html();
      var newStr = str.split('-');
      var month = newStr[2];
      var otherTime = newStr[1] + '.' + newStr[0];
      $this.searchDate.find('.month').html(month);
      $this.searchDate.find('.time').html(otherTime);
      $('#saveDate').val(str);
      setTimeout(function () {
        $('.popupsList').hide();
        $('.bind-mark').hide();
      }, 500);
      $this.renderingBillboard();
    });
  },
  //分时选择
  switchCharts: function () {
    var btn = $('.btnColumn .col');
    btn.click(function () {
      var $$this = $(this);
      $('.btnColumn .col').removeClass('active');
      $$this.addClass('active');
      $('.bigChartsBox div.allChart').removeClass('active');
      $('.bigChartsBox div.allChart').eq($$this.index()).addClass('active');
    })
  },
  // 固定x轴上面的数据
  handleXAxis: function () {
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var start = new Date(y, m, d, '9', '30').getTime();
    // console.log(start);
    var middle_Eleven = new Date(y, m, d, '11', '30').getTime();
    var middle_Thirteen = new Date(y, m, d, '13', '00').getTime();
    var end = new Date(y, m, d, '15', '00').getTime();
    var arr = [];

    var timeLib = start;


    while (timeLib) {
      if (timeLib >= start && timeLib < middle_Eleven) {
        // sum += 1;
        arr.push(new Date(timeLib).format('hh:mm'));
      }
      if (timeLib === middle_Eleven) {
        arr.push('11:30/13:00');
      }

      if (timeLib > middle_Thirteen && timeLib <= end) {

        // sum2 += 1;
        arr.push(new Date(timeLib).format('hh:mm'));
      }

      if (timeLib > end) {
        break;
      }

      timeLib += 60000;
    }
    // console.log(this.timeArr);
    // console.log(JSON.stringify(arr));
    return arr;
  },
  //  判断交易中、收市
  stockTimeIf: function () {
    var nowDate = new Date().getTime();
    // 现在的周几
    var nowDateWeekday = new Date().getDay();
    // 获取当天
    var now = new Date();


    // 当天 上午9:30 时间戳
    var am_Nine = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '9', '30')).getTime();
    // console.log("now:"+now.slice(0,4)+"---"+now.slice(5,7)+"---"+now.slice(8, now.length))
    // 当天 上午11:30 时间戳
    var am_Eleven = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '11', '30')).getTime();
    // 当天 下午1:00 时间戳
    var pm_One = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '13')).getTime();
    // 当天 下午3:00 时间戳
    var pm_Three = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), '15')).getTime();
    // 如果在工作日
    console.log(nowDateWeekday)
    console.log(nowDate > am_Nine);
    console.log(nowDate < am_Eleven);
    if (nowDateWeekday >= 1 && nowDateWeekday <= 5) {
      console.log(nowDate + "***" + am_Nine + "*" + nowDate + "*" + am_Eleven)
      if ((nowDate >= am_Nine && nowDate <= am_Eleven) || (nowDate >= pm_One && nowDate <= pm_Three)) {
        console.log(22222)
        return true;
      }
      else {
        console.log(333333)
        return false;
      }
      /*console.log(nowDate+"***"+ pm_One +"*"+ pm_Three)
      if(nowDate >= pm_One && nowDate <= pm_Three)  {
          return true;
      }*/
    } else {
      return false;
    }
  }
}
