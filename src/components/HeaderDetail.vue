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
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-spacer>

        <v-btn icon>
          <!-- <v-tab>
            <v-badge
              color="pink"
              v-bind:value="count"
              v-bind:content="count"
            >
              <a href="cart"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="color: black;" /></a>
            </v-badge>
          </v-tab> -->
          <!-- <span>
          <font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="color: black;" />
        </span> -->
        </v-btn>
      </v-toolbar>
    </div>
  </v-card>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
import { listCarts } from '../graphql/queries'
import Auth from "@aws-amplify/auth";

export default {
  props: ['title'],
  data () {
    return {
      userId: "",
      count: 0,
    }
  },
  async created() {
    const userData = await Auth.currentAuthenticatedUser();
    this.userId = userData.attributes.sub;
    await this.countCarts();
  },
  methods: {
    async countCarts() {
      const carts = await API.graphql(
        graphqlOperation(
          listCarts, {
            filter: {
              user_id: {
                eq: this.userId
              }
            }
          }
        )
      );
      this.count = carts.data.listCarts.items.length;
      console.log(this.count);
    }
  }
}
</script>

<style scoped>
.theme--dark.v-toolbar.v-sheet {
  background-color: white;
  border-bottom: solid 1px #ddd;
  box-shadow: 10px 10px 15px -10px;
}
.spacer{
  text-align: center;
}
.spacer .v-toolbar__title{
  color: black;
  font-size: 16px;
  font-weight: bold;
}
</style>