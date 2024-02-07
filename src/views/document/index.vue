<template>
  <div class="app-container">
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <!--      <el-card shadow="never" header="请求路径">
              <el-descriptions :column="1">
                <el-descriptions-item label="接口名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="请求方式">
                  <el-tag>get</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="路径与query参数">
                  http://localhost:8888/api/itf/name/post/json5
                </el-descriptions-item>
              </el-descriptions>
            </el-card>-->

      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>引入依赖</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="dependencyValue"
          :autosize="{ minRows: 1, maxRows: 10 }"
          type="textarea"
          readonly
        />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>yml文件配置ak和sk</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="ymlValue"
          :autosize="{ minRows: 1, maxRows: 10 }"
          type="textarea"
          readonly
        />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>get调用</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="getValue"
          :autosize="{ minRows: 1, maxRows: 15 }"
          type="textarea"
          readonly
        />
      </el-card>


      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>post调用</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="postValue"
          :autosize="{ minRows: 1, maxRows: 15 }"
          type="textarea"
          readonly
        />
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "InvokeDocument" });

defineProps<{ id: string }>();

const dependencyValue = ref<string>(`
<dependency>
    <groupId>com.pan.api</groupId>
    <artifactId>client-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
`);

const ymlValue = ref<string>(`
pan-api:
  client:
    access-key: admin
    secret-key: admin
`);

const getValue = ref<string>(`
@Resource
private ItfClient itfClient;

public String testGet() {
    Map<String, String> map = new HashMap<>();
    map.put("name", "张三");
    String s = itfClient.doGet("http://localhost:8888/api/itf/name/get", map);
    return s;
}
`);

const postValue = ref<string>(`
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
`);

interface User {
  id: number;
  date: string;
  name: string;
  address: string;
  hasChildren?: boolean;
  children?: User[];
}

const tableData: User[] = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles",
    children: [
      {
        id: 31,
        date: "2016-05-01",
        name: "wangxiaohu",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
        address: "No. 189, Grove St, Los Angeles"
      }
    ]
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles"
  }
];

</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>
