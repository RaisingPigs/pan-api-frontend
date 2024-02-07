<template>
  <div>
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <el-card shadow="never" header="接口信息">
        <el-descriptions :column="1">
          <el-descriptions-item label="接口名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="接口描述">Suzhou</el-descriptions-item>
          <el-descriptions-item label="路径">18100000000</el-descriptions-item>
          <el-descriptions-item label="请求方式">
            <el-tag>get</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="返回格式">json</el-descriptions-item>
          <el-descriptions-item label="接口状态">Suzhou</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card shadow="never" header="请求参数">
        <el-table
          :data="tableData"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-card>

      <el-card shadow="never" header="通用响应结果">
        <el-table
          :data="tableData"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-card>

      <el-card shadow="never" header="响应结果data">
        <el-table
          :data="tableData"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "ItfDetails" });

defineProps<{ id: string }>();


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
.req_params_header {
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>
