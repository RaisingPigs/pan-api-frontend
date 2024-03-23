<template>
  <div class="app-container">
    <el-space
      fill
      direction="vertical"
      style="width: 100%"
    >
      <el-card
        v-for="introduction in introductionList"
        :key="introduction.title"
        shadow="never"
        :header="introduction.title"
      >
        <ul>
          <li v-for="content in introduction.contents" :key="content">
            {{content}}
          </li>
        </ul>
      </el-card>
    </el-space>
  </div>

</template>

<script setup lang="ts">
type Introduction = {
  title: string,
  contents: string[]
}

const introductionList: Introduction[] = [
  {
    title: "项目介绍",
    contents: [
      "本站是一个免费的API接口开放调用平台",
      "支持接口在线浏览并调试",
      "支持项目中直接使用SDK 一行代码轻松调用接口",
      "无需复杂的配置和签名过程"
    ]
  },
  {
    title: "接口数据",
    contents: [
      "接口数据中可查看本站支持的所有接口",
      "点击详情即可查看接口项目信息(入参, 出参等)",
      "点击调用即可在线调试接口"
    ]
  },
  {
    title: "使用文档",
    contents: [
      "点击右上角个人信息, 复制ak, sk",
      "项目中使用maven引入SDK依赖",
      "yml文件中配置ak sk, 即可通过SDK来调用",
      "详细教程可点击使用文档查看"
    ]
  },
  {
    title: "数据统计",
    contents: [
      "数据统计可以查看到接口调用次数比例",
      "也可以查看到接口实际调用次数",
      "从而进行常用接口调用分析"
    ]
  }
];

</script>

<style lang="scss" scoped>
ul > li {
  list-style: none;
  margin: 10px 0;
}
</style>
