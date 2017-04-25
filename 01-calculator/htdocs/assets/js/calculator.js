

$(function() {
  var output      = $('.js-output');
  var inputNum    = $('.js-input-num');
  var buttonPlus  = $('.js-plus');
  var buttonMinus = $('.js-minus');
  var buttonEqual = $('.js-equal');
  var buttonClear = $('.js-clear');
  var outputResult;
  // var valKeep; //これがないと36行目がグローバル変数になってしまう
  var valKeep = 0;
  var valKeepTotal = 0;
  var flag; //これがないと37行目がグローバル変数になってしまう


  //値の選択
  inputNum.on('click', function(){

    if ( flag ){ //flagがあればoutputの値を0にしてflugを無効化する
      output.val(0);
      flag = null;
    }

    var outputVal = output.val(); //現在のoutputの値
    var getNum = $(this).val();   //選択した値

    if( outputVal == 0 ){
      outputResult = getNum;
      outputResult = parseInt(outputResult);
    } else {
      outputResult = outputVal += getNum;
      outputResult = parseInt(outputResult);
    }

    output.val(outputResult); //入力した結果の値
  });


  //加算
  buttonPlus.on('click', function(){
    // valKeep = outputResult; //valKeepに現在の値を代入する
    flag = '+'; //+というflugを立てる

    if( valKeep == 0 ){
      valKeep = outputResult; //valKeepに現在の値を代入する
    } else {
      valKeepTotal = valKeep += outputResult;
    }
    // console.log(valKeep);
    console.log(valKeepTotal);
  });

  //減算
  buttonMinus.on('click', function(){
    flag = '-'; //-というflugを立てる

    if( valKeep == 0 ){
      valKeep = outputResult; //valKeepに現在の値を代入する
    } else {
      valKeepTotal = valKeep - outputResult;
    }

    console.log(valKeep);
    console.log(valKeepTotal);
  });

  //合計
  buttonEqual.on('click', function(){
    // output.val(valKeep);
    output.val(valKeepTotal + outputResult);
  });

  //値をクリア
  buttonClear.on('click', function(){
    output.val(0);    //表示を0にする
    valKeep = 0;
    outputResult = 0; //入力結果
    console.log(valKeep);
    console.log(outputResult);
  });
});


