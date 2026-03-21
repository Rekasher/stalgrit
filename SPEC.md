# Спецификация проекта: Stalgrit Website

## 1. Общая информация

| Параметр | Значение |
|---|---|
| Компания | ООО «Стальгрит» |
| Тип сайта | Корпоративный сайт-визитка |
| Домен | https://stalgrit.by |
| Локация | г. Речица, Гомельская обл., Беларусь |
| Контакты | info@stalgrit.by · +375 (2340) 6-20-00 |

**Цель сайта** — представить компанию как надёжного производителя гвоздей и метизов, генерировать оптовые заявки через страницу контактов.

---

## 2. Технический стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 15 (App Router) |
| Язык | TypeScript |
| Стили | Tailwind CSS 4 |
| Анимации | Framer Motion |
| UI-компоненты | Shadcn UI (Radix UI под капотом) |
| Иконки | Lucide React |
| Деплой | — (не задан) |

### Ключевые файлы конфигурации

```
next.config.ts       — конфиг Next.js
tailwind.config.ts   — конфиг Tailwind (если есть, иначе — через globals.css @theme)
tsconfig.json        — TypeScript с path alias @/ → src/
```

---

## 3. Структура проекта

```
src/
├── app/
│   ├── layout.tsx              — Root Layout: Header, SEO metadata, JSON-LD
│   ├── globals.css             — Глобальные стили, CSS-переменные темы, animate-marquee
│   ├── page.tsx                — Главная страница (/)
│   ├── about-us/
│   │   ├── layout.tsx          — SEO для /about-us
│   │   └── page.tsx            — Страница «О компании»
│   └── contacts/
│       ├── layout.tsx          — SEO для /contacts
│       └── page.tsx            — Страница «Контакты»
├── components/
│   ├── Header/
│   │   └── Header.tsx          — Фиксированный glassmorphism-хедер
│   ├── Carousel/
│   │   └── Carousel.tsx        — 3D-карусель сотрудников
│   ├── EmployeeCard/
│   │   └── EmployeeCard.tsx    — Карточка «прибита на доску», nail-pin, spring-rotate
│   ├── NailDivider.tsx          — NailSVG + NailDivider (экспортируются отдельно)
│   └── ui/                     — Shadcn-компоненты (Button, Card, …)
└── lib/
    ├── main-mock-data.ts        — Контент главной (Hero, Advantages, Products)
    ├── about-us-mock-data.ts    — Контент О компании (Info, Achievements, Production, Certificates)
    ├── employee-mock-data.ts    — Данные сотрудников (фото, должность, контакты)
    └── utils.ts                 — cn() helper (clsx + tailwind-merge)
```

---

## 4. Страницы

### 4.1 Главная (`/`)

**Секции сверху вниз:**

| # | Секция | Описание |
|---|---|---|
| 1 | Hero | min-h-screen, тёмный градиент from-gray-950 to-gray-900, 12 floating nails, emerald radial glow. Staggered анимация: badge → H1 (text-9xl font-black) → subtitle → 2 CTA-кнопки. Scroll-indicator внизу. |
| 2 | Stats | bg-gray-950, py-24. 4 анимированных счётчика (20+ лет, 500+ клиентов, 10 000+ тонн, 100% качество). CountUp при попадании в viewport, easeOut. |
| 3 | Marquee | bg-emerald-600, бегущая строка с продуктами и преимуществами. CSS animate-marquee, 2 дублированных блока для бесшовного loop. |
| 4 | Advantages | Белый фон, py-32. 4 карточки (Factory / ShieldCheck / TrendingDown / Truck). whileInView stagger, hover lift + emerald border. |
| 5 | Products | bg-gray-50, py-32. 4 карточки в сетке 2x2, иконки в emerald-кружке. |
| 6 | CTA | bg-gray-950, py-32. Крупный заголовок, кнопка → /contacts. |

**Данные:** берутся из `src/lib/main-mock-data.ts` (enum `CONTENT`, `ADVANTAGES`, `PRODUCTS`).

---

### 4.2 О компании (`/about-us`)

**Секции:**

| # | Секция | Описание |
|---|---|---|
| 1 | **Hero** | Название и описание компании, миссия. `text-6xl font-extrabold`. |
| 2 | **Достижения** | 3 карточки с emerald-градиентом. Данные: `Achievements[]`. |
| 3 | **Производство** | 3 карточки (белые, glassmorphism-lite). Данные: `ProductionInfo[]`. Оборудование: ENKOTEC, WAFIOS, VITARI, ZEUS, EVG, BILWINCO. |
| 4 | **Сертификаты** | 4 карточки 2×4. Данные: `Certificates[]`. |
| 5 | **Сотрудники** | 3D-карусель `<Carousel3D />`. |

