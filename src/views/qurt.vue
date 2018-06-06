<template>
  <div class="contain">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import Vue from "vue";
import QRCode from "qrcode";
Vue.use(QRCode);
export default {
  methods: {
    createQrcode() {
      var canvas = document.getElementById("canvas");
      let url = this.$route.params.qrcode;
      QRCode.toCanvas(canvas, url.toString(), function(error) {
        if (error) console.error(error);
        console.log("success!");
      });
    }
  },
  mounted() {
    this.createQrcode();
  }
};
</script>
<style>
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
}
#canvas {
  width: 200px !important;
  height: 200px !important;
}
</style>