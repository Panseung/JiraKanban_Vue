<template>
  <div id="app">
    <div class="black-bg" v-if="getModalShow()"></div>
      <div class="main-header"></div>
      <div class="app-container">
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
  overflow: hidden;
  .main-header{
    height: 100px;
    background-color: beige;
  }
  .app-container {
    height: calc(100vh - 100px);
    display: grid;
    grid-template-columns: minmax(0, 60px) minmax(0, 180px) minmax(0, 1fr);
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
      background-color: azure;
      overflow: auto;
    }
  }
  .black-bg {
    width: 100%; 
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed; 
  }
}
</style>
