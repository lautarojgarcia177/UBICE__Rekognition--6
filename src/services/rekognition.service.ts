import { AWSRekognitionErrorTypes } from '../enums';
import { UBICEAWSClient } from '../classes';
import { IRekognitionFile } from '../interfaces';
import * as storeSvc from '../services/store.service';
import * as exiftoolService from '../services/exiftool.service';

export async function rekognizeImages(
  files: IRekognitionFile[],
  progressCallback: (...args: any) => void,
  finishCallback: (...args: any) => void,
  errorCallback: (...args: any) => void
): Promise<any> {
  const awsCredentials = storeSvc.getAWSCredentials();
  const awsRekognitionSettings = storeSvc.getAWSRekognitionSettings();
  const awsClient = new UBICEAWSClient(awsCredentials);

  // Create Promises Array
  const rekognitionPromises: Promise<any>[] = [];
  for (let image of files) {
    try {
      const rekognizedNumbers = await awsClient.rekognize(
        image.path,
        awsRekognitionSettings.minConfidence
        );
        image.numbers = rekognizedNumbers;
        console.log(image.numbers);
    } catch (err) {
      awsRekognitionPromiseErrorHandler(err);
    }
    try {
      await exiftoolService.writeMetadataOnRekognizedImage(image);
    } catch(err) {
      exiftoolWriteMetadataPromiseErrorHandler(err);
    }
    progressCallback();
  }
  finishCallback();
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
}
