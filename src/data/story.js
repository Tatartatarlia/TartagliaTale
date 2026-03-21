/**
 * story.js（合并器/入口）
 * - 将多个章节的剧情节点图合并为一个统一的 `storyGraph`
 * - 给 `useGame` 等逻辑层使用
 *
 * 你当前已将剧情拆分到 `story-chapter1.js`。
 * 后续只需要：
 *  - 新增 `story-chapter2.js` ...
 *  - 在这里 import 并合并即可。
 */

import {  chapter1Graph } from './story-chapter1';
import {  chapter2Graph } from './story-chapter2';
import {  chapter3Graph } from './story-chapter3';
import {  chapter4Graph } from './story-chapter4';
import {  chapter5Graph } from './story-chapter5';

export const storyGraph = {
  ...chapter1Graph,
  ...chapter2Graph,
  ...chapter3Graph,
  ...chapter4Graph,
  ...chapter5Graph,
};

