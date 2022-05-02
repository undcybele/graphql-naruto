"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./src/schema/schema");
const dbConfig_1 = require("./src/config/dbConfig");
const loggingMiddleware = (req, res, next) => {
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
//const connect = `mongodb+srv://admin:adminpass@cluster0.sp9iv.mongodb.net/narutoDB?retryWrites=true&w=majority`;
console.log(dbConfig_1.dbConfig.connectionString);
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(dbConfig_1.dbConfig.connectionString)
    .then(() => {
    let app = (0, express_1.default)();
    //	app.use(loggingMiddleware);
    app.use((0, cors_1.default)());
    app.use("/graphql", 
    //passport.authenticate("basic", { session: false }),
    (0, express_graphql_1.graphqlHTTP)((req, res) => ({
        schema: schema_1.schema,
        graphiql: true,
        context: {
            loggedUser: req.user,
        },
    })));
    app.listen(4000);
    console.log("Running a GraphQL API server at http://localhost:4000/graphql");
})
    .catch((err) => {
    console.error(`Could not connect to database. Shutting down service...`);
    console.error(err);
    process.exit(1);
});
