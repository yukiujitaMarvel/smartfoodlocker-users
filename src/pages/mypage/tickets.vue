<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
    <div class="mypage-info-wrap">
      <div class="mypage-info-inner-wrap">
        <div class="mypege-header-wrap">
          <div class="mypage-header">
            <h1>回数チケット一覧</h1>
          </div>
          <div class="mypage-contents">
            <div class="ticket-wrap"> 
              <div class="ticket-img">
                <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" alt="">
              </div>
              <div class="ticket-contents">
                <h3>test</h3>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
              </div>
              <Modal />
            </div>
          </div>
          <div class="mypage-contents">
            <div class="ticket-wrap"> 
              <div class="ticket-img">
                <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" alt="">
              </div>
              <div class="ticket-contents">
                <h3>test</h3>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
              </div>
              <Modal />
            </div>
          </div>
          <div class="mypage-contents">
            <div class="ticket-wrap"> 
              <div class="ticket-img">
                <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" alt="">
              </div>
              <div class="ticket-contents">
                <h3>test</h3>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
                <p>testtesttest</p>
              </div>
              <Modal />
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
import Modal from '~/components/Modal'
import Footer from '~/components/Footer'

export default {
  head() {
    return {
      title: '回数チケット | smartfoodlocker'
    }
  },
  data () {
  return {
     myTitle: '回数チケット'
    }
  },
  components: {
    Header,
    HeaderDetail,
    Modal,
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
.mypage-info-inner-wrap{
  width: 60%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 0 8px gray;
}
.mypage-header{
  background-color: #EA5303;
  color: white;
  padding: 5px 10px;
}
.mypage-header h1{
  font-size: 14px;
}
.mypage-contents{
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: black;
}
.ticket-wrap{
  width: 100%;
  border-radius: 5px;
  border: 2px solid #ddd;
}
.ticket-img{
  width: 100%;
  height: 150px;
}
.ticket-img img {
  width: 100%;
  height: 100%;
}
.ticket-contents{
  text-align: left;
  padding: 10px;
}
.ticket-contents h3 {
  margin-bottom: 16px;
}
.ticket-contents p{
  font-size: 12px;
}
.ticket-btn{
  background-color: #EA5303;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.ticket-btn p {
  margin: 0;
  padding-top: 10px;
}
.ticket-btn:hover {
  background-color: #e96c29;
}
span{
  font-size: 10px;
}
h2{
  font-size: 16px;
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
  .mypage-contents{
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: black;
}
}
</style>


