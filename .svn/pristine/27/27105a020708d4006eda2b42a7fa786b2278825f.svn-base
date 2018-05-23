var themeSearch = {
    init:function(){
        this.getCursor();
        this.renderData();
        this.themeDetails();
    },
    getCursor:function(){
        var searchColumn=$('#searchColumn');
        searchColumn.click(function(){
            // console.log(111111111)
            openWindow('moreThemeRankingSearch',{},'push');
        })
    },
    //渲染数据
    renderData:function(){
        var $this=this;
        var waitLoading = new WaitLoading();
        waitLoading.open();
        api.ajax({
            url:url()+'selfSelectInfo/showAllInfo'
        },function(ret){

            console.log(JSON.stringify(ret))
            //var newConcept =ret.newConcept;
            var conceptClassify=ret.conceptClassify.result;
            //var newHtml='';       conceptClassify
            var showAllHtml='';
            if(ret.success){
                waitLoading.close();
                //最新主题
               /* if(newConcept.length != 0){
                    for(var i=0;i<newConcept.length;i++){
                        var info=newConcept[i];
                        newHtml+='<span class="themeShow" data-Id="'+info.id+'">'+info.conceptStockName+'</span>'
                    }
                    $('.searchCont').html(newHtml);
                }
                else{
                    $('#newestTheme').hide();
                }*/
                //主题分类
                for(var i=0;i<conceptClassify.length;i++){
                    var info=conceptClassify[i];
                    var concepList=info.concepList;
                    showAllHtml+='<li>' +
                        '            <h4>'+info.identify+'</h4>' +
                        '            <div class="contentList bindClick">'+$this.forTheme(concepList)+'</div>' +
                        '         </li>'
                }
                $('.themeClassification ul').html(showAllHtml);
            }
            else{
                $('#newestTheme').hide();
            }
        })
    },
    //显示每一个主题
    forTheme:function(themeList){
        var themeHtml='';
        for(var i=0;i<themeList.length;i++){
            var info=themeList[i];
            themeHtml+='<span class="themeShow" data-Id="'+info.id+'">'+info.conceptStockName+'</span>'
        }
        return themeHtml;
    },
    //进入到主题详情
    themeDetails:function(){
        $('.bindClick').on('click','.themeShow',function(){
            var li=$(this);
            var id=li.attr('data-Id');
            var themeName=li.text();
            openWindow('themeDetails',{
                id:id,
                themeName:themeName
            })
        })
    }
}
