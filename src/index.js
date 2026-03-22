const express = require('express');
const apiRoutes = require('./routes')
const { ServerConfig } = require('./config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

const initailizeConnection = async () => {
    try {

        app.listen(ServerConfig.PORT, () => {
            console.log(`Server is running at port no. ${process.env.PORT}`);

        });
    }
    catch (err) {
        console.log("Error " + err);
    }
}
initailizeConnection();