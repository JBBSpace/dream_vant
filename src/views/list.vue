<template>  
    <van-tabs swipeable sticky v-model="tab">
      <van-tab title="待签批">
        <van-list
          v-model="waitLoading"
          :finished="waitFinished"
          @load="loadMore"
        >
          <template v-if="waitList.length > 0">
            <van-collapse v-model="activeNames" accordion>
              <van-collapse-item v-for="item in waitList" :name="item.id" :key="item.id">
                <div slot="title">
                  <span>{{item.appdate}} {{item.c_selldeptname}}</span> 
                  <van-button type="primary" size="mini" @click.stop="isOk(item.id,true)">签批</van-button>
                  <van-button type="danger" size="mini" @click.stop="isOk(item.id,false)">拒绝</van-button>
                </div>
                {{item.c_comment}}
              </van-collapse-item>
            </van-collapse>
          </template>
          <template v-else>
            <van-cell-group>
              <van-cell class="no_data" value="暂无内容" />
            </van-cell-group>
          </template>
        </van-list>
      </van-tab>
      <van-tab title="已签批">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="signedLoading"
            :finished="signedFinished"
            @load="loadMore"
          >
            <template v-if="signedList.length > 0">
              <van-collapse v-model="activeNames" accordion>
                <van-collapse-item v-for="item in signedList" :name="item.id" :key="item.id">
                  <div slot="title">
                    <span>{{item.appdate}} {{item.c_selldeptname}}</span> 
                  </div>
                  {{item.c_comment}}
                </van-collapse-item>
              </van-collapse>
            </template>
            <template v-else>
              <van-cell-group>
                <van-cell class="no_data" value="暂无内容" />
              </van-cell-group>
            </template>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
</template>  
  
<script>
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
      signedFinished: false,
      isLoading: false
    };
  },
  methods: {
    // 加载更多
    loadMore(t) {
      const params = { ConferID: "U00225" };
      !this.tab
        ? (params.count = this.waitList.length + 1)
        : (params.count = this.signedList.length + 1);

      listAPI.getList({ params: { ...params } }).then(
        res => {
          const { waitSign, Signed } = res.data.data;
          const { waitSignIsEnd, SignedIsEnd } = res.data;
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
          // 刷新操作结束处理
          if (t) {
            this.$toast("刷新成功");
            this.isLoading = false;
          }
        },
        // 网络错误处理
        () => {
          if (!this.tab) {
            this.waitLoading = false;
            this.waitFinished = true;
          } else {
            this.signedLoading = false;
            this.signedFinished = true;
          }
          this.$toast("请求出错了, 稍后重试");
          this.isLoading = false;
        }
      );
    },
    // 同意or拒绝
    isOk(id, t) {
      const data = {
        operation: t ? 1 : 2,
        id: id
      };
      listAPI.isOk({ data: { ...data } }).then(
        res => {
          const { status, message } = res.data;
          this.$toast(message);
          if (res.data.status != 0) return;
          this.waitList = this.waitList.filter(item => id != item.id);
        },
        () => {
          this.$toast("请求出错了, 稍后重试");
        }
      );
    },
    // 刷新
    onRefresh() {
      this.signedList = [];
      this.loadMore(true);
    }
  }
};
</script>  
  
<style lang="scss">
.van-tabs__line {
  background-color: #06bf04;
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
    width: 65%;
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
.no_data {
  height: calc(100vh - 100px);
  line-height: calc(100vh - 100px);
  .van-cell__value--alone {
    text-align: center;
  }
}
</style>  