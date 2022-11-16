<template>
  <div v-show="contentModalShow == true">
    <div class="white-bg">
      <h3>{{ contentItems.contentText }}</h3>
      <h3>{{ contentItems.contentWriter }}</h3>
      <button @click="$emit( 'deleteTask', { contentId: contentItems.contentId, contentState: contentItems.contentState } )" >삭제</button>
      <button @click="$emit( 'closeContentModal' )" >닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentModal',
  props: {
    contentModalShow: {
      type: Boolean,
      required: true
    },
    contentItems: {
      type: Object,
      required: true
    }
    
  },
  data () {
    return {
      
    }
  }
}
</script>
<style scoped>
.white-bg {
  width: 50%; 
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: fixed;
} 
</style>