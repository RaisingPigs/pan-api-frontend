<template>
  <div class="app-container">
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <TextareaCard
        v-for="(textareaData, index) in textareaDataList"
        :key="index"
        :title="textareaData.title"
        :value="textareaData.value"
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
pan-api:
  client:
    access-key: admin
    secret-key: admin
`;

const getValue = `
@Resource
private ItfClient itfClient;

public String testGet() {
    Map<String, String> map = new HashMap<>();
    map.put("name", "张三");
    String s = itfClient.doGet("http://localhost:8888/api/itf/name/get", map);
    return s;
}
`;

const postValue = `
@Resource
private ItfClient itfClient;
private final ObjectMapper objectMapper;

public String testPost() throws JsonProcessingException {
    Map<String, String> map = new HashMap<>();
    map.put("name", "张三");
    Map<String, String> map1 = new HashMap<>();
    map1.put("username", "李四");
    String json = objectMapper.writeValueAsString(map1);
    String s = itfClient.doPost("http://localhost:8888/api/itf/name/post", map, json);
    return s;
}
`;

const textareaDataList: TextareaData[] = [
  {
    title: "依赖引入",
    value: dependencyValue
  },
  {
    title: "yml配置",
    value: ymlValue
  },
  {
    title: "get调用",
    value: getValue
  },
  {
    title: "post调用",
    value: postValue
  }
];
</script>

<style scoped lang="scss">

</style>
