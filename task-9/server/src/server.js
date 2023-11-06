const app = require('./app');
const PORT = process.env.PORT || 8000;
const logger = require("./helpers/logger");

app.listen(PORT, () => {
    logger.info(`Server listening at http://localhost:${PORT}`);
}
);