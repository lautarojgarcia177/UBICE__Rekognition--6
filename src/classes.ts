import { IAWSCredentials } from './interfaces';
import fs from 'fs';
import {
  RekognitionClient,
  DetectTextCommand,
} from '@aws-sdk/client-rekognition';
import { uniq } from 'lodash';
import { useRegex } from '../lib/utils';
// import * as store from '../services/store.service';



class UBICEAWSClient {
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
    let commandResult = await this.client.send(command);
    const numbersArray = commandResult.TextDetections.filter((textDetection) =>
      useRegex(textDetection.DetectedText)
    ).map((textDetection) => textDetection.DetectedText);
    return uniq(numbersArray);
  }
}

// export default new UBICEAWSClient(store.getAWSCredentials());
