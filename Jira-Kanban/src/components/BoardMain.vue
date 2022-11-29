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
      <input @keyup="onSearch" v-model="searchContent"/>
      <button @click="sortByImportance">task 우선순위 정렬</button>
      <button @click="onSearch">테스트</button>
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
      contentExpiredDate: '2022-12-31',
      contentId: 0,
      searchContent: '',
      localData: [],
      // localUser: [],
      // drag&drop
      onDropEnable: false,
      dragItem: {},
      dragIdx: 0,
      sorted: false,
    }
  },
  computed: {
    taskList() {
      let returnData = {
        Todo: [],
        Progress: [],
        Done: []
      }
      return this.groupBy( this.localData, 'status' )
    }
  },
  created() {
    this.taskListInitialize()
  },  
  methods: {
    taskListInitialize() {
      this.localData = JSON.parse( localStorage.getItem( 'myData' ) )
    },
    groupBy( arr, key ) {
      const returnObj = {}
      for( let i = 0; i < arr.length; i++ ) {
        const item = arr[i]
        const itemKey = item[key]
        returnObj[itemKey] = returnObj[itemKey] || []
        returnObj[itemKey].push( item )
      }
      return returnObj
    },
    onSearch() {
      this.taskListInitialize()
      const result = this.localData.filter( task => task.content.toLowerCase().includes( this.searchContent.toLowerCase() ) )
      this.localData = result
    },
    myFilter( arr, fn ) {
      const returnArr = []
      for( let i = 0; i < arr.length; i++ ) {
        const item = arr[i]
        if( fn( item, i, arr ) ) {
          returnArr.push( item )
        }
      }
      return returnArr
    },
    // arr 받아서 fn 거치고 ref 바꿔서 새로운 객체 리턴하기
    find( arr, fn ) {
      let findItem //QQ
      for( let i = 0; i < arr.length; i++ ) {
        const item = arr[i]
        if( fn( item, i, arr) ) {
          findItem = item
          break
        }
      }
      return findItem
      // return findItem
    },
    // 넣었던 배열은 바뀌어 있고, return은 삭제된 것들이 담겨있도록
    
    remove( arr, fn ) {
      const returnArr = []
      for( let i = 0; i < arr.length; i++ ) {
        const item = arr[i]
        if( fn( item, i, arr ) ) {
          returnArr.push( item )
          arr.splice( i, 1 )
        }
      }
      return returnArr
    }, 
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
      this.remove( this.localData, val => { 
        return val.id === event.contentId
      } )
      this.localStorageUpdate()
    },
    onDrag( dragItem, idx ) {
      this.onDropEnable = true
      this.dragIdx = idx
      this.dragItem = dragItem
    },
    onDrop( dropColumn ) {
      if( this.onDropEnable ) {
        this.onDropEnable = false
        for( let i = 0; i < this.localData.length; i++ ) {
          const item = this.localData[i]
          if( this.dragItem.id === item.id ) {
            this.localData[i].status = dropColumn
            this.localStorageUpdate()
            return
          }
        }
      }
    },
    // QQ
    sortByImportance() {
      if ( !this.sorted ) {
        const localStorageTaskList = JSON.parse( localStorage.getItem( 'myData') )
        const result = localStorageTaskList.sort( function( a, b ) {
          const aVal = a.taskImportance
          const bVal = b.taskImportance
          if( aVal > bVal ) {
            return -1
          } else if( aVal < bVal ) {
            return 1
          } else {
            return 0
          }
        } )
        this.localData = result
      } else {
        this.taskListInitialize()
      }
      this.sorted = !this.sorted
    },
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
