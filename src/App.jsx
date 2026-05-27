import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── DESIGN TOKENS ──────────────────────────────────────
const C = {
  text: '#101010',
  textBody: '#424242',
  textSecondary: 'rgba(66,66,66,0.8)',
  textMuted: 'rgba(66,66,66,0.7)',
  textPlaceholder: 'rgba(66,66,66,0.4)',
  border: 'rgba(66,66,66,0.2)',
  borderLight: 'rgba(66,66,66,0.1)',
  cardBg: 'rgba(66,66,66,0.05)',
  lime: '#B4ED3E',
  white: '#FFFFFF',
}

const fw = (w) => ({ fontWeight: w })

// ── SLIDE VARIANTS ────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%' }),
}
const spring = { type: 'spring', stiffness: 300, damping: 30 }

// ── SVG ICONS ─────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.5 }) {
  const s = { stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }
  const paths = {
    menu: <><line x1="3" y1="6" x2="21" y2="6" {...s}/><line x1="3" y1="12" x2="21" y2="12" {...s}/><line x1="3" y1="18" x2="21" y2="18" {...s}/></>,
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" {...s}/>,
    starFilled: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={color}/>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" {...s}/><path d="M13.73 21a2 2 0 0 1-3.46 0" {...s}/></>,
    store: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" {...s}/><line x1="3" y1="6" x2="21" y2="6" {...s}/><path d="M16 10a4 4 0 01-8 0" {...s}/></>,
    house: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" {...s}/><polyline points="9,22 9,12 15,12 15,22" {...s}/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" {...s}/><line x1="4" y1="22" x2="4" y2="15" {...s}/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" {...s}/><circle cx="9" cy="7" r="4" {...s}/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" {...s}/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10" {...s}/><line x1="12" y1="20" x2="12" y2="4" {...s}/><line x1="6" y1="20" x2="6" y2="14" {...s}/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" {...s}/><polyline points="22,4 12,13 2,4" {...s}/></>,
    video: <><polygon points="23,7 16,12 23,17" {...s}/><rect x="1" y="5" width="15" height="14" rx="2" {...s}/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" {...s}/><polyline points="12,19 5,12 12,5" {...s}/></>,
    archive: <><polyline points="21,8 21,21 3,21 3,8" {...s}/><rect x="1" y="3" width="22" height="5" {...s}/><line x1="10" y1="12" x2="14" y2="12" {...s}/></>,
    trash: <><polyline points="3,6 5,6 21,6" {...s}/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" {...s}/></>,
    moreVert: <><circle cx="12" cy="5" r="1.2" fill={color}/><circle cx="12" cy="12" r="1.2" fill={color}/><circle cx="12" cy="19" r="1.2" fill={color}/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" {...s}/>,
    heartFilled: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={color}/>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" {...s}/>,
    bookmarkFilled: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={color}/>,
    messageSquare: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...s}/></>,
    check: <polyline points="20,6 9,17 4,12" {...s}/>,
    chevronDown: <polyline points="6,9 12,15 18,9" {...s}/>,
    package: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" {...s}/><polyline points="3.27,6.96 12,12.01 20.73,6.96" {...s}/><line x1="12" y1="22.08" x2="12" y2="12" {...s}/></>,
    clock: <><circle cx="12" cy="12" r="10" {...s}/><polyline points="12,6 12,12 16,14" {...s}/></>,
    help: <><circle cx="12" cy="12" r="10" {...s}/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" {...s}/><line x1="12" y1="17" x2="12.01" y2="17" {...s}/></>,
    externalLink: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" {...s}/><polyline points="15,3 21,3 21,9" {...s}/><line x1="10" y1="14" x2="21" y2="3" {...s}/></>,
    replyIcon: <><polyline points="9,17 4,12 9,7" {...s}/><path d="M20 18v-2a4 4 0 00-4-4H4" {...s}/></>,
    search: <><circle cx="11" cy="11" r="8" {...s}/><line x1="21" y1="21" x2="16.65" y2="16.65" {...s}/></>,
    pencilRuler: <><path d="M12 20h9" {...s}/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" {...s}/></>,
    award: <><circle cx="12" cy="8" r="7" {...s}/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" {...s}/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" {...s}/><line x1="5" y1="12" x2="19" y2="12" {...s}/></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
      {paths[name] || null}
    </svg>
  )
}

