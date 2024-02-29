import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

const { toClipboard } = useClipboard();

export const handleCopy = async (data: string) => {
  const res = await toClipboard(data);
  if (res) {
    ElMessage.success("复制成功");
  } else {
    ElMessage.error("复制失败");
  }
};
