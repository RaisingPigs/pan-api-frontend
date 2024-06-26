<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <Logo title="Pan-Api" :font-size="55" :is-black="true" />
      </div>
      <div class="content">
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              clearable
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            native-type="submit"
          >登 录
          </el-button>
        </el-form>
      </div>
      <div class="login-3rd">
        <el-text>其他登录方式:</el-text>
        <a
          href="#"
          @click.prevent="handleLoginBy3rd(1)"
        >
          <SvgIcon style="width: 1.5em; height: 1.5em" name="gitee-logo" />
        </a>
      </div>
      <div class="register">
        <el-link @click="toRegister" type="primary">没有账号? 去注册</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { type FormInstance, type FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import Logo from "@/components/Logo/index.vue";
import { reqGetThirdLoginUrl } from "@/api/login";

defineOptions({ name: "Login" });

const router = useRouter();

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false);

/** 登录表单数据 */
const loginFormData: LoginAPI.UserLoginReq = reactive({
  username: "",
  password: ""
});
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
};

/** 登录逻辑 */
const handleLogin = async () => {
  const valid = await loginFormRef.value?.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  try {
    await useUserStore().login(loginFormData);
    await router.replace({ path: "/" });
  } catch (err) {
    loginFormData.password = "";
  } finally {
    loading.value = false;
  }
};

const toRegister = () => {
  router.push({ name: "Register" });
};

const handleLoginBy3rd = async (type: number) => {
  const res: BaseResponse<string> = await reqGetThirdLoginUrl(type);
  window.location.href = res.data;
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    padding: 0 50px 40px 50px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      //span {
      //  font-size: 55px;
      //  font-weight: bold;
      //  color: transparent;
      //  -webkit-background-clip: text;
      //  background-clip: text;
      //  -webkit-text-fill-color: transparent;
      //  background-image: linear-gradient(109.6deg, rgb(0, 51, 102) 11.2%, rgb(187, 187, 187) 91.1%);
      //}
    }

    .content {
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }

    .login-3rd {
      margin-top: 15px;
      display: flex;
      align-items: center;

      & a {
        margin-left: 5px;
      }
    }

    .register {
      margin-top: 15px;
      text-align: right;
    }
  }
}
</style>
