<template>
  <div class="board-main">
    <add-modal
      :addModalShow="addModalShow"
      @closeAddModal="addModalShow=false, $store.commit( 'setModalShow' )"
      @createTask="createTask( $event )"
    />
    <content-modal
      :contentModalShow="contentModalShow"
      :contentId="contentId"
      :contentItem="contentItem"
      :contentWriter="contentWriter"
      :contentState="contentState"
      @closeContentModal="contentModalShow=false, $store.commit( 'setModalShow' )"
      @deleteTask="deleteTask( $event )"
    />
    <div class="board-header">
      <h1>Board</h1>
      <input/>
    </div>
    <div class="board-container">
      <div class="board-item"
        @drop.prevent=""
        @dragenter.prevent
        @dragover.prevent>
        <p>TO DO: {{ todoList.length }}</p>
        <div 
          v-for="( todo, i ) in todoList" 
          draggable="true"
          @dragstart=""
          class="task-box" 
          @click="openContentModal( i, todo.content, todo.writer, 'todo' )"
          >
          <p class="task-content">{{ todo.content }}</p>
          <p class="task-writer">{{ todo.writer }}</p>
        </div>
      </div>
      <div class="board-item">
        <p>IN PROGRESS: {{ progressList.length }}</p>
        <div 
          v-for="( progress, i ) in progressList" 
          draggable="true"
          class="task-box" 
          @click="openContentModal( i, progress.content, progress.writer,'progress' )">
          <p class="task-content">{{ progress.content }}</p>
          <p class="task-writer">{{ progress.writer }}</p>
        </div>
      </div>
      <div class="board-item">
        <p>DONE: {{ doneList.length }}</p>
        <div 
          v-for="( done, i ) in doneList" 
          draggable="true"
          class="task-box" @click="openContentModal( i, done.content, done.writer, 'done' )">
          <p class="task-content">{{ done.content }}</p>
          <p class="task-writer">{{ done.writer }}</p>
        </div>
      </div>
      <div class="board-item-btn" @click="showModal"></div>
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
      contentId: 0,
      contentItem:'',
      contentWriter:'',
      contentState:'',
      todoList: [ {
        content: 'Allow users to change between two tiers at the same price',
        writer: 'Kim'
      }, {
        content: 'Implement feed back collector',
        writer: 'Park'
      }, {
        content: 'Add NPS feedback to email report',
        writer: 'Chang'
      }, {
        content: 'Apply a prorated discount to a user when they move from a low to a high priced tier',
        writer: 'Long'
      }, {
        content: 'extend the grace period to accounts',
        writer: 'Han'
      }],
      progressList: [ {
        content: 'Force SSL on any page that contains account info',
        writer: 'Wang'
      }, {
        content: 'Create subscription plans and discount codes in Stripe',
        writer: 'Lee'
      }, {
        content: 'Add analytic to pricing page',
        writer: 'Woo'
      } ],
      doneList: [ {
        content: 'Automate collection of feedback for weekly email report',
        writer: 'Choi'
      }, {
        content: 'Schedule weekly email report for Monday mrnings to all staff',
        writer: 'Yu'
      } ]
    }
  },
  methods: {
    showModal() {
      this.addModalShow = true;
      this.$store.commit( 'setModalShow' )
    },
    createTask(item) {
      this.addModalShow = false
      let newContent = {}
      newContent.content = item.taskModel
      newContent.writer = item.writerModel
      this.todoList.push( newContent )
      this.$store.commit( 'setModalShow' )
    },
    openContentModal( id, content, writer, state ) {
      this.contentId = id
      this.contentItem = content
      this.contentWriter = writer
      this.contentModalShow = true
      this.contentState = state
      this.$store.commit( 'setModalShow' )
    },
    deleteTask( event ) {
      this.contentModalShow = false
      this.$store.commit( 'setModalShow' )
      if ( event.contentState == 'todo' ) {
        this.todoList.splice( event.contentId, 1 )
      } else if ( event.contentState == 'progress' ) {
        this.progressList.splice( event.contentId, 1 )
      } else {
        this.doneList.splice( event.contentId, 1 )
      }
    }
  }
}
</script>
<style>
.board-main {
  padding: 10px;
  overflow: auto;
}

.board-header {
  padding: 10px;
}

.board-container {
  display: flex;
  height: 80%;
}

.board-item {
  flex: 1 1;
  margin: 10px;
  background-color: beige;
  min-height: 600px;
  padding: 10px;
  border-radius: 20px;
}

.board-item-btn {
  flex: 0 0 40px;
  margin: 10px;
  background-color: whitesmoke;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
}

.black-bg {
  width: 100%; 
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; 
  padding: 20px;
}

.white-bg {
  width: 50%; 
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: fixed;
} 

.task-box {
  background-color: white;
  border-radius: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.task-content {
  padding: 10px;
  font-weight: bold;
}

.task-writer{
  padding: 10px;
  text-align: right;
}



</style>
