var newLists = {
    newsList: function(){
        this.newsAjax(1,1);
        this.news();
        this.newsTab();
        // this.tabChoic();
    },
    // 页面高度渲染
    news: function(){
        $('.mynew-list li .li').each(function(){
            var textStr = $(this).text().length;
            var txt = textStr/22 * 20;
            var txtH = txt + 'px';
            var boxH = txt + 50 + 'px';
            // console.log(textStr)
            // console.log(txt)
            // console.log($(this).parent())
            $(this).height(txt)
            $(this).parent().height(boxH)
        })
    },
    // tab 
    newsTab: function() {
        var bindthis = this;
        var $li = $('#tabChoice span');
        var $ul = $('#tabBox .list-box');
        $ul.css('display', 'none');
        $ul.eq(0).css('display', 'block');
        $li.mouseover(function() {
            var $this = $(this);
            var $t = $this.index();
            $li.removeClass();
            $this.addClass('active');
            $ul.css('display', 'none');
            $ul.eq($t).css('display', 'block');
            if($t === 0){
                $t = 1;
              }else{
                $t = 2;
              }
              inFo = $t;
            //   console.log(inFo)
              bindthis.newsAjax(1,inFo);
        })
    },
    // 滑动or删除
    tabChoic: function() {
        setTimeout(function() {
            $('.btn').show();
        }, 1000);
        var _this = this;
        var expansion = null; //是否存在展开的list
        var container = document.querySelectorAll('.list li .li');
        for (var i = 0; i < container.length; i++) {
            var x, y, X, Y, swipeX, swipeY;
            container[i].addEventListener('touchstart', function(event) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            swipeX = true;
            swipeY = true;
            if (expansion) { //判断是否展开
                expansion.className = "li";
            }
            // 删除
            $('.btn').on('click', function() {
                // console.log(JSON.stringify($(this).parent()))
                var _li = $(this).parent('li');
                var ids = _li.attr('ids');
                // console.log(ids)
                // $(_li).remove()
                api.ajax({
                    url:url() + 'visitorStock/deleteMsgForApp',
                    data:{
                        values:{
                            qutouPhone:$api.getStorage("userId"),
                            ids:ids
                        }
                    }
                },function(ret,err) {
                    if(ret.success === true){
                        $(_li).remove();
                        commonAlertWindow({
                            message:'删除成功'
                        })
                        setTimeout(function(){
                            location.reload();
                        },2000);
                    }else{
                        commonAlertWindow({
                            message:'请求失败'
                        })
                    }
                })
            })
        });
        container[i].addEventListener('touchmove', function(event) {
            X = event.changedTouches[0].pageX;
            Y = event.changedTouches[0].pageY;
            // 左右滑动
            if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
                // 阻止事件冒泡
                event.stopPropagation();
                if (X - x > 10) { //右滑
                event.preventDefault();
                this.className = "li"; //右滑收起
                }
                if (x - X > 10) { //左滑
                event.preventDefault();
                this.className = "li swipeleft"; //左滑展开
                expansion = this;
                }
                swipeY = false;
            }
            // 上下滑动
            if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                swipeX = false;
            }
            });
        }
    },
    //消息页面发起数据请求
    newsAjax: function (pageNum,per) {
        var html = '';
        var $this = this;
        var userId = $api.getStorage("userId");
        $('.newList li').remove(html)
        // console.log(pageNum+'222'+per+'222'+userId)
        var waitLoading = new WaitLoading();
        waitLoading.open();
        // var listObj = {};
        api.ajax({
            url:url() + 'member_index/findSystemMessageForApp',
            data:{
                values:{
                    themePhone:userId,
                    no:pageNum,
                    type:per
                }
            }
        }, function (ret,err) {
            // console.log(JSON.stringify(ret))
            var msgList = ret.msgList;
            var articles = ret.articles;
            // console.log(JSON.stringify(ret))
            if(ret.success === true){
                // console.log(true)
                // $('#totalCount').val(ret.totalCount);
                if(ret.totalCount != 0){
                    // console.log('xuanran')
                    // if(msgList.length !== 0){
                        if(ret.msgList){
                            console.log("个人消息")
                            for(var i = 0;i<msgList.length;i++) {
                                var msg = msgList[i];
                                console.log(JSON.stringify(msg))
                                html += $this.mynewHtml(msg);
                            }
                            waitLoading.close();
                            $('.mynew-list').append(html);
                            $this.tabChoic();
                        }else{
                            console.log('系统消息渲染')
                            for(var i = 0;i<articles.length;i++) {
                                var msg = articles[i];
                                console.log(JSON.stringify(msg))
                                html += $this.sysnewHtml(msg);
                            }
                            waitLoading.close();
                            $('.system-list').append(html);
                            $this.tabChoic();
                        }
                }else{
                        console.log("暂无消息")
                        waitLoading.close();
                        $('.newList').append(
                            '            <li>'+
                            '                <p>- - 暂无消息 - -</p>'+
                            '            </li>'
                        );
                    // }                    
                }
                
            }else{
                commonAlertWindow({
                    message:ret.errMsg
                });
            }
        })
    },
    mynewHtml:function(msg){
        var html;
        html =
        '            <li ids="'+msg[0]+'">'+
        '                <p>'+msg[3]+'</p>'+
        '                <div class="li">'+msg[1]+'</div>'+
        '                <i class="btn"></i>'+
        '            </li>';
        return html;
    },
    sysnewHtml:function(msg){
        var html;
        html =
        '            <li ids="'+msg.id+'">'+
        '                <p>'+msg.createTime+'</p>'+
        '                <div class="li">'+delHtmlNews(msg.context)+'</div>'+
        '                <i class="btn"></i>'+
        '            </li>';
        return html;
    }
}
$.binLib.userNews = function (){
    newLists.newsList();
}