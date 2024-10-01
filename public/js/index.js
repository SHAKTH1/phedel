//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    let activeItem = SliderDom.querySelector('.carousel .list .item.active');
    let activeIndex = Array.from(SliderItemsDom).indexOf(activeItem);
    
    // Remove the active class from the current item
    activeItem.classList.remove('active');
    
    if(type === 'next'){
        let nextIndex = (activeIndex + 1) % SliderItemsDom.length;
        SliderItemsDom[nextIndex].classList.add('active');
        SliderDom.appendChild(SliderItemsDom[activeIndex]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        let prevIndex = (activeIndex - 1 + SliderItemsDom.length) % SliderItemsDom.length;
        SliderItemsDom[prevIndex].classList.add('active');
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    } 
    
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Initialize the first item as active
document.querySelector('.carousel .list .item').classList.add('active');

//page loader 
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    loader.style.display = 'none';
});

const toggleButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
const navbarSticky = document.getElementById('navbar-sticky');

toggleButton.addEventListener('click', () => {
  navbarSticky.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const logos = document.querySelector(".logos");
  
    // Clone the logos to create an infinite loop effect
    const clone = logos.cloneNode(true);
    slider.appendChild(clone);
  });
  

  let list = document.querySelector('.banner-slider .banner-list');
  let items = document.querySelectorAll('.banner-slider .banner-list .banner-item');
  let dots = document.querySelectorAll('.banner-slider .banner-dots li');
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');
  
  let active = 0;
  let lengthitems = items.length - 1;
  
  next.onclick = function() {
      if (active + 1 > lengthitems) {
          active = 0;
      } else {
          active = active + 1;
      }
      reloadslider();
  }
  
  prev.onclick = function() {
      if (active - 1 < 0) {
          active = lengthitems;
      } else {
          active = active - 1;
      }
      reloadslider();
  }
  
  let autoslide = setInterval(() => { next.click(); }, 3000);
  
  function reloadslider() {
      let checkleft = items[active].offsetLeft;
      list.style.left = -checkleft + 'px';
  
      let lastactiveDot = document.querySelector('.banner-slider .banner-dots li.active');
      if (lastactiveDot) lastactiveDot.classList.remove('active');
      dots[active].classList.add('active');
  }
  
  dots.forEach((li, key) => {
      li.addEventListener('click', function() {
          active = key;
          reloadslider();
      });
  });
  