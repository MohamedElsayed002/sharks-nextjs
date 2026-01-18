src/
├── app/
│   ├── [locale]/
│   │   └── login/
│   │       └── page.tsx          # UI only (mostly)
│   ├── api/                      # Route handlers (if you use them)
│
├── server/
│   ├── actions/                  # Server Actions (recommended)
│   │   └── auth.actions.ts
│   ├── services/                 # DB / Supabase / external services
│   │   └── auth.service.ts
│   └── db/
│       └── supabase.ts
│
├── client/
│   ├── queries/                  # react-query hooks
│   │   └── useLogin.ts
│   └── mutations/
│       └── useRegister.ts
│
├── lib/
│   └── fetcher.ts
│
├── types/
│   └── auth.ts
