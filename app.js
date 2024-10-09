// Handle the before-after slider functionality
function initBeforeAfterSlider(slider) {
  const sliderHandle = slider.querySelector('.slider-handle');
  const dragButton = slider.querySelector('.drag-button'); // Select the drag button
  const afterImage = slider.querySelector('.after-img');
  const leftText = slider.querySelector(".slider-text-left")
  const rightText = slider.querySelector(".slider-text-right")
  const slideText = slider.querySelector(".slider-text")

  // configurables
  const initialSliderPosition = 0.76
  const sliderTextThreshold = .25

  const doMove = (offsetX) => {
    
    console.log("Offset X is " + offsetX)

    const sliderWidth = slider.offsetWidth;
    const newOffsetX = Math.max(0, Math.min(offsetX, sliderWidth)); // Keep within bounds

    sliderHandle.style.left = `${newOffsetX}px`;
    dragButton.style.left = `${newOffsetX}px`; // Move the drag button
    afterImage.style.clip = `rect(0px, ${newOffsetX}px, 400px, 0px)`; // Update image clipping
    
    // update the correct text
    if (newOffsetX < (sliderWidth * sliderTextThreshold)) {
      // below low end of threshold
      // should i set rightText to true here? intermediate value theorem says i don't
      leftText.hidden = false
      slideText.hidden = false 
    } else if (newOffsetX > (sliderWidth * (1 - sliderTextThreshold)) ) {
      // above high end of threshold
      rightText.hidden = false
      slideText.hidden = false  
    } else {
      leftText.hidden = true
      rightText.hidden = true
      slideText.hidden = true
    }
  };

  const handleMove = (e) => {
    const rect = slider.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;
    doMove(offsetX);
  };

  // Add event listeners for both the slider handle and the drag button
  const startDrag = () => {
    document.addEventListener('mousemove', handleMove);
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', handleMove);
  };

  sliderHandle.addEventListener('mousedown', startDrag);
  dragButton.addEventListener('mousedown', startDrag); // Start dragging from the button

  document.addEventListener('mouseup', stopDrag);

  // Initialize to the middle of the slider
  doMove((slider.getBoundingClientRect().right - slider.getBoundingClientRect().left) * initialSliderPosition);
}



function changeImg(increment) {
  const slides = document.querySelectorAll('div.slider');
  slides[currentImg].classList.remove('active');

  currentImg += increment;
  if (currentImg >= slides.length) {
    currentImg = 0;
  } else if (currentImg < 0) {
    currentImg = slides.length - 1;
  }

  slides[currentImg].classList.add('active');
  initBeforeAfterSlider(slides[currentImg]); // Reinitialize slider for the new image
}

// Start of Copy/Paste Java Script
// Copy Button Functionality
function copyText(event) {
  var button = event.target;
  var paragraph = button.previousElementSibling;
  var textToCopy = paragraph.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
      button.innerHTML = '<i class="fa fa-clone" aria-hidden="true"></i> Copied!';
      setTimeout(function() {
          button.innerHTML = '<i class="fa fa-clone" aria-hidden="true"></i> Copy';
      }, 2000);
  });
}

var currentImg = 0;
window.addEventListener("load", function() {
  changeImg(currentImg);

  var buttons = document.querySelectorAll('.button');
  buttons.forEach(function(button) {
      button.addEventListener('click', copyText)
  });
});