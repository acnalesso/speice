$(function() {
  var socket = io.connect(document.URL);
  var slides = $('div#presentation div');
  var totalOfSlides = slides.length
  var previousSlide = 0;
  var currentSlide = 0;
  var nextSlide = 1;
  window.verticalPosition = 0;
  var scrolling = false;
  var scroller;

  slides.first().show();

  window.previous = function() {
    if (currentSlide > 0) {
      if (typeof(slides[currentSlide]) !== 'undefined') {
        $(slides[previousSlide]).fadeIn();
        $(slides[currentSlide]).hide();
        currentSlide--;
        previousSlide = currentSlide-1;
        nextSlide = currentSlide+1;
      }
    }
  };

  window.next = function() {
    if (currentSlide < totalOfSlides) {
      if (typeof(slides[nextSlide]) !== 'undefined') {
        $(slides[currentSlide]).hide();
        $(slides[nextSlide]).fadeIn();
        nextSlide++;
        previousSlide = currentSlide;
        currentSlide = nextSlide-1;
      }
    }
  };

  window.up = function() {
    window.scrollTo(0, verticalPosition+=25);
  }

  window.down = function() {
    window.scrollTo(0, verticalPosition-=25);
  }

  socket.on('change', function(data) {
    // CHANGE: When scrolling is true it should be scrolling Y until another UP or DOWN is pressed.
    if (scrolling) { scrolling = false; clearInterval(scroller); }
    if (data.loop) {
      scrolling = true;

      scroller = setInterval(function() {
        if (data.keyCode === 38) {
          verticalPosition += 25;
          up();

          if (window.pageYOffset <= verticalPosition) {
            if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
              clearInterval(scroller);
              scrolling = false;
            }
          }
        }


        if (data.keyCode === 40) {
          verticalPosition -= 25;
          down();

          if (window.pageYOffset === 0) {
            verticalPosition = 0;
            clearInterval(scroller);
            scrolling = false;
          }

        }
      }, 150);
    }

    if (data.keyCode === 37) {
      window.scrollTo(0, verticalPosition=0);
      previous();
    }

    if (data.keyCode === 38) {
      if (window.pageYOffset <= verticalPosition)
        //checks whether we have reched the bottom of the page
        if (!(window.pageYOffset + window.innerHeight >= document.body.scrollHeight))
          up();
    }

    if (data.keyCode === 39) {
      window.scrollTo(0, verticalPosition=0);
      next();
    }

    if (data.keyCode === 40) {
      if (window.pageYOffset > 0)
        down();
    }
  });

  $(document).on('keydown', function(e) {
    var keyCode = e.keyCode;

    // <------
    if (keyCode === 37 )
      previous();

    if (keyCode === 38 )
      up();

    // ------->
    if (keyCode === 39)
      next();

    if (keyCode === 40)
      down();
  });

});
