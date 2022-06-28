<template>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>SmartFoodLocker</strong>
    </v-col>
  </v-footer>
</template>

<style scoped>
.theme--dark.v-footer {
  background-color: #EA5303;
}
</style>