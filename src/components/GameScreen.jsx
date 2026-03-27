import { useEffect, useMemo, useState } from 'react';

import { useAudio } from '../context/AudioContext';
import { useGameContext } from '../context/GameContext';
import { getStoryBackgroundKeywords } from '../utils/storySceneFromNodeId';
import ChoiceList from './ChoiceList';
import DialogBox from './DialogBox';

const portraitModules = import.meta.glob('../assets/images/*', {
  eager: true,
  import: 'default',
});

/** 剧情场景背景：放在 src/assets/images/story-bg/，文件名包含下列关键字之一即会匹配对应 nodeId 段 */
const storyBgModules = import.meta.glob('../assets/images/story-bg/*', {
  eager: true,
  import: 'default',
});

function pickPortraitUrlByFilenameIncludes(modules, includes) {
  const entries = Object.entries(modules);
  for (const [path, url] of entries) {
    const filename = path.split('/').pop() || path;
    if (includes.some((inc) => filename.includes(inc))) return url;
  }
  return null;
}

const portraitUrls = {
  traveler: pickPortraitUrlByFilenameIncludes(portraitModules, ['旅行者']),
  paimon: pickPortraitUrlByFilenameIncludes(portraitModules, ['派蒙']),
  tartaglia: pickPortraitUrlByFilenameIncludes(portraitModules, ['达达利亚', '达达']),
  // 其它角色后续可以继续补
};

function getSpeakerKey(speaker) {
  if (!speaker) return null;
  if (speaker === 'traveler') return 'traveler';
  if (speaker === 'paimon') return 'paimon';
  if (speaker === 'tartaglia' || speaker === 'ajax') return 'tartaglia';
  return null;
}

/** 根据节点 id 解析背景图 URL（规则见 ../utils/storySceneFromNodeId.js）；节点可写 backgroundImage 覆盖 */
function resolveStoryBackgroundUrl(node) {
  if (node?.backgroundImage) return node.backgroundImage;
  const id = node?.id;
  if (!id) return null;
  const kws = getStoryBackgroundKeywords(id);
  if (kws.length === 0) return null;
  return pickPortraitUrlByFilenameIncludes(storyBgModules, kws);
}

export default function GameScreen() {
  const { currentNode, affection, affectionMeta, advance, choose, stopGameToMain } = useGameContext();
  const { playStoryBgmForNode, stopBgm } = useAudio();

  const node = currentNode;

  useEffect(() => {
    if (!node?.id) return;
    playStoryBgmForNode(node.id);
  }, [node?.id, playStoryBgmForNode]);

  // 离开剧情回到主菜单/存档等时暂停，避免主界面仍播上一段剧情曲；回主界面后再点击可重新播「开始界面」BGM
  useEffect(() => {
    return () => {
      stopBgm();
    };
  }, [stopBgm]);
  const effectiveSpeaker = node?.type === 'choice' ? null : node?.speaker;

  const affectionValue = affection.tartaglia ?? 0;
  const affectionMax = affectionMeta.tartaglia?.max ?? 5;

  const hearts = useMemo(() => {
    const total = affectionMax ?? 5;
    const filled = Math.max(0, Math.min(total, affectionValue));
    return Array.from({ length: total }, (_, i) => i + 1).map((n) => n <= filled);
  }, [affectionMax, affectionValue]);

  const portraitKey = getSpeakerKey(effectiveSpeaker);
  const portraitSrc = portraitKey ? portraitUrls[portraitKey] : null;
  const backgroundUrl = resolveStoryBackgroundUrl(node);

  if (!node) return null;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0f1419',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {backgroundUrl && (
        <img
          src={backgroundUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* 压暗一点，保证对话框与立绘可读 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55))',
        }}
      />
      {/* 右上角好感度（爱心） */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          zIndex: 6,
          padding: '10px 12px',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(0,0,0,0.35)',
          color: '#fff',
          boxShadow: '0 14px 40px rgba(0,0,0,0.25)',
          textAlign: 'left',
          minWidth: 180,
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 8 }}>达达利亚好感度</div>
        <div style={{ fontSize: 20, letterSpacing: 6, lineHeight: 1 }}>
          {hearts.map((isFilled, i) => (
            <span
              key={i + 1}
              style={{
                color: isFilled ? '#f43f5e' : 'rgba(255,255,255,0.35)',
                textShadow: isFilled ? '0 0 12px rgba(244,63,94,0.35)' : 'none',
              }}
            >
              {isFilled ? '♥' : '♡'}
            </span>
          ))}
        </div>
      </div>

      {/* 立绘：旅行者 = 对话框上方左侧；其它角色 = 高度铺满视口（100vh），底部对齐 */}
      {portraitSrc && (
        <>
          {portraitKey === 'traveler' ? (
            <img
              src={portraitSrc}
              alt="traveler portrait"
              style={{
                position: 'absolute',
                top: 200,
                left: 18,
                width: 'clamp(200px, 26vw, 280px)',
                maxHeight: 'calc(100vh - 220px)',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'top left',
                zIndex: 2,
                filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.35))',
                pointerEvents: 'none',
              }}
            />
          ) : (
            <img
              src={portraitSrc}
              alt="portrait"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 150,
                transform: 'translateX(-50%)',
                height: '100vh',
                width: 'auto',
                maxWidth: 'min(90vw, 520px)',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                zIndex: 2,
                filter: 'drop-shadow(0 18px 50px rgba(0,0,0,0.35))',
                pointerEvents: 'none',
              }}
            />
          )}
        </>
      )}

      {/* 对话框 + 选项（固定在屏幕下方）；选项多时需可滚动，否则 overflow:hidden 会裁掉第三项导致「点了没反应」 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4,
          padding: '16px 18px 18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          maxHeight: 'min(92vh, 100%)',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%', maxWidth: 980 }}>
          {node.type === 'choice' ? (
            <ChoicePrompt
              key={node.id}
              node={node}
              onChoice={(choiceId) => {
                choose(choiceId);
              }}
            />
          ) : (
            <DialogBox
              key={node.id}
              speakerName={node.speakerName || ''}
              text={node.text}
              onAdvance={node.nextId ? advance : undefined}
              typingMs={28}
              style={{ width: '100%', minHeight: 130 }}
            />
          )}
        </div>
      </div>

      {/* 返回主界面按钮 */}
      <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 7 }}>
        <button
          onClick={stopGameToMain}
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 800,
          }}
        >
          返回主界面
        </button>
      </div>
    </div>
  );
}

function ChoicePrompt({ node, onChoice }) {
  const [choicesVisible, setChoicesVisible] = useState(false);

  return (
    <>
      <DialogBox
        key={node.id}
        style={{ width: '100%', minHeight: 130 }}
        speakerName={node.speakerName || ''}
        text={node.text}
        onTypedDone={() => setChoicesVisible(true)}
        // choice 节点不走 onAdvance：点击由选择按钮触发
      />
      {choicesVisible && <ChoiceList choices={node.choices ?? []} onChoice={onChoice} />}
    </>
  );
}
