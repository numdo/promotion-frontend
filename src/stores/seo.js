// src/stores/seo.js
import { defineStore } from 'pinia'

export const useSEOStore = defineStore('seo', {
  state: () => ({
    metaTitle: localStorage.getItem('metaTitle') || 'Clean Blog - Start Bootstrap Theme',
    metaDescription: localStorage.getItem('metaDescription') || 'A Blog Theme by Start Bootstrap',
    bodyContent: localStorage.getItem('bodyContent') || '<p>기본 본문 내용</p>',
  }),
  actions: {
    updateSEO(newSEO) {
      this.metaTitle = newSEO.metaTitle
      this.metaDescription = newSEO.metaDescription
      localStorage.setItem('metaTitle', this.metaTitle)
      localStorage.setItem('metaDescription', this.metaDescription)
    },
    updateBodyContent(newContent) {
      this.bodyContent = newContent
      localStorage.setItem('bodyContent', this.bodyContent)
    },
  },
})
