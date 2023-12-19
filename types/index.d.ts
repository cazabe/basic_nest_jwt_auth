//NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_SYNCHRONIZE: boolean;
    DB_MIGRATIONS_RUN: boolean;
    HASH_SALT: number;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    URL_BACKEND: string;
  }
}
