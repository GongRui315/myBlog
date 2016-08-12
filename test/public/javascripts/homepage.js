/**
 * Created by admin on 2016/8/11.
 */
$.post('/getAllArticles',function(response){
    makeList(response);
});
function makeList(response){
    var main = $('.main-left');
    var length = response.length;
    var str = '';
    if (length>0){
        for(var i=0;i<length;i++){
            var comment = '';
            var comLen = 0 ;
            var commentList = response[i].comments;
            if(commentList)
                comLen = commentList.length;
            for(var j=0;j<comLen;j++){
                comment += '<div class="comment-list-one"> <p>'  + commentList[j].text + '</p> <p>by <span>' + commentList[j].name + '</span></p> </div>'
            }
            str += '<div class="one-article" artId="' + response[i].art_id + '"> ' +
                '<div class="one-title">' + response[i].title + '<span> <a onclick="editAnArticle(this);">编辑文章</a> </span> </div> ' +
                '<div class="one-content">' + response[i].content + ' </div> ' +
                '<div class="one-comment"> <a>评论(<span class="commentNum">' + comLen + '</span>)</a> ' +
                '<div class="comment-list"> ' +
                comment +
                ' </div> </div> </div>';
        }
    }
    main.html(str);
}
function editAnArticle(obj){
    var oneArt = $(obj).parent().parent().parent();
    var artId = oneArt.attr('artId');
    location.href = '/editArticle?id='+artId;
    //$.get('/editArticle?id='+artId,function(response){
    //
    //});
}