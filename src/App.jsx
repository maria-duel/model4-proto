import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_CONTENT = {
  // ── Identity ─────────────────────────────────
  name: 'American Eagle',
  handle: '@americaneagle',
  logo: '/AE_Logo.svg',

  // ── Orders (Progress tab) ─────────────────────
  orders: [
    { id: 1, name: 'Crossover Flare Leg Jean', ago: '5 days ago', price: '$85', pts: 744, reviewNudge: true },
    { id: 2, name: 'Cloud Hoodie',             ago: '3 weeks ago', price: '$65', pts: 481, reviewNudge: false },
    { id: 3, name: 'Real Me Legging',          ago: 'Last month',  price: '$45', pts: 394, reviewNudge: false },
  ],

  // ── Flywheel ──────────────────────────────────
  flywheelMoves: [
    { key: 'purchase',  label: 'Make a purchase',    desc: 'Every order earns points automatically',   icon: 'package',  pts: 15,  cta: 'Shop now',       done: true  },
    { key: 'refer',     label: 'Refer a friend',     desc: 'Worth ~$50 of spend in points',            icon: 'userPlus', pts: 100, cta: 'Share link',     done: true  },
    { key: 'review',    label: 'Write a review',     desc: 'Photo & video reviews earn even more',     icon: 'star',     pts: 25,  cta: 'Write review',   done: true  },
    { key: 'share',     label: 'Share a look',       desc: 'Tag the brand in a post or story',         icon: 'globe',    pts: 50,  cta: 'Create post',    done: false },
    { key: 'community', label: 'Help the community', desc: 'Answer a question, share a tip',           icon: 'users',    pts: 75,  cta: 'Open community', done: false },
  ],
  flywheelBonus: 300,

  // ── Feed: recommended challenges carousel ─────
  feedChallenges: [
    { emoji: '👖', gradient: 'linear-gradient(145deg,#dbe8ff,#a8c4f0,#6090d0)', title: 'Crossover Flare Leg Jean: Style It 3 Ways', type: 'Photo Post', time: '1h', level: 'Beginner', pts: 120 },
    { emoji: '🤍', gradient: 'linear-gradient(145deg,#f0e8ff,#d4b8f0,#9880c0)', title: 'Cloud Hoodie: Your Go-To Layer Look', type: 'Photo Post', time: '30m', level: 'Beginner', pts: 80 },
    { emoji: '✨', gradient: 'linear-gradient(145deg,#e8f4e8,#a8d8a8,#78b878)', title: 'AirFlex+ Slim Jean: 7-Day Wear Test', type: 'Video', time: '2h', level: 'Intermediate', pts: 200 },
  ],

  // ── Feed: community preview posts ─────────────
  feedPosts: [
    {
      body: 'Crossover Flare Leg Jean is everything right now — styled it 3 ways and every single one goes hard 👖✨',
    },
    {
      question: 'Do the AirFlex+ jeans stretch out after a few wears?',
      body: "Mine fit perfectly on day 1 but feel noticeably looser by day 3. Wondering if I should size down or if it's normal for this fabric?",
      reply: "Yes, totally normal — the AirFlex fabric relaxes with body heat. Size down and they'll feel perfect after the first wash. Same in the slim fit here.",
    },
  ],

  // ── Feed: loyalty mode product grid ───────────
  loyaltyProducts: [
    { name: 'Crossover Flare Leg Jean', price: '$85.00', desc: 'Bestseller' },
    { name: 'Cloud Hoodie',             price: '$65.00', desc: 'New arrival' },
    { name: 'Real Me Legging',          price: '$45.00', desc: 'Fan favourite' },
    { name: 'AirFlex+ Slim Jean',       price: '$59.00', desc: 'Top rated' },
  ],

  // ── Challenge detail (featured challenge) ─────
  challengeDetail: {
    title: 'Crossover Flare Leg Jean: Style It 3 Ways',
    body: 'Show off the Crossover Flare Leg Jean styled three different ways — casual, date night, and elevated basics. Capture the fit and versatility, and share via your affiliate link.',
    hashtag: '#AmericanEagle #AEStyle',
    steps: [
      'Show the Crossover Flare Leg Jean styled 3 different ways in one post or reel',
      'Highlight the fit, rise, and versatility — casual, date night, and elevated basics',
      'Share how you sized and why — this is the #1 question your audience will have',
      'Share your affiliate code and link',
      'Tag @americaneagle and include #AD #AmericanEagle #AEStyle',
    ],
  },

  // ── Challenges tab ────────────────────────────
  challenges: [
    { title: 'Crossover Flare Leg Jean: Style It 3 Ways', pts: 120, type: 'Photo Post', time: '1h',  level: 'Beginner',     emoji: '👖', bg: 'linear-gradient(145deg,#dbe8ff,#6090d0)' },
    { title: 'Cloud Hoodie: Cosy Season Campaign',        pts: 85,  type: 'Photo Post', time: '45m', level: 'Intermediate',  emoji: '🤍', bg: 'linear-gradient(145deg,#f0e8ff,#b498d8)' },
    { title: 'AirFlex+ Slim Jean: 7-Day Wear Test',       pts: 200, type: 'Video',      time: '2h',  level: 'Advanced',      emoji: '✨', bg: 'linear-gradient(145deg,#e8f4e8,#90c890)' },
    { title: 'Real Me Legging: Move With Me',             pts: 60,  type: 'Photo Post', time: '30m', level: 'Beginner',      emoji: '🏃', bg: 'linear-gradient(145deg,#fff4e0,#e8c870)' },
  ],

  // ── Community: brand spotlight (feed) ─────────
  brandSpotlight: {
    initial: 'C', name: 'Chloe Nakamura', tier: 'Gold',
    gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)', emoji: '🩷',
    body: 'Styled the Crossover Flare Jean three ways for the challenge — casual, date night, and elevated basics. AE denim does it all 👖✨',
    saves: 53,
    brandNote: 'Saved by the American Eagle team',
  },

  // ── Community: Inspiring tab posts ────────────
  communityPosts: [
    { initial: 'L', name: 'Lea Fontaine',   tier: 'Platinum', role: 'Guide', tenure: '2-year advocate', memberSince: 'April 2024',  time: '45m ago', tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#dbe8ff,#a8c4f0,#6090d0)', emoji: '👖', body: "The @americaneagle Crossover Flare Leg Jean is genuinely the best denim I've owned — styled it 3 ways for the challenge and every look landed 🩵👖", saves: 24, instagram: { handle: '@lea.fontaine',     followers: 48200  }, tiktok: { handle: '@leafontaine',         followers: 102000 }, achievements: [{ icon: 'award', label: 'Top Creator',       sub: '#2 this month'             }, { icon: 'flag',  label: 'Challenge Champion', sub: '12 challenges completed' }, { icon: 'users', label: 'Community Guide',   sub: 'Helped 5 members'        }] },
    { initial: 'S', name: 'Sofia Brennan',  tier: 'Gold',     role: null,    tenure: '1-year advocate', memberSince: 'May 2025',    time: '1h ago',  tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '🤍', body: 'Finally got the Cloud Hoodie and I am obsessed 🤍 The fabric is so soft and the oversized fit is perfect. Already ordered it in two colours.',                              saves: 18, instagram: { handle: '@sofia.brennan',    followers: 22400  }, tiktok: { handle: '@sofiabrennanstyIe',   followers: 31600  }, achievements: [{ icon: 'flag',  label: 'Challenge Streak',   sub: '5 challenges in a row'   }, { icon: 'award', label: 'Rising Star',        sub: 'Top 10 this month'       }] },
    { initial: 'M', name: 'Maya Osei',      tier: 'Silver',   role: null,    time: '2h ago',            tag: { icon: 'help', label: 'Question' },  photo: false, gradient: null, emoji: null, body: 'Has anyone sized down in the AirFlex+ jeans? Wondering if they stretch out after a few wears or stay true to size...',                                                       saves: 7,  instagram: { handle: '@maya.osei',        followers: 8900   }, tiktok: { handle: '@mayaosei_',           followers: 14500  }, achievements: [{ icon: 'flag',  label: 'First Challenge',    sub: '1 challenge completed'   }] },
    { initial: 'P', name: 'Priya Nair',     tier: 'Gold',     role: null,    tenure: '1-year advocate', memberSince: 'June 2025',   time: '3h ago',  tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌟', body: "Just finished the 7-day AirFlex+ wear test and honestly — these are the most comfortable jeans I've ever owned. The stretch is unreal 👖✨",                                saves: 31, instagram: { handle: '@priya.nair',       followers: 19600  }, tiktok: { handle: '@priyanairfashion',    followers: 44200  }, achievements: [{ icon: 'award', label: 'Rising Star',        sub: 'Top 10 this month'       }, { icon: 'flag',  label: 'Challenge Streak',   sub: '3 in a row'              }] },
    { initial: 'R', name: 'Rachel Kim',     tier: 'Silver',   role: null,    time: '3h ago',            tag: { icon: 'help', label: 'Question' },  photo: false, gradient: null, emoji: null, body: "Does anyone know if the Real Me Legging holds up for workouts? Worried about see-through fabric when squatting — worth sizing up?",                                          saves: 12, instagram: { handle: '@rachelkimstyle',  followers: 6200   }, tiktok: { handle: '@rachelkimfits',       followers: 9800   }, achievements: [{ icon: 'flag',  label: 'First Challenge',    sub: '1 challenge completed'   }] },
    { initial: 'I', name: 'Isla Thompson',  tier: 'Platinum', role: 'Guide', tenure: '2-year advocate', memberSince: 'March 2024',  time: '4h ago',  tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#dbe8ff,#a8c4f0,#6090d0)', emoji: '👖', body: 'Dream Jean in light wash — my go-to for every shoot this season. The rise and leg opening is just unmatched for styling 📸',                                               saves: 47, instagram: { handle: '@isla.thompson',    followers: 87400  }, tiktok: { handle: '@islathompson',        followers: 213000 }, achievements: [{ icon: 'award', label: 'Top Creator',       sub: '#1 this month'             }, { icon: 'flag',  label: 'Challenge Champion', sub: '18 challenges completed' }, { icon: 'users', label: 'Community Guide',   sub: 'Helped 12 members'       }] },
    { initial: 'A', name: 'Amara Diallo',   tier: 'Gold',     role: null,    tenure: '1-year advocate', memberSince: 'August 2025', time: '5h ago',  tag: { icon: 'help', label: 'Question' },  photo: false, gradient: null, emoji: null, body: "What's the best way to wash the Cloud Hoodie without losing the softness? Washing on cold but feel like it's getting a bit rough...",                                saves: 9,  instagram: { handle: '@amara.diallo',     followers: 11300  }, tiktok: { handle: '@amaradiallo_',        followers: 18700  }, achievements: [{ icon: 'flag',  label: 'Challenge Streak',   sub: '4 in a row'              }] },
    { initial: 'C', name: 'Chloe Nakamura', tier: 'Gold',     role: null,    tenure: '1-year advocate', memberSince: 'July 2025',   time: '6h ago',  tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)', emoji: '🩷', body: 'Date night look done ✅ Crossover Flare Jean + going out top from AE and I am OBSESSED. This fit is everything 💫',                                                        saves: 53, instagram: { handle: '@chloe.nakamura',   followers: 34100  }, tiktok: { handle: '@chloenkstyle',        followers: 67800  }, achievements: [{ icon: 'award', label: 'Rising Star',        sub: 'Top 5 this month'        }, { icon: 'flag',  label: 'Challenge Streak',   sub: '6 in a row'              }] },
    { initial: 'N', name: 'Nina Reeves',    tier: 'Silver',   role: null,    time: '7h ago',            tag: { icon: 'help', label: 'Question' },  photo: false, gradient: null, emoji: null, body: "Is the AirFlex+ Slim or the Dream Slim better for longer legs? Keep going back and forth and can't decide before I complete the challenge 😅",                               saves: 5,  instagram: { handle: '@nina.reeves',      followers: 4400   }, tiktok: { handle: '@ninareevestyle',      followers: 7100   }, achievements: [{ icon: 'flag',  label: 'First Challenge',    sub: '1 challenge completed'   }] },
  ],

  // ── Community: Following tab posts ────────────
  followingPosts: [
    { initial: 'T', name: 'Tara Williams', tier: 'Platinum', tenure: '2-year advocate', time: '12m ago', tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#dbe8ff,#a8c4f0,#6090d0)', emoji: '👖', body: 'These Crossover Flare Leg Jeans are everything — the fit is unreal for an everyday look 🌸', saves: 19 },
    { initial: 'J', name: 'Jade Parker',   tier: 'Gold',     tenure: '1-year advocate', time: '34m ago', tag: { icon: 'help', label: 'Question'  }, photo: false, gradient: null, emoji: null, body: 'Has anyone tried the Cloud Hoodie in both regular and oversized fit? Wondering which one photographs better for content...', saves: 8 },
    { initial: 'D', name: 'Daniela Cruz',  tier: 'Gold',     tenure: '1-year advocate', time: '2h ago',  tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '✨', body: "Day 3 of the AirFlex+ wear test and these jeans are genuinely the most comfortable denim I've ever worn. Shocked 👖✨", saves: 26 },
    { initial: 'H', name: 'Hannah Scott',  tier: 'Silver',   time: '3h ago',             tag: { icon: 'flag', label: 'Challenge' }, photo: true,  gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#fbcfe8)', emoji: '🌸', body: 'Graduation outfit done ✅ Wore the full AE look and I am absolutely obsessed. The Crossover Flare was the perfect choice 💫', saves: 41 },
  ],

  // ── Community: loyalty mode brand posts ───────
  loyaltyBrandPosts: [
    { gradient: 'linear-gradient(145deg,#dbe8ff,#a8c4f0,#6090d0)', caption: 'Introducing the new Crossover Flare Leg Jean. The fit that works for everyone.' },
    { gradient: 'linear-gradient(145deg,#f0e8ff,#d4b8f0,#9880c0)', caption: 'Cloud Hoodie: your go-to layer, all season long.' },
    { gradient: 'linear-gradient(145deg,#e8f4e8,#a8d8a8,#78b878)', caption: "AirFlex+ Denim — the most comfortable jeans we've ever made." },
    { gradient: 'linear-gradient(145deg,#fff4e0,#fde68a,#f59e0b)', caption: 'The Edit: our most-loved styles of the season, curated for you.' },
  ],

  // ── Community: trending themes ─────────────────
  communityThemes: {
    'Date Night':    { desc: 'Advocate-approved fits for your next evening out', posts: [
      { gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#fbcfe8)', emoji: '🌙', name: 'Sofia Brennan', saves: 34 },
      { gradient: 'linear-gradient(135deg,#f0e8ff,#e9d5ff,#c4b5fd)', emoji: '✨', name: 'Isla Thompson', saves: 28 },
      { gradient: 'linear-gradient(135deg,#fff7ed,#fed7aa,#fdba74)', emoji: '🌟', name: 'Tara Williams', saves: 19 },
      { gradient: 'linear-gradient(135deg,#f0fdf4,#bbf7d0,#86efac)', emoji: '💫', name: 'Lea Fontaine',  saves: 41 },
    ]},
    'Off-Duty Looks': { desc: 'Easy, effortless style from the community', posts: [
      { gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌿', name: 'Priya Nair',   saves: 22 },
      { gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#fcd34d)', emoji: '☀️', name: 'Maya Osei',    saves: 17 },
      { gradient: 'linear-gradient(135deg,#f0fdf4,#bbf7d0,#86efac)', emoji: '🍃', name: 'Amara Diallo', saves: 31 },
      { gradient: 'linear-gradient(135deg,#faeae4,#fdd5c8,#fbb09a)', emoji: '✨', name: 'Rachel Kim',   saves: 14 },
    ]},
    'Going Out Fits': { desc: 'Show-stopping looks from our top advocates', posts: [
      { gradient: 'linear-gradient(135deg,#ede9fe,#ddd6fe,#a78bfa)', emoji: '💜', name: 'Lea Fontaine',    saves: 48 },
      { gradient: 'linear-gradient(135deg,#ffe4e6,#fecdd3,#fb7185)', emoji: '🔥', name: 'Chloe Nakamura', saves: 37 },
      { gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#f59e0b)', emoji: '✨', name: 'Isla Thompson',   saves: 52 },
      { gradient: 'linear-gradient(135deg,#dbe8ff,#a8c4f0,#6090d0)', emoji: '👖', name: 'Sofia Brennan',  saves: 29 },
    ]},
    'Summer Denim':   { desc: 'Sun-ready denim and shorts from the community', posts: [
      { gradient: 'linear-gradient(135deg,#fff7ed,#fed7aa,#fb923c)', emoji: '🌞', name: 'Priya Nair',   saves: 26 },
      { gradient: 'linear-gradient(135deg,#ecfeff,#a5f3fc,#22d3ee)', emoji: '🌊', name: 'Nina Reeves',  saves: 18 },
      { gradient: 'linear-gradient(135deg,#fef9c3,#fef08a,#facc15)', emoji: '🌻', name: 'Tara Williams', saves: 33 },
      { gradient: 'linear-gradient(135deg,#f0fdf4,#bbf7d0,#4ade80)', emoji: '🍉', name: 'Maya Osei',    saves: 21 },
    ]},
    Streaks:          { desc: 'Advocates on an active posting streak right now', posts: [
      { gradient: 'linear-gradient(135deg,#fff7ed,#fed7aa,#fb923c)', emoji: '🔥', name: 'Chloe Nakamura', streakDays: 21 },
      { gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#f59e0b)', emoji: '✨', name: 'Isla Thompson',  streakDays: 14 },
      { gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌟', name: 'Priya Nair',    streakDays: 9  },
      { gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '💫', name: 'Lea Fontaine',  streakDays: 7  },
    ]},
  },

  // ── Profile: similar posts ─────────────────────
  similarPosts: [
    { gradient: 'linear-gradient(135deg,#dbe8ff,#a8c4f0,#6090d0)', emoji: '👖', body: 'My everyday OOTD ft. American Eagle Crossover Flare', saves: 14 },
    { gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '🤍', body: 'Cloud Hoodie 3 ways — casual to elevated',            saves: 9  },
    { gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#f59e0b)', emoji: '💫', body: 'AirFlex+ jeans — worth the hype?',                    saves: 21 },
    { gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)', emoji: '🩷', body: 'Full AE denim lineup — every wash reviewed',          saves: 6  },
    { gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌟', body: 'Real Me Legging 7-day wear test results',             saves: 33 },
    { gradient: 'linear-gradient(135deg,#fff7ed,#fed7aa,#fb923c)', emoji: '🌞', body: 'Summer outfit ft. AE Denim Shorts + Graphic Tee',     saves: 18 },
    { gradient: 'linear-gradient(135deg,#ede9fe,#ddd6fe,#a78bfa)', emoji: '💜', body: 'Going out fit using only American Eagle pieces',      saves: 27 },
    { gradient: 'linear-gradient(135deg,#ecfeff,#a5f3fc,#22d3ee)', emoji: '💙', body: 'Day to night: Dream Jean styled 2 ways',              saves: 11 },
  ],

  // ── Studio: challenge creation suggestions ──────
  studioSuggestions: {
    festival: [
      { title: 'Festival-Proof Fit',    desc: "Show us the American Eagle outfit that survives sun, sweat, and the second stage.", caption: "festival-proof fit 🌵\nthis look survived 12 hours at coachella — the heat, the crowds, the dust, all of it.\n\n🟠 American Eagle AirFlex+ Jeans — didn't crease once\n🟠 AE Vintage Tee — before AND after, still going" },
      { title: 'Gates to Headliner',    desc: "One outfit. All day. The AE look that goes the distance.",                          caption: "from gates to headliner ✨\none American Eagle outfit. all day. no changes. here's my festival formula:\n\n🟠 AirFlex+ Jeans — move all day, look good doing it\n🟠 AE Graphic Tee — the one that goes with everything" },
      { title: 'Festival Fit, Your Way',desc: "Your festival, your rules. An American Eagle-powered look made for the moment.",    caption: "festival fit, my way 🎪\nyour rules, your look. here's how I built mine with American Eagle:\n\n🟠 Crossover Flare Jean — the crowd favourite\n🟠 AE Cropped Hoodie — for when it gets cool" },
      { title: 'Your Festival Look',    desc: "Walk us through the American Eagle pieces behind your perfect festival outfit.",     caption: "the American Eagle pieces that made my festival look 🎵\nwalk-through incoming. every item, every choice." },
    ],
    tops: [
      { title: 'Morning OOTD',   desc: "Share your step-by-step American Eagle getting-dressed routine with your community.",  caption: "my morning OOTD with American Eagle ☀️\nnon-negotiables only. here's what I always reach for:\n\n🟠 Cloud Hoodie — on before I'm even awake\n🟠 AirFlex+ Jeans — the only bottoms I wear on lazy days" },
      { title: 'Before & After', desc: "Capture the transformation. Show how styling changes the fit.",                        caption: "before → after 🤍\nthis is what the right American Eagle fit does. no filter, no edits." },
      { title: 'Night Mode',     desc: "Your going-out look — what American Eagle pieces are non-negotiable?",                 caption: "night mode activated 🌙\nmy going-out formula with American Eagle. the pieces I'd keep if I could only keep three." },
      { title: 'Style School',   desc: "Teach your community your styling secrets, American Eagle style.",                     caption: "style school is in session 📖\nhere's everything I wish I'd known sooner about building an American Eagle wardrobe." },
    ],
    outfit: [
      { title: 'Your Signature Style', desc: "The American Eagle pieces that define your personal style.",                  caption: "my signature style 🖤\nthese are the American Eagle pieces I reach for on repeat. here's why." },
      { title: 'GRWM: My Way',         desc: "A full get-ready-with-me featuring your go-to American Eagle pieces.",         caption: "get ready with me ✨\nfull GRWM from pyjamas to out-the-door, American Eagle only." },
      { title: 'Mood Board',           desc: "Build a mood board. Show how you style one piece different ways.",             caption: "one piece, three ways 🎨\nI styled my American Eagle fave completely differently each time and this is what happened." },
      { title: 'Day to Night',         desc: "One American Eagle outfit, styled for day and night.",                         caption: "day to night with American Eagle 🌅\nsame pieces, completely different energy. here's the transition." },
    ],
    tutorial: [
      { title: 'Beauty 101',      desc: "Break it down for beginners. Your American Eagle tutorial, step by step.",   caption: "American Eagle beauty 101 📚\nstarting from zero? this is everything you need to know. one step at a time." },
      { title: 'Pro Tips',        desc: "Share the tricks that took your makeup to the next level.",                   caption: "the American Eagle techniques that changed everything for me 💡\nhonest breakdown of what actually works." },
      { title: 'The Magic Trick', desc: "That one American Eagle technique that changed everything for you.",           caption: "one trick. big difference. ✨\nI've been doing this with my American Eagle products for 6 months and the results speak." },
      { title: 'From Scratch',    desc: "A full face, explained. Walk us through every product.",                      caption: "full face from scratch 🧴\nI'm explaining every single product and why it earns a place in my routine." },
    ],
    denim: [
      { title: 'The Denim Edit',    desc: "Your favourite American Eagle jean and the story behind it.",            caption: "the denim edit 👖\nthis pair does something to me. here's the full look and why it's stayed in my rotation." },
      { title: 'Denim Library',     desc: "Try, compare, review. Your ultimate American Eagle denim roundup.",      caption: "my American Eagle denim library 👖\nevery style I've tried, reviewed honestly. your guide to finding yours." },
      { title: 'One Jean, All Day', desc: "Put your American Eagle denim to the test — morning to night.",          caption: "one American Eagle jean from 7am to midnight ⏱\nno changes. just results. here's how it held up." },
      { title: 'Find Your Fit',     desc: "Find the perfect American Eagle denim cut for every mood and occasion.", caption: "finding your American Eagle denim match 🎯\nI tried 4 cuts. here's which one belongs in your wardrobe." },
    ],
    default: [
      { title: 'My American Eagle Edit',  desc: "Curate your go-to American Eagle products and show us why they earn a place in your bag.", caption: "my American Eagle edit ✨\nthe products that genuinely changed my routine. no filler, no fluff." },
      { title: 'First Impressions',        desc: "Review an American Eagle product you've never tried before. Honest, real, yours.",          caption: "first impressions: American Eagle 💬\ni've never used this before. here's my completely honest take." },
      { title: 'One Product, Many Ways',   desc: "Pick your favourite American Eagle product and show us every way you use it.",               caption: "one American Eagle product. five different ways. 🔄\nversatility test — and the results surprised me." },
      { title: 'Why I Create',             desc: "The story behind your content. What inspires you to show up and share?",                    caption: "why I create 💛\nthis is the reason I keep showing up. and why American Eagle is always part of the story." },
    ],
  },
}

const BC = BRAND_CONTENT

// Aliases — keep existing usages working without changes
const BRAND = BC.name
const BRAND_HANDLE = BC.handle
const BRAND_LOGO = BC.logo
const FLYWHEEL_MOVES = BC.flywheelMoves
const FLYWHEEL_BONUS = BC.flywheelBonus
const ORDERS = BC.orders
const BRAND_SPOTLIGHT = BC.brandSpotlight
const SIMILAR_POSTS_DATA = BC.similarPosts

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

const BTN = {
  radius: 9999,
  height: 52,
  bg: C.text,
  color: C.white,
  fontSize: 15,
}

const fw = (w) => ({ fontWeight: w })

const TRANSITION_DIR = 1  // 1 = right-to-left on every screen change; -1 = left-to-right

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%' }),
}
const spring = { type: 'spring', stiffness: 300, damping: 30 }
const slowSpring = { type: 'spring', stiffness: 150, damping: 28 }

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
    scissors: <><circle cx="6" cy="6" r="3" {...s}/><circle cx="6" cy="18" r="3" {...s}/><line x1="20" y1="4" x2="8.12" y2="15.88" {...s}/><line x1="14.47" y1="14.48" x2="20" y2="20" {...s}/><line x1="8.12" y1="8.12" x2="12" y2="12" {...s}/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" {...s}/><polyline points="22,4 12,13 2,4" {...s}/></>,
    video: <><polygon points="23,7 16,12 23,17" {...s}/><rect x="1" y="5" width="15" height="14" rx="2" {...s}/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" {...s}/><polyline points="12,19 5,12 12,5" {...s}/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" {...s}/><polyline points="12,5 19,12 12,19" {...s}/></>,
    arrowDown:  <><line x1="12" y1="5" x2="12" y2="19" {...s}/><polyline points="5,12 12,19 19,12" {...s}/></>,
    archive: <><polyline points="21,8 21,21 3,21 3,8" {...s}/><rect x="1" y="3" width="22" height="5" {...s}/><line x1="10" y1="12" x2="14" y2="12" {...s}/></>,
    trash: <><polyline points="3,6 5,6 21,6" {...s}/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" {...s}/></>,
    moreVert: <><circle cx="12" cy="5" r="1.2" fill={color}/><circle cx="12" cy="12" r="1.2" fill={color}/><circle cx="12" cy="19" r="1.2" fill={color}/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" {...s}/>,
    heartFilled: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={color}/>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" {...s}/>,
    bookmarkFilled: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={color}/>,
    messageSquare: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...s}/>,
    check: <polyline points="20,6 9,17 4,12" {...s}/>,
    chevronDown: <polyline points="6,9 12,15 18,9" {...s}/>,
    package: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" {...s}/><polyline points="3.27,6.96 12,12.01 20.73,6.96" {...s}/><line x1="12" y1="22.08" x2="12" y2="12" {...s}/></>,
    clock: <><circle cx="12" cy="12" r="10" {...s}/><polyline points="12,6 12,12 16,14" {...s}/></>,
    help: <><circle cx="12" cy="12" r="10" {...s}/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" {...s}/><line x1="12" y1="17" x2="12.01" y2="17" {...s}/></>,
    replyIcon: <><polyline points="9,17 4,12 9,7" {...s}/><path d="M20 18v-2a4 4 0 00-4-4H4" {...s}/></>,
    search: <><circle cx="11" cy="11" r="8" {...s}/><line x1="21" y1="21" x2="16.65" y2="16.65" {...s}/></>,
    award: <><circle cx="12" cy="8" r="7" {...s}/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" {...s}/></>,
    gift: <><polyline points="20,12 20,22 4,22 4,12" {...s}/><rect x="2" y="7" width="20" height="5" {...s}/><line x1="12" y1="22" x2="12" y2="7" {...s}/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" {...s}/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" {...s}/></>,
    pencilRuler: <><path d="m15 5 4 4" {...s}/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" {...s}/><path d="m8 6 2-2" {...s}/><path d="m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z" {...s}/><path d="m18 16 2-2" {...s}/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" {...s}/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14" {...s}/><line x1="4" y1="10" x2="4" y2="3" {...s}/><line x1="12" y1="21" x2="12" y2="12" {...s}/><line x1="12" y1="8" x2="12" y2="3" {...s}/><line x1="20" y1="21" x2="20" y2="16" {...s}/><line x1="20" y1="12" x2="20" y2="3" {...s}/><line x1="1" y1="14" x2="7" y2="14" {...s}/><line x1="9" y1="8" x2="15" y2="8" {...s}/><line x1="17" y1="16" x2="23" y2="16" {...s}/></>,
    person:    <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" {...s}/><circle cx="12" cy="7" r="4" {...s}/></>,
    userPlus:  <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" {...s}/><circle cx="12" cy="7" r="4" {...s}/><line x1="19" y1="8" x2="19" y2="14" {...s}/><line x1="22" y1="11" x2="16" y2="11" {...s}/></>,
    userCheck: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...s}/><circle cx="9" cy="7" r="4" {...s}/><polyline points="16,11 18,13 22,9" {...s}/></>,
    listLines: <><line x1="3" y1="6" x2="21" y2="6" {...s}/><line x1="3" y1="12" x2="21" y2="12" {...s}/><line x1="3" y1="18" x2="21" y2="18" {...s}/></>,
    grid4:     <><rect x="3" y="3" width="7" height="7" rx="1" {...s}/><rect x="14" y="3" width="7" height="7" rx="1" {...s}/><rect x="3" y="14" width="7" height="7" rx="1" {...s}/><rect x="14" y="14" width="7" height="7" rx="1" {...s}/></>,
    globe:     <><circle cx="12" cy="12" r="10" {...s}/><line x1="2" y1="12" x2="22" y2="12" {...s}/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" {...s}/></>,
    link:      <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...s}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s}/></>,
    unlink:    <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...s}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s}/><line x1="2" y1="2" x2="22" y2="22" {...s}/></>,
    wallet:    <><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" {...s}/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" {...s}/><path d="M18 12a2 2 0 0 0 0 4h4v-4z" {...s}/></>,
    music:     <><path d="M9 18V5l12-2v13" {...s}/><circle cx="6" cy="18" r="3" {...s}/><circle cx="18" cy="16" r="3" {...s}/></>,
    flame:     <path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-3 3-1 0-2-1-2-2 0-1 1-2 2-3z" {...s}/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" {...s}/><circle cx="12" cy="12" r="4" {...s}/><circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none"/></>,
    tiktok:    <><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" {...s}/></>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2" {...s}/><path d="M7 11V7a5 5 0 0 1 10 0v4" {...s}/></>,
    crown:     <><path d="M2 17h20" {...s}/><path d="M4 17L2 6l5.5 4L12 2l4.5 8L22 6l-2 11H4z" {...s}/></>,
    copy:      <><rect x="9" y="9" width="13" height="13" rx="2" {...s}/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" {...s}/></>,
    chevronRight: <polyline points="9,18 15,12 9,6" {...s}/>,
    chevronLeft:  <polyline points="15,18 9,12 15,6" {...s}/>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
      {paths[name] || null}
    </svg>
  )
}

// ── SHARED COMPONENTS ─────────────────────────────────

function Avatar({ initial = '?', size = 32, showIndicator = false, photo = null }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
      {photo
        ? <img src={photo} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        : <span style={{ ...fw(900), fontSize: size * 0.38, color: C.text, lineHeight: 1 }}>{initial}</span>
      }
      {showIndicator && <div style={{ position: 'absolute', top: -1, right: -1, width: Math.max(8, size * 0.28), height: Math.max(8, size * 0.28), background: C.lime, borderRadius: '50%', border: '2px solid white', zIndex: 1 }} />}
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
      style={{ width: '100%', height: BTN.height, borderRadius: BTN.radius, border: `1px solid ${disabled ? 'rgba(66,66,66,0.1)' : BTN.bg}`, background: disabled ? 'rgba(66,66,66,0.06)' : BTN.bg, color: disabled ? 'rgba(66,66,66,0.3)' : BTN.color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'default' : 'pointer', ...fw(700), fontSize: BTN.fontSize, userSelect: 'none' }}
    >
      {children}
    </motion.button>
  )
}

function IconButton({ icon, size = 32, onClick, color = C.textBody }) {
  return (
    <motion.button whileTap={{ scale: 0.88 }} onClick={onClick} style={{ width: size, height: size, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name={icon} size={size * 0.6} color={color} />
    </motion.button>
  )
}

// Shared top nav — used by Feed, Challenges, Community, Progress
function TopNav({ onMenuOpen, onWalletOpen }) {
  return (
    <div style={{ height: 63, background: C.white, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <IconButton icon="menu" size={32} onClick={onMenuOpen} />
        <span style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>{BRAND}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.92 }} onClick={onWalletOpen} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(66,66,66,0.09)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '0 8px', height: 24, cursor: 'pointer' }}>
          <Icon name="star" size={13} color={C.textBody} />
          <span style={{ ...fw(700), fontSize: 12, color: C.text }}>1,234</span>
        </motion.button>
        <IconButton icon="store" size={28} />
        <IconButton icon="bell" size={28} />
      </div>
    </div>
  )
}

// Studio nav — avatar instead of burger/brand
function StudioNav({ photo }) {
  return (
    <div style={{ height: 63, background: C.white, borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
      <Avatar initial="Z" size={32} showIndicator photo={photo} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.92 }} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(66,66,66,0.09)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '0 8px', height: 24, cursor: 'pointer' }}>
          <Icon name="star" size={13} color={C.textBody} />
          <span style={{ ...fw(700), fontSize: 12, color: C.text }}>1,234</span>
        </motion.button>
        <IconButton icon="store" size={28} />
        <IconButton icon="bell" size={28} />
      </div>
    </div>
  )
}

