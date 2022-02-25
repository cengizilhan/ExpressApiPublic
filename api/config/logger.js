/* 
Log Levels:
  *error: 0, Hata
  *warn: 1, Uyarı
  *info: 2, Bilgi
  http: 3, HTTP
  verbose: 4, Ayrıntılı
  debug: 5, Debug
  silly: 6  Gereksiz

  Example:
   let _obj = { reqbody: req.body, error: e }
        logger.log('error', `Kullanıcı Kayıt Sırasında Hata :`, _obj)
        logger.log('info', `Kullanıcı Kaydı Başarılı : `, _obj)
  */
const winston = require('winston');
const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Istanbul',
        format:'YYY-MM-DD HH:mm:ss'
    });
}

  
const logger = createLogger({
    
    transports: [
        new transports.Console({
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
            level: 'info',
        }),
        new transports.Console({
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
            level: 'error',
        }),
        new transports.File({
            filename: './logfile/infos.log',
            level: 'info',
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
        }),
        
        new transports.File({
            filename: './logfile/errors.log',
            level: 'error',
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
        }),
      /*  new transports.MongoDB({
            level: 'info',
            db: process.env.MONGODB,
            options: {
                useUnifiedTopology: true
            },
            collection: 'nodejs-logger',
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
        }),
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB,
            options: {
                useUnifiedTopology: true
            },
            collection: 'nodejs-logger',
            format:format.combine(format.timestamp({ format: timezoned }),format.simple()),
        })*/
        
    ]
})

module.exports = logger;