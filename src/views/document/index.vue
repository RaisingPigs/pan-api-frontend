<template>
  <div class="app-container">
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <TextareaCard
        v-for="(textareaData, index) in textareaDataList"
        :key="index"
        :title="textareaData.title"
        :content="textareaData.content"
        :autosize="{ minRows: 1, maxRows: 20 }"
      />
    </el-space>
  </div>
</template>

<script setup lang="ts">
import TextareaCard from "@/components/TextareaCard/index.vue";
import { TextareaData } from "@/components/TextareaCard/type";

defineOptions({ name: "InvokeDocument" });

const dependencyValue = `
<dependency>
    <groupId>com.pan.api</groupId>
    <artifactId>client-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
`;

const ymlValue = `
# access-key与secret-key在系统右上角用户名下拉菜单中的个人信息页面中查看
pan-api:
  client:
    access-key: xxxxxxxx
    secret-key: xxxxxxxx
`;

const getValue = `
private final ItfClient itfClient;

public void testGet() {
    Map<String, Object> map = new HashMap<>();
    map.put("weight", 70);
    map.put("height", 1.80);

    String json = itfClient.doGet("http://panapi.raisingpigs.icu:8888/api/itf/calculate/bmi", map);
    System.out.println(json);  // {"code":20000,"data":{"bmi":21.6,"level":"正常","normalBMI":"18.5 ~ 23.9"},"msg":"success"}
}
`;

const postValue = `
@Resource
private ItfClient itfClient;

public void testPost() {
    Map<String, Object> queryParams = new HashMap<>();
    queryParams.put("query参数1", "参数值");

    Map<String, Object> bodyParam = new HashMap<>();
    bodyParam.put("body参数1", "参数值");

    String json = itfClient.doPost("http://panapi.raisingpigs.icu:8888/api/itf/xxx", queryParams, bodyParam);
    System.out.println(json);
}
`;

const textareaDataList: TextareaData[] = [
  {
    title: "依赖引入",
    content: dependencyValue
  },
  {
    title: "yml配置",
    content: ymlValue
  },
  {
    title: "get调用",
    content: getValue
  },
  {
    title: "post调用",
    content: postValue
  }
];
</script>

<style scoped lang="scss"></style>
