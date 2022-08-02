<template>
  <div style="z-index: 50;">
    <Header ref="userData" />
    <HeaderDetail :title="myTitle" ref="headerDetail"/>
    <div class="food-detail-wrap">
      <div class="food-detail-inner-wrap">
        <div class="select-day">
          <h3>{{month + '/' + day}}</h3>
        </div>
        <div class="select-day">
          <h3>{{year + '/' + month + '/' + day }},11:45~12:00</h3>
        </div>
        <div class="food-detail-img">
          <img :src="items.item_img" alt="">
          <div class="price-wrap">
            <p>{{items.item_price}}<span>taxin</span></p>
          </div>
        </div>
        <!-- <div>
          <v-text-field
              v-model="benched"
              type="number"
              label="個数"
              min="1"
              max="10"
            ></v-text-field>
        </div> -->
        <div class="itmedetail">
          <p>{{items.item_detail}}</p>
        </div>
        <!-- <div class="food-detail-menu" v-if="items.category_id == '01'">
          <div class="food-detail-title title-top">
            <div class="food-title">
              <h3>ご飯</h3>
            </div>
            <fieldset>
              <input id="item-1" class="radio-inline__input" type="radio" name="rice_option" v-model="riceOption" value="01"/>
              <label class="radio-inline__label" for="item-1">
                  少なめ
              </label>
              <input id="item-2" class="radio-inline__input" type="radio" name="rice_option" v-model="riceOption" value="02"/>
              <label class="radio-inline__label" for="item-2">
                  普通
              </label>
              <input id="item-3" class="radio-inline__input" type="radio" name="rice_option" v-model="riceOption" value="03"/>
              <label class="radio-inline__label" for="item-3">
                  多め +¥30
              </label>
            </fieldset>
          </div>
          <div class="food-detail-title">
            <div class="food-title">
              <h3>味噌汁</h3>
            </div>
            <fieldset>
              <input id="item-4" class="radio-inline__input" type="radio" name="soup-option" v-model="soupOption" value="01"/>
              <label class="radio-inline__label" for="item-4">
                  不要
              </label>
              <input id="item-5" class="radio-inline__input" type="radio" name="soup-option" v-model="soupOption" value="02"/>
              <label class="radio-inline__label" for="item-5">
                  要
              </label>
            </fieldset>
          </div>
        </div> -->

        

        <div v-if="!Object.keys(orders).length" class="button-wrap">
          <a :href="'MOrder?id=' + items.id" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="padding-right:10px;" />予約する</a>
        </div>

        <div v-if="Object.keys(orders).length" class="button-wrap">
          <a href="/ordercomplete" class="btn btn--green btn-e"><font-awesome-icon icon="fa-solid fa-check" style="padding-right:10px;"/>QRコード・注文番号</a>
        </div>

        <div v-if="(Object.keys(orders).length) && (orders.status === '01')" class="button-wrap">
          <a @click="orderStop" class="btn btn--red btn-d"><font-awesome-icon icon="fa-solid fa-trash-can" style="padding-right:10px;" />注文をキャンセルする</a>
        </div>

        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <v-card>
              <h5>{{year + '/' + month + '/' + day + ',' + orders.pickup_time + 'の注文をキャンセルしますか？'}}</h5>
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
                    @click="cancelOrders()"
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
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'
import { API, graphqlOperation, Auth} from 'aws-amplify'
import { getItems, listOrders} from '../graphql/queries'
import { updateOrders } from '../graphql/mutations'
import { tsImportEqualsDeclaration } from '@babel/types'
import '~/assets/css/style.css'