// ── SCREENS 1–3 ───────────────────────────────────────

function EmailScreen({ onNext }) {
  const [email, setEmail] = useState('')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const ssoOptions = [
    { label: 'Continue with Google', icon: <GoogleIcon /> },
    { label: 'Continue with TikTok', icon: <TikTokIcon /> },
    { label: 'Continue with Meta',   icon: <MetaIcon /> },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <SignupLogoArea top={48} />
      <div style={{ position: 'absolute', top: 192, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', marginBottom: 8, textAlign: 'center' }}>Welcome back!</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 32, textAlign: 'center' }}>Choose how you'd like to log in.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {ssoOptions.map(({ label, icon }) => (
            <motion.button key={label} whileTap={{ scale: 0.97 }} onClick={() => onNext('')}
              style={{ width: '100%', height: BTN.height, border: `1px solid ${C.border}`, borderRadius: BTN.radius, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', ...fw(600), fontSize: BTN.fontSize, color: C.text }}>
              {icon}
              {label}
            </motion.button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>or</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
          onKeyDown={e => e.key === 'Enter' && valid && onNext(email)}
          style={{ width: '100%', height: BTN.height, borderRadius: BTN.radius, border: `1px solid ${email ? C.text : C.border}`, padding: '0 16px', ...fw(400), fontSize: BTN.fontSize, color: C.text, background: C.white, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', marginBottom: 12 }} />
        <PrimaryButton onClick={() => valid && onNext(email)} disabled={!valid}>Continue with email</PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function InboxScreen({ email, onNext }) {
  const [state, setState] = useState('idle')
  const handleResend = () => { setState('sent'); setTimeout(() => setState('idle'), 2500) }
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 358, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="mail" size={22} color={C.textBody} />
        </motion.div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px' }}>Check your inbox</p>
          <p style={{ ...fw(400), fontSize: 16, color: C.textSecondary, lineHeight: '24px' }}>Click the link we sent to <span style={{ ...fw(700), color: C.text }}>{email || 'your email'}</span> to log in. The link will expire in 30 minutes.</p>
        </div>
        <PrimaryButton onClick={handleResend}>{state === 'sent' ? '✓ Link sent!' : "Didn't receive it? Send again"}</PrimaryButton>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onNext} style={{ background: 'none', border: 'none', cursor: 'pointer', ...fw(500), fontSize: 14, color: C.textMuted, textDecoration: 'underline', padding: '8px 0' }}>Open email app →</motion.button>
      </div>
    </div>
  )
}

function EmailClientScreen({ onNext }) {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <IconButton icon="arrowLeft" size={36} color={C.textBody} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {['archive', 'mail', 'trash', 'moreVert'].map(ic => <IconButton key={ic} icon={ic} size={32} color={C.textBody} />)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <p style={{ ...fw(700), fontSize: 16, color: C.text, lineHeight: '22px', flex: 1 }}>{`Your magic link from ${BRAND} × Duel`}</p>
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
            <p style={{ ...fw(700), fontSize: 18, color: C.text, textAlign: 'center', lineHeight: '26px', marginBottom: 8 }}>You're one tap away</p>
            <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, textAlign: 'center', lineHeight: '20px', marginBottom: 24 }}>{`Tap the button below to log in to your ${BRAND} advocate account.`}</p>
            <motion.button whileTap={{ scale: 0.96 }} onClick={onNext} style={{ width: '100%', height: BTN.height, background: BTN.bg, color: BTN.color, border: 'none', borderRadius: BTN.radius, cursor: 'pointer', ...fw(700), fontSize: BTN.fontSize, marginBottom: 20 }}>Log in to Duel →</motion.button>
            <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: '18px' }}>This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.</p>
          </div>
          <p style={{ ...fw(400), fontSize: 12, color: C.textPlaceholder, textAlign: 'center' }}>© 2025 Duel · <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span></p>
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

// ── SCREEN 4 TABS ─────────────────────────────────────

const TABS_BY_MODE = {
  advocate: [
    { id: 'feed',       icon: 'house',       label: 'Feed'       },
    { id: 'challenges', icon: 'flag',         label: 'Challenges' },
    { id: 'community',  icon: 'users',        label: 'Community'  },
    { id: 'studio',     icon: 'pencilRuler',  label: 'Studio'     },
    { id: 'progress',   icon: 'chart',        label: 'Progress'   },
  ],
  loyalty: [
    { id: 'feed',    icon: 'house',    label: 'Feed'    },
    { id: 'rewards', icon: 'gift',     label: 'Rewards' },
    { id: 'account', icon: 'person',   label: 'Account' },
  ],
  employee: [
    { id: 'feed',       icon: 'house',       label: 'Feed'       },
    { id: 'challenges', icon: 'flag',         label: 'Challenges' },
    { id: 'community',  icon: 'users',        label: 'Community'  },
    { id: 'studio',     icon: 'pencilRuler',  label: 'Studio'     },
    { id: 'progress',   icon: 'chart',        label: 'Progress'   },
  ],
}

// ── TAB: FEED ─────────────────────────────────────────

function FlywheelGraphic({ size = 88, countLabel }) {
  const half = size / 2
  const ro = size * 0.409, ctrlR = ro * 0.52, maskR = size * 0.25
  const rad = d => d * Math.PI / 180
  const px = (r, deg) => (half + r * Math.cos(rad(deg - 90))).toFixed(2)
  const py = (r, deg) => (half + r * Math.sin(rad(deg - 90))).toFixed(2)
  const bladePath = (base) => {
    const a1 = base + 8, a2 = base + 65
    return `M ${half} ${half} Q ${px(ctrlR, base - 22)} ${py(ctrlR, base - 22)} ${px(ro, a1)} ${py(ro, a1)} A ${ro} ${ro} 0 0 1 ${px(ro, a2)} ${py(ro, a2)} Q ${px(ctrlR, base + 82)} ${py(ctrlR, base + 82)} ${half} ${half} Z`
  }
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {FLYWHEEL_MOVES.map((m, i) => (
          <path key={m.key} d={bladePath(i * 72)} fill={m.done ? C.text : 'rgba(66,66,66,0.1)'} />
        ))}
        <circle cx={half} cy={half} r={maskR} fill={C.white} />
      </svg>
      {countLabel && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <span style={{ ...fw(700), fontSize: size * 0.2, color: C.text, lineHeight: 1 }}>{countLabel.count}</span>
          <span style={{ ...fw(400), fontSize: size * 0.115, color: C.textMuted }}>of 5</span>
        </div>
      )}
    </div>
  )
}


function FlywheelSheet({ onClose }) {
  const completedCount = FLYWHEEL_MOVES.filter(m => m.done).length
  const openMoves = FLYWHEEL_MOVES.filter(m => !m.done)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(0,0,0,0.35)' }}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', padding: '20px 16px 40px', maxHeight: '88%', overflowY: 'auto' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
        <p style={{ ...fw(500), fontSize: 11, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Monthly flywheel</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {FLYWHEEL_MOVES.map((m, i) => {
            const featured = !m.done && openMoves[0]?.key === m.key
            const bg = m.done ? C.cardBg : featured ? C.text : C.white
            const textCol = m.done ? C.textMuted : featured ? C.white : C.text
            const subCol = m.done ? C.textMuted : featured ? 'rgba(255,255,255,0.6)' : C.textMuted
            const iconBg = m.done ? 'rgba(66,66,66,0.1)' : featured ? 'rgba(255,255,255,0.12)' : C.cardBg
            const iconCol = m.done ? C.textMuted : featured ? C.white : C.textBody
            return (
              <motion.button key={m.key} whileTap={{ scale: 0.98 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 14px', borderRadius: 16, border: m.done ? 'none' : featured ? 'none' : `1px solid ${C.border}`, background: bg, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {m.done
                    ? <Icon name="check" size={16} color={iconCol} strokeWidth={2.5} />
                    : <Icon name={m.icon} size={18} color={iconCol} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...fw(700), fontSize: 15, color: textCol, marginBottom: 2 }}>{m.label}</p>
                  <p style={{ ...fw(400), fontSize: 12, color: subCol, lineHeight: '16px' }}>{m.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ ...fw(700), fontSize: 15, color: m.done ? C.textMuted : featured ? C.white : C.text, marginBottom: 3 }}>+{m.pts} pts</p>
                  {!m.done && (
                    <p style={{ ...fw(600), fontSize: 12, color: featured ? 'rgba(255,255,255,0.7)' : C.textMuted }}>{m.cta} ↗</p>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
        <div style={{ padding: '11px 14px', background: C.cardBg, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {openMoves.length > 0
            ? <><span style={{ ...fw(400), fontSize: 13, color: C.textBody }}>Complete all 5 for a bonus</span><span style={{ ...fw(700), fontSize: 14, color: C.text }}>+{FLYWHEEL_BONUS} pts</span></>
            : <><Icon name="check" size={14} color={C.text} strokeWidth={2.5} /><span style={{ ...fw(600), fontSize: 13, color: C.text }}>Loop complete · +{FLYWHEEL_BONUS} pts earned</span></>
          }
        </div>
      </motion.div>
    </motion.div>
  )
}

function FlywheelSection({ onOpen }) {
  const completedCount = FLYWHEEL_MOVES.filter(m => m.done).length
  const openMoves = FLYWHEEL_MOVES.filter(m => !m.done)
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onOpen}
      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, background: C.white, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ ...fw(700), fontSize: 15, color: C.text }}>Monthly flywheel</p>
        <Icon name="chevronRight" size={16} color={C.textMuted} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <FlywheelGraphic size={88} countLabel={{ count: completedCount }} />
      </div>
      <div style={{ padding: '10px 14px', background: C.cardBg, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {openMoves.length > 0
          ? <><span style={{ ...fw(400), fontSize: 13, color: C.textBody }}>Complete all 5 for a bonus</span><span style={{ ...fw(700), fontSize: 14, color: C.text }}>+{FLYWHEEL_BONUS} pts</span></>
          : <><Icon name="check" size={14} color={C.text} strokeWidth={2.5} /><span style={{ ...fw(600), fontSize: 13, color: C.text }}>Loop complete · +{FLYWHEEL_BONUS} pts earned</span></>
        }
      </div>
    </motion.button>
  )
}

function FeedTab({ onMenuOpen, onWalletOpen, photo, userPost, onTabChange, onFlywheelOpen, mode = 'advocate' }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [threadOpen, setThreadOpen] = useState(false)
  const [hearted, setHearted] = useState(false)
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [challengeDir, setChallengeDir] = useState(1)

  if (mode === 'loyalty') {
    const loyaltyProducts = BC.loyaltyProducts
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: `1px solid ${C.borderLight}` }}>
          <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
        </div>
        <div style={{ padding: '20px 16px 32px' }}>
          <p style={{ ...fw(400), fontSize: 18, color: C.text, lineHeight: '24px', marginBottom: 4 }}>Hi Lea!</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, marginBottom: 24 }}>Recommended for you</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {loyaltyProducts.map((p, i) => (
              <motion.div key={i} whileTap={{ scale: 0.97 }} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: C.white }}>
                <div style={{ height: 100, background: C.cardBg, borderRadius: '8px 8px 0 0' }} />
                <div style={{ padding: '10px 10px 12px' }}>
                  <p style={{ ...fw(600), fontSize: 13, color: C.text, lineHeight: '18px', marginBottom: 3 }}>{p.name}</p>
                  <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, marginBottom: 6 }}>{p.desc}</p>
                  <p style={{ ...fw(600), fontSize: 13, color: C.text }}>{p.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: `1px solid ${C.borderLight}` }}>
        <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
      </div>

      <div style={{ padding: '20px 16px 32px' }}>
        <p style={{ ...fw(700), fontSize: 18, color: C.text, lineHeight: '24px', marginBottom: 4 }}>Hi Zara!</p>
        <p style={{ ...fw(500), fontSize: 14, color: C.textSecondary, marginBottom: 24 }}>Try a recommended challenge</p>

        {(() => {
          const challenges = BC.feedChallenges
          const c = challenges[challengeIndex]
          const remaining = challenges.length - challengeIndex - 1
          return (
            <div style={{ position: 'relative', marginBottom: 24, paddingTop: 12 }}>
              {remaining >= 2 && <div style={{ position: 'absolute', top: 0, bottom: 0, left: 18, right: 18, background: C.cardBg, borderRadius: 12, border: `1px solid ${C.border}` }} />}
              {remaining >= 1 && <div style={{ position: 'absolute', top: 6, bottom: 0, left: 9, right: 9, background: 'rgba(240,240,240,0.9)', borderRadius: 12, border: `1px solid ${C.border}` }} />}
              <AnimatePresence mode="popLayout" custom={challengeDir}>
                <motion.div
                  key={challengeIndex}
                  custom={challengeDir}
                  initial={{ opacity: 0, x: challengeDir * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: challengeDir * -50 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 && challengeIndex < challenges.length - 1) { setChallengeDir(1); setChallengeIndex(i => i + 1) }
                    else if (info.offset.x > 60 && challengeIndex > 0) { setChallengeDir(-1); setChallengeIndex(i => i - 1) }
                  }}
                  style={{ position: 'relative', zIndex: 1, background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: 'hidden', cursor: 'grab' }}>
                  <div style={{ height: 210, background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 38 }}>{c.emoji}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="starFilled" size={12} color={C.text} />
                      <span style={{ ...fw(700), fontSize: 12, color: C.text }}>{c.pts} pts</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 4 }}>
                      {challenges.map((_, i) => (
                        <div key={i} style={{ width: i === challengeIndex ? 16 : 6, height: 6, borderRadius: 3, background: i === challengeIndex ? C.white : 'rgba(255,255,255,0.5)', transition: 'width 0.2s' }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <p style={{ ...fw(700), fontSize: 17, color: C.text, lineHeight: '23px' }}>{c.title}</p>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <Pill icon={<Icon name="package" size={10} color={C.textBody} />}>{c.type}</Pill>
                      <Pill icon={<Icon name="clock" size={10} color={C.textBody} />}>{c.time}</Pill>
                      <Pill>{c.level}</Pill>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="starFilled" size={14} color={C.text} />
                        <span style={{ ...fw(500), fontSize: 14, color: C.text }}>{c.pts}</span>
                      </div>
                      <motion.button whileTap={{ scale: 0.82 }} onClick={e => { e.stopPropagation(); setHearted(h => !h) }} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={hearted ? 'heartFilled' : 'heart'} size={16} color={hearted ? '#e05555' : C.textBody} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )
        })()}

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onTabChange('progress')} style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, background: C.white, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
          <div style={{ width: 52, height: 52, position: 'relative', flexShrink: 0 }}>
            <svg width={52} height={52} viewBox="0 0 52 52">
              <circle cx={26} cy={26} r={21} fill="none" stroke={C.border} strokeWidth={4} />
              <circle cx={26} cy={26} r={21} fill="none" stroke={C.text} strokeWidth={4} strokeDasharray={String(2 * Math.PI * 21)} strokeDashoffset={String(2 * Math.PI * 21 * 0.4)} transform="rotate(-90 26 26)" strokeLinecap="round" />
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
        </motion.button>

        <div style={{ marginBottom: 20 }}><FlywheelSection onOpen={onFlywheelOpen} /></div>

        <p style={{ ...fw(700), fontSize: 16, color: C.text, marginBottom: 16 }}>From the community</p>

        {/* User's own post */}
        {userPost && (
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Avatar initial="Z" size={32} photo={photo} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Zara Ahmed</span>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Pill bg={C.cardBg}>Advocate</Pill>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 7px', borderRadius: 30, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                      <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                      <span style={{ ...fw(600), fontSize: 11, color: '#22c55e' }}>Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {userPost.photo && (
              <div style={{ height: 180, borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
                <img src={userPost.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>
              "The first {BRAND} product I ever tried was {userPost.sentence} and I've never looked back."
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>just now</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ ...fw(500), fontSize: 12, color: C.text }}>0</span>
                <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="bookmark" size={14} color={C.textMuted} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community card 1 */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Avatar initial="L" size={32} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Lea Fontaine</span>
                <div style={{ display: 'flex', gap: 4 }}><Pill bg={C.cardBg}>Platinum</Pill><Pill bg={C.white}>Guide</Pill></div>
              </div>
            </div>
            <Pill icon={<Icon name="flag" size={10} color={C.textBody} />} bg={C.white}>Challenge</Pill>
          </div>
          <div style={{ height: 200, borderRadius: 10, background: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#b498d8,#9880c0)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 52, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}>✨</span>
          </div>
          <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>The <span style={{ ...fw(500), textDecoration: 'underline' }}>{BRAND_HANDLE}</span> {BC.feedPosts[0].body}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>45m ago</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>24</span>
              <motion.button whileTap={{ scale: 0.82 }} onClick={() => setBookmarked(b => !b)} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={bookmarked ? 'bookmarkFilled' : 'bookmark'} size={14} color={bookmarked ? C.text : C.textMuted} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Community card 2 — question thread */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Avatar initial="C" size={32} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...fw(700), fontSize: 14, color: C.text }}>Chloe Nakamura</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Pill bg={C.cardBg}>Gold</Pill><span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>45m ago</span></div>
              </div>
            </div>
            <Pill icon={<Icon name="help" size={10} color={C.textBody} />} bg={C.white}>Question</Pill>
          </div>
          <p style={{ ...fw(400), fontSize: 17, color: C.text, lineHeight: '24px', marginBottom: 8 }}>{BC.feedPosts[1].question}</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 12 }}>{BC.feedPosts[1].body}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Avatar initial="C" size={22} />
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>1 accepted</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.text }}>4</span>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setThreadOpen(o => !o)} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="messageSquare" size={14} color={threadOpen ? C.text : C.textMuted} />
              </motion.button>
            </div>
          </div>
          <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, marginBottom: threadOpen ? 12 : 0 }}>
            <Avatar initial="Z" size={26} showIndicator photo={photo} />
            <span style={{ ...fw(400), fontSize: 13, color: C.textPlaceholder }}>Share your thoughts here</span>
          </div>
          <AnimatePresence>
            {threadOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }} style={{ overflow: 'hidden' }}>
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
                    <p style={{ ...fw(400), fontSize: 13, color: 'rgba(66,66,66,0.9)', lineHeight: '19px' }}>{BC.feedPosts[1].reply}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <PrimaryButton onClick={() => onTabChange('community')}>Explore more</PrimaryButton>
      </div>
    </div>
  )
}

