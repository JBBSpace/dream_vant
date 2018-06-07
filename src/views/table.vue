<template>
   <table>
    <thead>
      <tr>
        <th v-for="(key, index) in columns" :key="index">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in dataSource" :key="index">
        <td v-for="(cell, index02) in columns" :key="index02">
          {{row[cell]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      columns: ['name', 'power', 'power'],
      dataSource: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 1px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  border-collapse: collapse;
  width:100%;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,1);
}

td {
  background-color: #f9f9f9;
}

th, td {
  text-align: center;
  border: 1px solid #42b983;
}

</style>