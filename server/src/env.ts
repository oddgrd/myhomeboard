import 'dotenv/config';

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

export const env = {
  PORT: parseInt(required('PORT'), 10),
  REDIS_URL: required('REDIS_URL'),
  DATABASE_URL: required('DATABASE_URL'),
  SESSION_SECRET: required('SESSION_SECRET'),
  GOOGLE_CLIENT_ID: required('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: required('GOOGLE_CLIENT_SECRET'),
  CLOUDINARY_URL: required('CLOUDINARY_URL'),
  CORS_ORIGIN: required('CORS_ORIGIN'),
};
