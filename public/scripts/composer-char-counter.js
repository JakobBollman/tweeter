$(document).ready(function() {
  $("textarea").on('input', function() {
    let outputVal = 140 - this.value.length;
    $('output').html(outputVal);
    if (outputVal < 0) {
      $('output').css("color", "red");
    } else {
      $('output').css("color", "black");
    }
  });

  $('#error-box').hide();

});