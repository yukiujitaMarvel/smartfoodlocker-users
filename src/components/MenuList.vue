<template>
  <div>
      <v-tabs
      background-color="white"
      color="orange darken-1"
      center
      >
      <v-tab color="main" @click="isSelect('1')">お弁当</v-tab>
      <v-tab color="main" @click="isSelect('2')">サンドイッチ</v-tab>
      <v-tab color="main" @click="isSelect('3')">サラダ</v-tab>
      <v-tab color="main" @click="isSelect('4')">スープ</v-tab>

      <v-tab-item
        v-for="n in 4"
        :key="n"
      >
        <v-container fluid v-if="isActive === '1'">
          <v-row>
            <div class="col_4">
              <div v-for="bento in bentos" :key="bento.id">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <a :href="'fooddetail?id=' + bento.id">
                    <v-img
                      :aspect-ratio="16/12"
                      :src="bento.item_img"
                    >
                    </v-img>
                  </a>
                  <v-card-text
                    class="pt-6"
                    style="position: relative;"
                  >
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      fab
                      large
                      right
                      top
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <p class="card-title">{{ bento.item_name }}</p>
                    <p class="card-text"><span style="font-weight:bold;">{{ bento.item_price }}</span> tax</p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-row>
        </v-container>
        <v-container fluid v-if="isActive === '2'">
          <v-row>
            <div class="col_4">
              <div v-for="sandwich in sandwichs" :key="sandwich.id">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <a :href="'fooddetail?id=' + sandwich.id">
                    <v-img
                      :aspect-ratio="16/12"
                      :src="sandwich.item_img"
                    >
                    </v-img>
                  </a>
                  <v-card-text
                    class="pt-6"
                    style="position: relative;"
                  >
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      fab
                      large
                      right
                      top
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <p class="card-title">{{ sandwich.item_name }}</p>
                    <p class="card-text"><span style="font-weight:bold;">{{ sandwich.item_price }}</span> tax</p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-row>
        </v-container>
        <v-container fluid v-if="isActive === '3'">
          <v-row>
            <div class="col_4">
              <div v-for="salad in salads" :key="salad.id">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <a :href="'fooddetail?id=' + salad.id">
                    <v-img
                      :aspect-ratio="16/12"
                      :src="salad.item_img"
                    >
                    </v-img>
                  </a>
                  <v-card-text
                    class="pt-6"
                    style="position: relative;"
                  >
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      fab
                      large
                      right
                      top
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <p class="card-title">{{ salad.item_name }}</p>
                    <p class="card-text"><span style="font-weight:bold;">{{ salad.item_price }}</span> tax</p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-row>
        </v-container>
        <v-container fluid v-if="isActive === '4'">
          <v-row>
            <div class="col_4">
              <div v-for="soup in soups" :key="soup.id">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <a :href="'fooddetail?id=' + soup.id">
                    <v-img
                      :aspect-ratio="16/12"
                      :src="soup.item_img"
                    >
                    </v-img>
                  </a>
                  <v-card-text
                    class="pt-6"
                    style="position: relative;"
                  >
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      fab
                      large
                      right
                      top
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <p class="card-title">{{ soup.item_name }}</p>
                    <p class="card-text"><span style="font-weight:bold;">{{ soup.item_price }}</span> tax</p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
import { listItems } from '../graphql/queries'

export default {
  data() {
    return {
      items: [],
      bentos: [],
      sandwichs: [],
      salads: [],
      soups: [],
      isActive: '1'
    }
  },
  async created() {
    await this.getItems1()
    await this.getItems2()
    await this.getItems3()
    await this.getItems4()
  },
  methods: {
    async getItems1() {
      const items = await API.graphql(graphqlOperation(listItems));
      this.items = items.data.listItems.items;
      
      this.items.forEach((value) => {
        if(value.category_id == '01') {
          this.bentos.push(value)
          console.log(this.bentos)
        }
      })
    },
    async getItems2() {
      const items = await API.graphql(graphqlOperation(listItems));
      this.items = items.data.listItems.items;
      
      this.items.forEach((value) => {
        if(value.category_id == '02') {
          this.sandwichs.push(value)
          console.log(this.sandwichs)
        }
      })
    },
    async getItems3() {
      const items = await API.graphql(graphqlOperation(listItems));
      this.items = items.data.listItems.items;
      
      this.items.forEach((value) => {
        if(value.category_id == '03') {
          this.salads.push(value)
          console.log(this.salads)
        }
      })
    },
    async getItems4() {
      const items = await API.graphql(graphqlOperation(listItems));
      this.items = items.data.listItems.items;
      
      this.items.forEach((value) => {
        if(value.category_id == '04') {
          this.soups.push(value)
          console.log(this.soups)
        }
      })
    },

    isSelect(num) {
      this.isActive = num;
    }
  },
}
</script>



<style scoped>
/* 4カラム */
*, *:before, *:after {
	box-sizing: border-box;
}
.col_4{
	width: 100%;
	display: flex;
	display: -ms-flexbox; /* IE10 */
	flex-wrap: wrap;
	-ms-flex-wrap: wrap; /* IE10 */
background-color: white; /* 背景の色 */
color: #FFF; /* 文字の色 */
text-align: center; /* 内容は中央配置 */
}
.col_4 > div{
	width: 25%;
	padding: 10px;
}

/*--------------------------------------
  注文カートボタン
--------------------------------------*/
.v-btn--fab.v-size--large{
  width: 32px;
  height: 32px;
}
.mdi:before{
  font-size: 20px;
}

/*--------------------------------------
  カード型
--------------------------------------*/
.l-wrapper {
  margin: 1rem auto;
  width: 100%;
}

.l-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 7px 34px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  transition: all .5s;
}
.card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.card-img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
.card-content {
  padding: 8px 20px 20px;
}
.card-title {
  font-size: 18px;
  color: #333;
  font-weight: 700;
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0.2em;
}
.card-link {
  text-align: center;
  border-top: 1px solid #eee;
  padding: 20px;
}
.card-link a {
  text-decoration: none;
  color: #4f96f6;
  margin: 0 10px;
}
.card-link a:hover {
  color: #6bb6ff;
}

.card-content p {
  margin-bottom:0;
}

.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active){
  color: gray;
}
@media screen and (max-width: 1090px) {
	.col_4 > div{
		width: 33.33333%;
	}
}
@media screen and (max-width: 480px) {
	.col_4 > div{
		width: 50%;
	}
}
</style>