import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from 'interfaces';

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void;
      getAWSCredentials(): Promise<IAWSCredentials>;
      setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void;
      getAWSRekognitionSettings(): Promise<IAWSRekognitionSettings>;
      startImagesRekognition(files: IRekognitionFile[]): IRekognitionFile[];
      onRekognitionFinish(callback): void;
      onRekognitionProgress(callback): void;
      onError(callback): void;
    };
  }
}

export {};
