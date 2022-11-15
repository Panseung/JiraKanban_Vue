<template>
  <div class="black-bg" v-if="contentModalShow == true">
    <div class="white-bg">
      <h3>{{ contentItem }}</h3>
      <h3>{{ contentWriter }}</h3>
      <button @click="$emit( 'deleteTask', { contentId, contentState } )" >삭제</button>
      <button @click="$emit( 'closeContentModal' )" >닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentModal',
  props: {
    contentModalShow: {
      type: Boolean,
      required: true
    },
    contentId: {
      type: Number,
      required: true
    },
    contentItem: {
      type: String,
      required: true
    },
    contentWriter: {
      type: String,
      required: true
    },
    contentState: {
      type: String,
      required: true
    }
    
  },
  data () {
    return {
      
    }
  }
}
</script>
<style>

</style>