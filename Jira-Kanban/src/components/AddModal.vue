<template>
   <div>
    <div class="white-bg">
      <h1>나는 태스크 만드는 모달</h1>
      <h3>Write Task</h3>
      <input v-model="taskModel"/>
      <h3>Writer</h3>
      <input v-model="writerModel"/>
      <br/>
      <br/>
      <button @click="$emit( 'createTask', { taskModel, writerModel } ), closeModal()">입력</button>
      <button @click="$emit( 'closeAddModal' ), closeModal()" >닫기</button>
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
    closeModal() {
      this.taskModel = ''
      this.writerModel = ''
    },
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