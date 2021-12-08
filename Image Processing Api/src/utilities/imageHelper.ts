import sharp from 'sharp';

const resizeImage = async (
  inputFile: string,
  outputFile: string,
  width: number,
  height: number
): Promise<boolean> => {
  let processFlag: boolean = true;
  await sharp(inputFile)
    .resize(width, height)
    .toFile(outputFile)
    .catch(err => {
      console.log(err);
      processFlag = false;
    });
  return processFlag;
};

export default { resizeImage };
