import { IAWSCredentials, IAWSRekognitionSettings } from "interfaces";

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void,
      getAWSCredentials(): Promise<IAWSCredentials>,
      setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void,
      getAWSRekognitionSettings(): Promise<IAWSRekognitionSettings>,
    };
  }
}

export {};
