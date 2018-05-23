var yybList={
    init:function(){
        //this.renderData();
        this.renderNewData();
        this.switchBtn();
        this.toFixedTop();
        this.chooseColunm();
        this.renderData('1');
        this.yybDetails();
    },
    renderData:function(info){console.log(info);
        var html='';
        var $this=this;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.ajax({
            url:url()+'stock/getBusinessDepartment',
            data:{
                values:{
                    page_count:100,
                    type:info
                }
            }
        },function(ret,err){
            console.log(JSON.stringify(ret));
            if(ret.code){
                waitLoading.close();
                var departmentData=ret.departmentData;
                if(departmentData != '' || departmentData.length != 0){
                    for(var i=0;len=departmentData.length,i<len;i++){
                        var msg=departmentData[i];
                        html+=$this.yybHtml(msg);
                    }
                    $('.attentionThemeList .attentionThemeOne').eq(info-1).append('<ul>'+html+'</ul>');
                }
                else{
                    $('.attentionThemeList .attentionThemeOne').eq(info-1).find('.noDataAll').show();
                }
            }
            else{
                commonAlertWindow({
                    message:ret.msg,
                    time:2000
                })
            }
        })
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
            $('.attentionThemeList div.sm').removeClass('active');
            $('.attentionThemeList div.sm').eq(index-1).addClass('active');
            $this.renderData(index);
        })
    },
    yybHtml:function(msg){
        var yybHtml='';
        yybHtml='<li class="yybShow" data-code="'+msg.bo_code+'">' +
            '        <h4>'+msg.chi_name+'</h4>' +
            '        <div class="cont clearfix">' +
            '              <div class="cont-left fl">' +
            '                  <span>上榜次数：<b class="weight">'+msg.on_the_list_num+'</b></span>' +
            '              </div>' +
            '              <div class="cont-right fr">' +
            '                 <span>动用资金：<b>'+yuanToYi(msg.use_funds)+'亿</b></span>' +
            '               </div>' +
            '        </div>' +
            '    </li>'
        return yybHtml;
    },
    //切换 最新热门  近期热门
    switchBtn:function(){
        $('.titleCol span').on('click',function(){
            $('.titleCol span').removeClass('active');
            $('.showAll>div.all').removeClass('active');
            $(this).addClass('active');
            $('.showAll>div.all').eq($(this).index()).addClass('active');
        })
    },
    toFixedTop:function(){
        var toper=$('.dateColumn').offset().top;//到页面的距离
        $(window).scroll(function(){
            var scrollTop=$(window).scrollTop();//滚动距离
            if (toper <= scrollTop+110)
            {
                $('.dateColumn').addClass('stable');
                $('.bar').show();
            }
            else
            {
                $('.dateColumn').removeClass('stable');
                $('.bar').hide();
            }
        });
    },
    yybDetails:function(){
        $('div.all').on('click','.yybShow',function(){
            var li=$(this);
            var code=li.attr('data-code');
            var name=li.find('h4').html();
            openWindow('businessDepartmentDetails',{
                code:code,
                name:name
            })
        })
    },
    //最新热门数据
    renderNewData:function(){
        var html='';
        var $this=this;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.ajax({
            url:url()+'stock/getBusinessDepartment',
            data:{
                values:{
                    page_count:100,
                    type:8
                }
            }
        },function(ret,err){
            console.log(JSON.stringify(ret));
            if(ret.code){
                waitLoading.close();
                var departmentData=ret.departmentData;
                for(var i=0;len=departmentData.length,i<len;i++){
                    var msg=departmentData[i];
                    html+=$this.yybHtml(msg);
                }
                $('.departmentList .dayHot').append('<ul>'+html+'</ul>');
            }
            else{
                waitLoading.close();
                $('.departmentList .dayHot').find('.noDataAll').show();
                commonAlertWindow({
                    message:ret.msg,
                    time:2000
                })
            }
        })
    }
}