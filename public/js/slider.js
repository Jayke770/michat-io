'use strict'
const swiper = new Swiper(".post", {
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 1,
    mousewheel: true,
})
swiper.on('reachEnd', function () {
    console.log('last slide');
})
swiper.on('slideChange', function (e) {
    console.log(swiper.activeIndex)
})

//pictures 
const picture = new Swiper(".pictures", {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 2,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        type: 'fraction',
    },
})

//homepage
const slide = new Swiper(".slide", {
    direction: 'vertical',
    mousewheel: true,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
})