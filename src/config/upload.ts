import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination(request, file, callback) {
            return callback(null, path.dirname('/Users/danielcampos/Workspace/rocketseat/GoBarber/backend/tmp/uploads'))
        },
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        }
    })
}
