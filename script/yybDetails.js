var yybDetails={
    userPhone:$api.getStorage("userId"),
    init:function(){
        this.renderData(1);
        this.chooseColunm();
        this.stockDetails();
        this.toFixedTop();
    },
    renderData:function(info){ console.log(info);
        var parm=api.pageParam;console.log(JSON.stringify(parm));
        var name=parm.name;
        $('#yybName').html(name);
        var code=api.pageParam.code;
        if(code != ''){
            this.addAttention(code);
            this.getDeptStockSale(code,info);
            this.scrollToBottom(code,info);
            var userPhone=this.userPhone;
            if(userPhone){
                api.ajax({
                    url:url()+'stock/getDepartmentDetail',
                    data:{
                        values:{
                            bo_code:code,
                            userPhone:userPhone,
                            type:info
                        }
                    }
                },function(ret,err){
                    console.log(JSON.stringify(ret));
                    if(ret.code && ret.departmentData != null){
                        var departmentData=ret.departmentData;
                        //是否关注
                        if(ret.fellow){
                            $('.attentionIcon').addClass('active');
                        }
                        else{
                            $('.attentionIcon').removeClass('active');
                        }
                        $('div.all').eq(info-1).find('.use_funds').html(yuanToWan(departmentData.use_funds));
                        $('div.all').eq(info-1).find('.avg_use_funds').html(yuanToWan(departmentData.avg_use_funds));
                        $('div.all').eq(info-1).find('.secu_num').html(departmentData.secu_num);
                        $('div.all').eq(info-1).find('.on_the_list_num').html(departmentData.on_the_list_num);
                    }
                    else{
                        commonAlertWindow({
                            message:'暂无该营业部相关数据',
                            time:2000
                        })
                        $('div.all').eq(info-1).find('.use_funds').html(0);
                        $('div.all').eq(info-1).find('.avg_use_funds').html(0);
                        $('div.all').eq(info-1).find('.secu_num').html(0);
                        $('div.all').eq(info-1).find('.on_the_list_num').html(0);
                    }
                })
            }
            else{
                
            }
        }
        else{
            waitLoading.close();
            commonAlertWindow({
                message:'暂无该营业部数据',
                time:2000
            })
            $('div.all').eq(info-1).find('.noData').show();
        }
    },
    //点击切换栏目 5日 10日 1个月  3个月
    chooseColunm:function(){
        var timeBtn=$('.dateColumn .col');
        var $this=this;
        var html='';
        var waitLoading = new WaitLoading();
        timeBtn.click(function(){
            var index=$(this).index()+1;
            var $$this=$(this);
            waitLoading.open();
            $('.dateColumn .col span').removeClass('active');
            $$this.find('span').addClass('active');
            $('.selectDepartment div.all').removeClass('active');
            $('.selectDepartment div.all').eq(index-1).addClass('active');
            $this.renderData(index);
        })
    },
    addAttention:function(infoToken){ console.log(infoToken);
        var userId = this.userPhone;
        $('.attentionIcon').on('click',function(){
            var icon=$(this);console.log(userId);
            //已关注
            if(userId){
                if(icon.hasClass('active')){
                    api.ajax({
                        url:url()+'selfSelectInfo/deleteSelfSelectAtHero',
                        data:{    // selfSelectInfo/deleteSelfSelectAtHero
                            values:{
                                userToken:userId,
                                infoToken:infoToken,
                                infoType:2
                            }
                        }
                    },function(ret,err) {
                        console.log(JSON.stringify(ret))
                        icon.removeClass("active");
                        commonAlertWindow({
                            message:ret.msg
                        })
                    })
                }
                else{
                    api.ajax({
                        url:url()+'selfSelectInfo/addInfoAtHero',
                        method:'post',
                        data:{
                            values:{
                                userToken:userId,
                                infoToken:infoToken,
                                infoType:2
                            }
                        }
                    },function(ret,err) {
                        console.log(JSON.stringify(ret))
                        if(ret.success === true){
                            if(ret.attention){
                                icon.addClass("active")
                                commonAlertWindow({
                                    message:'添加关注成功'
                                })
                            }
                            else{
                                //icon.addClass("active")
                                commonAlertWindow({
                                    message:ret.msg
                                })
                            }
                        }else{
                            commonAlertWindow({
                                message:'关注失败'
                            })
                        }
                    })
                }
            }
            else{
                commonAlertWindow({
                    message:'请登录'
                })
                setTimeout(function(){
                    openWindow('login',{},'push')
                },1000)
            }
        })
    },
    //渲染营业部下的个股
    getDeptStockSale:function(code,info){console.log('个股'+info)
        var $this=this;
        var n=1;
        var stockHtml='';
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.ajax({
            url:url()+'stock/getDeptStockSale',
            data:{
                values:{
                    page_no:n,
                    bo_code:code,
                    page_count:10
                }
            }
        },function(ret,err){
            console.log(JSON.stringify(ret));
            if(ret.code){
                waitLoading.close();
                var stockList=ret.stockList;
                for(var i=0;len=stockList.length,i<len;i++){
                    $('#saveNum').val(len);console.log($('#saveNum').val());
                    var msg=stockList[i];
                    stockHtml+=$this.stockHtml(msg);
                }
                /*$('.selectDepartment div.all').eq(info-1).find('.stockNum').html(stockList.length);
                $('.selectDepartment div.all').eq(info-1).find('.stockList').append(stockHtml);*/
                $('.listStock').find('.stockNum').html(stockList.length);
                $('.listStock').find('.stockList').append(stockHtml);
                changeColor();
            }
            else{
                waitLoading.close();
                commonAlertWindow({
                    message:err.msg,
                    time:2000
                })
            }
        })
    },
    stockHtml:function(msg){
        var stockHtml='';
        stockHtml='<li class="stockShow" data-code="'+msg.stockCode+'">' +
            '         <div class="col">' +
            '              <span>'+cTime(msg.trading_day)+'</span>' +
            '         </div>' +
            '         <div class="col">' +
            '            <span class="stockName">'+msg.secu_abbr+'</span>' +
            '         </div>' +
            '         <div class="col">' +
            '            <span class="colorRed">'+yuanToWan(msg.buy_sum)+'</span>' +
            '         </div>\n' +
            '         <div class="col">' +
            '            <span class="colorBlue">'+yuanToWan(msg.sale_sum)+'</span>' +
            '         </div>' +
            '         <div class="col">' +
            '             <span class="valColor">'+yuanToWan(msg.net_balance)+'</span>' +
            '         </div>' +
            '       </li>'
        return stockHtml;
    },
    toFixedTop:function(){
        var toper=$('.titleColumn').offset().top;//到页面的距离
        $(window).scroll(function(){
            var scrollTop=$(window).scrollTop();//滚动距离
            if (toper <= scrollTop+140)
            {
                $('.titleColumn').addClass('yybStable');
                $('.seatDiv').show();
            }
            else
            {
                $('.titleColumn').removeClass('yybStable');
                $('.seatDiv').hide();
            }
        });
    },
    //跳转到个股详情
    stockDetails:function(){
        $('.stockDetails').on('click','.stockShow',function(){
            var li=$(this);
            var stockCode=li.attr('data-code');
            var stockName=li.find('.stockName').html();
            openWindow('stockDetails',{
                stockCode:stockCode,
                stockName:stockName
            })
        })
    },
    //上划加载
    scrollToBottom:function(code,info){
        var $this=this;
        var n=1;
        var bFlag= true;

        api.addEventListener({
            name:'scrolltobottom',
            extra:{
                threshold:30            //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        },function(ret){
            n++;
            var stockHtml='';
            api.ajax({
                url:url()+'stock/getDeptStockSale',
                data:{
                    values:{
                        page_no:n,
                        bo_code:code,
                        page_count:10
                    }
                }
            },function(ret,err){
                console.log(JSON.stringify(ret));
                if(ret.code){
                    var stockList=ret.stockList;
                    for(var i=0;len=stockList.length,i<len;i++){
                        var msg=stockList[i];
                        stockHtml+=$this.stockHtml(msg);
                    }
                    //$('.selectDepartment div.all').eq(info-1).find('.stockList').append(stockHtml);
                    $('.stockList').append(stockHtml);
                    if(len < 10 && len != 0){//最后一页  len = 每页的个股数
                        $('#saveNum').val(10*(n-1)+len);
                        var num=$('#saveNum').val();console.log(num+'最后一页的个数');// 把最后一页的个数存起来
                        /*$('.selectDepartment div.all').eq(info-1).find('.stockNum').html(num);
                        $('.selectDepartment div.all').eq(info-1).find('.nolist').show();*/
                        $('.listStock').find('.stockNum').html(num);
                        $('.listStock').find('.nolist').show();
                    }
                    else if(len == 10){
                        //$('.selectDepartment div.all').eq(info-1).find('.stockNum').html(len*n);
                        $('.listStock').find('.stockNum').html(len*n);
                        commonAlertWindow({
                            message:'正在加载',
                            time:2000
                        })
                    }
                    else if(len == 0){
                        len=$('#saveNum').val();
                        //$('.selectDepartment div.all').eq(info-1).find('.stockNum').html($('#saveNum').val());
                        $('.listStock').find('.stockNum').html($('#saveNum').val());
                        commonAlertWindow({
                            message:'没有数据了',
                            time:2000
                        })
                    }
                    console.log('这是n=>'+n);
                    console.log('当前个股数=>'+len)
                    changeColor();
                }
                else{
                    commonAlertWindow({
                        message:err.msg,
                        time:2000
                    })
                }
            })
        })
    }
}