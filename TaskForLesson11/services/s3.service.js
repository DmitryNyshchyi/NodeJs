const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;
const path = require('path');

const { config } = require('../../configs');

const bucket = new S3({
    region: config.AWS_S3_REGION,
    accessKeyId: config.AWS_S3_ACCESS_KEY,
    secretAccessKey: config.AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file, itemType, itemId) => {
        const { name, data, mimetype } = file;
        const uploadPath = _fileNameBuilder(name, itemType, itemId.toString());

        return bucket
            .upload({
                Bucket: config.AWS_S3_BUCKET_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype
            })
            .promise();
    }
};

function _fileNameBuilder(name, type, id) {
    const fileExtension = name.split('.').pop();

    return path.join(type, id, `${uuid()}.${fileExtension}`);
}
