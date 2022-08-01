<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
      <div class="order-wrap">
        <div class="order-info">
          <h1>注文情報</h1>
          <ol class="order-list">
            <!-- <li v-for="cart in carts" v-bind:key="cart.id">
              {{cart.items.item_name}}
              <div v-if="cart.items.category_id === '01'">
                <span v-if="cart.rice_option === '01'" class="amount">少なめ</span>
                <span v-else-if="cart.rice_option === '02'" class="amount">普通</span>
                <span v-else class="amount">多め</span>
                <span v-if="cart.soup_option === '02'">味噌汁</span>
                <span>数量:{{cart.item_num}}</span>
              </div>
            </li>              -->
            <li>{{items.item_name}}</li>
            <!--<li>デリサラダ</li>-->
          </ol>
          <!-- <div class="total-price">
            <p>¥{{totalPrice.toLocaleString()}}</p>
          </div> -->
          <div class="total-price">
            <p>¥{{items.item_price}}</p>
          </div>
        </div>
        <div class="pay-info">
          <h1>支払い情報</h1>
          <v-radio-group
            v-model="pay_info"
            column
          >
            <div class="card-info">
              <v-radio
              label="チケット(1/15)"
              value="radio-1"
              ></v-radio>
              <p></p>
            </div>

            <div class="card-info">
              <v-radio
              label="VISA"
              value="radio-2"
              ></v-radio>
              <p>**** **** ****1234</p>

            </div>
            
            <!-- <div class="card-info">
              <v-radio
              label="JCB"
              value="radio-2"
              ></v-radio>
              <p>**** **** ****1234</p>
            </div> -->
            
          </v-radio-group>
        </div>
        <div class="pickup_time">
          <h1>受取時間</h1>
          <v-row align="center">
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                v-model="pickup_time"
                :items="time"
                :label="month + '/' + day + '(' +  weekDay  + ')'"
              ></v-select>
            </v-col>
          </v-row>
          <!-- <v-radio-group
            v-model="pickup_time"
            column
          >
            <div class="pickup_time_select">
              <v-radio
                label="今すぐ"
                value="radio-1"
              ></v-radio>
              <p>20分~40分</p>
            </div>
            <div class="pickup_time_select">
              <v-radio
                label="予約する"
                value="radio-2"
                @click="reserve"
              ></v-radio>
              <p>7/13(水)13:45~14:15</p>
            </div>
          </v-radio-group> -->
        </div>  
        <div class="pickup_place">
          <h1>受取場所</h1>
          <v-radio-group
            v-model="pickup_place"
            column
          >
            <v-radio
              label="テスト1"
              value="radio-1"
            ></v-radio>
            <v-radio
              label="テスト2"
              value="radio-2"
            ></v-radio>
          </v-radio-group>
        </div>   

        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="info-title">
                重要なお知らせ
              </v-card-title>
              <v-card-text>ご注文された商品は必ずお受け取りください。<br>指定配達時間より1時間が経過しますと、商品ロッカー内から移動させて頂く場合がございます。</v-card-text>
              <v-card-actions>
                
                <div class="info-btn-wrap">
                  <button
                    text
                    class="info-btn"
                    @click="order"
                  >
                    わかりました
                  </button>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- <v-row>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar
                dark
                color="orange"
              >
                <v-btn
                  icon
                  dark
                  @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>予約する</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  
                </v-toolbar-items>
              </v-toolbar>

              <template>
                <v-container fluid>
                  <v-row align="center">
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="items"
                        label="今日、7月13日(水)"
                        outlined
                      ></v-select>
                    </v-col>
                    
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :items="items"
                        label="13:45-14:15"
                        outlined
                      ></v-select>
                    </v-col>

                  </v-row>
                </v-container>
              </template>

              <div class="button-wrap">
                <a href="#" class="btn btn--orange btn-c">予約する</a>
              </div>
              
            </v-card>
          </v-dialog>
        </v-row> -->


        <div class="button-wrap">
          <!-- <a href="#" v-on:click="addOrders" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-check" style="margin-right:20px;" />確定する</a> -->
          <a v-on:click="Orders" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-check" style="margin-right:20px;" />確定する</a>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'
import { API, graphqlOperation } from 'aws-amplify'
import { getItems } from '../graphql/queries'
import { createOrders, createOrderDetail, deleteCarts } from '../graphql/mutations'
import Auth from "@aws-amplify/auth";