export default {
  head() {
    return {
      title: '注文詳細 | smartfoodlocker'
    }
  },
  data () {
    return {
        dialog: false,
        benched: 1,
        myTitle: '' /*['items.item_name']*/,
        items: {},
        orders: {},
        year:'',
        month:'',
        day:'',
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
  async created() {
    await Promise.all([this.getItems(), this.listOrders()]);
    /*await this.getItems();
    await this.listOrders();*/
  },
  methods: {
    async orderStop(){
      this.dialog = true

    },
    async getItems() {
      const items = await API.graphql(graphqlOperation(getItems,{id: this.$route.query.id}));
      this.items = items.data.getItems;
      this.myTitle = this.items.item_name;

      const ymd = this.items.release_day.split('-');
      this.year = ymd[0];
      this.month = ymd[1];
      this.day = ymd[2];
    },
    async listOrders() {
      const userData = await Auth.currentAuthenticatedUser();
      const user_id = userData.attributes.sub;

      const orders = await API.graphql(
        graphqlOperation(listOrders, {
          filter: {
            and:[
              {item_id: {eq: this.$route.query.id}},
              {user_id: {eq: user_id}}, 
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
      if(orders.data.listOrders.items.length) {
        this.orders = orders.data.listOrders.items[0];
      }
    },
    async cancelOrders() {
      this.dialog = false

      const updateOrdersInput = {
        id: this.orders.id,
        user_id: this.orders.user_id,
        item_id: this.orders.item_id,
        total_price: this.orders.total_price,
        pickup_place: this.orders.pickup_place,
        pickup_time: this.orders.pickup_time,
        status: '05',
        lock_flg: this.orders.lock_flg,
      };

      await API.graphql(graphqlOperation(updateOrders,{input: updateOrdersInput}));

    },
    // async addCarts() {
    //   const createCartsInput = {
    //     item_id: this.items.id,
    //     user_id: this.$refs.userData.users.attributes.sub,
    //     rice_option: this.riceOption,
    //     soup_option: this.soupOption,
    //     item_num: this.benched,
    //   };

    //   await API.graphql(graphqlOperation(createCarts,{input: createCartsInput}));
    //   await this.$refs.headerDetail.countCarts();
    // },
  },
}
</script>

<style scoped>
.food-detail-wrap{
  width: 100%;
  background-color: white;
  position: sticky;
  bottom: 0;
}
.food-detail-inner-wrap{
  width: 60%;
  margin: 0 auto;
  padding: 20px;
}
.food-detail-img{
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  position: relative;
}
.food-detail-img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}
.title-top{
  border-bottom: 1px solid #ddd;
}
.food-detail-title{
  display: flex;
  align-items: center;
  padding: 20px;
}
.food-title{
  width: 60px;
  margin-right: 20px;
}
.food-detail-title h3{
  color: black;
}
.theme--dark.v-application{
  color: black;
}
fieldset {
  border: none;
  padding: 0;
  margin: 0;
  /* text-align: center; */
}

h1 {
  margin: 0;
  line-height: 1.2;
}
h5{
  padding: 30px;
}

p {
  margin: 0 0 1.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
}

.select-day{
  text-align: center;
}
.select-day h3 {
  padding: 10px;
  font-weight: bold;
}
.itmedetail{
  width: 100%;
  padding: 10px;
  overflow-wrap: break-word;
}
.v-card__actions{
  display: block;
  text-align: center;
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
.radio-inline__input {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
}

.radio-inline__label {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 5px;
    border-radius: 20px;
    transition: all .2s;
    border: 1px solid #ddd;
    color: black;
}

.radio-inline__input:checked + .radio-inline__label {
    background: #FF9800;
    color: #fff;
    font-weight: bold;
    text-shadow: 0 0 1px rgba(0,0,0,.7);
}

.radio-inline__input:focus + .radio-inline__label {
    outline-color: #ddd;
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
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
/* 値段 */
.price-wrap {
  position: absolute;
  width: 150px;
  height: 50px;
  border-radius: 30px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  top: 300px;
  right: 10px;
}
.price-wrap p {
  border: none;
  height: 100%;
  padding: 15px;
}
.price-wrap span {
  font-size: 12px;
  color: rgb(172, 170, 170);
  padding-left: 20px;
}

/* ボタン */
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
	.food-detail-wrap{
    width: 100%;
    background-color: white;
  }
  .food-detail-inner-wrap{
    width: 100%;
    padding: 20px;
  }
  .food-detail-img{
    width: 100%;
    height: 230px;
  }
  .food-detail-title{
    font-size: 12px;
  }
  .price-wrap {
  position: absolute;
  width: 130px;
  height: 50px;
  border-radius: 30px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  top: 150px;
  right: 10px;
}

}
</style>
