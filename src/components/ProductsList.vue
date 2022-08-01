<template>
  <div style="z-index: 50;">
    <MenuList />
  </div>
</template>

<script>
import MenuList from '~/components/MenuList'

export default {
  components: {
    MenuList,
  },
  // middleware: 'auth'
}
</script>

<style scoped>
body{
  background-color: aliceblue;
}
</style>