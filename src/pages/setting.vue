<template>
  <div>
    <Header />
    <HeaderDetail :title="myTitle" />
      <div class="order-wrap">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            grow
          >
            <v-tab>
              <p><v-icon style="margin-right:5px;">mdi-account</v-icon>アカウント</p>
            </v-tab>
            <v-tab>
              <p><v-icon style="margin-right:5px;">mdi-credit-card-settings-outline</v-icon>お支払い</p>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card>
                <v-card-text>
                  <v-text-field label="ユーザー名" value="John Doe" v-model="users.username" readonly></v-text-field>
                  <v-text-field label="電話番号" v-model="users.attributes.phone_number" readonly></v-text-field>
                  <v-text-field label="メールアドレス" v-model="users.attributes.email" readonly></v-text-field>
                  <v-text-field label="パスワード" value="*******" readonly></v-text-field>
                  <div class="button-wrap">
                    <a href="#" class="btn btn--logout btn-a">ログアウト</a>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-card-text>
                  <v-radio-group
                    v-model="column"
                    column
                  >
                    <v-radio
                      label="VISA"
                      value="radio-1"
                    ></v-radio>
                    <div class="card-info">
                      <p>****-****-****-000</p>
                      <p>有効期限:23/11/12</p>
                    </div>
                    <v-divider></v-divider>
                    <v-radio
                      label="JCB"
                      value="radio-2"
                    ></v-radio>
                    <div class="card-info">
                      <p>****-****-****-000</p>
                      <p>有効期限:23/11/12</p>
                    </div>
                  </v-radio-group>
                  <div class="button-wrap">
                    <a href="#" class="btn btn--orange btn-c">追加登録</a>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import HeaderDetail from '~/components/HeaderDetail'
import Footer from '~/components/Footer'
import Auth from "@aws-amplify/auth";



export default {
  head() {
    return {
      title: '注文内容確認 | smartfoodlocker'
    }
  },
  data () {
  return {
    myTitle: '設定',
      tab: null,
      column: null,
      users: {
        username: '',
        attributes: [
          {
            phone_number: '',
            email: '',
          }
        ]
      }
    }
  },
  components: {
    Header,
    HeaderDetail,
    Footer,
  },
  async created() {
    const userData = await Auth.currentAuthenticatedUser();
    this.users = userData
  },
  methods: {
    
    
  }  
}
</script>

<style>
.order-wrap{
  background-color: white;
  color: black;
  padding: 20px;
  height: 100%;
}
.v-text-field{
  padding: 0;
}
.v-radio{
  padding: 10px 0 10px 0;
}
.v-slide-group__content{
  color: #EA5303 ;
}
.card-info{
  display: flex;
  justify-content: space-between;
}
.card-info p {
  font-size: 14px;
}




/* ボタン */
.button-wrap{
  width: 100%;
  margin: 50px 0 50px 0;
  font-weight: bold;
  text-align: center;
}

a.btn--orange {
  color: #fff !important;
  background-color: #EA5303;
  text-decoration: none;
}

a.btn--orange:hover {
  color: #fff;
  background: #f17532;
}
a.btn--logout {
  color: #EA5303 !important;
  background-color: white;
  border: #EA5303 1px solid;
  text-decoration: none;
}

a.btn--logout:hover {
  color: #fff !important;
  background: #f17532;
}

a.btn-c {
  font-size: 16px;
  position: relative;
  padding: 20px;
  border-radius: 100vh;
}
a.btn-a {
  font-size: 16px;
  position: relative;
  padding: 20px;
  border-radius: 100vh;
}

a.btn-c i.fa {
  margin-right: 1rem;
}

</style>
