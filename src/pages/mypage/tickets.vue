<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
    <div class="mypage-info-wrap">
      <div class="ticket-wrap">
        <div class="cart">
        </div>
        <div class="ticket-content">
          <div class="ticket-left">
            <div class="ticket-left-content">
              <h5>smartfoodlocker</h5>
              <p>お弁当チケット</p>
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-right-content">
              <p>残り<span>10枚</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="ticket-wrap">
        <div class="cart">
            <a href="#"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="color:#EA5303; font-size:20px;" /></a>
        </div>
        <div class="ticket-content">
          <div class="ticket-left">
            <div class="ticket-left-content">
              <h5>smartfoodlocker</h5>
              <p>お弁当チケット</p>
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-right-content">
              <p>10枚+1枚おまけ</p>
              <p>¥5,500 → <span>¥5,000</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket-wrap">
        <div class="cart">
            <a href="#"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="color:#EA5303; font-size:20px;" /></a>
        </div>
        <div class="ticket-content">
          <div class="ticket-left">
            <div class="ticket-left-content">
              <h5>smartfoodlocker</h5>
              <p>お弁当チケット</p>
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-right-content">
              <p>20枚+3枚おまけ</p>
              <p>¥11,500 → <span>¥10,000</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket-wrap">
        <div class="cart">
            <a href="#"><font-awesome-icon icon="fa-solid fa-cart-arrow-down" style="color:#EA5303; font-size:20px;" /></a>
        </div>
        <div class="ticket-content">
          <div class="ticket-left">
            <div class="ticket-left-content">
              <h5>smartfoodlocker</h5>
              <p>お弁当チケット</p>
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-right-content">
              <p>30枚+5枚おまけ</p>
              <p>¥17,500 → <span>¥15,000</span></p>
            </div>
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

export default {
  head() {
    return {
      title: '回数チケット | smartfoodlocker'
    }
  },
  data () {
  return {
     myTitle: 'チケット'
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer
  },
  
}
</script>

<style scoped>
.mypage-info-wrap{
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
}
p{
  margin: 0;
  font-size: 14px;
}
.ticket-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

}
.ticket-content{
  display: flex;
  width: 89%;
  color: white;
  background-color: #EA5303;
  align-items: center;
  justify-content: start;
}
.ticket-left{
  box-sizing: content-box;
  text-align: center;
  border-right: 6px dotted #fff;
  width: 40%;
}
.ticket-left-content{
  padding: 10px;
}
.ticket-right{
  text-align: center;
}
.ticket-right-content{
  padding: 10px;
}
.ticket-right-content span{
  font-size: 16px;
  font-weight: bold;
}

</style>


