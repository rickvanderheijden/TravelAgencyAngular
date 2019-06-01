$( document ).ready(function() {


});

let startHeightOfDiv = null;

$( window ).scroll(function() {

  var heightOfSelected = null;
  var heightOfScreen = $( window ).scrollTop();
  console.log(heightOfScreen);

  if($('.selected-item-card').length){
    if(startHeightOfDiv == null) {
      startHeightOfDiv = $('.selected-item-card').offset().top;
    }

    if( startHeightOfDiv < heightOfScreen) {
      $('.selected-item-card').css({
        'margin-top' : heightOfScreen - (startHeightOfDiv -40)
      });
    } else{
      $('.selected-item-card').css({
        'margin-top' : 20,
        '-webkit-transition':'all 400ms ease',
        '-moz-transition': 'all 400ms ease',
        '-ms-transition': 'all 400ms ease',
        '-o-transition': 'all 400ms ease',
        'transition': 'all 400ms ease'
      });
    }
  }
});

