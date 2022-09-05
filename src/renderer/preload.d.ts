import { IAWSCredentials } from "interfaces";

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void,
      getAWSCredentials(): IAWSCredentials,
    };
  }
}

export {};
