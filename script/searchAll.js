var searchAll = {
    timer: null,
    userPhone:$api.getStorage("userId"),
    init: function () {
        //this.renderData();
        this.getFocus();
        this.toFixedTop();
        this.clickSearch();
        this.chooseColunm();
        this.addAttention();
        this.goDetails();
    },
    getFocus: function () {
        $('#searchColumn').focus();
    },
    //点击输入内容查询
    clickSearch: function (n) {
        var $this = this;
        //获取输入内容
        $('#searchColumn').on('input', function () {
            /*clearTimeout($this.timer);
            $this.timer = setTimeout(() => {
                $('#searchCode').val($(this).val());
            },300);*/
            $('#searchCode').val($(this).val());
            console.log($(this).val());
            $this.renderData(n);
            $this.chooseColunm();
        });
        $('.searchBox').on('click', 'i', function () {
            $('#searchColumn').val('');
            $('.showAll .rise').html('');
            $('.titleCol span').removeClass('active');
        })
    },
    //渲染数据
    renderData: function (info) {
        console.log(info + ' 渲染数据时数值');
        var $this = this;
        var html = '';
        var n = $('#pageNum').val() * 1;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        var searchCode = $('#searchCode').val();
        var userToken=this.userPhone;
        console.log(searchCode);console.log(userToken);
        api.ajax({
            url: url() + 'selfSelectInfo/searchInfoN',
            method: 'post',
            data: {
                values: {
                    infoType: info,
                    pageNo: n,
                    keyWords: searchCode,
                    userToken:userToken
                }
            }
        }, function (ret) {
            console.log(JSON.stringify(ret));
            if (ret.success) {
                var list = ret.result.list;
                var pageCount = ret.result.count;
                $('#pageCount').val(pageCount);
                console.log(JSON.stringify(list));
                waitLoading.close();
                if (list == null) {
                    $('.showAll .rise').html('');
                    $('.noDataAll').show();
                }
                else {
                    if (list.length != 0) {
                        $('.noDataAll').hide();
                        var info = {};
                        for (var i = 0; i < list.length; i++) {
                            info = list[i];
                            if (info.infoType == 0) {
                                html += $this.themeHtml(info);
                            }
                            else {
                                html += $this.stockHtml(info);
                            }
                        }
                        $('.showAll .inputSearchList').find('.rise').html(html);
                        if ($('#searchColumn').val().length == 0) {
                            $('.showAll .active .rise').html(''); console.log('length为0')
                            $('.noDataAll').show();
                        }
                    }
                    else {
                        $('.showAll .rise').html('');
                        $('.noDataAll').show();
                    }
                }
            }
            else {
                waitLoading.close();
            }
        })
        //this.swipeTopLoad(info);
    },
    //标题栏固定在顶部
    toFixedTop: function () {
        var toper = $('.titleColSeach').offset().top;//到页面的距离
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();//滚动距离
            if (toper <= scrollTop) {
                $('.titleColSeach').addClass('stable');
                $('#shadow').show();
            }
            else {
                $('.titleColSeach').removeClass('stable');
                $('#shadow').hide();
            }
        });
    },
    //点击切换栏目
    chooseColunm: function () {
        var html = '';
        var bindthis = this;
        var waitLoading = new WaitLoading();
        // waitLoading.open();
        var $li = $('.titleCol span');
        $li.click(function () {
            var $this = $(this);
            var $t = $this.index();
            $li.removeClass();
            $this.addClass('active');
            // waitLoading.close();
            if ($t === 0) {
                $t = 2;
            } else if ($t === 1) {
                $t = 0;
            } else {
                $t = 1;
            }
            inFo = $t;
            console.log(inFo +'点击标题的栏目');
            bindthis.renderData(inFo);
            //bindthis.swipeTopLoad(inFo);
            bindthis.clickSearch(inFo);
        })
    },
    //概念内容
    themeHtml: function (msg) {
        var html = '';
        html += '<li class="clearfix haveTop" data-type="' + msg.infoType + '">' +
            '          <div class="cont goShow fl">' +
            '               <span data-Id="' + msg.infoId + '"><b class="name">' + msg.infoName + '</b></span>' +
            '          </div>' +
            '          <div class="follow fr">';
            if(msg.isAttention == true){
                html+='<i class="on"></i>'
            }
            else{
                html+='<i></i>'
            }
            html+=
            '          </div>' +
            '      </li>'
        return html;
    },
    //个股内容
    stockHtml: function (msg) {
        var html = '';
        html += '<li class="clearfix haveTop" data-market="'+msg.dataType+'" data-type="' + msg.infoType + '">' +
            '          <div class="cont stock goShow fl">' +
            '               <i></i><span data-Id="' + msg.infoId + '"><b class="name">' + msg.infoName + '</b>&nbsp;<b class="code">' + msg.infoCode + '</b></span>' +
            '          </div>' +
            '          <div class="follow fr">';
        if(msg.isAttention == true){
            html+='<i class="on"></i>'
        }
        else{
            html+='<i></i>'
        }
        html+=
            '          </div>' +
            '      </li>'
        return html;
    },
    //关注
    addAttention: function () {
        var userId = $api.getStorage("userId");
        $('.rise').on('click', '.follow i', function () {
            if (userId) {
                var icon = $(this);
                var getID = icon.parents('li').find('span').attr('data-Id'); console.log(getID);
                var infoType = icon.parents('li').attr('data-type'); console.log(infoType);
                if (infoType == 0) {
                    var infoToken = icon.parents('li').find('span').text();
                }
                else {
                    var infoToken = icon.parents('li').find('b.code').text();
                }
                console.log(infoToken);
                //已关注
                if (icon.hasClass('on')) {
                    console.log(111111111);
                    api.ajax({
                        url: url() + 'selfSelectInfo/deleteSelfSelect',
                        data: {
                            values: {
                                id: getID,
                                type: infoType,
                                phone: userId
                            }
                        }
                    }, function (ret, err) {
                        console.log(JSON.stringify(ret))
                        icon.removeClass("on")
                        commonAlertWindow({
                            message: ret.msg,
                        })
                    })
                }
                //未关注
                else {
                    console.log(222222222222222);
                    api.ajax({
                        url: url() + 'selfSelectInfo/addInfo', //添加 关注
                        method: 'post',
                        data: {
                            values: {
                                userToken: userId,
                                infoToken: infoToken,
                                infoType: infoType,
                                infoId: getID
                            }
                        }
                    }, function (ret, err) {
                        console.log(JSON.stringify(ret));
                        if (ret.success === true) {
                            if (ret.attention) {
                                icon.addClass("on");
                                commonAlertWindow({
                                    message: ret.msg
                                })
                            }
                            else {
                                commonAlertWindow({
                                    message: ret.msg
                                })
                                icon.addClass("on");
                            }
                        } else {
                            commonAlertWindow({
                                message: ret.msg
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
    goDetails: function (info) {
        $('.rise').on('click', '.goShow', function () {
            var li = $(this);
            var id = li.find('span').attr('data-Id');
            var marketCode=li.parent().attr('data-market');
            var name = li.find('b.name').text();
            var code = li.find('b.code').text();
            var infoType = li.parent().attr('data-type'); console.log(infoType)
            if (infoType == 0) {
                openWindow('themeDetails', {
                    themeName: name,
                    id: id
                })
            }
            else {
                openWindow('stockDetails', {
                    id: id,
                    stockName: name,
                    stockCode: code,
                    marketCode:marketCode
                })
            }
        })
    },
    //上划查看更多
    swipeTopLoad: function (num) {
        var $this = this;
        var html = '';
        var searchCode = $('#searchCode').val();
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: 30            //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        }, function (ret, err) {
            var totalCount = $('#pageCount').val() * 1;
            var pageNum = $('#pageNum').val() * 1;
            pageNum++;
            $('#pageNum').val(pageNum);
            var n = Math.ceil((totalCount - 10) / 10) + 1;
            console.log(num);
            console.log(pageNum + '页码');
            console.log(n + '多少页');
            if (pageNum <= n) {
                api.ajax({
                    url: url() + 'selfSelectInfo/searchInfoN',
                    method: 'post',
                    data: {
                        values: {
                            infoType: num,
                            pageNo: pageNum,
                            keyWords: searchCode
                        }
                    }
                }, function (ret) {
                    console.log(JSON.stringify(ret));
                    if (ret.success) {
                        var list = ret.result.list;
                        var pageCount = ret.result.count;
                        $('#pageCount').val(pageCount);
                        console.log(JSON.stringify(list));
                        waitLoading.close();
                        if (list == null) {
                            $('.showAll .rise').html('');
                            $('.noDataAll').show();
                        }
                        else {
                            if (list.length != 0) {
                                $('.noDataAll').hide();
                                var info = {};
                                for (var i = 0; i < list.length; i++) {
                                    info = list[i];
                                    if (info.infoType == 0) {
                                        html += $this.themeHtml(info);
                                    }
                                    else {
                                        html += $this.stockHtml(info);
                                    }
                                }
                                $('.showAll .inputSearchList').find('.rise').append(html);
                                /*if($('#searchColumn').val() == 0){
                                    $('.showAll .active .rise').html('');console.log('length为0')
                                }*/
                            }
                            else {
                                $('.showAll .rise').html('');
                                $('.noDataAll').show();
                            }
                        }
                    }
                    else {
                        waitLoading.close();
                    }
                })
            } else {
                $('.noDataAll').css('display', 'block');
            }
        });
    },
}