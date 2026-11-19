import fs from 'node:fs';
import path from 'node:path';
import { getComponentPage, getComponents, getGuideSource } from '../lib/content.ts';
import { getGuideFile, getGuides } from '../lib/guides.ts';
import { getDictionary, LOCALES } from '../lib/i18n.ts';
import { getToc } from '../lib/toc.ts';

const outputDir = path.join(process.cwd(), 'generated');

const KEYWORDS: Record<typeof LOCALES[number], Record<string, string>> = {
  en: {
    'alert': 'banner callout notice',
    'badge': 'tag chip label',
    'checkbox': 'check tick',
    'context-menu': 'right click long press menu actions',
    'dialog': 'modal window',
    'drawer': 'side panel',
    'grid': 'table grid spreadsheet picker',
    'indexed-snap-scroller': 'carousel slider',
    'menu': 'dropdown menu button actions more options',
    'page-control': 'dots pager',
    'pin-field': 'otp code verification',
    'popover': 'popup dropdown',
    'progress': 'loading bar',
    'radio': 'radio button option group',
    'segmented-control': 'tabs toggle group',
    'select': 'dropdown picker',
    'sheet': 'bottom sheet',
    'slider': 'range',
    'snap-scroller': 'carousel',
    'spinner': 'loader loading',
    'tabs': 'tab panels tablist',
    'switch': 'toggle',
    'text-area': 'textarea multiline',
    'text-field': 'input',
    'toggle': 'toggle pressed button aria-pressed bold mute',
    'toggle-group': 'toggle group button group segmented alignment view switcher filter',
    'toolbar': 'toolbar formatting bar tools buttons roving tabindex',
    'tooltip': 'hint',
  },
  ru: {
    'accordion': 'аккордеон раскрывающиеся секции',
    'alert': 'уведомление предупреждение',
    'avatar': 'аватар',
    'avatar-stack': 'группа аватаров',
    'badge': 'бейдж значок метка',
    'button': 'кнопка',
    'button-base': 'базовая кнопка',
    'calendar': 'календарь дата',
    'card': 'карточка',
    'checkbox': 'флажок чекбокс',
    'checkbox-card': 'карточка с флажком',
    'code': 'код',
    'collapsible': 'раскрывающийся блок',
    'combobox': 'поле с подсказками автодополнение поиск',
    'context-menu': 'контекстное меню правый щелчок долгое нажатие действия',
    'date-field': 'поле даты дата',
    'date-range-field': 'диапазон дат период',
    'date-time-field': 'дата и время',
    'day-picker': 'выбор дня',
    'dialog': 'диалог модальное окно',
    'drawer': 'выдвижная панель',
    'grid': 'таблица данных сетка с выбором пикер',
    'fieldset': 'группа полей',
    'heading': 'заголовок',
    'helper-text': 'поясняющий текст подсказка',
    'icon': 'иконка значок',
    'indexed-snap-scroller': 'карусель',
    'label': 'подпись',
    'link': 'ссылка',
    'listbox': 'список выбора',
    'menu': 'меню действия выпадающее кнопка меню',
    'meter': 'шкала',
    'meter-stack': 'составная шкала',
    'month-picker': 'выбор месяца',
    'number-field': 'числовое поле число',
    'option': 'вариант опция',
    'page-control': 'индикатор страниц точки',
    'pagination': 'пагинация страницы',
    'password-field': 'поле пароля пароль',
    'phone-field': 'поле телефона телефон',
    'pin-field': 'пин-код код подтверждения',
    'popover': 'всплывающее окно поповер',
    'progress': 'прогресс индикатор выполнения',
    'radio': 'радиокнопка',
    'segmented-control': 'сегментированный переключатель',
    'tabs': 'вкладки табы',
    'select': 'выпадающий список селект',
    'separator': 'разделитель',
    'sheet': 'шторка нижняя панель',
    'slider': 'слайдер ползунок',
    'slot': 'слот',
    'snap-scroller': 'карусель прокрутка',
    'spinner': 'спиннер загрузка',
    'switch': 'переключатель тумблер',
    'table': 'таблица',
    'text': 'текст',
    'text-area': 'многострочное поле',
    'text-field': 'текстовое поле ввод',
    'time-field': 'поле времени время',
    'toggle': 'кнопка-переключатель нажатая кнопка залипающая',
    'toggle-group': 'группа кнопок-переключателей выравнивание вид фильтр',
    'toolbar': 'панель инструментов тулбар форматирование',
    'tooltip': 'подсказка тултип',
    'visually-hidden': 'скрытый текст',
    'year-picker': 'выбор года',
  },
};

