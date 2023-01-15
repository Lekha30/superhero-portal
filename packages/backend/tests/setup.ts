Object.assign(process.env, {
  // Flag to the factories that we are running unit tests via the environment.
  PORT: 3001,
  LOG_LEVEL: 'debug',
  API_URL: "https://superheroapi.com/api",
  FB_ACCESS_TOKEM: "109326715388135"
});
