$(document).ready(function() {
  $("textarea").on("keyup", function() {
    const charCount = 140 - this.value.length;
    $("form").find(".counter").text(charCount);
    if (charCount >= 0) {
      $("form").find(".counter").css("color", "#545149");
    } else if (charCount < 0) {
      $("form").find(".counter").css("color", "red");
    }
  })
});

