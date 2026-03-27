/**
 * audio
 * - 音频“配置/索引表”的数据层（可选）
 * - 与 `src/context/AudioContext.jsx` 的关系：
 *   - AudioContext 负责播放（BGM/SE）与音量同步
 *   - 这里负责告诉 AudioContext：
 *     - 哪个 sceneKey 对应哪个 bgm 文件
 *     - 哪个事件，对应哪个 se 文件
 *
 * 当前你已用目录方式自动导入 BGM/SE。
 * 剧情 BGM 文件名前缀、背景图关键字与节点 id 的对应关系见：
 *   src/utils/storySceneFromNodeId.js
 */
