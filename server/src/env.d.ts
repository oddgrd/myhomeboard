declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    REDIS_URL: string;
    DATABASE_URL: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    CLOUDINARY_URL: string;
    CORS_ORIGIN: string;
    POSTGRES_PORT: string;
    POSTGRES_HOST: string;
  }
}