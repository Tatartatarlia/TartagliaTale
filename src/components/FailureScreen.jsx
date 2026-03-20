/**
 * FailureScreen（失败页）
 * - 展示失败原因（例如：选错选项 / 好感度过低）
 * - 提供“返回选项处重新选择”的入口
 *
 * 关键依赖：
 * - 失败时必须保留 checkpoint（选择发生前的 nodeId + affection + history）
 * - 点击“返回重新选择”时恢复 checkpoint，并允许用户走新分支
 */

export default function FailureScreen() {
  return null;
}

