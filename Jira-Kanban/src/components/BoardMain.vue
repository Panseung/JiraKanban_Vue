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
      <div
        class="board-item"
        v-for="( taskState, i ) in taskList" :key="i"
        @drop="onDropAlone( i )" 
        @dragover.prevent
      >
        <h2>{{ taskState.stateName }}: {{ taskState.stateItems.length }}</h2>
        <div 
          v-for="( stateItem, j ) in taskState.stateItems" :key="j"
          class="task-box"
          @click="onOpenContentModal( j, stateItem.content, stateItem.writer, taskState.stateName )"
          @dragstart="onDrag( i, j, stateItem.content, stateItem.writer )"        
          @drop="onDrop( i, j )" 
          @dragover.prevent
          draggable="true"
        >
          <p class="task-content">{{ stateItem.content }}</p>
          <p class="task-writer">{{ stateItem.writer }}</p>
        </div>
      </div>
      <div class="board-item-btn" @click="onShowModal">
        <h3>add</h3>
        <h3>task</h3>
      </div>
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
      dragFromColumn: 0,
      dragFromRow: 0,
      onDropEnable: false,
      dragContent: '',
      dragWriter: '',
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
      if ( event.contentState == 'Todo' ) {
        this.taskList[0].stateItems.splice( event.contentId, 1 )
      } else if ( event.contentState == 'Progress' ) {
        this.taskList[1].stateItems.splice( event.contentId, 1 )
      } else {
        this.taskList[2].stateItems.splice( event.contentId, 1 )
      }
      localStorage.setItem( 'myData', JSON.stringify( this.taskList ) )
    },
    onDrag( dragColumn, dragRow, dragContent, dragWriter ) {
      this.onDropEnable = true
      this.dragFromColumn = dragColumn
      this.dragFromRow = dragRow
      this.dragContent = dragContent
      this.dragWriter = dragWriter
    },
    onDrop( dropColumn, dropRow ) {
      if ( this.onDropEnable ) {
        this.onDropEnable = false
        this.taskList[this.dragFromColumn].stateItems.splice( this.dragFromRow, 1 )
        let newItem = {
          content: this.dragContent,
          writer: this.dragWriter
        }
        this.taskList[dropColumn].stateItems.splice( dropRow, 0, newItem)
        localStorage.setItem( 'myData', JSON.stringify( this.taskList ) )
      }
    },
    onDropAlone( dropColumn ) {
      if ( this.onDropEnable ) {
        this.onDropEnable = false
        this.taskList[this.dragFromColumn].stateItems.splice( this.dragFromRow, 1 )
        let newItem = {
          content: this.dragContent,
          writer: this.dragWriter
        }
        let dropRow = this.taskList[dropColumn].stateItems.length
        this.taskList[dropColumn].stateItems.splice( dropRow, 0, newItem)
        localStorage.setItem( 'myData', JSON.stringify( this.taskList ) )
      }
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

    .board-item {
      flex: 1 1;
      margin: 10px;
      background-color: beige;
      padding: 10px;
      border-radius: 20px;
      .task-box {
        background-color: white;
        border-radius: 20px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          background-color: bisque;
        }
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
      flex: 0 0 70px;
      margin: 10px;
      background-color: whitesmoke;
      height: 70px;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: bisque;
      }
      h3 {
        margin: 5px;
      }
    }
  }
}
</style>
