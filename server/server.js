const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');

const app = express();

// Config
//--------------------------------------------
const PORT = 8081;
//--------------------------------------------


/**
 * '/cmd/adb/devices/'
 * to run the "adb devices" cmd and return the output.
 */
app.post('/cmd/adb/devices', function(req,res) {
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


/**
 * '/cmd/adb/shell/getprop'
 */
app.post('/cmd/adb/shell/getprop', function(req,res) {
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

    res.end(data);
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


/**
 * '/cmd/adb/shell/setprop'
 */


 /**
  * '/cmd/battery/unplug'
  */


/**
 * '/cmd/adb/shell/input'
 */
app.post('/cmd/adb/shell/input', function(req,res) {
  let shellCmd = ['shell', 'input'];

  if(req.query.keyevent) {
    shellCmd.push('keyevent', req.query.keyevent);
  }
  else {
    res.end("No cmd need execute.");
    return;
  }

  const process = spawn('adb', shellCmd);
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    res.end(data);
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


/**
 * '/cmd/adb'
 * The common cmd for adb, if some cmd is not supported by this file yet,
 * then you can use this cmd.
 */
app.post('/cmd/adb', function(req,res) {
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

    res.end(data);
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
//---------------------------------------------------------


/**
 * TODO: middleware(app.use()) must be here under app.get().
 */


/**
 * server
 */
let server = app.listen(PORT, function(){
  let port = server.address().port;

  console.log(`Please visit http://localhost:${port}`);
});

