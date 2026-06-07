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
    kicker:'Personal Finance Whitepaper · Free · MIT', title:'The Three-Pillar Personal Finance System',
    lede:'Build lasting personal finances with one simple, lifelong system — explained in a short, free whitepaper. Available in six languages.',
    eq:'Income − Expenses = Freedom Fund', pillarsHead:'The three pillars', readHead:'Read it now — free', howHead:'How to Use It', principleHead:'The one principle',
    p1t:'Cashflow', p1d:'Know what comes in and out — the foundation that reveals your true Freedom Fund.',
    p2t:'Investment', p2d:'Put money to work for you and grow it through compounding over time.',
    p3t:'Savings', p3d:"Hold value-preserving assets to beat inflation and reduce life's risks.", rd:'Read',
    use1b:'Print it and post it where you read every day.', use1t:'Finance changes through repeated exposure, until the system becomes a habit.',
    use2b:'Share this mindset with the people you love.', use2t:'One of the best gifts is a way of thinking that stays with someone for life.',
    benefitsHead:'What installing this does to your AI', benefitsFoot:'Your prompts return sharper, more consistent, less generic financial guidance.',
    benefits:[
      'Anchors every answer on your real numbers — Income − Expenses = Freedom Fund — before advising.',
      "Refuses hype: it won't endorse an asset you don't understand.",
      'Always keeps both offense (Investment) and defense (Savings) in the plan.',
      'Pushes discipline and a 5–10 year horizon over clever timing.',
    ],
    aiWayHead:'🤖 AI Way — install the skill', physWayHead:'📄 Physical Way — read the whitepaper',
    p1k:'Freedom Fund', p2k:'compounding', p3k:'inflation', warn:'Invest only in what you understand.',
    quote:'"Start with a simple system, then do it consistently."', quoteSub:"Time and consistency are every investor's most powerful allies.", ghtext:'View on GitHub',
    footLead:'By', footTail:'Released for the public good under',
    ai:{ head:'Use it in your AI',
      lede:'This whitepaper also ships as an AI skill — a reasoning lens any capable AI can apply. Install with one command, or paste one file.',
      autoHead:'⚡ Auto install (one command)', manualHead:'✋ Manual (copy-paste)',
      repo:'Full guide on GitHub', note:'Educational framework, not personalized financial advice.',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code> then <code>/plugin install three-pillar-finance@nontravis</code>. Update: <code>/plugin marketplace update nontravis</code> then <code>/reload-plugins</code>.'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>. Update: re-run with <code>--force</code>.'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:"degit the skill/ folder into the agent's adapter directory or AGENTS.md; update with <code>--force</code>."},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'Paste three-pillar-lens.md into the Project, Custom Instructions, a Gem, or the system prompt. To update, re-paste the latest file.'},
      ]},
  },
  th:{ langlbl:'ภาษา', seoTitle:'รากฐานระบบการเงินส่วนบุคคล 3 เสา — Nonthawit Doungsodsri',
    kicker:'ไวต์เปเปอร์การเงินส่วนบุคคล · ฟรี · MIT', title:'รากฐานระบบการเงินส่วนบุคคล 3 เสา',
    lede:'สร้างการเงินส่วนบุคคลที่มั่นคงด้วยระบบเดียวที่เรียบง่าย ใช้ได้ทั้งชีวิต — สรุปในไวต์เปเปอร์สั้น ๆ มีครบ 6 ภาษา',
    eq:'รายรับ − รายจ่าย = ทุนสู่อิสรภาพ', pillarsHead:'สามเสาหลัก', readHead:'อ่านเลย — ฟรี', howHead:'วิธีใช้งาน', principleHead:'หลักการเดียว',
    p1t:'กระแสเงินสด', p1d:'รู้ว่าเงินเข้า-ออกเท่าไร รากฐานที่บอกทุนสู่อิสรภาพที่แท้จริง',
    p2t:'การลงทุน', p2d:'ให้เงินทำงานแทนเรา เติบโตด้วยการทบต้นตามเวลา',
    p3t:'การออมรักษามูลค่า', p3d:'ถือสินทรัพย์ที่รักษามูลค่า สู้เงินเฟ้อ ลดความเสี่ยงในชีวิต', rd:'อ่าน',
    use1b:'ปริ้นต์ไปแปะไว้ที่อ่านทุกวัน', use1t:'การเงินเปลี่ยนได้ด้วยการเห็นซ้ำ ๆ จนระบบกลายเป็นนิสัย',
    use2b:'แชร์ mindset นี้ให้คนที่คุณรัก', use2t:'ของขวัญที่ดีที่สุดอย่างหนึ่งคือระบบคิดที่ติดตัวเขาไปตลอดชีวิต',
    benefitsHead:'ผลที่ได้เมื่อติดตั้ง skill นี้ลงใน AI ของคุณ', benefitsFoot:'คำตอบที่ได้จะคมชัด สม่ำเสมอ และไม่ผิวเผินไปกว่าเดิม',
    benefits:[
      'ยึดทุกคำตอบไว้ที่ตัวเลขจริงของคุณ — รายรับ − รายจ่าย = ทุนสู่อิสรภาพ — ก่อนให้คำแนะนำ',
      "ปฏิเสธกระแสฮือฮา: ไม่แนะนำสินทรัพย์ที่คุณไม่เข้าใจ",
      'รักษาสมดุลทั้งรุก (การลงทุน) และรับ (การออม) ในแผนเสมอ',
      'ให้ความสำคัญกับวินัยและขอบฟ้า 5–10 ปี มากกว่าการจับจังหวะตลาด',
    ],
    aiWayHead:'🤖 วิธี AI — ติดตั้ง skill', physWayHead:'📄 วิธีสิ่งพิมพ์ — อ่านไวต์เปเปอร์',
    p1k:'ทุนสู่อิสรภาพ', p2k:'การทบต้น', p3k:'เงินเฟ้อ', warn:'ลงทุนเฉพาะในสิ่งที่คุณเข้าใจ',
    quote:'“เริ่มต้นด้วยระบบที่เรียบง่าย แล้วทำมันอย่างสม่ำเสมอ”', quoteSub:'เวลาและความสม่ำเสมอ คือพันธมิตรที่ทรงพลังที่สุดของนักลงทุนทุกคน', ghtext:'ดูบน GitHub',
    footLead:'โดย', footTail:'เผยแพร่เพื่อประโยชน์สาธารณะ ภายใต้',
    ai:{ head:'ใช้งานใน AI ของคุณ',
      lede:'ไวต์เปเปอร์นี้มาพร้อมกับ AI skill — เลนส์ให้เหตุผลที่ AI ที่มีความสามารถทุกตัวนำไปใช้ได้ ติดตั้งด้วยคำสั่งเดียว หรือวางไฟล์เดียว',
      autoHead:'⚡ ติดตั้งอัตโนมัติ (หนึ่งคำสั่ง)', manualHead:'✋ ติดตั้งแบบ manual (copy-paste)',
      repo:'ดูคู่มือเต็มบน GitHub', note:'กรอบแนวคิดเพื่อการศึกษา ไม่ใช่คำแนะนำทางการเงินส่วนบุคคล',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code> แล้ว <code>/plugin install three-pillar-finance@nontravis</code>. อัปเดต: <code>/plugin marketplace update nontravis</code> แล้ว <code>/reload-plugins</code>.'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>. อัปเดต: รันคำสั่งเดิมพร้อม <code>--force</code>.'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:"วาง skill/ folder ลงในไดเรกทอรี adapter ของ agent หรือ AGENTS.md แล้วอัปเดตด้วย <code>--force</code>."},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'วาง three-pillar-lens.md ลงใน Project, Custom Instructions, Gem หรือ system prompt หากต้องการอัปเดต ให้วางไฟล์ล่าสุดทับ'},
      ]},
  },
  es:{ langlbl:'Idioma', seoTitle:'Fundamentos de un Sistema de Finanzas Personales: Los Tres Pilares — Nonthawit Doungsodsri',
    kicker:'Documento de Finanzas Personales · Gratis · MIT', title:'Fundamentos de un Sistema de Finanzas Personales: Los Tres Pilares',
    lede:'Construye finanzas personales duraderas con un sistema simple para toda la vida — en un breve documento gratuito. Disponible en seis idiomas.',
    eq:'Ingresos − Gastos = Fondo de Libertad', pillarsHead:'Los tres pilares', readHead:'Léelo ahora — gratis', howHead:'Cómo usarlo', principleHead:'El único principio',
    p1t:'Flujo de caja', p1d:'Conoce lo que entra y sale — la base que revela tu verdadero Fondo de Libertad.',
    p2t:'Inversión', p2d:'Pon tu dinero a trabajar y hazlo crecer con el interés compuesto.',
    p3t:'Ahorro', p3d:'Mantén activos que preservan su valor para vencer la inflación y reducir riesgos.', rd:'Leer',
    use1b:'Imprímelo y pégalo donde leas cada día.', use1t:'Las finanzas cambian con la exposición repetida, hasta que el sistema se vuelve hábito.',
    use2b:'Comparte esta mentalidad con quienes amas.', use2t:'Uno de los mejores regalos es una forma de pensar que acompaña a alguien toda la vida.',
    benefitsHead:'Qué cambia en tu IA al instalar esto', benefitsFoot:'Tus preguntas recibirán orientación financiera más precisa, coherente y menos genérica.',
    benefits:[
      'Ancla cada respuesta en tus números reales — Ingresos − Gastos = Fondo de Libertad — antes de asesorar.',
      "Rechaza el hype: no recomendará un activo que no entiendes.",
      'Mantiene siempre el ataque (Inversión) y la defensa (Ahorro) en el plan.',
      'Prioriza la disciplina y un horizonte de 5 a 10 años sobre el timing inteligente.',
    ],
    aiWayHead:'🤖 Vía IA — instala el skill', physWayHead:'📄 Vía física — lee el documento',
    p1k:'Fondo de Libertad', p2k:'interés compuesto', p3k:'inflación', warn:'Invierte solo en lo que entiendes.',
    quote:'«Comienza con un sistema simple y aplícalo con constancia.»', quoteSub:'El tiempo y la constancia son los aliados más poderosos de todo inversor.', ghtext:'Ver en GitHub',
    footLead:'Por', footTail:'Publicado para el bien público bajo',
    ai:{ head:'Úsalo en tu IA',
      lede:'Este documento también viene como un AI skill — un lente de razonamiento que cualquier IA capaz puede aplicar. Instala con un comando o pega un archivo.',
      autoHead:'⚡ Instalación automática (un comando)', manualHead:'✋ Manual (copy-paste)',
      repo:'Guía completa en GitHub', note:'Marco educativo, no asesoramiento financiero personalizado.',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code> y luego <code>/plugin install three-pillar-finance@nontravis</code>. Actualizar: <code>/plugin marketplace update nontravis</code> y luego <code>/reload-plugins</code>.'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>. Actualizar: vuelve a ejecutar con <code>--force</code>.'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:"Copia la carpeta skill/ al directorio del adaptador del agente o a AGENTS.md; actualiza con <code>--force</code>."},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'Pega three-pillar-lens.md en el Project, Custom Instructions, un Gem o el system prompt. Para actualizar, vuelve a pegar el archivo más reciente.'},
      ]},
  },
  id:{ langlbl:'Bahasa', seoTitle:'Fondasi Sistem Keuangan Pribadi: Tiga Pilar — Nonthawit Doungsodsri',
    kicker:'Whitepaper Keuangan Pribadi · Gratis · MIT', title:'Fondasi Sistem Keuangan Pribadi: Tiga Pilar',
    lede:'Bangun keuangan pribadi yang kokoh dengan satu sistem sederhana seumur hidup — dalam whitepaper singkat dan gratis. Tersedia dalam enam bahasa.',
    eq:'Pemasukan − Pengeluaran = Dana Kebebasan', pillarsHead:'Tiga pilar', readHead:'Baca sekarang — gratis', howHead:'Cara menggunakannya', principleHead:'Satu prinsip',
    p1t:'Arus Kas', p1d:'Ketahui uang masuk dan keluar — fondasi yang mengungkap Dana Kebebasan Anda.',
    p2t:'Investasi', p2d:'Biarkan uang bekerja untuk Anda dan tumbuh lewat bunga majemuk.',
    p3t:'Menabung', p3d:'Simpan aset yang menjaga nilai untuk melawan inflasi dan mengurangi risiko.', rd:'Baca',
    use1b:'Cetak dan tempel di tempat Anda membaca setiap hari.', use1t:'Keuangan berubah lewat paparan berulang, hingga sistem menjadi kebiasaan.',
    use2b:'Bagikan pola pikir ini kepada orang yang Anda cintai.', use2t:'Salah satu hadiah terbaik adalah cara berpikir yang menemani seseorang seumur hidup.',
    benefitsHead:'Apa yang berubah pada AI Anda setelah menginstal ini', benefitsFoot:'Pertanyaan Anda akan mendapat panduan keuangan yang lebih tajam, konsisten, dan tidak generik.',
    benefits:[
      'Mendasarkan setiap jawaban pada angka nyata Anda — Pemasukan − Pengeluaran = Dana Kebebasan — sebelum memberi saran.',
      'Menolak hype: tidak akan merekomendasikan aset yang tidak Anda pahami.',
      'Selalu menjaga keseimbangan antara ofensif (Investasi) dan defensif (Menabung) dalam rencana.',
      'Mengutamakan disiplin dan cakrawala 5–10 tahun daripada menebak waktu pasar.',
    ],
    aiWayHead:'🤖 Cara AI — instal skill-nya', physWayHead:'📄 Cara fisik — baca whitepaper-nya',
    p1k:'Dana Kebebasan', p2k:'bunga majemuk', p3k:'inflasi', warn:'Investasikan hanya pada apa yang Anda pahami.',
    quote:'“Mulailah dengan sistem yang sederhana, lalu jalankan secara konsisten.”', quoteSub:'Waktu dan konsistensi adalah sekutu terkuat setiap investor.', ghtext:'Lihat di GitHub',
    footLead:'Oleh', footTail:'Dirilis untuk kepentingan publik di bawah',
    ai:{ head:'Gunakan di AI Anda',
      lede:'Whitepaper ini juga hadir sebagai AI skill — lensa penalaran yang dapat diterapkan oleh AI mana pun. Instal dengan satu perintah, atau tempelkan satu file.',
      autoHead:'⚡ Instal otomatis (satu perintah)', manualHead:'✋ Manual (copy-paste)',
      repo:'Panduan lengkap di GitHub', note:'Kerangka edukasi, bukan saran keuangan pribadi.',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code> lalu <code>/plugin install three-pillar-finance@nontravis</code>. Perbarui: <code>/plugin marketplace update nontravis</code> lalu <code>/reload-plugins</code>.'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>. Perbarui: jalankan ulang dengan <code>--force</code>.'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:'Salin folder skill/ ke direktori adapter agen atau ke AGENTS.md; perbarui dengan <code>--force</code>.'},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'Tempel three-pillar-lens.md ke dalam Project, Custom Instructions, Gem, atau system prompt. Untuk memperbarui, tempel ulang file terbaru.'},
      ]},
  },
  zh:{ langlbl:'语言', seoTitle:'个人理财系统的基石：三大支柱 — Nonthawit Doungsodsri',
    kicker:'个人理财白皮书 · 免费 · MIT', title:'个人理财系统的基石：三大支柱',
    lede:'用一套简单、可用一生的系统，构建稳健的个人财务 —— 浓缩于一份简短的免费白皮书。提供六种语言。',
    eq:'收入 − 支出 = 自由基金', pillarsHead:'三大支柱', readHead:'立即阅读 — 免费', howHead:'如何使用', principleHead:'唯一的原则',
    p1t:'现金流', p1d:'掌握收支，揭示你真正的自由基金这一根基。',
    p2t:'投资', p2d:'让金钱为你工作，借助复利随时间增长。',
    p3t:'储蓄', p3d:'持有保值资产，对抗通胀、降低人生风险。', rd:'阅读',
    use1b:'打印出来，贴在你每天阅读的地方。', use1t:'财务因反复看见而改变，直到体系成为习惯。',
    use2b:'把这套思维分享给你爱的人。', use2t:'最好的礼物之一，是一种陪伴一生的思维方式。',
    benefitsHead:'安装后你的 AI 会有什么变化', benefitsFoot:'你的提问将获得更精准、更一致、更具针对性的财务指导。',
    benefits:[
      '在给出建议前，先以你的真实数字为锚 —— 收入 − 支出 = 自由基金。',
      '拒绝炒作：不推荐你看不懂的资产。',
      '始终在计划中同时保留进攻（投资）与防守（储蓄）。',
      '注重纪律与 5 至 10 年的长期视野，而非聪明的择时操作。',
    ],
    aiWayHead:'🤖 AI 方式 — 安装技能', physWayHead:'📄 纸质方式 — 阅读白皮书',
    p1k:'自由基金', p2k:'复利', p3k:'通胀', warn:'只投资于你理解的事物。',
    quote:'“从简单的体系开始，然后坚持去做。”', quoteSub:'时间与坚持，是每一位投资者最强大的盟友。', ghtext:'在 GitHub 查看',
    footLead:'作者', footTail:'以下许可为公共利益发布：',
    ai:{ head:'在你的 AI 中使用',
      lede:'本白皮书同时提供 AI skill —— 一套推理框架，任何有能力的 AI 都可以应用。一条命令即可安装，或粘贴一个文件。',
      autoHead:'⚡ 自动安装（一条命令）', manualHead:'✋ 手动安装（copy-paste）',
      repo:'在 GitHub 查看完整指南', note:'教育性框架，不构成个性化财务建议。',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code>，然后 <code>/plugin install three-pillar-finance@nontravis</code>。更新：<code>/plugin marketplace update nontravis</code>，然后 <code>/reload-plugins</code>。'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>。更新：加上 <code>--force</code> 重新运行。'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:'将 skill/ 文件夹复制到 agent 的适配器目录或 AGENTS.md；加上 <code>--force</code> 更新。'},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'将 three-pillar-lens.md 粘贴到 Project、Custom Instructions、Gem 或 system prompt 中。如需更新，重新粘贴最新文件。'},
      ]},
  },
  ja:{ langlbl:'言語', seoTitle:'パーソナルファイナンス・システムの基盤：3本の柱 — Nonthawit Doungsodsri',
    kicker:'パーソナルファイナンス白書 · 無料 · MIT', title:'パーソナルファイナンス・システムの基盤：3本の柱',
    lede:'シンプルで一生使える一つの仕組みで、揺るがない家計を築く —— 短い無料の白書にまとめました。6言語で提供。',
    eq:'収入 − 支出 = 自由資金', pillarsHead:'3本の柱', readHead:'今すぐ読む — 無料', howHead:'使い方', principleHead:'たった一つの原則',
    p1t:'キャッシュフロー', p1d:'収支を把握し、本当の自由資金という土台を明らかにする。',
    p2t:'投資', p2d:'お金に働いてもらい、複利で時間をかけて育てる。',
    p3t:'貯蓄', p3d:'価値を保つ資産を持ち、インフレに対抗しリスクを減らす。', rd:'読む',
    use1b:'印刷して、毎日読む場所に貼る。', use1t:'家計は繰り返し目にすることで変わり、やがて仕組みが習慣になる。',
    use2b:'この考え方を大切な人に共有する。', use2t:'最高の贈り物の一つは、一生寄り添う考え方である。',
    benefitsHead:'このスキルをインストールするとAIがどう変わるか', benefitsFoot:'あなたの質問に対し、より鋭く、より一貫した、より具体的な財務アドバイスが返ってきます。',
    benefits:[
      'アドバイスの前に、あなたの実際の数字 —— 収入 − 支出 = 自由資金 —— を必ず起点にする。',
      'ハイプを拒絶する：理解できない資産は勧めない。',
      '常に攻め（投資）と守り（貯蓄）の両方をプランに組み込む。',
      '巧みなタイミング狙いより、規律と5〜10年の長期視点を優先する。',
    ],
    aiWayHead:'🤖 AIでの使い方 — スキルをインストール', physWayHead:'📄 紙での使い方 — 白書を読む',
    p1k:'自由資金', p2k:'複利', p3k:'インフレ', warn:'理解できるものにだけ投資する。',
    quote:'「シンプルな仕組みから始め、それを一貫して続けよ。」', quoteSub:'時間と一貫性は、すべての投資家にとって最も強力な味方である。', ghtext:'GitHub で見る',
    footLead:'著者', footTail:'次のライセンスのもと公共の利益のために公開：',
    ai:{ head:'AIで使う',
      lede:'この白書は AI skill としても提供されています —— あらゆる有能な AI が適用できる推論レンズです。コマンド一つでインストールするか、ファイルを一枚貼るだけ。',
      autoHead:'⚡ 自動インストール（コマンド一つ）', manualHead:'✋ 手動インストール（copy-paste）',
      repo:'GitHub で完全ガイドを見る', note:'教育的フレームワークであり、個別の財務アドバイスではありません。',
      auto:[
        {n:'Claude Code — plugin', s:'<code>/plugin marketplace add nontravis/personal-finance-whitepaper</code>、次に <code>/plugin install three-pillar-finance@nontravis</code>。更新: <code>/plugin marketplace update nontravis</code>、次に <code>/reload-plugins</code>。'},
        {n:'Claude Code — degit', s:'<code>npx degit nontravis/personal-finance-whitepaper/skills/three-pillar-finance ~/.claude/skills/three-pillar-finance</code>。更新: <code>--force</code> を付けて再実行。'},
        {n:'CLI agents (Gemini CLI, Copilot CLI)', s:'skill/ フォルダを agent のアダプタディレクトリまたは AGENTS.md に配置する。更新は <code>--force</code> を付けて再実行。'},
      ],
      manual:[
        {n:'claude.ai / ChatGPT / Gemini / API', s:'three-pillar-lens.md を Project のカスタム指示、Custom Instructions、Gem、または system prompt に貼り付ける。更新するには最新ファイルを貼り直す。'},
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
const CHEV = '<span class="chev"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></span>';

function mark(text, key){
  if(!key) return text;
  const i = text.indexOf(key);
  return i < 0 ? text : text.slice(0,i) + `<span class="hl-b">${key}</span>` + text.slice(i + key.length);
}

const HAND = {
  en:{ fam:'Shantell Sans', fams:['Shantell+Sans:wght@400;600;700'], subset:false },
  es:{ fam:'Shantell Sans', fams:['Shantell+Sans:wght@400;600;700'], subset:false },
  id:{ fam:'Shantell Sans', fams:['Shantell+Sans:wght@400;600;700'], subset:false },
  th:{ fam:'Itim',          fams:['Itim','Shantell+Sans:wght@400;600;700'], subset:false },
  ja:{ fam:'Klee One',      fams:['Klee+One:wght@400;600'], subset:true },
  zh:{ fam:'Ma Shan Zheng', fams:['Ma+Shan+Zheng'], subset:true },
};

function fontHead(lang, t){
  const h = HAND[lang];
  const links = [`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`];
  if (h.subset){
    // collect every string rendered on the page (handwriting covers all body text),
    // strip HTML tags, and always include the Latin/punctuation set so nothing tofus.
    const collect = (v) => typeof v === 'string' ? v
      : Array.isArray(v) ? v.map(collect).join('')
      : (v && typeof v === 'object') ? Object.values(v).map(collect).join('') : '';
    const ascii = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?()[]{}#@/\\\\-–—…&%+=*'\"";
    const allText = collect(t).replace(/<[^>]*>/g, '') + ascii;
    const chars = [...new Set(Array.from(allText))].join('');
    links.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${h.fams[0]}&text=${encodeURIComponent(chars)}&display=swap">`);
  } else {
    const fam = h.fams.map(f => `family=${f}`).join('&');
    links.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fam}&display=swap">`);
  }
  links.push(`<style>:root{ --hand:'${h.fam}',var(--sans); }</style>`);
  return links.join('\n  ');
}

function page(lang){
  const t = Object.assign({}, T.en, T[lang]);
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
  const foot = `${t.footLead} <strong>Nonthawit Doungsodsri</strong> · <a href="https://nonthawit.com" target="_blank" rel="noopener">nonthawit.com</a><br>${t.footTail} <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">the MIT License</a>.`;

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
{"@context":"https://schema.org","@type":"CreativeWork","name":${JSON.stringify(t.title)},"description":${JSON.stringify(t.lede)},"author":{"@type":"Person","name":"Nonthawit Doungsodsri","url":"https://nonthawit.com"},"license":"https://opensource.org/licenses/MIT","inLanguage":"${lang}","version":"1.0.0","url":"https://github.com/nontravis/personal-finance-whitepaper"}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
  ${fontHead(lang, t)}
<style>
  @view-transition { navigation: auto; }
  :root{ --ink:#1b1b19; --muted:#6f6c64; --faint:#9a978d; --line:#e8e4da; --line-strong:#d3cec1; --paper:#fefdfb; --desk:#cbc7bd; --maxw:880px;
    --sans:'Google Sans','Google Sans Text','Product Sans','DM Sans','Sarabun','Noto Sans SC','Noto Sans JP','PingFang SC','Hiragino Sans','Microsoft YaHei',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
  *{box-sizing:border-box;}
  html{ -webkit-text-size-adjust:100%; }
  body{ margin:0; font-family:var(--hand,var(--sans)); color:var(--ink); background:var(--desk);
    background-image:radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size:4px 4px;
    line-height:1.62; font-size:17px; letter-spacing:.005em; font-weight:400; font-synthesis:none; padding:clamp(0px,4vw,56px) clamp(0px,4vw,40px); }
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
  h1{ font-family:var(--hand,var(--sans)); font-size:clamp(1.9rem,5.6vw,3.1rem); line-height:1.12; font-weight:700; letter-spacing:-.01em; margin:0; overflow-wrap:break-word; }
  .lede{ font-size:clamp(1.05rem,2.4vw,1.26rem); color:var(--muted); max-width:50ch; margin:18px 0 0; }
  .rule{ height:1px; background:var(--line-strong); border:0; margin:34px 0; }
  .sechead{ display:flex; align-items:center; gap:18px; margin:46px 0 24px; }
  .sechead h2{ font-size:.82rem; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); white-space:nowrap; margin:0; }
  .sechead::after{ content:""; flex:1; height:1px; background:var(--line); }
  .eq{ display:flex; justify-content:center; margin:6px 0 4px; }
  .eq span{ font-family:var(--hand,var(--sans)); border:1.5px solid var(--ink); border-radius:6px; padding:14px 26px; font-size:clamp(1.02rem,2.6vw,1.32rem); font-weight:600; text-align:center; max-width:100%; }
  .pillars{ display:grid; grid-template-columns:1fr; }
  .pillar{ padding:22px 0; border-top:1px solid var(--line); }
  .pillar:first-child{ border-top:0; }
  .pnum{ font-size:.78rem; font-weight:600; letter-spacing:.16em; color:var(--faint); }
  .pillar h3{ font-family:var(--hand,var(--sans)); font-size:1.28rem; margin:6px 0 6px; font-weight:700; }
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
  code,kbd,samp,pre{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
  .langbar,.langbtn,.dl,.dl *{ font-family:var(--sans); }
  .use details{ border:1px solid var(--line); border-radius:10px; margin:0 0 10px; overflow:hidden; background:#fff; transition:border-color .18s, box-shadow .18s; }
  .use details[open]{ border-color:var(--line-strong); box-shadow:0 6px 20px -12px rgba(0,0,0,.25); }
  .use summary{ list-style:none; cursor:pointer; padding:14px 18px; font-weight:700; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .use summary::-webkit-details-marker{ display:none; }
  .use summary:hover{ background:rgba(0,0,0,.025); }
  .use .acbody{ padding:0 18px 14px; color:var(--muted); }
  .use .acbody p{ margin:0; }
  .use .acbody code{ font-size:.86em; background:rgba(0,0,0,.05); padding:.1em .35em; border-radius:4px; }
  .chev{ flex:none; width:26px; height:26px; display:grid; place-items:center; border-radius:50%; background:rgba(0,0,0,.05); transition:transform .22s ease, background .18s; }
  .chev svg{ width:15px; height:15px; stroke:var(--muted); fill:none; stroke-width:2.4; stroke-linecap:round; stroke-linejoin:round; }
  .use details[open] .chev{ transform:rotate(180deg); background:rgba(255,221,64,.55); }
  .use details[open] .chev svg{ stroke:var(--ink); }
  .hl-y{ color:var(--ink); background:linear-gradient(104deg,rgba(255,221,64,0) .5%,rgba(255,221,64,.9) 2%,rgba(255,221,64,.78) 96%,rgba(255,221,64,0) 99%); padding:.02em .16em; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
  .hl-b{ color:var(--ink); background:linear-gradient(transparent 60%, rgba(116,201,255,.9) 60%, rgba(116,201,255,.9) 92%, transparent 92%); }
  .hl-r{ color:var(--ink); background:linear-gradient(104deg,rgba(255,138,128,0) .5%,rgba(255,138,128,.85) 2%,rgba(255,138,128,.72) 96%,rgba(255,138,128,0) 99%); padding:.02em .16em; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
  .benefits{ margin:0; }
  .benefits ul{ margin:0; padding:0; list-style:none; border-top:1px solid var(--line); }
  .benefits li{ position:relative; padding:11px 0 11px 28px; color:var(--ink); border-bottom:1px solid var(--line); }
  .benefits li::before{ content:"✓"; position:absolute; left:2px; top:11px; color:var(--ink); font-weight:700; }
  .benefits .bfoot{ margin:16px 0 0; font-weight:600; color:var(--ink); }
  .wayhead{ font-family:var(--hand,var(--sans)); font-size:1.32rem; font-weight:700; margin:28px 0 14px; }
  .warn{ margin:9px 0 0; font-size:.93rem; }
  blockquote{ font-family:var(--hand,var(--sans)); margin:6px 0 0; padding:4px 0 4px 24px; border-left:3px solid var(--ink); font-size:clamp(1.22rem,3vw,1.55rem); font-weight:600; line-height:1.4; letter-spacing:0; }
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
  <div class="eq"><span class="hl-y">${t.eq}</span></div>
  <div class="sechead"><h2>${t.pillarsHead}</h2></div>
  <div class="pillars">
    <div class="pillar"><div class="pnum">01</div><h3>${t.p1t}</h3><p>${mark(t.p1d,t.p1k)}</p></div>
    <div class="pillar"><div class="pnum">02</div><h3>${t.p2t}</h3><p>${mark(t.p2d,t.p2k)}</p><p class="warn"><span class="hl-r">${t.warn}</span></p></div>
    <div class="pillar"><div class="pnum">03</div><h3>${t.p3t}</h3><p>${mark(t.p3d,t.p3k)}</p></div>
  </div>
  <div class="sechead"><h2>${t.benefitsHead}</h2></div>
  <div class="benefits">
    <ul>${t.benefits.map(b=>`<li>${b}</li>`).join('')}</ul>
    <p class="bfoot">${t.benefitsFoot}</p>
  </div>
  <div class="sechead"><h2>${t.howHead}</h2></div>
  <h3 class="wayhead">${t.aiWayHead}</h3>
  <div class="use">
    <p>${t.ai.lede}</p>
    <p><b>${t.ai.autoHead}</b></p>
    ${t.ai.auto.map(x=>`<details><summary>${x.n}${CHEV}</summary><div class="acbody"><p>${x.s}</p></div></details>`).join('\n    ')}
    <p><b>${t.ai.manualHead}</b></p>
    ${t.ai.manual.map(x=>`<details><summary>${x.n}${CHEV}</summary><div class="acbody"><p>${x.s}</p></div></details>`).join('\n    ')}
    <p><a href="https://github.com/nontravis/personal-finance-whitepaper#-how-to-use-it" target="_blank" rel="noopener">${t.ai.repo}</a></p>
    <p><small>${t.ai.note}</small></p>
  </div>
  <h3 class="wayhead">${t.physWayHead}</h3>
  <ul class="dl">
${readlist}
  </ul>
  <div class="use">
    <p><b>${t.use1b}</b> ${t.use1t}</p>
    <p><b>${t.use2b}</b> ${t.use2t}</p>
  </div>
  <div class="sechead"><h2>${t.principleHead}</h2></div>
  <blockquote><span class="hl-y">${t.quote}</span><small>${t.quoteSub}</small></blockquote>
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
