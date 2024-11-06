# 🗂️Project information:
### Project Name: Course application system 
### Project Description: Course application system web app.

### Project structure:
```bash
└── course-application-system
    └── public
        └── favicon.ico
        └── next.svg
        └── vercel.svg
    └── src
        └── lib
            └── supabaseClient.js
        └── pages
            └── api
                └── hello.js
            └── authentication
                └── applications.jsx
                └── auth.jsx
            └── _app.js
            └── _document.js
            └── index.jsx
        └── styles
            └── globals.css
    └── .env.local
    └── .eslintrc.json
    └── .gitignore
    └── jsconfig.json
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.js
```

## 💻Project tech:

![JavaScript](https://img.shields.io/badge/java%20script-%23223300.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Next.js](https://img.shields.io/badge/next.js-%23101010.svg?style=for-the-badge&logo=next.js&logoColor=%23ffffff)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
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