/**
 * Created by Administrator on 2017-10-23.
 */
$('.write').on('click', function () {
  location.href = 'askQ.html'
});
var keyWords;
if(sessionStorage.keyWords){
  keyWords = sessionStorage.keyWords;
  sessionStorage.clear();
  $('.ipt').val(keyWords)
}else{
  keyWords = ''
}
$(function () {
  // 页数
  var page = -1;
  // 每页展示10个
  var size = 5;
  // dropload
  $('.contentDrag').dropload({
    scrollArea: window,
    loadDownFn: function (me) {
      page++;
      $.ajax({
        type: 'get',
        url: Main.urll('/answer/v1/wechat/list?searchKey=') + keyWords + '&start=' + page + '&rows=' + size,
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
          console.log(data);
          var arrLen = data.data.list.length;

          if(page ==0){
            if(arrLen==0){
              var noDt = '<div class="noDt">未搜索到相关内容</div>';
              $('.lists').append(noDt);
              // alert('没有数据')
            }
          }

          var tmp = $('#tmp').html();
          if (arrLen > 0) {
            var len = data.data.list.length;
            var dataList = data.data.list;
            // console.log(dataList);
            // console.log(len);
            // console.log(tmp);
            for (var i = 0; i < len; i++) {
              var rel_time = dataList[i].updateTime.slice(0, 10);
              console.log(rel_time);
              var relTmp = tmp.replace('{{question}}', dataList[i].questionContent)
                .replace('{{answer}}', dataList[i].answerContent)
                .replace('{{time}}', rel_time);
              $('.lists').append(relTmp);
            }
            // 如果没有数据
          } else {
            // 锁定
            me.lock();
            // 无数据
            me.noData();
            $('.dropload-down').remove();
          }
          // 为了测试，延迟1秒加载
          setTimeout(function () {
            // 插入数据到页面，放到最后面
            me.resetload();
          }, 1000);
        },
        error: function (xhr, type) {
          // alert('Ajax error!');
          // alert('网络错误');
          // 即使加载出错，也得重置
          // me.resetload();
        }
      });
    }
  });
});

var bd = document.getElementsByTagName('body')[0];
var div = document.getElementById('top');

bd.onscroll = function () {
  var toTop = document.documentElement.scrollTop || document.body.scrollTop;
  // console.log(toTop);
  if (toTop >= 800) {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
};

$('.ipt').on('click',function () {
  location.href = 'search.html'
})
$('.lists').on('click','.q_answerBox',function(){
  console.log($(this).find('.title').text());
  console.log($(this).find('.word').text());
  console.log($(this).find('.time').text());
  var detailed = {
    title:$(this).find('.title').text(),
    word:$(this).find('.word').text(),
    time:$(this).find('.time').text()
  }
  sessionStorage.detailed = JSON.stringify(detailed);
  location.href = 'detailed.html'
})

div.onclick = function () {
  (function smoothscroll() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
//      alert('回到顶部');
};