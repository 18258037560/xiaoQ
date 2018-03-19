/**
 * Created by Administrator on 2017-10-23.
 */

// $('.sure').on('click',function () {
//   console.log($('textarea').val())
// });
//阻止缓存
window.onpageshow = function(e) {
  if(e.persisted) {
    location.reload()
  }
}
$().ready(function () {
  $('textarea').val('');
  $('textarea').on('input', function() {
    if($('textarea').val().trim() != '') {
      $('.sure').css('backgroundColor', '#2eb872').on('click',function () {
        $('.cHide').show();
      });
      $('.confirmCancel').on('click',function () {
        $('.cHide').hide();
      });
      $('.confirmSure').off().on('click', function() {
        if($('textarea').val().length <= 100) {
          console.log($('textarea').val().length);
          $.ajax({
            type: "get",
            url: Main.urll('/question/v1/add/questionContent?questionContent=') + $('textarea').val().toString(),
            async: true,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function(data) {
              console.log(data);
              console.log(data.msg)
              if(data.msg == '成功') {
                $('.cHide').hide();
                $('.wHide').show();
                $('.waitSure').on('click',function () {
                  $('.wHide').hide();
                  location.href = 'answer.html'
                })
              }
            },
            error: function() {
              alert('网络错误')
            }
          })
        } else {
          //				console.log($('textarea').val().length);
          alert('您输入的文字超过限制')
        }
      })
    } else {
      $('.sure').css('backgroundColor', '#cccccc').off()
    }
  });
//控制确认框高度
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
// console.log(screenHeight);
  $('.confirm').width(screenWidth*0.75);
  var confirmHeight = $('.confirm').width()*0.58;
  $('.confirm').height(confirmHeight);
// console.log($('.confirm').height());

  $('.wait').width(screenWidth*0.75);
  var waitHeight = $('.wait').width()*0.58;
  $('.wait').height(waitHeight);
// console.log(waitHeight);

  $('.xqBox').width(screenWidth*0.75);
  $('.xqBox').height(screenHeight*0.52);

  var xqHeight = $('.xqBox').height() - $('.wait').height();
  $('.xq').height(xqHeight).width(xqHeight);
// console.log($('.robot').width());
})





