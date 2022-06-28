<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
    <div class="mypage-info-wrap">
      <div class="mypage-info-inner-wrap">
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>クレジットカードの追加</h1>
          </div>
          <div class="mypage-contents">
            <div class="contents-title">
              <h2>カード番号</h2>
            </div>
            <div class="contents-input">
              <input type="number" placeholder="0000-0000-00000">
            </div>
          </div>
          <div class="mypage-contents">
            <div class="contents-title">
              <h2>有効期限</h2>
            </div>
            <div class="contents-input">
              <input type="number" placeholder="02/25">
            </div>
          </div>
          <div class="mypage-contents">
            <div class="contents-title">
              <h2>セキュリティコード</h2>
            </div>
            <div class="contents-input">
              <input type="number" placeholder="123">
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <a href="/mypage/payinfo" class="btn btn--orange btn-c">保存する<font-awesome-icon icon="fa-solid fa-angle-right" style="margin-left:20px;" /></a>
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
      title: 'アカウント情報編集 | smartfoodlocker'
    }
  },
  data () {
  return {
     myTitle: '支払い情報編集'
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: gray;
  border-bottom: 1px solid #ddd;
}
.mypage-contents h2{
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


