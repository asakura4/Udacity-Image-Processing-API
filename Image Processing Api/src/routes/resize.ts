import express from 'express';
//import sharp from 'sharp';
// import fs from 'fs';
import imageHelper from '../utilities/imageHelper';
import fileHelper from '../utilities/fileHelper';

const rs = express.Router();
const inputPath: string = './images/full/';
const outputPath: string = './images/thumbnail/';

function isNumber(value: string | number): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}

rs.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.send('API does not exist.');
    return;
  }
);

rs.get(
  '/image',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const fileName: string = (req.query.filename as unknown) as string;
    const inputFile: string = inputPath + fileName;

    if (fileName === undefined) {
      res.send({ error: 'Please input the file name.' });
      return;
    }

    if (!fileHelper.isFileExist(inputFile)) {
      console.log('Input file does not exist.');
      res.send({ error: "Selected image doesn't exist." });
      return;
    }

    const width: number = Number(req.query.width as unknown) as number;
    const height: number = Number(req.query.height as unknown) as number;

    if (!isNumber(width)) {
      res.send({ error: 'please check whether width is correct or not.' });
      return;
    } else if (!isNumber(height)) {
      res.send({
        error: 'please check whether height is correct or not.'
      });
      return;
    }

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

    //console.log(inputFile);
    //console.log(outputFile);

    if (fileHelper.isFileExist(outputFile)) {
      console.log('Output file already exists.');
      res.sendFile(outputFile, { root: '.' }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Sent: ', outputFile);
        }
      });
      return;
    }
    console.log('Start resize image.');
    const imgFlag: boolean = await imageHelper.resizeImage(
      inputFile,
      outputFile,
      width,
      height
    );
    if (imgFlag) {
      res.sendFile(outputFile, { root: '.' }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Sent: ', outputFile);
        }
      });
      return;
    } else {
      res.send({ error: 'Failed to resize the image file.' });
      return;
    }

    // change the below part to call function
    //   sharp(inputFile)
    //     .resize(width, height)
    //     .toFile(outputFile, (err: Error) => {
    //       if (err) {
    //         console.log(err);
    //         return res.send({ error: 'Failed to resize the image file.' });
    //       }
    //       return res.sendFile(outputFile, { root: '.' }, err => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log('Sent: ', outputFile);
    //         }
    //       });
    //     });
    //
  }
);

export default rs;
