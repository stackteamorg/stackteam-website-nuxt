<template>
    <section class="tf__testimonial pt_100 pb_100" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-md-8 m-auto">
            <div class="tf__common_heading">
              <h6>تستمونیال</h6>
              <h2>تجربیات مشتریان</h2>
            </div>
          </div>
        </div>
        <div class="tf__single_testimonial">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="30"
            :navigation="{
              nextEl: '.fi-rr-arrow-left',
              prevEl: '.fi-rr-arrow-right',
            }"
            :loop="true"
            class="testi_slider"
          >
            <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
              <div class="tf__testimonial_item">
                <div class="tf__testimonial_img">
                  <img
                    :src="testimonial.image"
                    alt="testimonial"
                    class="img-fluid w-100"
                  />
                </div>
                <div class="tf__testimonial_text">
                  <h4>{{ testimonial.title }}</h4>
                  <p>{{ testimonial.description }}</p>
                  <div class="tf__calients_name">
                    <h6>{{ testimonial.name }}</h6>
                    <p>{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="navigation">
            <i class="fi fi-rr-arrow-left"></i>
            <i class="fi fi-rr-arrow-right"></i>
          </div>
          
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination } from 'swiper/modules';
  import 'swiper/swiper-bundle.css';
  
  const modules = [Navigation, Pagination];
  
  const testimonials = [
    {
      image: '/images/testimonial_img.jpg',
      title: 'سایتم سریع‌تر و حرفه‌ای‌تر از همیشه!',
      description: 'بعد از طراحی مجدد سایتم، سرعت بارگذاری و تجربه کاربری به شدت بهبود پیدا کرد. تیم حرفه‌ای و پشتیبانی عالی داشتن!',
      name: 'علی رضایی',
      role: 'مدیر فروشگاه اینترنتی',
    },
    {
      image: '/images/testimonial_img.jpg',
      title: 'یک وبسایت عالی برای کسب‌وکارم',
      description: 'طراحی مدرن و واکنش‌گرا، دقیقاً همونی بود که نیاز داشتم! حالا مشتری‌هام راحت‌تر از قبل به خدمات من دسترسی دارن.',
      name: 'سارا احمدی',
      role: 'صاحب کسب‌وکار',
    },
    {
      image: '/images/testimonial_img.jpg',
      title: 'پشتیبانی قوی و طراحی بی‌نقص',
      description: 'تیم طراحی خیلی حرفه‌ای عمل کرد و پشتیبانی بعد از راه‌اندازی سایت هم فوق‌العاده بود. پیشنهادشون می‌کنم!',
      name: 'مهدی شایان',
      role: 'برنامه‌نویس و توسعه‌دهنده وب',
    },
  ];
  </script>
  
  <style scoped>
  .navigation {
    position: absolute;
    left: 0;
    margin-left: 20px;
  }
  .navigation i {
    margin: 10px;
    color: #000000;
    cursor: pointer;
  }
  .navigation i:hover {
    color: #ff8565;
  }
  </style>