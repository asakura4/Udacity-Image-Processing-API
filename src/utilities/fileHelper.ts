import fs from 'fs';

const fsconstants = fs.constants;
const isFileExist = (inputFile: string): boolean => {
  let flag: boolean = true;
  try {
    fs.accessSync(inputFile, fsconstants.F_OK);
  } catch (err) {
    console.log(err);
    flag = false;
  }
  return flag;
};

export default { isFileExist };
