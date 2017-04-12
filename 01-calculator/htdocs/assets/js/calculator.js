

$(function() {
  var output      = $('.js-output');
  var inputNum    = $('.js-input-num');
  var buttonPlus  = $('.js-plus');
  var buttonClear = $('.js-clear');
  var outputResult;
  var valKeep;
  var flag;


  //値の選択
  inputNum.on('click', function() {

    if ( flag ){ //flagがあればoutputのval値を0にしてflugを無効化する
      output.val(0);
      flag = null;
    }

    var outputVal = output.val(); //現在のoutputのval値
    var getNum = $(this).val();   //選択したval値

    if( outputVal == 0 ){
      outputResult = getNum;
    } else {
      outputResult = outputVal += getNum;
    }

    output.val(outputResult); //結果のval値
  });


  //加算
  buttonPlus.on('click', function() {
    valKeep = outputResult;
    flag = '+';
    console.log(valKeep);
  });


  //値をクリア
  buttonClear.on('click', function() {
    output.val(0);
  });
});


