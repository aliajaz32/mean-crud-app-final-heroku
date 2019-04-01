const mongoose = require('mongoose');

var dbURI = "mongodb+srv://aliajaz123:aliajaz123@cluster0-nurx5.mongodb.net/test?retryWrites=true"
mongoose.connect(dbURI)
    .catch((e) => {
        console.log("catch error: ", e)
    })


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
})

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
})

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

module.exports = mongoose;