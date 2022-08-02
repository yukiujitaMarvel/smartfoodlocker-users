<template>
  <amplify-authenticator>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { Hub } from 'aws-amplify'
import '~/assets/css/style.css'



export default {
  created() {
    Hub.listen('auth', this.listener)
  },
  destroyed() {
    Hub.remove('auth', this.listener)
  },
  methods: {
    listener(data){
      console.log(data)
      if(data.payload.event == 'signIn') {
        this.$router.push('/')
      }
    }
  }
}
</script>
