<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange darken-4"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <div class="ticket-btn">
            <p>チケットを使用する</p>
            <span>有効期限:2022/10/31</span>
          </div>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 orange darken-4 ">
          QRコード
        </v-card-title>

        <v-card-text>
          <div class="qr-code">
            <img src="~/assets/img/qrcode.png" alt="">
            <p>こちらをかざしてください。</p>
          </div>
        </v-card-text>

      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  width: 100%;
  height: 100%;
}
.theme--dark.v-card > .v-card__text{
  background-color: white;
  color: black;
  padding: 0;
}
.v-application .text-h5 {
  font-size: 16px;
}
.v-card__text{
  padding: 0;
}
.ticket-btn{
  padding: 20px;
}
.ticket-btn p{
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}
.ticket-btn span {
  font-size: 12px;
}
.qr-code{
  width: 50%;
  height: 50%;
  margin: 0 auto;
  text-align: center;
}
.qr-code img {
  width: 100%;
  height: 100%;
}
.qr-code p {
  font-size: 12px;
}
</style>