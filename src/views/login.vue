/*
 * @Author: 姬兵兵
 * @Date: 2018-04-05 00:30:52
 * @Last Modified by: 姬兵兵
 * @Last Modified time: 2018-06-04 15:49:48
 */
<template>
</template>

<script>
import loginAPI from "@/services/login";
export default {
  data() {
    return {
      formData: {
        account: "admin",
        checkPass: "123456789"
      }
    };
  },
  methods: {
    login(ev) {
      var params = {
        accountName: this.formData.account,
        password: this.formData.checkPass
      };

      loginAPI.login({ data: { ...params } }).then(res => {});
    }
  },
  mounted() {
    this.login();
  }
};
</script>

<style lang="scss" scoped>
</style>
