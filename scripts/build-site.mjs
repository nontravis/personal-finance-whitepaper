import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://nontravis.github.io/personal-finance-whitepaper';
const ROOT = '/personal-finance-whitepaper';
const IMG = `${BASE}/social-preview.png`;
const OUT = fileURLToPath(new URL('../docs/', import.meta.url)); // docs/ (handles spaces in path)

// order controls switcher order; en is x-default at site root
const LANGS = ['en','th','es','id','zh','ja'];
const LABEL = { en:'EN', th:'TH', es:'ES', id:'ID', zh:'中文', ja:'日本' };
const pathFor = l => l === 'en' ? `${ROOT}/` : `${ROOT}/${l}/`;
const fileFor = l => l === 'en' ? `${OUT}index.html` : `${OUT}${l}/index.html`;

const T = {
  en:{ langlbl:'Language', seoTitle:'The Three-Pillar Personal Finance System — Nonthawit Doungsodsri',
    kicker:'Personal Finance Whitepaper · Free · CC BY 4.0', title:'The Three-Pillar Personal Finance System',
    lede:'Build lasting personal finances with one simple, lifelong system — explained in a short, free whitepaper. Available in six languages.',
    eq:'Income − Expenses = Freedom Fund', pillarsHead:'The three pillars', readHead:'Read it now — free', howHead:'How to use it', principleHead:'The one principle',
    p1t:'Cashflow', p1d:'Know what comes in and out — the foundation that reveals your true Freedom Fund.',
    p2t:'Investment', p2d:'Put money to work for you and grow it through compounding over time.',
    p3t:'Savings', p3d:"Hold value-preserving assets to beat inflation and reduce life's risks.", rd:'Read',
    use1b:'Print it and post it where you read every day.', use1t:'Finance changes through repeated exposure, until the system becomes a habit.',
    use2b:'Share this mindset with the people you love.', use2t:'One of the best gifts is a way of thinking that stays with someone for life.',
    quote:'“Start with a simple system, then do it consistently.”', quoteSub:"Time and consistency are every investor's most powerful allies.", ghtext:'View on GitHub',
    footLead:'By', footTail:'Released for the public good under',
    ai:{ head:'Use it in your AI',
      lede:'This whitepaper also ships as an AI skill — a reasoning lens any capable AI can apply. Paste one file, or drop in the skill folder.',
      repo:'Get the skill on GitHub', note:'Educational framework, not personalized financial advice.',
      p:[
        {n:'Claude Code', s:'Copy the skill/ folder into .claude/skills/. It auto-applies when you discuss money.'},
        {n:'claude.ai', s:"Paste three-pillar-lens.md into a Project's custom instructions."},
        {n:'ChatGPT', s:'Paste three-pillar-lens.md into Custom Instructions, a Project, or a GPT.'},
        {n:'Gemini', s:'Paste three-pillar-lens.md into a Gem or Saved Info.'},
        {n:'Any API / CLI agent', s:'Prepend three-pillar-lens.md as the system prompt, or add it to AGENTS.md.'},
      ]},
  },
  th:{ langlbl:'ภาษา', seoTitle:'รากฐานระบบการเงินส่วนบุคคล 3 เสา — Nonthawit Doungsodsri',
    kicker:'ไวต์เปเปอร์การเงินส่วนบุคคล · ฟรี · CC BY 4.0', title:'รากฐานระบบการเงินส่วนบุคคล 3 เสา',
    lede:'สร้างการเงินส่วนบุคคลที่มั่นคงด้วยระบบเดียวที่เรียบง่าย ใช้ได้ทั้งชีวิต — สรุปในไวต์เปเปอร์สั้น ๆ มีครบ 6 ภาษา',
    eq:'รายรับ − รายจ่าย = ทุนสู่อิสรภาพ', pillarsHead:'สามเสาหลัก', readHead:'อ่านเลย — ฟรี', howHead:'วิธีใช้งาน', principleHead:'หลักการเดียว',
    p1t:'กระแสเงินสด', p1d:'รู้ว่าเงินเข้า-ออกเท่าไร รากฐานที่บอกทุนสู่อิสรภาพที่แท้จริง',
    p2t:'การลงทุน', p2d:'ให้เงินทำงานแทนเรา เติบโตด้วยการทบต้นตามเวลา',
    p3t:'การออมรักษามูลค่า', p3d:'ถือสินทรัพย์ที่รักษามูลค่า สู้เงินเฟ้อ ลดความเสี่ยงในชีวิต', rd:'อ่าน',
    use1b:'ปริ้นต์ไปแปะไว้ที่อ่านทุกวัน', use1t:'การเงินเปลี่ยนได้ด้วยการเห็นซ้ำ ๆ จนระบบกลายเป็นนิสัย',
    use2b:'แชร์ mindset นี้ให้คนที่คุณรัก', use2t:'ของขวัญที่ดีที่สุดอย่างหนึ่งคือระบบคิดที่ติดตัวเขาไปตลอดชีวิต',
    quote:'“เริ่มต้นด้วยระบบที่เรียบง่าย แล้วทำมันอย่างสม่ำเสมอ”', quoteSub:'เวลาและความสม่ำเสมอ คือพันธมิตรที่ทรงพลังที่สุดของนักลงทุนทุกคน', ghtext:'ดูบน GitHub',
    footLead:'โดย', footTail:'เผยแพร่เพื่อประโยชน์สาธารณะ ภายใต้',
    ai:{ head:'ใช้งานใน AI ของคุณ',
      lede:'ไวต์เปเปอร์นี้มาพร้อมกับ AI skill — เลนส์ให้เหตุผลที่ AI ที่มีความสามารถทุกตัวนำไปใช้ได้ วางไฟล์เดียว หรือวาง skill folder ลงไปได้เลย',
      repo:'รับ skill บน GitHub', note:'กรอบแนวคิดเพื่อการศึกษา ไม่ใช่คำแนะนำทางการเงินส่วนบุคคล',
      p:[
        {n:'Claude Code', s:'คัดลอกโฟลเดอร์ skill/ ไปไว้ใน .claude/skills/ มันจะทำงานอัตโนมัติเมื่อคุณพูดถึงเรื่องเงิน'},
        {n:'claude.ai', s:'วาง three-pillar-lens.md ลงใน custom instructions ของ Project'},
        {n:'ChatGPT', s:'วาง three-pillar-lens.md ลงใน Custom Instructions, Project หรือ GPT'},
        {n:'Gemini', s:'วาง three-pillar-lens.md ลงใน Gem หรือ Saved Info'},
        {n:'Any API / CLI agent', s:'แนบ three-pillar-lens.md ไว้ต้น system prompt หรือเพิ่มใน AGENTS.md'},
      ]},
  },
  es:{ langlbl:'Idioma', seoTitle:'Fundamentos de un Sistema de Finanzas Personales: Los Tres Pilares — Nonthawit Doungsodsri',
    kicker:'Documento de Finanzas Personales · Gratis · CC BY 4.0', title:'Fundamentos de un Sistema de Finanzas Personales: Los Tres Pilares',
    lede:'Construye finanzas personales duraderas con un sistema simple para toda la vida — en un breve documento gratuito. Disponible en seis idiomas.',
    eq:'Ingresos − Gastos = Fondo de Libertad', pillarsHead:'Los tres pilares', readHead:'Léelo ahora — gratis', howHead:'Cómo usarlo', principleHead:'El único principio',
    p1t:'Flujo de caja', p1d:'Conoce lo que entra y sale — la base que revela tu verdadero Fondo de Libertad.',
    p2t:'Inversión', p2d:'Pon tu dinero a trabajar y hazlo crecer con el interés compuesto.',
    p3t:'Ahorro', p3d:'Mantén activos que preservan su valor para vencer la inflación y reducir riesgos.', rd:'Leer',
    use1b:'Imprímelo y pégalo donde leas cada día.', use1t:'Las finanzas cambian con la exposición repetida, hasta que el sistema se vuelve hábito.',
    use2b:'Comparte esta mentalidad con quienes amas.', use2t:'Uno de los mejores regalos es una forma de pensar que acompaña a alguien toda la vida.',
    quote:'«Comienza con un sistema simple y aplícalo con constancia.»', quoteSub:'El tiempo y la constancia son los aliados más poderosos de todo inversor.', ghtext:'Ver en GitHub',
    footLead:'Por', footTail:'Publicado para el bien público bajo',
    ai:{ head:'Úsalo en tu IA',
      lede:'Este documento también viene como un AI skill — un lente de razonamiento que cualquier IA capaz puede aplicar. Pega un archivo o coloca la carpeta del skill.',
      repo:'Obtén el skill en GitHub', note:'Marco educativo, no asesoramiento financiero personalizado.',
      p:[
        {n:'Claude Code', s:'Copia la carpeta skill/ en .claude/skills/. Se aplica automáticamente cuando hablas de dinero.'},
        {n:'claude.ai', s:'Pega three-pillar-lens.md en las instrucciones personalizadas de un Project.'},
        {n:'ChatGPT', s:'Pega three-pillar-lens.md en Custom Instructions, un Project o un GPT.'},
        {n:'Gemini', s:'Pega three-pillar-lens.md en un Gem o en Saved Info.'},
        {n:'Any API / CLI agent', s:'Antepón three-pillar-lens.md como system prompt o agrégalo a AGENTS.md.'},
      ]},
  },
  id:{ langlbl:'Bahasa', seoTitle:'Fondasi Sistem Keuangan Pribadi: Tiga Pilar — Nonthawit Doungsodsri',
    kicker:'Whitepaper Keuangan Pribadi · Gratis · CC BY 4.0', title:'Fondasi Sistem Keuangan Pribadi: Tiga Pilar',
    lede:'Bangun keuangan pribadi yang kokoh dengan satu sistem sederhana seumur hidup — dalam whitepaper singkat dan gratis. Tersedia dalam enam bahasa.',
    eq:'Pemasukan − Pengeluaran = Dana Kebebasan', pillarsHead:'Tiga pilar', readHead:'Baca sekarang — gratis', howHead:'Cara menggunakannya', principleHead:'Satu prinsip',
    p1t:'Arus Kas', p1d:'Ketahui uang masuk dan keluar — fondasi yang mengungkap Dana Kebebasan Anda.',
    p2t:'Investasi', p2d:'Biarkan uang bekerja untuk Anda dan tumbuh lewat bunga majemuk.',
    p3t:'Menabung', p3d:'Simpan aset yang menjaga nilai untuk melawan inflasi dan mengurangi risiko.', rd:'Baca',
    use1b:'Cetak dan tempel di tempat Anda membaca setiap hari.', use1t:'Keuangan berubah lewat paparan berulang, hingga sistem menjadi kebiasaan.',
    use2b:'Bagikan pola pikir ini kepada orang yang Anda cintai.', use2t:'Salah satu hadiah terbaik adalah cara berpikir yang menemani seseorang seumur hidup.',
    quote:'“Mulailah dengan sistem yang sederhana, lalu jalankan secara konsisten.”', quoteSub:'Waktu dan konsistensi adalah sekutu terkuat setiap investor.', ghtext:'Lihat di GitHub',
    footLead:'Oleh', footTail:'Dirilis untuk kepentingan publik di bawah',
    ai:{ head:'Gunakan di AI Anda',
      lede:'Whitepaper ini juga hadir sebagai AI skill — lensa penalaran yang dapat diterapkan oleh AI mana pun. Tempelkan satu file, atau masukkan folder skill-nya.',
      repo:'Dapatkan skill di GitHub', note:'Kerangka edukasi, bukan saran keuangan pribadi.',
      p:[
        {n:'Claude Code', s:'Salin folder skill/ ke .claude/skills/. Otomatis aktif saat Anda membahas soal uang.'},
        {n:'claude.ai', s:'Tempel three-pillar-lens.md ke custom instructions sebuah Project.'},
        {n:'ChatGPT', s:'Tempel three-pillar-lens.md ke Custom Instructions, sebuah Project, atau GPT.'},
        {n:'Gemini', s:'Tempel three-pillar-lens.md ke dalam Gem atau Saved Info.'},
        {n:'Any API / CLI agent', s:'Tambahkan three-pillar-lens.md di awal system prompt, atau masukkan ke AGENTS.md.'},
      ]},
  },
  zh:{ langlbl:'语言', seoTitle:'个人理财系统的基石：三大支柱 — Nonthawit Doungsodsri',
    kicker:'个人理财白皮书 · 免费 · CC BY 4.0', title:'个人理财系统的基石：三大支柱',
    lede:'用一套简单、可用一生的系统，构建稳健的个人财务 —— 浓缩于一份简短的免费白皮书。提供六种语言。',
    eq:'收入 − 支出 = 自由基金', pillarsHead:'三大支柱', readHead:'立即阅读 — 免费', howHead:'如何使用', principleHead:'唯一的原则',
    p1t:'现金流', p1d:'掌握收支，揭示你真正的自由基金这一根基。',
    p2t:'投资', p2d:'让金钱为你工作，借助复利随时间增长。',
    p3t:'储蓄', p3d:'持有保值资产，对抗通胀、降低人生风险。', rd:'阅读',
    use1b:'打印出来，贴在你每天阅读的地方。', use1t:'财务因反复看见而改变，直到体系成为习惯。',
    use2b:'把这套思维分享给你爱的人。', use2t:'最好的礼物之一，是一种陪伴一生的思维方式。',
    quote:'“从简单的体系开始，然后坚持去做。”', quoteSub:'时间与坚持，是每一位投资者最强大的盟友。', ghtext:'在 GitHub 查看',
    footLead:'作者', footTail:'以下许可为公共利益发布：',
    ai:{ head:'在你的 AI 中使用',
      lede:'本白皮书同时提供 AI skill —— 一套推理框架，任何有能力的 AI 都可以应用。粘贴一个文件，或直接放入 skill 文件夹。',
      repo:'在 GitHub 获取 skill', note:'教育性框架，不构成个性化财务建议。',
      p:[
        {n:'Claude Code', s:'将 skill/ 文件夹复制到 .claude/skills/。当你讨论理财时，它会自动生效。'},
        {n:'claude.ai', s:'将 three-pillar-lens.md 粘贴到 Project 的自定义指令中。'},
        {n:'ChatGPT', s:'将 three-pillar-lens.md 粘贴到 Custom Instructions、Project 或 GPT 中。'},
        {n:'Gemini', s:'将 three-pillar-lens.md 粘贴到 Gem 或 Saved Info 中。'},
        {n:'Any API / CLI agent', s:'将 three-pillar-lens.md 作为 system prompt 前置，或添加到 AGENTS.md。'},
      ]},
  },
  ja:{ langlbl:'言語', seoTitle:'パーソナルファイナンス・システムの基盤：3本の柱 — Nonthawit Doungsodsri',
    kicker:'パーソナルファイナンス白書 · 無料 · CC BY 4.0', title:'パーソナルファイナンス・システムの基盤：3本の柱',
    lede:'シンプルで一生使える一つの仕組みで、揺るがない家計を築く —— 短い無料の白書にまとめました。6言語で提供。',
    eq:'収入 − 支出 = 自由資金', pillarsHead:'3本の柱', readHead:'今すぐ読む — 無料', howHead:'使い方', principleHead:'たった一つの原則',
    p1t:'キャッシュフロー', p1d:'収支を把握し、本当の自由資金という土台を明らかにする。',
    p2t:'投資', p2d:'お金に働いてもらい、複利で時間をかけて育てる。',
    p3t:'貯蓄', p3d:'価値を保つ資産を持ち、インフレに対抗しリスクを減らす。', rd:'読む',
    use1b:'印刷して、毎日読む場所に貼る。', use1t:'家計は繰り返し目にすることで変わり、やがて仕組みが習慣になる。',
    use2b:'この考え方を大切な人に共有する。', use2t:'最高の贈り物の一つは、一生寄り添う考え方である。',
    quote:'「シンプルな仕組みから始め、それを一貫して続けよ。」', quoteSub:'時間と一貫性は、すべての投資家にとって最も強力な味方である。', ghtext:'GitHub で見る',
    footLead:'著者', footTail:'次のライセンスのもと公共の利益のために公開：',
    ai:{ head:'AIで使う',
      lede:'この白書は AI skill としても提供されています —— あらゆる有能な AI が適用できる推論レンズです。ファイルを一枚貼るか、skill フォルダをそのまま置くだけ。',
      repo:'GitHub で skill を入手', note:'教育的フレームワークであり、個別の財務アドバイスではありません。',
      p:[
        {n:'Claude Code', s:'skill/ フォルダを .claude/skills/ にコピーする。お金の話をすると自動で適用される。'},
        {n:'claude.ai', s:'three-pillar-lens.md を Project のカスタム指示に貼り付ける。'},
        {n:'ChatGPT', s:'three-pillar-lens.md を Custom Instructions、Project、または GPT に貼り付ける。'},
        {n:'Gemini', s:'three-pillar-lens.md を Gem または Saved Info に貼り付ける。'},
        {n:'Any API / CLI agent', s:'three-pillar-lens.md を system prompt の先頭に付加するか、AGENTS.md に追加する。'},
      ]},
  },
};

