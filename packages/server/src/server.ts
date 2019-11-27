import config from './config';
import App from './app';

App.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
