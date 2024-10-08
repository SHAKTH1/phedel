document.addEventListener('DOMContentLoaded', function () {
    // **Banner Slider** Code
    (function () {
        let bannerList = document.querySelector('.banner-slider .banner-list');
        let bannerItems = document.querySelectorAll('.banner-slider .banner-list .banner-item');
        let bannerDots = document.querySelectorAll('.banner-slider .banner-dots li');
        let bannerPrev = document.querySelector('.banner-slider #prev');
        let bannerNext = document.querySelector('.banner-slider #next');

        let bannerActive = 0;
        let bannerLength = bannerItems.length - 1;

        bannerNext.onclick = function () {
            if (bannerActive + 1 > bannerLength) {
                bannerActive = 0;
            } else {
                bannerActive = bannerActive + 1;
            }
            reloadBannerSlider();
        }

        bannerPrev.onclick = function () {
            if (bannerActive - 1 < 0) {
                bannerActive = bannerLength;
            } else {
                bannerActive = bannerActive - 1;
            }
            reloadBannerSlider();
        }

        let bannerAutoSlide = setInterval(() => { bannerNext.click(); }, 3000);

        function reloadBannerSlider() {
            let checkLeft = bannerItems[bannerActive].offsetLeft;
            bannerList.style.left = -checkLeft + 'px';

            let lastActiveDot = document.querySelector('.banner-slider .banner-dots li.active');
            if (lastActiveDot) lastActiveDot.classList.remove('active');
            bannerDots[bannerActive].classList.add('active');
        }

        bannerDots.forEach((li, key) => {
            li.addEventListener('click', function () {
                bannerActive = key;
                reloadBannerSlider();
            });
        });
    })();

    // **Carousel Slider** Code (in #our-process)
    (function () {
        let carousel = document.querySelector('.carousel');
        let sliderList = carousel.querySelector('.carousel .list');
        let thumbnailBorder = document.querySelector('.carousel .thumbnail');
        let carouselItems = sliderList.querySelectorAll('.carousel .list .item');
        let carouselThumbnails = thumbnailBorder.querySelectorAll('.carousel .thumbnail .item');
        let carouselPrev = carousel.querySelector('.carousel .arrows #prev');
        let carouselNext = carousel.querySelector('.carousel .arrows #next');

        let carouselActive = 0;
        let carouselLength = carouselItems.length - 1;

        carouselNext.onclick = function () {
            showCarouselSlider('next');
        }

        carouselPrev.onclick = function () {
            showCarouselSlider('prev');
        }

        let carouselAutoSlide = setInterval(() => { carouselNext.click(); }, 7000);

        function showCarouselSlider(type) {
            let activeItem = sliderList.querySelector('.carousel .list .item.active');
            let activeIndex = Array.from(carouselItems).indexOf(activeItem);

            if (activeItem) activeItem.classList.remove('active');

            if (type === 'next') {
                let nextIndex = (activeIndex + 1) % carouselItems.length;
                carouselItems[nextIndex].classList.add('active');
                sliderList.appendChild(carouselItems[activeIndex]);
                thumbnailBorder.appendChild(carouselThumbnails[0]);
                carousel.classList.add('next');
            } else {
                let prevIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
                carouselItems[prevIndex].classList.add('active');
                sliderList.prepend(carouselItems[carouselItems.length - 1]);
                thumbnailBorder.prepend(carouselThumbnails[carouselThumbnails.length - 1]);
                carousel.classList.add('prev');
            }

            clearTimeout(carouselTimeout);
            carouselTimeout = setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, 3000);

            clearTimeout(carouselAutoSlide);
            carouselAutoSlide = setInterval(() => {
                carouselNext.click();
            }, 7000);
        }

        // Initialize the first item as active
        carouselItems[0].classList.add('active');
    })();

    // Page loader
    window.addEventListener('load', function () {
        const loader = document.getElementById('page-loader');
        if (loader) loader.style.display = 'none';
    });

    // Navbar toggle button
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
    const navbarSticky = document.getElementById('navbar-sticky');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            navbarSticky.classList.toggle('show');
        });
    }

    document.getElementById('contactForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert(`Failed to send message: ${result.error}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message. Please try again later.');
        }
    });
});
