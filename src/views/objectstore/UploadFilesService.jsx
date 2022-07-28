import { DpzStorageConf } from 'services/StorageConf';

class UploadFilesService {
  upload(file, bucket, storagekey) {
   // console.log(storagekey)

    let formData = new FormData();
    formData.append("file", file);
    const fileToUpload = file;
    const objectKey = fileToUpload.name;
    const contentType = fileToUpload.type;
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(fileToUpload)
    fileReader.onload = async function (evt) {

      if (evt.target.readyState === FileReader.DONE) {

        const uint = new Uint8Array(evt.target.result)
        return DpzStorageConf(storagekey?.accessKey, storagekey?.secretKey)
          .then(storage => {
            storage.putObject(bucket, objectKey, Buffer.from(uint), {
              'Content-Type': contentType,
              'X-Amz-Meta-App': "ReactJS"
            },
              // onUploadProgress
            )

          })


        // console.log(onUploadProgress)

      }
      fileReader.onerror = function () {
        fileReader.abort()
        // reject(null)
      }
      // fileReader.readAsArrayBuffer(fileToUpload)
    }



  }

}

export default new UploadFilesService();

