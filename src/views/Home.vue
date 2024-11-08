<template>
  <div>
    <!-- Swiper 슬라이더 -->
    <Swiper :modules="modules" :slides-per-view="1" :space-between="0" :loop="true" :autoplay="{
      delay: 10000,
      disableOnInteraction: false,
    }" :pagination="{ clickable: true }" :navigation="true" class="mySwiper">
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" :alt="slide.title" />
        <div class="slide-caption">
          <h2>{{ slide.title }}</h2>
          <div v-html="slide.description"></div>
          <h5><a href="{{ slide.phone }}" type='phone' class='home-phone'>☎{{ slide.phone }}</a></h5>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- 컨텐츠 섹션 -->
    <section v-for="(content, index) in contents" :key="index" class="content-section"
      :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'" data-aos-duration="1000" >
      <div class="container" style="text-align: center;">
        <h2>{{ content.title }}</h2>
        <div class="" v-html="content.description"></div>
      </div>
    </section>

    <!-- Contact 섹션 -->
    <section class="contact-section">
      <div class="container">
        <h2>Contact Us</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="contact">연락처</label>
            <input type="tel" id="contact" v-model="form.contact" required />
          </div>
          <div class="form-group">
            <label for="inquiry">문의 내용</label>
            <textarea id="inquiry" v-model="form.inquiry" required></textarea>
          </div>
          <div class="form-group">
            <label for="date">날짜</label>
            <input type="date" id="date" v-model="form.date" required />
          </div>
          <button type="submit" class="submit-button">
            제출하기
          </button>
        </form>
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
        title: '중앙공원 롯데캐슬 10년 임대',
        description: '지하철 2호선 개통(예정) <br> 우수한 교육환경, 백화점, 대형마트 등 <br> 가깝고 편리한 인프라 <br> 중앙공원 롯데캐슬 10년임대',
        phone: '1600-1234',
      },
      {
        image: slide2,
        title: '중앙공원 롯데캐슬 10년 임대',
        description: '광주를 이끄는 앞선 사람들의 특별한 커뮤니티 <br> 더 큰 여유와 자부심을 담은 중대형 랜드마크의 완성 <br> 중앙공원 롯데캐슬 10년 임대',
        phone: '1600-1234',

      },
      {
        image: slide3,
        title: '중앙공원 롯데캐슬 10년 임대',
        description: '신웅아 근데 이것도 수정을 하게 하고싶은데 아직이야... 미안해....',
        phone: '1600-1234',

      },
    ];

    const contents = [
      {
        title: '중앙공원 롯데캐슬 10년임대',
        description: '롯데캐슬 시그니처, <br>롯데마트, 롯데아울렛으로 <br>이어지는 원스톱 롯데 라이프 타운<br> 중앙공원 롯데캐슬 10년임대',
      },
      {
        title: '메인페이지 2',
        description: '메인페이지 이미지 2',
      },
      {
        title: '메인페이지 3',
        description: '메인페이지 이미지 3',
      },
    ];

    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      console.log('slide change');
    };
    const submitForm = () => {
      if (!form.value.agree) {
        alert('개인정보수집에 동의해야 합니다.');
        return;
      }

      fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.value.name,
          contact: form.value.contact,
          inquiry: form.value.inquiry,
          date: form.value.date,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert('문의가 접수되었습니다.');
            // 폼 초기화
            form.value = {
              name: '',
              contact: '',
              inquiry: '',
              date: '',
              agree: false,
            };
            AOS.refresh(); // AOS 상태 업데이트
          } else {
            response.json().then((data) => {
              alert(`문의 접수에 실패했습니다: ${data.message}`);
            });
          }
        })
        .catch((error) => {
          console.error(error);
          alert('서버 오류가 발생했습니다.');
        });
    };

    const form = ref({
      name: '',
      contact: '',
      inquiry: '',
      date: '',
      agree: false,
    });
    const fields = [
      {
        id: 'name',
        label: '이름',
        type: 'text',
        model: 'name',
        placeholder: '성함을 입력하세요',
        required: true,
      },
      {
        id: 'contact',
        label: '연락처',
        type: 'tel',
        model: 'contact',
        placeholder: '연락처를 입력하세요',
        required: true,
      },
      {
        id: 'inquiry',
        label: '문의 내용',
        type: 'textarea',
        model: 'inquiry',
        placeholder: '문의 내용을 입력하세요',
        required: true,
      },
    ];
    return {
      modules,
      slides,
      contents,
      onSwiper,
      onSlideChange,
      submitForm,
      form,
      fields,
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
  bottom: 40%;
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

.home-phone {
  border-radius: 0;
  color: #fff !important;
  border-bottom-color: #fff;
  background: none !important;

}
/* Contact 섹션 스타일 */
.contact-section {
  padding: 60px 0;
  background-color: #ffffff;
  color: #333;
}

.contact-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.contact-section form {
  max-width: 800px;
  margin: 0 auto;
}

.form-group label {
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  border-radius: 0.25rem;
}

.form-check-label {
  font-weight: 400;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>
