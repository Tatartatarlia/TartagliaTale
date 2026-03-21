/**
 * VictoryScreen（通关）
 * - 在剧情数据中出现 type: 'game_clear' 的节点并进入 mode === 'cleared' 时展示
 */
import { useAudio } from '../context/AudioContext';
import { useGameContext } from '../context/GameContext';

export default function VictoryScreen() {
  const { stopGameToMain } = useGameContext();
  const { defaultSeUrl, playSe } = useAudio();

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(20, 35, 55, 0.55), rgba(5, 10, 22, 0.92))',
        position: 'relative',
        padding: 18,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 2 }}>
        <button
          type="button"
          onClick={() => {
            if (defaultSeUrl) playSe(defaultSeUrl);
            stopGameToMain();
          }}
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
          返回开始界面
        </button>
      </div>

      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          textShadow: '0 4px 24px rgba(0,0,0,0.45)',
          padding: '24px 20px',
          overflow: 'visible',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontWeight: 1000,
            letterSpacing: '0.12em',
            lineHeight: 1.35,
            /* background-clip: text 会按行盒裁切，需留足上下空间，否则笔画易被截断 */
            padding: '0.35em 0.15em',
            marginBottom: 16,
            display: 'inline-block',
            overflow: 'visible',
            background: 'linear-gradient(180deg, #fef3c7, #f59e0b)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          恭喜通关！
        </div>
        <div style={{ opacity: 0.85, fontSize: 16, lineHeight: 1.7, maxWidth: 420 }}>
          感谢体验本故事。你可以随时从主菜单继续查看存档，或开始新的旅程。
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 28, display: 'flex', justifyContent: 'center', zIndex: 3 }}>
        <button
          type="button"
          onClick={() => {
            if (defaultSeUrl) playSe(defaultSeUrl);
            stopGameToMain();
          }}
          style={{
            padding: '14px 28px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 900,
            fontSize: 16,
            boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
          }}
        >
          返回开始界面
        </button>
      </div>
    </div>
  );
}
