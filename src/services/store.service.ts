// docs: https://github.com/sindresorhus/electron-store
import Store from 'electron-store';
import { IAWSCredentials, IAWSRekognitionSettings } from '../interfaces';

// keys
const AWS_ACCESS_KEY_ID = 'awsAccessKeyId';
const AWS_SECRET_ACCESS_KEY = 'awsSecretAccessKey';
const AWS_REKOGNITION_SETTINGS = 'awsRekognitionSettings';

const store = new Store();

export function setAWSCredentials(awsCredentials: IAWSCredentials): void {
  store.set(AWS_ACCESS_KEY_ID, awsCredentials.awsAccessKeyId);
  store.set(AWS_SECRET_ACCESS_KEY, awsCredentials.awsSecretAccessKey);
}

export function getAWSCredentials(): IAWSCredentials {
  return {
    awsAccessKeyId: String(store.get(AWS_ACCESS_KEY_ID)),
    awsSecretAccessKey: String(store.get(AWS_SECRET_ACCESS_KEY)),
  }
}

export function setAWSRekognitionSettings(settings: IAWSRekognitionSettings): void {
  store.set(AWS_REKOGNITION_SETTINGS, settings);
}

export function getAWSRekognitionSettings(): IAWSRekognitionSettings {
  return {
    minConfidence: Number(store.get( AWS_REKOGNITION_SETTINGS + '.minConfidence')),
  }
}
