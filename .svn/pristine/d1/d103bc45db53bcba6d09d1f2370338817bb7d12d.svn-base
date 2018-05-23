var billboard={
    init:function(){
       // this.renderingData();
        this.getTime();
        this.stockDetails();
        this.clickSort();
        //this.toFixed();
    },
    searchDate:$('#showDate'),
    //获取近20天的时间
    getTime:function(){
        var arrDay=[];
        var timeHtml='';
        var $this = this;
        api.ajax({
            url:url()+'stock/getHolidays',
            data:{
                values:{
                    days:10
                }
            }
        },function(ret){
            console.log(JSON.stringify(ret));
            if(ret.code){
                arrDay=ret.days;
                var str=arrDay[0];//2018-12-12
                var newStr=str.split('-');
                var month=newStr[2];
                var otherTime=newStr[1]+'.'+newStr[0];
                $this.searchDate.find('.month').html(month);
                $this.searchDate.find('.time').html(otherTime);
               //$this.searchDate.html(arrDay[0]);
                $('#saveDate').val(arrDay[0])
               $this.renderingData();
               for(var i=0;i<arrDay.length;i++){
                   timeHtml+='<li>'+arrDay[i]+'</li>'
               }
               $('#popups ul').html(timeHtml);
               $this.clickDate();
            }
        });
    },
    //渲染数据   //主页龙虎榜数据
    renderingData:function(){
        //var timeColumn=arr;
        var $this=this;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        console.log($('#saveDate').val());
        api.ajax({
            url:url()+'stock/getStockHeroList',
            data:{
                values:{
                    searchDate:$('#saveDate').val()
                }
            }
        },function(ret,err){
            console.log(JSON.stringify(ret));
            var billboardHtml='';
            if(ret.code){
                waitLoading.close();
                var stockHeroList=ret.stockHeroList;
                for(var i=0;i<stockHeroList.length;i++){
                    var info=stockHeroList[i];
                    billboardHtml+='<li class="stockShow" data-ID="'+info.id+'" data-code="'+info.stockCode+'">' +
                        '                        <div class="col">' +
                        '                            <span data-num="'+info.abnormalCode+'"><b class="stockName">'+info.stockName+'</b><i>3日</i></span>' +
                        '                        </div>' +
                        '                        <div class="col">' +
                        '                            <span>'+toTwo(info.currentPrice)+'</span>' +
                        '                        </div>' +
                        '                        <div class="col">' +
                        '                            <span class="percentage zdf">'+toTwo(info.chg)+'%'+'</span>' +
                        '                        </div>' +
                        '                        <div class="col">' +
                        '                            <span class="buyIn">'+yuanToWan(info.in)+'</span>' +
                        '                        </div>' +
                        '                        <div class="col">' +
                        '                            <span class="valColor ">'+yuanToWan(info.netAmount)+'</span>' +
                        '                        </div>' +
                        '                    </li>'
                }
                $('.touristAttention ul').html(billboardHtml);
                changeColor();
                $this.addThree();
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
    //页面传参
    stockDetails:function(){
        $('.touristAttention').on('click','.stockShow',function(){
            var li=$(this);
            var id=li.attr('data-ID');console.log(id);
            var stockCode=li.attr('data-code');
            var stockName=li.find('.stockName').html();
            openWindow('stockDetails',{
                id:id,
                stockCode:stockCode,
                stockName:stockName
            })
        })
    },
    //点选日期
    clickDate:function (){
        var $this=this;
        var timer=null;
        //var showDate=$('.show-date');
        var li=$('.popupsList').find('li');
        $this.searchDate.on('click',function(){
            $('.bind-mark').show();
            $('.popupsList').show();
            $('.bind-mark').click(function(){
                $('.popupsList').hide();
                $(this).hide();
            })
        });
        li.on('click',function(){
            li.removeClass('active');
            $(this).addClass('active');
            var str=$(this).html();
            var newStr=str.split('-');
            var month=newStr[2];
            var otherTime=newStr[1]+'.'+newStr[0];
            $this.searchDate.find('.month').html(month);
            $this.searchDate.find('.time').html(otherTime);
            $('#saveDate').val(str);console.log(str+'点击完日期');
            $this.renderingData();
            setTimeout(function(){
                $('.popupsList').hide();
                $('.bind-mark').hide();
            },500);

            $('.col').find('.up-btn').removeClass('active');
            $('.col').find('.down-btn').removeClass('active');
        });
    },
    //点击排序
    clickSort:function(){
        var $this=this;
        function commonFun(clickMenu){
            var bFlag= true;
            clickMenu.on('click',function(){   console.log(JSON.stringify(clickMenu.selector)); console.log($('#saveDate').val() +'当前日期')
                var waitLoading = new WaitLoading();
                waitLoading.open();
                var sortKey=$(this).attr('data-menu');
                if(bFlag){    console.log('111111111111111111111111') //小=>大
                    $('.col').removeClass('active');
                    $('.col').find('.up-btn').removeClass('active');
                    $('.col').find('.down-btn').removeClass('active');
                    $(this).find('i.up-btn').addClass('active');
                    $(this).find('i.down-btn').removeClass('active');
                    $(this).addClass('active');
                    api.ajax({
                        url:url()+'stock/getStockHeroList',
                        data:{
                            values:{
                                searchDate:$('#saveDate').val(),
                                sortKey:sortKey,
                                sortType:'DESC'
                            }
                        }
                    },function(ret){
                        console.log(JSON.stringify(ret));
                        var billboardHtml='';
                        if(ret.code){
                            waitLoading.close();
                            var stockHeroList=ret.stockHeroList;
                            for(var i=0;i<stockHeroList.length;i++){
                                var info=stockHeroList[i];
                                billboardHtml+='<li class="stockShow" data-ID="'+info.id+'" data-code="'+info.stockCode+'">' +
                                    '                        <div class="col">' +
                                    '                            <span data-num="'+info.abnormalCode+'"><b class="stockName">'+info.stockName+'</b><i>3日</i></span>' +
                                    '                        </div>' +
                                    '                        <div class="col">' +
                                    '                            <span>'+toTwo(info.currentPrice)+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-chg">' +
                                    '                            <span class="percentage zdf">'+toTwo(info.chg)+'%'+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-in">' +
                                    '                            <span class="buyIn">'+yuanToWan(info.in)+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-amount">' +
                                    '                            <span class="valColor ">'+yuanToWan(info.netAmount)+'</span>' +
                                    '                        </div>' +
                                    '                    </li>'
                            }
                            $('.touristAttention ul').html(billboardHtml);
                            $this.addThree();
                            changeColor();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                            }
                        }
                    });
                    bFlag =false;
                }
                else{ console.log('222222222222222222222222') //降序
                    $('.col').removeClass('active');
                    $('.col').find('.up-btn').removeClass('active');
                    $('.col').find('.down-btn').removeClass('active');
                    $(this).find('i.up-btn').removeClass('active');
                    $(this).find('i.down-btn').addClass('active');
                    $(this).addClass('active');
                    api.ajax({
                        url:url()+'stock/getStockHeroList',
                        data:{
                            values:{
                                searchDate:$('#saveDate').val(),
                                sortKey:sortKey,
                                sortType:'ASC'
                            }
                        }
                    },function(ret){
                        console.log(JSON.stringify(ret));
                        var billboardHtml='';
                        if(ret.code){
                            waitLoading.close();
                            var stockHeroList=ret.stockHeroList;
                            for(var i=0;i<stockHeroList.length;i++){
                                var info=stockHeroList[i];
                                billboardHtml+='<li class="stockShow" data-ID="'+info.id+'" data-code="'+info.stockCode+'">' +
                                    '                        <div class="col">' +
                                    '                            <span data-num="'+info.abnormalCode+'"><b class="stockName">'+info.stockName+'</b><i>3日</i></span>' +
                                    '                        </div>' +
                                    '                        <div class="col">' +
                                    '                            <span>'+toTwo(info.currentPrice)+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-chg">' +
                                    '                            <span class="percentage zdf">'+toTwo(info.chg)+'%'+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-in">' +
                                    '                            <span class="buyIn">'+yuanToWan(info.in)+'</span>' +
                                    '                        </div>' +
                                    '                        <div class="col click-amount">' +
                                    '                            <span class="valColor ">'+yuanToWan(info.netAmount)+'</span>' +
                                    '                        </div>' +
                                    '                    </li>'
                            }
                            $('.touristAttention ul').html(billboardHtml);
                            $this.addThree();
                            changeColor();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                            }
                        }
                    });
                    bFlag =true;

                }

            })
        }
        commonFun($('.click-in'));
        commonFun($('.click-amount'));
        commonFun($('.click-chg'));
    },
    addThree:function(){
        var li=$('.stockName').parent('span');
        li.each(function(i,item){
            var num=$(this).attr('data-num');
            if( num == '206'){
                $(this).find('i').show();
            }
            else{
                $(this).find('i').hide();
            }
        })
    },
    toFixed:function(){
        var toper=$('.posFixed').offset().top;//到页面的距离
        $(window).scroll(function(){
            var scrollTop=$(window).scrollTop();//滚动距离
            if (toper <= scrollTop+200)
            {
                $('.posFixed').addClass('toFixed');
                $('.bar').show();
            }
            else
            {
                $('.posFixed').removeClass('toFixed');
                $('.bar').hide();
            }
        });
    }
}