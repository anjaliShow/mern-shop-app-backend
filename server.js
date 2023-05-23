const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const clodinary = require('cloudinary');

//Handling Uncaught Exception(Error)
process.on('uncaughtException', (err) => {
  console.log(`Error ${err.message}`);
  console.log('Shutting Down The Server Due To  Uncaught Exception');
  // process.exit(1);   //for stop the server
});

//config
dotenv.config({ path: 'config/config.env' });

//connecting database
connectDatabase();

//cloudinary
clodinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Port is running on ${process.env.PORT}`);
});

// console.log(youtube);  //Handling Uncaught Exception(Error)

//Unhandled Promise Rejection (Error)
process.on('unhandledRejection', (err) => {
  console.log(`Error ${err.message}`);
  console.log('Shutting Down The Server Due To Unhandled Promise Rejection');

  server.close(() => {
    process.exit(1);
  });
});