const READROWS = [
  { f:'th', name:'ไทย', en:'Thai' }, { f:'en', name:'English', en:'' },
  { f:'es', name:'Español', en:'Spanish' }, { f:'id', name:'Bahasa Indonesia', en:'' },
  { f:'zh', name:'简体中文', en:'Chinese' }, { f:'ja', name:'日本語', en:'Japanese' },
];
const DLICON = '<svg class="ico" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>';
const esc = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');

function page(lang){
  const t = T[lang];
  const canonical = BASE + (lang==='en' ? '/' : `/${lang}/`);
  const alts = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${BASE}${pathFor(l)==='/'?'/':pathFor(l).replace(ROOT,'')}">`);
  // build hreflang with full URLs
  const hreflang = LANGS.map(l => `  <link rel="alternate" hreflang="${l}" href="${BASE}${l==='en'?'/':`/${l}/`}">`).join('\n')
    + `\n  <link rel="alternate" hreflang="x-default" href="${BASE}/">`;
  const switcher = LANGS.map(l =>
    l===lang
      ? `    <span class="langbtn" aria-current="true">${LABEL[l]}</span>`
      : `    <a class="langbtn" href="${pathFor(l)}">${LABEL[l]}</a>`
  ).join('\n');
  const readlist = READROWS.map(r =>
    `    <li><a href="${ROOT}/whitepaper-${r.f}.pdf" target="_blank" rel="noopener"><span class="name">${r.name}${r.en?` <em>${r.en}</em>`:''}</span><span class="get">${t.rd}${DLICON}</span></a></li>`
  ).join('\n');
  const foot = `${t.footLead} <strong>Nonthawit Doungsodsri</strong> · <a href="https://nonthawit.com" target="_blank" rel="noopener">nonthawit.com</a><br>${t.footTail} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(t.seoTitle)}</title>
<meta name="description" content="${esc(t.lede)}">
<meta name="author" content="Nonthawit Doungsodsri">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="${ROOT}/favicon.svg" type="image/svg+xml">
${hreflang}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.lede)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${IMG}">
<meta property="og:locale" content="${lang}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.title)}">
<meta name="twitter:description" content="${esc(t.lede)}">
<meta name="twitter:image" content="${IMG}">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"CreativeWork","name":${JSON.stringify(t.title)},"description":${JSON.stringify(t.lede)},"author":{"@type":"Person","name":"Nonthawit Doungsodsri","url":"https://nonthawit.com"},"license":"https://creativecommons.org/licenses/by/4.0/","inLanguage":"${lang}","version":"1.0.0","url":"https://github.com/nontravis/personal-finance-whitepaper"}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @view-transition { navigation: auto; }
  :root{ --ink:#1b1b19; --muted:#6f6c64; --faint:#9a978d; --line:#e8e4da; --line-strong:#d3cec1; --paper:#fefdfb; --desk:#cbc7bd; --maxw:880px;
    --sans:'Google Sans','Google Sans Text','Product Sans','DM Sans','Sarabun','Noto Sans SC','Noto Sans JP','PingFang SC','Hiragino Sans','Microsoft YaHei',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
  *{box-sizing:border-box;}
  html{ -webkit-text-size-adjust:100%; }
  body{ margin:0; font-family:var(--sans); color:var(--ink); background:var(--desk);
    background-image:radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size:4px 4px;
    line-height:1.62; font-size:17px; letter-spacing:.005em; padding:clamp(0px,4vw,56px) clamp(0px,4vw,40px); }
  .sheet{ max-width:var(--maxw); margin:0 auto; background:var(--paper);
    box-shadow:0 1px 0 rgba(0,0,0,.04), 0 24px 60px -20px rgba(0,0,0,.35);
    padding:clamp(30px,6vw,80px) clamp(22px,6vw,84px); position:relative; border-radius:2px; }
  .sheet::before{ content:""; position:absolute; inset:0; pointer-events:none; border-radius:2px; opacity:.35; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E"); }
  .sheet>*{position:relative;}
  .langbar{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin:0 0 34px; }
  .langbar .lbl{ font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); margin-right:8px; }
  .langbtn{ font-family:inherit; font-size:.78rem; font-weight:600; letter-spacing:.06em; color:var(--muted); background:transparent; border:1px solid var(--line); padding:6px 11px; border-radius:20px; cursor:pointer; text-decoration:none; transition:all .18s ease; }
  .langbtn:hover{ border-color:var(--line-strong); color:var(--ink); }
  .langbtn:focus-visible{ outline:2px solid var(--ink); outline-offset:2px; }
  .langbtn[aria-current="true"]{ background:var(--ink); color:var(--paper); border-color:var(--ink); }
  a{color:inherit;}
  .kicker{ font-size:.74rem; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:var(--faint); margin:0 0 16px; }
  h1{ font-size:clamp(1.9rem,5.6vw,3.1rem); line-height:1.1; font-weight:700; letter-spacing:-.02em; margin:0; overflow-wrap:break-word; }
  .lede{ font-size:clamp(1.05rem,2.4vw,1.26rem); color:var(--muted); max-width:50ch; margin:18px 0 0; }
  .rule{ height:1px; background:var(--line-strong); border:0; margin:34px 0; }
  .sechead{ display:flex; align-items:center; gap:18px; margin:46px 0 24px; }
  .sechead h2{ font-size:.82rem; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); white-space:nowrap; margin:0; }
  .sechead::after{ content:""; flex:1; height:1px; background:var(--line); }
  .eq{ display:flex; justify-content:center; margin:6px 0 4px; }
  .eq span{ border:1.5px solid var(--ink); border-radius:6px; padding:14px 26px; font-size:clamp(1.02rem,2.6vw,1.32rem); font-weight:600; text-align:center; max-width:100%; }
  .pillars{ display:grid; grid-template-columns:1fr; }
  .pillar{ padding:22px 0; border-top:1px solid var(--line); }
  .pillar:first-child{ border-top:0; }
  .pnum{ font-size:.78rem; font-weight:600; letter-spacing:.16em; color:var(--faint); }
  .pillar h3{ font-size:1.2rem; margin:6px 0 6px; font-weight:700; }
  .pillar p{ margin:0; color:var(--muted); }
  @media(min-width:720px){ .pillars{ grid-template-columns:repeat(3,1fr); column-gap:34px; } .pillar{ border-top:0; border-left:1px solid var(--line); padding:4px 0 4px 26px; } .pillar:first-child{ padding-left:0; border-left:0; } }
  .dl{ list-style:none; margin:0; padding:0; border-top:1px solid var(--line); }
  .dl li{ border-bottom:1px solid var(--line); }
  .dl a{ display:flex; align-items:center; justify-content:space-between; gap:16px; padding:15px 4px; text-decoration:none; cursor:pointer; transition:background .18s ease, padding .18s ease; }
  .dl a:hover{ background:rgba(0,0,0,.035); padding-left:12px; padding-right:12px; }
  .dl a:focus-visible{ outline:2px solid var(--ink); outline-offset:-2px; border-radius:3px; }
  .dl .name{ font-weight:600; font-size:1.05rem; }
  .dl .name em{ color:var(--faint); font-style:normal; font-weight:400; margin-left:10px; font-size:.92rem; }
  .dl .get{ display:inline-flex; align-items:center; gap:7px; color:var(--muted); font-size:.8rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; white-space:nowrap; }
  .dl a:hover .get{ color:var(--ink); }
  .ico{ width:16px; height:16px; stroke:currentColor; fill:none; stroke-width:1.9; stroke-linecap:round; stroke-linejoin:round; flex:none; }
  .use p{ margin:0 0 18px; } .use b{ font-weight:600; }
  blockquote{ margin:6px 0 0; padding:4px 0 4px 24px; border-left:3px solid var(--ink); font-size:clamp(1.22rem,3vw,1.55rem); font-weight:600; line-height:1.35; letter-spacing:-.01em; }
  blockquote small{ display:block; margin-top:12px; font-size:.92rem; font-weight:400; color:var(--muted); letter-spacing:0; }
  .btn{ display:inline-flex; align-items:center; gap:9px; margin-top:30px; background:var(--ink); color:var(--paper); text-decoration:none; cursor:pointer; padding:13px 22px; border-radius:6px; font-weight:600; font-size:.98rem; transition:transform .18s ease, opacity .18s ease; }
  .btn:hover{ opacity:.88; transform:translateY(-1px); }
  .btn:focus-visible{ outline:2px solid var(--ink); outline-offset:3px; }
  footer{ margin-top:18px; padding-top:26px; border-top:1px solid var(--line); color:var(--muted); font-size:.92rem; }
  footer a{ color:var(--ink); text-decoration:none; border-bottom:1px solid var(--line-strong); }
  footer a:hover{ border-color:var(--ink); }
  @media(max-width:600px){ body{ padding:0; background:var(--paper); background-image:none; overflow-x:hidden; }
    .sheet{ max-width:none; box-shadow:none; border-radius:0; min-height:100dvh; padding:26px 20px 44px; }
    h1{ font-size:clamp(1.6rem,7vw,2.1rem); } .eq span{ font-size:1rem; padding:12px 16px; } .sechead{ margin:38px 0 20px; } }
  @media (prefers-reduced-motion: no-preference){
    ::view-transition-old(root){ animation:vtout .18s ease both; }
    ::view-transition-new(root){ animation:vtin .26s ease both; }
  }
  @keyframes vtout{ to{ opacity:0; transform:translateY(-10px) scale(.992); } }
  @keyframes vtin{ from{ opacity:0; transform:translateY(12px); } }
  @media (prefers-reduced-motion: reduce){ *{ transition:none !important; } }
</style>
</head>
<body>
<main class="sheet">
  <nav class="langbar" aria-label="Language">
    <span class="lbl">${t.langlbl}</span>
${switcher}
  </nav>
  <p class="kicker">${t.kicker}</p>
  <h1>${t.title}</h1>
  <p class="lede">${t.lede}</p>
  <hr class="rule">
  <div class="eq"><span>${t.eq}</span></div>
  <div class="sechead"><h2>${t.pillarsHead}</h2></div>
  <div class="pillars">
    <div class="pillar"><div class="pnum">01</div><h3>${t.p1t}</h3><p>${t.p1d}</p></div>
    <div class="pillar"><div class="pnum">02</div><h3>${t.p2t}</h3><p>${t.p2d}</p></div>
    <div class="pillar"><div class="pnum">03</div><h3>${t.p3t}</h3><p>${t.p3d}</p></div>
  </div>
  <div class="sechead"><h2>${t.readHead}</h2></div>
  <ul class="dl">
${readlist}
  </ul>
  <div class="sechead"><h2>${t.howHead}</h2></div>
  <div class="use">
    <p><b>${t.use1b}</b> ${t.use1t}</p>
    <p><b>${t.use2b}</b> ${t.use2t}</p>
  </div>
  <div class="sechead"><h2>${t.ai.head}</h2></div>
  <div class="use">
    <p>${t.ai.lede}</p>
    ${t.ai.p.map(x=>`<details><summary><b>${x.n}</b></summary><p>${x.s}</p></details>`).join('\n    ')}
    <p><a href="https://github.com/nontravis/personal-finance-whitepaper#-use-the-framework-in-your-ai" target="_blank" rel="noopener">${t.ai.repo}</a></p>
    <p><small>${t.ai.note}</small></p>
  </div>
  <div class="sechead"><h2>${t.principleHead}</h2></div>
  <blockquote>${t.quote}<small>${t.quoteSub}</small></blockquote>
  <div>
    <a class="btn" href="https://github.com/nontravis/personal-finance-whitepaper" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" style="fill:currentColor;width:18px;height:18px"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
      ${t.ghtext}
    </a>
  </div>
  <footer>${foot}</footer>
</main>
</body>
</html>
`;
}

for (const l of LANGS){
  const f = fileFor(l);
  mkdirSync(dirname(f), { recursive:true });
  writeFileSync(f, page(l));
  console.log('wrote', f.replace(OUT,''));
}

// sitemap.xml
const urls = LANGS.map(l => {
  const loc = BASE + (l==='en'?'/':`/${l}/`);
  const alt = LANGS.map(a => `    <xhtml:link rel="alternate" hreflang="${a}" href="${BASE}${a==='en'?'/':`/${a}/`}"/>`).join('\n')
    + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`;
  return `  <url>\n    <loc>${loc}</loc>\n${alt}\n  </url>`;
}).join('\n');
const pdfUrls = LANGS.map(l => `  <url><loc>${BASE}/whitepaper-${l}.pdf</loc></url>`).join('\n');
writeFileSync(`${OUT}sitemap.xml`,
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${pdfUrls}
</urlset>
`);
console.log('wrote sitemap.xml');

writeFileSync(`${OUT}robots.txt`,
`User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`);
console.log('wrote robots.txt');
