# Налаштування Supabase для проекту

## Крок 1: Створення проекту в Supabase

1. Перейдіть на [supabase.com](https://supabase.com)
2. Зареєструйтеся або увійдіть в акаунт
3. Натисніть "New Project"
4. Виберіть організацію та введіть:
   - **Name**: `used-appliance-store`
   - **Database Password**: створіть надійний пароль
   - **Region**: виберіть найближчий регіон (Europe West для України)
5. Натисніть "Create new project"

## Крок 2: Отримання ключів API

1. В панелі Supabase перейдіть до **Settings** → **API**
2. Скопіюйте:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** ключ (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Крок 3: Налаштування змінних середовища

1. Створіть файл `.env.local` в корені проекту:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

## Крок 4: Виконання SQL скриптів

1. В панелі Supabase перейдіть до **SQL Editor**
2. Виконайте скрипти в такому порядку:
   - `supabase/001-create-tables.sql`
   - `supabase/002-seed-categories.sql`
   - `supabase/003-seed-settings.sql`
   - `supabase/004-rls-policies.sql`

## Крок 5: Налаштування Storage (для зображень)

1. Перейдіть до **Storage** в панелі Supabase
2. Створіть новий bucket з назвою `product-images`
3. Зробіть bucket публічним:
   - Натисніть на bucket
   - Перейдіть до **Settings**
   - Увімкніть "Public bucket"

## Крок 6: Встановлення залежностей

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## Крок 7: Тестування підключення

Після налаштування запустіть проект:
\`\`\`bash
npm run dev
\`\`\`

Перевірте, що:
- Сторінки завантажуються без помилок
- Категорії відображаються на головній сторінці
- Адмін панель доступна

## Додаткові налаштування

### Аутентифікація (опціонально)
Якщо потрібна аутентифікація адміністратора:
1. Перейдіть до **Authentication** → **Settings**
2. Налаштуйте провайдерів аутентифікації
3. Оновіть RLS політики для обмеження доступу

### Backup
Рекомендується регулярно створювати backup бази даних через панель Supabase.

## Структура бази даних

- **products** - товари магазину
- **product_specifications** - характеристики товарів
- **categories** - категорії товарів
- **orders** - замовлення клієнтів
- **order_items** - товари в замовленнях
- **settings** - налаштування магазину (курс валют тощо)
