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
            aws_access_key_id: "AKIAWA4YXILYORS23SKR",
            aws_secret_access_key: "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"
        },
        s3: {
            bucket: 'myvideolist'
        }
    }
}