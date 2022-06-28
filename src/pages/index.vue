<template>
  <div>
    <ProductsList />
  </div>
</template>


<script>
import ProductsList from '~/components/ProductsList'
import { Hub } from 'aws-amplify'

export default {
  // middleware: 'auth',

  head() {
    return {
      title: 'メニュー一覧 | smartfoodlocker'
    }
  },
  components: {
    ProductsList,
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