// external imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// middlewares array
const middlewares: any[] = [
    cors(),
    morgan("dev"),
    express.json(),
    bodyParser.json(),
    express.urlencoded({
        extended: true,
    }),
];

// function for use middlewares
export = (app: express.Application) => {
    middlewares.map((m) => {
        app.use(m);
    });
};