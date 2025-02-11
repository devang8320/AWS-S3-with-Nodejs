const {S3Client, GetObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl}  = require("@aws-sdk/s3-request-presigner");

const {dotenv} =  require(dotenv)
dotenv.config({})

const s3Client =  new S3Client ({
    region:"ca-central-1",
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
})

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: "devang-try",
        Key : key
    }) 

    const url = await getSignedUrl(s3Client, command, {expiresIn:2000})
    return url
} 
async function putObject(filename, contentType) {
    const cmd =  new PutObjectCommand({
        Bucket:"devang-try",
        Key:`upload/user-upload/${filename}`,
        ContentType: contentType
    })
    const url = await getSignedUrl(s3Client,cmd)
    return url
}

async function init(){

    console.log(await getObjectURL("upload/user-upload/iamge-1738462765250.png"))
    console.log(await putObject(`iamge-${Date.now()}.png`,"image/png"))

}

init()
