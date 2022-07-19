<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" :color="myColor" ref="headerDetail"/>
      <div class="passcode-wrap">
        <div class="passcode-inner-wrap">
          <div class="passcode-img">
            <img src="~/assets/img/passcode-icon.png" alt="">
            <div class="passcode-aria">
              <img src="~/assets/img/qrcode.png" alt="">
            </div>
            <p>注文日時　2022-10-31 11:40</p>
          </div>

          <div class="order-number-area">
            <h5>注文番号</h5>
            <div class="order-number">
              <p>6426</p>
            </div>
          </div>
        </div>
        <div class="button-wrap">
          <a href="/" class="btn btn--orange btn-c"><font-awesome-icon icon="fa-solid fa-xmark" style="margin-right:20px;"/>閉じる</a>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'

export default {
  head() {
    return {
      title: '注文完了 | smartfoodlocker'
    }
  },
  data () {
    return {
      myTitle: '商品受取' /*['items.item_name']*/,
      myColor: 'background-color:red;'
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
.passcode-wrap{
  background-color: #EA5303;
  color: white;
  padding: 20px;
  height: 100%;
}
.passcode-inner-wrap {
  width: 60%;
  margin: 0 auto;
}
.passcode-img{
  text-align: center;
}
.passcode-img img{
  width: 50%;
}
.passcode-img p{
  font-size: 12px;
  padding: 5px;
}
.passcode-aria{
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 30px;
}
.passcode-aria img {
  width: 100%;
  height: 100%;
}
.order-number-area{
  text-align: center;
  color: white;
}
.order-number{
  width: 50%;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  color: black;
  border-radius: 30px;
}
.order-number p{
  font-size: 45px;
}
/* ボタン */
.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--orange {
  color: #EA5303;
  background-color: white;
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
  .passcode-img img{
    width: 100%;
  }
  .order-number{
    width: 100%;
  }
}


</style>
