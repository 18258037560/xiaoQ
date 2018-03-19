/**
 * Created by Administrator on 2017-10-23.
 */
if (localStorage.content) {
  var realAry = JSON.parse(localStorage.content);
  console.log(realAry);
  var len = realAry.length;
  console.log(len);
  var historyList = '<div class="historyList">' + '{{content}}' + '</div>';
  if (len > 8) {
    for (var i = len - 1; i >= len - 8; i--) {
      var relList = historyList.replace('{{content}}', realAry[i]);
      $('.listContainer').append(relList).off().on('click', '.historyList', function () {
        $('#search').val($(this).text());
        if ($('#search').val().trim()) {
          sessionStorage.keyWords = $('#search').val().trim();
            var relAry = JSON.parse(localStorage.content);
            var aryLen = relAry.length;
            for(var i = 0;i < aryLen;i++){
              if($('#search').val().trim() == relAry[i]){
                console.log(i);
                relAry.splice(i,1);
                relAry.push($('#search').val().trim());
                localStorage.content = JSON.stringify(relAry);
                break;
              }
            }
        }
        location.href = 'answer.html';
        setTimeout(function () {
          $('.layer').hide()
        }, 100)
      });
    }
  } else {
    for (var i = len - 1; i >= 0; i--) {
      var relList = historyList.replace('{{content}}', realAry[i]);
      $('.listContainer').append(relList).off().on('click', '.historyList', function () {
        $('#search').val($(this).text());
        if ($('#search').val().trim()) {
          sessionStorage.keyWords = $('#search').val().trim();
          var relAry = JSON.parse(localStorage.content);
          var aryLen = relAry.length;
          console.log(aryLen);
          var changeIndex = aryLen -1 - $(this).index();
          relAry.splice(changeIndex,1);
          relAry.push($('#search').val().trim());
          localStorage.content = JSON.stringify(relAry)
        }
        location.href = 'answer.html'
        setTimeout(function () {
          $('.layer').hide()
        }, 100)
      });
    }
  }
}
$('.ipt').on('blur', function () {
  $('.layer').show();
});
$('.ipt').on('focus', function () {
  $('.layer').hide();
});

$('#search').on('keydown', function (e) {
  var e = e || window.event;
  //监听按的是不是回车键
  if (e.keyCode == 13) {
    // alert($('#search').val())
    if ($('#search').val().trim()) {
      sessionStorage.keyWords = $('#search').val().trim();
      if (localStorage.content) {
        var relAry = JSON.parse(localStorage.content);
        var aryLen = relAry.length;
        console.log(aryLen);
        //去重
        for(var i = 0; i < aryLen; i++) {
          //这是去除重复的
          if($('#search').val().trim() == relAry[i] ) {
            console.log(relAry[i]);
            console.log(i);
            relAry.splice(i,1);
            relAry.push($('#search').val().trim());
            localStorage.content = JSON.stringify(relAry);
            break;
          }else if(i == aryLen -1){
            //这部分是筛选以后没有重复的直接新增的
            if($('#search').val().trim() != relAry[i]){
              relAry.push($('#search').val().trim());
              localStorage.num = Number(localStorage.num) + 1;
              localStorage.content = JSON.stringify(relAry);
            }
          }
        }
      }else{
        localStorage.num = 1;
        var ary = [];
        ary.push($('#search').val().trim());
        localStorage.content = JSON.stringify(ary);
      }
    }
    location.href = 'answer.html'
  }
});

$('#search').on('input', function () {
  if ($('#search').val()) {
    $('.cha').show()
  } else {
    $('.cha').hide()
  }
})
$('.cha').on('click', function () {
  $('#search').val('');
  $('.cha').hide()
});
$('#search').on('keypress', function (e) {
  var e = window.event || e;
  if (e.keyCode == 13 || e.which == 13) {
    return false;
  }
})

