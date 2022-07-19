<template>
  <v-card
    background-color="white"
    flat
    tile
  >
    <div>
      <v-toolbar 
        background-color="white"
        dense
      > 
        <span>
          <font-awesome-icon @click="$router.back()" icon="fa-solid fa-arrow-left" style="color: black;" />
        </span>

        <v-spacer>
          <v-toolbar-title>商品受取</v-toolbar-title>
        </v-spacer>

      </v-toolbar>
    </div>
  </v-card>
</template>

<style scoped>
.theme--light.v-toolbar.v-sheet {
  background-color: #EA5303;
  box-shadow: 10px 10px 15px -10px;
}
.spacer{
  text-align: center;
}
.spacer .v-toolbar__title{
  color: black;
  font-size: 12px;
  font-weight: bold;
}
</style>