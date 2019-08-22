import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { extname } from 'path';
import aws from 'aws-sdk';
import awsConfig from './aws';
/**
 * Local Storage
 * export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
 */

aws.config.update(awsConfig);
const s3 = new aws.S3();

export default function(folder) {
  return {
    storage: multerS3({
      s3,
      bucket: 'arqueio',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);

          return cb(
            null,
            `${folder}/${res.toString('hex')}${extname(file.originalname)}`
          );
        });
      },
    }),
  };
}
