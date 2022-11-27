const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { format } = require("morgan");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactsRouter = require("./routes/contacts");
const userRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)]
  handler: (req, res, next) =>
    res
      .status(429)
      .json({ status: "error", code: 429, message: "Too many requests" }),
});

app.use(limiter);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(boolParser());
app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found !!!!!" });
});

app.use((err, req, res, next) => {
  console.error("ERROR_STACK:::", err.stack);
  const status = err.status || 500;
  res.status(status).json({
    status: status === 500 ? "fail" : "err",
    code: status,
    message: err.message,
  });
});
module.exports = app;
