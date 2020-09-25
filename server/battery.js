const { spawn } = require('child_process');

/**************************************************************
 * '/cmd/battery/batterysaver'
***************************************************************/
function getBatterySaver(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;
  
  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  shellCmd.push('shell', 'settings', 'get', 'global', 'low_power');
  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    hasError = false;
    if(okCb) {
      okCb(data.toString().replace(/\n/g, ""));
    }
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
  });
}

function setBatterySaver(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;
  
  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  shellCmd.push('shell', 'settings', 'put', 'global', 'low_power');

  if (info.value == 1) {
    shellCmd.push('1');
  } else {
    shellCmd.push('0');
  }
  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    //acturally won't run here.
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
      if (okCb) {
        // TODO: get the real value to confirm.
        okCb(info.value);
      }
    }
  });
}

/**************************************************************
 * '/cmd/battery/charging'
***************************************************************/
function getCharging(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;
  
  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  shellCmd.push('shell', 'dumpsys', 'deviceidle', 'get', 'charging');
  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    hasError = false;
    if(okCb) {
      okCb(data.toString().replace(/\n/g, "")=='true'?'1':'0');
    }
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
  });
}


function setCharging(req, okCb, errCb) {
  let info = req.body;
  let shellCmd = [];
  let hasError = false;
  
  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  shellCmd.push('shell', 'dumpsys', 'battery');

  if (info.value == 1) {
    shellCmd.push('reset');
  } else {
    shellCmd.push('unplug');
  }
  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    //acturally won't run here.
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
      if (okCb) {
        // TODO: get the real value to confirm.
        okCb(info.value);
      }
    }
  });
}



module.exports = {
  getBatterySaver: getBatterySaver,
  setBatterySaver: setBatterySaver,
  getCharging: getCharging,
  setCharging: setCharging,
};