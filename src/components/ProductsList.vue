<template>
  <div style="z-index: 50;">
    <Header />
    <DailyMenuList />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import DailyMenuList from '~/components/DailyMenuList'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    DailyMenuList,
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