/**
 * Created by Administrator on 2017-10-25.
 */
if(sessionStorage.detailed){
  // console.log(sessionStorage.detailed);
  var detailed = JSON.parse(sessionStorage.detailed);
  sessionStorage.clear();
  // console.log(detailed);
  var $tmpStr = $('#detailed').html();
  // console.log($tmpStr)

  var realStr = $tmpStr.replace('{{question}}',detailed.title)
    .replace('{{answer}}',detailed.word)
    .replace('{{time}}',detailed.time);

$('.container').append(realStr)
}
