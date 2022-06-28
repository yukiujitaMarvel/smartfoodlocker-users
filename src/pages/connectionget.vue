<template>
  <div>
    <h1>ItemListApp</h1>
    <!--<v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="description" label="Description"></v-text-field>
    <v-btn @click="createItemList">Create</v-btn>-->
    <v-text-field v-model="user_id" label="User_ID"></v-text-field>
    <v-btn @click="getUser">Get</v-btn>
    <!--<ul>
      <li v-for="itemList in itemLists" :key="itemList.item_id">
        {{ itemList.item_id }} : {{ itemList.item_img }} : {{ itemList.category_id }} : {{ itemList.item_name }} : {{ itemList.item_price }} : 
        {{ itemList.remaiks }} : {{ itemList.release }} : {{ itemList.create_at }} : {{ itemList.update_at }} : {{ itemList.delete_at }} : 
        {{ itemList.create_user }}  : {{ itemList.update_user }} : {{ itemList.delete_user }} : {{ itemList.logical_deletion_flg }}
      </li>
    </ul>-->
    <div>
      {{ items.user_id }} : {{ items.user_name }} : {{ items.user_email }} : {{ items.user_number }} : {{ items.create_at }} : 
      {{ items.update_at }}
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
//import { createItemList } from '../graphql/mutations'
import {getUser} from '../graphql/queries'

export default {
  data() {
    return {
      user_id: '',
      user_name: '',
      user_email: '',
      user_number: '',
      create_at: '',
      update_at: '',
      items: '',
    }
  },
  /*async created() {
    //await this.listItemLIsts();
    await this.getItemList();
  },*/
  methods: {
    /*async createItemList() {
      const { name, description } = this
      if (!name || !description) return false
      const itemList = { name, description }
      await API.graphql({
        query: createItemList,
        variables: { input: ItemList },
      })
      this.name = ''
      this.description = ''
      this.listItemLIsts()
    },*/

    async getUser() {
      const { user_id } = this;
      if (!user_id) return false;

      const items = await API.graphql(graphqlOperation(getUser,{user_id: user_id}));
      this.items = items.data.getUser;
    }

    /*async listItemLIsts() {
      const itemLists = await API.graphql(graphqlOperation(listItemLists));
      this.itemLists = itemLists.data.listItemLists.items;
    },*/
  },
}
</script>
