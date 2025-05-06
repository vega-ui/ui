import type { Meta, StoryObj } from '@storybook/react';

import { PhoneSelectField, PhoneFieldCountry } from './PhoneSelectField.tsx';
import { Label } from '../Label';

const options: PhoneFieldCountry[] = [
  {
    'iso': 'AD',
    'label': 'Андорра (+376)'
  },
  {
    'iso': 'AE',
    'label': 'ОАЭ (+971)'
  },
  {
    'iso': 'AF',
    'label': 'Афганистан (+93)'
  },
  {
    'iso': 'AG',
    'label': 'Антигуа и Барбуда (+1 268)'
  },
  {
    'iso': 'AI',
    'label': 'Ангилья (+1 264)'
  },
  {
    'iso': 'AL',
    'label': 'Албания (+355)'
  },
  {
    'iso': 'AM',
    'label': 'Армения (+374)'
  },
  {
    'iso': 'AO',
    'label': 'Ангола (+244)'
  },
  {
    'iso': 'AR',
    'label': 'Аргентина (+54)'
  },
  {
    'iso': 'AS',
    'label': 'Американское Самоа (+1 684)'
  },
  {
    'iso': 'AT',
    'label': 'Австрия (+43)'
  },
  {
    'iso': 'AU',
    'label': 'Австралия (+61)'
  },
  {
    'iso': 'AW',
    'label': 'Аруба (+297)'
  },
  {
    'iso': 'AX',
    'label': 'Аландские острова (+358)'
  },
  {
    'iso': 'AZ',
    'label': 'Азербайджан (+994)'
  },
  {
    'iso': 'BA',
    'label': 'Босния и Герцеговина (+387)'
  },
  {
    'iso': 'BB',
    'label': 'Барбадос (+1 246)'
  },
  {
    'iso': 'BD',
    'label': 'Бангладеш (+880)'
  },
  {
    'iso': 'BE',
    'label': 'Бельгия (+32)'
  },
  {
    'iso': 'BF',
    'label': 'Буркина-Фасо (+226)'
  },
  {
    'iso': 'BG',
    'label': 'Болгария (+359)'
  },
  {
    'iso': 'BH',
    'label': 'Бахрейн (+973)'
  },
  {
    'iso': 'BI',
    'label': 'Бурунди (+257)'
  },
  {
    'iso': 'BJ',
    'label': 'Бенин (+229)'
  },
  {
    'iso': 'BL',
    'label': 'Сен-Бартельми (+590)'
  },
  {
    'iso': 'BM',
    'label': 'Бермуды (+1 441)'
  },
  {
    'iso': 'BN',
    'label': 'Бруней (+673)'
  },
  {
    'iso': 'BO',
    'label': 'Боливия (+591)'
  },
  {
    'iso': 'BQ',
    'label': 'Карибская Нидерланды (+599)'
  },
  {
    'iso': 'BR',
    'label': 'Бразилия (+55)'
  },
  {
    'iso': 'BS',
    'label': 'Багамы (+1 242)'
  },
  {
    'iso': 'BT',
    'label': 'Бутан (+975)'
  },
  {
    'iso': 'BW',
    'label': 'Ботсвана (+267)'
  },
  {
    'iso': 'BY',
    'label': 'Беларусь (+375)'
  },
  {
    'iso': 'BZ',
    'label': 'Белиз (+501)'
  },
  {
    'iso': 'CA',
    'label': 'Канада (+1)'
  },
  {
    'iso': 'CC',
    'label': 'Кокосовые острова (+61)'
  },
  {
    'iso': 'CD',
    'label': 'Конго (+243)'
  },
  {
    'iso': 'CF',
    'label': 'Центральноафриканская Республика (+236)'
  },
  {
    'iso': 'CG',
    'label': 'Конго (+242)'
  },
  {
    'iso': 'CH',
    'label': 'Швейцария (+41)'
  },
  {
    'iso': 'CI',
    'label': 'Кот-д\'Ивуар (+225)'
  },
  {
    'iso': 'CK',
    'label': 'Острова Кука (+682)'
  },
  {
    'iso': 'CL',
    'label': 'Чили (+56)'
  },
  {
    'iso': 'CM',
    'label': 'Камерун (+237)'
  },
  {
    'iso': 'CN',
    'label': 'Китай (+86)'
  },
  {
    'iso': 'CO',
    'label': 'Колумбия (+57)'
  },
  {
    'iso': 'CR',
    'label': 'Коста-Рика (+506)'
  },
  {
    'iso': 'CU',
    'label': 'Куба (+53)'
  },
  {
    'iso': 'CV',
    'label': 'Кабо-Верде (+238)'
  },
  {
    'iso': 'CW',
    'label': 'Кюрасао (+599)'
  },
  {
    'iso': 'CX',
    'label': 'Остров Рождества (+61)'
  },
  {
    'iso': 'CY',
    'label': 'Кипр (+357)'
  },
  {
    'iso': 'CZ',
    'label': 'Чехия (+420)'
  },
  {
    'iso': 'DE',
    'label': 'Германия (+49)'
  },
  {
    'iso': 'DJ',
    'label': 'Джибути (+253)'
  },
  {
    'iso': 'DK',
    'label': 'Дания (+45)'
  },
  {
    'iso': 'DM',
    'label': 'Доминика (+1 767)'
  },
  {
    'iso': 'DO',
    'label': 'Доминиканская Республика (+1 809)'
  },
  {
    'iso': 'DZ',
    'label': 'Алжир (+213)'
  },
  {
    'iso': 'EC',
    'label': 'Эквадор (+593)'
  },
  {
    'iso': 'EE',
    'label': 'Эстония (+372)'
  },
  {
    'iso': 'EG',
    'label': 'Египет (+20)'
  },
  {
    'iso': 'EH',
    'label': 'Западная Сахара (+212)'
  },
  {
    'iso': 'ER',
    'label': 'Эритрея (+291)'
  },
  {
    'iso': 'ES',
    'label': 'Испания (+34)'
  },
  {
    'iso': 'ET',
    'label': 'Эфиопия (+251)'
  },
  {
    'iso': 'FI',
    'label': 'Финляндия (+358)'
  },
  {
    'iso': 'FJ',
    'label': 'Фиджи (+679)'
  },
  {
    'iso': 'FK',
    'label': 'Фолклендские острова (+500)'
  },
  {
    'iso': 'FM',
    'label': 'Федеративные Штаты Микронезии (+691)'
  },
  {
    'iso': 'FO',
    'label': 'Фарерские острова (+298)'
  },
  {
    'iso': 'FR',
    'label': 'Франция (+33)'
  },
  {
    'iso': 'GA',
    'label': 'Габон (+241)'
  },
  {
    'iso': 'GB',
    'label': 'Великобритания (+44)'
  },
  {
    'iso': 'GD',
    'label': 'Гренада (+1 473)'
  },
  {
    'iso': 'GE',
    'label': 'Грузия (+995)'
  },
  {
    'iso': 'GH',
    'label': 'Гана (+233)'
  },
  {
    'iso': 'GI',
    'label': 'Гибралтар (+350)'
  },
  {
    'iso': 'GL',
    'label': 'Гренландия (+299)'
  },
  {
    'iso': 'GM',
    'label': 'Гамбия (+220)'
  },
  {
    'iso': 'GN',
    'label': 'Гвинея (+224)'
  },
  {
    'iso': 'GP',
    'label': 'Гваделупа (+590)'
  },
  {
    'iso': 'GQ',
    'label': 'Экваториальная Гвинея (+240)'
  },
  {
    'iso': 'GR',
    'label': 'Греция (+30)'
  },
  {
    'iso': 'GT',
    'label': 'Гватемала (+502)'
  },
  {
    'iso': 'GU',
    'label': 'Гуам (+1 671)'
  },
  {
    'iso': 'GW',
    'label': 'Гвинея-Бисау (+245)'
  },
  {
    'iso': 'GY',
    'label': 'Гайана (+592)'
  },
  {
    'iso': 'HK',
    'label': 'Гонконг (+852)'
  },
  {
    'iso': 'HN',
    'label': 'Гондурас (+504)'
  },
  {
    'iso': 'HR',
    'label': 'Хорватия (+385)'
  },
  {
    'iso': 'HT',
    'label': 'Гаити (+509)'
  },
  {
    'iso': 'HU',
    'label': 'Венгрия (+36)'
  },
  {
    'iso': 'ID',
    'label': 'Индонезия (+62)'
  },
  {
    'iso': 'IE',
    'label': 'Ирландия (+353)'
  },
  {
    'iso': 'IL',
    'label': 'Израиль (+972)'
  },
  {
    'iso': 'IM',
    'label': 'Остров Мэн (+44)'
  },
  {
    'iso': 'IN',
    'label': 'Индия (+91)'
  },
  {
    'iso': 'IO',
    'label': 'Британская территория Индийского океана (+246)'
  },
  {
    'iso': 'IQ',
    'label': 'Ирак (+964)'
  },
  {
    'iso': 'IR',
    'label': 'Иран (+98)'
  },
  {
    'iso': 'IS',
    'label': 'Исландия (+354)'
  },
  {
    'iso': 'IT',
    'label': 'Италия (+39)'
  },
  {
    'iso': 'JE',
    'label': 'Джерси (+44)'
  },
  {
    'iso': 'JM',
    'label': 'Ямайка (+1 876)'
  },
  {
    'iso': 'JO',
    'label': 'Иордания (+962)'
  },
  {
    'iso': 'JP',
    'label': 'Япония (+81)'
  },
  {
    'iso': 'KE',
    'label': 'Кения (+254)'
  },
  {
    'iso': 'KG',
    'label': 'Кыргызстан (+996)'
  },
  {
    'iso': 'KH',
    'label': 'Камбоджа (+855)'
  },
  {
    'iso': 'KI',
    'label': 'Кирибати (+686)'
  },
  {
    'iso': 'KM',
    'label': 'Коморы (+269)'
  },
  {
    'iso': 'KN',
    'label': 'Сент-Китс и Невис (+1 869)'
  },
  {
    'iso': 'KP',
    'label': 'Северная Корея (+850)'
  },
  {
    'iso': 'KR',
    'label': 'Южная Корея (+82)'
  },
  {
    'iso': 'KW',
    'label': 'Кувейт (+965)'
  },
  {
    'iso': 'KY',
    'label': 'Каймановы острова (+1 345)'
  },
  {
    'iso': 'KZ',
    'label': 'Казахстан (+7)'
  },
  {
    'iso': 'LA',
    'label': 'Лаос (+856)'
  },
  {
    'iso': 'LB',
    'label': 'Ливан (+961)'
  },
  {
    'iso': 'LC',
    'label': 'Сент-Люсия (+1 758)'
  },
  {
    'iso': 'LI',
    'label': 'Лихтенштейн (+423)'
  },
  {
    'iso': 'LK',
    'label': 'Шри-Ланка (+94)'
  },
  {
    'iso': 'LR',
    'label': 'Либерия (+231)'
  },
  {
    'iso': 'LS',
    'label': 'Лесото (+266)'
  },
  {
    'iso': 'LT',
    'label': 'Литва (+370)'
  },
  {
    'iso': 'LU',
    'label': 'Люксембург (+352)'
  },
  {
    'iso': 'LV',
    'label': 'Латвия (+371)'
  },
  {
    'iso': 'LY',
    'label': 'Ливия (+218)'
  },
  {
    'iso': 'MA',
    'label': 'Марокко (+212)'
  },
  {
    'iso': 'MC',
    'label': 'Монако (+377)'
  },
  {
    'iso': 'MD',
    'label': 'Молдова (+373)'
  },
  {
    'iso': 'ME',
    'label': 'Черногория (+382)'
  },
  {
    'iso': 'MF',
    'label': 'Сент-Мартен (+590)'
  },
  {
    'iso': 'MG',
    'label': 'Мадагаскар (+261)'
  },
  {
    'iso': 'MH',
    'label': 'Маршалловы острова (+692)'
  },
  {
    'iso': 'MK',
    'label': 'Северная Македония (+389)'
  },
  {
    'iso': 'ML',
    'label': 'Мали (+223)'
  },
  {
    'iso': 'MM',
    'label': 'Мьянма (+95)'
  },
  {
    'iso': 'MN',
    'label': 'Монголия (+976)'
  },
  {
    'iso': 'MO',
    'label': 'Макао (+853)'
  },
  {
    'iso': 'MP',
    'label': 'Северные Марианские острова (+1 670)'
  },
  {
    'iso': 'MQ',
    'label': 'Мартиника (+596)'
  },
  {
    'iso': 'MR',
    'label': 'Мавритания (+222)'
  },
  {
    'iso': 'MS',
    'label': 'Монтсеррат (+1 664)'
  },
  {
    'iso': 'MT',
    'label': 'Мальта (+356)'
  },
  {
    'iso': 'MU',
    'label': 'Маврикий (+230)'
  },
  {
    'iso': 'MV',
    'label': 'Мальдивы (+960)'
  },
  {
    'iso': 'MW',
    'label': 'Малави (+265)'
  },
  {
    'iso': 'MX',
    'label': 'Мексика (+52)'
  },
  {
    'iso': 'MY',
    'label': 'Малайзия (+60)'
  },
  {
    'iso': 'MZ',
    'label': 'Мозамбик (+258)'
  },
  {
    'iso': 'NA',
    'label': 'Намибия (+264)'
  },
  {
    'iso': 'NC',
    'label': 'Новая Каледония (+687)'
  },
  {
    'iso': 'NE',
    'label': 'Нигер (+227)'
  },
  {
    'iso': 'NF',
    'label': 'Остров Норфолк (+672)'
  },
  {
    'iso': 'NG',
    'label': 'Нигерия (+234)'
  },
  {
    'iso': 'NI',
    'label': 'Никарагуа (+505)'
  },
  {
    'iso': 'NL',
    'label': 'Нидерланды (+31)'
  },
  {
    'iso': 'NO',
    'label': 'Норвегия (+47)'
  },
  {
    'iso': 'NP',
    'label': 'Непал (+977)'
  },
  {
    'iso': 'NR',
    'label': 'Науру (+674)'
  },
  {
    'iso': 'NU',
    'label': 'Ниуэ (+683)'
  },
  {
    'iso': 'NZ',
    'label': 'Новая Зеландия (+64)'
  },
  {
    'iso': 'OM',
    'label': 'Оман (+968)'
  },
  {
    'iso': 'PA',
    'label': 'Панама (+507)'
  },
  {
    'iso': 'PE',
    'label': 'Перу (+51)'
  },
  {
    'iso': 'PF',
    'label': 'Французская Полинезия (+689)'
  },
  {
    'iso': 'PG',
    'label': 'Папуа-Новая Гвинея (+675)'
  },
  {
    'iso': 'PH',
    'label': 'Филиппины (+63)'
  },
  {
    'iso': 'PK',
    'label': 'Пакистан (+92)'
  },
  {
    'iso': 'PL',
    'label': 'Польша (+48)'
  },
  {
    'iso': 'PM',
    'label': 'Сен-Пьер и Микелон (+508)'
  },
  {
    'iso': 'PR',
    'label': 'Пуэрто-Рико (+1 787)'
  },
  {
    'iso': 'PT',
    'label': 'Португалия (+351)'
  },
  {
    'iso': 'PW',
    'label': 'Палау (+680)'
  },
  {
    'iso': 'PY',
    'label': 'Парагвай (+595)'
  },
  {
    'iso': 'QA',
    'label': 'Катар (+974)'
  },
  {
    'iso': 'RE',
    'label': 'Реюньон (+262)'
  },
  {
    'iso': 'RO',
    'label': 'Румыния (+40)'
  },
  {
    'iso': 'RS',
    'label': 'Сербия (+381)'
  },
  {
    'iso': 'RU',
    'label': 'Россия (+7)'
  },
  {
    'iso': 'RW',
    'label': 'Руанда (+250)'
  },
  {
    'iso': 'SA',
    'label': 'Саудовская Аравия (+966)'
  },
  {
    'iso': 'SB',
    'label': 'Соломоновы острова (+677)'
  },
  {
    'iso': 'SC',
    'label': 'Сейшелы (+248)'
  },
  {
    'iso': 'SE',
    'label': 'Швеция (+46)'
  },
  {
    'iso': 'SG',
    'label': 'Сингапур (+65)'
  },
  {
    'iso': 'SH',
    'label': 'Святая Елена (+290)'
  },
  {
    'iso': 'SI',
    'label': 'Словения (+386)'
  },
  {
    'iso': 'SJ',
    'label': 'Шпицберген и Ян Майен (+47)'
  },
  {
    'iso': 'SK',
    'label': 'Словакия (+421)'
  },
  {
    'iso': 'SL',
    'label': 'Сьерра-Леоне (+232)'
  },
  {
    'iso': 'SM',
    'label': 'Сан-Марино (+378)'
  },
  {
    'iso': 'SN',
    'label': 'Сенегал (+221)'
  },
  {
    'iso': 'SO',
    'label': 'Сомали (+252)'
  },
  {
    'iso': 'SR',
    'label': 'Суринам (+597)'
  },
  {
    'iso': 'SS',
    'label': 'Южный Судан (+211)'
  },
  {
    'iso': 'ST',
    'label': 'Сан-Томе и Принсипи (+239)'
  },
  {
    'iso': 'SV',
    'label': 'Сальвадор (+503)'
  },
  {
    'iso': 'SY',
    'label': 'Сирия (+963)'
  },
  {
    'iso': 'SZ',
    'label': 'Свазиленд (+268)'
  },
  {
    'iso': 'TC',
    'label': 'Острова Теркс и Кайкос (+1 649)'
  },
  {
    'iso': 'TD',
    'label': 'Чад (+235)'
  },
  {
    'iso': 'TG',
    'label': 'Того (+228)'
  },
  {
    'iso': 'TH',
    'label': 'Таиланд (+66)'
  },
  {
    'iso': 'TJ',
    'label': 'Таджикистан (+992)'
  },
  {
    'iso': 'TM',
    'label': 'Туркменистан (+993)'
  },
  {
    'iso': 'TN',
    'label': 'Тунис (+216)'
  },
  {
    'iso': 'TO',
    'label': 'Тонга (+676)'
  },
  {
    'iso': 'TR',
    'label': 'Турция (+90)'
  },
  {
    'iso': 'TT',
    'label': 'Тринидад и Тобаго (+1 868)'
  },
  {
    'iso': 'TV',
    'label': 'Тувалу (+688)'
  },
  {
    'iso': 'TZ',
    'label': 'Танзания (+255)'
  },
  {
    'iso': 'UA',
    'label': 'Украина (+380)'
  },
  {
    'iso': 'UG',
    'label': 'Уганда (+256)'
  },
  {
    'iso': 'US',
    'label': 'США (+1)'
  },
  {
    'iso': 'UY',
    'label': 'Уругвай (+598)'
  },
  {
    'iso': 'UZ',
    'label': 'Узбекистан (+998)'
  },
  {
    'iso': 'VA',
    'label': 'Ватикан (+379)'
  },
  {
    'iso': 'VC',
    'label': 'Сент-Люсия (+1 758)'
  },
  {
    'iso': 'VE',
    'label': 'Венесуэла (+58)'
  },
  {
    'iso': 'VG',
    'label': 'Британские Виргинские острова (+1 284)'
  },
  {
    'iso': 'VI',
    'label': 'Американские Виргинские острова (+1 340)'
  },
  {
    'iso': 'VN',
    'label': 'Вьетнам (+84)'
  },
  {
    'iso': 'VU',
    'label': 'Вануату (+678)'
  },
  {
    'iso': 'WF',
    'label': 'Уоллис и Футуна (+681)'
  },
  {
    'iso': 'WS',
    'label': 'Самоа (+685)'
  },
  {
    'iso': 'YE',
    'label': 'Йемен (+967)'
  },
  {
    'iso': 'YT',
    'label': 'Майотта (+262)'
  },
  {
    'iso': 'ZA',
    'label': 'Южноафриканская Республика (+27)'
  },
  {
    'iso': 'ZM',
    'label': 'Замбия (+260)'
  },
  {
    'iso': 'ZW',
    'label': 'Зимбабве (+263)'
  }
]

const meta = {
  title: 'UI-Core/PhoneSelectField',
  component: PhoneSelectField,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4412&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  },
  args: {},
} satisfies Meta<typeof PhoneSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    countries: options,
  },
};

export const WithLimitCountries: Story = {
  args: {
    countries: [
      {
        'iso': 'RU',
        'label': 'Россия (+7)'
      },
      {
        'iso': 'KZ',
        'label': 'Казахстан (+7)'
      },
    ],
  },
};

export const SingleCountry: Story = {
  args: {
    countries: [
      {
        'iso': 'RU',
        'label': 'Россия (+7)'
      }
    ],
  },
};

export const WithLabel: Story = {
  args: {
    countries: [
      {
        'iso': 'RU',
        'label': 'Россия (+7)'
      },
      {
        'iso': 'KZ',
        'label': 'Казахстан (+7)'
      },
    ],
  },
  render(props) {
    return (
      <>
        <Label htmlFor='phone'>Телефон для связи</Label>
        <PhoneSelectField {...props} id='phone' onInput={(e) => console.log(e.currentTarget.value)} />
      </>
    )
  }
}