<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
      <div class="order-wrap">
        <div class="order-inner-wrap">
          <div class="order-info">
            <h1>注文日時2022-10-31 11:40</h1>
            <ol class="order-list">
              <li>焼き魚弁当</li>
              <span class="amount">大盛り</span><span>味噌汁</span>
              <li>デリサラダ</li>
            </ol>
            <div class="total-price">
              <p>¥860</p>
            </div>
            <div class="button-wrap">
              <a href="#" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-trash-can" style="margin-right: 20px;"/>注文をキャンセルする</a>
            </div>
          </div>
          <div class="order-info">
            <h1>注文日時2022-10-20 11:40</h1>
            <ol class="order-list">
              <li>焼き魚弁当</li>
              <span class="amount">大盛り</span><span>味噌汁</span>
              <li>デリサラダ</li>
            </ol>
            <div class="total-price">
              <p>¥860</p>
            </div>
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
import '~/assets/css/style.css'

export default {
  head() {
    return {
      title: '注文履歴 | smartfoodlocker',
    }
  },
  data () {
  return {
     myTitle: '注文履歴'
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
}
</script>

<style scoped>
.order-wrap{
  background-color: white;
  color: black;
  padding: 20px;
  height: 100%;
}
.order-inner-wrap{
  width: 60%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 8px gray;
}
h1{
  font-size: 12px;
  padding: 10px 0 10px 0;
}
.order-list{
  font-weight: bold;
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

/* ボタン */
.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--orange {
  color: #fff;
  background-color: red;
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
