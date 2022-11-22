<template>
  <div class="board-main">
    <add-modal
      v-show="addModalShow == true"
      :addModalShow="addModalShow"
      @closeAddModal="onCloseAddModal"
      @createTask="onCreateTask"
    />
    <content-modal
       v-if="contentModalShow == true"
      :contentModalShow="contentModalShow"
      :contentId="contentId"
      @closeContentModal="onCloseContentModal"
      @deleteTask="onDeleteTask"
    />
    <div class="board-header">
      <h1>Board</h1>
      <input type="date" v-model="contentNewDate"/>
      <input/>
      <button @click="getNewId">테스트</button>
    </div>
    <div class="board-container">
      <div
        class="board-item"
        v-for="( taskStatus, stateName, i ) in taskList" :key="i"     
        @drop="onDrop( stateName )" 
        @dragover.prevent
      >
        <h2>{{ stateName }}: {{ taskStatus.length }}</h2>
        <div 
          v-for="( stateItem, j ) in taskStatus" :key="j"
          class="task-box"
          @click="onOpenContentModal( stateItem.id )"
          @dragstart="onDrag( stateItem, j )"   
          @dragover.prevent
          draggable="true"
        >
          <p class="task-title">{{ stateItem.title }}</p>
          <p class="task-content">{{ stateItem.content }}</p>
          <p>생성날짜: {{ stateItem.newDate }}</p>
          <p>기한날짜: {{ stateItem.expiredDate }}</p>
          <p>업무중요도: {{ stateItem.taskImportance }}</p>
          <p>ID: {{ stateItem.id }}</p>
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
  data() {
    return {
      addModalShow: false,
      contentModalShow: false,
      contentNewDate: '2022-01-01',
      contentExpiredDate: '2022-12-31',
      contentId: 0,
      localData: [],
      // drag&drop
      onDropEnable: false,
      dragItem: {},
      dragIdx: 0,
    }
  },
  computed: {
    taskList: {
      get() {
        let returnData = {
          Todo: [],
          Progress: [],
          Done: []
        }
        for( let i = 0; i < this.localData.length; i++ ) {
          const task = this.localData[i]
          const status = task.status
          returnData[status].push(task)
        }
      return returnData
      }
    }
  },
  created() {
    this.localData = JSON.parse( localStorage.getItem( 'myData' ) )
  },  
  methods: {
    localStorageUpdate() {
      localStorage.setItem( 'myData', JSON.stringify( this.localData ) )
    },
    getNewId() {
      return Number( localStorage.getItem( 'newId' ) )
      
    },
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
      let newDate = new Date()
      let newIdx = JSON.parse( localStorage.getItem( 'myData' ) ).length
      let newContent = {
        status: 'Todo',
        title: item.titleModel,
        content: item.taskModel,
        writer: item.writerModel,
        // date
        newDate: newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate(),
        expiredDate: item.expiredDateModel,
        taskImportance: item.taskImportanceModel,
        id: this.getNewId()
      }
      this.localData.push( newContent )
      this.localStorageUpdate()
      localStorage.setItem('newId', this.getNewId() + 1 ) 
      this.$store.dispatch( 'toggleModalShow' )
    },
    onOpenContentModal( id ) {
      this.contentId = id
      this.contentModalShow = true
      this.$store.dispatch( 'toggleModalShow' )
    },
    onDeleteTask( event ) {
      this.contentModalShow = false
      this.$store.dispatch( 'toggleModalShow' )
      for( let i = 0; i < this.localData.length; i++ ){
        const item = this.localData[i]
        if( event.contentId === item.id ) {
          this.localData.splice( i, 1 )
          this.localStorageUpdate()
          break
        }
      }
    },
    onDrag( dragItem, idx ) {
      this.onDropEnable = true
      this.dragIdx = idx
      this.dragItem = dragItem
      
    },
    onDrop( dropColumn ) {
      if ( this.onDropEnable ) {
        this.onDropEnable = false
        for( let i = 0; i < this.localData.length; i++ ){
          const item = this.localData[i]
          if( this.dragItem.id === item.id ) {
            this.localData[i].status = dropColumn
            this.localStorageUpdate()
          }
        }
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
