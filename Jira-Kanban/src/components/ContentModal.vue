<template>
  <div>
    <div class="white-bg">
      <h2>Task Content:</h2>
      <h3>{{ contentItems.contentText }}</h3>
      <br/>
      <h2>Task Writer:</h2>
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
<style scoped lang="scss">
.white-bg {
  width: 50%; 
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: fixed;
} 
button {
  width: 60px;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  background-color: beige;
  border-radius: 10px;
  border: 0px;
  &:hover {
    background-color: bisque;
  }
}
</style>