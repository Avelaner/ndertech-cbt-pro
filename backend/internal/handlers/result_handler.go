package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/models"
)

type ResultHandler struct{}

func NewResultHandler() *ResultHandler {
	return &ResultHandler{}
}

func (h *ResultHandler) GetScorecard(c *gin.Context) {
	sessionID := c.Param("sessionId")

	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"session_id":        sessionID,
			"candidate_name":    "Avela Marcel",
			"reg_number":        "JAMB2026172925",
			"exam_title":        "Biology Students Assessment 2027",
			"total_score":       75.0,
			"max_score":         231.0,
			"percentage":        32.5,
			"status":            "completed",
			"outcome":           "Failed Assessment",
			"breakdown": []gin.H{
				{"subject": "Chemistry - 2027", "score": 25.0, "total": 66.0, "percentage": 37.88},
				{"subject": "English Language - 2027", "score": 19.0, "total": 53.5, "percentage": 35.51},
				{"subject": "Mathematics - 2027", "score": 20.0, "total": 61.5, "percentage": 32.52},
				{"subject": "Physics - 2027", "score": 11.0, "total": 50.0, "percentage": 22.0},
			},
		})
		return
	}

	var session models.ExamSession
	if err := database.DB.Preload("Exam").Preload("Candidate").First(&session, sessionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Result not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"session_id":     session.ID,
		"candidate_name": session.Candidate.FullName,
		"reg_number":     session.Candidate.RegNumber,
		"exam_title":     session.Exam.Title,
		"score":          session.Score,
		"total_score":    session.TotalScore,
		"percentage":     session.Percentage,
		"passed":         session.Passed,
		"completed_at":   session.EndTime,
	})
}

func (h *ResultHandler) GetMyResults(c *gin.Context) {
	candidateIDVal, _ := c.Get("userID")
	candidateID, _ := candidateIDVal.(uint)

	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"results": []gin.H{
				{
					"session_id":   1,
					"exam_title":   "Biology Students 2027",
					"score":        75.0,
					"total_score":  231.0,
					"percentage":   32.5,
					"passed":       false,
					"completed_at": "2026-11-01 13:43:27",
				},
			},
		})
		return
	}

	var sessions []models.ExamSession
	database.DB.Preload("Exam").Where("candidate_id = ? AND status = ?", candidateID, "submitted").Order("created_at desc").Find(&sessions)

	c.JSON(http.StatusOK, gin.H{"results": sessions})
}