// ── CHALLENGES FILTER PANEL ───────────────────────────

function ChallengesFilterPanel({ onClose }) {
  const [myChallenges, setMyChallenges] = useState([])
  const [types, setTypes] = useState([])
  const [time, setTime] = useState(null)
  const [difficulty, setDifficulty] = useState([])
  const [productTypes, setProductTypes] = useState([])

  const toggle = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])

  const FilterSection = ({ title, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
      <p style={{ ...fw(400), fontSize: 16, color: C.text }}>{title}</p>
      {children}
    </div>
  )

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ position: 'absolute', inset: 0, background: C.white, zIndex: 50, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'sticky', top: 0, background: C.white, zIndex: 10, borderBottom: `1px solid ${C.borderLight}`, flexShrink: 0 }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
            <Icon name="arrowLeft" size={22} color={C.textBody} />
          </motion.button>
          <span style={{ ...fw(400), fontSize: 20, color: C.text }}>Filters</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <FilterSection title="My Challenges">
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ key: 'saved', icon: 'heart', label: 'Saved' }, { key: 'completed', icon: 'check', label: 'Completed' }].map(({ key, icon, label }) => {
              const on = myChallenges.includes(key)
              return (
                <motion.button key={key} whileTap={{ scale: 0.96 }} onClick={() => toggle(myChallenges, setMyChallenges, key)}
                  style={{ flex: 1, height: 48, border: `1px solid ${on ? C.text : C.border}`, borderRadius: 12, background: on ? C.text : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
                  <Icon name={icon} size={16} color={on ? C.white : C.textBody} />
                  <span style={{ ...fw(600), fontSize: 14, color: on ? C.white : C.text }}>{label}</span>
                </motion.button>
              )
            })}
          </div>
        </FilterSection>

        <FilterSection title="Type">
          <div style={{ display: 'flex', gap: 8 }}>
            {['Review', 'Tutorial', 'Challenge'].map(t => {
              const on = types.includes(t)
              return (
                <motion.button key={t} whileTap={{ scale: 0.96 }} onClick={() => toggle(types, setTypes, t)}
                  style={{ flex: 1, border: `1px solid ${on ? C.text : C.border}`, borderRadius: 12, padding: '16px 8px', background: on ? C.text : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <Icon name="bookmark" size={16} color={on ? C.white : C.textBody} />
                  <span style={{ ...fw(400), fontSize: 12, color: on ? C.white : C.text }}>{t}</span>
                </motion.button>
              )
            })}
          </div>
        </FilterSection>

        <FilterSection title="Time">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap' }}>
            {[{ val: '10min', label: '10', unit: 'min' }, { val: '30min', label: '30', unit: 'min' }, { val: '1h', label: '1', unit: 'hour' }, { val: '2h', label: '2', unit: 'hours' }, { val: '3h', label: '3', unit: 'hours' }].map(({ val, label, unit }) => {
              const on = time === val
              return (
                <motion.button key={val} whileTap={{ scale: 0.96 }} onClick={() => setTime(on ? null : val)}
                  style={{ flex: 1, aspectRatio: '1', borderRadius: '50%', border: `1px solid ${on ? C.text : C.border}`, background: on ? C.text : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minWidth: 0 }}>
                  <span style={{ ...fw(700), fontSize: 15, color: on ? C.white : C.text, lineHeight: 1.2 }}>{label}</span>
                  <span style={{ ...fw(400), fontSize: 10, color: on ? 'rgba(255,255,255,0.75)' : C.textMuted }}>{unit}</span>
                </motion.button>
              )
            })}
          </div>
        </FilterSection>

        <FilterSection title="Difficulty">
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ key: 'beginner', label: 'Beginner', dots: 1 }, { key: 'intermediate', label: 'Intermediate', dots: 2 }, { key: 'advanced', label: 'Advanced', dots: 3 }].map(({ key, label, dots }) => {
              const on = difficulty.includes(key)
              return (
                <motion.button key={key} whileTap={{ scale: 0.96 }} onClick={() => toggle(difficulty, setDifficulty, key)}
                  style={{ flex: 1, border: `1px solid ${on ? C.text : C.border}`, borderRadius: 12, padding: '16px 8px', background: on ? C.text : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[1,2,3].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: d <= dots ? (on ? C.white : C.text) : (on ? 'rgba(255,255,255,0.25)' : C.border) }} />)}
                  </div>
                  <span style={{ ...fw(400), fontSize: 12, color: on ? C.white : C.text }}>{label}</span>
                </motion.button>
              )
            })}
          </div>
        </FilterSection>

        <FilterSection title="Product Type">
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ key: 'denim', icon: 'heart', label: 'Denim' }, { key: 'tops', icon: 'star', label: 'Tops' }, { key: 'active', icon: 'gift', label: 'Active' }].map(({ key, icon, label }) => {
              const on = productTypes.includes(key)
              return (
                <motion.button key={key} whileTap={{ scale: 0.96 }} onClick={() => toggle(productTypes, setProductTypes, key)}
                  style={{ flex: 1, border: `1px solid ${on ? C.text : C.border}`, borderRadius: 12, padding: '16px 8px', background: on ? C.text : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <Icon name={icon} size={16} color={on ? C.white : C.textBody} />
                  <span style={{ ...fw(400), fontSize: 12, color: on ? C.white : C.text }}>{label}</span>
                </motion.button>
              )
            })}
          </div>
        </FilterSection>

        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
          style={{ width: '100%', height: BTN.height, background: BTN.bg, color: BTN.color, border: 'none', borderRadius: BTN.radius, cursor: 'pointer', ...fw(700), fontSize: BTN.fontSize, marginTop: 8 }}>
          Apply Filters
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── CHALLENGE DETAIL SCREEN ───────────────────────────

function ChallengeDetailScreen({ onBack }) {
  const [checked, setChecked] = useState([false, false, false, false, false])
  const toggle = i => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))
  const [showSubmit, setShowSubmit] = useState(false)
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const steps = BC.challengeDetail.steps

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Back button — outside scroll container so it's always on top and never scrolls away */}
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 14, left: 16, width: 32, height: 32, border: `1px solid ${C.border}`, borderRadius: 12, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
        <Icon name="arrowLeft" size={14} color={C.textBody} />
      </motion.button>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* Hero */}
        <div style={{ height: 193, background: 'linear-gradient(145deg,#faeae4,#f0c8b8,#e0a090,#c88070)', flexShrink: 0, borderRadius: '0 0 12px 12px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...fw(400), fontSize: 16, color: C.text }}>Challenge</span>
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="starFilled" size={12} color={C.text} />
            <span style={{ ...fw(700), fontSize: 12, color: C.text }}>120 pts</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 16px 24px' }}>
          <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px', marginBottom: 8 }}>
            {BC.challengeDetail.title}
          </p>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
            <Pill icon={<Icon name="package" size={10} color={C.textBody} />}>Photo Post</Pill>
            <Pill icon={<Icon name="clock" size={10} color={C.textBody} />}>1h</Pill>
            <Pill>Beginner</Pill>
          </div>
          <p style={{ ...fw(400), fontSize: 16, color: C.textBody, lineHeight: '20px', marginBottom: 24 }}>
            {BC.challengeDetail.body}
          </p>

          <div style={{ background: C.cardBg, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ ...fw(400), fontSize: 18, color: C.text, margin: 0 }}>Steps</p>
            {steps.map((step, i) => (
              <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => toggle(i)}
                style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'inherit' }}>
                <div style={{ width: 20, height: 20, border: `1px solid ${checked[i] ? C.text : C.textBody}`, borderRadius: 4, background: checked[i] ? C.text : 'transparent', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {checked[i] && <Icon name="check" size={12} color={C.white} strokeWidth={2.5} />}
                </div>
                <span style={{ ...fw(400), fontSize: 16, color: checked[i] ? C.textMuted : C.textBody, lineHeight: '20px', textDecoration: checked[i] ? 'line-through' : 'none' }}>{step}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ height: 70, background: C.white, borderTop: `1px solid ${C.borderLight}`, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowSubmit(true)} style={{ width: '100%', height: 48, border: `1px solid ${C.border}`, borderRadius: 12, background: C.white, ...fw(700), fontSize: 14, color: C.text, cursor: 'pointer', fontFamily: 'inherit' }}>
          Submit
        </motion.button>
      </div>

      {/* Submit overlay */}
      <AnimatePresence>
        {showSubmit && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSubmit(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 10 }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={spring}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 11, padding: '24px 16px 36px' }}
            >
              {/* Handle */}
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />

              <p style={{ ...fw(700), fontSize: 20, textAlign: 'center', color: C.text, margin: '0 0 4px' }}>Share Your Challenge</p>
              <p style={{ ...fw(400), fontSize: 14, textAlign: 'center', color: C.textMuted, margin: '0 0 24px' }}>{BC.challengeDetail.title}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>1</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: 0, lineHeight: '20px' }}>
                      Include the required hashtag{'\n'}{BC.challengeDetail.hashtag}
                    </p>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy} style={{ flexShrink: 0, height: 32, padding: '0 14px', border: `1px solid ${C.border}`, borderRadius: 8, background: copied ? C.text : C.white, ...fw(600), fontSize: 13, color: copied ? C.white : C.text, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s,color 0.2s' }}>
                      {copied ? 'Copied' : 'Copy'}
                    </motion.button>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>2</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: '0 0 8px', lineHeight: '20px' }}>
                      Tag products and share affiliate links to earn points and commission
                    </p>
                    <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Icon name="search" size={14} color={C.textPlaceholder} />
                      <span style={{ ...fw(400), fontSize: 14, color: C.textPlaceholder, marginLeft: 8 }}>Start typing to search...</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>3</span>
                  </div>
                  <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: 0 }}>Share on Socials</p>
                </div>
              </div>

              <div style={{ height: 1, background: C.borderLight, marginBottom: 20 }} />

              <p style={{ ...fw(600), fontSize: 14, textAlign: 'center', color: C.textBody, margin: '0 0 16px' }}>Share on...</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                {[
                  { label: 'Instagram', abbr: 'IG' },
                  { label: 'TikTok',    abbr: 'TT' },
                  { label: 'LTK',       abbr: 'LTK' },
                  { label: 'YouTube',   abbr: 'YT' },
                ].map(({ label, abbr }) => (
                  <motion.button key={label} whileTap={{ scale: 0.92 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, border: `1px solid ${C.border}`, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ ...fw(700), fontSize: 11, color: C.text }}>{abbr}</span>
                    </div>
                    <span style={{ ...fw(400), fontSize: 12, color: C.textBody }}>{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── GROUP CHALLENGE DETAIL SCREEN ────────────────────

function GroupChallengeDetailScreen({ onBack }) {
  const challenge = {
    title: 'Team Glow Challenge', goal: 15, done: 9, pts: 300, daysLeft: 3,
    members: [
      { initial: 'L', name: 'Lea Fontaine',  posts: 3 },
      { initial: 'S', name: 'Sofia Brennan', posts: 4 },
      { initial: 'P', name: 'Priya Nair',    posts: 2 },
    ],
  }
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 14, left: 16, width: 32, height: 32, border: `1px solid ${C.border}`, borderRadius: 12, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
        <Icon name="arrowLeft" size={14} color={C.textBody} />
      </motion.button>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ height: 193, background: 'linear-gradient(145deg,#f0e8ff,#d4b8f0,#9880c0)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '0 0 12px 12px' }}>
          <span style={{ ...fw(500), fontSize: 16, color: C.text, position: 'absolute', top: 20 }}>Group Challenge</span>
          <div style={{ display: 'flex' }}>
            {challenge.members.map((m, i) => (
              <div key={i} style={{ marginLeft: i > 0 ? -10 : 0, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: challenge.members.length - i }}>
                <span style={{ ...fw(700), fontSize: 18, color: C.text }}>{m.initial}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="starFilled" size={12} color={C.text} />
            <span style={{ ...fw(700), fontSize: 12, color: C.text }}>{challenge.pts} pts</span>
          </div>
        </div>
        <div style={{ padding: '16px 16px 24px' }}>
          <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px', marginBottom: 16 }}>{challenge.title}</p>
          <div style={{ background: C.cardBg, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ ...fw(600), fontSize: 14, color: C.text }}>Group progress</span>
              <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>{challenge.done} / {challenge.goal} posts</span>
            </div>
            <div style={{ height: 6, background: C.borderLight, borderRadius: 3, marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${(challenge.done / challenge.goal) * 100}%`, background: C.text, borderRadius: 3 }} />
            </div>
            <span style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{challenge.daysLeft} days left · You're in this together</span>
          </div>
          <p style={{ ...fw(400), fontSize: 15, color: C.text, marginBottom: 12 }}>Your team</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {challenge.members.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px' }}>
                <Avatar initial={m.initial} size={36} />
                <span style={{ ...fw(600), fontSize: 14, color: C.text, flex: 1 }}>{m.name}</span>
                <span style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{m.posts} post{m.posts !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 70, background: C.white, borderTop: `1px solid ${C.borderLight}`, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <motion.button whileTap={{ scale: 0.97 }} style={{ width: '100%', height: BTN.height, border: 'none', borderRadius: BTN.radius, background: BTN.bg, ...fw(700), fontSize: BTN.fontSize, color: BTN.color, cursor: 'pointer', fontFamily: 'inherit' }}>
          Post to this challenge
        </motion.button>
      </div>
    </div>
  )
}

// ── TAB: CHALLENGES ───────────────────────────────────

function ChallengesTab({ onFilterOpen, onMenuOpen, onWalletOpen, onChallengeOpen, onGroupChallengeOpen, mode = 'advocate' }) {
  const [filter, setFilter] = useState(mode === 'employee' ? 'Group' : 'Explore')
  const challenges = BC.challenges

  if (mode === 'loyalty') {
    const earnActivities = [
      { icon: 'pencilRuler', label: 'Write a Review',  sub: 'Review any product',         pts: '+25 pts' },
      { icon: 'package',     label: 'Make a Purchase', sub: 'Any order qualifies',         pts: '+15 pts per £10' },
      { icon: 'users',       label: 'Refer a Friend',  sub: 'Friend makes a purchase',     pts: '+100 pts' },
      { icon: 'gift',        label: 'Birthday Bonus',  sub: 'On your birthday month',      pts: '+200 pts' },
    ]
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
          <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
          <div style={{ padding: '12px 16px 12px' }}>
            <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: 0 }}>Ways to Earn</p>
          </div>
        </div>
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {earnActivities.map((a, i) => (
            <motion.div key={i} whileTap={{ scale: 0.98 }} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', background: C.white }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={a.icon} size={18} color={C.textBody} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 2px' }}>{a.label}</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{a.sub}</p>
              </div>
              <span style={{ ...fw(700), fontSize: 13, color: C.text, flexShrink: 0 }}>{a.pts}</span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
        <div style={{ padding: '12px 16px' }}>
          <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, marginBottom: 10, background: C.cardBg }}>
            <Icon name="search" size={15} color={C.textMuted} />
            <span style={{ ...fw(400), fontSize: 14, color: C.textPlaceholder }}>Search challenges</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['Explore', 'Review', 'Tutorial', 'Group'].map(f => (
              <motion.button key={f} whileTap={{ scale: 0.94 }} onClick={() => setFilter(f)} style={{ height: 30, padding: '0 14px', borderRadius: 20, border: `1px solid ${filter === f ? C.text : C.border}`, background: filter === f ? C.text : 'transparent', ...fw(filter === f ? 600 : 400), fontSize: 13, color: filter === f ? C.white : C.textBody, cursor: 'pointer' }}>{f}</motion.button>
            ))}
            <motion.button whileTap={{ scale: 0.9 }} onClick={onFilterOpen} style={{ width: 30, height: 30, borderRadius: 20, border: `1px solid ${C.border}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <Icon name="sliders" size={14} color={C.textBody} />
            </motion.button>
          </div>
        </div>
      </div>
      {filter === 'Group' ? (
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Team Glow Challenge', goal: 15, done: 9, members: ['L','S','P'], daysLeft: 3, pts: 300, bg: 'linear-gradient(145deg,#f0e8ff,#d4b8f0)' },
            { title: 'Summer Looks Sprint', goal: 20, done: 14, members: ['I','C','M'], daysLeft: 6, pts: 450, bg: 'linear-gradient(145deg,#e8f4e8,#a8d8a8)' },
          ].map((c, i) => (
            <motion.div key={i} whileTap={{ scale: 0.985 }} onClick={onGroupChallengeOpen} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: C.white }}>
              <div style={{ height: 150, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ display: 'flex' }}>
                  {c.members.map((m, j) => (
                    <div key={j} style={{ marginLeft: j > 0 ? -10 : 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: c.members.length - j }}>
                      <span style={{ ...fw(700), fontSize: 16, color: C.text }}>{m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Icon name="starFilled" size={11} color={C.text} />
                  <span style={{ ...fw(700), fontSize: 11, color: C.text }}>{c.pts} pts</span>
                </div>
              </div>
              <div style={{ padding: '12px 14px 14px' }}>
                <p style={{ ...fw(400), fontSize: 15, color: C.text, lineHeight: '21px', marginBottom: 8 }}>{c.title}</p>
                <div style={{ height: 4, background: C.borderLight, borderRadius: 2, marginBottom: 6 }}>
                  <div style={{ height: '100%', width: `${(c.done / c.goal) * 100}%`, background: C.text, borderRadius: 2 }} />
                </div>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{c.done} / {c.goal} posts · {c.daysLeft} days left</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {challenges.map((c, i) => (
            <motion.div key={i} whileTap={{ scale: 0.985 }} onClick={onChallengeOpen} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: C.white }}>
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
      )}
    </div>
  )
}

// ── TAB: COMMUNITY ────────────────────────────────────

function ReplySheet({ post, onClose }) {
  const [text, setText] = useState('')
  const [replies, setReplies] = useState([
    { initial: 'T', name: 'Thea Walsh', time: '12m ago', body: 'Totally normal! Size down one and they hold their shape much better. I do it with every AirFlex style now.' },
    { initial: 'J', name: 'Jade Perry', time: '28m ago', body: 'Wash them inside out on cold and they keep their fit way longer. Game changer for the stretch denim.' },
  ])
  const handlePost = () => {
    if (!text.trim()) return
    setReplies(prev => [{ initial: 'Y', name: 'You', time: 'Just now', body: text.trim() }, ...prev])
    setText('')
  }
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 20 }} />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 21, maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexShrink: 0, padding: '12px 16px 14px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 16px' }} />
          <div style={{ padding: '12px 14px', background: C.cardBg, borderRadius: 10, marginBottom: 4 }}>
            <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: '0 0 4px' }}>{post.name} asked</p>
            <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{post.body}</p>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 16px 12px' }}>
          <p style={{ ...fw(600), fontSize: 13, color: C.textMuted, margin: '0 0 12px' }}>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {replies.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <Avatar initial={r.initial} size={30} />
                <div style={{ flex: 1, background: C.cardBg, borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ ...fw(600), fontSize: 13, color: C.text }}>{r.name}</span>
                    <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>{r.time}</span>
                  </div>
                  <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flexShrink: 0, padding: '12px 16px 32px', borderTop: `1px solid ${C.borderLight}`, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write a reply…"
            style={{ flex: 1, minHeight: 40, maxHeight: 100, border: `1px solid ${text ? C.text : C.border}`, borderRadius: 10, padding: '10px 12px', fontSize: 14, color: C.text, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: '20px', background: C.white, display: 'block', boxSizing: 'border-box' }} />
          <motion.button whileTap={{ scale: 0.92 }} onClick={handlePost}
            style={{ height: 40, padding: '0 16px', borderRadius: 10, border: 'none', background: text.trim() ? C.text : C.cardBg, color: text.trim() ? C.white : C.textMuted, ...fw(600), fontSize: 14, cursor: text.trim() ? 'pointer' : 'default', fontFamily: 'inherit', flexShrink: 0 }}>
            Post
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function CommunityRemixSheet({ post, onClose, savedRemixes, onSave }) {
  const alreadySaved = savedRemixes.some(r => r.id === post.name + post.body)
  const IDEAS = [
    { icon: 'sliders',    title: 'Your setting',      body: "They filmed indoors — try natural window light or an outdoor setting. A different backdrop makes your version instantly distinct." },
    { icon: 'person',     title: 'Your skin tone',    body: 'Show the same products on your complexion. Shade comparisons are high-value for audiences who struggle to find their match.' },
    { icon: 'arrowRight', title: 'Before vs after',   body: "Restructure as a transformation reveal instead of a walkthrough. The payoff moment gets significantly more replays." },
    { icon: 'clock',      title: 'Speed-run version', body: "Recreate the look in under 60 seconds. Quick get-ready versions consistently outperform longer tutorials in completion rate." },
  ]
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 20 }} />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 21, maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexShrink: 0, padding: '12px 16px 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
          <p style={{ ...fw(700), fontSize: 18, color: C.text, margin: '0 0 14px' }}>Remix this challenge</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 16px 44px' }}>
          <p style={{ ...fw(600), fontSize: 13, color: C.textMuted, margin: '0 0 10px' }}>Original post</p>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <Avatar initial={post.initial} size={32} />
              <div>
                <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: 0 }}>{post.name}</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>
                  <Pill bg={C.cardBg}>{post.tier}</Pill>
                </div>
              </div>
            </div>
            {post.photo && (
              <div style={{ height: 120, borderRadius: 8, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 36 }}>{post.emoji}</span>
              </div>
            )}
            <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{post.body}</p>
          </div>
          <p style={{ ...fw(600), fontSize: 13, color: C.textMuted, margin: '0 0 10px' }}>4 ways to make it yours</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {IDEAS.map((idea, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={idea.icon} size={14} color={C.textBody} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 4px' }}>{idea.title}</p>
                    <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{idea.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <motion.button whileTap={{ scale: alreadySaved ? 1 : 0.97 }}
            onClick={() => !alreadySaved && onSave({ id: post.name + post.body, authorName: post.name, authorInitial: post.initial, authorTier: post.tier, body: post.body, photo: post.photo, gradient: post.gradient, emoji: post.emoji, savedAt: 'Today' })}
            style={{ width: '100%', height: 48, borderRadius: 12, border: `1px solid ${alreadySaved ? C.border : C.text}`, background: alreadySaved ? C.cardBg : C.text, color: alreadySaved ? C.textMuted : C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: alreadySaved ? 'default' : 'pointer', ...fw(700), fontSize: 14, fontFamily: 'inherit' }}>
            <Icon name={alreadySaved ? 'check' : 'bookmark'} size={16} color={alreadySaved ? C.textMuted : C.white} />
            {alreadySaved ? 'Saved to My Projects' : 'Save to My Projects'}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function fmtFollowers(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K'
  return n.toString()
}

function AdvocateProfileSheet({ advocate, onClose }) {
  const totalFollowers = (advocate.instagram?.followers ?? 0) + (advocate.tiktok?.followers ?? 0)
  const socials = [
    advocate.instagram && { icon: 'instagram', platform: 'Instagram', handle: advocate.instagram.handle, followers: advocate.instagram.followers },
    advocate.tiktok    && { icon: 'tiktok',    platform: 'TikTok',    handle: advocate.tiktok.handle,    followers: advocate.tiktok.followers },
  ].filter(Boolean)
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 20 }} />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 21, maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexShrink: 0, padding: '12px 16px 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Avatar initial={advocate.initial} size={56} />
            <div>
              <p style={{ ...fw(700), fontSize: 18, color: C.text, margin: '0 0 6px' }}>{advocate.name}</p>
              <div style={{ display: 'flex', gap: 4 }}>
                <Pill bg={C.cardBg}>{advocate.tier}</Pill>
                {advocate.role && <Pill bg={C.white}>{advocate.role}</Pill>}
              </div>
              {advocate.tenure && (
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: '4px 0 0' }}>{advocate.tenure}</p>
              )}
            </div>
          </div>
          {totalFollowers > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: '0 0 2px' }}>Total followers</p>
              <p style={{ ...fw(700), fontSize: 28, color: C.text, margin: 0, letterSpacing: '-0.5px' }}>{fmtFollowers(totalFollowers)}</p>
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 16px 44px' }}>
          {socials.length > 0 && (
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
              <p style={{ ...fw(600), fontSize: 13, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, padding: '14px 16px 10px' }}>Socials</p>
              {socials.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={s.icon} size={16} color={C.textBody} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 1px' }}>{s.handle}</p>
                      <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{fmtFollowers(s.followers)} followers</p>
                    </div>
                    <Icon name="arrowRight" size={14} color={C.textMuted} />
                  </div>
                  {i < socials.length - 1 && <div style={{ height: 1, background: C.borderLight, marginLeft: 66 }} />}
                </div>
              ))}
            </div>
          )}
          {advocate.achievements?.length > 0 && (
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
              <p style={{ ...fw(600), fontSize: 13, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, padding: '14px 16px 10px' }}>Achievements</p>
              {advocate.achievements.map((a, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={a.icon} size={16} color={C.textBody} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 1px' }}>{a.label}</p>
                      <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{a.sub}</p>
                    </div>
                  </div>
                  {i < advocate.achievements.length - 1 && <div style={{ height: 1, background: C.borderLight, marginLeft: 66 }} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

const SUGGESTED_ADVOCATES = [
  { initial: 'T', name: 'Tara Williams', tier: 'Platinum', similarCount: 412, posts: [
    { gradient: 'linear-gradient(135deg,#faeae4,#f0c8b8,#c88070)', emoji: '💄' },
    { gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '✨' },
    { gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌟' },
  ]},
  { initial: 'J', name: 'Jade Parker', tier: 'Gold', similarCount: 287, posts: [
    { gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#f59e0b)', emoji: '💫' },
    { gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)', emoji: '🩷' },
    { gradient: 'linear-gradient(135deg,#e0f2fe,#7dd3fc,#38bdf8)', emoji: '💙' },
  ]},
  { initial: 'D', name: 'Daniela Cruz', tier: 'Gold', similarCount: 198, posts: [
    { gradient: 'linear-gradient(135deg,#faeae4,#f0c8b8,#c88070)', emoji: '🧴' },
    { gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)', emoji: '✨' },
    { gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)', emoji: '🌿' },
  ]},
  { initial: 'H', name: 'Hannah Scott', tier: 'Silver', similarCount: 134, posts: [
    { gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#fbcfe8)', emoji: '🌸' },
    { gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)', emoji: '🩷' },
    { gradient: 'linear-gradient(135deg,#faeae4,#f0c8b8,#c88070)', emoji: '💋' },
  ]},
]

const CHAMPIONS_DATA = [
  { icon: 'video',         label: 'Visual Storyteller', initial: 'I', name: 'Isla Thompson',   tier: 'Platinum', desc: '18 challenge posts this season',     gradient: 'linear-gradient(135deg,#fff4e0,#fde68a,#f59e0b)' },
  { icon: 'wallet',        label: 'The Closer',         initial: 'P', name: 'Priya Nair',      tier: 'Gold',    desc: '£840 in attributed sales',            gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)' },
  { icon: 'flame',         label: 'Streak Keeper',      initial: 'C', name: 'Chloe Nakamura',  tier: 'Gold',    desc: '21 days posting in a row',            gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)' },
  { icon: 'users',         label: 'Community Hero',     initial: 'L', name: 'Lea Fontaine',    tier: 'Platinum', desc: 'Helped 12 advocates this month',     gradient: 'linear-gradient(135deg,#f0e8ff,#d4b8f0,#9880c0)' },
  { icon: 'messageSquare', label: 'The Reviewer',       initial: 'S', name: 'Sofia Brennan',   tier: 'Gold',    desc: '14 detailed product reviews',         gradient: 'linear-gradient(135deg,#faeae4,#f0c8b8,#c88070)' },
]

const RISING_STARS_DATA = [
  { initial: 'N', name: 'Nina Reeves',    tier: 'Silver', growth: '+284%', metric: 'engagement vs. last month', gradient: 'linear-gradient(135deg,#ecfeff,#a5f3fc,#22d3ee)' },
  { initial: 'R', name: 'Rachel Kim',     tier: 'Silver', growth: '+156%', metric: 'saves on last post',        gradient: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#fbcfe8)' },
  { initial: 'A', name: 'Amara Diallo',   tier: 'Gold',   growth: '+98%',  metric: 'views this week',           gradient: 'linear-gradient(135deg,#e8f4e8,#a8d8a8,#78b878)' },
]

const COMMUNITY_HERO = {
  initial: 'L', name: 'Lea Fontaine', tier: 'Platinum',
  reason: 'Answered 5 product questions from newer advocates this week',
}

function RecognitionSheet({ onClose }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 20 }}
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={spring}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 21, maxHeight: '92%', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ flexShrink: 0, padding: '12px 16px 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ ...fw(700), fontSize: 18, color: C.text, margin: 0 }}>Recognition</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: 0 }}>Season 1 · June 2026</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="users" size={13} color={C.textMuted} />
              <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>84 advocates</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 0 44px' }}>
          {/* Season Impact */}
          <div style={{ padding: '0 16px 28px' }}>
            <div style={{ background: C.text, borderRadius: 14, padding: '20px 20px 16px' }}>
              <p style={{ ...fw(500), fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Community this season</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { value: '2.4M',  label: 'total views' },
                  { value: '847',   label: 'challenges' },
                  { value: '£12.6K', label: 'sales driven' },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '0 4px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
                    <p style={{ ...fw(700), fontSize: 22, color: C.white, margin: '0 0 3px', letterSpacing: '-0.5px' }}>{stat.value}</p>
                    <p style={{ ...fw(400), fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 6, height: 5, overflow: 'hidden' }}>
                <div style={{ width: '71%', height: '100%', background: C.lime, borderRadius: 6 }} />
              </div>
              <p style={{ ...fw(400), fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>71% toward the season goal</p>
            </div>
          </div>
          {/* This Month's Champions */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ padding: '0 16px', marginBottom: 12 }}>
              <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 2px' }}>This Month's Champions</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: 0 }}>Recognised for different kinds of contribution</p>
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 16px 4px', scrollbarWidth: 'none' }}>
              {CHAMPIONS_DATA.map((c, i) => (
                <div key={i} style={{ flexShrink: 0, width: 158, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ height: 76, background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ ...fw(800), fontSize: 17, color: C.text }}>{c.initial}</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 12px 12px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: C.cardBg, borderRadius: 6, padding: '3px 7px', marginBottom: 8 }}>
                      <Icon name={c.icon} size={10} color={C.textMuted} />
                      <span style={{ ...fw(500), fontSize: 10, color: C.textMuted }}>{c.label}</span>
                    </div>
                    <p style={{ ...fw(700), fontSize: 13, color: C.text, margin: '0 0 3px' }}>{c.name}</p>
                    <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, margin: 0, lineHeight: '15px' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Brand Spotlight */}
          <div style={{ padding: '0 16px', marginBottom: 28 }}>
            <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 2px' }}>Brand Spotlight</p>
            <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: '0 0 12px' }}>Picked this week by the American Eagle team</p>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', background: BRAND_SPOTLIGHT.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 52, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}>{BRAND_SPOTLIGHT.emoji}</span>
                <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.55)', borderRadius: 20, padding: '4px 10px' }}>
                  <span style={{ ...fw(600), fontSize: 11, color: C.white }}>✦ {BRAND} Pick</span>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Avatar initial={BRAND_SPOTLIGHT.initial} size={28} />
                  <div>
                    <p style={{ ...fw(700), fontSize: 13, color: C.text, margin: 0 }}>{BRAND_SPOTLIGHT.name}</p>
                    <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, margin: 0 }}>{BRAND_SPOTLIGHT.tier}</p>
                  </div>
                </div>
                <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: '0 0 10px' }}>{BRAND_SPOTLIGHT.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: C.cardBg, borderRadius: 8 }}>
                  <Icon name="heart" size={12} color={C.textMuted} />
                  <span style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{BRAND_SPOTLIGHT.brandNote}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Rising Stars */}
          <div>
            <div style={{ padding: '0 16px', marginBottom: 12 }}>
              <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 2px' }}>Rising Stars</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: 0 }}>Biggest growth vs. their own previous period</p>
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 16px 4px', scrollbarWidth: 'none' }}>
              {RISING_STARS_DATA.map((r, i) => (
                <div key={i} style={{ flexShrink: 0, width: 158, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Avatar initial={r.initial} size={36} />
                    <div>
                      <p style={{ ...fw(700), fontSize: 13, color: C.text, margin: '0 0 3px' }}>{r.name}</p>
                      <Pill bg={C.cardBg}>{r.tier}</Pill>
                    </div>
                  </div>
                  <div style={{ background: C.cardBg, borderRadius: 8, padding: '8px 10px' }}>
                    <p style={{ ...fw(800), fontSize: 20, color: C.text, margin: '0 0 2px', letterSpacing: '-0.5px' }}>{r.growth}</p>
                    <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, margin: 0, lineHeight: '14px' }}>{r.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function CreatorsYouMightLike() {
  const [followed, setFollowed] = useState([])
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <p style={{ ...fw(600), fontSize: 14, color: C.text, marginBottom: 2 }}>Creators you might like</p>
        <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>Based on your activity</p>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -16px', padding: '0 16px 4px', scrollbarWidth: 'none' }}>
        {SUGGESTED_ADVOCATES.map((a, i) => (
          <div key={i} style={{ flexShrink: 0, width: 200, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <Avatar initial={a.initial} size={32} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</p>
                  <Pill bg={C.cardBg}>{a.tier}</Pill>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.88 }} onClick={() => setFollowed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', border: `1px solid ${followed.includes(i) ? C.border : C.text}`, background: followed.includes(i) ? C.cardBg : C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 8 }}>
                <Icon name={followed.includes(i) ? 'userCheck' : 'userPlus'} size={14} color={followed.includes(i) ? C.textMuted : C.white} strokeWidth={2} />
              </motion.button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginBottom: 10 }}>
              {a.posts.map((p, j) => (
                <div key={j} style={{ height: 56, borderRadius: 6, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18 }}>{p.emoji}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="users" size={11} color={C.textMuted} />
              <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>{a.similarCount} advocates with similar reach</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommunityTab({ onMenuOpen, onWalletOpen, onAdvocateOpen, onReplyOpen, onRemixOpen, onRecognitionOpen, mode = 'advocate' }) {
  const [filter, setFilter] = useState('Inspiring')
  const [saved, setSaved] = useState(Array(9).fill(false))
  const [theme, setTheme] = useState('Date Night')
  const tabRef = useRef(null)

  if (mode === 'loyalty') {
    const brandPosts = BC.loyaltyBrandPosts
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
          <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
          <div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <span style={{ ...fw(400), fontSize: 18, color: C.text }}>From the Brand</span>
          </div>
        </div>
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {brandPosts.map((p, i) => (
            <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 160, background: p.gradient }} />
              <div style={{ padding: '12px 14px 14px' }}>
                <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px' }}>{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  useEffect(() => {
    let el = tabRef.current?.parentElement
    while (el) {
      if (el.scrollHeight > el.clientHeight && el.scrollTop > 0) { el.scrollTop = 0; break }
      el = el.parentElement
    }
  }, [filter])
  const THEME_DATA = BC.communityThemes
  const posts = BC.communityPosts
  return (
    <div ref={tabRef}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
        <div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
          <span style={{ ...fw(700), fontSize: 18, color: C.text }}>Community</span>
          <motion.button whileTap={{ scale: 0.94 }} onClick={onRecognitionOpen} style={{ height: 30, padding: '0 12px', borderRadius: 20, border: `1px solid ${C.border}`, background: 'transparent', ...fw(500), fontSize: 13, color: C.textBody, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="award" size={13} color={C.textBody} />
            Recognition
          </motion.button>
        </div>
        <div style={{ padding: '10px 16px 12px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[{ label: 'Inspiring', icon: 'star' }, { label: 'Trending', icon: 'flame' }, { label: 'New', icon: 'clock' }, { label: 'Following', icon: 'users' }].map(({ label, icon }) => {
            const active = filter === label
            return (
              <motion.button key={label} whileTap={{ scale: 0.96 }} onClick={() => setFilter(label)} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, height: 34, padding: '0 14px', borderRadius: 100, border: `1px solid ${active ? C.text : C.border}`, background: active ? C.text : 'transparent', cursor: 'pointer', ...fw(500), fontSize: 14, color: active ? C.white : C.textBody, fontFamily: 'inherit' }}>
                <Icon name={icon} size={12} color={active ? C.white : C.textBody} />
                {label}
              </motion.button>
            )
          })}
        </div>
      </div>
      {filter === 'Following' ? (
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BC.followingPosts.map((post, i) => (
            <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Avatar initial={post.initial} size={32} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ ...fw(700), fontSize: 14, color: C.text }}>{post.name}</span>
                    <Pill bg={C.cardBg}>{post.tier}</Pill>
                    {post.tenure && (
                      <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>{post.tenure}</span>
                    )}
                  </div>
                </div>
                <Pill icon={<Icon name={post.tag.icon} size={10} color={C.textBody} />} bg={C.white}>{post.tag.label}</Pill>
              </div>
              {post.photo && (
                <div style={{ aspectRatio: '4/5', borderRadius: 10, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 46, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>{post.emoji}</span>
                </div>
              )}
              <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>{post.body}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>{post.time}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ ...fw(500), fontSize: 12, color: C.text }}>{post.saves}</span>
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="bookmark" size={14} color={C.textMuted} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filter === 'Trending' ? (
        <div style={{ padding: '16px 16px 32px' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, scrollbarWidth: 'none' }}>
            {['Date Night', 'Off-Duty Looks', 'Going Out Fits', 'Summer Denim', 'Streaks'].map(t => {
              const on = theme === t
              return (
                <motion.button key={t} whileTap={{ scale: 0.94 }} onClick={() => setTheme(t)}
                  style={{ flexShrink: 0, height: 32, padding: '0 16px', borderRadius: 20, border: `1px solid ${on ? C.text : C.border}`, background: on ? C.text : 'transparent', ...fw(on ? 600 : 400), fontSize: 13, color: on ? C.white : C.textBody, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {t}
                </motion.button>
              )
            })}
          </div>
          <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, marginBottom: 14 }}>{THEME_DATA[theme].desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {THEME_DATA[theme].posts.map((p, j) => (
              <motion.div key={j} whileTap={{ scale: 0.97 }} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '4/5', background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 46, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>{p.emoji}</span>
                </div>
                <div style={{ padding: '10px 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ ...fw(600), fontSize: 14, color: C.text }}>{p.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {theme === 'Streaks' ? (
                      <>
                        <Icon name="flame" size={12} color={C.textMuted} />
                        <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>{p.streakDays} days</span>
                      </>
                    ) : (
                      <>
                        <Icon name="bookmark" size={12} color={C.textMuted} />
                        <span style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{p.saves}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((post, i) => [
            <div key={`post-${i}`} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Avatar initial={post.initial} size={32} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <motion.span whileTap={{ opacity: 0.6 }} onClick={() => onAdvocateOpen(post)} style={{ ...fw(700), fontSize: 14, color: C.text, cursor: 'pointer' }}>{post.name}</motion.span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Pill bg={C.cardBg}>{post.tier}</Pill>
                      {post.role && <Pill bg={C.white}>{post.role}</Pill>}
                    </div>
                    {post.tenure && (
                      <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>{post.tenure}</span>
                    )}
                  </div>
                </div>
                <Pill icon={<Icon name={post.tag.icon} size={10} color={C.textBody} />} bg={C.white}>{post.tag.label}</Pill>
              </div>
              {post.photo && (
                <div style={{ aspectRatio: '4/5', borderRadius: 10, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 46, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>{post.emoji}</span>
                </div>
              )}
              <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '20px', marginBottom: 10 }}>{post.body}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>{post.time}</span>
                  {post.tag.label === 'Question' && (
                    <motion.button whileTap={{ scale: 0.94 }} onClick={() => onReplyOpen(post)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, height: 26, padding: '0 10px', borderRadius: 100, border: `1px solid ${C.border}`, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', ...fw(500), fontSize: 12, color: C.textBody }}>
                      <Icon name="messageSquare" size={11} color={C.textBody} />
                      Reply
                    </motion.button>
                  )}
                  {post.tag.label === 'Challenge' && (
                    <motion.button whileTap={{ scale: 0.94 }} onClick={() => onRemixOpen(post)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, height: 26, padding: '0 10px', borderRadius: 100, border: `1px solid ${C.border}`, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', ...fw(500), fontSize: 12, color: C.textBody }}>
                      <Icon name="scissors" size={11} color={C.textBody} />
                      Remix
                    </motion.button>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ ...fw(500), fontSize: 12, color: C.text }}>{post.saves + (saved[i] ? 1 : 0)}</span>
                  <motion.button whileTap={{ scale: 0.82 }} onClick={() => setSaved(prev => prev.map((v, idx) => idx === i ? !v : v))} style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={saved[i] ? 'bookmarkFilled' : 'bookmark'} size={14} color={saved[i] ? C.text : C.textMuted} />
                  </motion.button>
                </div>
              </div>
            </div>,
            (i === 0 || i === 3) && (
              <div key={`similar-${i}`} style={{ margin: '0 -16px' }}>
                <p style={{ ...fw(500), fontSize: 13, color: C.textMuted, margin: '0 0 10px 16px' }}>More like this</p>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 16px 4px', scrollbarWidth: 'none' }}>
                  {SIMILAR_POSTS_DATA.map((sp, j) => (
                    <motion.div key={j} whileTap={{ scale: 0.97 }} style={{ flexShrink: 0, width: 120, borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden', cursor: 'pointer' }}>
                      <div style={{ aspectRatio: '4/5', background: sp.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 26 }}>{sp.emoji}</span>
                      </div>
                      <div style={{ padding: '7px 9px 9px' }}>
                        <p style={{ ...fw(400), fontSize: 11, color: C.textBody, lineHeight: '15px', margin: '0 0 5px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sp.body}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Icon name="bookmark" size={10} color={C.textMuted} />
                          <span style={{ ...fw(500), fontSize: 10, color: C.textMuted }}>{sp.saves}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            i === 1 && (
              <div key="community-hero" style={{ background: 'rgba(66,66,66,0.04)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar initial={COMMUNITY_HERO.initial} size={40} />
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, background: C.lime, borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="star" size={8} color={C.text} strokeWidth={2.5} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ ...fw(500), fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 3px' }}>Community Hero · This week</p>
                  <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: '0 0 3px' }}>{COMMUNITY_HERO.name}</p>
                  <p style={{ ...fw(400), fontSize: 13, color: C.textBody, margin: '0 0 10px', lineHeight: '18px' }}>{COMMUNITY_HERO.reason}</p>
                  <motion.button whileTap={{ scale: 0.94 }} style={{ display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 12px', borderRadius: 100, border: `1px solid ${C.border}`, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', ...fw(500), fontSize: 12, color: C.textBody }}>
                    See their posts
                    <Icon name="arrowRight" size={11} color={C.textBody} />
                  </motion.button>
                </div>
              </div>
            ),
            i === 4 && <CreatorsYouMightLike key="creators" />,
          ])}
        </div>
      )}
    </div>
  )
}

// ── CONTENT ANALYSER SCREEN ───────────────────────────

function ContentAnalyserScreen({ onBack }) {
  const [step, setStep] = useState(0) // 0: input, 1: loading, 2: results
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [caption, setCaption] = useState('')
  const fileRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setMediaType(file.type.startsWith('video') ? 'video' : 'image')
    const reader = new FileReader()
    reader.onload = ev => setMedia(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleAnalyse = () => {
    setStep(1)
    setTimeout(() => setStep(2), 2200)
  }

  const goBack = () => {
    if (step === 0) onBack()
    else setStep(0)
  }

  const Header = () => (
    <div style={{ height: 52, borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0, background: C.white }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={goBack} style={{ position: 'absolute', left: 12, width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={18} color={C.textBody} />
      </motion.button>
      <span style={{ ...fw(500), fontSize: 15, color: C.text }}>Analyse content</span>
    </div>
  )

  if (step === 1) return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }} transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: C.text }} />
          ))}
        </div>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, textAlign: 'center' }}>Analysing your content…</p>
      </div>
    </div>
  )

  if (step === 2) {
    const RECS = [
      { icon: 'clock',        category: 'Hook',            title: 'Strengthen your opening',       body: 'Viewers decide within 3 seconds. Start with the product in action or a bold statement — not a wide establishing shot.' },
      { icon: 'pencilRuler',  category: 'Caption',         title: 'Name the product specifically', body: "Mention the exact product and style. 'Crossover Flare Leg Jean' performs better than generic descriptions in both search and engagement." },
      { icon: 'sliders',      category: 'Lighting',        title: 'Even out your lighting',        body: 'The left side of the frame is slightly dim. Filming near a window or with a ring light will give a more polished finish.' },
      { icon: 'flag',         category: 'Discoverability', title: 'Add the required hashtags',     body: '#AmericanEagle and #AEStyle are required for challenge submission. Your caption is missing both.' },
    ]
    return (
      <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 16px 40px' }}>

          {/* Content preview */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 72, height: 72, borderRadius: 10, background: C.cardBg, border: `1px solid ${C.border}`, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {media && mediaType === 'image' && <img src={media} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              {media && mediaType === 'video' && <Icon name="video" size={24} color={C.textMuted} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ ...fw(500), fontSize: 13, color: C.text, margin: '0 0 4px' }}>Your content</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, lineHeight: '19px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                {caption || 'No caption added'}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 12px' }}>{RECS.length} suggestions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {RECS.map((rec, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name={rec.icon} size={14} color={C.textBody} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ ...fw(500), fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 3 }}>{rec.category}</span>
                    <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 4px' }}>{rec.title}</p>
                    <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{rec.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Music check */}
          <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 12px' }}>Music check</p>
          <div style={{ border: '1px solid rgba(249,115,22,0.3)', borderRadius: 12, padding: 14, background: 'rgba(249,115,22,0.04)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <Icon name="music" size={14} color="#f97316" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <span style={{ ...fw(600), fontSize: 14, color: C.text }}>Flowers — Miley Cyrus</span>
                  <span style={{ ...fw(600), fontSize: 11, color: '#f97316', background: 'rgba(249,115,22,0.1)', padding: '2px 8px', borderRadius: 20, flexShrink: 0 }}>Copyrighted</span>
                </div>
                <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>Not cleared for commercial use. Switch to a royalty-free track to avoid your content being muted or removed.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '24px 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ ...fw(400), fontSize: 22, color: C.text, lineHeight: '30px', margin: '0 0 6px' }}>Analyse your content</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, lineHeight: '20px', margin: 0 }}>Upload your post and caption. We'll flag improvements and check for copyright issues before you submit.</p>
        </div>

        <input type="file" accept="image/*,video/*" ref={fileRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => fileRef.current?.click()}
          style={{ width: '100%', height: 180, border: `1px dashed ${media ? 'transparent' : C.border}`, borderRadius: 14, background: media ? 'transparent' : C.cardBg, cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', fontFamily: 'inherit' }}
        >
          {media && mediaType === 'image' && (
            <img src={media} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} />
          )}
          {media && mediaType === 'video' && (
            <div style={{ position: 'absolute', inset: 0, background: C.cardBg, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Icon name="video" size={28} color={C.textMuted} />
              <span style={{ ...fw(400), fontSize: 13, color: C.textMuted, fontFamily: 'inherit' }}>Video selected</span>
            </div>
          )}
          {!media && (
            <>
              <div style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${C.border}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="19" x2="12" y2="5" stroke={C.textMuted} strokeWidth={1.5} strokeLinecap="round" />
                  <polyline points="5,12 12,5 19,12" stroke={C.textMuted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ ...fw(400), fontSize: 14, color: C.textMuted, fontFamily: 'inherit' }}>Upload photo or video</span>
              <span style={{ ...fw(400), fontSize: 12, color: C.textPlaceholder, fontFamily: 'inherit' }}>MP4, MOV, JPG, PNG</span>
            </>
          )}
          {media && (
            <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.55)', borderRadius: 8, padding: '4px 10px' }}>
              <span style={{ ...fw(500), fontSize: 12, color: C.white }}>Tap to change</span>
            </div>
          )}
        </motion.button>

        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Paste your caption here…"
          style={{ width: '100%', height: 100, border: `1px solid ${caption ? C.text : C.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 15, color: C.text, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: '22px', background: C.white, display: 'block', boxSizing: 'border-box' }}
        />

        <PrimaryButton onClick={handleAnalyse} disabled={!media}>Analyse content</PrimaryButton>
      </div>
    </div>
  )
}

// ── REMIX SCREEN ──────────────────────────────────────

function RemixScreen({ onBack }) {
  const [step, setStep] = useState(0) // 0: input, 1: loading, 2: results
  const [url, setUrl] = useState('')

  const handleFind = () => {
    setStep(1)
    setTimeout(() => setStep(2), 2000)
  }

  const goBack = () => {
    if (step === 0) onBack()
    else setStep(0)
  }

  const Header = () => (
    <div style={{ height: 52, borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0, background: C.white }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={goBack} style={{ position: 'absolute', left: 12, width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={18} color={C.textBody} />
      </motion.button>
      <span style={{ ...fw(500), fontSize: 15, color: C.text }}>Remix content</span>
    </div>
  )

  if (step === 1) return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }} transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: C.text }} />
          ))}
        </div>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, textAlign: 'center' }}>Finding content…</p>
      </div>
    </div>
  )

  if (step === 2) {
    const IDEAS = [
      { icon: 'sliders',      title: 'Your setting',        body: "They filmed in a studio — try natural window light or an outdoor setting. A different backdrop makes your version instantly distinct." },
      { icon: 'person',       title: 'Your skin tone',      body: 'Show the same products on your complexion. Shade comparisons are high-value for audiences who struggle to find their match.' },
      { icon: 'arrowRight',   title: 'Before vs after',     body: "Restructure as a transformation reveal instead of a walkthrough. The payoff moment gets significantly more replays." },
      { icon: 'clock',        title: 'Speed-run version',   body: "Recreate their routine in under 60 seconds. '3-minute American Eagle get-ready' outperforms longer tutorials in completion rate." },
    ]
    return (
      <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 16px 40px' }}>

          {/* Original post card */}
          <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 12px' }}>Original post</p>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.cardBg, border: `1px solid ${C.border}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="person" size={16} color={C.textMuted} />
              </div>
              <div>
                <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: 0 }}>@stylebyella</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>47.2K views · 3 days ago</p>
              </div>
            </div>
            <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>
              My everyday AE outfit ✨ The Crossover Flare never gets old. #AEStyle #AmericanEagle
            </p>
          </div>

          {/* Remix ideas */}
          <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: '0 0 12px' }}>4 ways to remix this</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {IDEAS.map((idea, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name={idea.icon} size={14} color={C.textBody} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: '0 0 4px' }}>{idea.title}</p>
                    <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: 0 }}>{idea.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '24px 16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ ...fw(400), fontSize: 22, color: C.text, lineHeight: '30px', margin: '0 0 6px' }}>Remix content</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, lineHeight: '20px', margin: 0 }}>Paste a link to another creator's post. We'll suggest ways to put your own spin on it.</p>
        </div>

        <div>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste a TikTok or Instagram URL…"
            style={{ width: '100%', height: 48, border: `1px solid ${url ? C.text : C.border}`, borderRadius: 10, padding: '0 14px', fontSize: 15, color: C.text, fontFamily: 'inherit', outline: 'none', background: C.white, boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <p style={{ ...fw(500), fontSize: 13, color: C.textMuted, margin: '0 0 10px' }}>Or choose from trending posts</p>
          {[
            { handle: '@stylebyella',    caption: 'My everyday AE outfit ✨', views: '47.2K' },
            { handle: '@fitswithgrace',  caption: 'AE denim haul — every style ranked', views: '31.8K' },
            { handle: '@wornbyrose',     caption: 'American Eagle OOTD in 5 mins',    views: '28.4K' },
          ].map((post, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setUrl(post.handle); handleFind() }}
              style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, background: C.white, cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, fontFamily: 'inherit', textAlign: 'left' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.cardBg, border: `1px solid ${C.border}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="person" size={16} color={C.textMuted} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: '0 0 2px' }}>{post.handle}</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.caption}</p>
              </div>
              <span style={{ ...fw(400), fontSize: 12, color: C.textMuted, flexShrink: 0 }}>{post.views}</span>
            </motion.button>
          ))}
        </div>

        <PrimaryButton onClick={handleFind} disabled={!url.trim()}>Find content</PrimaryButton>
      </div>
    </div>
  )
}

// ── TAB: STUDIO ───────────────────────────────────────

function StudioTab({ onMenuOpen, onWalletOpen, onChallengeCreate, onContentAnalyse, onRemix, savedRemixes }) {
  const [tab, setTab] = useState('New Project')
  const cards = [
    { label: 'Analyse my content for a challenge',    action: onContentAnalyse },
    { label: 'I have an idea for a new challenge/content', action: onChallengeCreate },
    { label: "Remix someone else's content",          action: onRemix },
  ]
  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: `1px solid ${C.borderLight}` }}>
        <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
      </div>
      <div style={{ padding: '20px 16px 32px' }}>
        <p style={{ ...fw(700), fontSize: 22, color: C.text, marginBottom: 16 }}>Studio</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['New Project', 'My projects'].map(t => (
            <motion.button key={t} whileTap={{ scale: 0.94 }} onClick={() => setTab(t)} style={{ height: 32, padding: '0 16px', borderRadius: 20, border: `1px solid ${tab === t ? C.text : C.border}`, background: tab === t ? C.text : 'transparent', ...fw(tab === t ? 600 : 400), fontSize: 13, color: tab === t ? C.white : C.textBody, cursor: 'pointer' }}>{t}</motion.button>
          ))}
        </div>
        {tab === 'New Project' ? (
          <>
            <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px', marginBottom: 6 }}>Let's start creating</p>
            <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, marginBottom: 24 }}>Open a new project and jump in</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cards.map(({ label, action }, i) => (
                <motion.button key={i} whileTap={{ scale: 0.97 }} onClick={action || undefined} style={{ width: '100%', height: 160, border: `1px solid ${C.border}`, borderRadius: 14, background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                  <span style={{ ...fw(400), fontSize: 16, color: C.text, textAlign: 'center', lineHeight: '24px' }}>{label}</span>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p style={{ ...fw(400), fontSize: 20, color: C.text, lineHeight: '28px', marginBottom: 6 }}>My projects</p>
            {savedRemixes.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', gap: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                  <Icon name="scissors" size={20} color={C.textMuted} />
                </div>
                <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: 0 }}>No projects yet</p>
                <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, textAlign: 'center', margin: 0, lineHeight: '20px' }}>Save a remix idea from the community to find it here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                {savedRemixes.map((r, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.98 }}
                    style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, background: C.white, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                      <Avatar initial={r.authorInitial} size={32} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: '0 0 3px' }}>{r.authorName}</p>
                        <Pill bg={C.cardBg}>{r.authorTier}</Pill>
                      </div>
                      <span style={{ ...fw(400), fontSize: 11, color: C.textMuted, flexShrink: 0 }}>{r.savedAt}</span>
                    </div>
                    {r.photo && (
                      <div style={{ height: 80, borderRadius: 8, background: r.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: 28 }}>{r.emoji}</span>
                      </div>
                    )}
                    <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '19px', margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="scissors" size={12} color={C.textMuted} />
                      <span style={{ ...fw(500), fontSize: 12, color: C.textMuted }}>4 remix ideas</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function OrdersSection() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <p style={{ ...fw(600), fontSize: 15, color: C.text }}>Your orders</p>
        <span style={{ ...fw(400), fontSize: 13, color: C.textMuted, textDecoration: 'underline', cursor: 'pointer' }}>See all</span>
      </div>
      <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, marginBottom: 14, lineHeight: '18px' }}>
        Every order earns points. Tap one to review it and earn even more.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ORDERS.map(order => (
          <motion.div key={order.id} whileTap={{ scale: 0.98 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: C.cardBg, borderRadius: 12, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: C.borderLight, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="package" size={16} color={C.textMuted} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ ...fw(500), fontSize: 14, color: C.text, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.name}</p>
              <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{order.ago} · {order.price}</p>
              {order.reviewNudge && (
                <p style={{ ...fw(500), fontSize: 12, color: C.text, marginTop: 4 }}>Write a review to earn more →</p>
              )}
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ ...fw(700), fontSize: 15, color: C.text }}>+{order.pts}</p>
              <p style={{ ...fw(400), fontSize: 10, color: C.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>pts earned</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── TAB: PROGRESS + REWARDS ───────────────────────────

function ProgressContent({ mode = 'advocate', onFlywheelOpen }) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const streakState = ['none', 'active', 'none', 'today', 'none', 'none', 'none']
  const subBars = mode === 'loyalty'
    ? [
        { label: 'Purchases',      pts: 60,  pct: 0.40 },
        { label: 'Reviews',        pts: 75,  pct: 0.50 },
        { label: 'Referrals',      pts: 100, pct: 0.67 },
        { label: 'Birthday Bonus', pts: 200, pct: 1.00 },
      ]
    : mode === 'employee'
    ? [
        { label: 'Content Posts',   pts: 108, pct: 0.72 },
        { label: 'Team Challenges', pts: 60,  pct: 0.40 },
        { label: 'Purchases',       pts: 24,  pct: 0.16 },
        { label: 'Other',           pts: 12,  pct: 0.08 },
        { label: 'Member Bonus',    pts: 50,  pct: 0.33 },
      ]
    : [
        { label: 'Challenges',    pts: 108, pct: 0.72 },
        { label: 'Affiliate Sales', pts: 60, pct: 0.40 },
        { label: 'Purchases',     pts: 24,  pct: 0.16 },
        { label: 'Other',         pts: 12,  pct: 0.08 },
        { label: 'Member Bonus',  pts: 50,  pct: 0.33 },
      ]
  const achievements = mode === 'loyalty'
    ? [
        { label: 'Loyal Customer',    desc: '2 years of purchases' },
        { label: 'Reviewer',          desc: '3 product reviews written' },
        { label: 'Referral Champion', desc: 'Referred 1 friend' },
        { label: 'Birthday Club',     desc: 'Birthday bonus redeemed' },
      ]
    : mode === 'employee'
    ? [
        { label: 'Team Player',     desc: 'Joined 3 group challenges' },
        { label: '2-Year Advocate', desc: 'Member since April 2024' },
        { label: '1-Year Advocate', desc: 'First anniversary reached' },
        { label: 'Streak Keeper',   desc: 'Maintaining a streak for 7 days' },
        { label: 'Guide',           desc: 'Helped 5 community members' },
      ]
    : [
        { label: '2-Year Advocate', desc: 'Member since April 2024' },
        { label: '1-Year Advocate', desc: 'First anniversary reached' },
        { label: 'Streak Keeper',   desc: 'Maintaining a streak for 7 days' },
        { label: 'Guide',           desc: 'Helped 5 community members' },
        { label: 'First Challenge', desc: 'Completed your first challenge' },
      ]
  const tierLabel = mode === 'loyalty' ? 'Gold Member' : mode === 'employee' ? 'Champion' : 'Silver Tier'
  const sinceLabel = mode === 'loyalty' ? 'Customer since April 2024' : 'Member since April 2024'
  return (
    <div style={{ padding: '20px 16px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Points Summary */}
      <div>
        <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 10 }}>Points Summary</p>
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, textAlign: 'center', marginBottom: 6 }}>
            {sinceLabel}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <Pill bg={C.cardBg}>{tierLabel}</Pill>
          </div>
          {/* Radial chart */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 110, height: 110, position: 'relative' }}>
              <svg width={110} height={110} viewBox="0 0 110 110">
                <circle cx={55} cy={55} r={44} fill="none" stroke={C.borderLight} strokeWidth={8} />
                <circle cx={55} cy={55} r={44} fill="none" stroke={C.text} strokeWidth={8} strokeDasharray={String(2 * Math.PI * 44)} strokeDashoffset={String(2 * Math.PI * 44 * 0.4)} transform="rotate(-90 55 55)" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ ...fw(700), fontSize: 22, color: C.text, lineHeight: 1 }}>180</span>
                <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>pts</span>
              </div>
            </div>
          </div>
          <p style={{ ...fw(400), fontSize: 13, color: C.text, textAlign: 'center', marginBottom: 16 }}>
            <span style={{ ...fw(700) }}>60 pts</span> to Platinum tier
          </p>
          {/* Sub-bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {subBars.map((bar, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, width: 106, flexShrink: 0 }}>{bar.label}</p>
                <div style={{ flex: 1, height: 4, background: C.borderLight, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${bar.pct * 100}%`, background: C.text, borderRadius: 2 }} />
                </div>
                <p style={{ ...fw(600), fontSize: 12, color: C.text, width: 46, textAlign: 'right', flexShrink: 0 }}>{bar.pts} pts</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streak */}
      {mode !== 'loyalty' && <div>
        <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 12 }}>Streak</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {days.map((day, i) => {
            const s = streakState[i]
            const isActive = s === 'active'
            const isToday = s === 'today'
            return (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: isActive ? C.text : isToday ? 'transparent' : C.cardBg, border: isToday ? `1.5px solid ${C.border}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isActive
                    ? <span style={{ fontSize: 16 }}>🔥</span>
                    : <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.border }} />
                  }
                </div>
                <span style={{ ...fw(isActive ? 600 : 400), fontSize: 10, color: isActive ? C.text : C.textMuted }}>{day}</span>
              </div>
            )
          })}
        </div>
      </div>}

      <FlywheelSection onOpen={onFlywheelOpen} />

      <OrdersSection />

      {/* Achievements */}
      <div>
        <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 12 }}>Your Achievements</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {achievements.map((ach, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="award" size={18} color={C.textMuted} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...fw(600), fontSize: 13, color: C.text, marginBottom: 1 }}>{ach.label}</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ActivityTimeline({ mode = 'advocate' }) {
  const entries = mode === 'loyalty'
    ? [
        { icon: 'package',     action: 'Purchase recognised',  detail: 'Crossover Flare Leg Jean', pts: '+15 pts',  date: 'Today' },
        { icon: 'pencilRuler', action: 'Review approved',      detail: 'Cloud Hoodie',             pts: '+25 pts',  date: '2 days ago' },
        { icon: 'users',       action: 'Referral confirmed',   detail: 'Sophie made a purchase', pts: '+100 pts', date: 'Jun 10' },
        { icon: 'gift',        action: 'Birthday Bonus',       detail: 'Happy birthday month!',  pts: '+200 pts', date: 'Apr 1' },
      ]
    : [
        { icon: 'flag',    action: 'Challenge completed',         detail: 'Crossover Flare: Style It 3 Ways', pts: '+50 pts',  date: 'Today' },
        { icon: 'users',   action: 'Referral confirmed',          detail: 'Sophie joined your link',         pts: '+100 pts', date: 'Yesterday' },
        { icon: 'package', action: 'Purchase recognised',         detail: 'AirFlex+ Slim Jean',              pts: '+15 pts',  date: '3 days ago' },
        { icon: 'award',   action: '1-Year Advocacy Anniversary', detail: 'Thank you for a year!',   pts: '+500 pts', date: 'Jun 8' },
        { icon: 'store',   action: 'Storefront sale',             detail: '2 items via your link',   pts: '+22 pts',  date: 'Jun 7' },
      ]
  return (
    <div style={{ padding: '20px 16px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {entries.map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={e.icon} size={16} color={C.textMuted} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: 0 }}>{e.action}</p>
            <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{e.detail}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
            <span style={{ ...fw(600), fontSize: 13, color: C.text }}>{e.pts}</span>
            <span style={{ ...fw(400), fontSize: 11, color: C.textMuted }}>{e.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MilestoneCelebrationOverlay({ name, yearsCount, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 40px', animation: 'ob-fade-up 0.65s 0.3s ease-out both' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="award" size={28} color={C.white} strokeWidth={2} />
        </div>
        <p style={{ ...fw(500), fontSize: 28, color: C.white, letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0 }}>
          Happy anniversary, {name}.
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 260, margin: 0 }}>
          You've been one of our advocates for {yearsCount} {yearsCount === 1 ? 'year' : 'years'}. 500 points added to say thank you.
        </p>
      </div>
    </div>
  )
}

function RewardsContent() {
  const products = [
    { name: 'Crossover Flare Leg Jean: Style It 3 Ways', pts: 120 },
    { name: 'Crossover Flare Leg Jean: Style It 3 Ways', pts: 120 },
    { name: 'Cloud Hoodie: Cosy Season Campaign', pts: 85 },
    { name: 'Real Me Legging: Move With Me', pts: 60 },
  ]
  return (
    <div style={{ padding: '16px 16px 32px' }}>
      {/* Gift cards banner */}
      <motion.button whileTap={{ scale: 0.98 }} style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ ...fw(400), fontSize: 15, color: C.text }}>See your Gift Cards & Discounts</span>
        <Icon name="arrowRight" size={18} color={C.textMuted} />
      </motion.button>

      <p style={{ ...fw(400), fontSize: 15, color: C.text, marginBottom: 14 }}>Products</p>

      {/* 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {products.map((p, i) => (
          <motion.div key={i} whileTap={{ scale: 0.97 }} style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: C.white }}>
            <div style={{ height: 160, background: C.cardBg }} />
            <div style={{ padding: '10px 10px 12px' }}>
              <p style={{ ...fw(400), fontSize: 13, color: C.text, lineHeight: '18px', marginBottom: 6 }}>{p.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Icon name="star" size={12} color={C.textBody} />
                <span style={{ ...fw(400), fontSize: 12, color: C.textBody }}>{p.pts}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ProgressTab({ onMenuOpen, onWalletOpen, mode = 'advocate', onFlywheelOpen }) {
  const [subTab, setSubTab] = useState('Progress')
  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <TopNav onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} />
        <div style={{ padding: '0 16px 12px', display: 'flex', gap: 20 }}>
          {['Progress', 'Journey', 'Rewards'].map(t => (
            <motion.button key={t} whileTap={{ scale: 0.96 }} onClick={() => setSubTab(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 2px', ...fw(subTab === t ? 700 : 400), fontSize: 16, color: subTab === t ? C.text : C.textMuted, borderBottom: `2px solid ${subTab === t ? C.text : 'transparent'}` }}>{t}</motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {subTab === 'Progress'
          ? <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}><ProgressContent mode={mode} onFlywheelOpen={onFlywheelOpen} /></motion.div>
          : subTab === 'Journey'
          ? <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}><ActivityTimeline mode={mode} /></motion.div>
          : <motion.div key="rewards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}><RewardsContent /></motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

function RewardsTab({ mode, onMenuOpen, onWalletOpen }) {
  return <ProgressTab onMenuOpen={onMenuOpen} onWalletOpen={onWalletOpen} mode={mode} />
}

function AccountTab() {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ height: 63, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <span style={{ ...fw(400), fontSize: 18, color: C.text }}>Account</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar initial="L" size={52} />
          <div>
            <p style={{ ...fw(600), fontSize: 17, color: C.text, margin: 0 }}>Lea Fontaine</p>
            <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: 0 }}>lea@example.com</p>
          </div>
        </div>
        <div style={{ background: C.cardBg, borderRadius: 14, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, margin: '0 0 6px' }}>Membership tier</p>
            <Pill bg={C.cardBg}>Gold Member</Pill>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, margin: '0 0 2px' }}>Member since</p>
            <p style={{ ...fw(600), fontSize: 13, color: C.text, margin: 0 }}>April 2024</p>
          </div>
        </div>
        {['Notifications', 'Privacy', 'Help & Support', 'Sign out'].map((label, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${C.borderLight}` }}>
            <span style={{ ...fw(400), fontSize: 15, color: i === 3 ? 'rgba(200,50,50,0.85)' : C.text }}>{label}</span>
            {i < 3 && <Icon name="arrowRight" size={14} color={C.textMuted} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ManagerViewScreen({ onBack }) {
  const team = [
    { initial: 'L', name: 'Lea Fontaine',   posts: 14, pts: 680,  active: true  },
    { initial: 'S', name: 'Sofia Brennan',  posts: 11, pts: 540,  active: true  },
    { initial: 'P', name: 'Priya Nair',     posts: 8,  pts: 390,  active: true  },
    { initial: 'C', name: 'Chloe Nakamura', posts: 5,  pts: 210,  active: false },
    { initial: 'A', name: 'Amara Diallo',   posts: 9,  pts: 430,  active: true  },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: `1px solid ${C.borderLight}`, flexShrink: 0 }}>
        <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ width: 32, height: 32, border: `1px solid ${C.border}`, borderRadius: 12, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="arrowLeft" size={14} color={C.textBody} />
        </motion.button>
        <p style={{ ...fw(600), fontSize: 16, color: C.text, margin: 0 }}>Manager View</p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '16px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Total Posts',        value: '47'    },
            { label: 'Points Distributed', value: '2,400' },
            { label: 'Participation',      value: '78%'   },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: C.cardBg, borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
              <p style={{ ...fw(700), fontSize: 18, color: C.text, margin: '0 0 2px' }}>{s.value}</p>
              <p style={{ ...fw(400), fontSize: 10, color: C.textMuted, margin: 0, lineHeight: 1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <p style={{ ...fw(600), fontSize: 14, color: C.text, marginBottom: 10 }}>Your team</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {team.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 14px' }}>
              <Avatar initial={m.initial} size={36} />
              <div style={{ flex: 1 }}>
                <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: 0 }}>{m.name}</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{m.posts} posts · {m.pts} pts</p>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.active ? '#34c759' : C.borderLight }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ONBOARDING SCREENS ───────────────────────────────

function OnboardingCommunityScreen({ onNext }) {
  const [idx, setIdx] = useState(0)
  const cardW = 224
  const gap = 12
  const padL = 20

  const cards = [
    { initial: 'L', name: 'Lea Fontaine' },
    { initial: 'S', name: 'Sara Chen' },
    { initial: 'M', name: 'Maya Rivera' },
    { initial: 'J', name: 'Jade Torres' },
  ]

  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '72px 32px 32px', textAlign: 'center', flexShrink: 0 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, lineHeight: '32px', margin: '0 0 12px' }}>
          Show up for each other
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: C.textBody, lineHeight: '24px', margin: 0 }}>
          Everyone here creates for the same reason you do. Post yours and see what everyone else is creating.
        </p>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -((cards.length - 1) * (cardW + gap)), right: 0 }}
          dragElastic={0.12}
          animate={{ x: padL - idx * (cardW + gap) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && idx < cards.length - 1) setIdx(i => i + 1)
            else if (info.offset.x > 50 && idx > 0) setIdx(i => i - 1)
          }}
          style={{ display: 'flex', gap, position: 'absolute', top: 0, left: 0, cursor: 'grab', userSelect: 'none' }}
        >
          {cards.map((card, i) => (
            <div key={i} style={{ width: cardW, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.cardBg, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ ...fw(700), fontSize: 13, color: C.text }}>{card.initial}</span>
                </div>
                <span style={{ ...fw(400), fontSize: 14, color: C.text }}>{card.name}</span>
              </div>
              <div style={{ width: cardW, height: 300, borderRadius: 12, background: C.cardBg }} />
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '16px 0', flexShrink: 0 }}>
        {cards.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setIdx(i)}
            animate={{ width: i === idx ? 20 : 7, background: i === idx ? C.text : C.border }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{ height: 7, borderRadius: 4, cursor: 'pointer' }}
          />
        ))}
      </div>

      <div style={{ padding: '0 16px 48px', flexShrink: 0 }}>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  )
}

function OnboardingDisplayNameScreen({ firstName, onNext }) {
  const [name, setName] = useState(firstName || '')
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', margin: 0 }}>
          What should the community call you?
        </p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%', height: 52, borderRadius: 8,
            border: `1px solid ${name ? C.text : C.border}`,
            padding: '0 16px', ...fw(400), fontSize: 17,
            color: C.text, background: C.white, boxSizing: 'border-box',
            outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>
      <div style={{ paddingBottom: 52 }}>
        <PrimaryButton onClick={() => name.trim() && onNext(name.trim())} disabled={!name.trim()}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  )
}

function OnboardingMarkScreen({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2500)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line

  return (
    <div style={{ width: 390, height: 844, background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 40px', animation: 'ob-fade-up 0.65s 0.3s ease-out both' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={28} color={C.white} strokeWidth={2.5} />
        </div>
        <p style={{ ...fw(500), fontSize: 28, color: C.white, letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0 }}>
          You just made your mark.
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 240, margin: 0 }}>
          The community can see it. You'll hear back soon.
        </p>
      </div>
    </div>
  )
}

function OnboardingLandingScreen({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2500)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line

  return (
    <div style={{ width: 390, height: 844, animation: 'ob-bg-to-black 0.9s ease-out both', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 40px', animation: 'ob-fade-up 0.65s 0.3s ease-out both' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={28} color={C.white} strokeWidth={2.5} />
        </div>
        <p style={{ ...fw(500), fontSize: 28, color: C.white, letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0 }}>
          You're in.
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 220, margin: 0 }}>
          2,847 advocates are already here waiting to meet you.
        </p>
      </div>
    </div>
  )
}

const ONBOARDING_TIERS = [
  { n: 1, name: 'Advocate',   desc: 'Earn your first points and start discovering the platform.',                gift: '£10 gift card'  },
  { n: 2, name: 'Creator',    desc: 'Unlock exclusive challenges and start earning points and commission.',      gift: '£25 gift card'  },
  { n: 3, name: 'Champion',   desc: 'Earn commission on every sale and unlock early product access.',           gift: '£50 gift card'  },
  { n: 4, name: 'Ambassador', desc: 'Priority campaign placements and a dedicated brand contact.',              gift: '£100 gift card' },
  { n: 5, name: 'Icon',       desc: 'Invitation-only events and full brand ambassador status.',                 gift: '£250 gift card' },
]

function OnboardingFrequencyScreen({ onNext }) {
  const [selected, setSelected] = useState(null)
  const options = [
    "When inspiration strikes, I'm not on a schedule",
    'A couple of times a month',
    'Once a week feels right',
    'I want to be more active than that',
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 100, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 20, color: C.text, marginBottom: 28, lineHeight: '28px', textAlign: 'center' }}>How often can you show up?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {options.map((opt, i) => (
            <motion.button key={i}
              whileTap={{ scale: 0.985 }}
              onClick={() => setSelected(i)}
              style={{
                width: '100%', padding: 16, textAlign: 'left', borderRadius: 8,
                cursor: 'pointer',
                border: `${selected === i ? '1.5px' : '1px'} solid ${selected === i ? C.text : C.border}`,
                background: C.white, ...fw(400), fontSize: 16, color: C.text,
                fontFamily: 'inherit',
              }}>
              {opt}
            </motion.button>
          ))}
        </div>
        <PrimaryButton onClick={() => selected !== null && onNext()} disabled={selected === null}>
          Show me what's possible
        </PrimaryButton>
      </div>
    </div>
  )
}

function OnboardingTiersScreen({ onNext }) {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '36px 20px 20px' }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, lineHeight: '32px', marginBottom: 36 }}>
          You'll grow here. And there's always somewhere to go next.
        </p>
        {ONBOARDING_TIERS.map((tier, i) => (
          <div key={tier.n}>
            <div style={{
              border: `1px solid ${C.border}`, borderRadius: 12,
              padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              {/* Image placeholder */}
              <div style={{
                width: 76, height: 76, borderRadius: 8,
                background: C.cardBg, flexShrink: 0,
              }} />
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...fw(700), fontSize: 11, color: C.lime, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>
                  Tier {tier.n}
                </p>
                <p style={{ ...fw(700), fontSize: 17, color: C.text, marginBottom: 4, lineHeight: '23px' }}>
                  {tier.name}
                </p>
                <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, lineHeight: '18px', marginBottom: 10 }}>
                  {tier.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="gift" size={13} color={C.textMuted} />
                  <span style={{ ...fw(600), fontSize: 13, color: C.textBody }}>{tier.gift}</span>
                </div>
              </div>
            </div>
            {i < ONBOARDING_TIERS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                <Icon name="arrowDown" size={16} color={C.textFaint} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 20px 40px', flexShrink: 0, borderTop: `1px solid ${C.borderLight}` }}>
        <PrimaryButton onClick={onNext}>Continue →</PrimaryButton>
      </div>
    </div>
  )
}

function OnboardingNotificationsScreen({ onNext }) {
  const [showDialog, setShowDialog] = useState(false)
  const benefits = [
    ['replyIcon',     'Find out when American Eagle reshares your content'],
    ['messageSquare', 'Hear when your community replies to your posts'],
    ['gift',          'Get notified when you unlock something new.'],
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 52, overflow: 'hidden' }}>

        {/* Phone mockup + notification card */}
        <div style={{ position: 'relative', width: 210, marginBottom: 72, flexShrink: 0 }}>
          {/* Phone frame */}
          <div style={{ height: 256, borderRadius: 26, border: '8px solid #111', background: 'linear-gradient(160deg,#faeae4,#f0c8b8,#e0a090,#c88070)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))' }} />
          </div>
          {/* Notification card */}
          <div style={{
            position: 'absolute', bottom: -48, left: -28, right: -28,
            background: 'rgba(235,235,240,0.97)', borderRadius: 16, padding: '12px 14px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.13)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: C.text, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...fw(700), fontSize: 11, color: C.white, letterSpacing: '-0.3px' }}>{BRAND}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <span style={{ ...fw(700), fontSize: 12, color: '#111' }}>American Eagle</span>
                <span style={{ ...fw(400), fontSize: 11, color: '#888', marginLeft: 6, flexShrink: 0 }}>just now</span>
              </div>
              <p style={{ ...fw(400), fontSize: 13, color: '#333', lineHeight: '17px', margin: 0 }}>
                American Eagle just reshared your post to their story. 🎉
              </p>
            </div>
          </div>
        </div>

        {/* Heading + benefits */}
        <div style={{ padding: '0 28px', width: '100%' }}>
          <p style={{ ...fw(700), fontSize: 24, color: C.text, lineHeight: '32px', margin: '0 0 24px' }}>
            Know the moment it lands.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {benefits.map(([icon, text]) => (
              <div key={icon} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={icon} size={16} color={C.textBody} />
                </div>
                <span style={{ ...fw(400), fontSize: 15, color: C.textBody, lineHeight: '21px' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTAs */}
      <div style={{ padding: '0 20px 48px', flexShrink: 0 }}>
        <PrimaryButton onClick={() => setShowDialog(true)}>Turn on notifications</PrimaryButton>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          style={{ width: '100%', marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', ...fw(400), fontSize: 14, color: C.textMuted, fontFamily: 'inherit', padding: '4px 0' }}
        >
          I'll check back manually
        </motion.button>
      </div>

      {/* iOS system permission dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            key="ios-dialog"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              style={{ width: 270, background: 'rgba(242,242,247,0.99)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.32)' }}
            >
              <div style={{ padding: '20px 16px 16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 17, color: '#000', lineHeight: '22px', margin: '0 0 6px' }}>
                  "American Eagle" Would Like to Send You Notifications
                </p>
                <p style={{ fontFamily: 'inherit', fontWeight: 400, fontSize: 13, color: '#3c3c43', lineHeight: '18px', margin: 0 }}>
                  We'll notify you when a challenge drops, American Eagle reshares your content, or you unlock something new.
                </p>
              </div>
              <div style={{ height: 0.5, background: 'rgba(60,60,67,0.29)' }} />
              <div style={{ display: 'flex', height: 44 }}>
                <button onClick={onNext} style={{ flex: 1, background: 'none', border: 'none', borderRight: '0.5px solid rgba(60,60,67,0.29)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, fontWeight: 400, color: '#007AFF' }}>
                  Don't Allow
                </button>
                <button onClick={onNext} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, color: '#007AFF' }}>
                  Allow
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── CHALLENGE CREATION FLOW ───────────────────────────

function getSuggestions(text) {
  const t = text.toLowerCase()
  if (t.match(/coachella|festival|outdoor|stage|concert|music/)) return BC.studioSuggestions.festival
  if (t.match(/hoodie|sweater|fleece|top|tee|shirt|layer/))       return BC.studioSuggestions.tops
  if (t.match(/ootd|outfit|style|fashion|wear|look|fit/))         return BC.studioSuggestions.outfit
  if (t.match(/tutorial|how to|teach|beginner|step|guide|tips/))  return BC.studioSuggestions.tutorial
  if (t.match(/jean|denim|flare|slim|straight|baggy|mom jean/))   return BC.studioSuggestions.denim
  return BC.studioSuggestions.default
}

function ChallengeCreationScreen({ onBack }) {
  const [step, setStep] = useState(0)
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(0)
  const [caption, setCaption] = useState('')
  const [showSubmit, setShowSubmit] = useState(false)
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const suggestions = getSuggestions(idea)
  const challenge = suggestions[selected]

  const handleCreate = () => {
    if (!idea.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(1) }, 1600)
  }

  const goBack = () => {
    if (loading) { setLoading(false); return }
    step > 0 ? setStep(s => s - 1) : onBack()
  }

  const Header = ({ title }) => (
    <div style={{ height: 52, borderBottom: `1px solid ${C.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0, background: C.white }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={goBack} style={{ position: 'absolute', left: 12, width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={18} color={C.textBody} />
      </motion.button>
      <span style={{ ...fw(500), fontSize: 15, color: C.text }}>{title}</span>
    </div>
  )

  // ── Loading ──
  if (loading) return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header title="Create a challenge" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }} transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: C.text }} />
          ))}
        </div>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, textAlign: 'center' }}>Creating your challenges…</p>
      </div>
    </div>
  )

  // ── Step 0: Idea input ──
  if (step === 0) {
    const inspirationCards = [
      { title: 'Festival-Proof Fit',   desc: `Show us the ${BRAND} outfit that survives sun, sweat, and the second stage.` },
      { title: 'Morning OOTD',        desc: `Share your step-by-step ${BRAND} getting-dressed routine.` },
      { title: 'GRWM: My Way',        desc: `A full get-ready-with-me featuring your go-to ${BRAND} products.` },
    ]
    return (
      <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
        <Header title="Create a challenge" />
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '28px 20px 32px' }}>
          <p style={{ ...fw(700), fontSize: 22, color: C.text, lineHeight: '30px', margin: '0 0 8px' }}>
            Have an idea? Create your own challenge
          </p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, lineHeight: '20px', margin: '0 0 20px' }}>
            Describe what's on your mind. For best results, be specific.
          </p>
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Example: OOTD"
            style={{ width: '100%', height: 120, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 15, color: C.text, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: '22px', background: C.white, marginBottom: 14, display: 'block' }}
          />
          <div style={{ marginBottom: 32 }}>
            <PrimaryButton onClick={handleCreate} disabled={!idea.trim()}>+ Create</PrimaryButton>
          </div>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, margin: '0 0 14px' }}>Start inspired. With a few of these ideas.</p>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginInline: -20, paddingInline: 20, WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
            {inspirationCards.map((s, i) => (
              <div key={i} style={{ width: 160, flexShrink: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', background: C.white }}>
                <div style={{ height: 100, background: C.cardBg }} />
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <p style={{ ...fw(600), fontSize: 13, color: C.text, lineHeight: '17px', flex: 1, margin: '0 6px 0 0' }}>{s.title}</p>
                    <Icon name="heart" size={14} color={C.textMuted} />
                  </div>
                  <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, lineHeight: '15px', margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Step 1: AI suggestions horizontal scroll ──
  if (step === 1) return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header title="Create a challenge" />
      <div style={{ padding: '20px 16px 12px', flexShrink: 0 }}>
        <p style={{ ...fw(400), fontSize: 15, color: C.text, lineHeight: '22px', margin: 0 }}>"{idea}"</p>
      </div>
      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch', display: 'flex', gap: 12, paddingInline: 16, paddingBottom: 24, alignItems: 'flex-start' }}>
        {suggestions.map((s, i) => (
          <motion.button key={i} whileTap={{ scale: 0.97 }}
            onClick={() => { setSelected(i); setStep(2) }}
            style={{ width: 210, flexShrink: 0, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', background: C.white, textAlign: 'left', padding: 0, fontFamily: 'inherit' }}
          >
            <div style={{ height: 300, background: C.cardBg }} />
            <div style={{ padding: '12px 14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <p style={{ ...fw(600), fontSize: 14, color: C.text, lineHeight: '19px', flex: 1, margin: '0 8px 0 0' }}>{s.title}</p>
                <Icon name="heart" size={15} color={C.textMuted} />
              </div>
              <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, lineHeight: '17px', margin: 0 }}>{s.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )

  // ── Step 2: Content creation ──
  if (step === 2) return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <Header title={challenge.title} />
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 16px' }}>
        <div style={{ border: `1px dashed ${C.border}`, borderRadius: 14, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16, background: C.cardBg, cursor: 'pointer' }}>
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="19" x2="12" y2="5" stroke={C.textMuted} strokeWidth={1.5} strokeLinecap="round" />
            <polyline points="5,12 12,5 19,12" stroke={C.textMuted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <line x1="5" y1="19" x2="19" y2="19" stroke={C.textMuted} strokeWidth={1.5} strokeLinecap="round" />
          </svg>
          <span style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>Tap to add photo or video</span>
        </div>
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Caption"
          style={{ width: '100%', height: 72, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 15, color: C.text, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: '22px', background: C.white, display: 'block', marginBottom: 12 }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {['#americaneagle', '#aestyle', '#denimfit'].map(tag => (
            <span key={tag} style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>{tag}</span>
          ))}
        </div>

        {/* Suggested caption */}
        <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 16 }}>
          <p style={{ ...fw(600), fontSize: 12, color: C.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Suggested caption
          </p>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 14px 12px', background: C.cardBg }}>
            <p style={{ ...fw(400), fontSize: 13, color: C.textBody, lineHeight: '20px', margin: '0 0 12px', whiteSpace: 'pre-line', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {challenge.caption}
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setCaption(challenge.caption)}
              style={{ height: 30, padding: '0 14px', border: `1px solid ${caption === challenge.caption ? C.text : C.border}`, borderRadius: 20, background: caption === challenge.caption ? C.text : C.white, ...fw(600), fontSize: 12, color: caption === challenge.caption ? C.white : C.textBody, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {caption === challenge.caption ? 'Applied ✓' : 'Use this'}
            </motion.button>
          </div>
        </div>
      </div>
      <div style={{ flexShrink: 0, borderTop: `1px solid ${C.borderLight}`, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', background: C.white }}>
        <motion.button whileTap={{ scale: 0.96 }} style={{ flex: 1, height: 44, border: `1px solid ${C.border}`, borderRadius: 10, background: C.white, ...fw(500), fontSize: 14, color: C.textBody, cursor: 'pointer', fontFamily: 'inherit' }}>
          Save as draft
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowSubmit(true)} style={{ flex: 1, height: 44, border: `1px solid ${C.text}`, borderRadius: 10, background: C.text, ...fw(700), fontSize: 14, color: C.white, cursor: 'pointer', fontFamily: 'inherit' }}>
          Submit
        </motion.button>
      </div>

      <AnimatePresence>
        {showSubmit && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSubmit(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 10 }} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={spring} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 11, padding: '24px 16px 36px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
              <p style={{ ...fw(700), fontSize: 20, textAlign: 'center', color: C.text, margin: '0 0 4px' }}>Share Your Challenge</p>
              <p style={{ ...fw(400), fontSize: 14, textAlign: 'center', color: C.textMuted, margin: '0 0 24px' }}>{challenge.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>1</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: 0, lineHeight: '20px' }}>Include the required hashtag{'\n'}{BC.challengeDetail.hashtag}</p>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy} style={{ flexShrink: 0, height: 32, padding: '0 14px', border: `1px solid ${C.border}`, borderRadius: 8, background: copied ? C.text : C.white, ...fw(600), fontSize: 13, color: copied ? C.white : C.text, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s,color 0.2s' }}>
                      {copied ? 'Copied' : 'Copy'}
                    </motion.button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>2</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: '0 0 8px', lineHeight: '20px' }}>Tag products and share affiliate links to earn points and commission</p>
                    <div style={{ height: 40, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Icon name="search" size={14} color={C.textPlaceholder} />
                      <span style={{ ...fw(400), fontSize: 14, color: C.textPlaceholder, marginLeft: 8 }}>Start typing to search...</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ ...fw(600), fontSize: 12, color: C.textBody }}>3</span>
                  </div>
                  <p style={{ ...fw(700), fontSize: 14, color: C.text, margin: 0 }}>Share on Socials</p>
                </div>
              </div>
              <div style={{ height: 1, background: C.borderLight, marginBottom: 20 }} />
              <p style={{ ...fw(600), fontSize: 14, textAlign: 'center', color: C.textBody, margin: '0 0 16px' }}>Share on...</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                {[{ label: 'Instagram', abbr: 'IG' }, { label: 'TikTok', abbr: 'TT' }, { label: 'LTK', abbr: 'LTK' }, { label: 'YouTube', abbr: 'YT' }].map(({ label, abbr }) => (
                  <motion.button key={label} whileTap={{ scale: 0.92 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, border: `1px solid ${C.border}`, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ ...fw(700), fontSize: 11, color: C.text }}>{abbr}</span>
                    </div>
                    <span style={{ ...fw(400), fontSize: 12, color: C.textBody }}>{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )

  // ── Step 3: Suggestion review ──
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <Header title={challenge.title} />
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 16px' }}>
        <div style={{ width: '100%', height: 200, borderRadius: 12, background: C.cardBg, marginBottom: 16 }} />
        <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '22px', margin: '0 0 16px', whiteSpace: 'pre-line' }}>
          {challenge.caption}
        </p>
      </div>
      <div style={{ flexShrink: 0, borderTop: `1px solid ${C.borderLight}`, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', background: C.white }}>
        <motion.button whileTap={{ scale: 0.96 }} onClick={goBack} style={{ flex: 1, height: 44, border: `1px solid ${C.border}`, borderRadius: 10, background: C.white, ...fw(500), fontSize: 14, color: C.textBody, cursor: 'pointer', fontFamily: 'inherit' }}>
          Skip
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onBack} style={{ flex: 1, height: 44, border: `1px solid ${C.text}`, borderRadius: 10, background: C.text, ...fw(700), fontSize: 14, color: C.white, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Apply <Icon name="check" size={14} color={C.white} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  )
}

// ── SIDE DRAWER ───────────────────────────────────────

function SideDrawer({ onClose, photo }) {
  const [copied, setCopied] = useState(false)
  const referralCode = 'DEMOA9HINQ'
  const menuItems = [
    { icon: 'sliders', label: 'Settings and Privacy' },
    { icon: 'help',    label: 'Get Help' },
  ]
  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(referralCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)' }}
    >
      <motion.div
        initial={{ x: -334 }} animate={{ x: 0 }} exit={{ x: -334 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 334, background: C.white, borderTopRightRadius: 12, borderBottomRightRadius: 12, display: 'flex', flexDirection: 'column' }}
      >
        {/* User header */}
        <div style={{ padding: '48px 20px 24px', borderBottom: `1px solid ${C.borderLight}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initial="Z" size={48} photo={photo} />
            <div>
              <p style={{ ...fw(600), fontSize: 16, color: C.text, marginBottom: 2 }}>Zara Ahmed</p>
              <p style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>Gold member</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div style={{ flex: 1, padding: '8px 0' }}>
          {menuItems.map(({ icon, label }) => (
            <motion.button key={label} whileTap={{ scale: 0.98 }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', background: 'none', border: 'none', borderBottom: `1px solid ${C.borderLight}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <Icon name={icon} size={18} color={C.textBody} />
              <span style={{ ...fw(400), fontSize: 15, color: C.text }}>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Referral section */}
        <div style={{ padding: '20px 20px 40px', borderTop: `1px solid ${C.borderLight}` }}>
          <p style={{ ...fw(700), fontSize: 14, color: C.text, marginBottom: 4 }}>Invite Advocates and Earn 50 Credits</p>
          <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, lineHeight: '18px', marginBottom: 14 }}>You'll earn 50 credits for every advocate that joins with your code and gets approved.</p>
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ flex: 1, padding: '10px 14px' }}>
              <p style={{ ...fw(400), fontSize: 11, color: C.textMuted, marginBottom: 2, letterSpacing: '0.02em' }}>Referral Code</p>
              <p style={{ ...fw(700), fontSize: 15, color: C.text, letterSpacing: '0.04em' }}>{referralCode}</p>
            </div>
            <motion.button whileTap={{ scale: 0.92 }} onClick={handleCopy}
              style={{ width: 52, alignSelf: 'stretch', background: copied ? C.text : C.cardBg, border: 'none', borderLeft: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
              <Icon name={copied ? 'check' : 'copy'} size={16} color={copied ? C.white : C.textBody} strokeWidth={copied ? 2.5 : 1.8} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── INTRO SHEET ───────────────────────────────────────

function IntroSheet({ onSetProfilePhoto, onPost }) {
  const [sentence, setSentence] = useState('')
  const [localPhoto, setLocalPhoto] = useState(null)
  const fileRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setLocalPhoto(ev.target.result)
      onSetProfilePhoto(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
      <p style={{ ...fw(700), fontSize: 20, color: C.text, lineHeight: '28px', margin: '0 0 20px' }}>
        One last thing — this one's for the community, not us.
      </p>
      <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: '0 0 8px' }}>Finish this:</p>
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '22px', margin: '0 0 8px' }}>
          The first {BRAND} product I ever tried was
        </p>
        <input
          value={sentence}
          onChange={e => setSentence(e.target.value)}
          placeholder="the Crossover Flare Jean..."
          style={{ width: '100%', border: 'none', borderBottom: `1px solid ${C.border}`, padding: '4px 0', fontSize: 14, color: C.text, fontFamily: 'inherit', background: 'transparent', outline: 'none', marginBottom: 8, display: 'block', boxSizing: 'border-box' }}
        />
        <p style={{ ...fw(400), fontSize: 14, color: C.textBody, lineHeight: '22px', margin: 0 }}>
          and I've never looked back.
        </p>
      </div>
      <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => fileRef.current?.click()}
        style={{ width: '100%', height: 84, border: `1px dashed ${localPhoto ? 'transparent' : C.border}`, borderRadius: 10, background: localPhoto ? 'transparent' : C.cardBg, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontFamily: 'inherit', position: 'relative' }}
      >
        {localPhoto
          ? <img src={localPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ ...fw(400), fontSize: 13, color: C.textMuted, textAlign: 'center', padding: '0 24px', lineHeight: '20px' }}>Add a photo with your favourite {BRAND} product — or just a selfie</span>
        }
      </motion.button>
      <PrimaryButton onClick={() => onPost(sentence)}>Post now</PrimaryButton>
    </>
  )
}

// ── POINT EARNINGS SCREEN ─────────────────────────────

function PointEarningsScreen({ onBack }) {
  const [period, setPeriod] = useState('30d')

  const PERIODS = [
    { key: '7d',  label: '7 days'  },
    { key: '30d', label: '30 days' },
    { key: '90d', label: '90 days' },
    { key: 'all', label: 'All time' },
  ]

  const SECTIONS = [
    {
      key: 'completions',
      title: 'Challenge Completions',
      totalValue: '345 points',
      totalDelta: '+24.5%',
      rows: [
        { icon: 'flag',  label: 'Challenge Completions', value: '12' },
      ],
      cta: 'See Completed Challenges',
    },
    {
      key: 'performance',
      title: 'Challenge Performance',
      totalValue: '150 points',
      totalDelta: '+18.2%',
      rows: [
        { icon: 'video', label: 'Post Views',  value: '7,593' },
        { icon: 'heart', label: 'Engagement',  value: '7,593' },
      ],
      cta: 'See Challenge Performance',
    },
    {
      key: 'storefront',
      title: 'Storefront',
      totalValue: '150 points',
      totalDelta: '+11.0%',
      rows: [
        { icon: 'package', label: 'Products Sold',    value: '75' },
        { icon: 'search',  label: 'Storefront Views', value: '7,593' },
      ],
      cta: 'See Top Selling Content',
    },
    {
      key: 'referrals',
      title: 'Referrals',
      totalValue: '150 points',
      totalDelta: '+32.1%',
      rows: [
        { icon: 'users', label: 'Signups', value: '5' },
      ],
      cta: 'See Referrals',
    },
    {
      key: 'affiliate',
      title: 'Affiliate Link Earnings',
      totalValue: '150 points',
      totalDelta: '+9.7%',
      rows: [
        { icon: 'package', label: 'Products Sold', value: '75' },
        { icon: 'link',    label: 'Link Clicks',   value: '4,800' },
      ],
      cta: null,
    },
  ]

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ position: 'absolute', inset: 0, background: C.white, zIndex: 30, display: 'flex', flexDirection: 'column' }}
    >
      {/* Sticky header: title row + period picker row */}
      <div style={{ flexShrink: 0, background: C.white, borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', left: 12, width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={18} color={C.textBody} />
          </motion.button>
          <span style={{ ...fw(400), fontSize: 16, color: C.text }}>Point Earnings</span>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px' }}>
          {PERIODS.map(p => (
            <motion.button key={p.key} whileTap={{ scale: 0.94 }} onClick={() => setPeriod(p.key)}
              style={{ height: 30, padding: '0 14px', borderRadius: 20, border: `1px solid ${period === p.key ? C.text : C.border}`, background: period === p.key ? C.text : 'transparent', ...fw(period === p.key ? 600 : 400), fontSize: 13, color: period === p.key ? C.white : C.textBody, cursor: 'pointer', fontFamily: 'inherit' }}>
              {p.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 16px 44px' }}>

        {/* Summary card */}
        <div style={{ background: C.cardBg, borderRadius: 12, padding: 16, marginBottom: 28 }}>
          <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: '0 0 6px' }}>Total earned this period</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ ...fw(700), fontSize: 32, color: C.text, lineHeight: 1, letterSpacing: '-0.5px' }}>1,234</span>
            <span style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>points</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ ...fw(600), fontSize: 13, color: '#22c55e' }}>+24.5%</span>
            <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>·</span>
            <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>$617.00</span>
          </div>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.key} style={{ marginBottom: 28 }}>
            <p style={{ ...fw(600), fontSize: 16, color: C.text, margin: '0 0 14px' }}>{section.title}</p>

            <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              {/* Total row — highlighted */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', gap: 10, background: C.cardBg }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="starFilled" size={14} color={C.textBody} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: 0 }}>Total earnings</p>
                  <p style={{ ...fw(500), fontSize: 11, color: '#22c55e', margin: 0 }}>{section.totalDelta}</p>
                </div>
                <span style={{ ...fw(700), fontSize: 16, color: C.text, flexShrink: 0 }}>{section.totalValue}</span>
              </div>

              {/* Metric rows — no delta */}
              {section.rows.map((row, i) => (
                <div key={i}>
                  <div style={{ height: 1, background: C.borderLight }} />
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={row.icon} size={14} color={C.textBody} />
                    </div>
                    <p style={{ ...fw(400), fontSize: 14, color: C.text, margin: 0, flex: 1 }}>{row.label}</p>
                    <span style={{ ...fw(600), fontSize: 16, color: C.text, flexShrink: 0 }}>{row.value}</span>
                  </div>
                </div>
              ))}

              {/* CTA row — heavier separator to distinguish from data rows */}
              {section.cta && (
                <>
                  <div style={{ height: 1, background: C.border }} />
                  <motion.button whileTap={{ scale: 0.98 }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <span style={{ ...fw(600), fontSize: 14, color: C.text }}>{section.cta}</span>
                    <Icon name="arrowRight" size={16} color={C.textMuted} />
                  </motion.button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── WALLET BOTTOM SHEET ───────────────────────────────

function WalletBottomSheet({ onClose, onSeeAllEarnings, mode = 'advocate' }) {
  const earningRows = mode === 'loyalty'
    ? [
        { icon: 'package',     label: 'Purchases',      sub: '4 orders',               amount: '60.00'  },
        { icon: 'pencilRuler', label: 'Reviews',        sub: '3 product reviews',       amount: '75.00'  },
        { icon: 'gift',        label: 'Birthday Bonus', sub: 'April 2026',              amount: '200.00' },
        { icon: 'users',       label: 'Referrals',      sub: '1 friend joined',         amount: '100.00' },
      ]
    : mode === 'employee'
    ? [
        { icon: 'flag',    label: 'Challenges & Social',  sub: '2 posts approved · 5,145 views', amount: '200.00' },
        { icon: 'package', label: 'Purchases',            sub: '3 purchases',                    amount: '45.00'  },
        { icon: 'users',   label: 'Referrals',            sub: '2 referrals',                    amount: '100.00' },
        { icon: 'gift',    label: 'Participation Bonus',  sub: 'June 2026 · active member',      amount: '50.00'  },
      ]
    : [
        { icon: 'flag',    label: 'Challenges & Social',   sub: '2 posts approved · 5,145 views', amount: '200.00' },
        { icon: 'store',   label: 'Storefront & Affiliate', sub: '13 storefront · 2 affiliate',   amount: '132.40' },
        { icon: 'package', label: 'Purchases',              sub: '3 purchases',                   amount: '45.00'  },
        { icon: 'users',   label: 'Referrals',             sub: '2 referrals',                    amount: '100.00' },
        { icon: 'gift',    label: 'Active Member Bonus',   sub: 'June 2026 · active member',      amount: '50.00'  },
      ]
  const actionButtons = mode === 'loyalty'
    ? [
        { symbol: '+',  label: 'Redeem for Rewards', sub: '435 pts available' },
        { symbol: '🛍', label: 'Shop with Points',   sub: '$217.50 value' },
      ]
    : mode === 'employee'
    ? [
        { symbol: '+',  label: 'Redeem for Perks',   sub: '395 pts available' },
        { symbol: '🎁', label: 'Gift a Colleague',   sub: 'Send points as a gift' },
      ]
    : [
        { symbol: '+', label: 'Redeem as Store Credit', sub: '$617.00' },
        { symbol: '$', label: 'Cash Out to Bank',       sub: '$617.00' },
      ]
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 20 }}
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={spring}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', zIndex: 21, maxHeight: '90%', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ flexShrink: 0, padding: '12px 16px 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, marginBottom: 8 }}>Your Points</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
              <Icon name="star" size={26} color={C.text} />
              <span style={{ ...fw(700), fontSize: 48, color: C.text, lineHeight: 1, letterSpacing: '-1px' }}>1,234</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <span style={{ ...fw(400), fontSize: 15, color: C.textMuted }}>$617.00</span>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...fw(700), fontSize: 10, color: C.textMuted, lineHeight: 1 }}>i</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 16px 44px' }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px 4px' }}>
              <p style={{ ...fw(600), fontSize: 15, color: C.text, margin: 0 }}>How You Earned This</p>
            </div>
            {earningRows.map((row, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={row.icon} size={16} color={C.textBody} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ ...fw(600), fontSize: 14, color: C.text, margin: 0 }}>{row.label}</p>
                    <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, margin: 0 }}>{row.sub}</p>
                  </div>
                  <span style={{ ...fw(700), fontSize: 16, color: C.text, flexShrink: 0 }}>{row.amount}</span>
                </div>
                <div style={{ height: 1, background: C.borderLight, marginLeft: 66 }} />
              </div>
            ))}
            <motion.button whileTap={{ scale: 0.98 }} onClick={onSeeAllEarnings} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <span style={{ ...fw(600), fontSize: 14, color: C.text }}>See all earnings</span>
              <Icon name="arrowRight" size={16} color={C.textMuted} />
            </motion.button>
          </div>
          {actionButtons.map((action, i) => (
            <motion.button key={i} whileTap={{ scale: 0.98 }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1px solid ${C.border}`, borderRadius: 14, background: C.white, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ ...fw(700), fontSize: 20, color: C.white, lineHeight: 1 }}>{action.symbol}</span>
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ ...fw(700), fontSize: 15, color: C.text, margin: '0 0 2px' }}>{action.label}</p>
                <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, margin: 0 }}>{action.sub}</p>
              </div>
              <Icon name="arrowRight" size={16} color={C.textMuted} />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  )
}

// ── HOME SCREEN ───────────────────────────────────────

function HomeScreen({ activeTab, onTabChange, onChallengeOpen, onGroupChallengeOpen, onChallengeCreate, onContentAnalyse, onRemix, profilePhoto, onSetProfilePhoto, showIntroSheet, onIntroPost, userPost, milestoneOpen, onMilestoneClose, mode = 'advocate' }) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [earningsOpen, setEarningsOpen] = useState(false)
  const [openAdvocate, setOpenAdvocate] = useState(null)
  const [openReply, setOpenReply] = useState(null)
  const [openCommunityRemix, setOpenCommunityRemix] = useState(null)
  const [recognitionOpen, setRecognitionOpen] = useState(false)
  const [savedRemixes, setSavedRemixes] = useState([])
  const [flywheelOpen, setFlywheelOpen] = useState(false)
  const openMenu = () => setMenuOpen(true)
  const openWallet = () => setWalletOpen(true)
  const renderTab = () => {
    switch (activeTab) {
      case 'feed':        return <FeedTab onMenuOpen={openMenu} onWalletOpen={openWallet} photo={profilePhoto} userPost={userPost} onTabChange={onTabChange} onFlywheelOpen={() => setFlywheelOpen(true)} mode={mode} />
      case 'challenges':  return <ChallengesTab onFilterOpen={() => setFilterOpen(true)} onMenuOpen={openMenu} onWalletOpen={openWallet} onChallengeOpen={onChallengeOpen} onGroupChallengeOpen={onGroupChallengeOpen} mode={mode} />
      case 'community':   return <CommunityTab onMenuOpen={openMenu} onWalletOpen={openWallet} onAdvocateOpen={setOpenAdvocate} onReplyOpen={setOpenReply} onRemixOpen={setOpenCommunityRemix} onRecognitionOpen={() => setRecognitionOpen(true)} mode={mode} />
      case 'studio':      return <StudioTab onMenuOpen={openMenu} onWalletOpen={openWallet} onChallengeCreate={onChallengeCreate} onContentAnalyse={onContentAnalyse} onRemix={onRemix} savedRemixes={savedRemixes} />
      case 'progress':    return <ProgressTab onMenuOpen={openMenu} onWalletOpen={openWallet} mode={mode} onFlywheelOpen={() => setFlywheelOpen(true)} />
      case 'rewards':     return <RewardsTab mode={mode} onMenuOpen={openMenu} onWalletOpen={openWallet} />
      case 'account':     return <AccountTab mode={mode} />
      default:            return null
    }
  }
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ height: 63, background: C.white, borderTop: `1px solid ${C.borderLight}`, flexShrink: 0 }}>
        <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
          {TABS_BY_MODE[mode].map(tab => {
            const active = activeTab === tab.id
            return (
              <motion.button key={tab.id} whileTap={{ scale: 0.88 }} onClick={() => onTabChange(tab.id)} style={{ flex: 1, height: 48, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <Icon name={tab.icon} size={18} color={active ? C.text : C.textMuted} strokeWidth={active ? 2 : 1.5} />
                <span style={{ ...fw(active ? 600 : 400), fontSize: 10, color: active ? C.text : C.textSecondary }}>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
        <div style={{ height: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 108, height: 4, background: 'rgba(66,66,66,0.14)', borderRadius: 2 }} />
        </div>
      </div>
      <AnimatePresence>
        {filterOpen && <ChallengesFilterPanel onClose={() => setFilterOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {openAdvocate && <AdvocateProfileSheet advocate={openAdvocate} onClose={() => setOpenAdvocate(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {openReply && <ReplySheet post={openReply} onClose={() => setOpenReply(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {openCommunityRemix && <CommunityRemixSheet post={openCommunityRemix} onClose={() => setOpenCommunityRemix(null)} savedRemixes={savedRemixes} onSave={r => setSavedRemixes(prev => [...prev, r])} />}
      </AnimatePresence>
      <AnimatePresence>
        {flywheelOpen && <FlywheelSheet onClose={() => setFlywheelOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && <SideDrawer onClose={() => setMenuOpen(false)} photo={profilePhoto} />}
      </AnimatePresence>
      <AnimatePresence>
        {recognitionOpen && <RecognitionSheet onClose={() => setRecognitionOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {walletOpen && <WalletBottomSheet onClose={() => setWalletOpen(false)} onSeeAllEarnings={() => { setWalletOpen(false); setEarningsOpen(true) }} mode={mode} />}
      </AnimatePresence>
      <AnimatePresence>
        {earningsOpen && <PointEarningsScreen onBack={() => setEarningsOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {milestoneOpen && (
          <motion.div key="milestone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
            <MilestoneCelebrationOverlay name="Zara" yearsCount={2} onClose={onMilestoneClose} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showIntroSheet && (
          <div key="intro" style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={spring}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', padding: '24px 20px 44px', boxShadow: '0 -8px 40px rgba(0,0,0,0.12)' }}
            >
              <IntroSheet onSetProfilePhoto={onSetProfilePhoto} onPost={onIntroPost} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── SIGN UP SCREENS ───────────────────────────────────

const SU_STEPS = [
  { label: 'Basic Info', icon: 'person' },
  { label: 'Details',    icon: 'listLines' },
  { label: 'Socials',    icon: 'grid4' },
]

function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      {SU_STEPS.map((step, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending'
        const active = state !== 'pending'
        return (
          <>
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 80 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: active ? C.text : 'rgba(66,66,66,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state === 'done'
                  ? <Icon name="check" size={18} color={C.white} strokeWidth={2.5} />
                  : <Icon name={step.icon} size={20} color={active ? C.white : 'rgba(66,66,66,0.35)'} />
                }
              </div>
              <span style={{ fontSize: 12, fontWeight: state === 'active' ? 700 : 400, color: state === 'active' ? C.text : C.textMuted }}>{step.label}</span>
            </div>
            {i < SU_STEPS.length - 1 && (
              <div style={{ width: 49, height: 1, backgroundColor: C.border, marginTop: 22, flexShrink: 0 }} />
            )}
          </>
        )
      })}
    </div>
  )
}

function TermsFooter() {
  return (
    <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontSize: 13, color: C.textMuted, textDecoration: 'underline', cursor: 'pointer' }}>Terms</span>
      <span style={{ fontSize: 13, color: C.textMuted, textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
    </div>
  )
}

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  )
}
function YtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function TwitchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"/><line x1="11" y1="7" x2="11" y2="11"/><line x1="16" y1="7" x2="16" y2="11"/>
    </svg>
  )
}
function FbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function MetaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 12c0-2.8 1.6-5 3.2-5 1.1 0 2.1 1 3.3 3.5 1.2-2.5 2.2-3.5 3.3-3.5 1.6 0 3.2 2.2 3.2 5s-1.6 5-3.2 5c-1.1 0-2.1-1-3.3-3.5-1.2 2.5-2.2 3.5-3.3 3.5-1.6 0-3.2-2.2-3.2-5z" fill="#0866FF"/>
    </svg>
  )
}

function SocialInput({ label, required, placeholder, icon, value, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ ...fw(500), fontSize: 13, color: C.textBody }}>{label}</span>
        {!required && <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>Optional</span>}
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.textMuted, display: 'flex' }}>{icon}</div>
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: '100%', height: 48, borderRadius: 4, border: `1px solid ${C.border}`, padding: '0 16px 0 40px', fontSize: 14, color: C.text, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', backgroundColor: C.white }} />
      </div>
    </div>
  )
}

function SignupFooter() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 118, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 12, gap: 3 }}>
      <span style={{ ...fw(400), fontSize: 10, color: C.textMuted }}>Powered by</span>
      <span style={{ ...fw(900), fontSize: 21, color: C.text, letterSpacing: '-0.02em', lineHeight: 1 }}>duel.</span>
      <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: '18px', padding: '6px 40px 0' }}>
        By continuing, I confirm I am 18 or older and accept the{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms</span>{' '}and{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
      </p>
    </div>
  )
}

function SignupLogoArea({ top = 85 }) {
  return (
    <div style={{ position: 'absolute', top, left: '50%', transform: 'translateX(-50%)', width: 160, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={BRAND_LOGO} alt={BRAND} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>
  )
}

function SignupMotivationScreen({ onNext }) {
  const [selected, setSelected] = useState(null)
  const options = [
    '{`I genuinely love ${BRAND}`}',
    'I want to grow my content',
    'I want to be part of something bigger',
    'A friend told me about this',
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <SignupLogoArea />
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, marginBottom: 28, lineHeight: '32px' }}>What brought you here?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {options.map((opt, i) => (
            <motion.button key={i}
              whileTap={{ scale: 0.985 }}
              onClick={() => setSelected(i)}
              style={{
                width: '100%', padding: '16px', textAlign: 'left', borderRadius: 8,
                cursor: 'pointer',
                border: `${selected === i ? '1.5px' : '1px'} solid ${selected === i ? C.text : C.border}`,
                background: C.white, ...fw(400), fontSize: 15, color: C.text,
                fontFamily: 'inherit',
              }}>
              {opt}
            </motion.button>
          ))}
        </div>
        <PrimaryButton onClick={() => selected !== null && onNext(selected)} disabled={selected === null}>
          Show me what's possible
        </PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function SignupBenefitsScreen({ onNext }) {
  const benefits = [
    { title: 'Be seen, not just followed', sub: 'Complete challenges and create content that reaches American Eagle, not just your feed.' },
    { title: 'Unlock earning as you grow', sub: 'The American Eagle team reviews your content — and can reshare, reward, or reach out.' },
    { title: 'Points, commissions, and gift cards.', sub: 'Rewards that grow the more you share.' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <SignupLogoArea />
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, marginBottom: 6, lineHeight: '32px', textAlign: 'center' }}>
          Share what you love. Get rewarded.
        </p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 28, textAlign: 'center' }}>
          Create content that counts
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 4 }}>{b.title}</p>
                <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, lineHeight: '20px' }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>Apply now</PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function SignupBenefitsGrowthScreen({ onNext, onBack }) {
  const benefits = [
    { title: 'Real social proof',        sub: `${BRAND} reshares the content you're already making.` },
    { title: 'Watch your reach grow',    sub: 'Every post, tracked. Every result, yours to keep.' },
    { title: 'An audience that trusts you', sub: 'Because you\'re recommending something you actually love.' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <SignupLogoArea />
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={20} color={C.text} />
      </motion.button>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, marginBottom: 28, lineHeight: '32px' }}>
          Here's how {BRAND} helps you grow.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 4 }}>{b.title}</p>
                <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, lineHeight: '20px' }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function SignupBenefitsCommunityScreen({ onNext, onBack }) {
  const benefits = [
    { title: 'A community that gets it',       sub: `Meet advocates who love ${BRAND} as much as you do — and show up for each other.` },
    { title: 'Moments worth being part of',    sub: 'Events, launches, and experiences built for the people who care most.' },
    { title: 'Your voice, amplified',          sub: `When you speak, ${BRAND} listens — and so does everyone else in here.` },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <SignupLogoArea />
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={20} color={C.text} />
      </motion.button>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, marginBottom: 28, lineHeight: '32px' }}>
          You'll find your people here.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 4 }}>{b.title}</p>
                <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, lineHeight: '20px' }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function SignupBenefitsFriendScreen({ onNext, onBack }) {
  const benefits = [
    { title: 'See what your friend already knows', sub: 'This is what it looks like when a brand actually values the people who love it.' },
    { title: 'Join them in here',                  sub: 'Your friend is already part of this community — now you can be too.' },
    { title: 'And bring others when you\'re ready', sub: 'The best things spread person to person. You\'ll see why.' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <SignupLogoArea />
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={20} color={C.text} />
      </motion.button>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, marginBottom: 28, lineHeight: '32px' }}>
          Your friend knew what they were doing.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ ...fw(700), fontSize: 15, color: C.text, marginBottom: 4 }}>{b.title}</p>
                <p style={{ ...fw(400), fontSize: 14, color: C.textSecondary, lineHeight: '20px' }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
      <SignupFooter />
    </div>
  )
}

function SignupRequirementsScreen({ onNext, onBack }) {
  const requirements = [
    'Based in the UK, US, or Europe',
    '18 years or older',
    'Public profile on at least one platform',
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={20} color={C.text} />
      </motion.button>
      <div style={{ position: 'absolute', top: 116, left: 24, right: 24 }}>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', marginBottom: 8 }}>Before you start</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 36 }}>You'll need to meet these requirements to join.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 44 }}>
          {requirements.map((req, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={14} color={C.white} strokeWidth={2.5} />
              </div>
              <span style={{ ...fw(400), fontSize: 16, color: C.text, lineHeight: '22px' }}>{req}</span>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>I meet all of these</PrimaryButton>
        <motion.button whileTap={{ scale: 0.96 }} onClick={onBack}
          style={{ width: '100%', marginTop: 18, background: 'none', border: 'none', cursor: 'pointer', ...fw(400), fontSize: 14, color: C.textMuted, fontFamily: 'inherit', padding: '4px 0', textDecoration: 'underline' }}>
          I don't meet these requirements
        </motion.button>
      </div>
    </div>
  )
}

function SignupSSOScreen({ onNext, onBack }) {
  const [email, setEmail] = useState('')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const ssoOptions = [
    { label: 'Continue with Google', icon: <GoogleIcon /> },
    { label: 'Continue with TikTok', icon: <TikTokIcon /> },
    { label: 'Continue with Meta',   icon: <MetaIcon /> },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <motion.button whileTap={{ scale: 0.88 }} onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={20} color={C.text} />
      </motion.button>
      <div style={{ position: 'absolute', top: 116, left: 24, right: 24 }}>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', marginBottom: 8 }}>Create your account</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 32 }}>Choose how you'd like to sign up. Takes about 2 minutes.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {ssoOptions.map(({ label, icon }) => (
            <motion.button key={label} whileTap={{ scale: 0.97 }} onClick={() => onNext('')}
              style={{ width: '100%', height: BTN.height, border: `1px solid ${C.border}`, borderRadius: BTN.radius, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', ...fw(600), fontSize: BTN.fontSize, color: C.text }}>
              {icon}
              {label}
            </motion.button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>or</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
          style={{ width: '100%', height: BTN.height, borderRadius: BTN.radius, border: `1px solid ${email ? C.text : C.border}`, padding: '0 16px', ...fw(400), fontSize: 15, color: C.text, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', marginBottom: 12 }} />
        <PrimaryButton onClick={() => valid && onNext(email)} disabled={!valid}>Continue with email</PrimaryButton>
      </div>
      <TermsFooter />
    </div>
  )
}

function SignupBasicInfoScreen({ onNext }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const valid = firstName.trim() && lastName.trim()
  const inp = { height: 48, borderRadius: 4, border: `1px solid ${C.border}`, fontSize: 14, color: C.text, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', backgroundColor: C.white }
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 84, left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 55px' }}>
        <StepBar current={0} />
      </div>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...fw(400), fontSize: 22, color: C.text, marginBottom: 6, lineHeight: '30px' }}>First, tell us who you are</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>Step 1 of 3</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ ...inp, flex: 1, padding: '0 12px' }} />
              <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} style={{ ...inp, flex: 1, padding: '0 12px' }} />
            </div>
            <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>Use your legal name. You can add a preferred name later.</p>
          </div>
          <PrimaryButton onClick={() => valid && onNext({ firstName, lastName })} disabled={!valid}>Continue to Details</PrimaryButton>
        </div>
      </div>
      <TermsFooter />
    </div>
  )
}

function SignupDetailsScreen({ onNext }) {
  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')
  const [product, setProduct] = useState('')
  const valid = dob.trim() && country
  const inp = { width: '100%', height: 48, borderRadius: 4, border: `1px solid ${C.border}`, padding: '0 16px', fontSize: 14, color: C.text, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', backgroundColor: C.white }
  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 84, left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 55px' }}>
        <StepBar current={1} />
      </div>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...fw(400), fontSize: 22, color: C.text, marginBottom: 6, lineHeight: '30px' }}>A few more details</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>Tell us a few more things so we have the right info.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...fw(500), fontSize: 13, color: C.textBody }}>Date of birth</span>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inp} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...fw(500), fontSize: 13, color: C.textBody }}>Country</span>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Icon name="globe" size={16} color={C.textMuted} />
              </div>
              <select value={country} onChange={e => setCountry(e.target.value)}
                style={{ ...inp, padding: '0 36px 0 38px', color: country ? C.text : 'rgba(66,66,66,0.4)', appearance: 'none', cursor: 'pointer' }}>
                <option value="" disabled>Select your country</option>
                {['United Kingdom','United States','Australia','Canada','France','Germany','Italy','Spain','Netherlands','Sweden'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Icon name="chevronDown" size={16} color={C.textMuted} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...fw(500), fontSize: 13, color: C.textBody }}>What's your most loved product?</span>
            <input placeholder="e.g. The SPF serum — I use it every morning" value={product} onChange={e => setProduct(e.target.value)} style={inp} />
          </div>
          <PrimaryButton onClick={() => valid && onNext()} disabled={!valid}>Continue to Socials</PrimaryButton>
        </div>
      </div>
      <TermsFooter />
    </div>
  )
}

const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: <IgIcon />,     required: true,  handle: '@sarah_j'      },
  { key: 'tiktok',    label: 'TikTok',    icon: <TikTokIcon />, required: false, handle: '@yourhandle'   },
  { key: 'youtube',   label: 'YouTube',   icon: <YtIcon />,     required: false, handle: '@yourchannel'  },
  { key: 'facebook',  label: 'Facebook',  icon: <FbIcon />,     required: false, handle: '@yourprofile'  },
]

function SignupSocialsScreen({ onNext }) {
  const [handles, setHandles] = useState({})
  const toggle = (key, handle) =>
    setHandles(prev => ({ ...prev, [key]: prev[key] ? null : handle }))
  const valid = !!handles.instagram

  return (
    <div style={{ width: 390, height: 844, background: C.white, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 84, left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 55px' }}>
        <StepBar current={2} />
      </div>
      <div style={{ position: 'absolute', top: 192, left: 16, right: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...fw(400), fontSize: 22, color: C.text, marginBottom: 6, lineHeight: '30px' }}>Connect your Socials</p>
          <p style={{ ...fw(400), fontSize: 14, color: C.textMuted }}>Connect at least one profile so we can see your content</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {SOCIAL_PLATFORMS.map(p => {
            const connected = !!handles[p.key]
            return (
              <div key={p.key} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: 8,
                border: `1px solid ${C.border}`, background: C.white,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'flex', color: C.text }}>{p.icon}</span>
                  <span style={{ ...fw(500), fontSize: 15, color: C.text }}>{p.label}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => toggle(p.key, p.handle)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: connected ? C.cardBg : C.white,
                    cursor: 'pointer',
                    ...fw(500), fontSize: 13, color: C.text,
                    flexShrink: 0,
                  }}
                >
                  <span>{connected ? handles[p.key] : 'Connect'}</span>
                  <Icon name={connected ? 'unlink' : 'link'} size={13} color={C.textMuted} />
                </motion.button>
              </div>
            )
          })}
        </div>
        <PrimaryButton onClick={() => valid && onNext()} disabled={!valid}>Submit application</PrimaryButton>
      </div>
      <TermsFooter />
    </div>
  )
}

function SignupInboxScreen({ email, onOpenEmail }) {
  const [sent, setSent] = useState(false)
  const handleResend = () => { setSent(true); setTimeout(() => setSent(false), 2500) }
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', textAlign: 'center', width: '100%' }}>
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Icon name="mail" size={20} color={C.textBody} />
        </motion.div>
        <p style={{ ...fw(400), fontSize: 20, color: C.text, marginBottom: 12 }}>Check your inbox</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textSecondary, lineHeight: '22px', marginBottom: 12 }}>
          We've sent a verification link to <span style={{ ...fw(600), color: C.text }}>{email || '[user@email.com]'}</span>. Tap it to confirm your account.
        </p>
        <p style={{ ...fw(400), fontSize: 14, color: C.textMuted, lineHeight: '20px', marginBottom: 24 }}>
          Didn't get the email? Check your spam folder, or resend the email.
        </p>
        <div style={{ width: '100%', marginBottom: 16 }}>
          <PrimaryButton onClick={onOpenEmail}>Open email app →</PrimaryButton>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleResend}
          style={{ background: 'none', border: 'none', cursor: 'pointer', ...fw(500), fontSize: 14, color: C.textMuted, textDecoration: 'underline', padding: '4px 0' }}>
          {sent ? '✓ Email sent!' : 'Resend email'}
        </motion.button>
      </div>
    </div>
  )
}

function SignupQueueScreen() {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(66,66,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 20 }}>🎉</span>
        </div>
        <p style={{ ...fw(700), fontSize: 22, color: C.text, marginBottom: 12 }}>You're in the queue!</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textSecondary, lineHeight: '22px' }}>
          We're reviewing your application and will be in touch within 3–5 business days. Keep an eye on your inbox.
        </p>
      </div>
    </div>
  )
}

