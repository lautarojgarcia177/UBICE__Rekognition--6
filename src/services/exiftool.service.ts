import { padStart } from 'lodash';
import exiftool from 'node-exiftool';
import { IRekognitionFile } from '../interfaces';
const ep = new exiftool.ExiftoolProcess();

export async function writeMetadataOnRekognizedImage(image: IRekognitionFile) {
  ep.open().then(() => {
    // Tag requirement:
    // - Images with no numbers should have #
    // - Images with numbers should have 5 chars length and fill the start with 0's
    if (!image.numbers.length) {
      image.numbers.push('#');
    } else {
      const numbersForTag: Array<string> = [];
      for (let number of image.numbers) {
        numbersForTag.push(padStart(String(number), 5, '0'));
      }
      image.numbers = numbersForTag;
    }
    return ep
      .writeMetadata(
        image.path,
        {
          'Keywords+': [...image.numbers],
        },
        ['overwrite_original']
      )
      .then(() => ep.close());
  });
}
