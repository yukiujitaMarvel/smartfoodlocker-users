<template>
  <div>
    <div class="menu-wrap">

      <a href="/fooddetail">
        <div class="menu-list-wrap">
          <div class="past-wrap"></div>
          <div class="day">
            <p>(金)</p>
          </div>
          <div class="menu-content">
            <div class="menu-img"> 
              <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
            </div>
            <div class="menu-detail">
              <h1>エビチリ弁当</h1>
              <p>¥500<span>tax in</span></p>
            </div>
          </div>
        </div>
      </a>

      <a href="/fooddetail">
        <div class="menu-list-wrap today">
          <div class="day">
            <p>(金)</p>
          </div>
          <div class="menu-content">
            <div class="menu-img"> 
              <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
            </div>
            <div class="menu-detail">
              <h1>エビチリ弁当</h1>
              <p>¥500<span>tax in</span></p>
            </div>
          </div>
        </div>
      </a>

      <a href="/fooddetail">
        <div class="menu-list-wrap">
          <div class="reserved">
            <p>予約済み</p>
          </div>
          <div class="day">
            <p>(金)</p>
          </div>
          <div class="menu-content">
            <div class="menu-img"> 
              <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
            </div>
            <div class="menu-detail">
              <h1>エビチリ弁当</h1>
              <p>¥500<span>tax in</span></p>
            </div>
          </div>
        </div>
      </a>

      <div class="menu-list-wrap">
        <div class="day">
          <p>(金)</p>
        </div>
        <div class="menu-content">
          <div class="menu-img"> 
            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
          </div>
          <div class="menu-detail">
            <h1>エビチリ弁当</h1>
            <p>¥500<span>tax in</span></p>
          </div>
        </div>
      </div>
      <div class="menu-list-wrap">
        <div class="day">
          <p>(金)</p>
        </div>
        <div class="menu-content">
          <div class="menu-img"> 
            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
          </div>
          <div class="menu-detail">
            <h1>エビチリ弁当</h1>
            <p>¥500<span>tax in</span></p>
          </div>
        </div>
      </div>
      <div class="menu-list-wrap">
        <div class="day">
          <p>(金)</p>
        </div>
        <div class="menu-content">
          <div class="menu-img"> 
            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
          </div>
          <div class="menu-detail">
            <h1>エビチリ弁当</h1>
            <p>¥500<span>tax in</span></p>
          </div>
        </div>
      </div>
      <div class="menu-list-wrap">
        <div class="day">
          <p>(金)</p>
        </div>
        <div class="menu-content">
          <div class="menu-img"> 
            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="">
          </div>
          <div class="menu-detail">
            <h1>エビチリ弁当</h1>
            <p>¥500<span>tax in</span></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { API, graphqlOperation} from 'aws-amplify'
import { getItems } from '../graphql/queries'
import { createCarts } from '../graphql/mutations'
import { tsImportEqualsDeclaration } from '@babel/types'

export default {
  head() {
    return {
      title: '献立表 | smartfoodlocker'
    }
  },
  data () {
    return {
      myTitle: 'MENU',
    }
  },
  
  
  methods: {
    
    },
}
</script>

<style scoped>
.v-application a {
  text-decoration: none;
  color: black;
}
.menu-wrap{
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  padding: 10px;
  overflow: scroll;
}
.menu-list-wrap{
  display: flex;
  position: relative;
  transition: 0.2s ease-in-out;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
  border-radius: 20px;
  margin-bottom: 10px;
}
.menu-list-wrap:hover {
  box-shadow: 0 15px 30px -5px rgb(0 0 0 / 15%), 0 0 5px rgb(0 0 0 / 10%);
  transform: translateY(-4px);
}
.day{
  border-right: 1px solid #ddd;
  padding: 10px;
  width: 80px;
  display: table;
}
.day p{
  font-size: 20px;
  font-weight: bold;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.day p::before {
  content: '7/15\A';
  white-space: pre ;
}
.menu-content{
  padding: 10px 10px 0 10px;
  flex: 1;
}
.menu-content .menu-img{
  width: 100%;
  height: 150px;
  border-radius: 20px;
}
.menu-content .menu-img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.menu-detail h1{
  font-size: 16px;
}
.menu-detail{
  text-align: center;
}
.menu-detail p{
  margin: 0;
}
.menu-detail span{
  margin-left: 5px;
  color: rgb(163, 160, 160);
}
.today {
  background-color: #14B85533;
}
.past-wrap{
  position: absolute;
  z-index: 2;
  background-color: #ddd;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
  border-radius: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 208px;
  opacity: 0.5;
}
.reserved{
  position: absolute;
  display: table;
  text-align: center;
  z-index: 2;
  background-color: #EA530380;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 12%), 0 2px 3px 0 rgb(0 0 0 / 22%);
  border-radius: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 208px;
  opacity: 1;
}
.reserved p {
  display: table-cell;
  vertical-align: middle;
  font-weight: 700;
  color: white;
  font-size: 20px;
}


@media screen and (max-width: 959px) {
	/* 959px以下に適用されるCSS（タブレット用） */
  .menu-wrap{
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    padding: 10px;
    overflow: scroll;
  }
}
@media screen and (max-width: 480px) {
	/* 480px以下に適用されるCSS（スマホ用） */
  .menu-wrap{
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 10px;
    overflow: scroll;
  }
}
</style>
