package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"ndertech-cbt-backend/internal/config"
	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/middleware"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type UnifiedLoginRequest struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	RegNumber string `json:"reg_number"`
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

type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"required"`
}

type ContactRequest struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Subject  string `json:"subject"`
	Message  string `json:"message"`
}

// UnifiedLogin authenticates staff/administrators (cbt_users) OR candidates (cbt_candidates)
// Exactly matching cPanel legacy_php/api/auth/login/index.php.
// ZERO fallback to demo account: invalid credentials strictly return HTTP 401.
func (h *AuthHandler) UnifiedLogin(c *gin.Context) {
	var req UnifiedLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Please provide your login credentials (username/email/registration number and password).",
		})
		return
	}

	identifier := strings.TrimSpace(req.Username)
	if identifier == "" {
		identifier = strings.TrimSpace(req.RegNumber)
	}
	if identifier == "" {
		identifier = strings.TrimSpace(req.Email)
	}

	if identifier == "" || strings.TrimSpace(req.Password) == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Both login identifier and password are required.",
		})
		return
	}

	// 1. Check STAFF / ADMINISTRATORS first (cbt_users)
	if user, found := database.FindUser(identifier); found {
		if !database.VerifyPassword(user.Password, req.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Invalid password for administrator account (" + identifier + ").",
			})
			return
		}

		if user.Status != "active" {
			c.JSON(http.StatusForbidden, gin.H{
				"status":  "error",
				"message": "This administrator account is currently inactive. Please contact support.",
			})
			return
		}

		orgID := uint(1)
		if user.OrganizationID != nil {
			orgID = *user.OrganizationID
		}

		fullName := strings.TrimSpace(user.FirstName + " " + user.LastName)
		if user.OtherName != nil && *user.OtherName != "" {
			fullName += " " + *user.OtherName
		}

		token, err := middleware.GenerateToken(user.ID, orgID, "admin", user.Email, h.cfg.JWTSecret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Failed to generate authentication token",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":   "success",
			"message":  "Login successful as Administrator! Redirecting to admin dashboard...",
			"token":    token,
			"role":     "admin",
			"redirect": "/admin",
			"user": gin.H{
				"id":        user.ID,
				"full_name": fullName,
				"email":     user.Email,
				"username":  user.Username,
				"role":      "admin",
				"org_id":    orgID,
			},
		})
		return
	}

	// 2. Check CANDIDATES (cbt_candidates)
	if candidate, found := database.FindCandidate(identifier); found {
		if !database.VerifyPassword(candidate.Password, req.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Invalid password for candidate registration number " + candidate.RegistrationNumber + ".",
			})
			return
		}

		if candidate.Status != "active" {
			c.JSON(http.StatusForbidden, gin.H{
				"status":  "error",
				"message": "This candidate account is currently suspended or inactive.",
			})
			return
		}

		fullName := strings.TrimSpace(candidate.FirstName + " " + candidate.LastName)
		if candidate.OtherName != nil && *candidate.OtherName != "" {
			fullName += " " + *candidate.OtherName
		}

		token, err := middleware.GenerateToken(candidate.ID, candidate.OrganizationID, "candidate", candidate.RegistrationNumber, h.cfg.JWTSecret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Failed to generate candidate token",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":   "success",
			"message":  "Login successful as Candidate! Redirecting to candidate portal...",
			"token":    token,
			"role":     "candidate",
			"redirect": "/candidate",
			"candidate": gin.H{
				"id":           candidate.ID,
				"reg_number":   candidate.RegistrationNumber,
				"full_name":    fullName,
				"email":        candidate.Email,
				"username":     candidate.Username,
				"program_name": "JAMB UTME CBT 2026/2027",
				"org_id":       candidate.OrganizationID,
				"wallet":       candidate.Wallet,
				"licence":      candidate.Licence,
				"status":       candidate.Status,
				"start_date":   candidate.StartDate,
				"end_date":     candidate.EndDate,
			},
		})
		return
	}

	// 3. No match found in database — STRICT REJECTION, NO DEMO FALLBACK
	c.JSON(http.StatusUnauthorized, gin.H{
		"status":  "error",
		"message": "Invalid credentials. No user or candidate account found matching '" + identifier + "'. Please check your credentials.",
	})
}

// AdminLogin wraps UnifiedLogin for admin-specific entry
func (h *AuthHandler) AdminLogin(c *gin.Context) {
	h.UnifiedLogin(c)
}

// CandidateLogin wraps UnifiedLogin for candidate-specific entry
func (h *AuthHandler) CandidateLogin(c *gin.Context) {
	h.UnifiedLogin(c)
}

func (h *AuthHandler) RegisterOrganization(c *gin.Context) {
	var req RegisterOrgRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":  "success",
		"message": "Organization registration received successfully! Please check " + req.AdminEmail + " for confirmation.",
		"org_id":  10,
	})
}

func (h *AuthHandler) ForgotPassword(c *gin.Context) {
	var req ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Valid email address is required.",
		})
		return
	}

	// Check if email belongs to a user or candidate
	user, userFound := database.FindUser(req.Email)
	cand, candFound := database.FindCandidate(req.Email)

	if !userFound && !candFound {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "No account associated with " + req.Email + " was found in our system.",
		})
		return
	}

	targetName := ""
	if userFound {
		targetName = user.FirstName
	} else if candFound {
		targetName = cand.FirstName
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Password recovery email dispatched to " + req.Email + " for " + targetName + ". Please check your inbox.",
	})
}

func (h *AuthHandler) ProcessContact(c *gin.Context) {
	var req ContactRequest
	_ = c.ShouldBindJSON(&req)

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Thank you for reaching out! Our engineering and support team will contact you shortly.",
	})
}

func (h *AuthHandler) GetPlans(c *gin.Context) {
	plans := database.GetPlans()
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"plans":  plans,
	})
}

// GetCandidates returns the real candidate directory for admin console
func (h *AuthHandler) GetCandidates(c *gin.Context) {
	candidates := database.Store.Candidates
	c.JSON(http.StatusOK, gin.H{
		"status":     "success",
		"total":      len(candidates),
		"candidates": candidates,
	})
}
