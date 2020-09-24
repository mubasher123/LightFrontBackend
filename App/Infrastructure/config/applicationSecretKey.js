module.exports = () => {
  if (!process.env.APPLICATION_SECRET_KEY) {
    console.error("FATAL ERROR: application secret key is not defined.");
    process.exit(1);
  } else {
    return process.env.APPLICATION_SECRET_KEY;
  }
};
