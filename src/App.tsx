import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Home as HomeIcon,
  Pause,
  Play,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BLOCK_COLORS, BLOCK_HEIGHT, type GameMode, type StackBlock, isPerfect, pointsForScore, speedForScore, streakBonus } from './game/engine';
import { sound } from './game/audio';
import { music } from './game/music';
import './index.css';

type View = 'home' | 'about' | 'rules' | 'developer';
type GameStatus = 'ready' | 'playing' | 'paused' | 'gameover';
type Debris = { x: number; y: number; width: number; vy: number; vx: number; rotation: number; spin: number; alpha: number; color: string };

const BEST_KEY = 'stack-best-score';
const MUTE_KEY = 'stack-muted';
const MOBILE_GAME_WIDTH = 640;

function readBest() {
  try { return Number(localStorage.getItem(BEST_KEY) ?? 0); } catch { return 0; }
}

function readMute() {
  try { return localStorage.getItem(MUTE_KEY) === 'true'; } catch { return false; }
}

function HomeView({ best, mode, setMode, onPlay, setView }: { best: number; mode: GameMode; setMode: (mode: GameMode) => void; onPlay: () => void; setView: (view: View) => void }) {
  return (
    <main className="app-shell">
      <header>
        <span className="wordmark" data-testid="text-wordmark">STACK</span>
      </header>
      <div className="home-main">
        <section className="home-copy">
          <span className="kicker">a small game about timing</span>
          <h1 className="home-title">stack<br />slowly.</h1>
          <p className="home-description">Find the rhythm. Place each block with care. Stay for the sunset.</p>
          <div className="home-action-row">
            <button className="primary-button" onClick={onPlay} data-testid="button-play">
              PLAY <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="mode-wrap">
            <span className="kicker mode-label">choose your pace</span>
            <div className="mode-switch" role="group" aria-label="Game mode">
              <button className={`mode-button ${mode === 'relaxed' ? 'is-active' : ''}`} onClick={() => { setMode('relaxed'); sound.play('ui'); }} data-testid="button-mode-relaxed">RELAXED</button>
              <button className={`mode-button ${mode === 'competitive' ? 'is-active' : ''}`} onClick={() => { setMode('competitive'); sound.play('ui'); }} data-testid="button-mode-competitive">COMPETITIVE</button>
            </div>
          </div>
        </section>
        <aside className="home-aside" data-testid="text-best-score">
          <span className="best-label"><span className="diamond" /> BEST</span>
          <strong className="best-value">{best}</strong>
        </aside>
      </div>
      <footer className="site-footer">
        <nav className="footer-nav" aria-label="Information">
          <button className="text-button" onClick={() => setView('about')} data-testid="button-about">ABOUT</button>
          <button className="text-button" onClick={() => setView('rules')} data-testid="button-rules">RULES</button>
          <button className="text-button" onClick={() => setView('developer')} data-testid="button-developer">DEVELOPER</button>
        </nav>
        <span className="footer-note">made for one more try</span>
      </footer>
    </main>
  );
}

