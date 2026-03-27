/**
 * 根据 story-chapter*.js / oldstory-chapter*.js 的节点 id 命名，推导「场景段」与资源匹配关键字。
 *
 * id 形态示例：
 * - chapter1_intro_1 → 章1 + 段 intro
 * - chapter_2_night_1 → 章2 + 段 night
 * - chapter_1_oldstory_decision_1 → 旧线 + 章1 + 段 decision
 *
 * BGM（src/assets/audio/bgm/）：文件名以 getStoryBgmSearchPrefixes 返回的前缀之一 **开头**
 * 背景（src/assets/images/story-bg/）：文件名 **包含** getStoryBackgroundKeywords 中任一子串
 */

const CN_CHAPTER = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export function chapterChineseOrdinal(n) {
  const num = typeof n === 'number' ? n : parseInt(String(n), 10);
  if (num >= 1 && num <= 10) return CN_CHAPTER[num - 1];
  if (num === 11) return '十一';
  if (num === 12) return '十二';
  return String(num);
}

/**
 * @returns {{ kind: 'main' | 'oldstory', chapter: string, segment: string } | null}
 */
export function parseStorySceneFromNodeId(nodeId) {
  if (!nodeId) return null;
  const s = String(nodeId);

  const oldM = s.match(/^chapter_(\d+)_oldstory_([^_]+)/i);
  if (oldM) {
    return {
      kind: 'oldstory',
      chapter: oldM[1],
      segment: oldM[2].toLowerCase(),
    };
  }

  const m1 = s.match(/^chapter_(\d+)_([^_]+)/);
  if (m1) {
    return {
      kind: 'main',
      chapter: m1[1],
      segment: m1[2].toLowerCase(),
    };
  }

  const m2 = s.match(/^chapter(\d+)_([^_]+)/);
  if (m2) {
    return {
      kind: 'main',
      chapter: m2[1],
      segment: m2[2].toLowerCase(),
    };
  }

  return null;
}

/**
 * 节点 id 里 `_` 后的第一段英文 → BGM 中文段名（与文件名前缀「剧情第N章XXX」对应）
 * 未列出的段：仅回退到「剧情第N章」整章曲
 */
const SEGMENT_TO_CN = {
  intro: '开篇',
  meet: '相遇',
  lunch: '午餐',
  fight: '战斗',
  starnight: '星夜',
  night: '夜晚',
  adventure: '冒险',
  sea: '海上',
  firstmeet: '初遇',
  secondmeet: '再遇',
  thirdmeet: '三遇',
  dinner: '晚餐',
  theater: '剧场',
  fourthmeet: '四遇',
  escape: '逃亡',
  reunion: '重逢',
  gift: '礼物',
  togethernight: '共夜',
  question: '问答',
  farewell: '告别',
  end: '结局',
  decision: '抉择',
  arrive: '抵达',
  firstday: '首日',
  celebrate: '庆典',
  leave: '离去',
  sick: '病中',
  love: '爱恋',
};

/**
 * BGM 文件名前缀（按顺序尝试，先匹配到先播放）
 * @returns {string[]}
 */
export function getStoryBgmSearchPrefixes(nodeId) {
  const p = parseStorySceneFromNodeId(nodeId);
  if (!p) return [];

  const n = parseInt(p.chapter, 10);
  if (Number.isNaN(n) || n < 1) return [];

  const ord = chapterChineseOrdinal(n);
  const segCn = SEGMENT_TO_CN[p.segment];

  if (p.kind === 'oldstory') {
    const list = [];
    if (segCn) list.push(`剧情旧线第${ord}章${segCn}`);
    list.push(`剧情旧线第${ord}章`);
    list.push('剧情旧线');
    return list;
  }

  const list = [];
  if (segCn) list.push(`剧情第${ord}章${segCn}`);
  list.push(`剧情第${ord}章`);
  return list;
}

/** @returns {string|null} 主前缀（兼容旧 API） */
export function storyBgmFilenamePrefixForNodeId(nodeId) {
  const prefixes = getStoryBgmSearchPrefixes(nodeId);
  return prefixes[0] ?? null;
}

/**
 * 背景图：文件名需包含其中 **至少一个** 子串（与 ch1-intro、chapter2-night、oldstory-ch1-decision 等一致）
 * @returns {string[]}
 */
export function getStoryBackgroundKeywords(nodeId) {
  const p = parseStorySceneFromNodeId(nodeId);
  if (!p) return [];

  const ch = p.chapter;
  const seg = p.segment;

  if (p.kind === 'oldstory') {
    return [
      `oldstory-ch${ch}-${seg}`,
      `chapter${ch}-oldstory-${seg}`,
      `ch${ch}-oldstory-${seg}`,
    ];
  }

  return [`ch${ch}-${seg}`, `chapter${ch}-${seg}`];
}
