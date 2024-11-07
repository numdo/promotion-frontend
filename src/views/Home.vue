<template>
  <div>
    <!-- Swiper 슬라이더 -->
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{
        delay: 10000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="mySwiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" :alt="slide.title" />
        <div class="slide-caption">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- 컨텐츠 섹션 -->
    <section v-for="(content, index) in contents" :key="index" class="content-section">
      <div dat-aos='fade-right' class="container">
        <h2>{{ content.title }}</h2>
        <p>{{ content.description }}</p>
      </div>
    </section>

    <!-- Contact 섹션 -->
    <section class="contact-section">
      <div class="container">
        <h2>Contact Us</h2>
        <!-- 연락처 정보 또는 폼 추가 -->
        <p>여기에 연락처 정보를 입력하세요.</p>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// 필요한 모듈 임포트
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

// 이미지 임포트
import slide1 from '@/assets/img/main-1.jpg';
import slide2 from '@/assets/img/main-2.jpg';
import slide3 from '@/assets/img/main-3.jpg';

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const modules = [Autoplay, Navigation, Pagination, Scrollbar];

    const slides = [
      {
        image: slide1,
        title: '슬라이드 제목 1',
        description: '슬라이드 설명 1',
      },
      {
        image: slide2,
        title: '슬라이드 제목 2',
        description: '슬라이드 설명 2',
      },
      {
        image: slide3,
        title: '슬라이드 제목 3',
        description: '슬라이드 설명 3',
      },
    ];

    const contents = [
      {
        title: '컨텐츠 제목 1',
        description: '컨텐츠 내용 1',
      },
      {
        title: '컨텐츠 제목 2',
        description: '컨텐츠 내용 2',
      },
      {
        title: '컨텐츠 제목 3',
        description: '컨텐츠 내용 3',
      },
    ];

    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      console.log('slide change');
    };

    return {
      modules,
      slides,
      contents,
      onSwiper,
      onSlideChange,
    };
  },
};
</script>

<style scoped>
/* Swiper 슬라이더 스타일 */
.mySwiper {
  width: 100%;
  height: 50%;
}

.mySwiper .swiper-slide {
  position: relative;
  text-align: center;
}

.mySwiper .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-caption {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
}

.slide-caption h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.slide-caption p {
  font-size: 1.2rem;
}

/* 컨텐츠 섹션 스타일 */
.content-section {
  padding: 60px 0;
}

.content-section:nth-child(even) {
  background-color: #f9f9f9;
}

.content-section .container {
  max-width: 800px;
}

.content-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.content-section p {
  font-size: 1rem;
}

/* Contact 섹션 스타일 */
.contact-section {
  padding: 60px 0;
  background-color: #333;
  color: #fff;
}

.contact-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.contact-section p {
  font-size: 1rem;
}
</style>
