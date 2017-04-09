$(function() {
  // var numArray = [];
  var output    = $('.js-output');
  var outputVal = $('.js-output').val();
  var inputNum  = $('.js-input-num');
  var clear     = $('.js-clear');

  //値の選択
  inputNum.on('click', function() {
    $(this).each(function() {
      // console.log($(this).val());

      var getNum = $(this).val();

      console.log(getNum);

      if( outputVal === 0 ){
        // console.log(outputVal);
        output.val(outputVal);
      } else {
        console.log(outputVal);
        output.val(outputVal += getNum);
      }
    });
  });








  //値をクリア
  clear.on('click', function() {
    output.val('0');
  });
});