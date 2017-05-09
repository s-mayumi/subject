$(function(){
  var output         = $('.js-output');    //表示エリア
  var inputNum       = $('.js-input-num'); //数値
  var buttonSymbol   = $('.js-symbol');    //記号
  var buttonEqual    = $('.js-equal');     //イコール
  var buttonClear    = $('.js-clear');     //クリア
  var valResult      = 0;                  //結果
  var keepNum        = 0;                  //flagがたった時の代入先
  var keepNumTotal   = 0;                  //計算結果
  var flag;

  // 数値キーを押した時
  inputNum.on('click', function(){

    var getNum;

    if ( valResult === 0 ) {
        getNum = $(this).val(); //押された数字の値を getNum に代入
    } else {
        getNum = valResult + $(this).val(); //画面にあった数字と押された数字を文字列結合して getNum に代入
    }

    valResult = parseInt(getNum);

    output.val(valResult);
  });


  // 記号ボタンを押した時
  buttonSymbol.on('click', function(){
    // フラグを立てる
    flag = $(this).val();

    // 記号を押す前の数字を keepNum に代入
    keepNum = parseInt(valResult);

    // 数値の入力値を0に戻す
    valResult = 0;
  });


  // イコールボタンを押した時
  buttonEqual.on('click', function(){
    switch ( flag ){
      case '+':
        keepNumTotal = keepNum + valResult;
        break;
      case '-':
        keepNumTotal = keepNum - valResult;
        break;
      case '*':
        keepNumTotal = keepNum * valResult;
        break;
      case '/':
        keepNumTotal = keepNum / valResult;
        break;
      default:
        keepNumTotal = valResult;
        break;
    }

    output.val(keepNumTotal);
    valResult = 0;
  });


  // クリアボタンを押した時
  buttonClear.on('click', function(){
    output.val(0);
    keepNum = 0;
    valResult = 0;
    flag = null;
  });
});

