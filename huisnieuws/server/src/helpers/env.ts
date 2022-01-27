import dotenv from 'dotenv';

dotenv.config();

/**
 * Get a value from .env based on its key,
 * return a fallback when not found.
 *
 * @param key
 * @param fallback
 */
const env = (key: string, fallback: string = ''): string => {
  const envVar = process.env[key];

  if (envVar === undefined) {
    return fallback;
  }

  return String(envVar);
};

export default env;
