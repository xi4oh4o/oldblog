var text = $('#contentToWrite').html();
var index = 1;
var textLeng = text.length;
var textTrang = "";
var textsetInt = null;
 textsetInt = setInterval(function(){
    if(index==textLeng){
        clearInterval(textsetInt);
    }else{
        if(text.charAt(index)=='<'){
            index +=4 ;
            textTrang +="<br>";
        }
        textTrang+=text.charAt(index);
        $('#myContent').html(textTrang+'<span class="xia">_</span>');
        index ++ ;
    }
    setInterval(function(){
        $('.xia').toggle();
    },100);
},100);
