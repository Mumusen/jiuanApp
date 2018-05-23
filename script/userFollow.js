var followListAjax = {
    followBox:null,
    infoCode:null,
    pageCount:null,
    followAjax:function(){
        // console.log('1111')
        this.followList(1);
        this.layerBtnBox();
        // this.layerBtnDel();
    },
    // 渲染dom
    followList: function(page){
        // console.log('1111')
        var userId = $api.getStorage("userId");
        // var userId = '13718278819',
        $this = this,
        html = '',
        waitLoading = new WaitLoading();
        waitLoading.open();
        // $('.follow').html('');
        api.ajax({
            url:url() +'visitorStock/attentionBusinessDepartment',
            data:{
                values:{
                    phone:userId,
                    no:page
                }
            }
        },function(ret){
            console.log('follow list '+JSON.stringify(ret));
            if(ret.success){
                var bdvList = ret.bdvList;
                pageCount = ret.totalCount;
                console.log(bdvList.length)
                if(bdvList.length != 0){
                    for(var i=0;i<bdvList.length;i++){
                        var msg = bdvList[i];
                        html += $this.followHtml(msg);
                    };
                    $('.follow').append(html);
                    $('.follow').attr("page",page);
                    waitLoading.close();
                    $this.swipeCompanyUpLoad();
                }else{
                    var noHtml = '<p class="nolist">- - 暂无关注 - -</p>';
                    $('.follow').append(noHtml);
                    waitLoading.close();
                }
                $this.followBtn();
                $this.followBtnstock();
                $this.followBtnPage();
                $this.layerBtnDel();
            }else{
                commonAlertWindow({
                    message:"网络异常"
                });
            }
        })
    },
    // 下拉加载更多
    swipeCompanyUpLoad: function () {
        var $this = this,
            html = '',
            waitLoading = new WaitLoading(),
            pageNum = Math.round(pageCount / 10),//获取总页面数
            n = $(".follow").attr("page");
        n++;
        // console.log($(".infor-list").attr("page"))
        waitLoading.open();
        api.addEventListener({
            name:'scrolltobottom',
            extra:{
                threshold:30            //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        }, function(ret, err){
            if(pageNum >= n){
                console.log("还有数据")
                $this.followList(n);
            }else{
                console.log("没有数据了！")
                $(".nolist").show();
                commonAlertWindow({
                    message:"没有更多数据"
                });
            }
        });
    },
    // html dom
    followHtml:function(msg){
        // console.log(msg)
        var data = msg.stockDetailVo,
        sing = redClass = txt = '';
        if(data.changeRate<0){
            sing = "";
            redClass = "";
        }else{
            sing = "+";
            redClass = "red";
        };
        if(msg.trading_day == null){
            txt = "暂无上榜";
        }else{
            txt = msg.trading_day;
        }
        html =
        '    <div class="box">'+
        '        <div class="tit">'+
        '            <h3 code="'+msg.bo_code+'" infoName="'+msg.chi_name+'"  class="followBtnPage">'+followHtmlTagTitle(msg.chi_name)+'</h3>'+
        '            <i class="followBtn" code="'+msg.bo_code+'"></i>'+
        '        </div>'+
        '        <div class="txt '+redClass+'">'+
        '            <p class="followBtnstock" infoId="'+data.infoId+'" infoName="'+data.stockName+'" infoCode="'+data.stockCode+'">'+data.stockName+'<span>'+data.stockCode+'</span></p>'+
        '            <p>现价: <span>'+toTwo(data.currentPrice)+'</span> <span>'+sing+toTwo(data.changeRate)+'%</span></p>'+
        '        </div>'+
        '        <div class="day">'+
        '            <p>最新上榜 '+txt+'</p>'+
        '            <p>近5日上榜次数<u>'+msg.on_the_list_num+'</u></p>'+
        '        </div>'+
        '    </div>';
        return html;
    },
    // 跳转个股详情
    followBtnstock:function(){
        $(".followBtnstock").click(function(){
            openWindow('stockDetails', {
                // id:  $(this).attr('infoId'),
                stockName: $(this).attr('infoName'),
                stockCode: $(this).attr('infoCode')
            }, 'push');
        })
    },
    // 跳转营业部详情
    followBtnPage:function(){
        $(".follow").on("click",".followBtnPage",function(){
            console.log("跳转营业部详情"+ $(this).attr('code')+"*****"+$(this).attr('infoName'))
            openWindow('businessDepartmentDetails', {
                code: $(this).attr('code'),
                name: $(this).attr('infoName')
            }, 'push');
        })
    },
    // 删除 弹出框
    followBtn:function(){
        var html =
            '<div class="layer-del" style="z-index:99">'+
            '    <div class="layer-del-box">'+
            '        <p>确定删除</p>'+
            '        <div class="btn">'+
            '            <a href="#" id="btnNo">取消</a>'+
            '            <a href="#" id="btnYse">确定</a>'+
            '        </div>'+
            '    </div>'+
            '</div>';
        $(".follow").on("click",".followBtn",function(){
            $('body').append(html);
            followBox = $(this).parent().parent();
            infoCode = $(this);
            console.log(JSON.stringify(followBox))
        })
    },
    // 弹出框取消
    layerBtnBox: function(){
        $('body').on('click','#btnNo', function(){
            console.log("关闭窗口")
            $('.layer-del').remove();
        })
    },
    // 取消关注
    layerBtnDel: function(){
        $('body').on('click','#btnYse', function(){
            var userId = $api.getStorage("userId");
            // var userId = '13718278819';
            var waitLoading = new WaitLoading();
            var infoToken = $(infoCode).attr('code');
            waitLoading.open();
            // console.log(infoToken)
            // $(followBox).remove();
            api.ajax({
                url:url()+'selfSelectInfo/deleteSelfSelectAtHero',
                data:{
                    values:{
                        userToken:userId,
                        infoToken:infoToken,
                        infoType:2
                    }
                }
            },function(ret){
                if(ret.success){
                    commonAlertWindow({
                        message:"取消关注"
                    });
                    setTimeout(function(){
                        $('.layer-del').remove();
                        $(followBox).remove();
                        followBox = infoCode = null;
                    },1000)
                }else{
                    commonAlertWindow({
                        message:"网络异常"
                    });
                }
                waitLoading.close();
            });
        })
    },
}; 
$.binLib.followListNews = function (){
    followListAjax.followAjax();
}
