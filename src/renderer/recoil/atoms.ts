import { IAWSCredentials, IAWSRekognitionSettings } from 'interfaces';
import { atom } from 'recoil';

export const awsCredentialsState = atom({
  key: 'awsCredentials',
  default: {
    awsAccessKeyId: '',
    awsSecretAccessKey: '',
  } as IAWSCredentials,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((awsCredentials) => {
        // send ipc message to store new credentials
        window.electron.setAWSCredentials(awsCredentials);
        // then update with credentials taken from store
        window.electron
          .getAWSCredentials()
          .then((newAwsCredentials: IAWSCredentials) => {
            setSelf(newAwsCredentials);
          });
      });
    },
  ],
});

export const awsRekognitionSettingsState = atom({
  key: 'awsRekognitionSettings',
  default: {
    minConfidence: 95,
  } as IAWSRekognitionSettings,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((awsRekognitionSettings) => {
        // send ipc message to store new settings
        window.electron.setAWSRekognitionSettings(awsRekognitionSettings);
        // then update with settings taken from store
        window.electron
          .getAWSRekognitionSettings()
          .then((newAwsRekognitionSettings: IAWSRekognitionSettings) => {
            setSelf(newAwsRekognitionSettings);
          });
      });
    },
  ],
});
