$(function(){
  $('#pumpkin-form').on('submit', function(event){
    event.preventDefault();
    var error = $('.error');
    error.html('');
    var form = $(this);

    var red = form.find('#red').val();
    var green = form.find('#green').val();
    var blue = form.find('#blue').val();
    var hex = form.find('#hex-value').val();
    var quick = form.find('#quick-pick').val();

    console.log(red, green, blue, hex, quick);

    if((!red || !green || !blue) && !hex && !quick){
      //add error message for one must be filled out here
      error.html('<p>Either red, green, AND blue, OR hex, OR the dropdown must have a value!</p>');
      return;
    } else {
      if(red){
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
          error.html('<p>Red, green, AND blue must be filled out together, with values between 0 and 255!</p>');
          return;
        }
      }
      if(hex){
        var hexTest = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
        var hexMatch = hexTest.test(hex);
        if(!hexMatch){
          //add error message here about how hex must be valid
          error.html('<p>Hex must be a valid CSS hex value (#, followed by 3 or 6 0-9 or a-f characters, case insensitive)!</p>');
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