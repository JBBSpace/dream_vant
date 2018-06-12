/*
 * @Author: 姬兵兵 
 * @Date: 2018-06-12 13:26:04 
 * @Last Modified by:   姬兵兵 
 * @Last Modified time: 2018-06-12 13:26:04 
 */
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(item) in columns" :key="item.index">
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row) in dataSource" :key="row.id">
          <td v-for="cell in columns" :key="cell.id">
            <template v-if="cell.index === 'mothed'">
              <template v-if="row[cell.index] === 1">
                <span @click="detailInfo(row)">已使用</span>
              </template>
              <template v-else>
                <van-button size="mini" type="danger" @click="invalid(row.id)">作废</van-button>
              </template>
            </template>
            <template v-else-if="cell.index === 'type'">
                {{row[cell.index] === 1?"折扣券":"现金券"}}
            </template>
            <template v-else>
              {{row[cell.index]}}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <van-dialog
      v-model="show"
      title="折扣券使用信息"
    >
      <p class="msgInfo"><span>折扣码 ：</span>{{dialog.code}}</p>
      <p class="msgInfo"><span>使用时间 ：</span>{{dialog.time}}</p>
      <p class="msgInfo"><span>门店 ：</span>{{dialog.shop}}</p>
      <p class="msgInfo"><span>订单编号 ：</span>{{dialog.dingdan}}</p>
    </van-dialog>
  </div>
</template>

<script>
import tableAPI from "@/services/table";
export default {
  data() {
    return {
      show: false,
      dialog: {
        code: "",
        time: "",
        shop: "",
        dingdan: ""
      },
      columns: [
        {
          label: "额度",
          index: "amount"
        },
        {
          label: "类型",
          index: "type"
        },
        {
          label: "生成时间",
          index: "time"
        },
        {
          label: "操作",
          index: "mothed"
        }
      ],
      dataSource: [
        {
          id: 1,
          amount: "100%",
          type: 1,
          time: "2018-06-08",
          mothed: 1,
          code: "code12345",
          shop: "名店1",
          dingdan: "1234"
        },
        {
          id: 2,
          amount: "200%",
          type: 2,
          time: "2018-06-09",
          mothed: 2,
          code: "code6789",
          shop: "名店2",
          dingdan: "12345678"
        }
      ]
    };
  },
  methods: {
    // 初始化表格数据
    getData() {},
    // 作废操作
    invalid(id) {},
    // 弹框展示使用明细
    detailInfo(row) {
      this.show = true;
      this.dialog = row;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
table {
  border: 1px solid #42b983;
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 1);
}

td {
  background-color: #f9f9f9;
}

th,
td {
  text-align: center;
  border: 1px solid #42b983;
  padding: 12px 0;
  span {
    color: #42b983;
  }
}
.van-dialog .van-dialog__header {
  padding: 14px 0;
}
.msgInfo {
  color: #666;
  font-size: 14px;
  padding: 10px;
  span {
    display: inline-block;
    width: 150px;
    padding-left: 20px;
  }
}
</style>