import type { Stage } from './types';

export const stages: Stage[] = [
  {
    id: 'master',
    number: '01',
    title: 'Майстер',
    description:
      'Навчання, практика й спільнота. Початок шляху: опануй техніку й отримай відгук від Фрезівни.',
    groups: [
      {
        id: 'learning',
        title: 'Навчання',
        hint: 'Обери один формат інтенсиву Nail Practice',
        selection: 'single',
        products: [
          {
            id: 'lessons',
            title: 'Nail Practice: Lessons',
            description:
              '5 уроків протягом тижня, відповіді на питання, доступ до записів на рік, сертифікат про прослуховування курсу.',
            price: {
              kind: 'fixed',
              amount: 499,
              currency: 'UAH',
            },
          },
          {
            id: 'live',
            title: 'Nail Practice: Live',
            badge: 'ОБМЕЖЕНО 24 МІСЦЯ',
            description:
              'Усе з Lessons і практика на моделі під наглядом Фрезівни в Zoom, групи до 6 осіб, сертифікат про навчання та відпрацювання курсу.',
            price: {
              kind: 'fixed',
              amount: 3500,
              currency: 'UAH',
            },
          },
        ],
      },
      {
        id: 'diagnostic',
        title: 'Діагностика',
        hint: 'За бажанням',
        selection: 'multiple',
        products: [
          {
            id: 'nail-diagnostic',
            title: 'Nail Diagnostic',
            description:
              'Менеджер уточнює найближчі вільні дати, ти надсилаєш роботи й заповнюєш анкету.',
            price: {
              kind: 'fixed',
              amount: 2500,
              currency: 'UAH',
            },
          },
        ],
      },
      {
        id: 'community',
        title: 'Спільнота',
        hint: 'За бажанням',
        selection: 'multiple',
        products: [
          {
            id: 'nail-club',
            title: 'Nail Club',
            description: 'Платний Telegram-клуб для майстрів манікюру.',
            price: {
              kind: 'fixed',
              amount: 399,
              currency: 'UAH',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'school',
    number: '02',
    title: 'Експерт зі своєю школою',
    description:
      'Збери власну онлайн-школу з блоків: сторінки, оплата, спільнота, аналітика.',
    groups: [
      {
        id: 'website',
        title: 'Сайт',
        hint: 'Обери один варіант',
        selection: 'single',
        products: [
          {
            id: 'landing',
            title: 'Лендінг',
            description: 'Одна сторінка під твій продукт.',
            price: {
              kind: 'from',
              amount: 16500,
              currency: 'UAH',
            },
          },
          {
            id: 'website-four',
            title: 'Сайт до 4 сторінок',
            description: 'Головна, про тебе, продукти, контакти.',
            price: {
              kind: 'from',
              amount: 33000,
              currency: 'UAH',
            },
          },
          {
            id: 'website-ten',
            title: 'Сайт до 10 сторінок',
            description:
              'Розширена структура з блогом і окремими сторінками продуктів.',
            price: {
              kind: 'from',
              amount: 82500,
              currency: 'UAH',
            },
          },
        ],
      },
      {
        id: 'school-payment',
        title: 'Школа й оплата',
        hint: 'Можна обрати кілька блоків',
        selection: 'multiple',
        products: [
          {
            id: 'online-school',
            title: 'Онлайн-школа з нуля',
            description:
              'Налаштування школи, матеріалів і доступів для учасників.',
            price: {
              kind: 'from',
              amount: 49500,
              currency: 'UAH',
            },
          },
          {
            id: 'liqpay',
            title: 'Прийом платежів LiqPay',
            description: 'Підключення оплат до твоєї школи.',
            price: {
              kind: 'from',
              amount: 8500,
              currency: 'UAH',
            },
          },
          {
            id: 'crm',
            title: 'CRM-інтеграція',
            description: 'Облік клієнтів і продажів у CRM, зв’язок зі школою.',
            price: {
              kind: 'quote',
            },
          },
        ],
      },
      {
        id: 'search',
        title: 'Блог і пошук',
        hint: 'Можна обрати кілька блоків',
        selection: 'multiple',
        products: [
          {
            id: 'blog',
            title: 'Блог',
            description: 'Сторінка з матеріалами для твоїх майбутніх учнів.',
            price: {
              kind: 'from',
              amount: 16500,
              currency: 'UAH',
            },
          },
          {
            id: 'seo',
            title: 'SEO',
            description: 'Налаштування, щоб сайт знаходили в Google.',
            price: {
              kind: 'from',
              amount: 8500,
              currency: 'UAH',
            },
          },
        ],
      },
      {
        id: 'own-community',
        title: 'Власна спільнота',
        hint: 'За бажанням',
        selection: 'multiple',
        products: [
          {
            id: 'telegram-club',
            title: 'Закритий Telegram-клуб',
            description:
              'Налаштований клуб із групами, правилами й доступами для твоїх учасників.',
            price: {
              kind: 'from',
              amount: 25000,
              currency: 'UAH',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'brand',
    number: '03',
    title: 'Власний бренд',
    description:
      'Від домашнього майстра до впізнаваного бренду: стиль, команда й системи, які працюють без тебе щодня.',
    groups: [
      {
        id: 'branding',
        title: 'Бренд',
        hint: 'Обери один варіант',
        selection: 'single',
        products: [
          {
            id: 'brand-style',
            title: 'Бренд-стиль',
            description:
              'Айдентика й візуальний стиль твоїх сторінок і матеріалів.',
            price: {
              kind: 'from',
              amount: 25000,
              currency: 'UAH',
            },
          },
          {
            id: 'brand-school',
            title: 'Бренд-стиль + школа чи сайт',
            description:
              'Бренд разом зі школою чи сайтом, зібраними в єдиному стилі.',
            price: {
              kind: 'quote',
            },
          },
        ],
      },
      {
        id: 'team',
        title: 'Команда й системи',
        hint: 'Можна обрати кілька блоків',
        selection: 'multiple',
        products: [
          {
            id: 'online-team',
            title: 'Онлайн-команда',
            description:
              'Налаштування команди й навчання 4–6 людей у 2–3 сесіях.',
            price: {
              kind: 'range',
              min: 1500,
              max: 2500,
              currency: 'USD',
            },
          },
          {
            id: 'support',
            title: 'Онлайн-відділ підтримки',
            description:
              'З нуля: скрипти, база знань, терміни відповідей, звітність і мотивація.',
            price: {
              kind: 'quote',
            },
          },
          {
            id: 'mentoring',
            title: 'Менторство',
            description: 'Персональний супровід Фрезівни на твоєму шляху.',
            price: {
              kind: 'quote',
            },
          },
        ],
      },
      {
        id: 'premium',
        title: 'Усе разом',
        hint: 'Преміум-пакет, під твої навички',
        selection: 'multiple',
        products: [
          {
            id: 'premium-turnkey',
            title: 'Преміум під ключ',
            description:
              'Сайт чи лендінг (головна й 2 підсторінки), закритий Telegram-клуб, усі платіжні системи й CRM, упаковка під твої навички, плюс менторство.',
            price: {
              kind: 'quote',
            },
          },
        ],
      },
    ],
  },
];

export const products = stages.flatMap((stage) =>
  stage.groups.flatMap((group) => group.products),
);
