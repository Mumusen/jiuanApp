//点击日期出现下拉框
function clickDate(){
    var showDate=$('.show-date');
    var li=$('.popupsList').find('li');
    showDate.on('click',function(){
        $('.bind-mark').show();
        $('.popupsList').show();
        li.on('click',function(){
            li.removeClass('active');
            $(this).addClass('active');
            showDate.find('b').html($(this).html());
            $('.popupsList').hide();
            $('.bind-mark').hide();
        });
        $('.bind-mark').click(function(){
            $('.popupsList').hide();
            $(this).hide();
        })
    })
}

//元转化为亿
function yuanToYi(n){
    if( n == 0){
        return 0
    }
    else{
        return (n/100000000).toFixed(2);
    }
}
//元转化为万
function yuanToWan(n){
    if( n == 0){
        return 0
    }
    else{
        return (n/10000).toFixed(2);
    }
}

//格式化时间   2018-02-24  => 02/24
function cTime(time){
    var nTime=time.split('-');
    var str=nTime[1]+'/'+nTime[2];
    return str;
}
//判断正负值颜色
function changeColor(){
    var percentage=$('.percentage');
    var valueColor=$('.valColor');
    percentage.each(function(i,item){
        var percentageVal=$(this).html().replace('%','')*1; //带百分号的
        percentageVal < 0 ? percentage.eq(i).addClass('colorBlue') : percentage.eq(i).addClass('colorRed');
    });
    valueColor.each(function(i,item){
        var valColor=$(this).text()*1; //不带百分号的
        valColor < 0 ? valueColor.eq(i).addClass('colorBlue') : valueColor.eq(i).addClass('colorRed');
    })
}
function toDub(n){
    return n < 10 ? '0'+n : ''+n ;
}
function replaceNull(name){
    if(name == null){
     return '未上榜'
    }
    else {
        return name
    }
}
function changeTime(str){
    if(str != null){
        var oDate = new Date(parseInt(str));
        var year= oDate.getFullYear();
        var month= oDate.getMonth()+1;
        var day = oDate.getDate();
        return year +'/'+toDub(month)+'/'+toDub(day)+'上榜';
    }
    else{
       return '无上榜记录';
    }
}

