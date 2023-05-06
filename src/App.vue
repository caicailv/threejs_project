<template>
  <div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { init } from './index'
onMounted(()=>{
  console.log('mounted');
  init()
})

</script>

<style scoped></style>
