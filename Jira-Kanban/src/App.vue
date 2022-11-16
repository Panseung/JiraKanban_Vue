<template>
  <div id="app">
    <div class="black-bg" v-if="getModalShow()"></div>
    <div class="app-container-row">
      <div class="main-header"></div>
      <div class="app-container-column">
        <div class="app-firstBar"></div>
        <div class="app-secondBar">
          <div>
            <router-link to="board"><h3>Board</h3></router-link>
          </div>
          <div>
            <router-link to="features"><h3>Features</h3></router-link>
          </div>
          <div>
            <router-link to="settings"><h3>Settings</h3></router-link>
          </div>
          <hr/>
          <div>
            <router-link to="feedback"><h3>Give feedback</h3></router-link>
          </div>
        </div>
        <div class="app-board">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getModalShow() {
      return this.$store.getters.modalShow
    }
  }
}
</script>

<style lang="scss" scoped >
#app {
  height: 100%
}

#app {
  
}

.app-container-row {
  display: grid;
  grid-template-rows: 100px 1fr;
}
.main-header{
  grid-row: 1;
  background-color: beige;
}
.app-container-column {
  grid-row: 2;
  display: grid;
  grid-template-columns: 60px 180px 1fr;
}

.app-firstBar {
  grid-column: 1;
  background-color: indianred;
}

.app-secondBar {
  grid-column: 2;
  background-color: whitesmoke;
  padding: 20px;
}

.app-board {
  grid-column: 3;
  overflow: auto;
}

/* .app-container {
  display: flex;
  height:95vh;
}

.app-firstBar {
  flex: 0 0 4vw;
  background-color: indianred;
}

.app-secondBar {
  flex: 0 0 16vw;
  background-color: whitesmoke;
  padding: 20px;
}

.app-board {
  flex: 1 1 0;
  overflow: auto;
} */

.black-bg {
  width: 100%; 
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; 
  padding: 20px;
}
</style>
