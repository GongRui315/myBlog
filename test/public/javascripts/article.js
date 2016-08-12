/**
 * Created by admin on 2016/8/11.
 */
$(function(){
    showAnArticle();
});
function addNewArticle(){

}
function editAnArticle(){

}
function showAnArticle(){
    var artId = $('#artId').attr('artId');
    var query = {'art_id':artId};
    $.post("/showArticle",query,function(response){
        var title = $('#artTitle');
        var content = $('#artContent');
        if(response){
            title.html(response.title);
            content.html(response.content);
        }
    });
}