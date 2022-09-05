import { IAWSCredentials } from 'interfaces';
import { atom } from 'recoil';

export const awsCredentialsState = atom({
  key: 'awsCredentials',
  default: {
    awsAccessKeyId: '',
    awsSecretAccessKey: '',
  } as IAWSCredentials,
  effects: [
    ({onSet, setSelf}) => {
      onSet(awsCredentials => {
        // send ipc message to store new credentials
        window.electron.setAWSCredentials(awsCredentials);
        // then update with credentials taken from store
        (window.electron.getAWSCredentials() as any).then((newAwsCredentials: IAWSCredentials) => {
          setSelf(newAwsCredentials);
        });
      });
    }
  ]
});
