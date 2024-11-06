// src/services/pageService.js
import api from '@/services/api'

// 페이지 생성
export const createPage = (pageData) => {
  return api.post('/pages', pageData)
}

// 페이지 조회 (URL 기준)
export const getPageByUrl = (url) => {
  return api.get(`/pages/url/${url}`)
}

// 모든 페이지 조회
export const getAllPages = () => {
  return api.get('/pages')
}

// 페이지 업데이트
export const updatePage = (id, pageData) => {
  return api.put(`/pages/${id}`, pageData)
}

// 페이지 삭제
export const deletePage = (id) => {
  return api.delete(`/pages/${id}`)
}
