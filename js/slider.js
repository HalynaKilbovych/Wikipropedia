const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    breakpoints: { 
      320: { 
        slidesPerView: 1,
      },
    },
    spaceBetween: 40,

    slidesPerGroup: 1,
  }); 