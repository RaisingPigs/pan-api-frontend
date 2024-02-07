<template>
  <div class="app-container">
    <el-card
      v-loading="loading"
      shadow="never"
      class="search-wrapper"
    >
      <el-form
        ref="searchFormRef"
        :inline="true"
        :model="searchData"
        @submit.prevent="handleSearch"
      >
        <el-form-item prop="name" label="接口名">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="url" label="路径">
          <el-input v-model="searchData.url" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" native-type="submit">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card
      v-loading="loading"
      shadow="never"
    >
      <div class="toolbar-wrapper">
        <div>
          <el-button
            type="primary"
            :icon="CirclePlus"
            @click="dialogVisible = true"
            v-permission="['admin']"
          >
            新增接口
          </el-button>

          <el-button
            v-permission="['admin']"
            type="danger"
            :icon="Delete"
          >
            批量删除
          </el-button>
          <el-text v-permission="['user']" size="large" tag="b">接口信息</el-text>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button
              type="primary"
              :icon="RefreshRight"
              circle
              @click="listItfByPage"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="itfList">
          <el-table-column v-if="checkPermission(['admin'])" type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="70" align="center" />
          <el-table-column prop="name" label="接口名" width="160" align="center" />
          <el-table-column prop="url" label="路径" align="center" />
          <el-table-column prop="method" label="请求方式" align="center" width="100">
            <template #default="scope">
              <el-tag type="warning" effect="plain">
                {{ scope.row.method }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="接口描述" width="160" align="center" />
          <el-table-column prop="status" label="状态" align="center" width="70" />
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="primary"
                text
                bg
                size="small"
                @click="toItfInfo(scope.row, 'ItfDetails')"
              >
                详情
              </el-button>
              <el-button
                type="success"
                text
                bg
                size="small"
                @click="toItfInfo(scope.row, 'ItfInvoke')"
              >
                调用
              </el-button>
              <el-button
                v-permission="['admin']"
                type="warning"
                text
                bg
                size="small"
                @click="handleUpdate(scope.row)"
              >
                修改
              </el-button>
              <el-button
                v-permission="['admin']"
                type="danger"
                text
                bg
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增接口' : '修改接口'"
      @closed="resetForm"
      width="40%"
    >
      <el-form
        ref="dialogFormRef"
        :model="dialogFormData"
        :rules="dialogFormRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="name" label="接口名">
          <el-input v-model="dialogFormData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="path" label="基本路径">
          <el-input v-model="dialogFormData.path" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="url" label="完整路径">
          <el-input v-model="dialogFormData.url" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="method" label="请求方式">
          <el-select
            v-model="dialogFormData.method"
            placeholder="Select"
          >
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input v-model="dialogFormData.description" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="queryParamExample" label="query参数">
          <el-input
            v-model="dialogFormData.queryParamExample"
            :autosize="{ minRows: 1, maxRows: 5 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="bodyParamExample" label="body参数">
          <el-input
            v-model="dialogFormData.bodyParamExample"
            :autosize="{ minRows: 1, maxRows: 5 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="respExample" label="响应数据">
          <el-input
            v-model="dialogFormData.respExample"
            :autosize="{ minRows: 1, maxRows: 5 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select
            v-model="dialogFormData.status"
            placeholder="Select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleCreateOrUpdate"
          :loading="loading"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from "vue";
import { reqAddItf, reqDeleteItf, reqListItfByPage, reqUpdateItf } from "@/api/itf";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "vue-router";
import { checkPermission } from "@/utils/permission";

defineOptions({
  // 命名当前组件
  name: "ItfManage"
});

const loading = ref<boolean>(false);
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination();

const dialogVisible = ref<boolean>(false);

//#region 增
const dialogFormRef = ref<FormInstance | null>(null);
const dialogFormData = ref({
  name: "",
  path: "",
  url: "",
  method: 0,
  description: "",
  queryParamExample: "",
  bodyParamExample: "",
  respExample: "",
  status: 0
});

type Options = {
  label: string,
  value: number
}

const methodOptions: Options[] = [
  {
    label: "GET",
    value: 0
  },
  {
    label: "POST",
    value: 1
  }
];
const statusOptions: Options[] = [
  {
    label: "下线",
    value: 0
  },
  {
    label: "上线",
    value: 1
  }
];

const dialogFormRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入" }],
  path: [{ required: true, trigger: "blur", message: "请输入" }],
  url: [{ required: true, trigger: "blur", message: "请输入" }],
  method: [{ required: true, trigger: "blur", message: "请选择" }],
  description: [{ required: true, trigger: "blur", message: "请输入" }],
  respExample: [{ required: true, trigger: "blur", message: "请输入" }],
  status: [{ required: true, trigger: "blur", message: "请选择" }]
});

