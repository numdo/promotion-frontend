<!-- src/components/Footer.vue -->
<template>
  <footer class="footer mt-auto">
    <div class="container text-center">
      <p class="mb-1">
        ©2024 ※ 본 웹사이트에 기재된 사업계획은 인•허가 과정에서 일부 변경될 수 있으며 사용된 CG 및 이미지는 소비자의 이해를 돕기 위한 것이며 실제와 다소 차이가 있을 수 있습니다.
      </p>
      <p class="mb-1">
        상호명 : 중앙공원 롯데캐슬 10년임대(대표)
      </p>
      <p class="mb-1">
        시행: 빛고을중앙공원개발(주)
      </p>
      <p class="mb-1">
        시공: 롯데건설(주)
      </p>
      <p class="mb-1">
        대행: 바론피엔에스(주)
      </p>
      <p class="mb-1">
        신탁: KAIT 한국자산신탁(주)
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #ffffff; /* 배경색을 흰색으로 설정 */
  color: #6c757d;
  padding: 1% 0; /* 상하 패딩을 줄여서 푸터의 크기를 줄임 */
  border-top: 1px solid #ddd; /* 상단 경계선 추가 */
}

.footer p {
  margin-bottom: 1px; /* 문단 사이 간격을 줄임 */
  font-size: 13px; /* 글자 크기를 줄임 */
  line-height: 1; /* 줄 간격을 줄임 */
  margin-top: .8rem;
}
</style>
