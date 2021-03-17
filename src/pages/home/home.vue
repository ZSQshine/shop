<template>
  <div>
     <div id="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  mounted(){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '产品销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["电器","服装","图书","家具","零食","电子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [200, 200, 203, 230, 500, 300]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  }

}
</script>

<style>
#main{
  width:600px;
  height: 400px;
  margin:20px auto;
}
</style>