/* The behaviour of the Akari Labs home page. Built from the approved design page; edit here. */
(() => {
  const root = document.getElementById('c3');
  if (!root || root.dataset.c3Ready) return;
  root.dataset.c3Ready = '1';
  const q = (s) => root.querySelector(s);
  const qa = (s) => Array.from(root.querySelectorAll(s));
  const scene = q('#c3-scene');
  const ASSET = '/assets/';
  const TAU = Math.PI * 2;
  const N = 9;
  const SLOT = TAU / N;
  const IMG_W = 436;
  const W0 = 155;
  const WC = 198;
  const PERSP = 0.28;
  const S_MAX = 1 + PERSP;
  const K = 0.46;
  const H_C = 40;
  const TOP_RX = 206;
  const TOP_RY = 100;
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let still = motionQuery.matches;

  // What the panes show for each island. kind: web (a browser on the board's home page), chat, gym (three phones), all (the set).
  // chips are the board's own settings or specialties; feats come from each product's own copy, the board's own lines first.
  const PRODUCTS = [
    {n: '01', ray: ['#4BE6B4', '#FF8FC0'], name: 'PMHNP Hiring', short: 'PMHNP', status: 'Live', pc: '#0D9488', pk: '#0A6B62', pt: '#DDF1EE', url: 'pmhnphiring.com', live: true, kind: 'web', shot: 'b-pmhnp',
      chips: ['Telehealth', 'Child and adolescent', 'Addiction', 'Inpatient', 'Private practice'],
      feats: [['pin', 'Remote, telehealth and in-person roles'], ['pay', 'Salary shown when employers publish it'], ['map', 'Practice authority for every state']]},
    {n: '02', ray: ['#FF5C9C', '#8BE36B'], name: 'NP Hiring', short: 'NP', status: 'Live', pc: '#BE185D', pk: '#9A1149', pt: '#F8E1EA', url: 'nphiring.com', live: true, kind: 'web', shot: 'b-np',
      chips: ['Family practice', 'Primary care', 'Acute care', 'Pediatric', 'Urgent care'],
      feats: [['layers', 'NP and APRN jobs in every specialty'], ['map', 'Licensure and practice authority by state'], ['pay', 'Pay shown when the posting has it']]},
    {n: '03', ray: ['#FF6E4D', '#FFC75A'], name: 'ABA Jobs Hub', short: 'ABA', status: 'Launching', pc: '#D2391F', pk: '#A62A15', pt: '#FBE4DE', url: 'abajobshub.com', kind: 'web', shot: 'b-aba',
      chips: ['Center-based', 'In-home', 'School-based', 'Telehealth', 'Clinical director'],
      feats: [['layers', 'Roles from RBT to BCBA'], ['user', 'RBT roles on a page of their own'], ['pay', 'Pay shown when the employer posts it']]},
    {n: '04', ray: ['#4BE39C', '#FF9A55'], name: 'PA Jobs Hub', short: 'PA', status: 'Launching', pc: '#0E7A58', pk: '#0B6249', pt: '#DDF0E8', url: 'pajobshub.com', kind: 'web', shot: 'b-pa',
      chips: ['Emergency medicine', 'Family medicine', 'Urgent care', 'Outpatient', 'New grad'],
      feats: [['layers', 'PA jobs in any specialty and setting'], ['filter', 'Medical assistant posts filtered out'], ['bell', 'Save any search as a job alert']]},
    {n: '05', ray: ['#FF8A5B', '#A4E06E'], name: 'Therapist Jobs Hub', short: 'Therapist', status: 'Launching', pc: '#B9472F', pk: '#953521', pt: '#F7E3DC', url: 'therapistjobshub.com', kind: 'web', shot: 'b-therapist',
      chips: ['Private practice', 'Telehealth', 'Outpatient', 'School-based', 'Associates and interns'],
      feats: [['map', 'Therapy jobs by license and by state'], ['layers', 'A category for each license family'], ['user', 'One profile for every application']]},
    {n: '06', ray: ['#C68CFF', '#FFD47A'], name: 'CRNA Jobs Hub', short: 'CRNA', status: 'Launching', pc: '#7E3796', pk: '#682A7D', pt: '#EFE2F4', url: 'crnajobshub.com', kind: 'web', shot: 'b-crna',
      chips: ['Locum tenens', 'Outpatient', 'Rural', 'VA', 'New grad'],
      feats: [['layers', 'From staff roles to locum tenens'], ['pin', 'Hospital, surgery center, rural and VA roles'], ['list', 'Track every application in one dashboard']]},
    {n: '07', ray: ['#FF62AA', '#FFE6CC'], name: 'SLP Jobs Hub', short: 'SLP', status: 'Launching', pc: '#D81B72', pk: '#AE125A', pt: '#FBE0EC', url: 'slpjobshub.com', kind: 'web', shot: 'b-slp',
      chips: ['Schools', 'Hospital', 'Home health', 'Teletherapy', 'Clinical fellowship'],
      feats: [['user', 'Clinical fellows and SLP assistants included'], ['filter', 'Audiology and debate posts filtered out'], ['send', 'Easy Apply on roles posted here']]},
    {n: '08', ray: ['#5CF0B4', '#FF9A3D'], name: 'Chat search', short: 'Chat search', status: 'Part of PMHNP Hiring', pc: '#3FBF8E', pk: '#1D7350', pt: '#DDF4EA', kind: 'chat',
      chips: ['ChatGPT', 'Claude'],
      feats: [['pin', 'Search by location, schedule and pay'], ['pay', 'Advertised pay by state'], ['send', 'Apply with your profile after you confirm'], ['unlock', 'Searching works without an account']],
      go: {text: 'pmhnphiring.com', href: 'https://pmhnphiring.com/ai-assistants'}},
    {n: '09', ray: ['#C6F55A', '#FFB25C'], name: 'Tetsu', short: 'Tetsu', status: 'Beta', pc: '#A3D930', pk: '#A3D930', pt: '#26262B', dark: true, kind: 'gym', meta: 'iOS and Android',
      chips: ['Log', 'Eat', 'Progress'],
      feats: [['clock', 'Log sets in seconds'], ['camera', 'Snap your plate for calories and macros'], ['scan', 'Machine scan finds the exercise'], ['spark', 'AI coach that answers from your log']],
      go: {text: 'tetsu.fitness', href: 'https://tetsu.fitness'}},
    {n: '10', ray: ['#FFD27A', '#FF8A6A'], name: 'Akari Labs', short: 'Akari Labs', status: 'The company', pc: '#D9A03A', pk: '#8A5B10', pt: '#F8EBD3', kind: 'all',
      chips: null,
      feats: [['window', 'Job boards for healthcare roles'], ['chat', 'Job search inside ChatGPT and Claude'], ['phone', 'A workout app for iOS and Android'], ['build', 'We build and run each one']],
      go: {text: 'See everything we built', href: '#boards'}},
  ];

  // per island: image height, pad x/y, top-ellipse centre x/y, bottom y, crown y, hit-mask rows, hit mask (12 px cells, 37 columns)
  const GEO = [
    [473,215,252,219,264,439,12,40,"AAAAAAAAAAMAAABwAAAAAAMAAAAgAAAAAA4AAADAHwAAgP8PAAD4/wMAwP9/AAD4/w8AYP//GQDe/z8HwP//9wH8//8/gP///wf4////AP///z/w////D//////j////f/z///+f//////P///8//v///8f/////8P///x/+////w////3/4////B//////A////H+D///8B+P//HwD8/38AAPh+AAAAjAcAAAAAAAAAAAAAAAAAAAA="],
    [398,221,177,217,189,371,11,34,"AAAAAAAAgA8AAAD+BwAA/P8DAMj//wCA///vAPj//x+A////B/D///8A/P//H8D///8H/P///8H///8//P///4//////8f///z/+////x//////4////H//////D////f/j///8H/////+D///8P+P///wH+//8/gP///wOA//8HAMD//wAA8P8PAAA8HwAAAAAAAAAAAAAAAAAAAAA="],
    [421,215,200,219,212,389,10,36,"AAAAAAAAwA8AAAD+AwAA4P8DAID/fwAA/P8PAID//wEA9v+/A+D//38A/P//H8D///8D+P//PwD///8f8P///wf/////8f///z/+////z//////5////P//////j////f/z///8P/////+H///8f/P///wP///9/wP///w/w////AP7//w+A//8/AAD//wMAwMc/AAAwMAAAAAAAAAAAAAAAAAAAAAA="],
    [448,221,227,217,239,419,11,38,"AAAAAAAAwAAAAAA8AAAA4AcAAAD/AwAA4P8DAAD+/wAA4P8/AAD4/wcAHP//BMDj/98B+Pz/OwD///8P8P///wH+//9/wP///x/8////w//////4////H//////j////f/z///+P//////H///8//P///4f///9/8P///w/+////gf///x/A////A/j//z8A/P//AwD/fw8AgP8PAADg/wAAAAAAAAAAAAAAAAAAAAA="],
    [435,215,214,219,226,403,9,37,"AAAAAAAADAAAAIADAgAA+G8AAAD/HwAA8P8HAAD//wEA5P8fAMD9/2MAvP9/HsD//88D+P//fwD///8f4P///wP+////4P///x/+////x//////5////P//////n////f/z///+P/////+H///8//P///4P///9/8P///wf8//9/APz//w+A////APD//w8A/P/3AADA/wAAALAHAAAAAAAAAAAAAAAAAAAAAA=="],
    [414,221,193,217,205,385,10,35,"AAAAAAAAgH8AAAD+HwAA8P8DAID/fwAA+P8PAJD//w0A5///A+D9//8A/v//H8D///8D/P//f4D///8f+P///4f/////8f///z/+////x//////4////H//////j////f/j///8P/////+H///8//P///4P///8/wP///wf4////AP7//wcA/v8fAAD+/wEAgOcbAAAAAAAAAAAAAAAAAAAA"],
    [464,215,243,219,255,437,10,39,"AAAAAAAADAAAAIABAAAAeAAAAIAPAAAA4AEAAAB8DwAAwP8BAADw/wEAAP9/AAD3/48A4P//OwD+/38P4P///wH8//8/AP///w/4////Af///3/4////H//////j//////z///+f//////H///8//v///4f/////8P///x/+////g////z/g////B/z///+A////D+D//x8AwP//AwDg/z8AAPg/AAAACAEAAAAAAAAAAAAAAA=="],
    [452,221,231,217,243,423,10,38,"AAAAAAAAfAAAAOAfAAAA/H8AAMD/HwAA8P8DAAD+fwAAgP8HAADw/wAAiP9/AIDz/88A8P7/OQD//78H4P///wH+//8/wP///w/8////w//////4////H//////j////f/z///+P//////H///8//v///4f///9/8P///w/+////AP///w/g////Afz//z8A////A8D//w8AgP//AADA/wEAAAAAAAAAAAAAAAAAAAA="],
    [393,215,172,219,184,362,9,33,"AAAAAAAAAAcAAADnAQAA8H8AAAT/PwLA+f/vAHj//z+A////B/D///8A/v//H+D///8H/P///+H///9//P///4//////8////3/+////z//////4////H/7////D////P/j///8H////f8D///8P8P///wH+//8/gP///wGA//8PAMD/fwAA4P8HAAAAAAAAAAAAAAAAAAAA"],
    [605,215,384,219,396,576,10,51,"AAAAAAAAAAAAAAAIAAAAgAEAAABwAAAAgD8AAADwBwAAAH4AAADADwAAAPwDAACA/wAAAPgfAAAA/gEAAMA/AAAA8AcAAAD+AAAAwB8AAAD8AwAAgH8AAADwDwAAAP4BAADAfwAAMPw/CADv/48D4P//8wD+//8fwP///wP8////wP///x/4////B//////x////P/7////P//////n///8f/////+P///9/+P///w//////4P///x/8////A////3/A////D/D///8A/P//AQD//z8AAP7/AwAA8wMAAAAAAAAAAAAAAAAAAAA="],
  ];
  const MASK_COLS = 37;
  const MASK_CELL = 12;
  const decodeMask = (b64) => { const s = atob(b64); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };

  // ---------- build the islands ----------
  const frag = document.createDocumentFragment();
  const isles = PRODUCTS.map((p, i) => {
    const g = GEO[i];
    const el = document.createElement('div');
    el.className = 'ak-c3-isl';
    el.style.setProperty('--pc', p.pc);
    // night only: the dark base, a brighter copy the tower's beam shows as it passes, the lights, and a haze for depth
    const src = `${ASSET}n-${p.n}.webp`;
    el.innerHTML = `${i === 9 ? '<span class="ak-c3-halo"></span>' : ''}<span class="ak-c3-glow"></span><img class="ak-c3-nite" src="${src}" alt="" draggable="false" decoding="async"><img class="ak-c3-lit" src="${src}" alt="" draggable="false" decoding="async"><img class="ak-c3-emit" src="${ASSET}e-${p.n}.webp" alt="" draggable="false" decoding="async"><img class="ak-c3-haze" src="${src}" alt="" draggable="false" decoding="async"><span class="ak-c3-ping"></span>`;
    const haze = el.querySelector('.ak-c3-haze');
    frag.appendChild(el);
    return {
      i, p, el, centre: i === 9,
      nite: el.querySelector('.ak-c3-nite'), lit: el.querySelector('.ak-c3-lit'), emit: el.querySelector('.ak-c3-emit'), halo: el.querySelector('.ak-c3-halo'), haze, emitLv: 0, litOp: -1, emitOp: -1, glow: el.querySelector('.ak-c3-glow'), ping: el.querySelector('.ak-c3-ping'),
      h: g[0], padX: g[1], padY: g[2], topX: g[3], topY: g[4], bottom: g[5], crown: g[6], rows: g[7], mask: decodeMask(g[8]),
      phi: 0, zn: 0, sx: 0, sy: 0, sc: 1, scMax: 1, lift: 0, sway: 0, swayV: 0, enter: 0,
      bobA: 0.8 + ((i * 37) % 10) / 22, bobW: TAU / (4.6 + ((i * 53) % 17) / 6), bobP: i * 1.71, zi: -1, hz: -1, op: -1,
    };
  });
  const ring = isles.slice(0, N);
  const centre = isles[9];

  // ---------- clouds, balloon, plane ----------
  // x, y: centre of the cloud relative to the ring centre (css px at full size); zn: depth for the ones that sit among the islands
  const CLOUDS = [
    { src: 'c-big', w: 200, x: -350, y: -196, layer: 'bg', amp: 24, per: 74, ph: 0.2, par: 5 },
    { src: 'c-mid', w: 150, x: 318, y: -150, layer: 'bg', amp: 28, per: 81, ph: 2.1, par: 6 },
    { src: 'c-small', w: 104, x: 120, y: -262, layer: 'bg', amp: 20, per: 66, ph: 4.0, par: 4 },
    { src: 'c-small', w: 96, x: -410, y: 64, layer: 'bg', amp: 16, per: 59, ph: 1.0, par: 7 },
    { src: 'bank', w: 880, x: 24, y: 190, layer: 'bg', amp: 18, per: 95, ph: 3.0, par: 8, flip: true },
    { src: 'c-small', w: 96, x: -24, y: -128, zn: -0.64, amp: 34, per: 48, ph: 1.3, par: 9 },
    { src: 'c-mid', w: 128, x: -120, y: 58, zn: 0.04, amp: 34, per: 54, ph: 0.4, par: 11 },
    { src: 'c-small', w: 96, x: 70, y: 106, zn: 0.62, amp: 40, per: 42, ph: 2.2, par: 13 },
    { src: 'bank', w: 940, x: -10, y: 312, layer: 'fg', amp: 22, per: 88, ph: 0.0, par: 16 },
  ];
  const CLOUD_H = { 'c-big': 292 / 448, 'c-mid': 220 / 328, 'c-small': 152 / 228, bank: 400 / 1800 };
  const clouds = CLOUDS.map((c) => {
    const el = document.createElement('div');
    el.className = c.layer === 'fg' ? 'ak-c3-cloud ak-c3-cloud--fg' : 'ak-c3-cloud';
    const fl = c.flip ? ' style="transform:scaleX(-1)"' : '';
    const nm = c.src.replace(/^c-/, '');
    el.innerHTML = `<img class="ak-c3-cn" src="${ASSET}cn-${nm}.webp" alt="" draggable="false" decoding="async"${fl}><img class="ak-c3-cw" src="${ASSET}cw-${nm}.webp" alt="" draggable="false" decoding="async"${fl}>`;
    el.style.zIndex = c.layer === 'bg' ? (c.src === 'bank' ? '8' : '6') : c.layer === 'fg' ? '950' : String(zIndexOf(c.zn));
    frag.appendChild(el);
    return { ...c, el, ratio: CLOUD_H[c.src], cur: 0, cw: el.querySelector('.ak-c3-cw'), wOp: -1 };
  });
  const balloon = (() => {
    const el = document.createElement('div');
    el.className = 'ak-c3-balloon';
    el.innerHTML = `<img src="${ASSET}balloon-n.webp" alt="" draggable="false" decoding="async">`;
    frag.appendChild(el);
    return { el, zi: -1 };
  })();
  const plane = (() => {
    const el = document.createElement('div');
    el.className = 'ak-c3-plane';
    el.innerHTML = `<img src="${ASSET}plane.webp" alt="" draggable="false" decoding="async">`;
    frag.appendChild(el);
    return { el, on: false, t: 0, to: 0, next: 7, zi: -1 };
  })();
  scene.appendChild(frag);

  const cvB = q('#c3-paths-back');
  const cvF = q('#c3-paths-front');
  const cvC = q('#c3-cones');
  const ctxB = cvB.getContext('2d');
  const ctxF = cvF.getContext('2d');
  const ctxC = cvC.getContext('2d');
  cvB.style.zIndex = '497';
  cvF.style.zIndex = '505';
  centre.el.style.zIndex = '500';
  const paneB = q('.ak-c3-pane--board');
  const paneF = q('.ak-c3-pane--feat');
  const wideQuery = matchMedia('(min-width: 1160px)');
  let wide = false;
  const stage = q('.ak-c3-stage');
  const panesEl = q('#c3-panes');
  let rayB = null, rayF = null, coneOX = 0, coneOY = 0, coneW = 0, coneH = 0;
  // a first guess at how wide the ring reaches at the panes' height; the full turn is then checked island by island
  const RING_HALF = 300;
  const CLEAR = 16;
  // where a pane's edge lands on screen (the panes are straight now, so this is simply its box).
  // side -1 is the board (its inner edge is its right edge), side 1 the features (inner edge on the left); returns scene coordinates
  function paneEdge(el, side, inner, view) {
    const w = el.offsetWidth, h = el.offsetHeight, x0 = el.offsetLeft, y0 = el.offsetTop;
    const d = (inner ? -side : side) * w / 2;
    const x = x0 + w / 2 + view.tx * d + view.dx;
    const yc = y0 + h / 2 - side * view.ty * d + view.dy;
    return [x, yc - h / 2, x, yc + h / 2];
  }
  // each island's drawn area, from its hit mask: [left, right, top, bottom] in picture pixels
  let ringF = 1;
  function islandBox(isl) {
    if (isl.box) return isl.box;
    let c0 = MASK_COLS, c1 = -1, r0 = isl.rows, r1 = -1;
    for (let r = 0; r < isl.rows; r++) for (let c = 0; c < MASK_COLS; c++) {
      const k = r * MASK_COLS + c;
      if ((isl.mask[k >> 3] >> (k & 7)) & 1) { if (c < c0) c0 = c; if (c > c1) c1 = c; if (r < r0) r0 = r; if (r > r1) r1 = r; }
    }
    isl.box = [c0 * MASK_CELL, (c1 + 1) * MASK_CELL, r0 * MASK_CELL, (r1 + 1) * MASK_CELL];
    return isl.box;
  }
  // does a box touch a pane? (written for a slanted pane; with straight panes its top and bottom are level)
  function boxHitsPane(L, Rr, Tp, Bt, p) {
    const a = Math.max(L, p.x0), b = Math.min(Rr, p.x1);
    if (a >= b) return false;
    const at = (x, e0, e1) => e0 + (e1 - e0) * ((x - p.a[0]) / (p.b[0] - p.a[0] || 1));
    const topMin = Math.min(at(a, p.a[1], p.b[1]), at(b, p.a[1], p.b[1]));
    const botMax = Math.max(at(a, p.a[3], p.b[3]), at(b, p.a[3], p.b[3]));
    return Bt > topMin && Tp < botMax;
  }
  // every island, at every angle of a full turn (with its lift when chosen, its bob and a margin), stays clear of both panes
  function ringClear(view) {
    const polys = [[paneB, -1], [paneF, 1]].map(([el, side]) => { const a = paneEdge(el, side, true, view), b = paneEdge(el, side, false, view); return { x0: Math.min(a[0], b[0]), x1: Math.max(a[0], b[0]), a, b }; });
    const M = 10, up = 22 * f * S_MAX, bobDown = 6 * f * S_MAX;
    for (const isl of ring) {
      const bx = islandBox(isl);
      for (let deg = 0; deg < 360; deg += 2) {
        const phi = (deg * Math.PI) / 180, s = 1 + PERSP * Math.cos(phi), sc = (W0 * f * s) / IMG_W;
        const x = cx + rPx * Math.sin(phi) * s, y = cy + rPx * K * Math.cos(phi) * s;
        const L = x + (bx[0] - isl.padX) * sc - M, Rr = x + (bx[1] - isl.padX) * sc + M;
        const Tp = y + (bx[2] - isl.padY) * sc - up - M, Bt = y + (bx[3] - isl.padY) * sc + bobDown + M;
        for (const p of polys) if (boxHitsPane(L, Rr, Tp, Bt, p)) return false;
      }
    }
    return true;
  }
  function paneView() {
    const sr = scene.getBoundingClientRect(), pr = panesEl.getBoundingClientRect();
    return { dx: pr.left - sr.left, dy: pr.top - sr.top, tx: 1, ty: 0 };
  }
  const after = q('.ak-c3-after');
  const skyCv = q('#c3-sky');
  const skyCtx = skyCv.getContext('2d');
  let stars = [];
  const moon = q('.ak-c3-moon');
  const tip = q('.ak-c3-tip');
  const dial = q('#c3-dial');
  const bead = q('#c3-bead');
  const beadF = bead.querySelector('img');
  const beadB = q('#c3-bead-b');
  const ropeTag = q('#c3-tag');

  function zIndexOf(zn) {
    const z = Math.max(-1.3, Math.min(1.3, zn));
    return z < 0 ? 100 + Math.round(((z + 1.3) / 1.3) * 390) : 510 + Math.round((z / 1.3) * 390);
  }

  // a soft light, drawn once and stamped along the paths
  const glowSprite = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,250,240,1)');
    grd.addColorStop(0.18, 'rgba(255,236,200,.95)');
    grd.addColorStop(0.45, 'rgba(255,184,110,.42)');
    grd.addColorStop(1, 'rgba(255,170,90,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return c;
  })();

  // ---------- layout ----------
  let skyW = 0, skyH = 0;
  const LANTERN = [206, 96];
  let Wb = 0, Hb = 0, Hfull = 0, f = 1, R = 280, cx = 0, cy = 0, dpr = 1, rPx = 280;
  function layout() {
    Wb = scene.clientWidth;
    Hfull = scene.clientHeight;
    Hb = Hfull - (parseFloat(getComputedStyle(scene).getPropertyValue('--c3-under')) || 0);
    if (!Wb || Hb <= 0) return;
    // on a phone the scene runs edge to edge, so the side islands may sail off the screen edge
    const narrow = Wb < 620 && Wb >= root.clientWidth - 4;
    R = narrow ? 250 : 280;
    // on a wide screen the panes sit low in the corners, turned in like a V, and the ring keeps clear of their inner edges
    wide = wideQuery.matches;
    cx = Wb / 2;
    let gapL = Wb / 2, gapR = Wb / 2, view = null, paneTop = Infinity;
    if (wide) {
      view = paneView();
      gapL = cx - paneEdge(paneB, -1, true, view)[0];
      gapR = paneEdge(paneF, 1, true, view)[0] - cx;
    }
    const needW = 2 * (R + W0 * (narrow ? 0.18 : 0.5)) + (narrow ? 0 : 36);
    const needH = 540;
    // up to 1.1: the largest the island pictures allow at twice their shown size
    f = wide ? Math.min(1.1, (Math.min(gapL, gapR) - CLEAR) / RING_HALF, Hb / needH) : Math.min(1.1, Wb / needW, Hb / needH);
    let low = 0;
    // the panes hang level with the front island. If an island would touch a pane anywhere on its turn, the panes first drop
    // a little lower (up to 40 px), and only then does the ring get a little smaller
    for (let k = 0; k < 30; k++) {
      rPx = R * f;
      cy = Math.round((Hb - 528 * f) / 2 + 262 * f);
      if (!wide) break;
      const sFront = (W0 * f * S_MAX) / IMG_W;
      const top0 = Math.round(cy + rPx * K * S_MAX - 100 * sFront - view.dy);
      let clear = false;
      for (let drop = 0; drop <= 40 && !clear; drop += 10) {
        paneB.style.top = paneF.style.top = `${top0 + drop}px`;
        paneTop = top0 + drop + view.dy;
        clear = ringClear(view);
      }
      if (clear) break;
      f *= 0.97;
    }
    ringF = f;
    if (wide) {
      for (const [el, side] of [[paneB, -1], [paneF, 1]]) low = Math.max(low, paneEdge(el, side, false, view)[3], paneEdge(el, side, true, view)[3]);
      // each ray lands a little way under the glass of the pane's inner edge
      rayB = paneEdge(paneB, -1, true, view);
      rayF = paneEdge(paneF, 1, true, view);
      rayB[0] -= 14; rayB[2] -= 14; rayB[1] += 10; rayB[3] -= 10;
      rayF[0] += 14; rayF[2] += 14; rayF[1] += 10; rayF[3] -= 10;
    } else {
      paneB.style.top = paneF.style.top = '';
      rayB = rayF = null;
    }
    dpr = Math.min(2, devicePixelRatio || 1);
    for (const isl of isles) {
      isl.scMax = ((isl.centre ? WC : W0 * S_MAX) * f) / IMG_W;
      isl.el.style.width = `${IMG_W * isl.scMax}px`;
      isl.el.style.height = `${isl.h * isl.scMax}px`;
      const gw = IMG_W * isl.scMax;
      isl.glow.style.top = `${isl.padY * isl.scMax - gw * 0.42}px`;
      isl.ping.style.left = `${(isl.padX - 120) * isl.scMax}px`;
      isl.ping.style.top = `${(isl.padY - 58) * isl.scMax}px`;
      isl.ping.style.width = `${240 * isl.scMax}px`;
      isl.ping.style.height = `${116 * isl.scMax}px`;
      isl.glow.style.height = `${gw * 0.84}px`;
    }
    for (const c of clouds) {
      let w = c.w * f * (c.zn !== undefined ? 1 + PERSP * c.zn : 1);
      // a cloud low enough to reach the panes' height keeps between them; the ones above may use the whole width
      const low = cy + c.y * f + (w * c.ratio) / 2 + 8 * f > paneTop;
      const gl = low ? gapL : Wb / 2, gr = low ? gapR : Wb / 2;
      if (c.src === 'bank') w = Math.min(w, 2 * Math.min(gl, gr) - 2 * c.amp * f - 8, 900);
      c.wpx = w;
      c.limL = Math.max(0, gl - w / 2 - 4);
      c.limR = Math.max(0, gr - w / 2 - 4);
      c.hpx = w * c.ratio;
      c.el.style.width = `${w}px`;
      c.el.style.height = `${c.hpx}px`;
      if (c.zn !== undefined) {
        // keep each cloud clear of the place where an island passes its depth, so the order never flips under the eye
        const s = 1 + PERSP * c.zn;
        c.maxX = rPx * Math.sqrt(1 - c.zn * c.zn) * s - (W0 * f * s) / 2 - w / 2 - 6 * f;
      }
    }
    const bw = 64 * f;
    balloon.el.style.width = `${bw}px`;
    balloon.el.style.height = `${bw * (428 / 312)}px`;
    balloon.w = bw;
    balloon.rr = Math.min(1.22, (Wb / 2 - bw * 0.6 - 6) / (rPx * 1.06));
    const pw = 50 * Math.min(1, f);
    plane.el.style.width = `${pw}px`;
    plane.el.style.height = `${pw * (228 / 328)}px`;
    plane.w = pw;
    for (const cv of [cvB, cvF]) {
      cv.width = Math.round(Wb * dpr);
      cv.height = Math.round(Hb * dpr);
      cv.style.width = `${Wb}px`;
      cv.style.height = `${Hb}px`;
    }
    const ox = scene.offsetLeft, oy = scene.offsetTop;
    // the clay control sits under the bottom cloud bank, centred under the ring, the rope's middle a little below the bank's
    // centre, and the hero grows to hold it
    const bank = clouds.find((c) => c.layer === 'fg');
    const dialW = dial.offsetWidth;
    const dTop = cy + bank.y * f + 0.1 * bank.hpx + 0.025 * dialW - ROPE.mid * dialW / ROPE.w;
    const dialH = placeDial(oy + dTop, ox);
    if (wide) {
      stage.style.paddingBottom = `${Math.max(44, Math.ceil(low + 30 - Hb), Math.ceil(dTop + dialH + 24 - Hb))}px`;
      panesEl.style.marginTop = '';
    } else {
      stage.style.paddingBottom = '';
      panesEl.style.marginTop = `${Math.max(12, Math.ceil(dTop + dialH + 12 - Hb))}px`;
    }
    const aw = 860 * f, ah = 380 * f;
    after.style.width = `${aw}px`;
    after.style.height = `${ah}px`;
    after.style.left = `${ox + cx - aw / 2}px`;
    after.style.top = `${oy + cy + 30 * f - ah / 2}px`;
    const sw = q('.ak-c3-stage').clientWidth;
    skyCv.width = Math.round(sw * dpr);
    skyCv.height = Math.round((oy + Hb) * dpr);
    skyCv.style.width = `${sw}px`;
    skyCv.style.height = `${oy + Hb}px`;
    skyW = sw; skyH = oy + Hb;
    makeStars();
    // the rays' canvas covers the whole stage, so they reach panes that hang below the ring
    coneOX = ox; coneOY = oy;
    coneW = stage.clientWidth; coneH = stage.clientHeight;
    cvC.width = Math.round(coneW * dpr);
    cvC.height = Math.round(coneH * dpr);
    cvC.style.width = `${coneW}px`;
    cvC.style.height = `${coneH}px`;
    if (centre.halo) {
      const hd = 560 * centre.scMax;
      centre.halo.style.width = centre.halo.style.height = `${hd}px`;
      centre.halo.style.left = `${LANTERN[0] * centre.scMax - hd / 2}px`;
      centre.halo.style.top = `${LANTERN[1] * centre.scMax - hd / 2}px`;
    }
    const moonD = 58 * f;
    moon.style.width = moon.style.height = `${moonD}px`;
    moon.style.left = `${Math.min(ox + cx + 232 * f, sw - 12 - moonD)}px`;
    moon.style.top = `${oy + Math.max(10, cy - 262 * f)}px`;
    requestFrame();
  }

  // ---------- ring motion ----------
  let T = 0;
  let ang = 0, vel = 0, velS = 0;
  let mode = 'enter';
  let tgt = 0, sprW = 4, sprZ = 0.8;
  let dragTarget = 0;
  let holdUntil = 0;
  let enterT = -1;
  let entered = false;
  let akari = false;
  let hovered = -1;
  let pointerInside = false;
  let overPanel = false;
  let pressedIsle = -1;
  let focusInside = false;
  let autoTgt = 0, autoArrived = true, dwellUntil = 0;
  const DWELL = 3.4;
  const ENTER_TURN = SLOT * 1.6;
  const wrap = (a) => ((a % TAU) + TAU) % TAU;
  const frontIndex = () => ((Math.round(-ang / SLOT) % N) + N) % N;

  function spring(target, w, z, dt) {
    const n = 4, h = dt / n;
    for (let k = 0; k < n; k++) {
      const acc = -w * w * (ang - target) - 2 * z * w * vel;
      vel += acc * h;
      ang += vel * h;
    }
  }
  function hold(sec) { holdUntil = Math.max(holdUntil, T + sec); }
  function settleTo(target, w, z) {
    tgt = target; sprW = still ? 14 : w; sprZ = still ? 1 : z;
    mode = 'settle';
    requestFrame();
  }
  function step(dir) {
    if (!entered) return;
    akari = false;
    const base = mode === 'settle' ? tgt : Math.round(ang / SLOT) * SLOT;
    settleTo(base - dir * SLOT, 4.4, 0.8);
    hold(8);
  }
  function goTo(i) {
    if (!entered) return;
    if (i === 9) { selectAkari(); return; }
    akari = false;
    let d = (-i * SLOT) - ang;
    d = wrap(d + Math.PI) - Math.PI;
    settleTo(ang + d, 4.0, 0.82);
    hold(8);
  }
  function selectAkari() {
    akari = true;
    settleTo(Math.round(ang / SLOT) * SLOT, 5, 0.85);
    hold(14);
    syncSelection(true);
  }
  function stepRing(dt) {
    if (mode === 'enter') {
      const e = enterT < 0 ? 0 : Math.min(1, enterT / 2.6);
      ang = ENTER_TURN * Math.pow(1 - e, 3);
      vel = enterT < 0 ? 0 : -3 * ENTER_TURN * Math.pow(1 - e, 2) / 2.6;
      if (e >= 1) { ang = 0; vel = 0; mode = 'idle'; entered = true; hold(still ? 1e9 : 3.2); }
    } else if (mode === 'drag') {
      spring(dragTarget, 21, 1, dt);
    } else if (mode === 'settle') {
      spring(tgt, sprW, sprZ, dt);
      if (Math.abs(ang - tgt) < 0.0004 && Math.abs(vel) < 0.002) { ang = tgt; vel = 0; mode = 'idle'; }
    } else if (mode === 'idle') {
      if (!still && T > holdUntil && !pointerInside && !overPanel && !focusInside) {
        if (akari) { akari = false; hold(1.5); } else { mode = 'auto'; autoTgt = Math.round(ang / SLOT) * SLOT; autoArrived = true; dwellUntil = T + 1.2; }
      }
    } else if (mode === 'auto') {
      if (pointerInside || overPanel || focusInside || akari) {
        settleTo(Math.round(ang / SLOT) * SLOT, 3.2, 0.95);
      } else {
        // the ring turns by itself: it rests a moment with each island at the front, so the panes and the light can show it,
        // then eases on to the next one
        if (autoArrived && T >= dwellUntil) { autoTgt -= SLOT; autoArrived = false; }
        spring(autoTgt, 2.3, 1, dt);
        if (!autoArrived && Math.abs(ang - autoTgt) < 0.003 && Math.abs(vel) < 0.02) { autoArrived = true; dwellUntil = T + DWELL; }
      }
    }
    velS += (vel - velS) * Math.min(1, dt * 6);
  }

  // ---------- selection, and the two panes for the island at the front ----------
  const pvB = qa('.ak-c3-pane--board .ak-c3-pv');
  const pvF = qa('.ak-c3-pane--feat .ak-c3-pv');
  const live = q('#c3-live');
  let pvOn = 0;
  let shown = -1;
  let selected = 0;
  let announced = false;
  function esc(t) { return String(t).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]); }
  const GO_ARROW = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // small line icons, one per feature
  const ICON = {
    pin: '<path d="M10 17.5s5.5-5 5.5-9.2a5.5 5.5 0 0 0-11 0c0 4.2 5.5 9.2 5.5 9.2z"/><circle cx="10" cy="8.3" r="2"/>',
    pay: '<rect x="2.5" y="5.5" width="15" height="9" rx="1.8"/><circle cx="10" cy="10" r="2"/><path d="M5.5 8v4M14.5 8v4"/>',
    map: '<path d="M2.8 5.2 7.3 3.5l5.4 2 4.5-1.7v11l-4.5 1.7-5.4-2-4.5 1.7z"/><path d="M7.3 3.5v11M12.7 5.5v11"/>',
    layers: '<path d="M10 3 2.8 6.8 10 10.6l7.2-3.8z"/><path d="m2.8 10.2 7.2 3.8 7.2-3.8"/><path d="m2.8 13.4 7.2 3.8 7.2-3.8"/>',
    user: '<circle cx="10" cy="7" r="3"/><path d="M4 17c.8-3.2 3.2-5 6-5s5.2 1.8 6 5"/>',
    filter: '<path d="M3 4.5h14l-5.4 6.4v4.6l-3.2 1.6v-6.2z"/>',
    bell: '<path d="M5.5 13.5V9a4.5 4.5 0 0 1 9 0v4.5l1.5 1.8H4z"/><path d="M8.3 17.2a1.8 1.8 0 0 0 3.4 0"/>',
    send: '<path d="M17 3 3 9l5.8 2.2L11 17z"/><path d="M8.8 11.2 17 3"/>',
    list: '<rect x="3" y="3" width="14" height="14" rx="2.5"/><path d="M6.5 7.5h7M6.5 10.5h7M6.5 13.5h4"/>',
    clock: '<circle cx="10" cy="10.8" r="6.2"/><path d="M10 7.6v3.2l2.2 1.4M8 2.6h4"/>',
    camera: '<path d="M3 6.8h3l1.4-2h5.2l1.4 2h3v9H3z"/><circle cx="10" cy="11" r="2.8"/>',
    scan: '<path d="M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M17 13v2.5a1.5 1.5 0 0 1-1.5 1.5H13M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13"/><path d="M6.5 10h7"/>',
    spark: '<path d="M10 2.8c.5 3.6 2.6 5.7 6.2 6.2-3.6.5-5.7 2.6-6.2 6.2-.5-3.6-2.6-5.7-6.2-6.2 3.6-.5 5.7-2.6 6.2-6.2z"/>',
    unlock: '<rect x="4" y="9" width="12" height="8.5" rx="2"/><path d="M7 9V6.5a3 3 0 0 1 5.8-1.1"/>',
    chat: '<path d="M3.5 4.5h13v9H9l-3.5 3v-3h-2z"/>',
    window: '<rect x="2.5" y="3.5" width="15" height="13" rx="2"/><path d="M2.5 7h15"/>',
    phone: '<rect x="5.5" y="2.5" width="9" height="15" rx="2"/><path d="M9 15h2"/>',
    build: '<path d="M12.6 3.2a4 4 0 0 0-4.9 5.2l-4.5 4.5a1.6 1.6 0 0 0 2.3 2.3l4.5-4.5a4 4 0 0 0 5.2-4.9l-2.4 2.4-2.1-.5-.5-2.1z"/>',
    search: '<circle cx="9" cy="9" r="5.5"/><path d="m13.2 13.2 3.8 3.8"/>',
    trend: '<path d="M3 14.5 7.5 10l3.5 3.5L17 7"/><path d="M12.5 7H17v4.5"/>',
  };
  function goHTML(p) {
    if (p.live) return `<a class="ak-c3-go" href="https://${p.url}">${esc(p.url)}${GO_ARROW}</a>`;
    if (p.url) return `<span class="ak-c3-go">Opening at ${esc(p.url)}</span>`;
    if (p.go && p.go.href) return `<a class="ak-c3-go" href="${p.go.href}">${esc(p.go.text)}${GO_ARROW}</a>`;
    return p.go ? `<span class="ak-c3-go">${esc(p.go.text)}</span>` : '';
  }
  const icon = (k) => `<span class="ak-c3-ico" aria-hidden="true"><svg viewBox="0 0 20 20">${ICON[k]}</svg></span>`;
  const bar = (label) => `<div class="ak-c3-wbar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(label)}</span></div>`;
  const paneShot = (p) => `pane-${p.shot.replace(/^b-/, '')}`;
  const pic = (src, alt, w, h) => `<img src="${ASSET}${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" decoding="async" draggable="false">`;
  // left pane: the board itself
  function boardHTML(p) {
    // each pane has its own picture: the board's hero, cropped and sized for the pane, so its words stay readable
    if (p.kind === 'web') return `<div class="ak-c3-bx"><div class="ak-c3-win">${bar(p.url)}${pic(paneShot(p), `The ${p.name} home page`, 610, 356)}</div></div>`;
    if (p.kind === 'chat') return `<div class="ak-c3-bx"><div class="ak-c3-win">${bar('ChatGPT or Claude')}<div class="ak-c3-chatb" role="img" aria-label="A chat where PMHNP Hiring answers with job cards"><p class="ak-c3-you">Find remote PMHNP jobs that pay $150k and up</p><p class="ak-c3-app"><i></i>PMHNP Hiring</p>${pic('pane-chat-1', '', 566, 134)}${pic('pane-chat-2', '', 566, 134)}</div></div></div>`;
    if (p.kind === 'gym') return `<div class="ak-c3-bx"><div class="ak-c3-phones"><span class="ak-c3-ph ak-c3-ph--l">${pic('pane-g-eat', 'Tetsu: the food log', 163, 367)}</span><span class="ak-c3-ph ak-c3-ph--m">${pic('pane-g-log', 'Tetsu: logging a workout', 163, 367)}</span><span class="ak-c3-ph ak-c3-ph--r">${pic('pane-g-progress', 'Tetsu: progress', 163, 367)}</span></div></div>`;
    return `<div class="ak-c3-bx"><ul class="ak-c3-grid" aria-label="Everything on the ring">${PRODUCTS.slice(0, 9).map((t) => `<li class="ak-c3-gt"><span class="ak-c3-gi" aria-hidden="true">${pic(`pane-t-${t.n}`, '', 82, 82)}</span><b>${esc(t.short)}</b></li>`).join('')}</ul></div>`;
  }
  // right pane: what it does
  function featHTML(p) {
    const pill = `<span class="ak-c3-status${p.live ? ' is-live' : ''}${p.dark ? ' is-dark' : ''}"><i></i>${esc(p.status)}</span>`;
    const chips = p.chips ? `<ul class="ak-c3-chips">${p.chips.map((c) => `<li class="ak-c3-chip">${esc(c)}</li>`).join('')}</ul>` : '';
    const list = `<ul class="ak-c3-flist">${p.feats.map(([k, t]) => `<li>${icon(k)}<span>${esc(t)}</span></li>`).join('')}</ul>`;
    const meta = p.meta ? `<span class="ak-c3-pmeta">${esc(p.meta)}</span>` : '';
    return `<div class="ak-c3-fhead"><div class="ak-c3-prow">${pill}${meta}</div><p class="ak-c3-fname">${esc(p.name)}</p></div>${chips}${list}${goHTML(p)}`;
  }
  function showCard(i) {
    if (i === shown) return;
    shown = i;
    const p = PRODUCTS[i];
    const swap = (pvs, html) => {
      const next = pvs[1 - pvOn], prev = pvs[pvOn];
      next.style.cssText = `--pc:${p.pc};--pk:${p.pk};--pt:${p.pt};--r1:${p.ray[0]};--r2:${p.ray[1]}`;
      next.innerHTML = html;
      next.removeAttribute('aria-hidden');
      prev.setAttribute('aria-hidden', 'true');
      prev.classList.remove('is-on');
      next.classList.add('is-on');
    };
    swap(pvB, boardHTML(p));
    swap(pvF, featHTML(p));
    pvOn = 1 - pvOn;
    // screen readers hear each change once
    // only the stacked layout's glow reads these; they live on the panes so a change restyles nothing else
    panesEl.style.setProperty('--c3-ray1', p.ray[0]);
    panesEl.style.setProperty('--c3-ray2', p.ray[1]);
    if (announced) live.textContent = `${p.name}. ${p.status}${p.meta ? `, ${p.meta}` : ''}. ${p.feats.map((x) => x[1]).join('. ')}.`;
    announced = true;
  }
  // the bead's colour, the tag's name and the slider's value follow the island at the front
  let beadShows = -1;
  let beadU = -1, beadSlide = null, beadTr = '', tagTr = '', tagW = 0;
  function syncBead() {
    const i = selected;
    if (i === beadShows) return;
    beadShows = i;
    const p = PRODUCTS[i];
    const f = `${ASSET}bead-f-${p.n}.webp`, b = `${ASSET}bead-b-${p.n}.webp`;
    beadF.dataset.want = f;
    // both halves change together once both are decoded, so the bead never shows two colours
    Promise.all([f, b].map((src) => { const im = new Image(); im.src = src; return im.decode ? im.decode().catch(() => {}) : Promise.resolve(); }))
      .then(() => { if (beadF.dataset.want === f) { beadF.src = f; beadB.src = b; } });
    ropeTag.textContent = p.short;
    tagW = ropeTag.offsetWidth;
    tagTr = '';
    bead.setAttribute('aria-valuenow', String(Math.min(9, i + 1)));
    bead.setAttribute('aria-valuetext', i === 9 ? 'Akari Labs, the company' : p.name);
  }
  function syncSelection(force) {
    const want = akari ? 9 : frontIndex();
    if (want !== selected || force) {
      selected = want;
      isles.forEach((isl, k) => isl.el.classList.toggle('is-sel', k === selected));
    }
    // the panes change once the ring has slowed, so a fast spin does not flicker through every product
    if (shown !== selected && (Math.abs(vel) < 0.6 || mode === 'auto')) showCard(selected);
    syncBead();
  }

  // the pictures the panes will need, fetched once the ring is up
  function preloadPanes() {
    const srcs = [...PRODUCTS.filter((p) => p.shot).map(paneShot), 'pane-chat-1', 'pane-chat-2', 'pane-g-eat', 'pane-g-log', 'pane-g-progress', ...PRODUCTS.slice(0, 9).map((p) => `pane-t-${p.n}`)];
    for (const s of srcs) { const im = new Image(); im.decoding = 'async'; im.src = `${ASSET}${s}.webp`; }
    for (const p of PRODUCTS) for (const h of ['f', 'b']) { const im = new Image(); im.decoding = 'async'; im.src = `${ASSET}bead-${h}-${p.n}.webp`; }
  }

  // ---------- the light from the front island to the two panes ----------
  // It fades while the ring turns, follows the new front island, and comes back once the island
  // has settled and the panes show it. Below the wide layout it is a soft glow down to the panes.
  let coneLv = 0;
  let coneCss = -1;
  function coneWant() {
    if (!entered) return 0;
    let near = 1;
    if (!akari) {
      const off = Math.abs(wrap(ring[selected].phi + Math.PI) - Math.PI);
      near = 1 - smooth01((off - 0.05) / 0.16);
    }
    const calm = 1 - smooth01((Math.abs(velS) - 0.18) / 0.5);
    return near * calm * (shown === selected ? 1 : 0) * smooth01((litT - 2.3) / 0.9);
  }
  function stepCones(dt) {
    const want = coneWant();
    if (still) coneLv = want;
    else coneLv += (want - coneLv) * Math.min(1, dt * (want > coneLv ? 2.4 : 8));
    const css = Math.round(coneLv * 50) / 50;
    // the stacked layout's glow follows the light; on wide screens nothing reads it, so it is not written there
    if (!wide && css !== coneCss) { coneCss = css; panesEl.style.setProperty('--c3-cone', String(css)); }
  }
  function coneSource() {
    if (akari) { const C = centre; return [C.sx + (LANTERN[0] - C.padX) * C.sc, C.sy + (LANTERN[1] - C.padY) * C.sc]; }
    const isl = ring[selected];
    return [isl.sx, isl.sy - (isl.padY - isl.crown) * isl.sc * 0.42];
  }
  // the rays' colours ease to the new island's pair while the rays are down, so a change is a cross-fade
  const hexRgb = (x) => [parseInt(x.slice(1, 3), 16), parseInt(x.slice(3, 5), 16), parseInt(x.slice(5, 7), 16)];
  for (const p of PRODUCTS) p.rayRgb = p.ray.map(hexRgb);
  const rayCol = PRODUCTS[0].rayRgb.map((c) => c.slice());
  function stepRayColour(dt) {
    const want = PRODUCTS[Math.max(0, shown)].rayRgb;
    const k = still ? 1 : Math.min(1, dt * 4);
    for (let s = 0; s < 2; s++) for (let j = 0; j < 3; j++) rayCol[s][j] += (want[s][j] - rayCol[s][j]) * k;
  }
  const rgba = (c, a, lift = 0) => `rgba(${Math.round(c[0] + (255 - c[0]) * lift)},${Math.round(c[1] + (255 - c[1]) * lift)},${Math.round(c[2] + (255 - c[2]) * lift)},${a})`;
  function drawRay(c, ax, ay, seg, col, lvl) {
    const [x0, y0, x1, y1] = seg;
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    const grd = c.createLinearGradient(ax, ay, mx, my);
    // a light core where it leaves the island, thinner over the islands between, glowing again where it lands
    grd.addColorStop(0, rgba(col, 0.85, 0.62));
    grd.addColorStop(0.14, rgba(col, 0.58, 0.22));
    grd.addColorStop(0.5, rgba(col, 0.31));
    grd.addColorStop(0.84, rgba(col, 0.4));
    grd.addColorStop(1, rgba(col, 0.56, 0.08));
    c.fillStyle = grd;
    // a full core, then thin wedges outside it so the edge is soft
    for (const [k, al] of [[1, 0.12], [0.94, 0.12], [0.88, 0.12], [0.82, 0.12], [0.76, 0.52]]) {
      c.globalAlpha = lvl * al;
      c.beginPath();
      c.moveTo(ax, ay - 2.5 * f);
      c.lineTo(mx + (x0 - mx) * k, my + (y0 - my) * k);
      c.lineTo(mx + (x1 - mx) * k, my + (y1 - my) * k);
      c.lineTo(ax, ay + 2.5 * f);
      c.closePath();
      c.fill();
    }
    // the pane's edge catches the light
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save();
    c.translate(mx, my);
    c.rotate(Math.atan2(y1 - y0, x1 - x0));
    c.scale((len * 0.46) / 60, 1);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 60);
    g.addColorStop(0, rgba(col, 0.5, 0.2));
    g.addColorStop(1, rgba(col, 0));
    c.globalAlpha = lvl * 0.6;
    c.fillStyle = g;
    c.beginPath();
    c.arc(0, 0, 60, 0, TAU);
    c.fill();
    c.restore();
  }
  function drawCones(motion) {
    const c = ctxC;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, coneW, coneH);
    if (!wide || !rayB || coneLv < 0.004) return;
    c.translate(coneOX, coneOY);
    const [ax, ay] = coneSource();
    const lvl = coneLv * (motion ? 0.93 + 0.07 * Math.sin(T * 1.7) * Math.sin(T * 0.61 + 1.3) : 1);
    c.save();
    c.globalCompositeOperation = 'lighter';
    drawRay(c, ax, ay, rayB, rayCol[0], lvl);
    drawRay(c, ax, ay, rayF, rayCol[1], lvl);
    // where the light leaves the island: a white core in a halo of both colours
    const rr = 44 * f;
    for (const [col, dx] of [[rayCol[0], -0.18], [rayCol[1], 0.18]]) {
      const g = c.createRadialGradient(ax + dx * rr, ay, 0, ax + dx * rr, ay, rr);
      g.addColorStop(0, rgba(col, 0.55, 0.4));
      g.addColorStop(1, rgba(col, 0));
      c.globalAlpha = lvl * 0.7;
      c.fillStyle = g;
      c.beginPath();
      c.arc(ax + dx * rr, ay, rr, 0, TAU);
      c.fill();
    }
    const core = c.createRadialGradient(ax, ay, 0, ax, ay, rr * 0.3);
    core.addColorStop(0, 'rgba(255, 255, 250, 0.95)');
    core.addColorStop(1, 'rgba(255, 255, 250, 0)');
    c.globalAlpha = lvl;
    c.fillStyle = core;
    c.beginPath();
    c.arc(ax, ay, rr * 0.3, 0, TAU);
    c.fill();
    c.restore();
  }

  // ---------- night: the hero is always night ----------
  // As the islands rise, their windows come on one by one, then the stars, the fireflies and the beam.
  const nightOn = true;
  let litT = -1;
  const lv = { base: 1, stars: 0, beam: 0 };
  let beamA = 2.3;
  let shoot = null;
  let nextShoot = 6;
  const smooth01 = (x) => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };
  function stepNight(dt) {
    if (litT < 0) return;
    if (litT < 60) litT += dt;
    const t = litT;
    lv.stars = smooth01((t - 0.3) / 1.2);
    lv.beam = smooth01((t - 3.0) / 0.9);
    for (const isl of isles) {
      const start = isl.centre ? 0.15 : 0.45 + isl.i * 0.13;
      isl.emitLv = smooth01((t - start - 0.85) / 0.4);
    }
  }
  const nightMoving = () => litT >= 0 && litT < 4;
  const STAR_TINT = [246, 241, 214];
  function makeStars() {
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const n = Math.round(Math.min(150, (skyW * skyH) / 4200));
    stars = [];
    for (let k = 0; k < n; k++) {
      const y = Math.pow(rnd(), 1.5) * skyH * 0.78;
      stars.push({ x: rnd() * skyW, y, r: 0.45 + Math.pow(rnd(), 3) * 1.25, a: 0.35 + rnd() * 0.6, w: 0.6 + rnd() * 2.2, p: rnd() * 6.3 });
    }
  }
  let skyDrawn = false;
  let skyTick = 0;
  function drawSky(dt, motion) {
    if (lv.stars <= 0) {
      if (skyDrawn) { skyCtx.setTransform(1, 0, 0, 1, 0, 0); skyCtx.clearRect(0, 0, skyCv.width, skyCv.height); skyDrawn = false; }
      return;
    }
    // the stars only need a fresh frame every third tick, unless a shooting star is crossing or the dusk is running
    skyTick = (skyTick + 1) % 3;
    if (skyDrawn && skyTick !== 0 && !shoot && lv.stars >= 1 && !(motion && T > nextShoot && nightOn)) return;
    skyDrawn = true;
    const c = skyCtx;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, skyW, skyH);
    const [r, g, b] = STAR_TINT;
    for (const st of stars) {
      const tw = motion ? 0.55 + 0.45 * Math.sin(T * st.w + st.p) * Math.sin(T * st.w * 0.37 + st.p * 2) : 0.8;
      c.globalAlpha = lv.stars * st.a * (0.45 + 0.55 * tw);
      c.fillStyle = `rgb(${r},${g},${b})`;
      c.beginPath();
      c.arc(st.x, st.y, st.r, 0, TAU);
      c.fill();
    }
    // now and then a shooting star
    if (motion && nightOn && lv.stars > 0.9) {
      if (!shoot && T > nextShoot) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        shoot = { x: skyW * (0.25 + Math.random() * 0.55), y: skyH * (0.05 + Math.random() * 0.22), dx: dir * (0.78 + Math.random() * 0.2), dy: 0.42 + Math.random() * 0.2, t: 0, len: (110 + Math.random() * 90) * Math.max(0.6, f) };
      }
      if (shoot) {
        shoot.t += dt / 0.95;
        const e = shoot.t;
        const hx = shoot.x + shoot.dx * e * 420 * f, hy = shoot.y + shoot.dy * e * 420 * f;
        const tx = hx - shoot.dx * shoot.len, ty = hy - shoot.dy * shoot.len;
        const grd = c.createLinearGradient(tx, ty, hx, hy);
        grd.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0.95)`);
        c.globalAlpha = Math.sin(Math.min(1, e) * Math.PI);
        c.strokeStyle = grd;
        c.lineWidth = 1.6;
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(tx, ty);
        c.lineTo(hx, hy);
        c.stroke();
        if (e >= 1) { shoot = null; nextShoot = T + 9 + Math.random() * 14; }
      }
    }
    c.globalAlpha = 1;
  }

  // ---------- hit testing ----------
  function hitIsle(isl, px, py) {
    if (isl.enter < 0.9) return false;
    const lx = isl.padX + (px - isl.sx) / isl.sc;
    const ly = isl.padY + (py - isl.sy) / isl.sc;
    if (lx < 0 || ly < 0 || lx >= IMG_W || ly >= isl.h) return false;
    const k = Math.floor(ly / MASK_CELL) * MASK_COLS + Math.floor(lx / MASK_CELL);
    return ((isl.mask[k >> 3] >> (k & 7)) & 1) === 1;
  }
  function pick(px, py) {
    const order = isles.slice().sort((a, b) => b.zi - a.zi);
    for (const isl of order) if (hitIsle(isl, px, py)) return isl.i;
    return -1;
  }

  // ---------- pointer: drag with inertia and a soft snap ----------
  let ptr = null;
  const local = (e) => { const r = scene.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  scene.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !entered) return;
    ptr = { id: e.pointerId, x0: e.clientX, y0: e.clientY, a0: ang, drag: false, samples: [[e.timeStamp, e.clientX]], type: e.pointerType };
    const [px, py] = local(e);
    pressedIsle = pick(px, py);
    requestFrame();
  });
  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse') {
      const [mx, my] = local(e);
      pointerInside = Math.abs(mx - cx) < rPx * 1.3 && my > cy - 300 * f && my < cy + 250 * f;
    }
    if (!ptr || e.pointerId !== ptr.id) {
      if (e.pointerType === 'mouse' && !ptr) { mouse = local(e); requestFrame(); }
      return;
    }
    const dx = e.clientX - ptr.x0, dy = e.clientY - ptr.y0;
    if (!ptr.drag) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy) * 1.1) {
        ptr.drag = true;
        pressedIsle = -1;
        try { scene.setPointerCapture(e.pointerId); } catch (err) { /* capture is a nicety */ }
        ptr.x0 = e.clientX;
        ptr.a0 = mode === 'drag' ? dragTarget : ang;
        dragTarget = ang;
        if (mode === 'enter') return;
        mode = 'drag';
        akari = false;
        scene.classList.add('is-drag');
        setHover(-1);
        requestFrame();
      } else if (Math.abs(dy) > 12) {
        ptr = null;
        pressedIsle = -1;
        return;
      }
    }
    if (ptr.drag) {
      dragTarget = ptr.a0 + (e.clientX - ptr.x0) / (rPx * S_MAX);
      ptr.samples.push([e.timeStamp, e.clientX]);
      while (ptr.samples.length > 2 && e.timeStamp - ptr.samples[0][0] > 110) ptr.samples.shift();
    }
  });
  function release(cancelled) {
    pressedIsle = -1;
    if (!ptr) return;
    const was = ptr;
    ptr = null;
    scene.classList.remove('is-drag');
    if (!was.drag) return;
    let v = 0;
    const s = was.samples;
    if (!cancelled && s.length > 1) {
      const a = s[0], b = s[s.length - 1];
      const ms = Math.max(16, b[0] - a[0]);
      v = ((b[1] - a[1]) / ms) * 1000 / (rPx * S_MAX);
      if (performance.now() - b[0] > 90) v = 0;
    }
    v = Math.max(-9, Math.min(9, v));
    // where the ring would come to rest on its own, then the nearest island to that
    const rest = ang + v * 0.34 + vel * 0.06;
    let snap = Math.round(rest / SLOT) * SLOT;
    if (v > 0.6 && snap < ang - SLOT * 0.1) snap += SLOT;
    if (v < -0.6 && snap > ang + SLOT * 0.1) snap -= SLOT;
    vel = v * 0.85 + vel * 0.15;
    settleTo(snap, 3.3, 0.74);
    hold(8);
  }
  scene.addEventListener('pointerup', (e) => {
    if (ptr && e.pointerId === ptr.id && !ptr.drag) {
      const [px, py] = local(e);
      const hit = pick(px, py);
      ptr = null;
      pressedIsle = -1;
      if (hit >= 0) { goTo(hit); setHover(-1); }
      return;
    }
    release(false);
  });
  scene.addEventListener('pointercancel', () => release(true));
  scene.addEventListener('lostpointercapture', () => { if (ptr && ptr.drag) release(false); });
  scene.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { pointerInside = false; mouse = null; setHover(-1); hold(2); } });
  scene.addEventListener('dragstart', (e) => e.preventDefault());
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(8); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectAkari(); }
    else if (e.key === 'ArrowDown' && akari) { e.preventDefault(); akari = false; hold(6); syncSelection(true); }
  });
  q('#c3-prev').addEventListener('click', () => step(-1));
  q('#c3-next').addEventListener('click', () => step(1));
  // the ring holds still while the pointer is on the buttons or on either pane
  for (const el of [dial, paneB, paneF]) {
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') overPanel = true; });
    el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { overPanel = false; hold(2); } });
  }
  root.addEventListener('focusin', () => { focusInside = true; });
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) { focusInside = false; hold(3); } });

  // ---------- the clay control ----------
  // the rope's centre line in its 612 x 134.5 frame: x, y, direction (radians) and depth scale at 121 even steps
  const ROPE = {
    w: 612, h: 134.5, mid: 82.1, bead: 103.5, beadTop: 48,
    knots: { l: { x: 29.5, y: 0, w: 61.5, h: 58 }, r: { x: 517.5, y: 2, w: 65.5, h: 63.5 } },
    path: [[65.9,54.3,0.249,0.921],[68.9,55,0.252,0.923],[71.8,55.8,0.25,0.926],[74.8,56.5,0.244,0.928],[77.8,57.3,0.238,0.93],[80.9,58,0.233,0.932],[84,58.8,0.229,0.934],[87.2,59.5,0.224,0.937],[90.4,60.2,0.219,0.939],[93.6,60.9,0.215,0.941],[96.9,61.6,0.21,0.943],[100.3,62.3,0.206,0.945],[103.6,63,0.201,0.947],[107,63.7,0.197,0.949],[110.5,64.4,0.192,0.951],[114,65.1,0.188,0.953],[117.5,65.8,0.183,0.955],[121.1,66.4,0.179,0.957],[124.7,67.1,0.175,0.959],[128.4,67.7,0.17,0.96],[132.1,68.3,0.166,0.962],[135.8,68.9,0.162,0.964],[139.6,69.5,0.157,0.966],[143.4,70.2,0.153,0.967],[147.3,70.7,0.149,0.969],[151.2,71.3,0.144,0.971],[155.1,71.9,0.14,0.972],[159.1,72.4,0.136,0.974],[163.1,73,0.132,0.975],[167.2,73.5,0.127,0.977],[171.3,74,0.123,0.978],[175.4,74.5,0.119,0.98],[179.5,75,0.115,0.981],[183.7,75.5,0.111,0.982],[187.9,75.9,0.106,0.983],[192.2,76.4,0.102,0.985],[196.5,76.8,0.098,0.986],[200.8,77.2,0.094,0.987],[205.2,77.6,0.09,0.988],[209.5,78,0.086,0.989],[213.9,78.4,0.081,0.99],[218.4,78.7,0.077,0.991],[222.8,79.1,0.073,0.992],[227.3,79.4,0.069,0.993],[231.8,79.7,0.065,0.994],[236.3,80,0.061,0.994],[240.9,80.3,0.057,0.995],[245.5,80.5,0.053,0.996],[250,80.7,0.049,0.996],[254.6,81,0.045,0.997],[259.3,81.2,0.041,0.998],[263.9,81.3,0.036,0.998],[268.5,81.5,0.032,0.998],[273.2,81.6,0.028,0.999],[277.9,81.8,0.024,0.999],[282.5,81.9,0.02,0.999],[287.2,81.9,0.016,1],[291.9,82,0.012,1],[296.6,82.1,0.008,1],[301.3,82.1,0.004,1],[306,82.1,0,1],[310.7,82.1,-0.004,1],[315.4,82.1,-0.008,1],[320.1,82,-0.012,1],[324.8,81.9,-0.016,1],[329.5,81.9,-0.02,0.999],[334.1,81.8,-0.024,0.999],[338.8,81.6,-0.028,0.999],[343.5,81.5,-0.032,0.998],[348.1,81.3,-0.036,0.998],[352.7,81.2,-0.041,0.998],[357.4,81,-0.045,0.997],[362,80.7,-0.049,0.996],[366.5,80.5,-0.053,0.996],[371.1,80.3,-0.057,0.995],[375.7,80,-0.061,0.994],[380.2,79.7,-0.065,0.994],[384.7,79.4,-0.069,0.993],[389.2,79.1,-0.073,0.992],[393.6,78.7,-0.077,0.991],[398.1,78.4,-0.081,0.99],[402.5,78,-0.086,0.989],[406.8,77.6,-0.09,0.988],[411.2,77.2,-0.094,0.987],[415.5,76.8,-0.098,0.986],[419.8,76.4,-0.102,0.985],[424.1,75.9,-0.106,0.983],[428.3,75.5,-0.111,0.982],[432.5,75,-0.115,0.981],[436.6,74.5,-0.119,0.98],[440.8,74,-0.123,0.978],[444.8,73.5,-0.127,0.977],[448.9,73,-0.132,0.975],[452.9,72.4,-0.136,0.974],[456.9,71.9,-0.14,0.972],[460.8,71.3,-0.144,0.971],[464.7,70.7,-0.149,0.969],[468.6,70.2,-0.153,0.967],[472.4,69.5,-0.157,0.966],[476.2,68.9,-0.162,0.964],[479.9,68.3,-0.166,0.962],[483.6,67.7,-0.17,0.96],[487.3,67.1,-0.175,0.959],[490.9,66.4,-0.179,0.957],[494.5,65.8,-0.183,0.955],[498,65.1,-0.188,0.953],[501.5,64.4,-0.192,0.951],[505,63.7,-0.197,0.949],[508.4,63,-0.201,0.947],[511.8,62.3,-0.206,0.945],[515.1,61.6,-0.21,0.943],[518.4,60.9,-0.215,0.941],[521.6,60.2,-0.219,0.939],[524.8,59.5,-0.224,0.937],[528,58.8,-0.229,0.934],[531.1,58,-0.233,0.932],[534.2,57.3,-0.238,0.93],[537.2,56.5,-0.244,0.928],[540.2,55.8,-0.25,0.926],[543.1,55,-0.252,0.923],[546.1,54.3,-0.249,0.921]],
  };
  // the bead travels between the knots; the whole travel is one full turn of the ring
  const T_MIN = 0.175, T_MAX = 0.825;
  let dk = 1;
  function ropeAt(t) {
    const P = ROPE.path, x = Math.max(0, Math.min(1, t)) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(x)), k = x - i;
    const a = P[i], b = P[i + 1];
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k];
  }
  // the share of the rope under a point; the rope runs left to right, so its x grows along it
  function ropeTAt(px) {
    const P = ROPE.path;
    if (px <= P[0][0]) return 0;
    if (px >= P[P.length - 1][0]) return 1;
    let lo = 0, hi = P.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (P[m][0] < px) lo = m; else hi = m; }
    return (lo + (px - P[lo][0]) / (P[hi][0] - P[lo][0])) / (P.length - 1);
  }
  // where the ring is, as a share of one full turn along the rope. The first island sits half a step in from the left end
  // and the last half a step in from the right, so the rope wraps halfway between them, never at an island the ring rests on
  const ropeU = (a) => wrap(SLOT / 2 - a) / TAU;
  const SLIDE = 0.34;
  function placeBead(dt) {
    // under reduced motion the bead jumps straight to where the ring is going
    const a = still && mode === 'settle' ? tgt : ang;
    const u = ropeU(a);
    if (beadU < 0 || still) { beadU = u; beadSlide = null; }
    else if (beadSlide) {
      // the ring came round from the last island to the first: the bead slides back along the rope instead of jumping
      beadSlide.t += dt;
      const p = Math.min(1, beadSlide.t / SLIDE);
      beadU = beadSlide.from + (u - beadSlide.from) * p * p * (3 - 2 * p);
      if (p >= 1) beadSlide = null;
    } else if (Math.abs(u - beadU) > 0.25) beadSlide = { from: beadU, t: 0 };
    else beadU = u;
    const [x, y, th, sc] = ropeAt(T_MIN + beadU * (T_MAX - T_MIN));
    const half = (ROPE.bead * dk) / 2;
    const tr = `translate3d(${(x * dk - half).toFixed(1)}px,${(y * dk - half).toFixed(1)}px,0) rotate(${((th * 180) / Math.PI).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
    if (tr !== beadTr) { beadTr = tr; bead.style.transform = tr; beadB.style.transform = tr; }
    if (!tagW) tagW = ropeTag.offsetWidth;
    const ty = y * dk - ROPE.beadTop * dk * sc - 12 * dk - 32 * dk + 3 * dk;
    const tt = `translate3d(${(x * dk - tagW / 2).toFixed(1)}px,${ty.toFixed(1)}px,0)`;
    if (tt !== tagTr) { tagTr = tt; ropeTag.style.transform = tt; }
  }
  let dragBead = null;
  dial.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !entered || e.target.closest('.ak-c3-knot')) return;
    dragBead = { id: e.pointerId, x0: e.clientX, y0: e.clientY, on: false };
  });
  dial.addEventListener('pointermove', (e) => {
    if (!dragBead || e.pointerId !== dragBead.id) return;
    const dx = e.clientX - dragBead.x0, dy = e.clientY - dragBead.y0;
    if (!dragBead.on) {
      // a sideways drag turns the ring; an upward or downward swipe is left to scroll the page
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { dragBead = null; return; }
      if (Math.abs(dx) < 5) return;
      dragBead.on = true;
      try { dial.setPointerCapture(e.pointerId); } catch (err) { /* capture is a nicety */ }
      akari = false;
      dragTarget = ang;
      mode = 'drag';
      dial.classList.add('is-drag');
    }
    const r = dial.getBoundingClientRect();
    const t = ropeTAt((e.clientX - r.left) / dk);
    const u = Math.max(0, Math.min(0.9999, (t - T_MIN) / (T_MAX - T_MIN)));
    let target = SLOT / 2 - u * TAU;
    target += Math.round((ang - target) / TAU) * TAU;
    dragTarget = target;
    requestFrame();
  });
  function endBead() {
    if (!dragBead) return;
    const was = dragBead.on;
    dragBead = null;
    dial.classList.remove('is-drag');
    if (was) { settleTo(Math.round(ang / SLOT) * SLOT, 4.4, 0.8); hold(8); }
  }
  dial.addEventListener('pointerup', endBead);
  dial.addEventListener('pointercancel', endBead);
  // a touch starts captured by the bead; only the loss of the control's own capture ends the drag
  dial.addEventListener('lostpointercapture', (e) => { if (e.target === dial) endBead(); });
  bead.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); step(1); }
    else if (k === 'ArrowLeft' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); step(-1); }
    else if (k === 'Home') { e.preventDefault(); goTo(0); }
    else if (k === 'End') { e.preventDefault(); goTo(8); }
  });
  function placeDial(top, ox) {
    const w = dial.offsetWidth;
    dk = w / ROPE.w;
    dial.style.left = `${Math.round(ox + cx - w / 2)}px`;
    dial.style.top = `${Math.round(top)}px`;
    for (const [el, b] of [[q('#c3-prev'), ROPE.knots.l], [q('#c3-next'), ROPE.knots.r]]) {
      el.style.left = `${(b.x * dk).toFixed(1)}px`;
      el.style.top = `${(b.y * dk).toFixed(1)}px`;
      el.style.width = `${(b.w * dk).toFixed(1)}px`;
      el.style.height = `${(b.h * dk).toFixed(1)}px`;
    }
    tagW = ropeTag.offsetWidth;
    beadTr = '';
    tagTr = '';
    placeBead(0);
    return ROPE.h * dk;
  }

  // ---------- hover label ----------
  let mouse = null;
  function setHover(i) {
    if (hovered === i) return;
    hovered = i;
    if (i < 0) { tip.classList.remove('is-on'); scene.classList.remove('is-over'); return; }
    const p = PRODUCTS[i];
    tip.style.setProperty('--pc', p.pc);
    tip.querySelector('b').textContent = p.n;
    tip.querySelector('span').textContent = p.name;
    tip.classList.add('is-on');
    requestFrame();
  }

  // ---------- drawing ----------
  let night = false;
  function placeIsle(isl, dt, motion) {
    const sel = isl.i === selected && entered;
    const liftWant = (sel ? 9 : 0) + (hovered === isl.i ? 7 : 0) - (pressedIsle === isl.i ? 5 : 0);
    isl.liftWant = liftWant;
    isl.lift += (liftWant - isl.lift) * Math.min(1, dt * (pressedIsle === isl.i ? 16 : 7));
    let s, x, y;
    if (isl.centre) {
      s = 1;
      isl.sc = isl.scMax;
      x = cx;
      y = cy - H_C * f;
      isl.zn = 0;
    } else {
      isl.phi = isl.i * SLOT + ang;
      const sn = Math.sin(isl.phi), cs = Math.cos(isl.phi);
      isl.zn = cs;
      s = 1 + PERSP * cs;
      isl.sc = (W0 * f * s) / IMG_W;
      x = cx + rPx * sn * s;
      y = cy + rPx * K * cs * s;
      // islands lean against the turn and wobble back, like something floating
      const vx = rPx * cs * s * velS;
      const swayWant = Math.max(-5, Math.min(5, -vx * 0.022));
      const w = 6.5 + (isl.i % 4) * 0.6;
      isl.swayV += (-w * w * (isl.sway - swayWant) - 2 * 0.32 * w * isl.swayV) * dt;
      isl.sway += isl.swayV * dt;
    }
    const bob = motion ? Math.sin(T * isl.bobW + isl.bobP) * 4.2 * isl.bobA * f * s : 0;
    // entrance: up out of the clouds
    let rise = 0, op = 1;
    if (!entered || isl.enter < 1) {
      const start = isl.centre ? 0.15 : 0.45 + isl.i * 0.13;
      const k = enterT < 0 ? 0 : Math.max(0, Math.min(1, (enterT - start) / 1.35));
      isl.enter = k;
      const e = 1 - Math.pow(1 - k, 3);
      const over = Math.sin(k * Math.PI) * 0.06;
      rise = (1 - e - over) * 210 * f;
      op = Math.min(1, k * 4.5);
    }
    const sx = x, sy = y + bob - isl.lift * f * s + rise;
    isl.sx = sx;
    isl.sy = sy;
    const k = isl.sc / isl.scMax;
    const r = isl.centre ? 0 : isl.sway;
    isl.el.style.transform = `translate3d(${sx.toFixed(2)}px,${sy.toFixed(2)}px,0) rotate(${r.toFixed(3)}deg) scale(${k.toFixed(4)}) translate(${(-isl.padX * isl.scMax).toFixed(2)}px,${(-isl.padY * isl.scMax).toFixed(2)}px)`;
    if (op !== isl.op) { isl.op = op; isl.el.style.opacity = op >= 1 ? '1' : op.toFixed(3); }
    if (!isl.centre) {
      const zi = zIndexOf(isl.zn);
      if (zi !== isl.zi) { isl.zi = zi; isl.el.style.zIndex = String(zi); }
      const hz = Math.max(0, Math.min(1, (-isl.zn - 0.12) / 0.88)) * 0.4;
      const hzr = Math.round(hz * 100) / 100;
      if (hzr !== isl.hz) { isl.hz = hzr; isl.haze.style.opacity = String(hzr); }
    } else {
      isl.zi = 500;
    }
    // night: the dark base fades over the day sprite; the lights come on above it, flicker a little,
    // and the tower's beam brightens an island as it passes
    let hit = 0;
    if (!isl.centre && lv.beam > 0) {
      let d = isl.phi - beamA;
      d = wrap(d + Math.PI) - Math.PI;
      hit = lv.beam * Math.exp(-(d * d) / (2 * 0.16 * 0.16));
    }
    const litOp = Math.round(hit * 0.5 * 1000) / 1000;
    if (litOp !== isl.litOp) { isl.litOp = litOp; isl.lit.style.opacity = String(litOp); }
    const flick = motion ? 1 - 0.06 * Math.pow(0.5 + 0.5 * Math.sin(T * 6.3 + isl.i * 2.1) * Math.sin(T * 1.9 + isl.i * 0.7), 3) : 1;
    const eOp = Math.round(isl.emitLv * flick * 1000) / 1000;
    if (eOp !== isl.emitOp) { isl.emitOp = eOp; isl.emit.style.opacity = String(eOp); }
    if (isl.halo) isl.halo.style.opacity = String(Math.round(isl.emitLv * (motion ? 0.88 + 0.12 * Math.sin(T * 1.3) : 1) * 1000) / 1000);
  }

  function placeClouds(motion) {
    for (const c of clouds) {
      const drift = motion ? Math.sin(T * TAU / c.per + c.ph) * c.amp : 0;
      let x = (c.x + drift) * f - velS * c.par * f;
      const mx = c.maxX !== undefined ? c.maxX : Infinity;
      x = Math.max(-Math.min(mx, c.limL), Math.min(Math.min(mx, c.limR), x));
      const bob = motion ? Math.sin(T * 0.5 + c.ph) * 3 * f : 0;
      const px = cx + x - c.wpx / 2;
      const py = Math.max(6, cy + c.y * f - c.hpx / 2 + bob);
      c.el.style.transform = `translate3d(${px.toFixed(2)}px,${py.toFixed(2)}px,0)`;
      let wOp = 0;
      if (lv.base > 0) {
        const ccx = px + c.wpx / 2, ccy = py + c.hpx / 2;
        let near = 0;
        for (const isl of isles) {
          const reach = c.wpx * 0.5 + IMG_W * isl.sc * 0.55;
          const d = Math.hypot(ccx - isl.sx, (ccy - isl.sy) * 1.3) / reach;
          near = Math.max(near, 1 - d);
        }
        let hb = 0;
        if (lv.beam > 0) {
          let d = Math.atan2(ccx - cx, (ccy - cy) / K) - beamA;
          d = wrap(d + Math.PI) - Math.PI;
          hb = lv.beam * Math.exp(-(d * d) / (2 * 0.2 * 0.2));
        }
        wOp = lv.base * Math.min(c.src === 'bank' ? 0.75 : 1, near * 1.3 + hb * 0.7);
      }
      wOp = Math.round(wOp * 1000) / 1000;
      if (wOp !== c.wOp) { c.wOp = wOp; c.cw.style.opacity = String(wOp); }
    }
  }

  function placeBalloon(motion) {
    const t = motion ? T : 21;
    const th = Math.PI + 1.72 * Math.sin(t * TAU / 118 + 0.9);
    const rr = balloon.rr || 1.22;
    const zb = rr * Math.cos(th);
    const s = 1 + PERSP * zb;
    const x = cx + rPx * rr * Math.sin(th) * s;
    const y = cy + rPx * K * zb * s - 178 * f * s + (motion ? Math.sin(t * 0.9) * 5 * f : 0);
    const w = balloon.w * s;
    const h = w * (428 / 312);
    const k = s;
    balloon.el.style.transform = `translate3d(${(x - w / 2).toFixed(2)}px,${Math.max(4, y - h).toFixed(2)}px,0) scale(${k.toFixed(4)})`;
    const zi = zIndexOf(zb);
    if (zi !== balloon.zi) { balloon.zi = zi; balloon.el.style.zIndex = String(zi); }
  }

  function anchorOf(isl, up) {
    return [isl.sx + 0, isl.sy - (isl.padY - isl.crown) * isl.sc * up];
  }
  function placePlane(dt, motion) {
    const chat = ring[7];
    if (!plane.on) {
      if (motion && entered && T > plane.next && chat.zn > -0.3 && mode !== 'drag') {
        const opts = [-2, -1, 1, 2].map((d) => (7 + d + N) % N).filter((j) => ring[j].zn > -0.45);
        if (opts.length) {
          plane.to = opts[Math.floor(Math.random() * opts.length)];
          plane.on = true;
          plane.t = 0;
        } else plane.next = T + 2;
      }
      if (!plane.on) { if (plane.vis) { plane.vis = false; plane.el.style.opacity = '0'; } return; }
    }
    plane.t += dt / 2.7;
    const tt = Math.min(1, plane.t);
    const e = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2;
    const a = anchorOf(chat, 0.92);
    const b = anchorOf(ring[plane.to], 0.6);
    const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 70 * f;
    const u = 1 - e;
    const x = u * u * a[0] + 2 * u * e * mx + e * e * b[0];
    const y = u * u * a[1] + 2 * u * e * my + e * e * b[1];
    const dx = 2 * u * (mx - a[0]) + 2 * e * (b[0] - mx);
    const dy = 2 * u * (my - a[1]) + 2 * e * (b[1] - my);
    const zn = chat.zn + (ring[plane.to].zn - chat.zn) * e;
    const s = 1 + PERSP * zn;
    const w = plane.w * s;
    const h = w * (228 / 328);
    const left = dx < 0;
    let deg = Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI * 0.7 + 30;
    deg = Math.max(-25, Math.min(55, deg));
    const tr = `translate3d(${(x - w / 2).toFixed(2)}px,${(y - h / 2).toFixed(2)}px,0) scale(${s.toFixed(3)})` + ` translate(${(plane.w / 2).toFixed(2)}px,${(plane.w * 114 / 328).toFixed(2)}px) rotate(${left ? -deg : deg}deg) scaleX(${left ? -1 : 1}) translate(${(-plane.w / 2).toFixed(2)}px,${(-plane.w * 114 / 328).toFixed(2)}px)`;
    plane.el.style.transform = tr;
    const op = tt < 0.1 ? tt / 0.1 : tt > 0.86 ? (1 - tt) / 0.14 : 1;
    plane.el.style.opacity = op.toFixed(3);
    plane.vis = true;
    // always in front of the island it leaves and the one it reaches
    const zi = Math.max(chat.zi, ring[plane.to].zi) + 2;
    if (zi !== plane.zi) { plane.zi = zi; plane.el.style.zIndex = String(zi); }
    if (tt >= 1) {
      plane.on = false;
      plane.next = T + 6 + Math.random() * 5;
      const target = ring[plane.to];
      target.ping.classList.remove('is-on');
      void target.ping.offsetWidth;
      target.ping.classList.add('is-on');
    }
  }

  function drawPaths(motion) {
    for (const c of [ctxB, ctxF]) { c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, Wb, Hb); }
    const C = centre;
    if (C.enter < 0.5) return;
    const tcx = C.sx + (C.topX - C.padX) * C.sc;
    const tcy = C.sy + (C.topY - C.padY) * C.sc;
    const rxc = TOP_RX * C.sc * 0.8, ryc = TOP_RY * C.sc * 0.8;
    const dotDay = 'rgba(160, 92, 54, 0.5)';
    const dotNight = 'rgba(255, 206, 128, 0.92)';
    const nk = lv.base;
    const atNight = nk > 0.5;
    for (const isl of ring) {
      if (isl.enter < 0.55) continue;
      const a = Math.min(1, (isl.enter - 0.55) / 0.45);
      const ctx = isl.zn < 0 ? ctxB : ctxF;
      const sn = Math.sin(isl.phi), cs = Math.cos(isl.phi);
      const tx = isl.sx + (isl.topX - isl.padX) * isl.sc;
      const ty = isl.sy + (isl.topY - isl.padY) * isl.sc;
      const x0 = tx - sn * TOP_RX * isl.sc * 0.86, y0 = ty - cs * TOP_RY * isl.sc * 0.86;
      const x2 = tcx + sn * rxc, y2 = tcy + cs * ryc;
      const mx = (x0 + x2) / 2, my = (y0 + y2) / 2 - 16 * f;
      const sel = isl.i === selected && !akari;
      const sAvg = 1 + PERSP * isl.zn * 0.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(mx, my, x2, y2);
      ctx.lineCap = 'round';
      if (nk > 0) {
        // a soft gold under-glow along the path
        ctx.setLineDash([]);
        ctx.globalAlpha = a * nk * (sel ? 0.22 : 0.13);
        ctx.lineWidth = 7 * f * sAvg;
        ctx.strokeStyle = 'rgb(255, 184, 96)';
        ctx.stroke();
      }
      ctx.globalAlpha = a;
      ctx.setLineDash([0.001, 7.5 * f * sAvg]);
      ctx.lineDashOffset = motion ? -T * 9 * f : 0;
      ctx.lineWidth = (sel ? 3.4 : 2.5) * f * sAvg;
      ctx.strokeStyle = atNight ? dotNight : sel ? isl.p.pc : dotDay;
      if (atNight && sel) ctx.lineWidth = 3.8 * f * sAvg;
      ctx.stroke();
      // small lights travelling both ways
      const speed = sel ? 0.42 : 0.24;
      for (let k = 0; k < 2; k++) {
        let t = motion ? (T * speed + isl.i * 0.29 + k * 0.5) % 1 : 0.3 + k * 0.4;
        if (k === 1) t = 1 - t;
        const u = 1 - t;
        const px = u * u * x0 + 2 * u * t * mx + t * t * x2;
        const py = u * u * y0 + 2 * u * t * my + t * t * y2;
        const r = (atNight ? 16 : 10) * f * sAvg * (sel ? 1.25 : 1);
        ctx.globalAlpha = a * Math.sin(Math.PI * t) * (atNight ? 1 : 0.9);
        ctx.drawImage(glowSprite, px - r, py - r, r * 2, r * 2);
      }
    }
    ctxB.globalAlpha = 1;
    ctxF.globalAlpha = 1;
    if (lv.beam > 0) drawBeam(tcx, motion);
    if (lv.stars > 0) drawFireflies(motion);
  }

  // the tower's beam: a soft wedge of light turning slowly at the height of the lantern room
  function drawBeam(tcx, motion) {
    const C = centre;
    const lx = C.sx + (LANTERN[0] - C.padX) * C.sc;
    const ly = C.sy + (LANTERN[1] - C.padY) * C.sc;
    const L = rPx * 1.5;
    const dl = 0.12;
    const ctx = Math.cos(beamA) >= 0 ? ctxF : ctxB;
    const ex = (a) => lx + L * Math.sin(a), ey = (a) => ly + L * K * Math.cos(a);
    const grd = ctx.createLinearGradient(lx, ly, ex(beamA), ey(beamA));
    grd.addColorStop(0, 'rgba(255, 226, 168, 0.36)');
    grd.addColorStop(0.3, 'rgba(255, 214, 150, 0.14)');
    grd.addColorStop(1, 'rgba(255, 206, 140, 0)');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = grd;
    for (const [w, al] of [[1.15, 0.3], [0.7, 0.32], [0.34, 0.38]]) {
      ctx.globalAlpha = lv.beam * al;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(ex(beamA - dl * w), ey(beamA - dl * w));
      ctx.lineTo(ex(beamA + dl * w), ey(beamA + dl * w));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // fireflies drifting round the islands
  const FLIES = Array.from({ length: 26 }, (_, k) => ({ isl: k % 10, r: 30 + ((k * 37) % 40), h: 14 + ((k * 23) % 46), w: 0.35 + ((k * 13) % 9) / 18, p: k * 1.37, b: 0.9 + ((k * 7) % 11) / 8 }));
  const flySprite = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0, 'rgba(255, 252, 214, 1)');
    grd.addColorStop(0.25, 'rgba(236, 240, 140, .85)');
    grd.addColorStop(1, 'rgba(210, 220, 100, 0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 32, 32);
    return c;
  })();
  function drawFireflies(motion) {
    const t = motion ? T : 4;
    for (const fl of FLIES) {
      const isl = isles[fl.isl];
      if (isl.enter < 1) continue;
      const s = isl.sc / (W0 / IMG_W);
      const px = isl.sx + Math.cos(t * fl.w + fl.p) * fl.r * isl.sc * 2.6 + Math.sin(t * fl.w * 2.3 + fl.p) * 6 * f;
      const py = isl.sy - fl.h * isl.sc * 2.4 + Math.sin(t * fl.w * 1.4 + fl.p * 1.7) * 9 * f;
      const blink = motion ? Math.pow(0.5 + 0.5 * Math.sin(t * fl.b * 2.2 + fl.p * 3), 2.5) : 0.7;
      const ctx = isl.zn < 0 || isl.centre ? ctxB : ctxF;
      const r = 5.5 * f * Math.max(0.7, Math.min(1.3, s));
      ctx.globalAlpha = lv.stars * (0.15 + 0.85 * blink);
      ctx.drawImage(flySprite, px - r, py - r, r * 2, r * 2);
    }
    ctxB.globalAlpha = 1;
    ctxF.globalAlpha = 1;
  }

  function placeTip() {
    if (hovered < 0) return;
    const isl = isles[hovered];
    const x = isl.sx;
    const y = isl.sy - (isl.padY - isl.crown) * isl.sc - 12 * f;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    const lx = Math.max(4, Math.min(Wb - w - 4, x - w / 2));
    tip.style.transform = `translate3d(${lx.toFixed(1)}px,${Math.max(4, y - h).toFixed(1)}px,0)`;
  }

  let rafId = 0;
  let last = 0;
  let visible = false;
  function requestFrame() { if (!rafId && visible) rafId = requestAnimationFrame(frame); }
  function frame(now) {
    rafId = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    const motion = !still;
    T += dt;
    if (enterT >= 0 && (!entered || isles.some((i) => i.enter < 1))) enterT += dt;
    stepNight(dt);
    night = lv.base > 0.5;
    if (motion && lv.beam > 0) beamA = (beamA + dt * 0.36) % TAU;
    stepRing(dt);
    for (const isl of isles) placeIsle(isl, dt, motion);
    if (mouse && mode !== 'drag') {
      const hit = pick(mouse[0], mouse[1]);
      setHover(hit);
      scene.classList.toggle('is-over', hit >= 0);
    }
    placeClouds(motion);
    placeBalloon(motion);
    placePlane(dt, motion);
    drawPaths(motion);
    drawSky(dt, motion);
    placeTip();
    placeBead(dt);
    if (entered) syncSelection(false);
    stepCones(dt);
    stepRayColour(dt);
    drawCones(motion);
    const busy = motion || beadSlide || nightMoving() || mode === 'drag' || mode === 'settle' || mode === 'enter' || !entered || Math.abs(velS) > 0.001 || isles.some((i) => Math.abs(i.lift - i.liftWant) > 0.05 || Math.abs(i.sway) > 0.01);
    if (busy) requestFrame();
    else last = 0;
  }

  // ---------- start ----------
  function begin() {
    if (enterT >= 0) return;
    if (still) {
      enterT = 99;
      litT = 99;
      for (const isl of isles) isl.enter = 1;
      ang = 0; mode = 'idle'; entered = true;
      syncSelection(true);
    } else {
      enterT = 0;
      litT = 0;
    }
    setTimeout(preloadPanes, 1500);
    requestFrame();
  }
  showCard(0);
  const ready = Promise.all(isles.map((isl) => (isl.nite.decode ? isl.nite.decode().catch(() => {}) : Promise.resolve())));
  const timeout = new Promise((res) => setTimeout(res, 1800));

  new ResizeObserver(() => layout()).observe(scene);
  layout();
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      visible = en.isIntersecting;
      if (visible) {
        last = 0;
        Promise.race([ready, timeout]).then(begin);
        requestFrame();
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }
  }, { threshold: 0.08 });
  io.observe(scene);
  motionQuery.addEventListener('change', (e) => { still = e.matches; if (still) { mode = mode === 'auto' ? 'idle' : mode; } requestFrame(); });
})();

