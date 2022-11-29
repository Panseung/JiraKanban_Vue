<template>
  <div>
   <div class="white-bg">
     <h1>나는 태스크 만드는 모달</h1>
     <h3>Write Task Title</h3>
     <input v-model="titleModel"/>
     <h3>Write Task Content</h3>
     <input v-model="taskModel"/>
     <h3>Writer</h3>
     <input v-model="writerModel"/>
     <select>
       <optgroup label="Writer">
         <option v-for="( writer, i) in userList">{{ writer.name }}</option>
       </optgroup>
     </select>
     <h3>Expired Date</h3>
     <input v-model="expiredDateModel" type="date"/>
     <h3>Task Importance</h3>
     <select v-model="taskImportanceModel">
       <optgroup label="업무 중요 순위">
         <option value="5">최상</option>
         <option value="4">상</option>
         <option value="3">중</option>
         <option value="2">하</option>
         <option value="1">최하</option>
       </optgroup>
     </select>
     <br/>
     <br/>
     <button @click="onAdd">입력</button>
     <button @click="onCloseModal" >닫기</button>
   </div>
 </div>
</template>
<script>
export default {
 name: 'AddModal',
 data() {
   return {
     titleModel: ' ',
     taskModel: ' ',
     writerModel: ' ',
     expiredDateModel: '2022-12-31',
     taskImportanceModel: 0,
     userList: [],
   }
 },
 created() {
   this.userListInitialize()
 },
 methods: {
   userListInitialize() {
     this.userList = JSON.parse( localStorage.getItem( 'userList' ) )
   },
   onAdd() {
     this.$emit( 'createTask', { 
       titleModel: this.titleModel, 
       taskModel: this.taskModel, 
       writerModel: this.writerModel, 
       expiredDateModel: this.expiredDateModel, 
       taskImportanceModel: this.taskImportanceModel } )
     this.titleModel = ''
     this.taskModel = ''
     this.writerModel = ''
     
   },
   onCloseModal() {
     this.$emit( 'closeAddModal' )
     this.titleModel = ''
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