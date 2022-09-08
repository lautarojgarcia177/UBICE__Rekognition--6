import { AWSRekognitionErrorTypes } from '../enums';
import { UBICEAWSClient } from '../classes';
import { IRekognitionFile } from '../interfaces';
import * as storeSvc from '../services/store.service';
import * as exiftoolService from '../services/exiftool.service';

export function rekognizeImages(
  files: IRekognitionFile[],
  progressCallback: (...args: any) => void,
  finishCallback: (...args: any) => void,
  errorCallback: (...args: any) => void
): void {
  const awsCredentials = storeSvc.getAWSCredentials();
  const awsRekognitionSettings = storeSvc.getAWSRekognitionSettings();
  const awsClient = new UBICEAWSClient(awsCredentials);

  // Create Promises Array
  const rekognitionPromises: Promise<any>[] = [];
  for (let image of files) {
    const rekognitionPromise = awsClient
      // Rekognize numbers in AWS
      .rekognize(image.path, awsRekognitionSettings.minConfidence)
      .then((rekognizedNumbers: any[]) => {
        console.log(rekognizedNumbers, typeof rekognizedNumbers[0]);
        image.numbers = rekognizedNumbers;
        // Write numbers on metadata
        exiftoolService
          .writeMetadataOnRekognizedImage(image)
          .then(() => progressCallback())
          .catch((err) => exiftoolWriteMetadataPromiseErrorHandler(err));
      })
      .catch((err: AWSRekognitionErrorTypes) =>
        awsRekognitionPromiseErrorHandler(err)
      );
    rekognitionPromises.push(rekognitionPromise);
  }
  function awsRekognitionPromiseErrorHandler(err: AWSRekognitionErrorTypes) {
    // Generar el objeto de error
    const error = new Error();
    error.name = err;
    switch (error.name) {
      case AWSRekognitionErrorTypes.InvalidSignatureException:
        error.message = 'Las credenciales de AWS son invalidas';
        break;
      case AWSRekognitionErrorTypes.ValidationException:
        error.message = 'Variables de reconocimiento en AWS invalidas';
        break;
      default:
        error.message = 'Hubo un error en el rekonocimiento de AWS';
    }
    errorCallback(error);
  }
  function exiftoolWriteMetadataPromiseErrorHandler(err) {
    // Generar el objeto de error
    const error = new Error();
    error.name = err;
    switch (error.name) {
      default:
        error.message = 'Hubo un error en el rekonocimiento de AWS';
    }
    errorCallback(error);
  }

  // Subscribe to promise
  Promise.all(rekognitionPromises)
    .then((result) => {
      console.log('EXITO!!!!');
      finishCallback();
    })
    .catch((err) => {
      console.log('Promise.all error !!!!!!!!', err);
    });
}
