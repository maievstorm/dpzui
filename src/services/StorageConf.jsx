import * as minio from "minio";
import UserService from "./UserService";
// const DpzStorageConf = new minio.Client(

//     {
//             endPoint: "apilakedpa.apps.xplat.fis.com.vn",
//             useSSL: true,
//             port: 443,
//             accessKey: "naQrl3yAjoue8o22",
//             secretKey: "A0d6ZmTAbcVrhgTorNzCFBddtAWUjruP"
//     }
// );
// export default DpzStorageConf

export const DpzStorageConf = async (akey, skey) => {
    let StoreConf
    try {
        StoreConf = new minio.Client(

            {
                endPoint: "apilakedpa.apps.xplat.fis.com.vn",
                useSSL: true,
                port: 443,
                accessKey: akey,
                secretKey: skey
            }
        );
    } catch (err) {
        console.log(err);
    }
    return StoreConf
}

export const CreateUserStoragePolicy = async (bucketName) => {

    const policy = {
        "Version": "2012-10-17",
        "Id": "ExamplePolicy01",
        "Statement": [
            {
                "Sid": "ExampleStatement01",
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Resource": [
                    `arn:aws:s3:::${bucketName}/*`
                ]
            }
        ]
    }

    let akey = 'naQrl3yAjoue8o22'
    let skey = 'A0d6ZmTAbcVrhgTorNzCFBddtAWUjruP'
    DpzStorageConf(akey, skey)
        .then(StoreConf => {
            StoreConf.setBucketPolicy(bucketName, JSON.stringify(policy), function (err) {
                if (err) throw err;
                console.log('Bucket policy set');
            });

        })
        .catch(err => console.log(err))

}



export const CreateUserStorage = async (bucketName) => {
    let akey = 'Ej29ZaoazKZujZvN'
    let skey = 'OxUATEIBt5RP1SKZoUQfqbu7riAqseS2'
    DpzStorageConf(akey, skey)
        .then(StoreConf => {
            StoreConf.bucketExists(bucketName)
                .then(res => {
                    if (res === true) {
                        console.log('error bucket exists')
                    } else {
                        StoreConf.makeBucket(bucketName, (err) => {
                            if (err) {
                                console.log('minio error ' + err);
                            }
                            else {
                                console.log('create successfully!')


                                // CreateUserStoragePolicy(bucketName)
                            }

                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
}