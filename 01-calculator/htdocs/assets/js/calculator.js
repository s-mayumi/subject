$(function(){
  var output         = $('.js-output');    //表示エリア
  var inputNum       = $('.js-input-num'); //数値
  var buttonPlus     = $('.js-plus');      //プラス
  var buttonMinus    = $('.js-minus');     //マイナス
  var buttonMultiply = $('.js-multiply');  //乗算
  var buttonDivision = $('.js-division');  //除算
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
    }

    valResult = parseInt(getNum);
    output.val(valResult);
  });

  buttonPlus.on('click', function(){
    flag = '+'; //+のflagたてる
    keepNum = parseInt(valResult); //数字を押した時の値を keepNum に代入
    console.log(flag);
    console.log(keepNum);
  });

  buttonMinus.on('click', function(){
    flag = '-'; //-のflagたてる
    keepNum = parseInt(valResult); //数字を押した時の値を keepNum に代入
    console.log(flag);
    console.log(keepNum);
  });

  buttonMinus.on('click', function(){
    flag = '-'; //-のflagたてる
    keepNum = parseInt(valResult); //数字を押した時の値を keepNum に代入
    console.log(flag);
    console.log(keepNum);
  });

  buttonMultiply.on('click', function(){
    flag = '*' //*のflagたてる
    keepNum = parseInt(valResult); //数字を押した時の値を keepNum に代入
    console.log(flag);
    console.log(keepNum);
  });

  buttonDivision.on('click', function(){
    flag = '/' // /のflagたてる
    keepNum = parseInt(valResult); //数字を押した時の値を keepNum に代入
    console.log(flag);
    console.log(keepNum);
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

