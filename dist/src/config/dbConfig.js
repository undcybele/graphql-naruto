"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const env_var_1 = require("env-var");
class DatabaseConfig {
    constructor(processEnv = process.env) {
        this.processEnv = processEnv;
        this.env = (0, env_var_1.from)(this.processEnv);
        this.name = this.env.get("DB_NAME").required().asString();
        this.host = this.env.get("DB_HOST").required().asString();
        this.port = null;
        this.password = this.env.get("DB_PASSWORD").required().asString();
        this.username = this.env.get("DB_USERNAME").required().asString();
        this.isClustered = this.env
            .get("DB_CLUSTERED")
            .default("true")
            .required()
            .asBoolStrict();
        const rawPort = this.env.get("DB_PORT").asString();
        if (this.isClustered && rawPort) {
            throw new env_var_1.EnvVarError("When in cluster mode a specific port cannot be given.");
        }
        if (!this.isClustered) {
            this.port = rawPort ? Number.parseInt(rawPort) : 27017;
        }
        if (this.port !== null && Number.isNaN(this.port)) {
            throw new env_var_1.EnvVarError(`env-var: "DB_PORT" should be a valid port number.`);
        }
        const protocol = this.isClustered ? "mongodb+srv" : "mongodb";
        const port = this.isClustered ? "" : `:${this.port}`;
        this.connectionString = `${protocol}://${this.username}:${this.password}@${this.host}${port}/${this.name}?retryWrites=true&w=majority`;
        Object.freeze(this);
    }
}
exports.dbConfig = new DatabaseConfig();
