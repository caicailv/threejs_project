<template>
  <div class="webgl"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// import { init,  } from './index';
import { threeStart } from './cube';

onMounted(() => {
  threeStart()
})

</script>

<style scoped>
.webgl {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
