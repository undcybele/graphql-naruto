import express from "express";
import { graphqlHTTP } from "express-graphql";
import passport from "passport";
import mongoose from "mongoose";
import cors from "cors";
import { BasicStrategy } from "passport-http";
import { schema } from "./src/schema/schema";
import { dbConfig } from "./src/config/dbConfig";

const loggingMiddleware = (req: any, res: any, next: () => void) => {
	//console.log("ip:", req.ip);
	next();
};

// passport.use(
// 	new BasicStrategy(function (
// 		username: any,
// 		password: any,
// 		cb: (arg0: null, arg1: boolean) => any
// 	) {
// 		// const user = findUser(username, password);
// 		// if (user) return cb(null, true);
// 		// else return cb(null, false);
// 	})
// );

console.log(dbConfig.connectionString);
mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.connectionString)
	.then(() => {
		let app = express();
		//	app.use(loggingMiddleware);
		app.use(cors());

		app.use(
			"/graphql",
			//passport.authenticate("basic", { session: false }),
			graphqlHTTP((req: any, res: any) => ({
				schema: schema,
				graphiql: true,
				context: {
					loggedUser: req.user,
				},
			}))
		);
		app.listen(4000);
		console.log(
			"Running a GraphQL API server at http://localhost:4000/graphql"
		);
	})
	.catch((err) => {
		console.error(`Could not connect to database. Shutting down service...`);
		console.error(err);
		process.exit(1);
	});
