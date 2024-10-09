import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
// previous
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

// import routes
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";

// routes
// healthcheck route
app.use("/api/v1/healthCheck", healthCheckRouter);
// user routes
app.use("/api/v1/users", userRouter);
// product routes
app.use("/api/v1/product", productRouter);
//cart routes
app.use("/api/v1/cart", cartRouter);

export { app };
