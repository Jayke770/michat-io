'use strict'
const swiper = new Swiper(".mi_chat_post", {
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 1,
    mousewheel: true,
})
swiper.on('reachEnd', function () {
    console.log('last slide');
})
swiper.on('slideChange', function (e) {
    console.log(e);
})