export default {
  head() {
    return {
      title: '注文内容確認 | smartfoodlocker'
    }
  },
  data () {
    return {
      dialog: false,
      myTitle: '注文内容',
      items: {},

      year:'',
      month:'',
      day:'',
      weekDay:'',
      pay_info: 'radio-1',
      pickup_time: '11:45~12:00',
      pickup_place: 'radio-1',
      time: ['11:45~12:00', '12:00~12:15', '12:15~12:30', '12:30~12:45'],     
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
  async created() {
  //   const userData = await Auth.currentAuthenticatedUser();
  //   this.user_id = userData.attributes.sub;
  await this.getItems();
  },
  methods: {
    async Orders(){
      this.dialog = true
    },
    async order() {
      this.dialog = false
      
      setTimeout(async () => {
        await this.createOrders();
        let url = '/ordercomplete';
        window.location.href = url;
      }, 1000)
    },
    async getItems() {
      const query = this.$route.query.id;
      const items = await API.graphql(graphqlOperation(getItems,{id: query}));
      this.items = items.data.getItems;

      const ymd = this.items.release_day.split('-');
      this.year = ymd[0];
      this.month = ymd[1];
      this.day = ymd[2];

      const ts = Date.parse(this.items.release_day + 'T00:00:00.000+09:00');
      console.log(ts);
      const dt = new Date(ts);

      this.weekDay = ['日','月','火','水','木','金','土'][dt.getDay()];

    },
    async createOrders() {
      const userData = await Auth.currentAuthenticatedUser();
      const user_id = userData.attributes.sub;
      const createOrdersInput = {
        user_id: user_id,
        item_id: this.items.id,
        total_price: this.items.item_price,
        pickup_place: this.pickup_place,
        pickup_time: this.pickup_time,
        status: '01',
        lock_flg: false,
      };

      console.log(createOrdersInput);

      await API.graphql(graphqlOperation(createOrders,{input: createOrdersInput}));

    },
    // reserve(){
    //   this.dialog = true
    // },
    // async listCarts() {
    //   const carts = await API.graphql(
    //     graphqlOperation(
    //       listCarts, {
    //         filter: {
    //           user_id: {
    //             eq: this.user_id
    //           }
    //         }
    //       }
    //     )
    //   );
    //   this.carts = carts.data.listCarts.items;
    //   console.log(this.carts[0]?.item_id);
    // },
    // async addOrders() {
    //   const dt = new Date();
    //   const isoStr = dt.toISOString();

    //   const createOrdersInput = {
    //     user_id: this.user_id,
    //     total_price: this.totalPrice,
    //     pickup_place: this.pickup_place,
    //     pickup_time: isoStr,
    //     status: "01",
    //     lock_flg: false,
    //   };
    //   const result = await API.graphql(graphqlOperation(createOrders,{input: createOrdersInput}));

    //   const promises = this.carts.map(async (cart) => {
    //     const createOrederDetailInput = {
    //       id: result.data.createOrders.id,
    //       cart_id: cart.id,
    //       item_id: cart.item_id,
    //       rice_option: cart.rice_option,
    //       soup_option: cart.soup_option,
    //       item_num: cart.item_num,
    //     };        
    //     const deleteCartsInput = {
    //       id: cart.id
    //     };
    //     await API.graphql(graphqlOperation(createOrderDetail,{input: createOrederDetailInput}));
    //     await API.graphql(graphqlOperation(deleteCarts,{input: deleteCartsInput}));
    //   });
    //   await Promise.all(promises);

    //   window.location.href = "passcode";
    // },
    // getTotalPrice(carts) {
    //   let totalPrice = 0;
    //   carts.forEach((cart) => {
    //     let price = cart.items.item_price;
    //     if(cart.rice_option === '03') {
    //       price = price + 30;
    //     }
    //     if(cart.soup_option === '02') {
    //       price = price + 50;
    //     }
    //     price = price * cart.item_num;
    //     totalPrice = totalPrice + price;
    //   });
    //   return totalPrice;
    // }
  }  
}
</script>

<style scoped>
.order-wrap{
  background-color: white;
  color: black;
  padding: 20px;
  height: 100%;
}
h1{
  font-size: 12px;
  color: #EA5303;
  padding: 10px 0 10px 0;
}
.order-list{
  font-weight: bold;
  color: gray;
}
span{
  font-size: 10px;
}
.amount{
  padding-right: 20px;
}
.total-price{
  text-align: right;
  font-size: 16px;
  font-weight: bold;
}
.order-info{
  border-bottom: 1px solid #ddd;
}
.pay-info{
  border-bottom: 1px solid #ddd;
}
.pickup_time{
  border-bottom: 1px solid #ddd;
}
.pickup_place{
  border-bottom: 1px solid #ddd;
}
.card-info{
  display: flex;
  justify-content: space-between;
}
.card-info p{
  margin: 0;
}
.v-toolbar__title{
  font-weight: bold;
}
.pickup_time_select{
  display: flex;
  justify-content: space-between;
}
.pickup_time_select p {
  margin: 0;

}
.v-dialog > .v-card > .v-card__title{
  font-size: 16px;
  font-weight: bold;
  justify-content: space-around;
}
.theme--light.v-card > .v-card__text, .theme--light.v-card > .v-card__subtitle{
  font-size: 16px;
}
.v-card__actions{
  display: block;
  text-align: center;
}
.info-btn-wrap{
  padding: 10px;
}
.info-btn{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 10px;
}
.info-btn:hover{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  background-color: white;
  color: orange;
  padding: 10px;
}




/* ボタン */
.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--orange {
  color: #fff;
  background-color: #EA5303;
  text-decoration: none;
}

a.btn--orange:hover {
  color: #fff;
  background: #f17532;
}

a.btn-c {
  font-size: 16px;
  position: relative;
  padding: 20px;
  border-radius: 100vh;
}

a.btn-c i.fa {
  margin-right: 1rem;
}

@media screen and (max-width: 480px) {
  .order-inner-wrap{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 8px gray;
  }
}

</style>
