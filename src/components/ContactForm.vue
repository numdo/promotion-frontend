<!-- src/components/ContactForm.vue -->
<template>
    <form @submit.prevent="handleSubmit">
      <div class="form-floating mb-3">
        <input v-model="form.name" class="form-control" id="name" type="text" placeholder="Enter your name..." required />
        <label for="name">Name</label>
        <div class="invalid-feedback">A name is required.</div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="form.email" class="form-control" id="email" type="email" placeholder="Enter your email..." required />
        <label for="email">Email address</label>
        <div class="invalid-feedback">An email is required.</div>
        <div class="invalid-feedback">Email is not valid.</div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="form.phone" class="form-control" id="phone" type="tel" placeholder="Enter your phone number..." required />
        <label for="phone">Phone Number</label>
        <div class="invalid-feedback">A phone number is required.</div>
      </div>
      <div class="form-floating mb-3">
        <textarea v-model="form.message" class="form-control" id="message" placeholder="Enter your message here..." style="height: 12rem" required></textarea>
        <label for="message">Message</label>
        <div class="invalid-feedback">A message is required.</div>
      </div>
      <br />
      <button class="btn btn-primary text-uppercase" type="submit">Send</button>
      <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </form>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ContactForm',
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          message: '',
        },
        successMessage: '',
        errorMessage: '',
      }
    },
    methods: {
      async handleSubmit() {
        try {
          // 실제 애플리케이션에서는 API 엔드포인트를 설정해야 합니다.
          await axios.post('/api/contact', this.form)
          this.successMessage = 'Form submission successful!'
          this.errorMessage = ''
          this.form = { name: '', email: '', phone: '', message: '' }
        } catch (error) {
          this.errorMessage = 'Error sending message!'
          this.successMessage = ''
        }
      },
    },
  }
  </script>
  
  <style scoped>
  /* 필요 시 스타일 추가 */
  </style>
  