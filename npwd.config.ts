import App from './src/App';
import { AppIcon } from './icon';

interface Settings {
  language: 'en';
}

export const path = '/zingle';
export default (settings: Settings) => ({
  id: 'ZINGLE',
  path,
  nameLocale: "Zingle",
  color: '#fff',
  backgroundColor: '#333',
  icon: AppIcon,
  app: App,
});