// ── SHARED COMPONENTS ─────────────────────────────────

function Avatar({ initial = '?', size = 32, showIndicator = false }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
      <span style={{ ...fw(900), fontSize: size * 0.38, color: C.text, lineHeight: 1 }}>{initial}</span>
      {showIndicator && (
        <div style={{ position: 'absolute', top: -1, right: -1, width: Math.max(8, size * 0.28), height: Math.max(8, size * 0.28), background: C.lime, borderRadius: '50%', border: '2px solid white' }} />
      )}
    </div>
  )
}

function Pill({ children, icon, bg = C.cardBg, border = C.border, color = C.textBody }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 30, background: bg, border: `1px solid ${border}`, ...fw(500), fontSize: 12, color, whiteSpace: 'nowrap', flexShrink: 0 }}>
      {icon}<span>{children}</span>
    </span>
  )
}

function PrimaryButton({ children, onClick, disabled = false, dark = false }) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={disabled ? undefined : onClick}
      style={{ width: '100%', height: 48, borderRadius: 12, border: `1px solid ${disabled ? 'rgba(66,66,66,0.1)' : dark ? C.text : C.border}`, background: dark ? C.text : C.white, color: dark ? C.white : (disabled ? 'rgba(66,66,66,0.3)' : C.text), display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'default' : 'pointer', ...fw(700), fontSize: 14, userSelect: 'none' }}
    >
      {children}
    </motion.button>
  )
}

function IconButton({ icon, size = 32, onClick, color = C.textBody }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      style={{ width: size, height: size, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <Icon name={icon} size={size * 0.6} color={color} />
    </motion.button>
  )
}

// ── SCREEN 1: EMAIL ENTRY ─────────────────────────────

function EmailScreen({ onNext }) {
  const [email, setEmail] = useState('')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 120, height: 52, background: 'rgba(66,66,66,0.07)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...fw(700), fontSize: 13, color: 'rgba(66,66,66,0.3)', letterSpacing: 2 }}>DUEL</span>
      </div>

      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 16, width: 358, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px' }}>Welcome back!</p>
          <p style={{ ...fw(400), fontSize: 16, color: C.textSecondary, lineHeight: '24px' }}>Enter your email address</p>
        </div>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          onKeyDown={e => e.key === 'Enter' && valid && onNext(email)}
          style={{ width: '100%', height: 48, borderRadius: 4, border: `1px solid ${C.border}`, padding: '0 16px', ...fw(400), fontSize: 14, color: C.text, background: C.white, boxSizing: 'border-box' }}
        />

        <PrimaryButton onClick={() => valid && onNext(email)} disabled={!valid}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  )
}

// ── SCREEN 2: CHECK INBOX ─────────────────────────────

function InboxScreen({ email, onNext }) {
  const [state, setState] = useState('idle')

  const handleResend = () => {
    setState('sent')
    setTimeout(() => setState('idle'), 2500)
  }

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 358, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="mail" size={22} color={C.textBody} />
        </motion.div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px' }}>Check your inbox</p>
          <p style={{ ...fw(400), fontSize: 16, color: C.textSecondary, lineHeight: '24px' }}>
            Click the link we sent to{' '}
            <span style={{ ...fw(700), color: C.text }}>{email || 'your email'}</span>
            {' '}to log in. The link will expire in 30 minutes.
          </p>
        </div>

        <PrimaryButton onClick={handleResend}>
          {state === 'sent' ? '✓ Link sent!' : "Didn't receive it? Send again"}
        </PrimaryButton>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{ background: 'none', border: 'none', cursor: 'pointer', ...fw(500), fontSize: 14, color: C.textMuted, textDecoration: 'underline', padding: '8px 0' }}
        >
          Open email app →
        </motion.button>
      </div>
    </div>
  )
}

// ── SCREEN 3: EMAIL CLIENT ────────────────────────────

