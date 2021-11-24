const mongoose = require('mongoose');
const Schema=mongoose.Schema;

let videoSchema = Schema({

    image: {
        type: String
    }

})


mongoose.model('video',videoSchema);