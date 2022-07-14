<template>
  <div>
    <Header ref="userData" />
    <HeaderDetail :title="myTitle" ref="headerDetail"/>
    <div class="food-detail-wrap">
      <div class="food-detail-inner-wrap">
        <div class="food-detail-img">
          <img :src="items.item_img" alt="">
          <div class="price-wrap">
            <p>{{ items.item_price }}<span>taxin</span></p>
          </div>
        </div>
        <div>
          <v-text-field
              v-model="benched"
              type="number"
              label="個数"
              min="1"
              max="10"
            ></v-text-field>
        </div>
        <div class="food-detail-menu" v-if="items.category_id == '01'">
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
        </div>
        <div class="button-wrap">
          <a href="#" v-on:click="addCarts" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="padding-right:10px;" />カートへ追加する</a>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'
import { API, graphqlOperation} from 'aws-amplify'
import { getItems } from '../graphql/queries'
import { createCarts } from '../graphql/mutations'
import { tsImportEqualsDeclaration } from '@babel/types'

export default {
  head() {
    return {
      title: '注文詳細 | smartfoodlocker'
    }
  },
  data () {
    return {
        benched: 1,
        myTitle: '' /*['items.item_name']*/,
        items: {},
        riceOption: "",
        soupOption: "",
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
  async created() {
    await this.getItems();
  },
  methods: {
    async getItems() {
      const query = this.$route.query.id;
      const items = await API.graphql(graphqlOperation(getItems,{id: query}));
      console.log(items);
      this.items = items.data.getItems;
      console.log(this.items);
      this.myTitle = items.data.getItems.item_name;
      
      if(items.data.getItems.category_id === '01'){
        this.riceOption = '01';
        this.soupOption = '01';
      }

      /*const itemLists = await API.graphql(graphqlOperation(listItemLists));
      this.itemLists = itemLists.data.listItemLists.items;

      this.itemLists.forEach((value) => {
        if(value.id == query) {
          this.items = value;
          this.myTitle = value.item_name;
        }
      })*/
    },
    async addCarts() {
      const createCartsInput = {
        item_id: this.items.id,
        user_id: this.$refs.userData.users.attributes.sub,
        rice_option: this.riceOption,
        soup_option: this.soupOption,
        item_num: this.benched,
      };

      await API.graphql(graphqlOperation(createCarts,{input: createCartsInput}));
      await this.$refs.headerDetail.countCarts();
    },
  },
}
</script>

<style scoped>
.food-detail-wrap{
  width: 100%;
  background-color: white;
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

p {
  margin: 0 0 1.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
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