function EmailClientScreen({ onNext }) {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <IconButton icon="arrowLeft" size={36} color={C.textBody} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {['archive', 'mail', 'trash', 'moreVert'].map(ic => (
            <IconButton key={ic} icon={ic} size={32} color={C.textBody} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <p style={{ ...fw(700), fontSize: 16, color: C.text, lineHeight: '22px', flex: 1 }}>
              Your magic link from Charlotte Tilbury × Duel
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
              <Icon name="star" size={20} color={C.textMuted} />
              <span style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 7px', ...fw(500), fontSize: 11, color: C.textMuted }}>Inbox</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ ...fw(900), fontSize: 14, color: C.text }}>D</span>
            </div>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Duel</span>
                <span style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>Just now</span>
              </div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginTop: 3 }}>
                <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>to me</span>
                <Icon name="chevronDown" size={14} color={C.textMuted} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Icon name="replyIcon" size={20} color={C.textMuted} />
            <Icon name="moreVert" size={20} color={C.textMuted} />
          </div>
        </div>

        <div style={{ padding: '28px 28px 32px' }}>
          <div style={{ width: 140, height: 36, background: 'rgba(66,66,66,0.06)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <span style={{ ...fw(600), fontSize: 11, color: 'rgba(66,66,66,0.35)', letterSpacing: 1.5 }}>CHARLOTTE TILBURY</span>
          </div>

          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 24, marginBottom: 20 }}>
            <p style={{ ...fw(700), fontSize: 18, color: C.text, textAlign: 'center', lineHeight: '26px', marginBottom: 8 }}>
              You're one tap away
            </p>
            <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, textAlign: 'center', lineHeight: '20px', marginBottom: 24 }}>
              Tap the button below to log in to your Charlotte Tilbury advocate account.
            </p>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              style={{ width: '100%', height: 48, background: C.text, color: C.white, border: 'none', borderRadius: 12, cursor: 'pointer', ...fw(700), fontSize: 15, marginBottom: 20 }}
            >
              Log in to Duel →
            </motion.button>

            <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: '18px' }}>
              This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.
            </p>
          </div>

          <p style={{ ...fw(400), fontSize: 12, color: C.textPlaceholder, textAlign: 'center' }}>
            © 2025 Duel ·{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span>
          </p>
        </div>
      </div>

      <div style={{ height: 59, borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 96 }}>
          <div style={{ position: 'relative' }}>
            <Icon name="mail" size={24} color={C.text} />
            <div style={{ position: 'absolute', top: -5, right: -9, background: C.text, borderRadius: 8, padding: '1px 5px', minWidth: 18, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...fw(900), fontSize: 9, color: C.white }}>1</span>
            </div>
          </div>
          <Icon name="video" size={24} color={C.textMuted} />
        </div>
        <div style={{ height: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 108, height: 4, background: 'rgba(66,66,66,0.15)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ── SCREEN 4: HOME ────────────────────────────────────

const TABS = [
  { id: 'feed',       icon: 'house',       label: 'Home'       },
  { id: 'challenges', icon: 'flag',         label: 'Challenges' },
  { id: 'community',  icon: 'users',        label: 'Community'  },
  { id: 'studio',     icon: 'pencilRuler',  label: 'Studio'     },
  { id: 'progress',   icon: 'chart',        label: 'Progress'   },
]

// ── TAB: FEED ─────────────────────────────────────────

function FeedTab() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [threadOpen, setThreadOpen] = useState(false)
  const [hearted, setHearted] = useState(false)

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, height: 63, background: C.white, borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconButton icon="menu" size={32} />
          <span style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>Charlotte Tilbury</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(66,66,66,0.09)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '0 8px', height: 24, cursor: 'pointer' }}
          >
            <Icon name="star" size={13} color={C.textBody} />
            <span style={{ ...fw(700), fontSize: 12, color: C.text }}>1,234</span>
          </motion.button>
          <IconButton icon="store" size={28} />
          <IconButton icon="bell" size={28} />
        </div>
      </div>

      <div style={{ padding: '20px 16px 32px' }}>
        <p style={{ ...fw(400), fontSize: 18, color: C.text, lineHeight: '24px', marginBottom: 20 }}>Hi Zara!</p>

        <p style={{ ...fw(400), fontSize: 14, color: C.text, marginBottom: 14 }}>Try a recommended challenge</p>

        <div style={{ position: 'relative', marginBottom: 24, paddingTop: 8 }}>
          <div style={{ position: 'absolute', top: 0, left: 18, right: 18, height: 'calc(100% - 8px)', background: 'rgba(66,66,66,0.03)', borderRadius: 12, border: `1px solid ${C.border}` }} />
          <div style={{ position: 'absolute', top: 4, left: 9, right: 9, height: 'calc(100% - 4px)', background: 'rgba(66,66,66,0.05)', borderRadius: 12, border: `1px solid ${C.border}` }} />

          <motion.div
            whileTap={{ scale: 0.985 }}
            style={{ position: 'relative', background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: 'hidden', cursor: 'pointer' }}
          >
            <div style={{ height: 210, background: 'linear-gradient(145deg, #faeae4 0%, #f0c8b8 35%, #e0a090 65%, #c88070 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 38 }}>💄</span>
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="starFilled" size={12} color={C.text} />
                <span style={{ ...fw(700), fontSize: 12, color: C.text }}>120 pts</span>
              </div>
            </div>

            <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ ...fw(400), fontSize: 17, color: C.text, lineHeight: '23px' }}>
                Pillow Talk Blush Balm Lip Tint: One Swipe Glow
              </p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Pill icon={<Icon name="package" size={10} color={C.textBody} />}>Product Review</Pill>
                <Pill icon={<Icon name="clock" size={10} color={C.textBody} />}>1h</Pill>
                <Pill>Beginner</Pill>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="starFilled" size={14} color={C.text} />
                  <span style={{ ...fw(500), fontSize: 14, color: C.text }}>120</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => setHearted(h => !h)}
                  style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon name={hearted ? 'heartFilled' : 'heart'} size={16} color={hearted ? '#e05555' : C.textBody} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, position: 'relative', flexShrink: 0 }}>
            <svg width={52} height={52} viewBox="0 0 52 52">
              <circle cx={26} cy={26} r={21} fill="none" stroke={C.border} strokeWidth={4} />
              <circle
                cx={26} cy={26} r={21} fill="none"
                stroke={C.text} strokeWidth={4}
                strokeDasharray={String(2 * Math.PI * 21)}
                strokeDashoffset={String(2 * Math.PI * 21 * 0.4)}
                transform="rotate(-90 26 26)"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...fw(400), fontSize: 10, color: C.textBody }}>60%</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'baseline' }}>
              <span style={{ ...fw(700), fontSize: 16, color: C.text }}>60 pts</span>
              <span style={{ ...fw(400), fontSize: 16, color: C.text }}>to Platinum tier</span>
            </div>
            <span style={{ ...fw(400), fontSize: 14, color: C.textSecondary }}>You've earned 180 pts this month</span>
          </div>
        </div>

        <p style={{ ...fw(400), fontSize: 16, color: C.text, marginBottom: 16 }}>From the community</p>

        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Avatar initial="L" size={32} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Lea Fontaine</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Pill bg={C.cardBg}>Platinum</Pill>
                  <Pill bg={C.white}>Guide</Pill>
                </div>
              </div>
            </div>
            <Pill icon={<Icon name="flag" size={10} color={C.textBody} />} bg={C.white}>Challenge</Pill>
          </div>

          <div style={{ height: 200, borderRadius: 10, background: 'linear-gradient(135deg, #f0e8ff 0%, #d4b8f0 45%, #b498d8 80%, #9880c0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, overflow: 'hidden' }}>
            <span style={{ fontSize: 52, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}>✨</span>
          </div>

          <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>
            How beautiful is{' '}
            <span style={{ ...fw(500), textDecoration: 'underline' }}>@charlottetilbury</span>{' '}
            NEW Pillow talk beauty soulmates palette in the shade- Flawless rosewood 🩷✨
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>45m ago</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>24</span>
              <motion.button
                whileTap={{ scale: 0.82 }}
                onClick={() => setBookmarked(b => !b)}
                style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name={bookmarked ? 'bookmarkFilled' : 'bookmark'} size={14} color={bookmarked ? C.text : C.textMuted} />
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Avatar initial="C" size={32} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Chloe Nakamura</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Pill bg={C.cardBg}>Gold</Pill>
                  <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>45m ago</span>
                </div>
              </div>
            </div>
            <Pill icon={<Icon name="help" size={10} color={C.textBody} />} bg={C.white}>Question</Pill>
          </div>

          <p style={{ ...fw(400), fontSize: 17, color: C.text, lineHeight: '24px', marginBottom: 8 }}>
            Does the Hollywood Flawless Filter oxidise throughout the day?
          </p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 12 }}>
            I'm shade 3 and it looks perfect on application but by lunchtime it's pulling slightly warmer. Anyone else getting this?
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Avatar initial="C" size={22} />
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>1 accepted</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>4</span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setThreadOpen(o => !o)}
                style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name="messageSquare" size={14} color={threadOpen ? C.text : C.textMuted} />
              </motion.button>
            </div>
          </div>

          <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, marginBottom: threadOpen ? 12 : 0 }}>
            <Avatar initial="Z" size={26} showIndicator />
            <span style={{ ...fw(400), fontSize: 13, color: C.textPlaceholder }}>Share your thoughts here</span>
          </div>

          <AnimatePresence>
            {threadOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Avatar initial="C" size={22} />
                      <span style={{ ...fw(700), fontSize: 12, color: C.text }}>Chloe Nakamura</span>
                      <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>45m ago</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <Icon name="check" size={10} color={C.text} strokeWidth={2.5} />
                      <span style={{ ...fw(500), fontSize: 12, color: C.text }}>Accepted</span>
                    </div>
                  </div>
                  <div style={{ paddingLeft: 30 }}>
                    <p style={{ ...fw(400), fontSize: 13, color: 'rgba(66,66,66,0.9)', lineHeight: '19px' }}>
                      It's the primer — I had the same issue with silicone-based ones. Switch to the Charlotte Tilbury Wonderglow and it stays true all day. Shade 3 here too.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <PrimaryButton onClick={() => {}}>Explore more</PrimaryButton>
      </div>
    </div>
  )
}

