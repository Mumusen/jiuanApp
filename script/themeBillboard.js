var themeBillboard={
    searchDate:$('#showDate'),
    init:function(){console.log(JSON.stringify(this));
        //this.renderingData();
        this.stockDetails();
        this.getInfoId();
    },
    //获取本概念的id
    getInfoId:function(){
        var parm = api.pageParam;
        var infoId = parm.infoId; console.log(infoId);
        var themeName=parm.themeName;
        $('#saveId').val(infoId);
        $('#themeName').html(themeName+'龙虎榜');
        this.renderingData(infoId,''); //第一次渲染数据 时间参数没有的话，
        this.clickSort(infoId);
    },
    //渲染数据
    renderingData:function(id,date){
        console.log(id+'id');
        console.log(date+'date');
        var $this=this;
        var timeArr=[];
        var timeHtml='';
        //var searchDate=$('#showDate').val();
        var waitLoading = new WaitLoading();
        waitLoading.open();
        //获取当前日期  如果返回日期为空
       /* var oDate=new Date();
        var year=oDate.getFullYear();
        var month=oDate.getMonth()+1;
        var day=oDate.getDate();
        var str=year+'-'+toDub(month)+'-'+toDub(day);*/
        if(date == '' || date == null ){
           //date = str;
           console.log('时间参数'+date);
            api.ajax({
                url:url()+'stock/getConceptStockHeroList',
                data:{
                    values:{
                        searchDate:date,
                        conceptId:id
                    }
                }
            },function(ret){
                console.log(JSON.stringify(ret));
                var billboardHtml='';
                var dates=ret.dates;//渲染时间列表  为第二次以后渲染数据提供参数
                //$('#upTime').val(dates);console.log($('#upTime').val());
                for(var i=0;i<dates.length;i++){
                    timeHtml+='<li>'+dates[i]+'</li>'
                }
                $('#popups ul').html(timeHtml);
                var dates=ret.dates;//渲染时间列表  为第二次以后渲染数据提供参数
                //$('#upTime').val(dates);console.log($('#upTime').val());
                var str=dates[0];//2018-12-12
                var newStr=str.split('-');
                var month=newStr[2];
                var otherTime=newStr[1]+'.'+newStr[0];
                $this.searchDate.find('.month').html(month);
                $this.searchDate.find('.time').html(otherTime);
                $('#saveDate').val(dates[0])
                $this.clickDate();
                //渲染个股数据
                if(ret.code){
                    waitLoading.close();
                    //加载龙虎榜数据
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
                            '                            <span class="percentage">'+toTwo(info.chg)+'%'+'</span>' +
                            '                        </div>' +
                            '                        <div class="col">' +
                            '                            <span>'+yuanToWan(info.in).fixed(2)+'</span>' +
                            '                        </div>' +
                            '                        <div class="col">' +
                            '                            <span class="valColor">'+yuanToWan(info.netAmount).fixed(2)+'</span>' +
                            '                        </div>' +
                            '                    </li>'
                    }
                    $('.touristAttention ul').html(billboardHtml);
                    changeColor();
                    $this.addThree();
                }
                else{
                    waitLoading.close();
                    $('.noDataAll').show();
                    commonAlertWindow({
                        message:ret.msg
                    })
                }
            })
        }
        else{
            api.ajax({
                url:url()+'stock/getConceptStockHeroList',
                data:{
                    values:{
                        searchDate:date,
                        conceptId:id
                    }
                }
            },function(ret){
                console.log(JSON.stringify(ret));
                var billboardHtml='';
                var dates=ret.dates;//渲染时间列表  为第二次以后渲染数据提供参数
                //$('#upTime').val(dates);console.log($('#upTime').val());
                /*var str=dates[0];//2018-12-12
                var newStr=str.split('-');
                var month=newStr[2];
                var otherTime=newStr[1]+'.'+newStr[0];
                $this.searchDate.find('.month').html(month);
                $this.searchDate.find('.time').html(otherTime);*/
               // $('#saveDate').val(dates[0]);console.log(dates[0]+'点击完日期')
                for(var i=0;i<dates.length;i++){
                    timeHtml+='<li>'+dates[i]+'</li>'
                }
                $('#popups ul').html(timeHtml);
                 //$('#showDate').html(dates[0]);
                $this.clickDate();
                //渲染个股数据
                if(ret.code){
                    $('.noDataAll').hide();
                    waitLoading.close();
                    //加载龙虎榜数据
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
                            '                            <span class="percentage">'+toTwo(info.chg)+'%'+'</span>' +
                            '                        </div>' +
                            '                        <div class="col click-in">' +
                            '                            <span>'+yuanToWan(info.in)+'</span>' +
                            '                        </div>' +
                            '                        <div class="col click-amount">' +
                            '                            <span class="valColor">'+yuanToWan(info.netAmount)+'</span>' +
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
                        message:ret.msg
                    })
                }
            })
        }
    },
    //页面传参
    stockDetails:function(){
        $('.touristAttention').on('click','.stockShow',function(){
            var li=$(this);
            var id=li.attr('data-ID');
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
        //var showDate=$('.show-date');
        var li=$('.popupsList').find('li'); //时间列表  遮罩
        $('#showDate').on('click',function(){
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
            var date=$(this).html();console.log(date);
            var infoId=$('#saveId').val();
            var str=date;
            var newStr=str.split('-');
            var month=newStr[2];
            var otherTime=newStr[1]+'.'+newStr[0];
            $this.searchDate.find('.month').html(month);
            $this.searchDate.find('.time').html(otherTime);
            $('#saveDate').val(str);console.log(str+'点击完日期');
            setTimeout(function(){
                $('.popupsList').hide();
                $('.bind-mark').hide();
            },500);
            $this.renderingData(infoId,date);
            console.log('上一个函数执行了')
            $('.col').find('.up-btn').removeClass('active');
            $('.col').find('.down-btn').removeClass('active');
        });
    },
    //点击排序
    clickSort:function(id){
        var $this=this;
        function commonFun(clickMenu){
            var bFlag= true;
            clickMenu.on('click',function(){console.log($('#saveDate').val()+"当前日期")
                var waitLoading = new WaitLoading();
                waitLoading.open();
                var sortKey=$(this).attr('data-menu');
                if(bFlag){    console.log('111111111111111111111111') //升序
                    $('.col').find('.up-btn').removeClass('active');
                    $('.col').find('.down-btn').removeClass('active');
                    $(this).find('i.up-btn').addClass('active');
                    $(this).find('i.down-btn').removeClass('active');
                    api.ajax({
                        url:url()+'stock/getConceptStockHeroList',
                        data:{
                            values:{
                                conceptId:id,
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
                            changeColor();
                            $this.addThree();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                            }
                        }
                        else{
                            waitLoading.close();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                            }
                        }
                    });
                    bFlag =false;
                }
                else{ console.log('222222222222222222222222') //降序
                    $('.col').find('.up-btn').removeClass('active');
                    $('.col').find('.down-btn').removeClass('active');
                    $(this).find('i.up-btn').removeClass('active');
                    $(this).find('i.down-btn').addClass('active');
                    api.ajax({
                        url:url()+'stock/getConceptStockHeroList',
                        data:{
                            values:{
                                conceptId:id,
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
                            changeColor();
                            $this.addThree();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                            }
                        }
                        else{
                            waitLoading.close();
                            if(clickMenu.selector == '.click-chg'){console.log('chg')
                                $('.col.click-chg').addClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                            }
                            else if( clickMenu.selector == '.click-in'){console.log('in')
                                $('.col.click-in').addClass('bgGrey');
                                $('.col.click-amount').removeClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                            }
                            else if(clickMenu.selector == '.click-amount'){console.log('amount')
                                $('.col.click-amount').addClass('bgGrey');
                                $('.col.click-chg').removeClass('bgGrey');
                                $('.col.click-in').removeClass('bgGrey');
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

    }
}