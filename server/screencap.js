const { spawn } = require('child_process');

// TODO: I want to use an images array to cache the images.
// but seems not work.
const imageNames = [
  'screen01.png',
  'screen02.png',
  'screen03.png',
  'screen04.png',
  'screen05.png',
];
let imageIndex = 0;

function addImageName() {
  imageIndex += 1;
  if (imageIndex === imageNames.length) {
    imageIndex = 0;
  }
}
function getImageName() {
  return imageNames[imageIndex];
}

/**
 * 
 * @param {*} req 
 * @param {*} okCb 
 * @param {*} errCb 
 */
function pullImage(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;

  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  let img = getImageName();
  shellCmd.push('pull', `/sdcard/${img}`, `build/${img}`);

  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    hasError = false;
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    hasError = true;
    if(errCb) {
      errCb(data.toString());
    }
  });

  process.on('close', (code) => {
    console.log(`Child process: ${shellCmd} exit. Code: ${code}`);
    if (!hasError) {
      if(okCb) {
        let img = getImageName();
        okCb(img);
      }
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} okCb 
 * @param {*} errCb 
 */
function getScreenCapImage(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;
  
  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  addImageName();
  let img = getImageName();
  shellCmd.push('shell', 'screencap', `/sdcard/${img}`);

  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    //actually screencap doesn't output anything if no error. Won't run here.
    hasError = false;
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    hasError = true;
    if(errCb) {
      errCb(data.toString());
    }
  });

  process.on('close', (code) => {
    console.log(`Child process: ${shellCmd} exit. Code: ${code}`);
    if (!hasError) {
      pullImage(req,
        (filePath) => {
          if(okCb) {
            okCb(filePath);
          }
        },
        (errStr) => {
          if(errCb) {
            errCb(errStr);
          }
        });
    }
  });
}

module.exports = {
  getScreenCapImage: getScreenCapImage,
};