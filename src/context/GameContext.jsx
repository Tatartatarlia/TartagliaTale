/**
 * GameContext
 * - 用于全局持有“唯一存档”的游戏状态（GameState）。
 * - 典型状态字段：mode、nodeId、affection、history、failed、checkpoint 等。
 * - 提供 actions：选择选项、触发失败、返回重选、保存/加载等（具体实现放在 reducer 或 useGame）。
 *
 * 注意：AudioContext 已经实现音量/播放，这里只负责“剧情/存档/失败回滚”等业务状态。
 */
