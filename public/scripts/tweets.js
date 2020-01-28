$(document).ready(function() {
  $(".tweet").hover(function() {
    $(this).css("box-shadow", "10px 10px 10px #d3d3d3")
  }, function() {
    $(this).css("box-shadow", "0px 0px")
  })
});