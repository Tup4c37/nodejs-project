/* eslint-disable no-undef */
module.exports = {
    "PORT": process.env.PORT || "3000",
    "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://localhost:27017/nodejs-project",
    "JWT": {
        "SECRET": process.env.JWT_SECRET || "123456ALSDHALDHldhSDLhıdLHLDIHLIAHFHWWIhdsiHDIHWihdSDD53a5315ads5ga53wdfsa13sa5f351F5AD3SA51S3AD1SAD3A13ddafkasşldasflhaşsdıla",
        "EXPIRE_TIME": !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 24*60*60 
    },
    "DEFAULT_LANG": process.env.DEFAULT_LANG || "EN",    
    "FILE_UPLOAD_PATH": process.env.FILE_UPLOAD_PATH
    
}