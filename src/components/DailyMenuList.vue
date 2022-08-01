<template>
  <div style="z-index: 50;">
    <div class="menu-wrap">

      <a v-for="date in dates"
        :key="date.ymd" 
        :href="Object.keys(date.items).length ? 'fooddetail?id=' + date.items.id :null" 
        :tabindex="Object.keys(date.items).length ? null:-1"
      >
        <div class="menu-list-wrap" :class="{'today':isEqualDates(date,today)}">
          <div v-if="Object.keys(date.orders).length" class="reserved">
            <p>予約済み</p>
          </div>
          <div v-if="compareDates(date,today)" class="past-wrap"></div>
          <div class="day">
            <p :data-text="date.month + '/' + date.day + '\n'">({{date.weekDay}})</p>
          </div>
          <div class="menu-content">
            <div class="menu-img"> 
              <img v-if="Object.keys(date.items).length" :src="date.items.item_img" alt="">
            </div>
            <div class="menu-detail">
              <h1 v-if="Object.keys(date.items).length">{{date.items.item_name}}</h1>
              <p v-if="Object.keys(date.items).length">¥{{date.items.item_price}}<span>tax in</span></p>
            </div>
          </div>
        </div>
      </a>

      <!--<a href="/fooddetail">
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
      </div>-->

    </div>
  </div>
</template>

<script>
import { API, graphqlOperation, Auth} from 'aws-amplify'
import { listItems, listOrders } from '../graphql/queries'
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
      maxDays: 14,
      dates: [],
      items: [],
      orders: [],
      today: "",
    }
  },
  async created() {
    const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    this.today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    };
    await this.getDates();
  },
  mounted() {
    let target = document.getElementsByClassName('today');
    target[0].scrollIntoView(true);
  },
  methods: {
    async getDates() {
      const dayBefore =  Math.ceil(this.maxDays / 2) - 1;
      const wd = ['日','月','火','水','木','金','土'];

      for (let i = 0; i < this.maxDays; i++) {
        const startDate = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
        startDate.setDate(startDate.getDate() - (dayBefore - i));
        
        const y = startDate.getFullYear();
        const m = startDate.getMonth() + 1;
        const d = startDate.getDate();

        this.dates.push({
          timeStamp: startDate,
          year: y,
          month: m,
          day: d,
          ymd: y + '-' + m.toString().padStart(2, '0') + '-' + d.toString().padStart(2, '0'),
          weekDay: wd[startDate.getDay()],
          items: '',
          orders:'',
        });
      }

      await this.listItems();
      await this.listOrders();

      if(this.items.length) {
        this.dates.forEach((date,index) => {
          this.items.forEach((item) => {
            if(item.release_day === date.ymd) {
              this.dates[index].items = item;
              this.orders.forEach((order) => {
                if(order.item_id === item.id) {
                  this.dates[index].orders = order;
                }
              });
            }
          });
        });
      }

      console.log(this.dates);
    },
    async listItems() {
      console.log(this.dates[0].ymd);
      console.log(this.dates[this.maxDays-1].ymd);

      let items = '';

      items = await API.graphql(
        graphqlOperation(listItems, {
          filter: {release_day: {ge: this.dates[0].ymd, le: this.dates[this.maxDays-1].ymd}}
        })
      );

      this.items = items.data.listItems.items;

      console.log(this.items);
    },
    async listOrders() {
      const userData = await Auth.currentAuthenticatedUser();
      const user_id = userData.attributes.sub;

      const itemIDArray = [];
      this.items.forEach((item) => {
        itemIDArray.push({item_id: {eq: item.id}});
      });

      if(itemIDArray.length) {
        const orders = await API.graphql(
          graphqlOperation(listOrders, {
            filter: {
              and:[
                {user_id: {eq: user_id}}, 
                {or: [
                  {status: {eq: "01"}}, 
                  {status: {eq: "02"}}, 
                  {status: {eq: "03"}}, 
                  {status: {eq: "04"}},
                ]}, 
                {or: itemIDArray},
              ],
            }
          })
        );
        this.orders = orders.data.listOrders.items;
      }

      console.log(this.orders);

    },
    isEqualDates(date1,date2) {
      if (date1.year === date2.year) {
        if (date1.month === date2.month) {
          return (date1.day === date2.day);
        }
        else {
          return false;
        }
      } else {
        return false;
      } 
    },
    compareDates(date1,date2) {
      if (date1.year === date2.year) {
        if (date1.month === date2.month) {
          return (date1.day < date2.day);
        }
        else {
          return (date1.month < date2.month);
        }
      } else {
        return (date1.year < date2.year);
      } 
    },
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
  content: attr(data-text)"";
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
  height: 48px;
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
