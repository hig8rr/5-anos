/* ===========================================================
   AJUSTE AQUI — tudo que você precisa mudar está nesta seção
   =========================================================== */
const CONFIG = {
  // Data de início do namoro (ano, mês [0=jan, 5=jun], dia)
  startDate: new Date(2021, 5, 11),

  // Seu nome (assinatura)
  name: "Higor",

  // Texto de boas-vindas (seção 1)
  welcome:
    "Preparei este cantinho só para você. Cada seção daqui pra frente é um pedacinho do que vivemos e do que ainda quero viver ao seu lado. Respira bb, vai com calma, e deixa eu te levar brevemente por essa nossa história.",

  // Frase de efeito do contador (seção 2)
  counterPhrase: "E nem todo esse tempo foi suficiente para eu cansar de vuxê.",

  // Declaração (seção 5). Use <em></em> para itálico de destaque.
  declare: "Eu <em>te amo</em>.",
  surprise:
    "Mas ainda não acabou... Preparei uma surpresa para hoje e ela começa com uma brincadeira. Clica no botão para descobrir.",

  // Legenda da galeria (seção 4)
  galleryCaption: "Seis instantes entre milhares que guardo de nós.",

  // QUIZ — resposta certa é marcada por "correct: true".
  // Para trocar, basta mover o "correct: true" para outra opção.
  quizOptions: [
    { label: "Italiano", correct: false },
    { label: "Argentino", correct: false },
    { label: "Nordestino", correct: false },
    { label: "Americano", correct: false },
    { label: "Japonês", correct: false },
    { label: "Árabe", correct: true }, // <-- resposta certa (provisória)
  ],
  quizWinText: "Filiiiiz! É comida árabe que nos espera hoje à noite, bb",

  // Restaurante (preencher depois)
  restaurant: {
    name: "Ver o restaurante",
    url: "https://maps.google.com",
  },

  // Fotos: arquivos na pasta /images
  heroPhoto: { src: "images/hero.jpg" }, // foto da seção 2
  photos: [
    { src: "images/foto1.jpg", caption: "01" },
    { src: "images/foto2.jpg", caption: "02" },
    { src: "images/foto3.jpg", caption: "03" },
    { src: "images/foto4.jpg", caption: "04" },
    { src: "images/foto5.jpg", caption: "05" },
    { src: "images/foto6.jpg", caption: "06" },
  ],
};
/* =========================================================== */

const startYear = CONFIG.startDate.getFullYear();
document.getElementById("introMeta").textContent =
  `${startYear} — ${startYear + 5}`;

/* ---------- textos configuráveis ---------- */
document.getElementById("welcomeText").textContent = CONFIG.welcome;
document.getElementById("counterPhrase").textContent = CONFIG.counterPhrase;
document.getElementById("declareText").innerHTML = CONFIG.declare;
document.getElementById("surpriseText").textContent = CONFIG.surprise;
document.getElementById("galleryCaption").textContent = CONFIG.galleryCaption;
document.getElementById("winText").textContent = CONFIG.quizWinText;
document.getElementById("name").textContent = CONFIG.name;

/* ---------- carta (texto fixo) ---------- */
const LETTER = [
  "Hoje completamos 5 anos de uma história que mudou a minha vida. Ao longo desse tempo, colecionamos momentos, aprendizados, desafios e inúmeras lembranças que levarei para sempre comigo.",
  "Quero que você saiba o quanto sou grato por ter você ao meu lado. Sua companhia, seu carinho, seu apoio e a forma como você torna meus dias melhores são algumas das razões pelas quais eu me apaixono por você todos os dias.",
  "Nesses 5 anos, construímos muito mais do que um namoro: construímos confiança, parceria e um amor que cresce a cada etapa da nossa caminhada.",
  "Obrigado por cada sorriso, cada abraço e cada momento compartilhado. Que este seja apenas o quinto de muitos aniversários que ainda viveremos juntos.",
];
const letterEl = document.getElementById("letter");
LETTER.forEach((p, i) => {
  const el = document.createElement("p");
  el.className = "rv d" + Math.min(i + 1, 4);
  el.textContent = p;
  letterEl.appendChild(el);
});

