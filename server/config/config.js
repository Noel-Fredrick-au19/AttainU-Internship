module.exports={
    port:4500,
    db:{
        url:"mongodb://127.0.0.1:27017/ssDB"
    },
    allowedCorsOrigin:"*",
    aws: {
        default: {
            region: "us-east-1"
        },
        profile: {
            aws_access_key_id: "AKIASNZUY32WQHAAZQ4H",
            aws_secret_access_key: "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"
        },
        s3: {
            bucket: 'myvideolists'
        }
    }
}