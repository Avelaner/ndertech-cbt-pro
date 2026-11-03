package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"ndertech-cbt-backend/internal/database"
	"ndertech-cbt-backend/internal/models"
)

type ExamHandler struct{}

func NewExamHandler() *ExamHandler {
	return &ExamHandler{}
}

func (h *ExamHandler) ListExams(c *gin.Context) {
	if database.DB == nil {
		seedExams := database.GetExams()
		seedSubjects := database.GetSubjects()
		subjectMap := make(map[uint]string)
		for _, s := range seedSubjects {
			subjectMap[s.ID] = s.SubjectName
		}

		var examsList []gin.H
		for _, e := range seedExams {
			subjectName := "General Studies"
			if e.SubjectID != nil && subjectMap[*e.SubjectID] != "" {
				subjectName = subjectMap[*e.SubjectID]
			}
			examsList = append(examsList, gin.H{
				"id":               e.ID,
				"title":            e.Title,
				"exam_code":        e.ExamCode,
				"subject_name":     subjectName,
				"duration_minutes": e.DurationMinutes,
				"total_questions":  e.TotalQuestions,
				"pass_mark":        e.PassMark,
				"is_active":        e.Status == "published" || e.Status == "active",
			})
		}
		c.JSON(http.StatusOK, gin.H{"exams": examsList})
		return
	}

	var exams []models.Exam
	if err := database.DB.Preload("Subject").Where("is_active = ?", true).Find(&exams).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch exams"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"exams": exams})
}

type StartExamResponse struct {
	SessionID       uint              `json:"session_id"`
	ExamTitle       string            `json:"exam_title"`
	DurationMinutes int               `json:"duration_minutes"`
	Questions       []models.Question `json:"questions"`
	StartTime       time.Time         `json:"start_time"`
}

func (h *ExamHandler) StartExam(c *gin.Context) {
	examID := c.Param("id")
	candidateIDVal, _ := c.Get("userID")
	candidateID, _ := candidateIDVal.(uint)

	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"session_id":       999,
			"exam_title":       "Demo CBT Examination",
			"duration_minutes": 60,
			"start_time":       time.Now(),
			"questions": []gin.H{
				{
					"id":            1,
					"question_text": "Which organelle is known as the powerhouse of the cell?",
					"marks":         1.0,
					"options": []gin.H{
						{"id": 101, "option_text": "Ribosome"},
						{"id": 102, "option_text": "Mitochondria"},
						{"id": 103, "option_text": "Nucleus"},
						{"id": 104, "option_text": "Golgi apparatus"},
					},
				},
				{
					"id":            2,
					"question_text": "Solve for x in the linear equation: 3x + 9 = 24.",
					"marks":         1.0,
					"options": []gin.H{
						{"id": 201, "option_text": "x = 3"},
						{"id": 202, "option_text": "x = 5"},
						{"id": 203, "option_text": "x = 7"},
						{"id": 204, "option_text": "x = 8"},
					},
				},
				{
					"id":            3,
					"question_text": "What is the SI unit of electric current?",
					"marks":         1.0,
					"options": []gin.H{
						{"id": 301, "option_text": "Volt"},
						{"id": 302, "option_text": "Ampere"},
						{"id": 303, "option_text": "Ohm"},
						{"id": 304, "option_text": "Watt"},
					},
				},
			},
		})
		return
	}

	var exam models.Exam
	if err := database.DB.First(&exam, examID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exam not found"})
		return
	}

	// Create new session
	session := models.ExamSession{
		OrganizationID: exam.OrganizationID,
		CandidateID:    candidateID,
		ExamID:         exam.ID,
		StartTime:      time.Now(),
		Status:         "in_progress",
	}

	if err := database.DB.Create(&session).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initiate exam session"})
		return
	}

	// Fetch questions with options (excluding is_correct flag for candidate safety)
	var questions []models.Question
	database.DB.Preload("Options").Where("subject_id = ?", exam.SubjectID).Limit(exam.TotalQuestions).Find(&questions)

	c.JSON(http.StatusOK, gin.H{
		"session_id":       session.ID,
		"exam_title":       exam.Title,
		"duration_minutes": exam.DurationMinutes,
		"start_time":       session.StartTime,
		"questions":        questions,
	})
}

type SubmitExamRequest struct {
	Answers []struct {
		QuestionID uint  `json:"question_id"`
		OptionID   *uint `json:"option_id"`
	} `json:"answers"`
}

func (h *ExamHandler) SubmitExam(c *gin.Context) {
	sessionID := c.Param("id")
	var req SubmitExamRequest
	_ = c.ShouldBindJSON(&req)

	now := time.Now()

	if database.DB == nil {
		c.JSON(http.StatusOK, gin.H{
			"message":      "Exam submitted successfully (Demo)",
			"session_id":   sessionID,
			"score":        2.0,
			"total_score":  3.0,
			"percentage":   66.7,
			"passed":       true,
			"completed_at": now,
		})
		return
	}

	var session models.ExamSession
	if err := database.DB.Preload("Exam").First(&session, sessionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exam session not found"})
		return
	}

	// Compute score
	var totalMarks float64 = 0
	var obtainedMarks float64 = 0

	for _, ans := range req.Answers {
		var question models.Question
		if err := database.DB.First(&question, ans.QuestionID).Error; err == nil {
			totalMarks += question.Marks

			if ans.OptionID != nil {
				var opt models.Option
				if err := database.DB.Where("id = ? AND is_correct = ?", *ans.OptionID, true).First(&opt).Error; err == nil {
					obtainedMarks += question.Marks
				}
			}
		}
	}

	percentage := 0.0
	if totalMarks > 0 {
		percentage = (obtainedMarks / totalMarks) * 100.0
	}

	session.EndTime = &now
	session.Status = "submitted"
	session.Score = obtainedMarks
	session.TotalScore = totalMarks
	session.Percentage = percentage
	session.Passed = percentage >= session.Exam.PassMark

	database.DB.Save(&session)

	c.JSON(http.StatusOK, gin.H{
		"message":     "Exam submitted successfully",
		"score":       obtainedMarks,
		"total_score": totalMarks,
		"percentage":  percentage,
		"passed":      session.Passed,
	})
}

type ViolationRequest struct {
	ViolationType string `json:"violation_type" binding:"required"`
	Details       string `json:"details"`
}

func (h *ExamHandler) LogViolation(c *gin.Context) {
	sessionID := c.Param("id")
	var req ViolationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid violation report"})
		return
	}

	candidateIDVal, _ := c.Get("userID")
	candidateID, _ := candidateIDVal.(uint)

	if database.DB != nil {
		violation := models.ViolationLog{
			CandidateID:   candidateID,
			ViolationType: req.ViolationType,
			Details:       req.Details,
			Timestamp:     time.Now(),
		}
		database.DB.Create(&violation)
	}

	c.JSON(http.StatusOK, gin.H{"recorded": true, "session_id": sessionID})
}
