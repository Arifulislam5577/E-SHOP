const notFound = (res, req, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };

// import ErrorHandler from "../utils/ErrorHandler.js";
// export const errorMiddleware = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";
//   err.stack = process.env.NODE_ENV === "production" ? null : err.stack;
//   res.status(err.statusCode).json({
//     status: "fail",
//     message: err.message,
//     stack: err.stack,
//   });
// };