// ── TAB: CHALLENGES ───────────────────────────────────

function ChallengesTab() {
  const [filter, setFilter] = useState('Explore')

  const challenges = [
    { title: 'Pillow Talk Blush Balm Lip Tint: One Swipe Glow', pts: 120, type: 'Product Review', time: '1h', level: 'Beginner', emoji: '💄', bg: 'linear-gradient(145deg,#faeae4,#e0a090)' },
    { title: 'Hollywood Flawless Filter: 5 Ways to Wear It', pts: 85, type: 'Tutorial', time: '45m', level: 'Intermediate', emoji: '✨', bg: 'linear-gradient(145deg,#f0e8ff,#b498d8)' },
    { title: "Charlotte's Magic Cream: Your 7-Day Skin Test", pts: 200, type: 'Review', time: '2h', level: 'Advanced', emoji: '🌟', bg: 'linear-gradient(145deg,#e8f4e8,#90c890)' },
    { title: 'Airbrush Flawless Foundation First Look', pts: 60, type: 'Product Review', time: '30m', level: 'Beginner', emoji: '🧴', bg: 'linear-gradient(145deg,#fff4e0,#e8c870)' },
  ]

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}`, padding: '12px 16px' }}>
        <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, marginBottom: 10, background: C.cardBg }}>
          <Icon name="search" size={15} color={C.textMuted} />
          <span style={{ ...fw(400), fontSize: 14, color: C.textPlaceholder }}>Search challenges</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Explore', 'Review', 'Tutorial'].map(f => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(f)}
              style={{ height: 30, padding: '0 14px', borderRadius: 20, border: `1px solid ${filter === f ? C.text : C.border}`, background: filter === f ? C.text : 'transparent', ...fw(filter === f ? 600 : 400), fontSize: 13, color: filter === f ? C.white : C.textBody, cursor: 'pointer' }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {challenges.map((c, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.985 }}
            style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: C.white }}
          >
            <div style={{ height: 150, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.35)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 26 }}>{c.emoji}</span>
              </div>
              <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Icon name="starFilled" size={11} color={C.text} />
                <span style={{ ...fw(700), fontSize: 11, color: C.text }}>{c.pts} pts</span>
              </div>
            </div>
            <div style={{ padding: '12px 14px 14px' }}>
              <p style={{ ...fw(400), fontSize: 15, color: C.text, lineHeight: '21px', marginBottom: 8 }}>{c.title}</p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Pill icon={<Icon name="package" size={10} color={C.textBody} />}>{c.type}</Pill>
                <Pill icon={<Icon name="clock" size={10} color={C.textBody} />}>{c.time}</Pill>
                <Pill>{c.level}</Pill>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── TAB: COMMUNITY ────────────────────────────────────

function CommunityTab() {
  const [filter, setFilter] = useState('Inspiring')
  const [saved, setSaved] = useState([false, false, false])

  const posts = [
    {
      initial: 'L', name: 'Lea Fontaine', tier: 'Platinum', role: 'Guide', time: '45m ago',
      tag: { icon: 'flag', label: 'Challenge' },
      photo: true, gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '✨',
      body: 'How beautiful is @charlottetilbury NEW Pillow talk beauty soulmates palette in the shade — Flawless rosewood 🩷✨',
      saves: 24,
    },
    {
      initial: 'S', name: 'Sofia Brennan', tier: 'Gold', role: null, time: '1h ago',
      tag: { icon: 'flag', label: 'Challenge' },
      photo: true, gradient: 'linear-gradient(135deg,#faeae4,#f0c8b8,#c88070)', emoji: '💄',
      body: 'Finally tried the Pillow Talk lip kit 💋 The liner and lipstick combo is so gorgeous. Shade: Original.',
      saves: 18,
    },
    {
      initial: 'M', name: 'Maya Osei', tier: 'Silver', role: null, time: '2h ago',
      tag: { icon: 'help', label: 'Question' },
      photo: false, gradient: null, emoji: null,
      body: 'Has anyone tried layering the Hollywood Flawless Filter over SPF? Wondering if it affects the glow...',
      saves: 7,
    },
  ]

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <span style={{ ...fw(400), fontSize: 18, color: C.text }}>Community</span>
          <motion.button
            whileTap={{ scale: 0.94 }}
            style={{ height: 30, padding: '0 12px', borderRadius: 20, border: `1px solid ${C.border}`, background: 'transparent', ...fw(500), fontSize: 13, color: C.textBody, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <Icon name="chart" size={13} color={C.textBody} />
            Leaderboard
          </motion.button>
        </div>
        <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6 }}>
          {['Inspiring', 'Trending', 'New'].map(f => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(f)}
              style={{ height: 30, padding: '0 14px', borderRadius: 20, border: `1px solid ${filter === f ? C.text : C.border}`, background: filter === f ? C.text : 'transparent', ...fw(filter === f ? 600 : 400), fontSize: 13, color: filter === f ? C.white : C.textBody, cursor: 'pointer' }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map((post, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Avatar initial={post.initial} size={32} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ ...fw(700), fontSize: 14, color: C.text }}>{post.name}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <Pill bg={C.cardBg}>{post.tier}</Pill>
                    {post.role && <Pill bg={C.white}>{post.role}</Pill>}
                  </div>
                </div>
              </div>
              <Pill icon={<Icon name={post.tag.icon} size={10} color={C.textBody} />} bg={C.white}>{post.tag.label}</Pill>
            </div>

            {post.photo && (
              <div style={{ height: 190, borderRadius: 10, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 46, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>{post.emoji}</span>
              </div>
            )}

            <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>{post.body}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>{post.time}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ ...fw(500), fontSize: 12, color: C.text }}>{post.saves + (saved[i] ? 1 : 0)}</span>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={() => setSaved(prev => prev.map((v, idx) => idx === i ? !v : v))}
                  style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon name={saved[i] ? 'bookmarkFilled' : 'bookmark'} size={14} color={saved[i] ? C.text : C.textMuted} />
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── TAB: STUDIO ───────────────────────────────────────

function StudioTab() {
  const [tab, setTab] = useState('New Project')

  const actions = [
    { emoji: '📸', label: 'Create a post', desc: 'Share your experience with the community' },
    { emoji: '🏆', label: 'Start a challenge', desc: 'Take on a new brand challenge and earn points' },
    { emoji: '💬', label: 'Ask a question', desc: 'Get answers from fellow advocates' },
  ]

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}`, height: 63, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
        <span style={{ ...fw(400), fontSize: 18, color: C.text }}>Studio</span>
        <Avatar initial="Z" size={34} showIndicator />
      </div>

      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 6 }}>
        {['New Project', 'My projects'].map(t => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.94 }}
            onClick={() => setTab(t)}
            style={{ height: 32, padding: '0 14px', borderRadius: 20, border: `1px solid ${tab === t ? C.text : C.border}`, background: tab === t ? C.text : 'transparent', ...fw(tab === t ? 600 : 400), fontSize: 13, color: tab === t ? C.white : C.textBody, cursor: 'pointer' }}
          >
            {t}
          </motion.button>
        ))}
      </div>

      <div style={{ padding: '28px 16px 16px', textAlign: 'center' }}>
        <p style={{ ...fw(400), fontSize: 22, color: C.text, lineHeight: '30px', marginBottom: 6 }}>Let's start creating</p>
        <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, lineHeight: '20px' }}>Choose a format to kick off your next project</p>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 26 }}>{action.emoji}</span>
            </div>
            <div>
              <p style={{ ...fw(600), fontSize: 16, color: C.text, marginBottom: 3 }}>{action.label}</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, lineHeight: '18px' }}>{action.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ── TAB: PROGRESS ─────────────────────────────────────

function ProgressTab() {
  const [subTab, setSubTab] = useState('Progress')

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const streakActive = [true, true, true, true, true, false, false]

  const subBars = [
    { label: 'Challenges', pts: 90, pct: 0.6 },
    { label: 'Community',  pts: 60, pct: 0.4 },
    { label: 'Studio',     pts: 30, pct: 0.2 },
  ]

  const achievements = [
    { label: 'First Challenge',  desc: 'Completed your first challenge',  earned: true  },
    { label: '5-Day Streak',     desc: 'Active 5 days in a row',          earned: true  },
    { label: 'Community Star',   desc: 'Got 10 saves on a post',          earned: true  },
    { label: 'Platinum Member',  desc: 'Reach Platinum tier',             earned: false },
    { label: 'Challenge Master', desc: 'Complete 10 challenges',          earned: false },
  ]

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ display: 'flex', background: C.cardBg, borderRadius: 10, padding: 3, gap: 2 }}>
            {['Progress', 'Rewards'].map(t => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSubTab(t)}
                style={{ height: 30, padding: '0 18px', borderRadius: 8, border: 'none', background: subTab === t ? C.white : 'transparent', ...fw(subTab === t ? 600 : 400), fontSize: 14, color: subTab === t ? C.text : C.textMuted, cursor: 'pointer', boxShadow: subTab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Points summary */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, marginBottom: 3 }}>Points this month</p>
              <p style={{ ...fw(700), fontSize: 28, color: C.text, lineHeight: 1 }}>180 pts</p>
            </div>
            <Pill icon={<Icon name="starFilled" size={10} color={C.text} />}>Silver Tier</Pill>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 96, height: 96, position: 'relative' }}>
              <svg width={96} height={96} viewBox="0 0 96 96">
                <circle cx={48} cy={48} r={38} fill="none" stroke={C.borderLight} strokeWidth={7} />
                <circle
                  cx={48} cy={48} r={38} fill="none"
                  stroke={C.text} strokeWidth={7}
                  strokeDasharray={String(2 * Math.PI * 38)}
                  strokeDashoffset={String(2 * Math.PI * 38 * 0.4)}
                  transform="rotate(-90 48 48)"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...fw(700), fontSize: 17, color: C.text }}>60%</span>
                <span style={{ ...fw(400), fontSize: 10, color: C.textMuted }}>to Gold</span>
              </div>
            </div>
          </div>

          {subBars.map((bar, i) => (
            <div key={i} style={{ marginBottom: i < subBars.length - 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ ...fw(400), fontSize: 12, color: C.textBody }}>{bar.label}</span>
                <span style={{ ...fw(600), fontSize: 12, color: C.text }}>{bar.pts} pts</span>
              </div>
              <div style={{ height: 4, background: C.borderLight, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${bar.pct * 100}%`, background: C.text, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Streak */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ ...fw(400), fontSize: 15, color: C.text }}>Your streak</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 16 }}>🔥</span>
              <span style={{ ...fw(700), fontSize: 15, color: C.text }}>5 days</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {weekDays.map((day, i) => (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: streakActive[i] ? C.lime : C.cardBg, border: `1px solid ${streakActive[i] ? C.lime : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {streakActive[i]
                    ? <span style={{ fontSize: 14 }}>🔥</span>
                    : <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.border }} />
                  }
                </div>
                <span style={{ ...fw(streakActive[i] ? 600 : 400), fontSize: 10, color: streakActive[i] ? C.text : C.textMuted }}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <p style={{ ...fw(400), fontSize: 15, color: C.text, marginBottom: 12 }}>Your achievements</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {achievements.map((ach, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', opacity: ach.earned ? 1 : 0.4 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: ach.earned ? C.lime : C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="award" size={18} color={ach.earned ? '#2a5a10' : C.textMuted} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...fw(600), fontSize: 13, color: C.text, marginBottom: 1 }}>{ach.label}</p>
                  <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{ach.desc}</p>
                </div>
                {ach.earned && <Icon name="check" size={15} color={C.text} strokeWidth={2.5} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── HOME SCREEN (shell + tab nav) ─────────────────────

function HomeScreen() {
  const [activeTab, setActiveTab] = useState('feed')

  const renderTab = () => {
    switch (activeTab) {
      case 'feed':        return <FeedTab />
      case 'challenges':  return <ChallengesTab />
      case 'community':   return <CommunityTab />
      case 'studio':      return <StudioTab />
      case 'progress':    return <ProgressTab />
      default:            return null
    }
  }

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ height: 63, background: C.white, borderTop: `1px solid ${C.borderLight}`, flexShrink: 0 }}>
        <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.88 }}
                onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, height: 48, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}
              >
                <Icon name={tab.icon} size={18} color={active ? C.text : C.textMuted} strokeWidth={active ? 2 : 1.5} />
                <span style={{ ...fw(active ? 600 : 400), fontSize: 10, color: active ? C.text : C.textSecondary }}>
                  {tab.label}
                </span>
              </motion.button>
            )
          })}
        </div>
        <div style={{ height: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 108, height: 4, background: 'rgba(66,66,66,0.14)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ── APP ROOT ──────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState(0)
  const [dir, setDir] = useState(1)
  const [email, setEmail] = useState('')

  const go = (to) => {
    setDir(to > screen ? 1 : -1)
    setScreen(to)
  }

  const screens = [
    <EmailScreen key="email" onNext={(e) => { setEmail(e); go(1) }} />,
    <InboxScreen key="inbox" email={email} onNext={() => go(2)} />,
    <EmailClientScreen key="email-client" onNext={() => go(3)} />,
    <HomeScreen key="home" />,
  ]

  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 500

  return (
    <div style={{ minHeight: '100dvh', background: isMobileViewport ? C.white : '#e8e8e8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobileViewport ? 0 : 32 }}>
      <div style={{
        width: 390, height: 844,
        borderRadius: isMobileViewport ? 0 : 44,
        overflow: 'hidden',
        position: 'relative',
        background: C.white,
        boxShadow: isMobileViewport ? 'none' : '0 0 0 10px #1c1c1e, 0 40px 80px rgba(0,0,0,0.35)',
        flexShrink: 0,
      }}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={screen}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            style={{ position: 'absolute', inset: 0, background: C.white }}
          >
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {!isMobileViewport && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {screens.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === screen ? 22 : 7, background: i === screen ? '#1c1c1e' : 'rgba(0,0,0,0.2)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                style={{ height: 7, borderRadius: 4 }}
              />
            ))}
          </div>
          {screen !== 3 && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => go(3)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', ...fw(500), fontSize: 13, color: 'rgba(0,0,0,0.45)', textDecoration: 'underline', padding: '4px 8px' }}
            >
              Skip to feed →
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}
