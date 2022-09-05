// docs: https://github.com/sindresorhus/electron-store
import Store from 'electron-store';
import { IAWSCredentials } from '../interfaces';

const AWS_ACCESS_KEY_ID = 'awsAccessKeyId';
const AWS_SECRET_ACCESS_KEY = 'awsSecretAccessKey';

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