// ── SIDE NAV ──────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: 'Loyalty',
    items: [
      { key: 'loyalty-invite', label: 'Loyalty invite', toScreen: 29, tab: null },
      { key: 'journey-c',      label: 'Add loyalty',    toScreen: 34, tab: null },
    ],
  },
  {
    label: 'Advocacy',
    items: [
      { key: 'signup',     label: 'Sign up',    toScreen: 5,  tab: null },
      { key: 'onboarding', label: 'Onboarding', toScreen: 12, tab: null },
      { key: 'login',      label: 'Log in',     toScreen: 3,  tab: 'feed', triggerMilestone: true },
    ],
  },
  {
    label: 'App',
    items: [
      { key: 'dashboard',  label: 'Dashboard',  toScreen: 3, tab: 'feed'       },
      { key: 'challenges', label: 'Challenges', toScreen: 3, tab: 'challenges' },
      { key: 'community',  label: 'Community',  toScreen: 3, tab: 'community'  },
      { key: 'studio',     label: 'Studio',     toScreen: 3, tab: 'studio'     },
      { key: 'progress',   label: 'Progress',   toScreen: 3, tab: 'progress'   },
    ],
  },
]

function ModeTabs({ mode, onChange }) {
  const tabs = [
    { id: 'advocate', label: 'Social Advocate' },
    { id: 'loyalty',  label: 'Customer Advocate' },
    { id: 'employee', label: 'Employee' },
  ]
  return (
    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.08)', borderRadius: 10, padding: 3, gap: 2 }}>
      {tabs.map(t => (
        <motion.button key={t.id} whileTap={{ scale: 0.97 }} onClick={() => onChange(t.id)}
          style={{ height: 30, padding: '0 14px', border: 'none', borderRadius: 8, cursor: 'pointer',
            background: mode === t.id ? C.white : 'transparent',
            boxShadow: mode === t.id ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
            fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 12,
            fontWeight: mode === t.id ? 600 : 400,
            color: mode === t.id ? C.text : 'rgba(0,0,0,0.45)',
          }}>
          {t.label}
        </motion.button>
      ))}
    </div>
  )
}

