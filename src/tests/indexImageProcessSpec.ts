import imageHelper from '../utilities/imageHelper';
import fileHelper from '../utilities/fileHelper';

const inputPath: string = './images/full/';
const outputPath: string = './images/thumbnail/';

describe('image process test - ', () => {
  it('function output images successfully', async done => {
    const fileName: string = 'santamonica.jpg';
    const width: number = 800;
    const height: number = 600;

    const inputFile: string = inputPath + fileName;
    const newFileName: string =
      fileName
        .split('.')
        .slice(0, -1)
        .join('.') +
      '_thumb_' +
      width.toString() +
      'X' +
      height.toString() +
      '.jpg';
    const outputFile: string = outputPath + newFileName;

    const result: boolean = await imageHelper.resizeImage(
      inputFile,
      outputFile,
      width,
      height
    );
    expect(result).toBeTruthy();
    expect(fileHelper.isFileExist(outputFile)).toBeTruthy();

    done();
  });
});
