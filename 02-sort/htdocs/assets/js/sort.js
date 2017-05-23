$(function(){
  var changeBtn = $('.js-sort01-change');

  changeBtn.on('click', function(){
    var cntPrev = $(this).prev('div'); //直前の要素を指定
    var cntNext = $(this).next('div'); //直後の要素を指定

    $(this).before(cntNext); //CHANGEボタンの前に直後の要素を移動
    $(this).after(cntPrev); //CHANGEボタンの後に直前の要素を移動
  });
});