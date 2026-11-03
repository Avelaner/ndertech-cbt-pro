package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"ndertech-cbt-backend/internal/config"
	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/handlers"
	"ndertech-cbt-backend/internal/middleware"
)

func main() {
	cfg := config.LoadConfig()

	// Initialize Database connection
	database.InitDB(cfg)

	// Gin Router
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()

	// CORS Configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Accept"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	r.Use(cors.New(corsConfig))

	// Handlers
	authHandler := handlers.NewAuthHandler(cfg)
	examHandler := handlers.NewExamHandler()
	questionHandler := handlers.NewQuestionHandler()
	resultHandler := handlers.NewResultHandler()

	// Public routes
	r.GET("/api/health", func(c *gin.Context) {
		dbStatus := "connected"
		if database.DB == nil {
			dbStatus = "disconnected (demo fallback)"
		}
		c.JSON(http.StatusOK, gin.H{
			"status":      "ok",
			"app":         "Ndertech CBT Pro Backend",
			"version":     "1.0.0",
			"db_status":   dbStatus,
			"environment": cfg.Environment,
		})
	})

	api := r.Group("/api")
	{
		// Authentication
		auth := api.Group("/auth")
		{
			auth.POST("/login", authHandler.AdminLogin)
			auth.POST("/candidate-login", authHandler.CandidateLogin)
			auth.POST("/register-org", authHandler.RegisterOrganization)
			auth.POST("/forgot-password", authHandler.ForgotPassword)
		}

		// Public Utilities & Plans
		api.POST("/contact/process-contact", authHandler.ProcessContact)
		api.GET("/plans", authHandler.GetPlans)

		// Public/Protected Exams
		exams := api.Group("/exams")
		{
			exams.GET("", examHandler.ListExams)
			exams.POST("/:id/start", examHandler.StartExam)
			exams.POST("/:id/submit", examHandler.SubmitExam)
			exams.POST("/:id/violation", examHandler.LogViolation)
		}

		// Questions
		questions := api.Group("/questions")
		{
			questions.GET("", questionHandler.ListQuestions)
			questions.POST("", questionHandler.CreateQuestion)
		}

		// Results
		results := api.Group("/results")
		{
			results.GET("/:sessionId", resultHandler.GetScorecard)
			results.GET("/my-results", resultHandler.GetMyResults)
		}

		// Protected Admin Routes
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(cfg.JWTSecret))
		admin.Use(middleware.RequireRole("admin", "super_admin"))
		{
			admin.GET("/stats", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{
					"total_candidates": 450,
					"active_exams":     12,
					"completed_tests":  1240,
					"organizations":    5,
				})
			})
		}
	}

	log.Printf("[INFO] Server starting on port :%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("[FATAL] Server failed: %v", err)
	}
}
