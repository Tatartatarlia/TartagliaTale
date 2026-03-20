/**
 * audio
 * - 音频“配置/索引表”的数据层（可选）
 * - 与 `src/context/AudioContext.jsx` 的关系：
 *   - AudioContext 负责播放（BGM/SE）与音量同步
 *   - 这里负责告诉 AudioContext：
 *     - 哪个 sceneKey 对应哪个 bgm 文件
 *     - 哪个事件，对应哪个 se 文件
 *
 * 当前你已用目录方式自动导入 BGM/SE：
 * - 后续如果你想按场景切歌/按事件触发不同音效，就可以把这里逐步补齐成映射表。
 */
