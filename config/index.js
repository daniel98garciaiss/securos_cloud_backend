require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080,
	CORS: process.env.CORS,
	
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	
	authJwtSecret: process.env.AUTH_JWT_SECRET,
	
	defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
	defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,

	publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,

	basicApiKeyToken: process.env.BASIC_API_KEY_TOKEN,
	middleApiKeyToken: process.env.MIDDLE_API_KEY_TOKEN,
	fullApiKeyToken: process.env.FULL_API_KEY_TOKEN,
}

module.exports = { config };