/* ---------- foto única (seção 2) ---------- */
(function () {
  const slot = document.querySelector('[data-photo="hero"]');
  const img = new Image();
  img.onload = () => {
    slot.innerHTML = "";
    const el = document.createElement("img");
    el.src = CONFIG.heroPhoto.src;
    el.alt = "Nós dois";
    slot.appendChild(el);
    slot.addEventListener("click", () => openLightbox(CONFIG.heroPhoto.src));
  };
  img.src = CONFIG.heroPhoto.src;
})();

/* ---------- galeria (seção 4) ---------- */
const gallery = document.getElementById("gallery");
CONFIG.photos.forEach((photo) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  const ph = document.createElement("span");
  ph.className = "ph";
  ph.textContent = photo.caption;
  cell.appendChild(ph);

  const img = document.createElement("img");
  img.alt = "Momento " + photo.caption;
  img.loading = "lazy";
  img.style.opacity = "0";
  img.onload = () => {
    img.style.opacity = "1";
    ph.style.display = "none";
    cell.addEventListener("click", () => openLightbox(photo.src));
  };
  img.onerror = () => img.remove();
  img.src = photo.src;
  cell.appendChild(img);
  gallery.appendChild(cell);
});

/* ---------- lightbox ---------- */
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<img alt="Nossa foto" />';
document.body.appendChild(lightbox);
function openLightbox(src) {
  const img = lightbox.querySelector("img");
  const test = new Image();
  test.onload = () => {
    img.src = src;
    lightbox.classList.add("show");
  };
  test.src = src;
}
lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("show");
});

/* ---------- contador em tempo real ---------- */
const counterEl = document.getElementById("counter");
function renderCounter() {
  const now = new Date();
  const ms = now - CONFIG.startDate;
  const totalSeconds = Math.floor(ms / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const weeks = Math.floor(totalDays / 7);
  const seconds = totalSeconds;

  // meses civis (anos*12 + diferença de meses)
  let months =
    (now.getFullYear() - CONFIG.startDate.getFullYear()) * 12 +
    (now.getMonth() - CONFIG.startDate.getMonth());
  if (now.getDate() < CONFIG.startDate.getDate()) months--;

  const units = [
    { n: seconds.toLocaleString("pt-BR"), l: "segundos" },
    { n: totalDays.toLocaleString("pt-BR"), l: "dias" },
    { n: weeks.toLocaleString("pt-BR"), l: "semanas" },
    { n: months.toLocaleString("pt-BR"), l: "meses" },
  ];
  counterEl.innerHTML = units
    .map(
      (u) =>
        `<div class="unit"><span class="num">${u.n}</span><span class="lbl">${u.l}</span></div>`,
    )
    .join("");
}
renderCounter();
setInterval(renderCounter, 1000); // tempo real (segundos)

/* ---------- restaurante ---------- */
const rLink = document.getElementById("restaurantLink");
rLink.href = CONFIG.restaurant.url;
document.getElementById("restaurantName").textContent = CONFIG.restaurant.name;

/* ===========================================================
   QUIZ DO RESTAURANTE
   =========================================================== */
const quizEl = document.getElementById("quiz");
const quizFeedback = document.getElementById("quizFeedback");
const quizWin = document.getElementById("quizWin");
const wrongMsgs = [
  "Não, do Inglês No",
  "Errou jao",
  "Não, do Latim Non",
  "Errada, ta dormindo?",
  "Sabia...",
];
let won = false;

CONFIG.quizOptions.forEach((opt) => {
  const b = document.createElement("button");
  b.className = "quiz-opt";
  b.type = "button";
  b.textContent = opt.label;
  b.addEventListener("click", () => {
    if (won) return;
    if (opt.correct) {
      won = true;
      quizFeedback.textContent = "";
      quizWin.classList.add("show");
      quizEl.querySelectorAll(".quiz-opt").forEach((o) => (o.disabled = true));
      launchFireworks();
    } else {
      b.classList.remove("wrong");
      void b.offsetWidth; // reinicia animação
      b.classList.add("wrong");
      quizFeedback.textContent =
        wrongMsgs[Math.floor(Math.random() * wrongMsgs.length)];
    }
  });
  quizEl.appendChild(b);
});

/* ===========================================================
   NAVEGAÇÃO POR SEÇÕES (scroll + snap + seta + teclado)
   =========================================================== */
const film = document.getElementById("film");
const scenes = Array.from(document.querySelectorAll("[data-scene]"));
const navArrow = document.getElementById("navArrow");
const progress = document.getElementById("progress");
let current = 0;

// pontinhos
scenes.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.addEventListener("click", () => goTo(i));
  progress.appendChild(dot);
});
const dots = Array.from(progress.children);

