import { EnvVarError, from } from "env-var";

class DatabaseConfig {
	private env = from(this.processEnv);

	public name: string = this.env.get("DB_NAME").required().asString();
	public host: string = this.env.get("DB_HOST").required().asString();
	public port: number | null = null;
	public password: string = this.env.get("DB_PASSWORD").required().asString();
	public username: string = this.env.get("DB_USERNAME").required().asString();
	public isClustered: boolean = this.env
		.get("DB_CLUSTERED")
		.default("true")
		.required()
		.asBoolStrict();

	/** The fully qualified URL to connect to a MongoDB instance. */
	public connectionString: string;

	public constructor(private processEnv = process.env) {
		const rawPort = this.env.get("DB_PORT").asString();

		if (this.isClustered && rawPort) {
			throw new EnvVarError(
				"When in cluster mode a specific port cannot be given."
			);
		}

		if (!this.isClustered) {
			this.port = rawPort ? Number.parseInt(rawPort) : 27017;
		}

		if (this.port !== null && Number.isNaN(this.port)) {
			throw new EnvVarError(
				`env-var: "DB_PORT" should be a valid port number.`
			);
		}

		const protocol = this.isClustered ? "mongodb+srv" : "mongodb";
		const port = this.isClustered ? "" : `:${this.port}`;

		this.connectionString = `${protocol}://${this.username}:${this.password}@${this.host}${port}/${this.name}?retryWrites=true&w=majority`;

		Object.freeze(this);
	}
}
export const dbConfig = new DatabaseConfig();
