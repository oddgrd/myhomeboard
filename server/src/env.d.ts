declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}