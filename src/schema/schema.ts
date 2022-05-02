import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const schema = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers,
});

//export const authSchema = authDirectiveTransformer(schema);