const handleCreateOrUpdate = async () => {
  const valid = await dialogFormRef.value?.validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    const api = currentUpdateId.value === undefined ? reqAddItf : reqUpdateItf;
    await api({
      id: currentUpdateId.value,
      ...dialogFormData.value
    });

    ElMessage.success("操作成功");
    dialogVisible.value = false;

    await listItfByPage();
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  currentUpdateId.value = undefined;
  dialogFormRef.value?.resetFields();
};
//#endregion


//#region 删
const handleDelete = async (row: ItfAPI.ItfVO) => {
  let res = await ElMessageBox.confirm(
    `是否删除：${row.name}，确认删除？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  );

  if (res) {
    loading.value = true;
    try {
      await reqDeleteItf(row.id);
      ElMessage.success("删除成功");
      await listItfByPage();
    } catch (e) {
      await listItfByPage();
    } finally {
      loading.value = false;
    }
  }
};
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined);
const handleUpdate = (row: ItfAPI.ItfVO) => {
  dialogVisible.value = true;
  // 必须延迟赋值，防止 resetFields 方法将数据重置错误
  nextTick(() => {
    currentUpdateId.value = row.id;
    dialogFormData.value.name = row.name;
    dialogFormData.value.path = row.path;
    dialogFormData.value.url = row.url;
    dialogFormData.value.method = getValFromOption(methodOptions, row.method);
    dialogFormData.value.description = row.description;
    dialogFormData.value.queryParamExample = row.queryParamExample;
    dialogFormData.value.bodyParamExample = row.bodyParamExample;
    dialogFormData.value.respExample = row.respExample;
    dialogFormData.value.status = getValFromOption(statusOptions, row.status);
  });
};

const getValFromOption = (options: Options[], _label: string): number => {
  console.log(options, _label);
  const filtered = options.filter((item: Options) => item.label === _label);
  console.log(filtered);
  return filtered[0]?.value;
};
//#endregion

//#region 查
const itfList = ref<ItfAPI.ItfVO[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const searchData = reactive({
  name: "",
  url: ""
});

const listItfByPage = async () => {
  loading.value = true;

  const itfQueryReq: ItfAPI.ItfQueryReq = {
    pageNum: paginationData.value.currentPage,
    pageSize: paginationData.value.pageSize,
    name: searchData.name || undefined,
    url: searchData.url || undefined
  };

  try {
    const { data } = await reqListItfByPage(itfQueryReq);
    console.log(data);
    paginationData.value.total = data.total;
    itfList.value = data.records;
  } catch (err) {
    itfList.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  paginationData.value.currentPage === 1
    ? listItfByPage()
    : (paginationData.value.currentPage = 1);
};
const resetSearch = () => {
  searchFormRef.value?.resetFields();
  handleSearch();
};
//#endregion

/** 监听分页参数的变化 */
watch(
  [() => paginationData.value.currentPage, () => paginationData.value.pageSize],
  listItfByPage,
  { immediate: true }
);

const router = useRouter();
const toItfInfo = (row: ItfAPI.ItfVO, tabName: string) => {
  router.push({
    name: "ItfInfo",
    query: {
      "id": row.id,
      "tabName": tabName
    }
  });
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
