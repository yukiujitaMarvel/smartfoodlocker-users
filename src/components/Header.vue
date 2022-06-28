<template>
    <v-card
      color="grey lighten-4"
      flat
      tile
      >
      <v-toolbar dense>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title><a href="/">SmartFoodLocker</a></v-toolbar-title>

        <v-spacer></v-spacer>

      </v-toolbar>
      
      <!-- ここがdrawerコンポーネントを呼び出している部分 -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        class="drawer"
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group>
            <div class="drawer-title">
              <div v-if="Object.keys(users).length">
                <h1><span>{{ users.username }}</span>さん ようこそ</h1>
              </div>
              <div v-else>
                <a href="/login">
                  <div class="my-2">
                    <v-btn color="warning" dark>
                      ログインはこちら
                    </v-btn>
                  </div>
                </a>
              </div>
            </div>

            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item,i) in 1"
                :key="i"
              >
                <v-expansion-panel-header>
                  <h3><font-awesome-icon icon="fa-solid fa-user"/>マイページ<span class="icon"></span></h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  
                  <a href="/mypage">
                    <v-expansion-panel-header>
                      <h3><font-awesome-icon icon="fa-solid fa-file-invoice" />アカウント情報<span class="icon"></span></h3>
                    </v-expansion-panel-header>
                  </a>
                  <a href="/mypage/payinfo">
                    <v-expansion-panel-header>
                      <h3><font-awesome-icon icon="fa-solid fa-money-check" />支払い情報<span class="icon"></span></h3>
                    </v-expansion-panel-header>
                  </a>
                  <a href="/mypage/tickets">
                    <v-expansion-panel-header>
                      <h3><font-awesome-icon icon="fa-solid fa-ticket" />回数チケット<span class="icon"></span></h3>
                    </v-expansion-panel-header>
                  </a>
                   
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            
            <a href="orderhistory">
              <v-list-item>
                <h3><font-awesome-icon icon="fa-solid fa-clock-rotate-left" />注文履歴</h3>
              </v-list-item>
            </a>
            <!-- <v-list-item>
              <h3><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />ログアウト</h3>
            </v-list-item> -->
            <v-list-item v-if="Object.keys(users).length">
               <amplify-sign-out></amplify-sign-out>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- ここまで -->
      <!-- // ここがdrawerコンポーネントを呼び出している部分 -->
    </v-card>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
import { listUsers } from '../graphql/queries'
import Auth from "@aws-amplify/auth";
// ここから追加
export default {
  data () {
    return {
      drawer: false,
      users: {}
    }
  },
  async created() {
    await this.getUser()
  },
  methods: {
    async getUser() {
      try {
        await Auth.currentAuthenticatedUser()
          .then((data) => {
            if(data && data.signInUserSession) {
              //console.log(data)
              this.users = data
            }
          })
      } catch(e){
      } 
    },
  },
}
// ここまで追加
</script>

<style scoped>
h3{
  font-size: 12px;
}
.svg-inline--fa{
  font-size: 18px;
  margin-right: 10px;
}
.icon{
  text-align: right;
}
.theme--dark.v-expansion-panels .v-expansion-panel{
  background-color: #EA5303 ;
}
.drawer{
  background-color: #EA5303;
  /* top:76px !important; */
}
.drawer-title{
  border-bottom: 1px solid white;
  padding: 10px;
  margin-bottom: 20px;
}
.drawer-title h1{
  font-size: 16px;
}
.drawer-title span{
  font-size: 28px;
  font-weight: bold;
}
.v-list-item{
  border-bottom: 1px solid white;
  padding: 10px 10px 10px 23px;
}
.v-expansion-panel-header:hover{
  background-color: #e96722;
}
.theme--dark.v-toolbar.v-sheet {
  background-color: #EA5303;
}
.v-application a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.v-btn:not(.v-btn--round).v-size--default{
  font-weight: bold;
}
</style>