declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAIN_BACKEND_URL: string;
      MAIN_FILE_URL: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}
