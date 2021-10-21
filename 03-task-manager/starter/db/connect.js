const mongoose = require('mongoose')


const connectDB = (url) => {
    mongoose
        .connect(url, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
}

module.exports = connectDB

// const password = "kingsChessGround"
// const dbName = "03-TASK-MANAGER"
// const connectionString = `mongodb+srv://kingsChess:${password}@cluster0.xiyrt.mongodb.net/${dbName}?retryWrites=true&w=majority`
// mongoose
//     .connect(connectionString, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//             useUnifiedTopology: true
//         }
//     )
//     .then(() => {
//         console.log("CONNECTED TO DB...")
//     })
//     .catch(err => console.log(err))