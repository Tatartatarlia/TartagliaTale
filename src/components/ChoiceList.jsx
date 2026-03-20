/**
 * ChoiceList
 * - 展示“当前节点可选项”的列表（按钮形式）
 * - 负责把用户点击的 choiceId 传回上层（通常由 GameScreen / useGame 处理推进逻辑）
 *
 * 建议职责边界：
 * - 只负责 UI 渲染 + 调用 onChoice(choiceId)
 * - 不直接做好感度计算/失败判断（这应放在 useGame 或状态机/数据层）
 */

export default function ChoiceList() {
  return null;
}

