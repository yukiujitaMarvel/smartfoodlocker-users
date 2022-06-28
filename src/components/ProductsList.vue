<template>
  <div>
    <Header />
    <MenuList />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import MenuList from '~/components/MenuList'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    MenuList,
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