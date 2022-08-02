<template>
  <v-footer padless class="footer">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>SmartFoodLocker</strong>
    </v-col>
  </v-footer>
</template>

<style scoped>
.theme--light.v-footer {
  background-color: #EA5303;
  color: white;
}
.footer {
  z-index: 100;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>