function SideNav({ activeKey, onNavigate, onLoginNav }) {
  const sections = NAV_SECTIONS
  return (
    <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sections.map(section => (
        <div key={section.label}>
          <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.28)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4, paddingLeft: 10 }}>
            {section.label}
          </p>
          {section.items.map(item => {
            const active = activeKey === item.key
            const handleClick = () => {
              if (item.triggerMilestone) { onLoginNav() }
              else { onNavigate(item.toScreen, item.tab) }
            }
            return (
              <motion.button
                key={item.key}
                whileTap={{ scale: 0.96 }}
                onClick={handleClick}
                style={{
                  width: '100%', height: 34, padding: '0 10px',
                  textAlign: 'left', border: 'none',
                  cursor: 'pointer', borderRadius: 7,
                  background: active ? 'rgba(0,0,0,0.07)' : 'transparent',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? '#101010' : 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', gap: 9,
                }}
              >
                {item.label}
              </motion.button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ── JOURNEY B: ONBOARDING LOYALTY DETECTION ───────────

function OnboardingLoyaltyDetectedScreen({ onLink, onSkip }) {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SignupLogoArea top={64} />
      <div style={{ position: 'absolute', top: 168, left: 24, right: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(66,66,66,0.06)', borderRadius: 20, padding: '5px 12px', marginBottom: 20 }}>
          <Icon name="check" size={12} color={C.textMuted} strokeWidth={2.5} />
          <span style={{ ...fw(500), fontSize: 12, color: C.textMuted, letterSpacing: '0.02em' }}>Loyalty account found</span>
        </div>
        <p style={{ ...fw(700), fontSize: 28, color: C.text, lineHeight: '36px', marginBottom: 12, letterSpacing: '-0.5px' }}>
          We found your {BRAND} account.
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: C.textMuted, lineHeight: '24px', marginBottom: 24 }}>
          Your points and Gold status carry through to your advocacy rewards — nothing to fill in.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: C.cardBg, borderRadius: 10, marginBottom: 36 }}>
          <Icon name="mail" size={16} color={C.textMuted} />
          <span style={{ ...fw(400), fontSize: 14, color: C.textBody }}>zara@example.com</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ ...fw(600), fontSize: 12, color: '#166534' }}>Gold member</span>
          </div>
        </div>
        <PrimaryButton onClick={onLink}>Link my loyalty account →</PrimaryButton>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onSkip}
          style={{ width: '100%', marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', ...fw(400), fontSize: 14, color: C.textMuted, fontFamily: 'inherit', padding: '4px 0', textDecoration: 'underline' }}>
          Skip for now
        </motion.button>
      </div>
    </div>
  )
}

// ── JOURNEY A: LOYALTY INVITE ─────────────────────────

function LoyaltyInviteScreen({ onNext }) {
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SignupLogoArea top={52} />
      <div style={{ position: 'absolute', top: 156, left: 24, right: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(180,237,62,0.15)', border: '1px solid rgba(180,237,62,0.4)', borderRadius: 20, padding: '4px 10px', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.lime }} />
          <span style={{ ...fw(600), fontSize: 11, color: '#4a6b0a', letterSpacing: '0.04em' }}>Gold member · American Eagle</span>
        </div>
        <p style={{ ...fw(700), fontSize: 28, color: C.text, lineHeight: '36px', marginBottom: 14, letterSpacing: '-0.5px' }}>
          Your loyalty programme just got an upgrade.
        </p>
        <p style={{ ...fw(400), fontSize: 16, color: C.textMuted, lineHeight: '24px', marginBottom: 32 }}>
          American Eagle members are now invited to the advocate programme — new ways to earn, exclusive challenges, and a community of people who love the brand as much as you do.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { icon: 'wallet', label: 'Your points and tier come with you' },
            { icon: 'users',  label: 'Access to the advocate community' },
            { icon: 'award',  label: 'Earn faster with new challenges' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={16} color={C.textBody} />
              </div>
              <span style={{ ...fw(400), fontSize: 15, color: C.textBody }}>{label}</span>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={onNext}>Accept your invitation →</PrimaryButton>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ ...fw(400), fontSize: 10, color: C.textMuted }}>Powered by</span>
        <span style={{ ...fw(900), fontSize: 18, color: C.text, letterSpacing: '-0.02em', lineHeight: 1 }}>duel.</span>
      </div>
    </div>
  )
}

function LoyaltyConnectScreen({ onNext, onBack }) {
  const [connecting, setConnecting] = useState(false)
  const handleConnect = () => {
    setConnecting(true)
    setTimeout(onNext, 1200)
  }
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0 }}>
        <IconButton icon="arrowLeft" size={36} onClick={onBack} color={C.textBody} />
      </div>
      <div style={{ padding: '8px 24px 0' }}>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, lineHeight: '32px', marginBottom: 8, letterSpacing: '-0.3px' }}>
          Connect your American Eagle account
        </p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 32 }}>
          We'll bring in your points balance, tier status, and purchase history. Nothing changes on the American Eagle side.
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleConnect}
          style={{ width: '100%', height: BTN.height, border: `1px solid ${C.border}`, borderRadius: BTN.radius, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', ...fw(600), fontSize: BTN.fontSize, color: C.text, marginBottom: 16 }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...fw(900), fontSize: 12, color: C.text }}>A</span>
          </div>
          Continue with American Eagle
        </motion.button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ ...fw(400), fontSize: 13, color: C.textMuted }}>or</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <input
          type="email"
          defaultValue="sarah@example.com"
          placeholder="American Eagle email address"
          style={{ width: '100%', height: BTN.height, borderRadius: BTN.radius, border: `1px solid ${C.border}`, padding: '0 16px', ...fw(400), fontSize: BTN.fontSize, color: C.text, background: C.white, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', marginBottom: 12 }}
        />
        <PrimaryButton onClick={handleConnect} disabled={connecting}>
          {connecting ? 'Connecting…' : 'Connect with email'}
        </PrimaryButton>
        <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, textAlign: 'center', marginTop: 16, lineHeight: '18px' }}>
          We only read your loyalty data. We'll never post or make purchases on your behalf.
        </p>
      </div>
    </div>
  )
}

