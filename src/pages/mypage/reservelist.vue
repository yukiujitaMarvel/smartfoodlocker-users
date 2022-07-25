<template>
  <div>
    <Header />
    <HeaderPasscord :title="myTitle" ref="headerDetail"/>
      <div class="reserve-wrap">
        <div class="reserve-inner-wrap">
          <div v-for="order in orders" :key="order.id" class="reserve-content">
            <div class="reserve-title">
              <p>{{'予約日時' + order.items.release_day.split('-').join('/') + ',' + order.pickup_time}}</p>
            </div>
            <div class="reserve-img"> 
              <img src="~/assets/img/reserve.png" alt="">
            </div>
            <div class="button-wrap">
              <a href="/ordercomplete" class="btn btn--green btn-e"><font-awesome-icon icon="fa-solid fa-check" style="padding-right:10px;"/>QRコード・注文番号</a>
            </div>
            <div v-if="order.status === '01'" class="button-wrap">
              <a @click="orderStop(order)" class="btn btn--red btn-d"><font-awesome-icon icon="fa-solid fa-trash-can" style="padding-right:10px;" />注文をキャンセルする</a>
            </div>
          </div>

          <!--<div class="reserve-content">
            <div class="reserve-title">
              <p>予約日時 2022/07/15,11:45~12:00</p>
            </div>
            <div class="reserve-img"> 
              <img src="~/assets/img/reserve.png" alt="">
            </div>
            <div class="button-wrap">
              <a href="#"  @click="orderStop" class="btn btn--red btn-d"><font-awesome-icon icon="fa-solid fa-trash-can" style="padding-right:10px;" />注文をキャンセルする</a>
            </div>
          </div>-->

          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >
              <v-card>
                <h5 v-if="Object.keys(selectedOrders).length">{{selectedOrders.items.release_day.split('-').join('/') + ',' + selectedOrders.pickup_time + 'の注文をキャンセルしますか？'}}</h5>
                <v-card-actions>
                  <div class="cansel-btn-wrap">
                    <button
                      color="green darken-1"
                      text
                      class="back-btn"
                      @click="dialog = false"
                    >
                      戻る
                    </button>
                    <button
                      color="green darken-1"
                      text
                      class="cancel-btn"
                      @click="cancelOrders"
                    >
                      キャンセル
                    </button>
                  </div>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderPasscord from '~/components/HeaderPasscord'
import Footer from '~/components/Footer'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import { listOrders } from '~/graphql/queries'
import { updateOrders } from '~/graphql/mutations'

export default {
  head() {
    return {
      title: '予約一覧 | smartfoodlocker'
    }
  },
  data () {
    return {
      myTitle: '予約一覧' /*['items.item_name']*/,
      dialog: false,
      orders: [],
      selectedOrders: {},
      usre_id:'',
      year:'',
      month:'',
      day:'',
    }
  },
  components: {
    Header,
    HeaderPasscord,
    Footer,
  },
  async created() {
    const userData = await Auth.currentAuthenticatedUser();
    this.user_id = userData.attributes.sub;
    await this.listOrders();
  },
  methods: {
    orderStop(order){
      this.selectedOrders = order;
      this.dialog = true
    },
    async listOrders() {
      const orders = await API.graphql(
        graphqlOperation(listOrders, {
          filter: {
            and:[
              {user_id: {eq: this.user_id}}, 
              {or: [
                {status: {eq: "01"}}, 
                {status: {eq: "02"}}, 
                {status: {eq: "03"}}, 
                {status: {eq: "04"}},
              ]}, 
            ],
          }
        })
      );
      this.orders = orders.data.listOrders.items;

      this.orders.sort(function(a, b) {
        if (a.items.release_day > b.items.release_day) {
          return 1;
        } else {
          return -1;
        }
      })

    },
    async updateOrders() {
      const updateOrdersInput = {
        id: this.selectedOrders.id,
        user_id: this.selectedOrders.user_id,
        item_id: this.selectedOrders.item_id,
        total_price: this.selectedOrders.total_price,
        pickup_place: this.selectedOrders.pickup_place,
        pickup_time: this.selectedOrders.pickup_time,
        status: '05',
        lock_flg: this.selectedOrders.lock_flg,
      };

      await API.graphql(graphqlOperation(updateOrders,{input: updateOrdersInput}));
    },
    async cancelOrders() {
      this.dialog = false;
      await this.updateOrders();
      await this.listOrders();
    },
  }
}
</script>

<style scoped>
.reserve-wrap{
  background-color: #EA5303;
  color: white;
  padding: 20px;
  height: 100%;
}
.reserve-inner-wrap {
  width: 80%;
  margin: 0 auto;
}
.reserve-content{
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 10px;
}
.reserve-title {
  color: black;
  font-size: 12px;
}
h5{
  padding: 30px;
}
.v-card__actions{
  display: block;
  text-align: center;
}


/* ボタン */
.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--green {
  color: white;
  background-color: #14B855;
  text-decoration: none;
  border: 1px #14B855 solid;
  border-radius: 20px;
}

a.btn--green:hover {
  color: black;
  background: white;
}

a.btn-e {
  font-size: 16px;
  position: relative;
  padding: 20px;
  border-radius: 100vh;
}


.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--red {
  color: red;
  background-color: white;
  text-decoration: none;
  border: 1px red solid;
  border-radius: 20px;
}

a.btn--red:hover {
  color: #fff;
  background: #EA5303;
}

a.btn-d {
  font-size: 16px;
  position: relative;
  padding: 20px;
  border-radius: 100vh;
}

a.btn-d i.fa {
  margin-right: 1rem;
}
.cansel-btn-wrap{
  padding: 10px;
}
.back-btn{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  color: orange;
  padding: 10px 20px 10px 20px;
  margin-right: 30px;
}
.back-btn:hover{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
}
.cancel-btn{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 10px;
}
.cancel-btn:hover{
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 20px;
  background-color: white;
  color: orange;
  padding: 10px;
}



@media screen and (max-width: 480px) {
  .passcode-img img{
    width: 100%;
  }
  .order-number{
    width: 100%;
  }
}


</style>
