<template>

  <div class="webgl"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { init,  } from './index';

onMounted(() => {
  init()
})

</script>

<style scoped>


.webgl {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
