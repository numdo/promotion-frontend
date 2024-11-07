<!-- src/components/TheHeader.vue -->
<template>
    <header class="masthead" :style="{ backgroundImage: `url(${headerImage})` }">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="page-heading">
              <!-- <h1>{{ title }}</h1> -->
              <!-- <span class="subheading">{{ subheading }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'TheHeader',
    props: {
      headerImage: {
        type: String,
        default: '', // 기본값 설정
      },
      title: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>
  .masthead {
    background-size: cover;
    background-position: center;
  }
  </style>
  