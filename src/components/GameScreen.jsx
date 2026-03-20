/**
 * GameScreen
 * - 剧情内页主容器（当 mode === 'story' 时渲染）
 * - 负责组合其它组件：
 *   - CharacterDisplay（角色展示）
 *   - DialogBox / ChoiceList（文本与选项）
 *   - 失败回滚按钮、退出剧情按钮等（如果 UI 需要）
 * - 负责从 GameContext/useGame 读取当前 GameState，并把必要 props 传给展示组件
 *
 * 你当前的关键业务点会通过状态机驱动：
 * - 选择选项 -> 更新 nodeId/affection/history -> 可能进入失败态
 * - 失败态 -> 通过 checkpoint 恢复到选择发生前状态并重新展示选项
 */
