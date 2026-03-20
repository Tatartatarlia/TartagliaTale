/**
 * story
 * - 存放你的剧情“节点图 / 状态机”数据
 * - 建议结构（示例概念，不是代码）：
 *   - nodes: { [nodeId]: { text, speaker, choices: [{ choiceId, label, nextNodeId, affectionDelta, failTrigger }] } }
 *   - 也可以区分：
 *     - dialogue nodes（对话节点）
 *     - choice nodes（选择节点）
 *     - failure nodes（失败节点，可选）
 *
 * 你当前需求依赖的能力：
 * - 错误选项导致失败（或好感过低导致失败）
 * - 每次选择要能回溯到“选择发生前”的 checkpoint
 * - 存档页展示已经经过的对话（history 来自节点推进）
 */
