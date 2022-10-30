import { padStart } from 'lodash';
import { exiftool } from 'exiftool-vendored';
import { IRekognitionFile } from '../interfaces';

export async function writeMetadataOnRekognizedImage(image: IRekognitionFile) {
  if (!image.numbers.length) {
    image.numbers.push('#');
  } else {
    const numbersForTag: Array<string> = [];
    for (let number of image.numbers) {
      numbersForTag.push(padStart(String(number), 5, '0'));
    }
    // Convert numbers to strings
    image.numbers = numbersForTag.map((number) => String(number));
  }
  return exiftool.write(image.path, { Keywords: [...image.numbers] });
}
