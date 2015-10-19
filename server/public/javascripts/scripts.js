$(function(){
  $('#pumpkin-form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);

    var red = form.find('#red').val();
    var green = form.find('#green').val();
    var blue = form.find('#blue').val();
    var hex = form.find('#hex-value').val();
    var quick = form.find('#quick-pick').val();

    console.log(red, green, blue, hex, quick);

    if((!red || !green || !blue) && !hex && !quick){
      //add error message for one must be filled out here
      return;
    } else {
      if(red && green && blue){
        var numCheck = /^[0-2]?[0-9]?[0-9]$/;
        var redMatch = numCheck.test(red);
        var greenMatch = numCheck.test(green);
        var blueMatch = numCheck.test(blue);
        if(redMatch && greenMatch && blueMatch){
          red = parseInt(red, 10);
          green = parseInt(green, 10);
          blue = parseInt(blue, 10);
          redMatch = red < 256;
          greenMatch = green < 256;
          blueMatch = blue < 256;
        }

        if(!redMatch || !greenMatch || !blueMatch){
          //add error message here about how red green and blue must be ints between 0 and 256
          return;
        }
      }
      if(hex){
        var hexTest = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
        var hexMatch = hexTest.test(hex);
        if(!hexMatch){
          //add error message here about how hex must be valid
          return;
        }
      }
      $.ajax({
        url: '/addColor',
        method: 'POST',
        data: form.serialize(),
        success: function(){
          console.log('yay!');
        },
        error: function(){
          console.log('nay!');
        }
      });
    }
  })
});