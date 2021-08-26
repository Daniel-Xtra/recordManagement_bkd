import app from "./app";
import { Server } from "http";
import { PORT } from "./config";
import { logger } from "./utils/logger";


const port = PORT || 6000;
const server = new Server(app);

server.listen(PORT, (err) => {
    if (err) {
        return logger.error(err);
    }

    return logger.info(`Server is listening on port: ${port}`);
});

