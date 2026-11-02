package database

import (
	"log"
	"strings"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"ndertech-cbt-backend/internal/config"
	"ndertech-cbt-backend/internal/models"
)

var DB *gorm.DB

func InitDB(cfg *config.Config) *gorm.DB {
	var dialector gorm.Dialector

	if strings.ToLower(cfg.DBDriver) == "mysql" {
		dialector = mysql.Open(cfg.DBSource)
	} else {
		dialector = postgres.Open(cfg.DBSource)
	}

	db, err := gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Printf("[WARN] Failed to connect to database (%s): %v. Running in disconnected/fallback mode.", cfg.DBDriver, err)
		return nil
	}

	log.Printf("[INFO] Successfully connected to %s database", cfg.DBDriver)

	// Auto-migrate tables
	err = db.AutoMigrate(
		&models.Organization{},
		&models.User{},
		&models.Candidate{},
		&models.Subject{},
		&models.Exam{},
		&models.Question{},
		&models.Option{},
		&models.ExamSession{},
		&models.ExamResponse{},
		&models.ViolationLog{},
		&models.Announcement{},
	)
	if err != nil {
		log.Printf("[WARN] AutoMigrate warning: %v", err)
	}

	DB = db
	return db
}
