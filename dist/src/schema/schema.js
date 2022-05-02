"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
exports.schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
//export const authSchema = authDirectiveTransformer(schema);