const STRUCTURAL = new Set([
  'Summary', 'Overview', 'Basic', 'Edge', 'Layout/Overlay', 'Controlled/Stateful', 'Form/Integration', 'Error', 'Disabled', 'Child Parts', 'Root',
  'Кратко', 'Обзор', 'Базовый', 'Пограничный случай', 'Раскладка/оверлей', 'Контролируемый/с состоянием', 'Форма/интеграция', 'Ошибка', 'Отключённый', 'Дочерние части', 'Корень',
]);

const isPartName = (title: string) => /^[A-Za-z]\w*$/.test(title);

interface Entry { group: string, title: string, context: string, href: string, summary?: string, keywords?: string }

const buildIndex = (locale: typeof LOCALES[number]) => {
  const t = getDictionary(locale);
  const pageTitles = new Set(Object.values(t.pages));
  const entries: Entry[] = [];

  for (const component of getComponents(locale)) {
    const category = t.categories[component.category] ?? component.category;
    const base = `/components/${component.slug}/`;
    const headings = new Map<string, { page: string, href: string }[]>();

    entries.push({ group: 'components', title: component.title, context: category, href: base, summary: component.summary, keywords: KEYWORDS[locale][component.slug] });

    for (const page of component.pages) {
      const href = page === 'index' ? base : `${base}${page}/`;

      if (page !== 'index') entries.push({ group: 'sections', title: t.pages[page], context: `${component.title} · ${category}`, href });

      for (const heading of getToc(getComponentPage(component.slug, page, locale).source, getComponentPage(component.slug, page, 'en').source)) {
        if (heading.title === component.title) continue;
        if (STRUCTURAL.has(heading.title) || pageTitles.has(heading.title)) continue;

        const targets = headings.get(heading.title) ?? [];
        targets.push({ page, href: `${href}#${heading.id}` });
        headings.set(heading.title, targets);
      }
    }

    for (const [title, targets] of headings) {
      const primary = (isPartName(title) && targets.find((target) => target.page === 'api')) || targets[0];
      const pages = new Set([primary.page, ...targets.map((target) => target.page)]);

      entries.push({ group: 'sections', title, context: [component.title, ...[...pages].map((page) => t.pages[page])].join(' · '), href: primary.href });
    }
  }

  for (const guide of getGuides(locale)) {
    const titles = new Set([guide.title]);
    entries.push({ group: 'guides', title: guide.title, context: t.nav.docs, href: guide.href, summary: guide.summary });

    for (const heading of getToc(getGuideSource(guide.file), getGuideSource(getGuideFile(guide.slug, 'en')))) {
      if (titles.has(heading.title) || STRUCTURAL.has(heading.title)) continue;

      titles.add(heading.title);
      entries.push({ group: 'guides', title: heading.title, context: guide.title, href: `${guide.href}#${heading.id}` });
    }
  }

  entries.push({ group: 'guides', title: t.components.title, context: t.nav.docs, href: '/components/', summary: t.components.description });
  entries.push({ group: 'guides', title: t.search.changelog, context: t.nav.docs, href: '/changelog/', summary: t.search.changelogSummary });

  return entries;
};

fs.mkdirSync(outputDir, { recursive: true });

for (const locale of LOCALES) {
  const entries = buildIndex(locale);
  fs.writeFileSync(path.join(outputDir, `search.${locale}.json`), JSON.stringify(entries));
  console.log(`Generated ${entries.length} search entries for ${locale}.`);
}
