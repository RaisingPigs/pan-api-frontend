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
import { PieData } from "@/views/home/components/PieCard/type";

defineOptions({ name: "PieCard" });
const props = defineProps<{ title: string, data: PieData[] }>();

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
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

  return myChart;
};

watch(
  props.data,
  () => {
    myChart.setOption({
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      // series: [
      //   {
      //     data: props.data
      //   }
      // ]
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
