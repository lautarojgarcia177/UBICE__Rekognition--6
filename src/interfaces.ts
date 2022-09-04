export interface IAWSCredentials {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
}

export interface IAWSRekognitionSettings {
  minConfidence: number;
}

export interface IRekognitionFile {
  id: number,
  name: string,
  path: string,
  numbers: number[] | string[],
}
