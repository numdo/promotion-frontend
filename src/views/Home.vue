<!-- src/views/Home.vue -->
<template>
  <div>
    <!-- Page Header -->
    <header class="masthead" :style="{ backgroundImage: `url(${homeBg})` }">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="site-heading">
              <h1>Clean Blog</h1>
              <span class="subheading">A Blog Theme by Start Bootstrap</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <!-- Post preview -->
          <div class="post-preview" v-for="post in posts" :key="post.id">
            <router-link :to="`/post/${post.id}`">
              <h2 class="post-title">{{ post.title }}</h2>
              <h3 class="post-subtitle">{{ post.subtitle }}</h3>
            </router-link>
            <p class="post-meta">
              Posted by
              <a href="#!">Start Bootstrap</a>
              on {{ post.date }}
            </p>
            <hr class="my-4" />
          </div>
          <!-- Pager -->
          <div class="d-flex justify-content-end mb-4">
            <button class="btn btn-primary text-uppercase" @click="loadOlderPosts">Older Posts →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeBg from '@/assets/img/home-bg.jpg'

export default {
  name: 'Home',
  setup() {
    const posts = [
      {
        id: 1,
        title: 'Man must explore, and this is exploration at its greatest',
        subtitle: 'Problems look mighty small from 150 miles up',
        date: 'September 24, 2023',
      },
      {
        id: 2,
        title: "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
        subtitle: '',
        date: 'September 18, 2023',
      },
      {
        id: 3,
        title: 'Science has not yet mastered prophecy',
        subtitle: 'We predict too much for the next year and yet far too little for the next ten.',
        date: 'August 24, 2023',
      },
      {
        id: 4,
        title: 'Failure is not an option',
        subtitle: 'Many say exploration is part of our destiny, but it’s actually our duty to future generations.',
        date: 'July 8, 2023',
      },
    ]

    const loadOlderPosts = () => {
      // 추가적인 포스트 로드 로직
      alert('더 많은 포스트를 로드합니다.')
    }

    return {
      homeBg,
      posts,
      loadOlderPosts,
    }
  },
}
</script>

<style scoped>
.masthead {
  background-size: cover;
  background-position: center;
}
</style>
