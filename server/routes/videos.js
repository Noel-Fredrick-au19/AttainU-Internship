const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { aws } = config
const router = express.Router();

const video = require('../models/video')
const videoModel = mongoose.model('video');


const s3 = new AWS.S3({
    region: aws.default.region,
    credentials: {
        accessKeyId: aws.profile.aws_access_key_id,
        secretAccessKey: aws.profile.aws_secret_access_key,
    },
})

const storage1 = multer.memoryStorage({
    storage: multerS3({
        s3: s3,
        bucket: aws.s3.bucket,
        acl:'public-read',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: "TEST_META_DATA"});
        },
        key: (req, file, cb) => {
          cb(null, Date.now().toString())
        }
      })
})


router.post('/image-upload' ,multer({storage:storage1}).single('image'),(req,res)=>{

    const params ={
        Bucket: aws.s3.bucket,
        Body: Date.now()+"_"+req.body.image,
        Key:Date.now()+"_"+req.body.image
    }

    s3.upload(params,(err,data)=>{

    if(err){
         res.status(500).send(err)
     }

    res.status(200).send(data)

    if(data){
        var videoList=new videoModel({
            image:data.Location
        })

        videoList.save()
        .then(op=>console.log("res1------",op))
        .catch(err=>console.log("err---",err)) 

    }
    

    })

})

router.get('/videoList',(req,res)=>{

    let pageSize = +req.query.pageSize;
    let currentPage = +req.query.currentPage;

    let dB = videoModel.find();
    let resultData;

    if(pageSize && currentPage){
        dB.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }


    dB.then(result=>{
        resultData = result;

        videoModel.countDocuments().then(count=>{


            if(count){
                
                let pages = Math.ceil(count/pageSize);

                let response={
                    result:resultData,
                    message:'total video list',
                    totalcount:count,
                    currentPage:currentPage,
                    pages:pages
                }

                res.send(response);
            }

        })
        
    })


})

module.exports=router;