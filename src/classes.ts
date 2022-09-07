import { IAWSCredentials } from './interfaces';
import fs from 'fs';
import {
  RekognitionClient,
  DetectTextCommand,
} from '@aws-sdk/client-rekognition';
import { uniq } from 'lodash';
import { useRegex } from '../lib/utils';
import { AWSRekognitionErrorTypes } from './enums';
// import * as store from '../services/store.service';

export class UBICEAWSClient {
  client: RekognitionClient;
  constructor(credentials: IAWSCredentials, region: string = 'us-west-1') {
    this.client = new RekognitionClient({
      credentials: {
        accessKeyId: credentials.awsAccessKeyId,
        secretAccessKey: credentials.awsSecretAccessKey,
      },
      region: region,
    });
  }
  async rekognize(imagePath: string, minConfidence: number = 95): Promise<any> {
    const image = fs.readFileSync(imagePath);
    const command = new DetectTextCommand({
      Image: {
        Bytes: image,
      },
      Filters: {
        WordFilter: {
          MinConfidence: minConfidence,
        },
      },
    });
    try {
      let commandResult = await this.client.send(command);
    } catch(err) {
      let errorType: AWSRekognitionErrorTypes
      switch(err.__type) {
        case 'InvalidSignatureException':
          errorType = AWSRekognitionErrorTypes.InvalidSignatureException
        break;
        default:
        errorType =  AWSRekognitionErrorTypes.Unknown;
      }
      return Promise.reject(errorType);
    }
    const numbersArray = commandResult.TextDetections.filter((textDetection) =>
      useRegex(textDetection.DetectedText)
    ).map((textDetection) => textDetection.DetectedText);
    return uniq(numbersArray);
  }
}

// export default new UBICEAWSClient(store.getAWSCredentials());
