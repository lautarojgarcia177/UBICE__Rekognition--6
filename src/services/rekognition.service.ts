import { AWSRekognitionErrorTypes } from '../enums';
import { UBICEAWSClient } from '../classes';
import { IRekognitionFile } from '../interfaces';
import * as storeSvc from '../services/store.service';

export function rekognizeImages(
  files: IRekognitionFile[],
  progressCallback: (...args: any) => void,
  finishCallback: (...args: any) => void,
  errorCallback: (...args: any) => void
): void {
  const awsCredentials = storeSvc.getAWSCredentials();
  const awsRekognitionSettings = storeSvc.getAWSRekognitionSettings();
  const awsClient = new UBICEAWSClient(awsCredentials);
  let i = 0;
  awsClient
    .rekognize(files[i].path, awsRekognitionSettings.minConfidence)
    .then((rekognizedNumbers: any[]) => {
      console.log(rekognizedNumbers, typeof rekognizedNumbers[0]);
    })
    .catch((err: AWSRekognitionErrorTypes) => {
      // Generar el objeto de error
      const error = new Error();
      error.name = err;
      switch (error.name) {
        case AWSRekognitionErrorTypes.InvalidSignatureException:
          error.message = 'Las credenciales de AWS son invalidas';
          break;
        default:
          error.message = 'Hubo un error en el rekonocimiento de AWS';
      }
      errorCallback(error);
    });
}