function LoyaltyRecognitionScreen({ onNext }) {
  const stats = [
    { value: 'Gold',   label: 'Member tier' },
    { value: '2,340',  label: 'Points balance' },
    { value: '3 yrs',  label: 'Member tenure' },
    { value: '47',     label: 'Purchases' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: '#0C0C0E', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 10px', marginBottom: 28, alignSelf: 'flex-start' }}>
          <Icon name="check" size={11} color={C.white} strokeWidth={2.5} />
          <span style={{ ...fw(600), fontSize: 11, color: C.white, letterSpacing: '0.04em' }}>American Eagle connected</span>
        </div>
        <p style={{ ...fw(700), fontSize: 32, color: C.white, lineHeight: '40px', marginBottom: 10, letterSpacing: '-0.5px' }}>
          Welcome back, Zara.
        </p>
        <p style={{ ...fw(400), fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: '25px', marginBottom: 36 }}>
          Your history with American Eagle is here. Every purchase, every point — recognised.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 16px' }}>
              <p style={{ ...fw(700), fontSize: 22, color: C.white, marginBottom: 4, letterSpacing: '-0.3px' }}>{value}</p>
              <p style={{ ...fw(400), fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{label}</p>
            </div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{ width: '100%', height: BTN.height, borderRadius: BTN.radius, background: C.white, border: 'none', color: C.text, ...fw(700), fontSize: BTN.fontSize, cursor: 'pointer', fontFamily: 'inherit' }}>
          See what's unlocked for you →
        </motion.button>
      </div>
    </div>
  )
}

function LoyaltyUnlockScreen({ onNext }) {
  const unlocks = [
    { icon: 'flag',    title: 'Challenges',          desc: 'Earn points through content, referrals, and events.' },
    { icon: 'users',   title: 'Advocate community',  desc: 'Connect with others who share your love for the brand.' },
    { icon: 'scissors', title: 'Content studio',     desc: 'Create, remix, and submit brand content from one place.' },
    { icon: 'chart',   title: 'Accelerated earning', desc: 'Gold members earn 1.5× points on every advocacy action.' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '48px 24px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(180,237,62,0.15)', border: '1px solid rgba(180,237,62,0.4)', borderRadius: 20, padding: '4px 10px', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.lime }} />
          <span style={{ ...fw(600), fontSize: 11, color: '#4a6b0a', letterSpacing: '0.04em' }}>Gold member · American Eagle</span>
        </div>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', marginBottom: 8, letterSpacing: '-0.3px' }}>
          Here's what's new for you.
        </p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 32 }}>
          Your American Eagle membership unlocks all of this from day one.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {unlocks.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.35, ease: 'easeOut' }}
              style={{ display: 'flex', gap: 16, padding: '18px 16px', border: `1px solid ${C.border}`, borderRadius: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={18} color={C.textBody} />
              </div>
              <div>
                <p style={{ ...fw(600), fontSize: 15, color: C.text, marginBottom: 3 }}>{title}</p>
                <p style={{ ...fw(400), fontSize: 13, color: C.textMuted, lineHeight: '19px' }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 24px 40px', flexShrink: 0, borderTop: `1px solid ${C.borderLight}` }}>
        <PrimaryButton onClick={onNext}>Start exploring →</PrimaryButton>
      </div>
    </div>
  )
}

function LoyaltyNudgeSheetScreen({ onConnect, onDismiss }) {
  return (
    <div style={{ width: 390, height: 844, position: 'relative', overflow: 'hidden' }}>
      {/* Live feed in the background, non-interactive */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <FeedTab onMenuOpen={() => {}} onWalletOpen={() => {}} photo={null} userPost={null} onTabChange={() => {}} mode="advocate" />
      </div>
      {/* Dimming overlay — tap to dismiss; z-index above sticky TopNav (10) */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 20 }} onClick={onDismiss} />
      {/* Sheet — above overlay */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.white, borderRadius: '20px 20px 0 0', padding: '28px 24px 44px', zIndex: 30 }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 24px' }} />
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(66,66,66,0.06)', borderRadius: 20, padding: '5px 12px', marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ ...fw(500), fontSize: 12, color: C.textMuted, letterSpacing: '0.02em' }}>Loyalty account found</span>
        </div>
        <p style={{ ...fw(700), fontSize: 24, color: C.text, lineHeight: '32px', marginBottom: 10, letterSpacing: '-0.4px' }}>
          Your {BRAND} account is ready to connect.
        </p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 20 }}>
          Connect it to carry over your Gold status and points — nothing to fill in.
        </p>
        {/* Account preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', background: C.cardBg, borderRadius: 10, marginBottom: 24 }}>
          <Icon name="mail" size={15} color={C.textMuted} />
          <span style={{ ...fw(400), fontSize: 14, color: C.textBody, flex: 1 }}>zara@example.com</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ ...fw(600), fontSize: 12, color: '#166534' }}>Gold · 2,340 pts</span>
          </div>
        </div>
        <PrimaryButton onClick={onConnect}>Connect my account →</PrimaryButton>
        <motion.button whileTap={{ scale: 0.96 }} onClick={onDismiss}
          style={{ width: '100%', marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', ...fw(400), fontSize: 14, color: C.textMuted, fontFamily: 'inherit', padding: '4px 0' }}>
          Not now
        </motion.button>
      </motion.div>
    </div>
  )
}

function LoyaltyConnectConfirmScreen({ onConfirm, onBack }) {
  const benefits = [
    { icon: 'award',   title: '2,340 points carried over',          desc: 'Your existing balance arrives in full.' },
    { icon: 'star',    title: 'Gold status, from day one',           desc: 'Earn 1.5× points on every advocacy action.' },
    { icon: 'package', title: 'Purchase history recognised',         desc: 'Past orders count toward your advocacy flywheel.' },
  ]
  return (
    <div style={{ width: 390, height: 844, background: C.white, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 0' }}>
        <motion.button whileTap={{ scale: 0.88 }} onClick={onBack}
          style={{ width: 36, height: 36, border: `1px solid ${C.border}`, borderRadius: 10, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="chevronLeft" size={16} color={C.text} />
        </motion.button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
        <p style={{ ...fw(700), fontSize: 26, color: C.text, lineHeight: '34px', marginBottom: 8, letterSpacing: '-0.3px' }}>Link your loyalty account</p>
        <p style={{ ...fw(400), fontSize: 15, color: C.textMuted, lineHeight: '22px', marginBottom: 24 }}>Everything carries over automatically — no forms to fill in.</p>
        {/* Account card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="mail" size={16} color={C.textMuted} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...fw(500), fontSize: 14, color: C.text, marginBottom: 2 }}>zara@example.com</p>
            <p style={{ ...fw(400), fontSize: 12, color: C.textMuted }}>American Eagle Outfitters</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.1)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ ...fw(600), fontSize: 12, color: '#166534' }}>Gold member</span>
          </div>
        </div>
        {/* Benefits */}
        <p style={{ ...fw(500), fontSize: 13, color: C.textMuted, marginBottom: 12, letterSpacing: '0.02em' }}>What you'll get</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {benefits.map(({ icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: C.cardBg, borderRadius: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: C.white, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={15} color={C.textBody} />
              </div>
              <div>
                <p style={{ ...fw(600), fontSize: 14, color: C.text, marginBottom: 2 }}>{title}</p>
                <p style={{ ...fw(400), fontSize: 12, color: C.textMuted, lineHeight: '17px' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 24px 40px', borderTop: `1px solid ${C.borderLight}`, flexShrink: 0 }}>
        <PrimaryButton onClick={onConfirm}>Confirm and link →</PrimaryButton>
      </div>
    </div>
  )
}

// ── APP ROOT ──────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState(() => { const s = new URLSearchParams(window.location.search).get('s'); return s !== null ? parseInt(s, 10) : 0; })
  const [dir, setDir] = useState(1)
  const [slowTransition, setSlowTransition] = useState(false)
  const [email, setEmail] = useState('')
  const [activeTab, setActiveTab] = useState('feed')
  const [signupInfo, setSignupInfo] = useState({ email: '' })
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [postSentence, setPostSentence] = useState('')
  const [showIntroSheet, setShowIntroSheet] = useState(false)
  const [showMarkScreen, setShowMarkScreen] = useState(false)
  const [milestoneOpen, setMilestoneOpen] = useState(false)
  const [mode, setMode] = useState('advocate')
  const [loyaltyViaOnboarding, setLoyaltyViaOnboarding] = useState(false)

  const go = (toScreen, tab = null, forceDir = null, slow = false) => {
    if (toScreen !== screen) {
      setDir(TRANSITION_DIR)
      setScreen(toScreen)
      setSlowTransition(slow)
    }
    if (tab !== null) setActiveTab(tab)
  }

  const loginNav = () => { go(3, 'feed'); setMilestoneOpen(true) }

  const getActiveNavKey = () => {
    if (screen >= 29 && screen <= 32) return 'loyalty-invite'
    if (screen === 34 || screen === 35) return 'journey-c'
    if (screen >= 4 && screen <= 11) return 'signup'
    if (screen === 12 || screen === 13 || screen === 14 || screen === 16 || screen === 17 || screen === 19 || screen === 33) return 'onboarding'
    if (screen <= 2) return 'login'
    if (screen === 15 || screen === 27) return 'challenges'
    if (screen === 18 || screen === 25 || screen === 26) return 'studio'
    if (screen === 28) return 'managerview'
    if (screen === 3) {
      const map = { feed: 'dashboard', challenges: 'challenges', community: 'community', studio: 'studio', progress: 'progress', rewards: 'rewards', account: 'account' }
      return map[activeTab] ?? 'dashboard'
    }
    return null
  }

  const screens = [
    <EmailScreen key="email" onNext={(e) => { setEmail(e); go(1) }} />,
    <InboxScreen key="inbox" email={email} onNext={() => go(2)} />,
    <EmailClientScreen key="email-client" onNext={() => go(12)} />,
    <HomeScreen key="home" activeTab={activeTab} onTabChange={setActiveTab} onChallengeOpen={() => go(15)} onGroupChallengeOpen={() => go(27)} onChallengeCreate={() => go(18)} onContentAnalyse={() => go(25)} onRemix={() => go(26)} profilePhoto={profilePhoto} onSetProfilePhoto={setProfilePhoto} showIntroSheet={showIntroSheet} onIntroPost={(s) => { setPostSentence(s); setShowIntroSheet(false); setShowMarkScreen(true) }} userPost={postSentence ? { sentence: postSentence, photo: profilePhoto } : null} milestoneOpen={milestoneOpen} onMilestoneClose={() => setMilestoneOpen(false)} mode={mode} />,
    <SignupMotivationScreen key="su-motivation" onNext={(sel) => ({ 1: () => go(22), 2: () => go(23), 3: () => go(24) }[sel] || (() => go(5)))()} />,
    <SignupBenefitsScreen key="su-benefits" onNext={() => go(20, null, 1)} />,
    <SignupBasicInfoScreen key="su-basic" onNext={(info) => { setSignupInfo(prev => ({ ...prev, ...info })); go(7) }} />,
    <SignupDetailsScreen key="su-details" onNext={() => go(8)} />,
    <SignupSocialsScreen key="su-socials" onNext={() => go(9)} />,
    <SignupInboxScreen key="su-inbox" email={signupInfo.email} onOpenEmail={() => go(11)} />,
    <SignupQueueScreen key="su-queue" />,
    <EmailClientScreen key="su-email-client" onNext={() => go(10, null, 1)} />,
    <OnboardingLandingScreen key="ob-landing" onNext={() => go(33)} />,
    <OnboardingTiersScreen key="ob-tiers" onNext={() => go(17)} />,
    <OnboardingFrequencyScreen key="ob-frequency" onNext={() => go(13, null, 1)} />,
    <ChallengeDetailScreen key="challenge-detail" onBack={() => go(3, 'challenges')} />,
    <OnboardingCommunityScreen key="ob-community" onNext={() => go(14, null, 1)} />,
    <OnboardingNotificationsScreen key="ob-notifications" onNext={() => { setShowIntroSheet(true); go(3, 'feed', 1, true) }} />,
    <ChallengeCreationScreen key="challenge-create" onBack={() => go(3, 'studio')} />,
    <OnboardingDisplayNameScreen key="ob-display-name" firstName={signupInfo.firstName || ''} onNext={() => go(16, null, 1)} />,
    <SignupRequirementsScreen key="su-requirements" onNext={() => go(21)} onBack={() => go(5, null, -1)} />,
    <SignupSSOScreen key="su-sso" onNext={(e) => { setSignupInfo(prev => ({ ...prev, email: e })); go(6, null, 1) }} onBack={() => go(20, null, -1)} />,
    <SignupBenefitsGrowthScreen key="su-benefits-growth" onNext={() => go(20, null, 1)} onBack={() => go(4, null, -1)} />,
    <SignupBenefitsCommunityScreen key="su-benefits-community" onNext={() => go(20, null, 1)} onBack={() => go(4, null, -1)} />,
    <SignupBenefitsFriendScreen key="su-benefits-friend" onNext={() => go(20, null, 1)} onBack={() => go(4, null, -1)} />,
    <ContentAnalyserScreen key="content-analyser" onBack={() => go(3, 'studio')} />,
    <RemixScreen key="remix" onBack={() => go(3, 'studio')} />,
    <GroupChallengeDetailScreen key="group-challenge-detail" onBack={() => go(3, 'challenges')} />,
    <ManagerViewScreen key="manager-view" onBack={() => go(3, 'progress')} />,
    <LoyaltyInviteScreen key="loyalty-invite" onNext={() => go(30)} />,
    <LoyaltyConnectScreen key="loyalty-connect" onNext={() => go(31)} onBack={() => go(29, null, -1)} />,
    <LoyaltyRecognitionScreen key="loyalty-recognition" onNext={() => go(32)} />,
    <LoyaltyUnlockScreen key="loyalty-unlock" onNext={() => loyaltyViaOnboarding ? go(19) : go(3, 'feed')} />,
    <OnboardingLoyaltyDetectedScreen key="ob-loyalty-detected" onLink={() => { setLoyaltyViaOnboarding(true); go(31) }} onSkip={() => go(19)} />,
    <LoyaltyNudgeSheetScreen key="loyalty-nudge-sheet" onConnect={() => go(35)} onDismiss={() => go(3, 'feed', -1)} />,
    <LoyaltyConnectConfirmScreen key="loyalty-connect-confirm" onConfirm={() => go(31)} onBack={() => go(34, null, -1)} />,
  ]

  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 500

  return (
    <div style={{
      minHeight: '100dvh',
      background: isMobileViewport ? C.white : '#e8e8e8',
      display: 'flex',
      flexDirection: isMobileViewport ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobileViewport ? 0 : 40,
      padding: isMobileViewport ? 0 : 32,
    }}>
      {!isMobileViewport && (
        <SideNav activeKey={getActiveNavKey()} onNavigate={go} onLoginNav={loginNav} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

        <div id="m4-device" style={{
          width: 390, height: 844,
          borderRadius: isMobileViewport ? 0 : 44,
          overflow: 'hidden', position: 'relative',
          background: C.white,
          boxShadow: isMobileViewport ? 'none' : '0 0 0 10px #1c1c1e, 0 40px 80px rgba(0,0,0,0.35)',
          flexShrink: 0,
        }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div key={screen} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slowTransition ? slowSpring : spring} style={{ position: 'absolute', inset: 0, background: C.white }}>
              {screens[screen]}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {showMarkScreen && (
              <motion.div
                key="mark"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                style={{ position: 'absolute', inset: 0, zIndex: 200 }}
              >
                <OnboardingMarkScreen onNext={() => setShowMarkScreen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