Все секции используют `whileInView` (не `animate`) — анимация срабатывает при скролле, `once: true`.

---

### 4.3 Контакты (`/contacts`)

**Секции:**

| # | Секция | Описание |
|---|---|---|
| 1 | **Hero** | Заголовок + подзаголовок страницы. |
| 2 | **Команда** | Грид карточек `<EmployeeCard />` — 3 колонки на десктопе. |
| 3 | **Адрес** | Юридический адрес, телефоны, email. |

**Реквизиты компании:**
```
ООО «Стальгрит»
247500, Республика Беларусь, Гомельская область, г. Речица
проезд Коммунальный, 12
Приёмная: +375 (2340) 6-20-00, +375 (2340) 6-40-00
Email: info@stalgrit.by
```

---

## 5. Компоненты

### 5.0 NailDivider (`src/components/NailDivider.tsx`)

Экспортирует два элемента:

**`NailSVG`** — переиспользуемый SVG гвоздя (10×42px): шляпка, стержень, острие. Принимает `className`.

**`NailDivider`** — строка из N гвоздей, которые по очереди падают сверху spring-bounce при попадании в viewport. Используется перед каждым заголовком секции на страницах About Us и Contacts.

```
Props: count (default 6), className
Animation: y: -55 → 0, stiffness: 700, damping: 20, delay: i * 0.055s
```

Floating nails в hero-секциях — отдельный массив с фиксированными позициями (`left`, `top`, угол поворота), бесконечная анимация `y ±18px + opacity pulse`.

---

### 5.1 Header (`src/components/Header/Header.tsx`)

- `position: fixed`, `z-50`
- **Прозрачный** на верхней позиции скролла (`window.scrollY <= 20`)
- **Glassmorphism** (`bg-white/80 backdrop-blur-xl border-b`) при скролле > 20px
- Логотип: изумрудный квадрат + текст "Стальгрит" (цвет адаптируется)
- Навигация: «О нас» → `/about-us`, «Контакты» → `/contacts`, CTA-pill «Заказать» → `/contacts`
- Мобильный (<640px): кнопка-гамбургер (Lucide `Menu`/`X`), slide-down меню через `AnimatePresence`

### 5.2 Carousel3D (`src/components/Carousel/Carousel.tsx`)

- CSS 3D-карусель на `rotateY` + `translateZ`
- Радиус цилиндра: `400px`, перспектива: `1200px`
- Каждая карточка: `w-64 h-80`, центрирована через `left/top: 50%` + отрицательные margin (`-128px / -160px`)
- Rotating stage: `translate(-50%, -50%) translateZ(-400px) rotateY(Xdeg)` → вращается вокруг центра
- **Drag**: `mousedown` → `mousemove` → `mouseup` (слушатели на `window`)
- **Автопрокрутка**: интервал 2500ms, snap к ближайшей карточке
- Snap-логика: нормализация угла, округление до ближайшего `anglePerItem`

### 5.3 EmployeeCard (`src/components/EmployeeCard/EmployeeCard.tsx`)

Карточка сотрудника в стиле «прибита на доску».

**Props:** `src`, `alt`, `name`, `job`, `phone`, `email`, `index` (обязателен для rotation/delay).

**Визуал:**
- Nail-pin сверху по центру: серый градиентный кружок + вертикальная линия. Анимируется отдельно — появляется с `scale(0)` с задержкой.
- Карточка слегка наклонена (разный угол по `index % 6`): `[-2.2, 1.8, -1.4, 2.4, -1.8, 1.2]` градусов.
- Фото с градиентным overlay снизу.
- Телефон и email — кликабельные `<a href="tel:">` / `<a href="mailto:">` с иконками Lucide.

**Анимация входа:** падает сверху с поворотом (`y: -70, rotate: rot*2.5` → `y: 0, rotate: rot`), spring stiffness 260, damping 18, delay по колонке (`index % 3 * 0.13`).

**Hover:** `rotate: 0, scale: 1.04` — карточка «выравнивается».

**Используется:** `/contacts` с передачей `index={i}`.

---

## 6. SEO

### Root Layout Metadata

