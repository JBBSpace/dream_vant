<template>
  <div class="contain">
    <canvas id="canvas"></canvas>
    <p>{{url}}</p>
  </div>
</template>
<script>
import Vue from "vue";
import QRCode from "qrcode";
Vue.use(QRCode);
export default {
  data () {
    return {
      url: this.$route.params.qrcode
    }
  },
  methods: {
    createQrcode() {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.url.toString(), function(error) {
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
  flex-direction: column;
}
#canvas {
  width: 200px !important;
  height: 200px !important;
}
</style>