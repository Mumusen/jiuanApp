var themeDetails = {
  userPhone: $api.getStorage("userId"),
  init: function () {
    this.getParm();
    this.themeDetails();
    this.stockDetails();
    this.newsDetails();
    //this.secondCharts();
  },
  //接收页面参数
  getParm: function () {
    var userPhone = this.userPhone;
    var $this = this;
    var parm = api.pageParam;
    var id = parm.id;
    $('#infoId').val(id);
    console.log('ID' + id,userPhone);
    var themeName = parm.themeName;
    $('#themeName').html(themeName);
    var waitLoading = new WaitLoading();
    waitLoading.open();
    //渲染概念详情
    api.ajax({
      url: url() + 'selfSelectInfo/getThemeDetails',
      data: {
        values: {
          infoId: id,
          infoType: 0,
          userToken: userPhone
        }
      }
    }, function (ret) {
      $api.strToJson(ret);
      // console.log(JSON.stringify(ret))
      if (ret.success) {
        //waitLoading.close();
        var details = ret.details;
        var isAttention = details.isAttention;
        //是否关注
        if (isAttention) { //关注
          $('.attentionIcon i').addClass('on');
        }
        else {//未关注
          $('.attentionIcon i').removeClass('on');
        }
        //相关事件
        var infomationList = details.infomationList;
        // console.log(infomationList);
        var infomationHtml = '';
        if (infomationList.length != 0) {
          var info = {};
          for (var i = 0; i < infomationList.length; i++) {
            info = infomationList[i];
            infomationHtml += '<li class="newsShow" data-Id="' + info.id + '">' +
              '               <img src="../image/event1.png" alt="">' +
              '               <div class="shadow"></div>' +
              '               <p class="int">' + info.infomationName + '</p>' +
              '            </li>'
          }
          $('.relatedEvents ul').html(infomationHtml);
        }
        else {
          $('.relatedEvents').hide();
        }
        //概念描述
        var chg = details.conceptChg;
        $('#infoDetails').html(details.infoDetails);
        $('#chg').html('涨跌幅 ' + chg + '%');
        chg > 0 ? $('#chg').addClass('up') : $('#chg').addClass('down');
        var riseCount = details.riseCount;
        var fallCount = details.fallCount;
        var territoryCount = details.territoryCount;
        var breakCount = details.breakCount;
        $this.secondCharts(riseCount, fallCount, territoryCount, breakCount);
        $this.thirdChartsContainer(id);
        //相关个股
        var voList = details.voList;
        var relateStockHtml = ''
        for (var i = 0; i < voList.length; i++) {
          var info = voList[i];
          var conceptList = info.conceptList;
          relateStockHtml += ' <li data-ID="' + info.infoId + '">' +
            '                        <div class="stockIntroduce stockShow">' +
            '                            <div class="stockName clearfix">' +
            '                                <div class="lPart fl">' +
            '                                    <span class="name">' + info.infoName + '</span><br>' +
            '                                    <span class="code">' + info.infoCode + '</span>' +
            '                                </div>' +
            '                                <div class="rPart fr">';
          if (info.currentPrice == null) {
            relateStockHtml +=
              '   <span>现价：' + toTwo(info.currentPrice) + '</span>' +
              '   <span class="percentage">0.00%</span>' +
              '   <span id="rankDate">' + changeTime(info.rankDate) + '</span>' +
              '</div>' +
              '                            </div>' +
              '                            <div class="stockCont">' +
              '                                <div class="showCont">' + info.infoDescribe + '</div>' +
              '                                <div class="hiddenCont"></div>' +
              '                            </div>' +
              '                        </div>' +
              '                        <div class="relatedTopics">' +
              '                            <div class="topicsList">' + $this.forTheme(conceptList) + '</div>' +
              '                        </div>' +
              '                    </li>'
          }
          else {
            relateStockHtml +=
              '     <span>现价：' + toTwo(info.currentPrice) + '</span>' +
              '                                     <span class="percentage">' + toTwo(info.chg) + '%</span>' +
              '                                     <span id="rankDate">' + changeTime(info.rankDate) + '</span>' +
              '                                </div>' +
              '                                </div>' +
              '                                <div class="stockCont">' +
              '                                <div class="showCont">' + info.infoDescribe + '</div>' +
              '                                <div class="hiddenCont"></div>' +
              '                                </div>' +
              '                                </div>' +
              '                                <div class="relatedTopics">' +
              '                                <div class="topicsList">' + $this.forTheme(conceptList) + '</div>' +
              '                                </div>' +
              '                                </li>'
          }
        }
        $('.relatedStocksList ul').html(relateStockHtml);
        changeColor();
        $this.firstCharts(id);
      }
      waitLoading.close();
      $this.addAttention(id, themeName);
      $this.goBillboard(themeName);
    })
    // }
  },
  //关注
  addAttention: function (id, infoToken) {
    var userId = $api.getStorage("userId");
    $('.attentionIcon').on('click', 'i', function () {
      if (userId) {
        console.log("已登录")
        var icon = $(this);
        //已关注
        if (icon.hasClass('on')) {
          console.log(id, userId)
          api.ajax({
            url: url() + 'selfSelectInfo/deleteSelfSelect',
            data: {
              values: {
                id: id,
                type: 0,
                phone: userId
              }
            }
          }, function (ret, err) {
            console.log(JSON.stringify(ret))
            icon.removeClass("on")
            commonAlertWindow({
              message: ret.msg
            })
          })
        } else {
          console.log("添加" + id, userId, infoToken)
          api.ajax({
            url: url() + 'selfSelectInfo/addInfo', //添加 关注
            data: {
              values: {
                userToken: userId,
                // infoToken: infoToken,
                infoType: 0,
                infoId: id
              }
            }
          }, function (ret, err) {
            console.log(JSON.stringify(ret));
            if (ret.success === true) {
              if (ret.attention) { //已关注
                icon.addClass("on")
                commonAlertWindow({
                  message: ret.msg
                })
              }
              else {
                commonAlertWindow({
                  message: ret.msg
                })
              }
            } else {
              commonAlertWindow({
                message: err
              })
            }
          });
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
  //跳转到该概念下的个股龙虎榜
  goBillboard: function (name) {
    $('.goBillboard').click(function () {
      // console.log($('#infoId').val())
      openWindow('themeBillboard',
        {
          infoId: $('#infoId').val(),
          themeName: name
        })
    })
  },
  // 个股中的相关概念
  forTheme: function (themeList) {
    var themeHtml = '';
    if (themeList.length != 0) {
      for (var i = 0; i < themeList.length; i++) {
        themeHtml += '<span class="themeShow" data-ID="' + themeList[i].id + '" data-chg="' + themeList[i].chg + '" data-ms="' + themeList[i].conceptExplain + '">' + themeList[i].conceptStockName + '</span>'
      }
      return '<h4>相关概念</h4>' + themeHtml;
    }
    else {
      return themeHtml = '无相关概念';
    }
  },
  //点击进入相关概念详情
  themeDetails: function () {
    var $this = this;
    $('.relatedStocksList').on('click', '.themeShow', function () {
      // console.log(11111111)
      var li = $(this);
      var id = li.attr('data-ID');
      var themeName = li.html();
      $('.relatedStocks').removeClass('active');
      $('.topicDescription').addClass('active');
      $('.titleCol span').eq(1).removeClass('active');
      $('.titleCol span').eq(0).addClass('active');
      api.pageParam = {
        id: id,
        themeName: themeName
      };
      $this.getParm();
      // location.reload();
    })
  },
  //点击进入相关个股详情
  stockDetails: function () {
    var $this = this;
    $('.relatedStocksList').on('click', '.stockShow', function () {
      var li = $(this)
      var id = li.parent('li').attr('data-ID');
      var stockName = li.find('.name').text();
      var stockCode = li.find('.code').text();
      openWindow('stockDetails', {
        id: id,
        stockName: stockName,
        stockCode: stockCode
      })
    })
  },
  //第一个图表
  firstCharts: function (infoId) {
    var $this = this;
    var waitLoading = new WaitLoading();
    waitLoading.open();
    // console.log(infoId);
    api.ajax({
      url: url() + 'conceptStockManage/getConceptChangeRate',
      data: {
        values: {
          conceptStockId: infoId
        }
      }
    }, function (ret) {
      // console.log(JSON.stringify(ret));
      var list = ret.list;
      var xDate = [];
      var yDate = [];
      if (list != null || list.length != 0) {
        for (var i = 0; i < list.length; i++) {
          var info = list[i];
          for (var name in info) {
            var chg = info[name].toFixed(2)
          }
          yDate.push(chg);
        }
        //   tooltip: {
        //     trigger: 'axis',
        //     formatter: function (params) {
        //       return params[0].axisValueLabel +
        //         '<br/>' + params[0].seriesName + ' : ' + params[0].value + "%";
        //     }
        //   },
          var option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            },
            formatter: function (params) {
              return params[0].name + '<br />涨幅:' + params[0].value + '%'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            x: 0,
            y: 20,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: $this.handleXAxis(),
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ccc'
                // type: 'dashed'
              }
            },
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
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            position: 'bottom'
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function (value) {
                return value.toFixed(2) + '%';
              },
              color: function (value, index) {
                return value < 0 ? 'green' : 'red';
              }
            },
            axisLine: {
              // lineStyle: {
              //     color: '#ccc'
              // }
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee',
                type: 'dashed'
              }
            },
            // splitNumber: 3,
            axisTick: {
              show: false
            }
          },
          // visualMap: {
          //     show: false,
          //     dimension: 0,
          //     pieces: yDate
          // },
          // series: [
          //   {
          //     name: '涨跌幅',
          //     type: 'line',
          //     // data:newData,
          //     symbol: 'none',  //这句就是去掉点的
          //     smooth: true,  //这句就是让曲线变平滑的
          //     data: yDate,
          //     lineStyle: {
          //       //color: 'rgba(0,0,0,0)'
          //     },
          //     yAxisIndex: 0
          //   },
          // ],
          series: [
            {
              name: '涨幅',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: 'rgb(255, 70, 131)'
                }
              },
              data: yDate
            }
          ]
        };
        var firstCharts = echarts.init(document.getElementById('firstChartsContainer'));
        firstCharts.setOption(option);
        waitLoading.close();
      }
      else {
        $('#firstChartsContainer').hide();
        $('.firstChart .noData').show();
      }
    })
  },
  //第二个图表  上涨家数
  secondCharts: function (rise, fall, territory, breakon) {
    var riseClass = fallClass = territoryClass = breakonClass = "";
    if (rise != 0) {
      riseClass = { value: rise, name: '上涨家数' };
    }
    if (fall != 0) {
      fallClass = { value: fall, name: '下跌家数' };
    }
    if (territory != 0) {
      territoryClass = { value: territory, name: '平盘家数' };
    }
    if (breakon != 0) {
      breakonClass = { value: breakon, name: '停牌家数' };
    }
    option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      grid: {
        x: 10,
        y: 10,
        containLabel: true
      },
      /* legend: {
           orient: 'vertical',
           left: 'center',
           top:'bottom',
           data: ['上涨家数','下跌家数','平盘家数','停牌家数']
       },*/
      color: ["#c12e34", "#2b821d", "#0098d9", "#e6b600"],
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{abg|} {b|{b}：}{c}',
              rich: {
                per: {
                  // color: '#666',
                  // backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: [
            riseClass,
            fallClass,
            territoryClass,
            breakonClass
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    var secondCharts = echarts.init(document.getElementById('secondChartsContainer'));
    secondCharts.setOption(option);
  },
  // 第三个图标 资金流向近十日
  thirdChartsContainer: function (conceptId) {
    var waitLoading = new WaitLoading();
    waitLoading.open();
    var flowArr = [],
      dateArr = [];
    api.ajax({
      url: url() + 'fundFlowNearlyTenDays',
      method: 'post',
      data: {
        values: {
          conceptId: conceptId
        }
      }
    }, function (ret) {
      var stock = ret.stockFlowList;
      console.log(JSON.stringify(stock))
      for (var key in stock) {
        dateArr.push(key);
        // dateArr.push(key.substr(5,10));
      }
      var newdateArr = dateArr.sort();
      for (var i = 0; i < newdateArr.length; i++) {
        flowArr.push(yuanToYi(stock[newdateArr[i]]));
      }
      option = {
        color: ['#d8361b', '#1cbf7b'],
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            // console.log(JSON.stringify(params));
            if (params[0].data >= 0) {
              return params[0].axisValue + '<br />净流入： ' + params[0].data;
            } else {
              return params[0].axisValue + '<br />净流出： ' + Math.abs(params[0].data);
            }
          }
        },
        grid: {
          x: 20,
          y: 20,
          x2: 30,
          y2: 30,
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // data : [10.1, 10.2, 10.3, 10.4,10.5,10.6,10.7,10.8,10.9,10.10],
            data: dateArr,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f8f8f8'
              }
            },
            axisLine: {
              lineStyle: {
                width: 2,
                color: '#d8361b'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f8f8f8'
              }
            },
            axisLine: {
              lineStyle: {
                width: 2,
                color: '#d8361b'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
              }
            },
          }
        ],
        series: [
          {
            name: '流入',
            type: 'bar',
            // data:[2.0, 4.9, 7.0, -3.2, 5.6, -7.7, 3.6,2.6, -5.9, 5.6],
            data: flowArr,
            barWidth: 20,
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: function (params) {
                  // console.log(params);
                  if (params.value >= 0) {
                    return '#d8361b';
                  } else {
                    return '#1cbf7b';
                  }
                }
              }
            }
          }
        ]
      };
      var secondCharts = echarts.init(document.getElementById('thirdChartsContainer'));
      secondCharts.setOption(option);
      waitLoading.close();
    })
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
  //跳转到相关事件详情
  newsDetails: function () {
    $('.relatedEvents').on('click', '.newsShow', function () {
      // console.log(111111111111111111111111)
      openWindow('txt', {
        infoId: $(this).attr('data-ID'),
      }, 'push');
    })
  },
  handleXAxis: function () {
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var start = new Date(y, m, d, '9', '30').getTime();
    // console.log(start);
    var middle_Eleven = new Date(y, m, d, '11','30').getTime();
    var middle_Thirteen = new Date(y, m, d, '13','00').getTime();
    var end = new Date(y, m, d, '15','00').getTime();
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
  }
}

