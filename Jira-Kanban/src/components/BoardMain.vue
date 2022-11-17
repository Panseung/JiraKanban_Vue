<template>
  <div class="board-main">
    <add-modal
      v-show="addModalShow == true"
      :addModalShow="addModalShow"
      @closeAddModal="onCloseAddModal"
      @createTask="onCreateTask"
    />
    <content-modal
       v-show="contentModalShow == true"
      :contentModalShow="contentModalShow"
      :contentItems="{
        contentId: contentId,
        contentText: contentText,
        contentWriter: contentWriter,
        contentState: contentState
      }"
      @closeContentModal="onCloseContentModal"
      @deleteTask="onDeleteTask"
    />
    <div class="board-header">
      <h1>Board</h1>
      <input/>
    </div>
    <div class="board-container">
      <div v-for="( taskState, i ) in taskList" :key="i">
        <div class="board-item">
          <h2>{{ taskState.stateName }}: {{ taskState.stateItems.length }}</h2>
          <div v-for="( stateItem, j ) in taskState.stateItems" :key="j"
            class="task-box"
            @click="onOpenContentModal( j, stateItem.content, stateItem.writer, taskState.stateName )"
          >
          <p class="task-content">{{ stateItem.content }}</p>
          <p class="task-writer">{{ stateItem.writer }}</p>
          </div>
        </div>
      </div>
      <div class="board-item-btn" @click="onShowModal"></div>
    </div>
  </div>
</template>

<script>
import AddModal from './AddModal'
import ContentModal from './ContentModal';
export default{
  name: 'BoardMain',
  components: { 
    AddModal,
    ContentModal
  },
  created() {
    this.taskList = JSON.parse(localStorage.getItem('myData'))
  },  
  data() {
    return {
      addModalShow: false,
      contentModalShow: false,
      contentId: 0,
      contentText:'',
      contentWriter:'',
      contentState:'',
      taskList: null, // todoList, progressList, doneList
    }
  },
  methods: {
    onShowModal() {
      this.addModalShow = true;
      this.$store.dispatch( 'toggleModalShow' )
    },
    onCloseAddModal() {
      this.addModalShow = false
      this.$store.dispatch( 'toggleModalShow' )
    },
    onCloseContentModal() {
      this.contentModalShow = false
      this.$store.dispatch( 'toggleModalShow' )
    },
    onCreateTask(item) {
      this.addModalShow = false
      let newContent = {
        content: item.taskModel,
        writer: item.writerModel
      }
      this.taskList[0].stateItems.push( newContent )
      localStorage.setItem( 'myData', JSON.stringify(this.taskList))
      this.$store.dispatch( 'toggleModalShow' )
    },
    onOpenContentModal( id, text, writer, state ) {
      this.contentId = id
      this.contentText = text
      this.contentWriter = writer
      this.contentModalShow = true
      this.contentState = state
      this.$store.dispatch( 'toggleModalShow' )
    },
    onDeleteTask( event ) {
      this.contentModalShow = false
      this.$store.dispatch( 'toggleModalShow' )
      console.log(event.contentState)
      if ( event.contentState == 'Todo' ) {
        this.taskList[0].stateItems.splice( event.contentId, 1 )
      } else if ( event.contentState == 'Progress' ) {
        this.taskList[1].stateItems.splice( event.contentId, 1 )
      } else {
        this.taskList[2].stateItems.splice( event.contentId, 1 )
      }
      localStorage.setItem( 'myData', JSON.stringify( this.taskList ) )
    }
  }
}
</script>
<style scoped lang="scss">
.board-main {
  padding: 10px;
  overflow: auto;

  .board-header {
    padding: 10px;
  }

  .board-container {
    display: flex;
    height: 80%;

    .board-item {
      flex: 1 1;
      margin: 10px;
      background-color: beige;
      min-height: 600px;
      padding: 10px;
      border-radius: 20px;
      .task-box {
        background-color: white;
        border-radius: 20px;
        margin-bottom: 10px;
        cursor: pointer;
        .task-content {
          padding: 10px;
          font-weight: bold;
        }

        .task-writer{
          padding: 10px;
          text-align: right;
        }
      }
    }
    .board-item-btn {
      flex: 0 0 40px;
      margin: 10px;
      background-color: whitesmoke;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