function setActive(i) {
  if (i === current && scenes[i].classList.contains("active")) return;
  current = i;
  scenes.forEach((s, k) => s.classList.toggle("active", k === i));
  dots.forEach((d, k) => d.classList.toggle("active", k === i));
  navArrow.classList.toggle("is-last", i === scenes.length - 1);
}

function goTo(i) {
  if (i < 0 || i >= scenes.length) return;
  scenes[i].scrollIntoView({ behavior: "smooth" });
}

// detecta seção visível via IntersectionObserver
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.55) {
        setActive(scenes.indexOf(e.target));
      }
    });
  },
  { root: film, threshold: [0.55] },
);
scenes.forEach((s) => io.observe(s));

// seta avança
navArrow.addEventListener("click", () => goTo(current + 1));

// teclado
document.addEventListener("keydown", (e) => {
  if (!document.body.classList.contains("started")) return;
  if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
    e.preventDefault();
    goTo(current + 1);
  }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    goTo(current - 1);
  }
});

/* ---------- abertura ---------- */
const intro = document.getElementById("intro");
document.getElementById("openBtn").addEventListener("click", () => {
  intro.classList.add("hidden");
  document.body.classList.add("started");
  startPetals();
  setTimeout(() => setActive(0), 200);
});

/* ===========================================================
   SURPRESA — botão da seção 5 leva à seção 6 (quiz)
   =========================================================== */
document.getElementById("surpriseBtn").addEventListener("click", () => {
  goTo(scenes.length - 1);
});

/* ===========================================================
   PÉTALAS (mantidas)
   =========================================================== */
function startPetals() {
  const layer = document.getElementById("petals");
  const colors = ["#cbb3e8", "#b89ad9", "#d9c9f0", "#e6dbf6", "#f3a07a"];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("div");
    p.className = "pf";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    const s = 8 + Math.random() * 12;
    p.style.width = s + "px";
    p.style.height = s * 1.6 + "px";
    p.style.animationDuration = 11 + Math.random() * 12 + "s";
    p.style.animationDelay = Math.random() * 11 + "s";
    p.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
    layer.appendChild(p);
  }
}

/* ===========================================================
   FOGOS DE ARTIFÍCIO (canvas) — disparado ao acertar o quiz
   =========================================================== */
function launchFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const palette = [
    "#9b7bc4",
    "#f6c177",
    "#f3a07a",
    "#d96d8a",
    "#b89ad9",
    "#ffd277",
    "#fff4d6",
    "#cbb3e8",
  ];
  let particles = [];
  let rockets = [];

  function spawnRocket() {
    rockets.push({
      x: W * (0.2 + Math.random() * 0.6),
      y: H,
      vy: -(7 + Math.random() * 3),
      targetY: H * (0.18 + Math.random() * 0.32),
      color: palette[Math.floor(Math.random() * palette.length)],
    });
  }

  function burst(x, y, color) {
    const n = 36 + Math.floor(Math.random() * 24);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const sp = 2 + Math.random() * 4;
      particles.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        color,
        size: 1.6 + Math.random() * 1.6,
      });
    }
  }

  let frames = 0;
  let raf;
  const DURATION = reduce ? 60 : 420; // ~7s

  function tick() {
    frames++;
    ctx.clearRect(0, 0, W, H);

    if (!reduce && frames % 22 === 0 && frames < DURATION - 80) spawnRocket();

    rockets.forEach((r, i) => {
      r.y += r.vy;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = r.color;
      ctx.fill();
      if (r.y <= r.targetY) {
        burst(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    });

    particles.forEach((p, i) => {
      p.vy += 0.045; // gravidade
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        return;
      }
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (frames < DURATION || particles.length > 0) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
      cancelAnimationFrame(raf);
    }
  }

  // estouro inicial imediato + alguns simultâneos
  for (let k = 0; k < 3; k++) {
    setTimeout(
      () =>
        burst(
          W * (0.3 + Math.random() * 0.4),
          H * (0.2 + Math.random() * 0.25),
          palette[k],
        ),
      k * 180,
    );
  }
  raf = requestAnimationFrame(tick);
}
