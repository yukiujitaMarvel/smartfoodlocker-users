<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
    <div class="mypage-info-wrap">
      <div class="mypage-info-inner-wrap">
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>登録済クレジットカード情報</h1>
          </div>
          <div class="mypage-contents">
            <h2>VISA ***********1234<span>02/25</span></h2>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <a href="/mypage/payinfoedit" class="btn btn--orange btn-c">変更する<font-awesome-icon icon="fa-solid fa-angle-right" style="margin-left:20px;" /></a>
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
      title: '支払い情報 | smartfoodlocker'
    }
  },
  data () {
  return {
     myTitle: '支払い情報'
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
.mypage-info-wrap{
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;

}
.mypage-info-inner-wrap{
  width: 60%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 0 8px gray;
}
.mypage-header{
  background-color: #EA5303;
  padding: 5px 10px;
}
.mypage-header h1{
  font-size: 14px;
}
.mypage-contents{
  text-align: center;
  padding: 20px;
  color: black;
}
span{
  font-size: 12px;
  background-color: white;
  padding: 5px;
  color: black;
  border-radius: 10px;
  margin-left: 10px;
}
h2{
  font-size: 16px;
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
  .mypage-info-wrap{
    padding: 50px 0;
  }
  .mypage-info-inner-wrap{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 0 8px gray;
  }
}
</style>


