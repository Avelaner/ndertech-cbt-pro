package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/models"
)

type QuestionHandler struct{}

func NewQuestionHandler() *QuestionHandler {
	return &QuestionHandler{}
}

func (h *QuestionHandler) ListQuestions(c *gin.Context) {
	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{"questions": []models.Question{}})
		return
	}

	var questions []models.Question
	if err := database.DB.Preload("Options").Find(&questions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load questions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions})
}

func (h *QuestionHandler) CreateQuestion(c *gin.Context) {
	var q models.Question
	if err := c.ShouldBindJSON(&q); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if database.DB != nil {
		if err := database.DB.Create(&q).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save question"})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Question created successfully", "question": q})
}
