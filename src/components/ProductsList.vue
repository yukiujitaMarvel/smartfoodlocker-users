<template>
  <div style="z-index: 50;">
    <MenuList />
  </div>
</template>

<script>
import MenuList from '~/components/MenuList'
import '~/assets/css/style.css'

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