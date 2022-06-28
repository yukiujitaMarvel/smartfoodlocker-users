<template>
  <div>
    <h1>UserApp</h1>
    <!--<v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="description" label="Description"></v-text-field>
    <v-btn @click="createItemList">Create</v-btn>-->
    <ul>
      <li v-for="user in users" :key="user.user_id">
        {{ user.user_id }} : {{ user.user_name }} : {{ user.user_email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
//import { createItemList } from '../graphql/mutations'
import { listUsers } from '../graphql/queries'
export default {
  data() {
    return {
      user_id: "",
      user_name: "",
      user_email: "",
      user_number: "",
      create_at: "",
      update_at: "",
      users:[],
    }
  },
  async created() {
    await this.getUsers()
  },
  methods: {
    /*async createItemList() {
      const { name, description } = this
      if (!name || !description) return false
      const ItemList = { name, description }
      await API.graphql({
        query: createItemList,
        variables: { input: ItemList },
      })
      this.name = ''
      this.description = ''
      this.getUsers()
    },*/
    async getUsers() {
      const users = await API.graphql(graphqlOperation(listUsers));
      this.users = users.data.listUsers.items;
    },
  },
}
</script>