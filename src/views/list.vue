<template>  
    <van-tabs swipeable sticky v-model="tab">
      <van-tab title="待签批">
        <van-list
          v-model="waitLoading"
          :finished="waitFinished"
          @load="loadMore"
        >
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item v-for="item in waitList" :name="item.id" :key="item.id">
              <div slot="title">
                <span>{{item.appdate}} {{item.c_selldeptname}}</span> 
                <van-button type="primary" size="mini" @click.stop="ok(item.id)">签批</van-button></div>
                {{item.c_comment}}
            </van-collapse-item>
          </van-collapse>
        </van-list>
      </van-tab>
      <van-tab title="已签批">
        <van-list
          v-model="signedLoading"
          :finished="signedFinished"
          @load="loadMore"
        >
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item v-for="item in signedList" :name="item.id" :key="item.id">
              <div slot="title">
                <span>{{item.appdate}} {{item.c_selldeptname}}</span> 
              </div>
              {{item.c_comment}}
            </van-collapse-item>
          </van-collapse>
        </van-list>
      </van-tab>
    </van-tabs>
</template>  
  
<script>
import { Toast } from "vant";
import util from "@/helper/util";

import listAPI from "@/services/list";
export default {
  data() {
    return {
      tab: 0,
      activeNames: [],
      waitList: [],
      signedList: [],
      waitLoading: false,
      signedLoading: false,
      waitFinished: false,
      signedFinished: false
    };
  },
  methods: {
    loadMore() {
      let params = { ConferID: "U00225" };
      !this.tab
        ? (params.count = this.waitList.length+1)
        : (params.count = this.signedList.length+1);

      listAPI.getList({ params: { ...params } }).then(res => {
        const { waitSign, Signed } = res.data.data;
        const { waitSignIsEnd, SignedIsEnd} = res.data;
        if (!this.tab) {
          this.waitList = this.waitList.concat(waitSign);
          this.waitLoading = false;
          if (!waitSignIsEnd) {
            this.waitFinished = true;
          }
        } else {
          this.signedList = this.signedList.concat(Signed);
          this.signedLoading = false;
          if (!SignedIsEnd) {
            this.signedFinished = true;
          }
        }
      });
    },
    ok(e) {}
  }
};
</script>  
  
<style lang="scss">
.van-tabs__line {
  background-color: #06bf04;
}
.van-cell {
  align-items: center;
}
.van-tab--active {
  color: #06bf04;
}
.van-cell__right-icon {
  display: none;
}
.van-cell__value div {
  width: 100%;
  span {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .oked {
    width: 100%;
  }
}

.van-collapse-item__content {
  color: #ccc;
  font-size: 12px;
}
</style>  