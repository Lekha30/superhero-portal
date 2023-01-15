import * as path from 'path';

export const getEnvVar = (variable: string) => process.env[variable] || '';
export const environment = getEnvVar('ENVIRONMENT') || 'dev';

// Server
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
export const API_URL = getEnvVar('API_URL');
export const isDevelopment = environment === 'dev' || environment === 'sandpit';
export const rootDir: string = path.resolve(__dirname, '..');
export const FB_ACCESS_TOKEM = getEnvVar('FB_ACCESS_TOKEM');

