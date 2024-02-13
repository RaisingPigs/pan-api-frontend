<template>
  <div class="container">
    <el-card shadow="never">
      <div class="pie_wrap" ref="pieRef">
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from "vue";
import { BarData } from "@/views/home/components/BarCard/type";

defineOptions({ name: "BarCard" });
const props = defineProps<{ title: string, data: BarData }>();

const pieRef = ref();
const echarts: any = inject("$echarts");
let myChart: any;

const init = () => {
  const myChart = echarts.init(pieRef.value);

  // 绘制图表
  myChart.setOption({
    title: {
      text: props.title,
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: props.data.xData,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: props.data.yData
      }
    ]
  });

  return myChart;
};

watch(
  props.data,
  () => {
    myChart.setOption({
      xAxis: [
        {
          data: props.data.xData
        }
      ],
      series: [
        {
          data: props.data.yData
        }
      ]
    });
  }
);

onMounted(() => {
  myChart = init();

  window.addEventListener("resize", () => {
    myChart.resize();
  });
});

onUnmounted(() => {
  myChart.dispose(); // 调用dispose方法释放echarts实例
});

</script>

<style scoped lang="scss">

.container {
  width: 100%;
  height: 100%;

  .pie_wrap {
    width: 100%;
    height: 400px;
  }
}

</style>
