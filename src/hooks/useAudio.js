import { useState, useCallback } from 'react';

export default function useAudio() {
  const [bgmVolume, setBgmVolume] = useState(0.5);
  const [seVolume, setSeVolume] = useState(0.5);
  const [currentBgm, setCurrentBgm] = useState(null);

  // 播放BGM
  const playBgm = useCallback((audioFile) => {
    // TODO: 实现BGM播放逻辑
    console.log('播放BGM:', audioFile);
    setCurrentBgm(audioFile);
  }, []);

  // 停止BGM
  const stopBgm = useCallback(() => {
    console.log('停止BGM');
    setCurrentBgm(null);
  }, []);

  // 播放音效
  const playSe = useCallback((audioFile) => {
    // TODO: 实现音效播放逻辑
    console.log('播放音效:', audioFile);
  }, []);

  // 设置BGM音量
  const setBgmVol = useCallback((volume) => {
    setBgmVolume(Math.max(0, Math.min(1, volume)));
  }, []);

  // 设置音效音量
  const setSeVol = useCallback((volume) => {
    setSeVolume(Math.max(0, Math.min(1, volume)));
  }, []);

  return {
    bgmVolume,
    seVolume,
    currentBgm,
    playBgm,
    stopBgm,
    playSe,
    setBgmVol,
    setSeVol,
  };
}