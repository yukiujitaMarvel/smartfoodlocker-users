<template>
  <div>
    <Header ref="userData" />
    <HeaderDetail :title="myTitle" />
      <div class="cart-wrap">
        <div v-for="cart in carts" v-bind:key="cart.id" class="wrapper">
          <div class="product-img">
            <img v-bind:src="cart.items.item_img">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>{{cart.items.item_name}}<span>¥{{cart.items.item_price}}</span></h1>
              <h2 v-if="cart.rice_option">
                ご飯
                <span v-if="cart.rice_option === '01'">少なめ</span>
                <span v-else-if="cart.rice_option === '02'">普通</span>
                <span v-else>多め</span>
                <span v-if="cart.rice_option === '03'">¥30</span>
              </h2>
              <h2 v-if="cart.soup_option">
                味噌汁
                <span v-if="cart.soup_option === '01'">なし</span>
                <span v-else>要</span>
                <span v-if="cart.soup_option === '02'">¥50</span>
              </h2>
              <div class="product-price-btn">
                <p>¥{{getPrice(cart)}}円</p>
                <v-btn
                  @click="deleteCarts(cart)"
                  absolute
                  color="red"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="wrapper">
          <div class="product-img">
            <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>焼き魚弁当<span>¥500</span></h1>
              <h2>ご飯<span>大盛り</span><span>¥30</span></h2>
              <h2>味噌汁<span>要</span><span>¥50</span></h2>
              <div class="product-price-btn">
                <p>¥580円</p>
                <v-btn
                  absolute
                  color="red"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="product-img">
            <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>焼き魚弁当<span>¥500</span></h1>
              <h2>ご飯<span>大盛り</span><span>¥30</span></h2>
              <h2>味噌汁<span>要</span><span>¥50</span></h2>
              <div class="product-price-btn">
                <p>¥580円</p>
                <v-btn
                  absolute
                  color="red"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="product-img">
            <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>焼き魚弁当<span>¥500</span></h1>
              <h2>ご飯<span>大盛り</span><span>¥30</span></h2>
              <h2>味噌汁<span>要</span><span>¥50</span></h2>
              <div class="product-price-btn">
                <p>¥580円</p>
                <v-btn
                  absolute
                  color="red"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </v-btn>
              </div>
            </div>
          </div>
        </div>-->
        <div class="button-wrap">
          <a href="order" class="btn btn--orange btn-c">お支払い<font-awesome-icon icon="fa-solid fa-angle-right" style="margin-left:20px;" /></a>
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
import { listCarts } from '../graphql/queries'
import { deleteCarts } from '../graphql/mutations'
import Auth from "@aws-amplify/auth";

export default {
  head() {
    return {
      title: '買い物カゴ | smartfoodlocker'
    }
  },
  data () {
    return {
      myTitle: '注文内容',
      carts: [],
      user_id: '',
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
  async created() {
    await this.listCarts();
  },
  methods: {
    async listCarts() {
      const userData = await Auth.currentAuthenticatedUser();
      this.user_id = userData.attributes.sub;
      const carts = await API.graphql(
        graphqlOperation(
          listCarts, {
            filter: {
              user_id: {
                eq: this.user_id
              }
            }
          }
        )
      );
      this.carts = carts.data.listCarts.items;
      console.log(this.carts[0]?.item_id);
    },
    async deleteCarts(cart) {
      const deleteCartsInput = {
        id: cart.id
      };
      await API.graphql(graphqlOperation(deleteCarts,{input: deleteCartsInput}));
      const carts = await API.graphql(
        graphqlOperation(
          listCarts, {
            filter: {
              user_id: {
                eq: this.user_id
              }
            }
          }
        )
      );
      this.carts = carts.data.listCarts.items;
    },
    getPrice(cart) {
      let price = Number(cart.items.item_price);
      console.log(price);

      if(cart.rice_option === '03') {
        price = price + 30;
        console.log(price);
      }
      if(cart.soup_option === '02') {
        price = price + 50;
        console.log(price);
      }
      console.log(price);

      return price;
    }
  }
}
</script>

<style scoped>
.cart-wrap{
  background-color: white;
  padding: 20px;
  height: 100%;
}

.wrapper {
  height: 250px;
  width: 60%;
  margin: 30px auto;
  border-radius: 7px 7px 7px 7px;
  /* VIA CSS MATIC https://goo.gl/cIbnS */
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
  height: 100%;
  width: calc(100% / 2);
}

.product-img img {
  border-radius: 7px 0 0 7px;
  width: 100%;
  height: 100%;
}

.product-info {
  float: left;
  height: 100%;
  width: calc(100% / 2);
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 100%;
  width: 100%;
}

.product-text h1 {
  font-size: 16px;
  padding: 20px 10px 10px 20px;
  color: #474747;
}

.product-text h1,
.product-text h2,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  font-size: 12px;
  font-weight: 400;
  padding: 10px 20px 10px 20px;
  text-transform: uppercase;
  color: #1a1919;
  letter-spacing: 0.2em;
}

.product-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  height: 103px;
  width: 100%;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 20px;
  font-size: 20px;
  font-weight: bold;
  color: #474747;
}

span {
  padding-left: 20px;
}

.product-price-btn button:hover {
  background-color: #79b0a1;
}

.v-btn--fab.v-size--large.v-btn--absolute.v-btn--top{
  top: 50px;
}

.v-btn--fab.v-size--large{
  width: 32px;
  height: 32px;
}

.mdi:before{
  font-size: 20px;
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
	.wrapper {
    width: 100%;
    height: 160px;
  }
  .product-img {
  float: left;
  height: 100%;
  width: calc(100% / 2);
}

.product-img img {
  border-radius: 7px 0 0 7px;
  width: 100%;
  height: 100%;
}

.product-info {
  float: left;
  height: 100%;
  width: calc(100% / 2);
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 100%;
  width: 100%;
}

.product-text h1 {
  font-size: 12px;
  padding: 10px;
  color: #474747;
}
.product-text h2 {
  font-size: 10px;
  font-weight: 400;
  padding: 5px 10px 5px 10px;
  text-transform: uppercase;
  color: #1a1919;
  letter-spacing: 0.2em;
}
.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: #474747;
}

span {
  padding-left: 10px;
}

.v-btn--fab.v-size--large.v-btn--absolute.v-btn--top{
  top: 15px;
}
}
</style>
