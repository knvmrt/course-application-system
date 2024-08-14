# ✋Hello, this course registration is the system.

## 💻Project tech:

![JavaScript](https://img.shields.io/badge/java%20script-%23223300.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Next.js](https://img.shields.io/badge/next.js-%23101010.svg?style=for-the-badge&logo=next.js&logoColor=%23ffffff)
![Tailwindcss](https://img.shields.io/badge/tailwindcss-%23202366.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![CSS](https://img.shields.io/badge/css-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SUPABASE](https://img.shields.io/badge/supabase-%233DCF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)

## To mount Supabase, first create the `.env.local` file in the main directory.

### And the supabase API URL and ANON KEY should be added to the content of the file.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## To create SQL tables:

```sql
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    category TEXT NOT NULL,
    time_range TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);
```

## To start the project:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 🚀 Project GitHub:

```bash
git remote add origin https://github.com/knvmrt/course-registration-system.git
git push -u origin master
```
