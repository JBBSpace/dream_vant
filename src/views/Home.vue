<template>  
    <van-tabs sticky v-model="formData.type">
      <van-tab title="类别折扣">
        <van-cell-group>
          <van-field label="折扣额度(1-100%) :" v-model="formData.discount" placeholder="请输入折扣额度" center required icon="clear" @click-icon="formData.discount = ''" type='number'/>
          <p v-show="!err" class="errMsg">折扣额度(1-100%)</p>
        </van-cell-group>
        <van-checkbox-group class="checkbox_group" v-model="checkedClass">
          <van-checkbox
            v-for="(item) in classList"
            :key="item.classid"
            :name="item.classid"
          >
            {{ item.name}}
          </van-checkbox>
        </van-checkbox-group>
        <van-button :disabled="formData.discount&&checkedClass.length>0&&err?false:true" type="primary" size="large" @click="postDiscountData">生成折扣券</van-button>
      </van-tab>
      <van-tab title="整单折扣">
        <van-cell-group>
          <van-field label="折扣额度(1-100%) :" v-model="formData.discount" placeholder="请输入折扣额度" center required icon="clear" @click-icon="formData.discount = ''" type='number'/>
          <p v-show="!err" class="errMsg">折扣额度(1-100%)</p>
        </van-cell-group>
        <van-button :disabled="formData.discount&&err?false:true" type="primary" size="large" @click="postDiscountData">生成折扣券</van-button>
      </van-tab>
      <van-tab title="现金折扣">
        <van-cell-group>
          <van-field label="折扣金额 :" v-model="formData.discount" placeholder="请输入折扣额度" center required icon="clear" @click-icon="formData.discount = ''" type='number'/>
        </van-cell-group>
        <van-button :disabled="formData.discount?false:true" type="primary" size="large" @click="postDiscountData">生成折扣券</van-button>
      </van-tab>
    </van-tabs>
</template>  
  
<script>
import { Toast } from 'vant';
import util from '@/helper/util';

import homeAPI from "@/services/home";
export default {
  data() {
    return {
      formData :{
        type: 0,
        discount: ''
      },
      checkedClass: [],
      classList: []
    };
  },
  computed:{
    err(){
      return this.formData.discount == '' || (this.formData.discount >=1 && this.formData.discount <=100);
    }
  },
  methods: {
    getList() {
      const code = this.$route.query.code?this.$route.query.code:'';
      const params = {
        code: code,
        userid: util.getCookie('userid')
      }
      homeAPI.getList({params: { ...params }}).then(res => {
        this.classList = res.data.data;
      });
    },
    postDiscountData(){
      const data = {
        userid: util.getCookie('userid'),
        class: this.checkedClass.join(','),
        discount: this.formData.discount,
        type: this.formData.type
      }
      homeAPI.postDiscountData({ data: { ...data } }).then(res => {
        if(res.data.status != 0){
          Toast(res.data.message);
        }else{
          const {barcode} = res.data.data;
          window.location.href = `/static/userinfo/qrcode.html?barcode=${barcode}`
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>  
  
<style lang="scss">
.van-tabs__line{
  background-color: #06bf04;
}
.van-tab--active{
  color: #06bf04;
}
.van-field .van-cell__title{
  max-width:375px;
}
.checkbox_group {
  padding: 5px 12px;
}
.van-checkbox__label{
  font-size: 30px;
}
.van-checkbox {
    border-bottom: 1px #eee solid;
    padding: 10px 0;
}
.errMsg{
  text-align: center;
  color:red;
  font-size: 22px;
  padding:10px 0;
}
</style>  