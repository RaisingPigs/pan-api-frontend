<template>
  <div class="app-container">
    <el-space fill direction="vertical" :size="20" style="width: 100%">
      <el-row :gutter="20">
        <el-col :span="24 / statisticCountList.length" v-for="(statisticCount, index) in statisticCountList"
                :key="index">
          <StatisticCard
            :title="statisticCount.title"
            :title-icon="statisticCount.titleIcon"
            :content-icon="statisticCount.contentIcon"
            :value="statisticCount.value"
          />
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <PieCard title="系统接口调用次数比例" :data="invokeCountPie" />
        </el-col>

        <el-col :span="12">
          <BarCard title="系统接口调用次数统计" :data="invokeCountBar" />
          <!--<BarCard title="系统接口调用次数统计" :data="invokeCountBar" />-->
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <PieCard title="您的接口调用次数比例" :data="userInvokeCountPie" />
        </el-col>

        <el-col :span="12">
          <BarCard title="您的接口调用次数统计" :data="userInvokeCountBar" />
        </el-col>
      </el-row>
    </el-space>
  </div>

</template>

<script setup lang="ts">
import StatisticCard from "@/views/home/components/StatisticCard/index.vue";
import PieCard from "@/views/home/components/PieCard/index.vue";
import BarCard from "@/views/home/components/BarCard/index.vue";
import { reqCount, reqCountInvokeTop10, reqCountUserInvokeTop10 } from "@/api/statistics";
import { onMounted, ref } from "vue";
import type { StatisticCount } from "@/views/home/components/StatisticCard/type";
import { PieData } from "@/views/home/components/PieCard/type";
import { BarData } from "@/views/home/components/BarCard/type";

defineOptions({ name: "Home" });

const itfCountStatistic: StatisticCount = {
  title: "接口总数",
  titleIcon: "Notification",
  contentIcon: "PieChart",
  value: 0
};
const invokeCountStatistic: StatisticCount = {
  title: "接口总调用次数",
  titleIcon: "Notification",
  contentIcon: "PieChart",
  value: 0
};
const userInvokeCountStatistic: StatisticCount = {
  title: "您调用接口总次数",
  titleIcon: "Notification",
  contentIcon: "PieChart",
  value: 0
};
const statisticCountList = ref<StatisticCount[]>([]);

const handleGetCount = async () => {
  const { data } = await reqCount();
  itfCountStatistic.value = data.itfCount;
  invokeCountStatistic.value = data.invokeCount;
  userInvokeCountStatistic.value = data.userInvokeCount;

  statisticCountList.value.push(itfCountStatistic);
  statisticCountList.value.push(invokeCountStatistic);
  statisticCountList.value.push(userInvokeCountStatistic);
};


const invokeCountPie = ref<PieData[]>([]);
const invokeCountBar = ref<BarData>({
  xData: [],
  yData: []
});

const userInvokeCountPie = ref<PieData[]>([]);
const userInvokeCountBar = ref<BarData>({
  xData: [],
  yData: []
});

const handleCountInvokeTop10 = async () => {
  const { data } = await reqCountInvokeTop10();

  Object.assign(invokeCountPie.value, statisticsItfCountVOList2PieDataArr(data));
  Object.assign(invokeCountBar.value, statisticsItfCountVOList2BarData(data));
};

const handleCountUserInvokeTop10 = async () => {
  const { data } = await reqCountUserInvokeTop10();

  Object.assign(userInvokeCountPie.value, statisticsItfCountVOList2PieDataArr(data));
  Object.assign(userInvokeCountBar.value, statisticsItfCountVOList2BarData(data));
};

const statisticsItfCountVOList2PieDataArr = (statisticsItfCountVOList: StatisticsAPI.StatisticsItfCountVO[]) => {
  return statisticsItfCountVOList.map((item: StatisticsAPI.StatisticsItfCountVO): PieData => {
    return StatisticsItfCountVO2PieData(item);
  });
};

const StatisticsItfCountVO2PieData = (statisticsItfCountVO: StatisticsAPI.StatisticsItfCountVO) => {
  return {
    name: statisticsItfCountVO.name,
    value: statisticsItfCountVO.percentage
  };
};

const statisticsItfCountVOList2BarData = (statisticsItfCountVOList: StatisticsAPI.StatisticsItfCountVO[]) => {
  const xData: string[] = [];
  const yData: number[] = [];

  statisticsItfCountVOList.forEach((item: StatisticsAPI.StatisticsItfCountVO) => {
    xData.push(item.name);
    yData.push(item.total);
  });

  return {
    xData,
    yData
  };
};

onMounted(() => {
  handleGetCount();
  handleCountInvokeTop10();
  handleCountUserInvokeTop10();
});

</script>

<style lang="scss" scoped>
</style>
