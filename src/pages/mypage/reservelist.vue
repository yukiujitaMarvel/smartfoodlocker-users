<template>
  <div>
    <Header />
    <HeaderPasscord :title="myTitle" ref="headerDetail"/>
      <div class="reserve-wrap">
        <div class="reserve-inner-wrap">
          <div class="reserve-content">
            <div class="reserve-title">
              <p>予約日時 2022/07/15,11:45~12:00</p>
            </div>
            <div class="reserve-img"> 
              <img src="~/assets/img/reserve.png" alt="">
            </div>
            <div class="button-wrap">
              <a href="#" class="btn btn--green btn-e"><font-awesome-icon icon="fa-solid fa-check" style="padding-right:10px;"/>QRコード・注文番号</a>
            </div>
            <div class="button-wrap">
              <a href="#" class="btn btn--red btn-d"><font-awesome-icon icon="fa-solid fa-trash-can" style="padding-right:10px;" />注文をキャンセルする</a>
            </div>
          </div>

          <div class="reserve-content">
            <div class="reserve-title">
              <p>予約日時 2022/07/15,11:45~12:00</p>
            </div>
            <div class="reserve-img"> 
              <img src="~/assets/img/reserve.png" alt="">
            </div>
            <div class="button-wrap">
              <a href="#" class="btn btn--red btn-d"><font-awesome-icon icon="fa-solid fa-trash-can" style="padding-right:10px;" />注文をキャンセルする</a>
            </div>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderPasscord from '~/components/HeaderPasscord'
import Footer from '~/components/Footer'

export default {
  head() {
    return {
      title: '予約一覧 | smartfoodlocker'
    }
  },
  data () {
    return {
      myTitle: '予約一覧' /*['items.item_name']*/,
    }
  },
  components: {
    Header,
    HeaderPasscord,
    Footer,
  },
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



@media screen and (max-width: 480px) {
  .passcode-img img{
    width: 100%;
  }
  .order-number{
    width: 100%;
  }
}


</style>
