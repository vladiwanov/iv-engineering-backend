const app = require("../app");
const db = require("../model/db");
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`server starts on ${PORT} port`);
  });
}).catch((err) => {
  console.log(`server has not  been run because ${err.message} `);
});
