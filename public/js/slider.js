'use strict'
const swiper = new Swiper(".post", {
    direction: 'vertical',
    spaceBetween: 1,
    slidesPerView: 1,
    mousewheel: true,
})
swiper.on('reachEnd', function () {
    console.log('last slide');
})
swiper.on('slideChange', function (e) {
    console.log(swiper.activeIndex)
})