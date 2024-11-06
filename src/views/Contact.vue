<!-- src/views/Contact.vue -->
<template>
    <div>
      <!-- Page Header -->
      <header class="masthead" :style="{ backgroundImage: `url(${contactBg})` }">
        <div class="container position-relative px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <div class="page-heading">
                <h1>Contact Me</h1>
                <span class="subheading">Have questions? I have answers.</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="mb-4">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
              <div class="my-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import contactBg from '@/assets/img/contact-bg.jpg'
  import ContactForm from '@/components/ContactForm.vue'
  
  export default {
    name: 'Contact',
    components: {
      ContactForm,
    },
    setup() {
      return {
        contactBg,
      }
    }
  }
  </script>
  
  <style scoped>
  .masthead {
    background-size: cover;
    background-position: center;
  }
  </style>
  