<template>
  <div id="app">
    <div class="black-bg" v-if="$store.state.modalShow"></div>
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
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
.main-header{
  height: 5vh;
  background-color: beige;
}

.app-container {
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
  flex: 1 1 auto;
  overflow: auto;
}
</style>
