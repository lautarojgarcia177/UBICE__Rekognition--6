import { IAWSCredentials, IAWSRekognitionSettings, IRekognitionFile } from 'interfaces';

declare global {
  interface Window {
    electron: {
      setAWSCredentials(credentials: IAWSCredentials): void;
      getAWSCredentials(): Promise<IAWSCredentials>;
      setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void;
      getAWSRekognitionSettings(): Promise<IAWSRekognitionSettings>;
      startImagesRekognition(files: IRekognitionFile[]): IRekognitionFile[];
      // onRekognitionFinish
      // onRekognitionProgress
      onError(callback): void;
    };
  }
}

export {};