```
title:       { template: '%s | Стальгрит', default: 'Стальгрит — гвозди от производителя' }
description: "ООО «Стальгрит» — белорусский производитель..."
keywords:    ['гвозди', 'купить гвозди оптом', 'гвозди от производителя', ...]
openGraph:   { type: 'website', locale: 'ru_RU', url: 'https://stalgrit.by', ... }
twitter:     { card: 'summary_large_image' }
robots:      { index: true, follow: true }
alternates:  { canonical: 'https://stalgrit.by' }
```

### JSON-LD (Organization schema)

Вставляется в `<body>` через `<script type="application/ld+json">`:

```json
{
  "@type": "Organization",
  "name": "ООО «Стальгрит»",
  "url": "https://stalgrit.by",
  "foundingDate": "2003",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Речица",
    "addressCountry": "BY"
  }
}
```

### Страничные метаданные

| Страница | Title | Description |
|---|---|---|
| `/` | Стальгрит — гвозди от производителя | Полное описание компании |
| `/about-us` | О компании \| Стальгрит | 20+ лет на рынке... |
| `/contacts` | Контакты \| Стальгрит | Адрес, телефон, email для заказов |

---

## 7. Дизайн-система

### Цветовая палитра

| Цвет | Использование |
|---|---|
| `emerald-500 / emerald-600` | Акценты, кнопки, иконки, лого |
| `gray-950 / gray-900` | Hero-секция, CTA-секция |
| `gray-50` | Products-секция фон |
| `white` | Advantages-секция, карточки |
| `gray-400 / gray-500` | Описательный текст |

### Типографика

| Элемент | Классы |
|---|---|
| Hero H1 | `text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight` |
| Section H2 | `text-4xl sm:text-5xl font-bold tracking-tight` |
| Card title | `text-lg sm:text-xl font-semibold` |
| Body / desc | `text-sm leading-relaxed text-gray-500` |

### Анимации (Framer Motion)

Все секции кроме Hero используют `whileInView` + `viewport={{ once: true }}`.

| Паттерн | Где используется | Параметры |
|---|---|---|
| fadeUp stagger | Hero (initial/animate), Advantages, Products, CTA | opacity 0→1, y 40→0, duration 0.6s, delay i*0.1 |
| spring drop | NailDivider, EmployeeCard | y -55→0 / -70→0, stiffness 260–700, damping 18–20 |
| stamp | Achievement cards | scale 1.12→1, rotate ±3→0, stiffness 380, damping 22 |
| alternating slide | Production cards | x ±80→0, stiffness 300, damping 26 |
| pop bounce | Certificate cards | scale 0.5→1, y 30→0, stiffness 500, damping 22 |
| floating loop | Floating nails (все dark-hero) | y ±18, opacity 0.07↔0.14, repeat Infinity, easeInOut |
| countUp | StatCounter (главная) | easeOut cubic, duration 1800ms, запуск при isInView |
| nail pin | EmployeeCard pin | scale 0→1, stiffness 600, damping 18 |

**Hover-эффекты:**
- Карточки преимуществ: `y: -4`
- Карточки достижений: `scale: 1.04`
- EmployeeCard: `rotate: 0, scale: 1.04` (выравнивание)

---

## 8. Данные (mock)

Все контентные данные хранятся в `src/lib/` и должны быть заменены на реальный источник (CMS / API) при необходимости.

### `main-mock-data.ts`
- `CONTENT` enum: тексты Hero, Advantages, Products, CTA
- `ADVANTAGES` enum: 4 описания преимуществ
- `PRODUCTS` enum: 4 названия продуктов

### `about-us-mock-data.ts`
- `AboutUsInfo`: заголовок, описание, миссия
- `Achievements[]`: 3 достижения
- `ProductionInfo[]`: 3 производственных блока
- `Certificates[]`: 4 сертификата с годами

### `employee-mock-data.ts`
6 сотрудников: имя, должность, телефон, email, фото `/public/images/staff{1-6}.jpg`

---

## 9. Чеклист перед запуском в продакшн

- [ ] Заменить mock-данные на реальный CMS или API
- [ ] Добавить реальные фото сотрудников в `/public/images/`
- [ ] Добавить OG-изображение `/public/og-image.jpg` (1200×630)
- [ ] Настроить `next.config.ts` — домены для `next/image` (если фото с внешних источников)
- [ ] Добавить форму обратной связи на `/contacts` (сейчас только статические данные)
- [ ] Подключить аналитику (Yandex.Metrica / GA4)
- [ ] Настроить деплой (Vercel / собственный сервер)
- [ ] Проверить Lighthouse: Performance, SEO, Accessibility
- [ ] Удалить или скрыть страницу `/test`