(() => {
  const page = document.getElementById('ak');
  if (!page || page.dataset.akReady) return;
  page.dataset.akReady = '1';
  const $ = (s, el = page) => el.querySelector(s);
  const $$ = (s, el = page) => Array.from(el.querySelectorAll(s));
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let still = motionQuery.matches;
  motionQuery.addEventListener('change', (e) => { still = e.matches; kick(); });
  page.classList.add('ak-js');

  // ---------- links inside the page scroll to their section and move focus there ----------
  page.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
    const h = target.matches('h1, h2') ? target : target.querySelector('h2, h1');
    if (h) {
      if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
      h.focus({ preventScroll: true });
    }
  });


  // ---------- each section knows when it is on screen; its loops run only then ----------
  const onScreen = new Set();
  const sectionIO = new IntersectionObserver((entries) => {
    for (const en of entries) {
      en.target.classList.toggle('is-on', en.isIntersecting);
      if (en.isIntersecting) onScreen.add(en.target); else onScreen.delete(en.target);
    }
    kick();
    gymAuto();
  }, { rootMargin: '80px 0px' });
  $$('.ak-s').forEach((s) => sectionIO.observe(s));
  const inIO = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); inIO.unobserve(en.target); }
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  $$('[data-in]').forEach((el) => inIO.observe(el));

  // one small frame loop shared by the sections, running only while one of them is on screen
  const anims = [];
  let raf = 0, lastT = 0;
  function kick() { if (!raf && !still && anims.some((a) => a.active())) raf = requestAnimationFrame(tick); }
  function tick(t) {
    raf = 0;
    const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 1 / 60;
    lastT = t;
    let any = false;
    for (const a of anims) if (a.active()) { a.step(dt); any = true; }
    if (any && !still) raf = requestAnimationFrame(tick); else lastT = 0;
  }

  // ---------- paths with travelling lights (the job boards trail, and the ways in "How we work") ----------
  function makePath(box, opts) {
    const svg = $('svg', box);
    const paths = $$('path', svg);
    const lights = $$('.ak-light', box);
    const state = { samples: [], len: 0, t: lights.map((_, k) => k / lights.length), box };
    function centreOf(el, fy) {
      let x = 0, y = 0, n = el;
      while (n && n !== box) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight * fy, top: y, bottom: y + el.offsetHeight };
    }
    function build() {
      const w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const d = opts.d(centreOf, w, h);
      for (const p of paths) p.setAttribute('d', d);
      const p = paths[0];
      state.len = p.getTotalLength();
      state.samples = [];
      const n = Math.max(40, Math.round(state.len / 8));
      for (let k = 0; k <= n; k++) { const pt = p.getPointAtLength((k / n) * state.len); state.samples.push([pt.x, pt.y]); }
      place();
    }
    function place() {
      const s = state.samples;
      if (!s.length) return;
      lights.forEach((el, k) => {
        const u = state.t[k] % 1;
        const f = u * (s.length - 1), i = Math.floor(f), a = f - i;
        const p0 = s[i], p1 = s[Math.min(s.length - 1, i + 1)];
        const x = p0[0] + (p1[0] - p0[0]) * a, y = p0[1] + (p1[1] - p0[1]) * a;
        const fade = Math.min(1, u / 0.06, (1 - u) / 0.06);
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        el.style.opacity = String(still ? 0.9 : fade);
      });
    }
    new ResizeObserver(build).observe(box);
    anims.push({
      active: () => onScreen.has(box.closest('.ak-s')),
      step: (dt) => {
        if (!state.len) return;
        for (let k = 0; k < state.t.length; k++) state.t[k] = (state.t[k] + (dt * opts.speed) / state.len) % 1;
        place();
      },
    });
    return { build, place };
  }

  // the job boards: a garden path that comes down past each island, crossing over in the gaps between them
  const trail = $('#ak-trail');
  if (trail) {
    const isles = $$('.ak-stn-isle .ak-isle', trail);
    const stations = $$('.ak-stn', trail);
    const tr = makePath(trail, {
      speed: 64,
      d: (centreOf) => {
        const pts = isles.map((el, k) => ({ ...centreOf(el, 0.56), st: centreOf(stations[k], 0.5) }));
        if (!pts.length) return '';
        const r = 46;
        let d = `M${pts[0].x.toFixed(1)},${(pts[0].y - 170).toFixed(1)} L${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        for (let k = 1; k < pts.length; k++) {
          const a = pts[k - 1], b = pts[k];
          if (Math.abs(a.x - b.x) < 40) { d += ` L${b.x.toFixed(1)},${b.y.toFixed(1)}`; continue; }
          const ym = (a.st.bottom + b.st.top) / 2;
          const dir = b.x > a.x ? 1 : -1;
          d += ` L${a.x.toFixed(1)},${(ym - r).toFixed(1)} Q${a.x.toFixed(1)},${ym.toFixed(1)} ${(a.x + dir * r).toFixed(1)},${ym.toFixed(1)}`;
          d += ` L${(b.x - dir * r).toFixed(1)},${ym.toFixed(1)} Q${b.x.toFixed(1)},${ym.toFixed(1)} ${b.x.toFixed(1)},${(ym + r).toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`;
        }
        const last = pts[pts.length - 1];
        d += ` L${last.x.toFixed(1)},${(last.y + 150).toFixed(1)}`;
        return d;
      },
    });
    // the screenshots lean toward the pointer
    for (const fr of $$('.ak-browser', trail)) {
      fr.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || still) return;
        const r = fr.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        fr.style.transform = `perspective(1100px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 5).toFixed(2)}deg) translateZ(6px)`;
      });
      fr.addEventListener('pointerleave', () => { fr.style.transform = ''; });
    }
    void tr;
  }

  // How we work: a soft wave through the four islets (a straight drop when they stack)
  const ways = $('#ak-ways');
  if (ways) {
    const wIsles = $$('.ak-way-isle .ak-isle', ways);
    makePath(ways, {
      speed: 52,
      d: (centreOf) => {
        const pts = wIsles.map((el) => centreOf(el, 0.55));
        if (pts.length < 2) return '';
        let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        for (let k = 1; k < pts.length; k++) {
          const a = pts[k - 1], b = pts[k];
          // a new row of a wrapped grid starts its own path rather than crossing the text above it
          if (Math.abs(a.y - b.y) > 60 && Math.abs(a.x - b.x) > 40) { d += ` M${b.x.toFixed(1)},${b.y.toFixed(1)}`; continue; }
          if (Math.abs(a.y - b.y) > 60) {
            const my = (a.y + b.y) / 2;
            d += ` C${a.x.toFixed(1)},${my.toFixed(1)} ${b.x.toFixed(1)},${my.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
          } else {
            const mx = (a.x + b.x) / 2;
            const sag = Math.max(a.y, b.y) + 54;
            d += ` C${mx.toFixed(1)},${sag.toFixed(1)} ${mx.toFixed(1)},${sag.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
          }
        }
        return d;
      },
    });
  }

  // ---------- the chat: the question types itself, then the cards come back from the board ----------
  const chatWin = $('.ak-chatwin');
  const typed = $('.ak-typed');
  const appParts = $$('.ak-msg--app > *');
  const chatPlane = $('#ak-chat-plane');
  const kiosk = $('.ak-chat-isle .ak-isle');
  let chatTimers = [];
  let chatPlayed = false;
  const later = (ms, fn) => { chatTimers.push(setTimeout(fn, ms)); };
  function fly(planeEl, from, to, container, ms) {
    if (still || !planeEl.animate) return;
    const c = container.getBoundingClientRect();
    const a = { x: from.x - c.left, y: from.y - c.top }, b = { x: to.x - c.left, y: to.y - c.top };
    const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - 110;
    const frames = [];
    for (let k = 0; k <= 12; k++) {
      const t = k / 12, u = 1 - t;
      const x = u * u * a.x + 2 * u * t * mx + t * t * b.x, y = u * u * a.y + 2 * u * t * my + t * t * b.y;
      const dx = 2 * u * (mx - a.x) + 2 * t * (b.x - mx), dy = 2 * u * (my - a.y) + 2 * t * (b.y - my);
      const flip = dx < 0 ? -1 : 1;
      const deg = Math.max(-30, Math.min(50, (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI * 0.7 + 30));
      frames.push({ transform: `translate(${(x - 24).toFixed(1)}px,${(y - 16).toFixed(1)}px) scaleX(${flip}) rotate(${(flip < 0 ? -deg : deg).toFixed(1)}deg)`, opacity: t < 0.08 ? t / 0.08 : t > 0.88 ? (1 - t) / 0.12 : 1 });
    }
    planeEl.animate(frames, { duration: ms, easing: 'ease-in-out' });
  }
  function playChat() {
    chatTimers.forEach(clearTimeout);
    chatTimers = [];
    const text = typed.dataset.text;
    if (still) { typed.textContent = text; chatWin.classList.remove('is-playing', 'is-typing', 'is-thinking'); return; }
    chatWin.classList.add('is-playing', 'is-typing');
    chatWin.classList.remove('is-thinking');
    appParts.forEach((el) => el.classList.remove('is-shown'));
    typed.textContent = '';
    let i = 0;
    const typeNext = () => {
      typed.textContent = text.slice(0, ++i);
      if (i < text.length) later(34 + Math.random() * 40, typeNext);
      else {
        chatWin.classList.remove('is-typing');
        chatWin.classList.add('is-thinking');
        if (kiosk) { const k = kiosk.getBoundingClientRect(), w = chatWin.getBoundingClientRect(); fly(chatPlane, { x: k.left + k.width * 0.55, y: k.top + k.height * 0.2 }, { x: w.left + 40, y: w.top + 90 }, $('.ak-chat-demo'), 1500); }
        later(1000, () => {
          chatWin.classList.remove('is-thinking');
          appParts.forEach((el, k) => later(k * 260, () => el.classList.add('is-shown')));
        });
      }
    };
    later(420, typeNext);
  }
  if (chatWin) {
    new IntersectionObserver((en, ob) => { if (en[0].isIntersecting && !chatPlayed) { chatPlayed = true; ob.disconnect(); playChat(); } }, { threshold: 0.45 }).observe(chatWin);
    $('#ak-replay').addEventListener('click', playChat);
  }

  // ---------- Tetsu: three phones on a turntable, chosen by the three lines ----------
  const tabs = $$('.ak-tab');
  const phones = $$('.ak-phone');
  const tabList = $('.ak-tabs');
  const gymSec = $('#gym');
  let cur = 0, autoTimer = 0, holdUntil = 0, hovering = false;
  function show(k, byUser) {
    cur = (k + phones.length) % phones.length;
    tabs.forEach((t, i) => { t.setAttribute('aria-selected', i === cur ? 'true' : 'false'); t.tabIndex = i === cur ? 0 : -1; });
    phones.forEach((p, i) => {
      const rel = (i - cur + phones.length) % phones.length;
      p.dataset.pos = rel === 0 ? 'front' : rel === 1 ? 'right' : 'left';
      p.setAttribute('aria-hidden', rel === 0 ? 'false' : 'true');
    });
    if (byUser) holdUntil = performance.now() + 14000;
    gymAuto();
  }
  function gymAuto() {
    if (!tabList) return;
    clearTimeout(autoTimer);
    const run = !still && onScreen.has(gymSec) && !hovering && !gymSec.contains(document.activeElement) && performance.now() >= holdUntil;
    if (run) autoTimer = setTimeout(() => show(cur + 1, false), 5200);
    else if (onScreen.has(gymSec) && !still) autoTimer = setTimeout(gymAuto, Math.max(600, holdUntil - performance.now()));
  }
  if (tabs.length) {
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(i, true));
      t.addEventListener('keydown', (e) => {
        let k = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') k = cur + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') k = cur - 1;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = tabs.length - 1;
        if (k === null) return;
        e.preventDefault();
        show(k, true);
        tabs[cur].focus();
      });
    });
    phones.forEach((p, i) => p.addEventListener('click', () => { if (p.dataset.pos !== 'front') show(i, true); }));
    const stage = $('#ak-phones');
    stage.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovering = true; gymAuto(); } });
    stage.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hovering = false; gymAuto(); } });
    $('.ak-gym').addEventListener('focusin', gymAuto);
    $('.ak-gym').addEventListener('focusout', () => setTimeout(gymAuto, 0));
    // a sideways swipe or drag turns the phones
    let sw = null;
    stage.addEventListener('pointerdown', (e) => { sw = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false }; });
    stage.addEventListener('pointermove', (e) => {
      if (!sw || e.pointerId !== sw.id) return;
      const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
      if (!sw.moved && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) { sw.moved = true; stage.classList.add('is-drag'); try { stage.setPointerCapture(e.pointerId); } catch (err) { /* optional */ } }
    });
    const endSwipe = (e) => {
      if (!sw) return;
      const dx = e.clientX - sw.x;
      if (sw.moved && Math.abs(dx) > 36) show(cur + (dx < 0 ? 1 : -1), true);
      stage.classList.remove('is-drag');
      sw = null;
    };
    stage.addEventListener('pointerup', endSwipe);
    stage.addEventListener('pointercancel', () => { sw = null; stage.classList.remove('is-drag'); });
    show(0, false);
  }

  // ---------- contact: checked in the page, then sent to /api/contact ----------
  const form = $('#ak-form');
  if (form) {
    const fields = {
      name: [$('#ak-name'), $('#ak-name-err'), (v) => (v.trim() ? '' : 'Please add your name.')],
      email: [$('#ak-email'), $('#ak-email-err'), (v) => (!v.trim() ? 'Please add an email address to reply to.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'That email address does not look complete.')],
      msg: [$('#ak-msg'), $('#ak-msg-err'), (v) => (v.trim().length >= 10 ? '' : 'Please write a short message.')],
    };
    const sent = $('#ak-sent');
    const check = (key) => {
      const [input, err, rule] = fields[key];
      const m = rule(input.value);
      err.textContent = m;
      input.setAttribute('aria-invalid', m ? 'true' : 'false');
      return !m;
    };
    // errors show on submit and clear while typing, so the button never moves under a click
    for (const key of Object.keys(fields)) fields[key][0].addEventListener('input', () => { if (fields[key][0].getAttribute('aria-invalid') === 'true') check(key); });
    const sendBtn = $('.ak-send', form);
    const trap = $('#ak-website');
    let busy = false;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (busy) return;
      const bad = Object.keys(fields).filter((k) => !check(k));
      if (bad.length) { sent.textContent = ''; fields[bad[0]][0].focus(); return; }
      busy = true;
      sendBtn.disabled = true;
      sent.textContent = 'Sending your message.';
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: fields.name[0].value.trim(), email: fields.email[0].value.trim(), message: fields.msg[0].value.trim(), website: trap ? trap.value : '' }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(typeof data.error === 'string' ? data.error : '');
        sent.textContent = 'Thank you. Your message is with us, and we will reply by email.';
        const btn = sendBtn.getBoundingClientRect();
        const tower = $('.ak-contact-isle .ak-isle');
        if (tower) { const t = tower.getBoundingClientRect(); fly($('#ak-form-plane'), { x: btn.left + btn.width / 2, y: btn.top }, { x: t.left + t.width * 0.5, y: t.top + t.height * 0.22 }, form, 1700); }
        form.reset();
      } catch (err) {
        sent.textContent = err && err.message ? err.message : 'Your message could not be sent. Please try again in a minute.';
      } finally {
        busy = false;
        sendBtn.disabled = false;
      }
    });
  }

  const year = $('#ak-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
