<template>
  <div>
    <div class="white-bg">
      <h2>Task Content:</h2>
      <h3>{{ opendItem.content }}</h3>
      <br/>
      <h2>Task Writer:</h2>
      <h3>{{ opendItem.writer }}</h3>
      <button @click="onDelete" >삭제</button>
      <button @click="onClose" >닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentModal',
  props: {
    contentId: {
      type: Number,
      required: true
    }
    
  },
  created() {
    let localData = JSON.parse(localStorage.getItem('myData'))
    for( let i = 0; i < localData.length; i++ ) {
      const item = localData[i]
      if ( item.id === this.contentId ) {
        this.opendItem = item
        return
      }
    }
  },
  data() {
    return {
      opendItem: {}
    }
  },
  methods: {
    onDelete() {
      this.$emit( 'deleteTask', { contentId: this.contentId } )
    },
    onClose() {
      this.$emit( 'closeContentModal' )
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