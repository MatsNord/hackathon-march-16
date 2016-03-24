#!/usr/bin/env node
/**
 * Copy and renaming a file from a package <source> to another package <destination>
 * @param {string} source package
 * @param {string} desination package
 */

var path = require('path'),
    fs = require('fs');

var srcFilePath = "/Packages/QROS/amd/qros-definitions.js",
    dstFilePath = "/web/autogenerated/qros/qmc-qros-definitions.js";
  
module.exports = migrateFile();

function migrateFile(){
    copy(setLocation( parseArgs().src , srcFilePath ), setLocation( parseArgs().dst, dstFilePath )); 
}

function usage(args){
    if ( args.length !== 2 ) {
        console.log("Usage: qroscopy source-package destination-package");
        process.exit();
    }
}

function parseArgs(){
    var args = process.argv.slice( 2 );
    usage(args);
    return {
        src: args[0],
        dst: args[1]
    };
}

function setLocation( proj, filePath ){
    return path.resolve( proj + filePath );
}

function copy( source, target, cb ) {
  var cbCalled = false;
  var _cb = cb || console.log;

  var rd = fs.createReadStream( source );
  rd.on("error", function( err ) {
    done( err );
  });
  
  var wr = fs.createWriteStream( target );
  wr.on("error", function( err ) {
    done( err );
  });
  wr.on("close", function( ex ) {
    done("Successfully copied the file");
  });
  
  rd.pipe( wr );

  function done( err ) {
    if ( !cbCalled ) {
      _cb( err );
      cbCalled = true;
    }
  }
}



