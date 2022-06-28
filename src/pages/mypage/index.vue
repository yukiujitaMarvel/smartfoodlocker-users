<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
    <div class="mypage-info-wrap">
      <div class="mypage-info-inner-wrap">
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>お名前<span>必須</span></h1>
          </div>
          <div class="mypage-contents">
            <input type="text" placeholder="username" readonly>
          </div>
        </div>
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>メールアドレス<span>必須</span></h1>
          </div>
          <div class="mypage-contents">
            <input type="text" placeholder="testuser@gmail.com" readonly>
          </div>
        </div>
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>パスワード<span>必須</span></h1>
          </div>
          <div class="mypage-contents">
            <a href="#">パスワードの変更はこちら</a>
          </div>
        </div>
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>電話番号<span>必須</span></h1>
          </div>
          <div class="mypage-contents">
            <input type="number" placeholder="090-1234-5678" readonly>
          </div>
        </div>
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>住所<span>必須</span></h1>
          </div>
          <div class="mypage-contents">
            <input type="text" placeholder="東京都六本木1-1-1" readonly>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <a href="mypage/edit" class="btn btn--orange btn-c">変更はこちら<font-awesome-icon icon="fa-solid fa-angle-right" style="margin-left:20px;" /></a>
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
      title: 'アカウント情報 | smartfoodlocker'
    }
  },
  data () {
  return {
     myTitle: 'アカウント情報'
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
  padding: 20px;
  color: black;
}
.mypage-contents p{
  font-size: 12px;
  padding: 5px;
}
input{
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 5px 10px;
}
input:focus {
  border: 1px solid #EA5303;
}
span{
  font-size: 12px;
  background-color: white;
  padding: 5px;
  color: red;
  border-radius: 10px;
  margin-left: 10px;
}
a{
  font-size: 12px;
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


