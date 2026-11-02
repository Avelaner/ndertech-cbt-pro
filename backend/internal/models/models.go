package models

import (
	"time"
)

// Organization represents a school, CBT centre, or tenant institution
type Organization struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Name         string    `gorm:"size:255;not null" json:"name"`
	Slug         string    `gorm:"size:255;uniqueIndex" json:"slug"`
	ContactEmail string    `gorm:"size:255;not null" json:"contact_email"`
	ContactPhone string    `gorm:"size:50" json:"contact_phone"`
	Address      string    `gorm:"type:text" json:"address"`
	LogoURL      string    `gorm:"size:255" json:"logo_url"`
	PlanType     string    `gorm:"size:50;default:'standard'" json:"plan_type"`
	WalletBalance float64  `gorm:"default:0.0" json:"wallet_balance"`
	Status       string    `gorm:"size:50;default:'active'" json:"status"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// User represents admin, staff, or super-admin users
type User struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	FullName       string    `gorm:"size:255;not null" json:"full_name"`
	Email          string    `gorm:"size:255;uniqueIndex;not null" json:"email"`
	PasswordHash   string    `gorm:"size:255;not null" json:"-"`
	Role           string    `gorm:"size:50;default:'admin'" json:"role"` // 'super_admin', 'admin', 'invigilator'
	Status         string    `gorm:"size:50;default:'active'" json:"status"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Candidate represents a student or examination candidate
type Candidate struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	RegNumber      string    `gorm:"size:100;uniqueIndex;not null" json:"reg_number"`
	FullName       string    `gorm:"size:255;not null" json:"full_name"`
	Email          string    `gorm:"size:255" json:"email"`
	Phone          string    `gorm:"size:50" json:"phone"`
	PasswordHash   string    `gorm:"size:255;not null" json:"-"`
	PassportURL    string    `gorm:"size:255" json:"passport_url"`
	ProgramName    string    `gorm:"size:100;default:'General'" json:"program_name"`
	Status         string    `gorm:"size:50;default:'active'" json:"status"`
	PlanExpiresAt  *time.Time `json:"plan_expires_at"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Subject represents an academic course or testing subject
type Subject struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	SubjectCode    string    `gorm:"size:50;not null" json:"subject_code"`
	SubjectName    string    `gorm:"size:255;not null" json:"subject_name"`
	Description    string    `gorm:"type:text" json:"description"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Exam represents a scheduled or on-demand examination
type Exam struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	SubjectID      uint      `gorm:"index" json:"subject_id"`
	Subject        Subject   `gorm:"foreignKey:SubjectID" json:"subject,omitempty"`
	Title          string    `gorm:"size:255;not null" json:"title"`
	Description    string    `gorm:"type:text" json:"description"`
	DurationMinutes int      `gorm:"not null;default:60" json:"duration_minutes"`
	TotalQuestions int       `gorm:"default:50" json:"total_questions"`
	PassMark       float64   `gorm:"default:50.0" json:"pass_mark"`
	ShuffleQuestions bool    `gorm:"default:true" json:"shuffle_questions"`
	ShuffleOptions   bool    `gorm:"default:true" json:"shuffle_options"`
	IsActive       bool      `gorm:"default:true" json:"is_active"`
	StartDate      *time.Time `json:"start_date"`
	EndDate        *time.Time `json:"end_date"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Question represents a question item in the bank
type Question struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	SubjectID      uint      `gorm:"index" json:"subject_id"`
	QuestionType   string    `gorm:"size:50;default:'multiple_choice'" json:"question_type"` // 'multiple_choice', 'true_false', 'theory'
	QuestionText   string    `gorm:"type:text;not null" json:"question_text"`
	QuestionImage  string    `gorm:"size:255" json:"question_image,omitempty"`
	Marks          float64   `gorm:"default:1.0" json:"marks"`
	Explanation    string    `gorm:"type:text" json:"explanation,omitempty"`
	Options        []Option  `gorm:"foreignKey:QuestionID" json:"options,omitempty"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Option represents a choice for multiple-choice questions
type Option struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	QuestionID uint      `gorm:"index;not null" json:"question_id"`
	OptionText string    `gorm:"type:text;not null" json:"option_text"`
	OptionImage string   `gorm:"size:255" json:"option_image,omitempty"`
	IsCorrect  bool      `json:"is_correct"`
	CreatedAt  time.Time `json:"created_at"`
}

// ExamSession represents an ongoing or completed exam session for a candidate
type ExamSession struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	CandidateID    uint      `gorm:"index;not null" json:"candidate_id"`
	ExamID         uint      `gorm:"index;not null" json:"exam_id"`
	Exam           Exam      `gorm:"foreignKey:ExamID" json:"exam,omitempty"`
	Candidate      Candidate `gorm:"foreignKey:CandidateID" json:"candidate,omitempty"`
	StartTime      time.Time `json:"start_time"`
	EndTime        *time.Time `json:"end_time"`
	Status         string    `gorm:"size:50;default:'in_progress'" json:"status"` // 'in_progress', 'submitted', 'terminated'
	Score          float64   `gorm:"default:0.0" json:"score"`
	TotalScore     float64   `gorm:"default:0.0" json:"total_score"`
	Percentage     float64   `gorm:"default:0.0" json:"percentage"`
	Passed         bool      `gorm:"default:false" json:"passed"`
	ViolationsCount int      `gorm:"default:0" json:"violations_count"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// ExamResponse tracks candidate answers for each question during an exam
type ExamResponse struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	ExamSessionID uint      `gorm:"index;not null" json:"exam_session_id"`
	QuestionID    uint      `gorm:"index;not null" json:"question_id"`
	SelectedOptionID *uint  `json:"selected_option_id"`
	TheoryAnswer  string    `gorm:"type:text" json:"theory_answer,omitempty"`
	IsCorrect     bool      `gorm:"default:false" json:"is_correct"`
	ScoreAwarded  float64   `gorm:"default:0.0" json:"score_awarded"`
	AnsweredAt    time.Time `json:"answered_at"`
}

// ViolationLog tracks tab-switching, fullscreen exits, or suspicious events during exam
type ViolationLog struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	ExamSessionID uint      `gorm:"index;not null" json:"exam_session_id"`
	CandidateID   uint      `gorm:"index;not null" json:"candidate_id"`
	ViolationType string    `gorm:"size:100;not null" json:"violation_type"` // 'tab_switch', 'window_blur', 'fullscreen_exit'
	Details       string    `gorm:"type:text" json:"details"`
	Timestamp     time.Time `json:"timestamp"`
}

// Announcement provides system/organization notices to candidates or staff
type Announcement struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	OrganizationID uint      `gorm:"index" json:"organization_id"`
	Title          string    `gorm:"size:255;not null" json:"title"`
	Content        string    `gorm:"type:text;not null" json:"content"`
	Audience       string    `gorm:"size:50;default:'all'" json:"audience"`
	IsPinned       bool      `gorm:"default:false" json:"is_pinned"`
	CreatedAt      time.Time `json:"created_at"`
}