function InfoView({ kind, onBack }: { kind: Exclude<View, 'home'>; onBack: () => void }) {
  const content = {
    about: {
      kicker: 'the idea',
      title: 'just one<br />more stack.',
      lede: 'STACK is a simple stacking game built around timing, precision and rhythm. Place each block as accurately as you can, build your tower, maintain your Perfect streak and see how high you can go.',
      body: (
        <div className="info-grid">
          <div className="info-item"><h3>THE FEELING</h3><p>A quiet moment of focus, discovered on a phone during sunset. No rush unless you choose it.</p></div>
          <div className="info-item"><h3>THE RHYTHM</h3><p>Every placement gives you a little more tower, a little less room, and a reason to try again.</p></div>
          <div className="info-item"><h3>THE REWARD</h3><p>Perfect placements build a streak. Milestones mark the view. The best score waits patiently.</p></div>
          <div className="info-item"><h3>THE MODES</h3><p>Relaxed eases you in. Competitive asks you to keep your hands and eyes moving.</p></div>
        </div>
      ),
    },
    rules: {
      kicker: 'how to play',
      title: 'find<br />the edge.',
      lede: 'A few simple rules. A surprisingly deep rhythm.',
      body: (
        <div className="info-grid">
          <div className="info-item"><h3><span className="rule-number">01</span>TAP</h3><p>Tap anywhere on the playfield to drop the moving block.</p></div>
          <div className="info-item"><h3><span className="rule-number">02</span>SPACE</h3><p>On desktop, press SPACE for the same satisfying drop.</p></div>
          <div className="info-item"><h3><span className="rule-number">03</span>PERFECT</h3><p>Line up the block closely with the one below to earn a Perfect.</p></div>
          <div className="info-item"><h3><span className="rule-number">04</span>STREAK</h3><p>Keep placing Perfectly. Every tenth Perfect adds a growing bonus.</p></div>
          <div className="info-item"><h3><span className="rule-number">05</span>MILESTONES</h3><p>Every fifty points changes the view and gives the tower a small moment.</p></div>
          <div className="info-item"><h3><span className="rule-number">06</span>MISS</h3><p>No overlap means the run ends. Take a breath, then start another.</p></div>
        </div>
      ),
    },
    developer: {
      kicker: 'the person behind it',
      title: 'made<br />with care.',
      lede: 'STACK is a small digital arcade game designed and developed as an exercise in restraint, rhythm and tactile detail.',
      body: (
        <div className="developer-card">
          <h2 className="developer-name">Saswat Dixit</h2>
          <p className="developer-role">DEVELOPER &amp; DESIGNER</p>
          <div className="developer-links">
            <a className="footer-link" href="https://www.linkedin.com/in/saswatdixit/" target="_blank" rel="noreferrer" data-testid="link-linkedin">LINKEDIN</a>
            <a className="footer-link" href="https://github.com/FireStormy1" target="_blank" rel="noreferrer" data-testid="link-github">GITHUB</a>
            <a className="footer-link" href="mailto:saswatdixit01@gmail.com" data-testid="link-email">EMAIL</a>
            <a className="footer-link" href="https://leetcode.com/u/FireStormy/" target="_blank" rel="noreferrer" data-testid="link-leetcode">LEETCODE</a>
          </div>
        </div>
      ),
    },
  }[kind];

  return (
    <main className="app-shell">
      <header><span className="wordmark">STACK</span></header>
      <section className="info-main">
        <div className="info-header">
          <button className="back-button" onClick={onBack} data-testid="button-back"><ArrowLeft size={15} aria-hidden="true" /> BACK HOME</button>
          <span className="kicker">{content.kicker}</span>
          <h1 className="info-title" dangerouslySetInnerHTML={{ __html: content.title }} />
        </div>
        <p className="info-lede">{content.lede}</p>
        {content.body}
      </section>
      <footer className="site-footer"><span className="footer-note">STACK / 2026</span><span className="footer-note">one more try</span></footer>
    </main>
  );
}

