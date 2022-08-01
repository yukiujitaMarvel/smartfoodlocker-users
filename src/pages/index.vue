<template>
  <div>
    <Header />
    <MenuList />
    <Footer />
  </div>
</template>


<script>
import Header from '~/components/Header'
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'
import MenuList from '~/components/MenuList.vue'
import { Hub } from 'aws-amplify'

export default {
  // middleware: 'auth',

  head() {
    return {
      title: 'メニュー一覧 | smartfoodlocker'
    }
  },
  components: {
    Header,
    MenuList,
    Footer
},
   created() {
    Hub.listen('auth', this.listener)
  },
  destroyed() {
    Hub.remove('auth', this.listener)
  },
  methods: {
    listener(data){
      if(data.payload.event == 'signOut') {
        this.$router.push('/login')
      }
    }
  }
}
</script>