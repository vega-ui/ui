---
"@vega-ui/tokens-core": minor
"@vega-ui/theme-core": minor
"@vega-ui/react": minor
---

---
@vega-ui/tokens-core — minor

Полная переработка цветовой палитры:
- Цвета переведены с color-mix(in oklch, var(--color-red) X%, white/black) на прямые oklch() значения — более предсказуемое перцептивное пространство
- Убраны промежуточные ступени (50, 150, 250, 350, 450, 550, 650, 750, 850, 950) — шкала упрощена до 11 ступеней: 0–100–200–…–1000

---
@vega-ui/theme-core — minor

Полная переработка семантических токенов в light.css / dark.css:
- Добавлены токены заливок: --fills-primary/secondary/tertiary/quaternary с состояниями hover/active
- Добавлены токены лейблов: --label-primary/secondary/tertiary/quaternary
- Добавлены токены поверхностей: --surface-ultrathin/thin/regular/thick/ultrathick
- Добавлены токены разделителей: --separator-opaque/non-opaque
- Добавлены токены бордеров: --border-color с состояниями hover/active
- Добавлены токены отключённых состояний: --disable-*
- Переименовано: --text-inverce-color → --text-color-inverce

 ---
@vega-ui/react — minor

- Все компоненты переведены на новые семантические токены из темы
- Удалены прямые обращения к цветовым токенам в компонентах, заменены на семантические переменные