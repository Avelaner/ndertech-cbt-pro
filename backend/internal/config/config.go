package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	DBDriver    string
	DBSource    string
	JWTSecret   string
	Environment string
}

func LoadConfig() *Config {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	driver := os.Getenv("DB_DRIVER")
	if driver == "" {
		driver = "postgres" // or "mysql"
	}

	source := os.Getenv("DATABASE_URL")
	if source == "" {
		// Default local PostgreSQL or fallback
		source = "host=localhost user=postgres password=postgres dbname=cbt_saas port=5432 sslmode=disable"
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "ndertech-cbt-pro-super-secret-jwt-key"
	}

	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"
	}

	return &Config{
		Port:        port,
		DBDriver:    driver,
		DBSource:    source,
		JWTSecret:   jwtSecret,
		Environment: env,
	}
}