function GameCanvas({ status, mode, muted, onPause, onScore, onPerfect, onMilestone, onGameOver }: {
  status: GameStatus;
  mode: GameMode;
  muted: boolean;
  onPause: () => void;
  onScore: (score: number) => void;
  onPerfect: (streak: number) => void;
  onMilestone: (score: number) => void;
  onGameOver: (score: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(status);
  const mutedRef = useRef(muted);
  const worldRef = useRef<{ width: number; height: number; baseY: number; blocks: StackBlock[]; active: StackBlock; direction: number; debris: Debris[]; score: number; streak: number; camera: number; lastTime: number; lastMilestone: number; startLeft: number; startRight: number; minX: number; maxX: number } | null>(null);
  statusRef.current = status;
  mutedRef.current = muted;

  const drop = useCallback(() => {
    const world = worldRef.current;
    if (!world || statusRef.current !== 'playing') return;
    sound.play('drop');
    const top = world.blocks[world.blocks.length - 1];
    const active = world.active;
    const left = Math.max(active.x, top.x);
    const right = Math.min(active.x + active.width, top.x + top.width);
    const overlap = right - left;
    if (overlap <= 0) {
      sound.play('gameover');
      onGameOver(world.score);
      return;
    }
    const perfect = isPerfect(active, top);
    const nextStreak = perfect ? world.streak + 1 : 0;
    const gained = pointsForScore(world.score) + streakBonus(nextStreak);
    world.score += gained;
    world.streak = nextStreak;
    onScore(world.score);
    if (perfect) {
      sound.play('perfect');
      onPerfect(nextStreak);
    } else {
      sound.play('impact');
    }
    if (world.score >= world.lastMilestone + 50) {
      world.lastMilestone = Math.floor(world.score / 50) * 50;
      sound.play('milestone');
      onMilestone(world.lastMilestone);
    }
    if (active.x < top.x) {
      world.debris.push({ x: active.x, y: active.y, width: top.x - active.x, vy: -1, vx: -0.05, rotation: 0, spin: -0.04, alpha: 1, color: active.color });
    } else if (active.x + active.width > top.x + top.width) {
      world.debris.push({ x: top.x + top.width, y: active.y, width: active.x + active.width - top.x - top.width, vy: -1, vx: 0.05, rotation: 0, spin: 0.04, alpha: 1, color: active.color });
    }
    const block: StackBlock = { x: left, y: top.y - BLOCK_HEIGHT, width: overlap, color: active.color };
    world.blocks.push(block);
    world.active = { x: world.direction > 0 ? world.startLeft : world.startRight - overlap, y: block.y - BLOCK_HEIGHT, width: overlap, color: BLOCK_COLORS[world.blocks.length % BLOCK_COLORS.length] };
    world.direction *= -1;
  }, [onGameOver, onMilestone, onPerfect, onScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const width = rect.width;
      const height = rect.height;
      const baseY = height - 74;
      // Keep the desktop travel lane equivalent to the mobile game's maximum width.
      // On mobile this resolves to the full canvas, preserving its existing movement.
      const movementWidth = Math.min(width, MOBILE_GAME_WIDTH);
      const movementOffset = (width - movementWidth) / 2;
      const startMargin = Math.max(12, Math.round(movementWidth * 0.03));
      const startLeft = movementOffset + startMargin;
      const startRight = movementOffset + movementWidth - startMargin;
      const minX = movementOffset + 10;
      const maxX = movementOffset + movementWidth - 10;
      const initialCamera = Math.min(0, height * .56 - (baseY + BLOCK_HEIGHT));
      if (!worldRef.current) {
        const foundationWidth = Math.min(115, width * .3);
        const foundation = { x: (width - foundationWidth) / 2, y: baseY, width: foundationWidth, color: BLOCK_COLORS[0] };
        worldRef.current = {
          width,
          height,
          baseY,
          blocks: [foundation],
          active: { x: startLeft, y: baseY - BLOCK_HEIGHT, width: foundationWidth, color: BLOCK_COLORS[1] },
          direction: 1,
          debris: [],
          score: 0,
          streak: 0,
          camera: initialCamera,
          lastTime: performance.now(),
          lastMilestone: 0,
          startLeft,
          startRight,
          minX,
          maxX,
        };
      } else {
        worldRef.current.width = width;
        worldRef.current.height = height;
        worldRef.current.baseY = baseY;
        worldRef.current.startLeft = startLeft;
        worldRef.current.startRight = startRight;
        worldRef.current.minX = minX;
        worldRef.current.maxX = maxX;
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const roundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.fill();
    };
    const frame = (now: number) => {
      const world = worldRef.current;
      if (!world) return;
      const dt = Math.min(now - world.lastTime, 32);
      world.lastTime = now;
      if (statusRef.current === 'playing') {
        world.active.x += speedForScore(world.score, mode) * dt * world.direction;
        if (world.active.x <= world.minX) { world.active.x = world.minX; world.direction = 1; }
        if (world.active.x + world.active.width >= world.maxX) { world.active.x = world.maxX - world.active.width; world.direction = -1; }
      }
      for (const piece of world.debris) {
        piece.y += piece.vy * dt;
        piece.vy += 0.0036 * dt;
        piece.x += piece.vx * dt;
        piece.rotation += piece.spin * dt;
        piece.alpha -= 0.0015 * dt;
      }
      world.debris = world.debris.filter((piece) => piece.alpha > 0);
      const top = world.blocks[world.blocks.length - 1];
      const desiredCamera = Math.min(0, world.height * .56 - (top.y + BLOCK_HEIGHT));
      world.camera += (desiredCamera - world.camera) * Math.min(1, dt * .006);

      context.clearRect(0, 0, world.width, world.height);
      context.save();
      context.translate(0, world.camera);
      for (const block of world.blocks) {
        context.fillStyle = block.color;
        context.shadowColor = 'rgba(44, 25, 25, .18)';
        context.shadowBlur = 11;
        context.shadowOffsetY = 5;
        roundedRect(block.x, block.y, block.width, BLOCK_HEIGHT, 4);
        context.shadowColor = 'transparent';
        context.fillStyle = 'rgba(255,239,207,.22)';
        roundedRect(block.x + 3, block.y + 3, Math.max(1, block.width - 6), 2, 1);
      }
      if (statusRef.current === 'playing' || statusRef.current === 'ready') {
        context.fillStyle = world.active.color;
        context.shadowColor = 'rgba(44, 25, 25, .2)';
        context.shadowBlur = 12;
        context.shadowOffsetY = 5;
        roundedRect(world.active.x, world.active.y, world.active.width, BLOCK_HEIGHT, 4);
        context.shadowColor = 'transparent';
        context.fillStyle = 'rgba(255,239,207,.26)';
        roundedRect(world.active.x + 3, world.active.y + 3, Math.max(1, world.active.width - 6), 2, 1);
      }
      for (const piece of world.debris) {
        context.save();
        context.globalAlpha = piece.alpha;
        context.translate(piece.x + piece.width / 2, piece.y + BLOCK_HEIGHT / 2);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        roundedRect(-piece.width / 2, -BLOCK_HEIGHT / 2, piece.width, BLOCK_HEIGHT, 3);
        context.restore();
      }
      context.restore();
      animationFrame = requestAnimationFrame(frame);
    };
    let animationFrame = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(animationFrame); observer.disconnect(); };
  }, [mode]);

  useEffect(() => {
    sound.setMuted(muted);
    try { music.setMuted(muted); } catch {}
  }, [muted]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') { event.preventDefault(); drop(); }
      if (event.code === 'Escape' && (statusRef.current === 'playing' || statusRef.current === 'paused')) onPause();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drop, onPause]);

  return (
    <div className="game-screen">
      <canvas ref={canvasRef} className="game-canvas" onPointerDown={(event) => { if (event.target === canvasRef.current) drop(); }} aria-label="Stack game playfield" data-testid="game-canvas" />
      <div className="game-hud">
        <div className="game-hint">TAP TO DROP <span aria-hidden="true">·</span> SPACE</div>
      </div>
    </div>
  );
}

