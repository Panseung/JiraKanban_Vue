<template>
   <div>
    <div class="white-bg">
      <h1>나는 태스크 만드는 모달</h1>
      <h3>Write Task</h3>
      <input v-model="taskModel"/>
      <h4>Writer</h4>
      <input v-model="writerModel"/>
      <br/>
      <br/>
      <button @click="$emit( 'createTask', { taskModel, writerModel } )">입력</button>
      <button @click="$emit( 'closeAddModal' )" >닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddModal',
  data() {
    return {
      taskModel: ' ',
      writerModel: ' '
    }
  },
  methods: {
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