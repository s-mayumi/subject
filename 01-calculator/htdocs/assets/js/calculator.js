$(function(){
  var output         = $('.js-output');    //表示エリア
  var inputNum       = $('.js-input-num'); //数値
  var buttonSymbol   = $('.js-symbol');    //記号
  var buttonEqual    = $('.js-equal');     //イコール
  var buttonClear    = $('.js-clear');     //クリア
  var valResult      = 0;                  //結果
  var keepNum        = 0;                  //flagがたった時の代入先
  var keepNumTotal   = 0;                  //最終結果
  var flag;

  inputNum.on('click', function(){
    var getNum = $(this).val(); //押された数字の値を getNum に代入

    if( flag ){
      output.val(0);
      // flag = null;
      console.log(flag);
    }

    valResult = parseInt(getNum);
    output.val(valResult);
    console.log(flag);
    console.log(keepNum);
    console.log(valResult);
  });

  buttonSymbol.on('click', function(){
    flag = $(this).val();
    keepNum = parseInt(valResult); //記号を押す前の数字を keepNum に代入
    // console.log(flag);
    // console.log(keepNum);
  });

  buttonEqual.on('click',function(){
    if( flag == '+' ){
      keepNumTotal = keepNum += valResult;
    } else if( flag == '-' ){
      keepNumTotal = keepNum -= valResult;
    } else if( flag == '*' ){
      keepNumTotal = keepNum *= valResult;
    } else if( flag == '/' ){
      keepNumTotal = keepNum /= valResult;
    }
    output.val(keepNumTotal);
  });

  buttonClear.on('click', function(){
    output.val(0);
    keepNum = '0';
    console.log(keepNum);
  });
});

