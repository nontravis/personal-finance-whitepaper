<div align="center">

🌐 **ภาษา** &nbsp;|&nbsp;
**[🇹🇭 ไทย](README-th.md)** ·
[🇬🇧 English](../README.md) ·
[🇪🇸 Español](README-es.md) ·
[🇮🇩 Indonesia](README-id.md) ·
[🇨🇳 简体中文](README-zh.md) ·
[🇯🇵 日本語](README-ja.md)

<br>

# รากฐานระบบการเงินส่วนบุคคล 3 เสา

**ไวต์เปเปอร์สั้น ๆ ที่สอนวิธีสร้างการเงินส่วนบุคคลด้วย “ระบบ 3 เสา” ที่เรียบง่าย ใช้ได้ทั้งชีวิต**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](../LICENSE)
![Languages](https://img.shields.io/badge/ภาษา-6-orange.svg)
![Pages](https://img.shields.io/badge/ความยาว-2%20หน้า-green.svg)

</div>

---

## ⭐ สรุปใน 10 วินาที

การเงินที่มั่นคงไม่ได้เกิดจากกลยุทธ์ซับซ้อน แต่เกิดจาก **วินัย** + ระบบที่เรียบง่าย ทำซ้ำได้นาน ๆ ทุกอย่างเริ่มจากสมการเดียว:

<div align="center">

### รายรับ − รายจ่าย = ทุนสู่อิสรภาพ

</div>

แล้วกระจาย “ทุนสู่อิสรภาพ” เข้า **3 เสา** ที่ทำงานร่วมกัน:

| เสา | คือ | ทำหน้าที่ |
|---|---|---|
| 💵 **กระแสเงินสด** (Cashflow) | รู้ว่าเงินเข้า-ออกเท่าไร | รากฐาน รู้ “ทุน” ที่แท้จริง |
| 📈 **การลงทุน** (Investment) | ให้เงินทำงานแทนเรา | รุก สร้างผลตอบแทนทบต้น |
| 🛡️ **การออมรักษามูลค่า** (Savings) | ถือสินทรัพย์ที่รักษามูลค่า | ตั้งรับ สู้เงินเฟ้อ ลดความเสี่ยง |

---

## 🎯 ทำไมถึงมีเอกสารนี้

- เป็น **หลักการตั้งต้น** ให้คุณออกแบบการเงินของตัวเองได้
- ให้ผู้อ่านมี **mindset การเงินที่ใช้ได้ตลอดชีวิต** — ไม่ใช่เทคนิคที่ล้าสมัยตามยุค
- กระชับ จบใน 2 หน้า อ่านรอบเดียวเข้าใจ เอาไปใช้ได้จริง

## 👤 เหมาะกับใคร

- คนที่ **เริ่มต้นจากศูนย์** อยากมีระบบการเงินสักที
- คนที่เก็บเงินไม่อยู่ ไม่รู้เงินหายไปไหน
- คนที่อยากส่งต่อแนวคิดการเงินดี ๆ ให้คนรอบตัว

---

## 🤖 นำเฟรมเวิร์กไปใช้กับ AI ของคุณ

ไวต์เปเปอร์นี้มาพร้อมกับ **AI skill** — เลนส์ความคิดที่ทำให้ AI ที่มีความสามารถสูงให้คำแนะนำผ่านระบบ 3 เสา (`รายรับ − รายจ่าย = ทุนสู่อิสรภาพ` กระจายเข้า Cashflow / Investment / Savings โดยเน้นวินัยมากกว่ากลยุทธ์) หนึ่งแหล่ง สองสไตล์การติดตั้ง: **Auto** (คำสั่งเดียว สำหรับ Claude Code และ CLI agent) หรือ **Manual** (วางไฟล์เดียว สำหรับ chatbot ทุกชนิด)

### ⚡ Auto install (คำสั่งเดียว)

<details><summary><b>Claude Code — plugin (recommended)</b></summary>

ติดตั้ง:

```
/plugin marketplace add nontravis/personal-finance-whitepaper
/plugin install three-pillar-finance@nontravis
```

อัปเดตเป็นเวอร์ชันล่าสุด:

```
/plugin marketplace update nontravis
/reload-plugins
```

plugin นี้ไม่ได้ระบุเวอร์ชัน ดังนั้นทุก push ไปยัง repo นี้จะถูกเสนอเป็นเวอร์ชันล่าสุดเสมอ

</details>

<details><summary><b>Claude Code — degit (ไม่ใช้ marketplace)</b></summary>

ติดตั้ง:

```
npx degit nontravis/personal-finance-whitepaper/skill ~/.claude/skills/three-pillar-finance
```

อัปเดตเป็นเวอร์ชันล่าสุด — รันซ้ำพร้อม `--force`:

```
npx degit nontravis/personal-finance-whitepaper/skill ~/.claude/skills/three-pillar-finance --force
```

</details>

<details><summary><b>CLI agents (Gemini CLI, Copilot CLI)</b></summary>

วาง skill ลงใน adapter directory ของ agent หรือใน `AGENTS.md`:

```
npx degit nontravis/personal-finance-whitepaper/skill ./.gemini/skills/three-pillar-finance
```

อัปเดต: รันซ้ำพร้อม `--force`

</details>

### ✋ Manual install (คัดลอก-วาง)

สำหรับ chatbot ที่อ่านไฟล์ไม่ได้ ให้วางไฟล์แบนเดียว
[`three-pillar-lens.md`](../three-pillar-lens.md) ลงไปตรง ๆ หากต้องการอัปเดตภายหลัง ให้คัดลอกใหม่แล้วแทนที่บล็อกเดิม

<details><summary><b>claude.ai (Project)</b></summary>

1. เปิด [`three-pillar-lens.md`](../three-pillar-lens.md) แล้วคัดลอกทั้งไฟล์
2. สร้างหรือเปิด Project แล้ววางลงใน custom instructions ของ Project

</details>

<details><summary><b>ChatGPT</b></summary>

1. เปิด [`three-pillar-lens.md`](../three-pillar-lens.md) แล้วคัดลอกทั้งไฟล์
2. วางลงใน Settings ▸ Personalization ▸ Custom Instructions, instructions ของ Project, หรือ knowledge ของ custom GPT

</details>

<details><summary><b>Gemini</b></summary>

1. เปิด [`three-pillar-lens.md`](../three-pillar-lens.md) แล้วคัดลอกทั้งไฟล์
2. วางลงใน instructions ของ Gem หรือใน Saved Info

</details>

<details><summary><b>Any API / app</b></summary>

เพิ่ม [`three-pillar-lens.md`](../three-pillar-lens.md) ไว้ต้น system prompt

</details>

> เฟรมเวิร์กเพื่อการศึกษา ไม่ใช่คำแนะนำทางการเงินส่วนบุคคล ไม่มีการระบุหลักทรัพย์เฉพาะเจาะจง

---

## 📖 อ่านเลย

เลือกภาษาของคุณ — แต่ละไฟล์เป็น PDF พร้อมปริ้นต์:

| ภาษา | ดาวน์โหลด |
|---|---|
| 🇹🇭 ไทย | [whitepaper-th.pdf](../whitepaper-th.pdf) |
| 🇬🇧 English | [whitepaper-en.pdf](../whitepaper-en.pdf) |
| 🇪🇸 Español | [whitepaper-es.pdf](../whitepaper-es.pdf) |
| 🇮🇩 Indonesia | [whitepaper-id.pdf](../whitepaper-id.pdf) |
| 🇨🇳 简体中文 | [whitepaper-zh.pdf](../whitepaper-zh.pdf) |
| 🇯🇵 日本語 | [whitepaper-ja.pdf](../whitepaper-ja.pdf) |

---

## 🖼️ ตัวอย่างหน้าตา

<div align="center">
<img src="assets/cover-th-page1.png" width="46%" alt="หน้า 1" />
&nbsp;&nbsp;
<img src="assets/cover-th-page2.png" width="46%" alt="หน้า 2" />
</div>

---

## 🚀 วิธีใช้งาน

**1. ปริ้นต์ไปแปะไว้ที่อ่านทุกวัน** 🖨️
ดาวน์โหลด PDF → สั่งปริ้นต์ → แปะไว้ข้างโต๊ะทำงาน หน้ากระจก หรือตู้เย็น
การเงินเปลี่ยนได้ด้วย “การเห็นซ้ำ ๆ” จนกลายเป็นนิสัย

**2. แชร์ mindset ดี ๆ นี้ให้คนที่คุณรัก** ❤️
ส่งลิงก์นี้ให้ครอบครัว เพื่อน หรือคนที่กำลังเริ่มต้น
ของขวัญที่ดีที่สุดอย่างหนึ่งคือ “ระบบคิด” ที่ติดตัวเขาไปตลอดชีวิต

---

## 💡 หลักการเดียวที่ขอให้จำ

> **“เริ่มต้นด้วยระบบที่เรียบง่าย แล้วทำมันอย่างสม่ำเสมอ”**
> เวลาและความสม่ำเสมอ คือพันธมิตรที่ทรงพลังที่สุดของนักลงทุนทุกคน

---

## ✍️ ผู้เขียน

**นนทวิชช์ ดวงสอดศรี** — [nonthawit.com](https://nonthawit.com)
เผยแพร่เพื่อประโยชน์สาธารณะ

---

## 📈 Star History

ถ้าเอกสารนี้มีประโยชน์ ฝากกด ⭐ เป็นกำลังใจด้วยนะครับ

[![Star History Chart](https://api.star-history.com/svg?repos=nontravis/personal-finance-whitepaper&type=Date)](https://star-history.com/#nontravis/personal-finance-whitepaper&Date)

---

## 📜 ลิขสิทธิ์

เนื้อหาไวต์เปเปอร์ (ข้อความ ซอร์ส LaTeX และ PDF) เผยแพร่ภายใต้
**[Creative Commons Attribution 4.0 (CC BY 4.0)](../LICENSE)** — แชร์/ดัดแปลง/ใช้เชิงพาณิชย์ได้ เพียงให้เครดิตผู้เขียน

ฟอนต์ที่แนบมาใน `latex/fonts/` เป็นของบุคคลที่สาม มีสัญญาอนุญาตแยกต่างหาก (SIL OFL, GUST, SIPA) —
ดู [`latex/fonts/LICENSES/NOTICE.md`](../latex/fonts/LICENSES/NOTICE.md)
