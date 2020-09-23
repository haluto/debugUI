const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); 

const screencap = require('./screencap.js');


// Config
//--------------------------------------------
const PORT = 8081;
//--------------------------------------------

/**************************************************************
 * app
***************************************************************/
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const isDev = (process.argv.length === 3) && (process.argv[2] === 'dev');

/**************************************************************
 * '/cmd/adb/devices/'
 * to run the "adb devices" cmd and return the output.
***************************************************************/
app.post('/cmd/adb/devices', (req,res) => {
  //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8',
  //                      'Access-Control-Allow-Origin':'*'});
  const process = spawn('adb', ['devices']);

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    let arr = [];
    let cursor = data.length;
    // to get all the devices' name.
    while(cursor >= 0) {
      var start = -1;
      var end = -1;
      end = data.lastIndexOf('\t', cursor);
      if(end >= 0) {
        start = data.lastIndexOf('\n', end);
      }
      console.log(`cursor: ${cursor}, start: ${start}, end: ${end}`);
      cursor = start;
      if(start >= 0) {
        arr.push(data.slice(start+1, end));
      }
    }

    res.end(arr.toString());
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.end(`Cmd error: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Child process exit. Code: ${code}`);
    res.end('Closed');
  });
});

/**************************************************************
 * '/cmd/adb/shell/screencap'
***************************************************************/
app.post('/cmd/adb/shell/screencap', (req,res) => {
  screencap.getScreenCapImage(req, 
    success = (filePath) => {
      res.json({ok:'ok', info:filePath});
    },
    fail = (err) => {
      res.json({ok:'error', info:err});
    });
});


/**************************************************************
 * '/cmd/adb/shell/getprop'
***************************************************************/
app.post('/cmd/adb/shell/getprop', (req,res) => {
  let shellCmd = ['shell', 'getprop'];
  if(req.query.prop) {
    console.log(`getprop: ${req.query.prop}`);
    shellCmd.push(req.query.prop);
  }
  else {
    // TODO: the data string is too long.
  }

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    res.write(data);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.end(`Cmd error: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Child process exit. Code: ${code}`);
    res.end('Closed');
  });

});


/**************************************************************
 * '/cmd/adb/shell/setprop'
***************************************************************/


/**************************************************************
 * '/cmd/battery/unplug'
***************************************************************/


/**************************************************************
 * '/cmd/adb/shell/input'
***************************************************************/
app.post('/cmd/adb/shell/input', (req,res) => {
  let shellCmd = [];
  let info = req.body;
  let hasError = false;

  if (info && info.device) {
    shellCmd.push('-s', info.device);
  }

  shellCmd.push('shell', 'input');

  if(!info || !info.key) {
    res.end("No cmd need execute.");
    return;
  }
  else {
    shellCmd.push('keyevent', info.key);
  }

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    hasError = false;
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    hasError = true;
    res.json({ok:'fail'});
  });

  process.on('close', (code) => {
    console.log(`Child process exit: ${shellCmd}. Code: ${code}`);
    if (!hasError) {
      res.json({ok:'ok'});
    }
  });
});


/**************************************************************
 * '/cmd/adb'
 * The common cmd for adb, if some cmd is not supported by this file yet,
 * then you can use this cmd.
***************************************************************/
app.post('/cmd/adb', (req,res) => {
  //let cmd = req.query.cmd.replace(/ /g, ',');
  let cmd = req.query.cmd;
  let shellCmd = [];
  
  if(cmd == null) {
    res.end("Need a cmd.");
    return;
  }

  let cursor = 0;
  while(cursor >= 0) {
    var start = cursor;
    var end = cmd.indexOf(' ', cursor);
    
    if(end >=0) {
      shellCmd.push(cmd.slice(start, end));
      cursor = end+1;
    } else {
      shellCmd.push(cmd.slice(start));
      cursor = end;
    }
    
    console.log(`start: ${start}, end: ${end}, cursor:${cursor}`);
  }

  console.log(shellCmd);

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    res.write(data);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.end(`Cmd error: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Child process exit: ${shellCmd}. Code: ${code}`);
    res.end('Closed');
  });

});
//-------------------------------------------------------------


/*MAKE SURE THIS IS THE LAST API*/
/**************************************************************
 * app.get('/*')
***************************************************************/
if(!isDev){
  console.log("isDev:", isDev);
  // my server code is in ./server dir, so back the dir.
  let dirName = __dirname.slice(0, __dirname.lastIndexOf('/'));

  app.use(express.static(path.join(dirName, 'build')));
  app.use(express.static(path.join(dirName, 'public')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(dirName, 'build', 'index.html'));
  });
} else {
  //TODO: currently same as prod.
  console.log("isDev:", isDev);
  // my server code is in ./server dir, so back the dir.
  let dirName = __dirname.slice(0, __dirname.lastIndexOf('/'));

  app.use(express.static(path.join(dirName, 'build')));
  app.use(express.static(path.join(dirName, 'public')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(dirName, 'build', 'index.html'));
  });
}
/*MAKE SURE THIS IS THE LAST API*/


/**************************************************************
 * server
***************************************************************/
let server = app.listen(PORT, () => {
  let port = server.address().port;

  console.log(`Please visit http://localhost:${port}`);
});

