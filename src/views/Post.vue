<!-- src/views/Post.vue -->
<template>
  <div>
    <!-- Page Header -->
    <header class="masthead" :style="{ backgroundImage: `url(${postBg})` }">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="post-heading">
              <h1>{{ post.title }}</h1>
              <h2 class="subheading">{{ post.subtitle }}</h2>
              <span class="meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on {{ post.date }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <article class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <p v-html="post.content"></p>
            <a href="#!"><img class="img-fluid" :src="postImage" alt="..." /></a>
            <span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import postBg from '@/assets/img/post-bg.jpg'
import postImage from '@/assets/img/post-sample-image.jpg' // 임포트

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const post = ref({
      title: '',
      subtitle: '',
      date: '',
      content: '',
    })

    onMounted(() => {
      const postId = route.params.id
      // 실제 애플리케이션에서는 API 호출을 통해 데이터를 가져옵니다.
      // 여기서는 예시 데이터를 사용합니다.
      const fetchedPost = {
        id: postId,
        title: 'Man must explore, and this is exploration at its greatest',
        subtitle: 'Problems look mighty small from 150 miles up',
        date: 'August 24, 2023',
        content: `
          <p>Never in all their history have men been able truly to conceive of the world as one...</p>
          <h2 class="section-heading">The Final Frontier</h2>
          <p>There can be no thought of finishing for ‘aiming for the stars.’...</p>
          <blockquote class="blockquote">The dreams of yesterday are the hopes of today...</blockquote>
          <h2 class="section-heading">Reaching for the Stars</h2>
          <p>As we got further and further away, it [the Earth] diminished in size...</p>
        `,
      }
      post.value = fetchedPost
    })

    return {
      post,
      postBg,
      postImage,
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
