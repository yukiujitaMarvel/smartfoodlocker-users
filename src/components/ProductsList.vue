<template>
  <div style="z-index: 50;">
    <Header />
    <MenuLists />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import MenuLists from '~/components/MenuLists'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    MenuLists,
    Footer,
  },
  // middleware: 'auth'
}
</script>

<style scoped>
body{
  background-color: aliceblue;
}
</style>