function GameView({ mode, muted, setMuted, onExit, onRestart, best, setBest }: { mode: GameMode; muted: boolean; setMuted: (muted: boolean) => void; onExit: () => void; onRestart: () => void; best: number; setBest: (best: number) => void }) {
  const [status, setStatus] = useState<GameStatus>('ready');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ title: string; sub?: string } | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const readyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    readyTimer.current = window.setTimeout(() => setStatus('playing'), 1000);
    return () => { if (readyTimer.current) window.clearTimeout(readyTimer.current); };
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 900);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const pause = useCallback(() => {
    setStatus((current) => {
        if (current === 'playing') {
        sound.pauseMusic();
        try { music.pause(); } catch {}
        return 'paused';
      }
      if (current === 'paused') {
        sound.resumeMusic();
        try { music.resume(); } catch {}
        return 'playing';
      }
      return current;
    });
    sound.play('ui');
  }, []);

  const onGameOver = useCallback((finalScore: number) => {
    const newBest = finalScore > best;
    if (newBest) {
      setBest(finalScore);
      setIsNewBest(true);
      try { localStorage.setItem(BEST_KEY, String(finalScore)); } catch { /* storage can be unavailable */ }
    }
    setScore(finalScore);
    try { music.stop(); } catch {}
    sound.stopMusic();
    setStatus('gameover');
  }, [best, setBest]);

  const share = async () => {
    const text = `I stacked ${score} in STACK. Can you go higher?`;
    try {
      if (navigator.share) await navigator.share({ title: 'STACK', text });
      else if (navigator.clipboard) await navigator.clipboard.writeText(text);
    } catch { /* sharing can be dismissed */ }
    sound.play('ui');
  };

  // Background music is managed by the HTMLAudio-based music manager.
  // Start/stop is controlled from the app lifecycle (start/restart/exit) to ensure
  // playback happens in response to user interaction and does not create duplicates.

  return (
    <div className="game-screen">
      <GameCanvas status={status} mode={mode} muted={muted} onPause={pause} onScore={(next) => setScore(next)} onPerfect={(next) => { setStreak(next); setFeedback({ title: 'PERFECT', sub: next > 1 ? `${next} IN A ROW` : 'NICE PLACEMENT' }); }} onMilestone={(next) => setFeedback({ title: `${next}`, sub: 'MILESTONE' })} onGameOver={onGameOver} />
      <div className="game-hud" style={{ pointerEvents: 'none' }}>
        <div className="game-topbar">
          <div className="game-score" data-testid="text-game-score-overlay"><div className="score-number">{score}</div><div className="score-caption">SCORE{streak > 1 ? ` · ${streak} STREAK` : ''}</div></div>
          <div className="game-side">
            <div className="game-best"><span className="best-label"><span className="diamond" /> BEST</span><div className="best-value">{best}</div></div>
            <div className="game-controls">
              <button className="icon-button" onClick={pause} aria-label={status === 'paused' ? 'Resume game' : 'Pause game'} data-testid="button-pause" style={{ pointerEvents: 'auto' }}>
                {status === 'paused' ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
              </button>
              <button className="icon-button" onClick={() => setMuted(!muted)} aria-label={muted ? 'Turn sound on' : 'Mute sound'} data-testid="button-mute" style={{ pointerEvents: 'auto' }}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
            </div>
          </div>
        </div>
        {feedback && <div className="feedback"><div className="feedback-title">{feedback.title}</div><div className="feedback-sub">{feedback.sub}</div></div>}
        {status === 'paused' && <div className="scrim"><div className="game-panel"><h2>PAUSED</h2><p>The tower will wait right here.</p><div className="panel-actions"><button className="primary-button" onClick={pause} data-testid="button-resume">RESUME <Play size={15} fill="currentColor" /></button><button className="ghost-button" onClick={onRestart} data-testid="button-restart-paused">RESTART</button></div></div></div>}
        {status === 'gameover' && <div className="scrim"><div className="game-panel"><h2>GAME OVER</h2>{isNewBest && <div className="new-best">NEW BEST</div>}<div className="panel-score">{score}<small>FINAL SCORE</small></div><p>{score === 0 ? 'The edge was waiting. Try once more.' : 'A good run. The next one can be taller.'}</p><div className="panel-actions"><button className="primary-button" onClick={onRestart} data-testid="button-restart">RESTART <RotateCcw size={14} /></button><button className="ghost-button panel-action-with-icon" onClick={share} data-testid="button-share"><Share2 size={14} /> SHARE</button><button className="ghost-button panel-action-with-icon" onClick={onExit} data-testid="button-home"><HomeIcon size={14} /> HOME</button><button className="ghost-button" onClick={onRestart} data-testid="button-new-run">NEW RUN</button></div><div className="share-note">your best is saved on this device</div></div></div>}
        {status === 'ready' && <div className="scrim" style={{ background: 'transparent' }}><div className="feedback" style={{ animation: 'fade-in .4s both' }}><div className="feedback-title">READY</div><div className="feedback-sub">find your rhythm</div></div></div>}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<GameMode>('relaxed');
  const [muted, setMutedState] = useState(readMute);
  const [best, setBest] = useState(readBest);
  const [isPlaying, setIsPlaying] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const setMuted = (next: boolean) => {
    setMutedState(next);
    sound.setMuted(next);
    try { music.setMuted(next); } catch {}
    try { localStorage.setItem(MUTE_KEY, String(next)); } catch { /* storage can be unavailable */ }
  };
  const startGame = () => { sound.play('ui'); try { music.start(mode); } catch {} setIsPlaying(true); };
  const exitGame = () => { try { music.stop(); } catch {} setIsPlaying(false); setView('home'); };
  const restart = () => { try { music.start(mode); } catch {} setRunKey((key) => key + 1); };

  if (isPlaying) return <GameView key={runKey} mode={mode} muted={muted} setMuted={setMuted} onExit={exitGame} onRestart={restart} best={best} setBest={setBest} />;
  if (view !== 'home') return <div className="stack-app"><div className="scene-sun" /><InfoView kind={view} onBack={() => setView('home')} /></div>;
  return <div className="stack-app"><div className="scene-sun" /><HomeView best={best} mode={mode} setMode={setMode} onPlay={startGame} setView={setView} /></div>;
}

export default App;
