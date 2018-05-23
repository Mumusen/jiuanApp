var moreTheme={
    phone:$api.getStorage("userId"),
    init:function(){
        this.renderingData();
        this.themeDetails();
        this.stockDetails();
        this.addAttention();
        this.goThemeBillboard();
    },
    //渲染数据
    renderingData:function(){
        var phone=this.phone;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.ajax({
            url:url()+'conceptSort',
            method:'POST',
            data:{
                values:{
                    num:10,
                    phone:phone
                }
            }
        },function(ret){
            waitLoading.close()
            console.log(JSON.stringify(ret))
            var leadUpHtml='';
            var leadDownHtml='';
            var backwardConceptStock=ret.backwardConceptStock; //领涨
            var leadConceptStock=ret.leadConceptStock; //领跌
            for(var i=0;i<leadConceptStock.length;i++){
                var info=leadConceptStock[i];
                var stockDetailVo=info.stockDetailVo;
                leadUpHtml+='<li class="clearfix" data-Id="'+info.id+'">' +
                    '                        <div class="left">' +
                    '                            <h2 class="conceptStockName themeShow">'+info.conceptStockName+'</h2>' +
                    '                            <div class="txt">' +
                    '                                <p class="percentage">'+toTwo(info.chg)+'%</p>' +
                    '                                <p class="stockShow">' +
                    '                                    <i></i>' +
                    '                                    <span data-code="'+stockDetailVo.stockCode+'" data-Id="'+stockDetailVo.associateStockId+'"><b>'+stockDetailVo.stockName+'</b><u class="percentage">'+toTwo(stockDetailVo.changeRate)+'%</u></span>' +
                    '                                </p>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="right">' +
                    '                            <div class="long goThemeBillboard"><img src="../image/icon_long.png"></div>' ;
                                           if(info.isAttention ==2){
                                               leadUpHtml+='<div class="follow"></div>'
                                           }
                                           else{
                                               leadUpHtml+='<div class="follow follow-no"></div>'
                                           }
                                       leadUpHtml+='   </div>' +
'                                                  </li>'
            }
            for(var i=0;i<backwardConceptStock.length;i++){
                var info=backwardConceptStock[i];
                var stockDetailVo=info.stockDetailVo;
                leadDownHtml+='<li class="clearfix" data-Id="'+info.id+'">' +
                    '                        <div class="left">' +
                    '                            <h2 class="conceptStockName themeShow">'+info.conceptStockName+'</h2>' +
                    '                            <div class="txt">' +
                    '                                <p class="percentage">'+toTwo(info.chg)+'%</p>' +
                    '                                <p class="green-icon stockShow">' +
                    '                                    <i></i>' +
                    '                                    <span data-code="'+stockDetailVo.stockCode+'" data-Id="'+stockDetailVo.associateStockId+'"><b>'+stockDetailVo.stockName+'</b><u class="percentage">'+toTwo(stockDetailVo.changeRate)+'%</u></span>' +
                    '                                </p>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="right">' +
                    '                            <div class="long goThemeBillboard"><img src="../image/icon_long.png"></div>' ;

                if(info.isAttention ==2){
                    leadDownHtml+='<div class="follow"></div>'
                }
                else{
                    leadDownHtml+='<div class="follow follow-no"></div>'
                }
                leadDownHtml+='                </div>' +
                    '                    </li>'
            }
            $('#leadUp ul').html(leadUpHtml);
            $('#leadDown ul').html(leadDownHtml);
            changeColor();
        })
    },
    //跳转到主题详情页并传参
    themeDetails:function(){
        $('.rise').on('click','.themeShow',function(){
            var li=$(this);
            var id=li.parents('li').attr('data-Id');console.log(id)
            var themeName=li.text();console.log(themeName)
            openWindow('themeDetails',{
                id:id,
                themeName:themeName
            })
        })
    },
    //跳转到个股详情
    stockDetails:function(){
        $('.rise').on('click','.stockShow',function(){
            var li=$(this);
            var stockName= li.find('b').text();
            var id=li.find('span').attr('data-ID');
            var stockCode=li.find('span').attr('data-code');
            openWindow('stockDetails',{
                id:id,
                stockName:stockName,
                stockCode:stockCode
            })
        })
    },
    //关注
    addAttention:function(){
        var userId = $api.getStorage("userId");
        $('.rise').on('click','div.follow',function(){
            if(userId){
                console.log(id);
                console.log(userId);
                var icon=$(this);
                var id=icon.parents('li').attr('data-Id');console.log(id);
                var infoToken=icon.parents('li').find('h2').text();
                //已关注
                if(icon.hasClass('follow-no')){
                    api.ajax({
                        url: url()+'selfSelectInfo/deleteSelfSelect',
                        data:{
                            values:{
                                // userId:userId,
                                id:id,
                                type:0,
                                phone:userId
                            }
                        }
                    },function(ret,err) {
                        console.log(JSON.stringify(ret))
                        icon.removeClass("follow-no")
                        commonAlertWindow({
                            message:ret.msg
                            
                        })
                    })
                }
                else{
                    api.ajax({
                        url: url()+'selfSelectInfo/addInfo', //添加 关注
                        data: {
                            values: {
                                userToken:userId,
                                infoType:0,
                                infoId:id,
                                infoToken:infoToken
                            }
                        }
                    }, function(ret, err) {
                        console.log(JSON.stringify(ret));
                        if(ret.success === true){
                            if(ret.attention){
                                icon.addClass("follow-no")
                                commonAlertWindow({
                                    message:ret.msg
                                })
                            }
                            else{
                                commonAlertWindow({
                                    message:ret.msg
                                })
                            }
                        }else{
                            commonAlertWindow({
                                message:'请求失败'
                            })
                        }
                    });
                }
            }
            else{
                commonAlertWindow({
                    message:'请登录'
                });
                setTimeout(function(){
                    openWindow('login',{},'push')
                },1000)
            }
        })
    },
    //点击跳转到主题 龙虎榜
    goThemeBillboard:function(){
        $('.rise').on('click','.goThemeBillboard',function(){
            var li=$(this);
            var themeName=li.parents('li').find('.themeShow').text();
            var id=li.parents('li').attr('data-Id');console.log(id)
            openWindow('themeBillboard',{
                infoId:id,
                themeName:themeName
            })
        })
    }
}