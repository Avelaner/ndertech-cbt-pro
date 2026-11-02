package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"ndertech-cbt-backend/internal/config"
	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/middleware"
	"ndertech-cbt-backend/internal/models"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type CandidateLoginRequest struct {
	RegNumber string `json:"reg_number" binding:"required"`
	Password  string `json:"password" binding:"required"`
}

type RegisterOrgRequest struct {
	OrgName      string `json:"org_name" binding:"required"`
	ContactEmail string `json:"contact_email" binding:"required"`
	ContactPhone string `json:"contact_phone"`
	AdminName    string `json:"admin_name" binding:"required"`
	AdminEmail   string `json:"admin_email" binding:"required"`
	Password     string `json:"password" binding:"required"`
}

func (h *AuthHandler) AdminLogin(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if database.DB == nil {
		// Mock response for quick dev preview if DB not yet connected
		c.JSON(http.StatusOK, gin.H{
			"message": "Demo mode: login successful",
			"token":   "demo-jwt-token-admin",
			"user": gin.H{
				"id":        1,
				"full_name": "Demo Admin",
				"email":     req.Email,
				"role":      "admin",
				"org_id":    1,
			},
		})
		return
	}

	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	token, err := middleware.GenerateToken(user.ID, user.OrganizationID, user.Role, user.Email, h.cfg.JWTSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":        user.ID,
			"full_name": user.FullName,
			"email":     user.Email,
			"role":      user.Role,
			"org_id":    user.OrganizationID,
		},
	})
}

func (h *AuthHandler) CandidateLogin(c *gin.Context) {
	var req CandidateLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number and password are required"})
		return
	}

	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Demo mode: candidate login successful",
			"token":   "demo-jwt-token-candidate",
			"candidate": gin.H{
				"id":           1,
				"reg_number":   req.RegNumber,
				"full_name":    "Avela Marcel (Demo)",
				"program_name": "General CBT Program",
				"org_id":       1,
			},
		})
		return
	}

	var candidate models.Candidate
	if err := database.DB.Where("reg_number = ?", req.RegNumber).First(&candidate).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid registration number or password"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(candidate.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid registration number or password"})
		return
	}

	token, err := middleware.GenerateToken(candidate.ID, candidate.OrganizationID, "candidate", candidate.RegNumber, h.cfg.JWTSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"candidate": gin.H{
			"id":           candidate.ID,
			"reg_number":   candidate.RegNumber,
			"full_name":    candidate.FullName,
			"email":        candidate.Email,
			"program_name": candidate.ProgramName,
			"org_id":       candidate.OrganizationID,
		},
	})
}

func (h *AuthHandler) RegisterOrganization(c *gin.Context) {
	var req RegisterOrgRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if database.DB == nil {
		c.JSON(http.StatusCreated, gin.H{
			"message": "Organization registered successfully (Demo Mode)",
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	org := models.Organization{
		Name:         req.OrgName,
		ContactEmail: req.ContactEmail,
		ContactPhone: req.ContactPhone,
		Status:       "active",
	}

	if err := database.DB.Create(&org).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create organization"})
		return
	}

	adminUser := models.User{
		OrganizationID: org.ID,
		FullName:       req.AdminName,
		Email:          req.AdminEmail,
		PasswordHash:   string(hashedPassword),
		Role:           "admin",
		Status:         "active",
	}

	if err := database.DB.Create(&adminUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Organization and Administrator created successfully",
		"org_id":  org.ID,
	})
}
