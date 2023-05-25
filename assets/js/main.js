window.addEventListener('scroll', function() {
    var sections = document.getElementsByTagName('section');
    var navLinks = document.querySelectorAll('.header .navbar a');

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 2 && window.pageYOffset < sectionTop + sectionHeight / 2) {
            // Add 'active' class to the corresponding nav link
            navLinks[i].classList.add('active');
        } else {
            // Remove 'active' class from the nav link
            navLinks[i].classList.remove('active');
        }
    }
});


const texts = ["Frontend Developer", "Experienced in Bootstrap", "Experienced in Angular","Experienced in Laravel"];
let index = 0;
let charIndex = 0;
let textElement = document.getElementById("text");
let cursorElement = document.getElementById("cursor");
 
function type() {
    if (charIndex < texts[index].length) {
        if (!cursorElement.classList.contains("typing")) {
            cursorElement.classList.add("typing");
        }
        textElement.textContent += texts[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        cursorElement.classList.remove("typing");
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorElement.classList.contains("typing")) {
            cursorElement.classList.add("typing");
        }
        textElement.textContent = texts[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        cursorElement.classList.remove("typing");
        index++;
        if (index >= texts.length) {
            index = 0;
        }
        setTimeout(type, 50);
    }
}

document.addEventListener("DOMContentLoaded", type);




// carousel 
// carousel
const wrappers = document.querySelectorAll(".wrapper");
wrappers.forEach((wrapper) => {
  const carousel = wrapper.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = wrapper.querySelectorAll("i");
  const carouselChildrens = [...carousel.children];

  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to the beginning of carousel for infinite scrolling
  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  // Insert copies of the first few cards to the end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false, return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    // Clear existing timeout and start autoplay if the mouse is not hovering over the carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if the window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
  };
  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
});
