import express from "express";
import cors from "cors";
import routerCSVtoJSON from './src/features/secretSanta.routes.js'
const server = express();
server.use(cors());

// Routes
server.use('/api/santagame', routerCSVtoJSON);
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
