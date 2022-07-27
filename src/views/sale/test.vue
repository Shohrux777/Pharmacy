<template>
  <div>
    <table>
      <thead>
       <tr>
          <th>name</th>
          <th>qty</th>
          <th>total</th>
       </tr>
      </thead>
      <tbody v-for="(data,i) in options" :key="i">
        <tr>
          <td>{{data.name}}</td>
          <td>{{data.qty}}</td>
          <td>{{data.total}}</td>
        </tr>
        <tr v-show="data.show" v-for="(item,l) in data.items" :key="l">
          <td>{{item.name}}</td>
          <td>{{item.qty}}</td>
          <td>{{item.total}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      options: [
        {
          name: "1dasdas",
          qty: 44556,
          total: 12312123,
          show: true,
          items: [{
            name: "2dasda",
            qty: 2222222,
            total: 22222222,
          },
          {
            name: "2dasda",
            qty: 2222222,
            total: 22222222,
          },
          {
            name: "2dasda",
            qty: 2222222,
            total: 22222222,
          }
          ]
        },
        {
          name: "3wdasdas",
          qty: 44556,
          total: 12312123,
          show: false,
          items: [{
            name: "4dasda",
            qty: 4444444,
            total: 44444444,
          },
          {
            name: "4dasda",
            qty: 4444444,
            total: 44444444,
          },
          {
            name: "4dasda",
            qty: 4444444,
            total: 44444444,
          }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>