import { app } from './config/express.js';
import { teardown } from './config/express.js';
import logger from './config/logger.js';
import router from './router.js';

(async () => {
  try {
    logger.info('Application Started');

    process.on('SIGINT', async () => {
      console.log(`Exiting application at ${new Date()}`);
      try {
        await teardown();
      } catch (e) {
        console.error(e);
      }
      process.exit(0);
    });

    app.use('/', router);

  } catch (e) {
    console.error(e);
  }
})();

export { app };
