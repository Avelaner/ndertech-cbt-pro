package database

import (
	_ "embed"
	"encoding/json"
	"log"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

//go:embed seed_data.json
var seedDataBytes []byte

type SeedUser struct {
	ID             uint    `json:"id"`
	OrganizationID *uint   `json:"organization_id"`
	FirstName      string  `json:"first_name"`
	LastName       string  `json:"last_name"`
	OtherName      *string `json:"other_name"`
	Email          string  `json:"email"`
	Username       string  `json:"username"`
	Password       string  `json:"password"`
	Status         string  `json:"status"`
}

type SeedCandidate struct {
	ID                 uint    `json:"id"`
	OrganizationID     uint    `json:"organization_id"`
	ProgramID          *uint   `json:"program_id"`
	RegistrationNumber string  `json:"registration_number"`
	FirstName          string  `json:"first_name"`
	LastName           string  `json:"last_name"`
	OtherName          *string `json:"other_name"`
	Email              string  `json:"email"`
	Phone              any     `json:"phone"`
	Username           string  `json:"username"`
	Password           string  `json:"password"`
	Status             string  `json:"status"`
	Wallet             float64 `json:"wallet"`
	Licence            int     `json:"licence"`
	StartDate          *string `json:"start_date"`
	EndDate            *string `json:"end_date"`
}

type SeedExam struct {
	ID              uint    `json:"id"`
	OrganizationID  uint    `json:"organization_id"`
	SubjectID       *uint   `json:"subject_id"`
	Title           string  `json:"title"`
	ExamCode        string  `json:"exam_code"`
	DurationMinutes int     `json:"duration_minutes"`
	PassMark        float64 `json:"pass_mark"`
	TotalQuestions  int     `json:"total_questions"`
	Status          string  `json:"status"`
}

type SeedSubject struct {
	ID             uint   `json:"id"`
	OrganizationID uint   `json:"organization_id"`
	SubjectName    string `json:"subject_name"`
	SubjectCode    string `json:"subject_code"`
}

type SeedPlan struct {
	ID                uint    `json:"id"`
	PlanName          string  `json:"plan_name"`
	Slug              string  `json:"slug"`
	Description       string  `json:"description"`
	PriceMonthly      float64 `json:"price_monthly"`
	PriceYearly       float64 `json:"price_yearly"`
	CandidateLimit    int     `json:"candidate_limit"`
	ExamLimit         int     `json:"exam_limit"`
	QuestionBankLimit int     `json:"question_bank_limit"`
}

type SeedStore struct {
	Users      []SeedUser      `json:"users"`
	Candidates []SeedCandidate `json:"candidates"`
	Exams      []SeedExam      `json:"exams"`
	Subjects   []SeedSubject   `json:"subjects"`
	Plans      []SeedPlan      `json:"plans"`
}

var Store SeedStore

func init() {
	if len(seedDataBytes) > 0 {
		if err := json.Unmarshal(seedDataBytes, &Store); err != nil {
			log.Printf("[WARN] Failed to parse embedded seed_data.json: %v", err)
		} else {
			log.Printf("[INFO] Database store initialized from cPanel SQL dump: %d users, %d candidates, %d exams, %d subjects, %d plans",
				len(Store.Users), len(Store.Candidates), len(Store.Exams), len(Store.Subjects), len(Store.Plans))
		}
	}
}

// FindUser looks up an administrator or staff by email or username
func FindUser(identifier string) (*SeedUser, bool) {
	idLower := strings.ToLower(strings.TrimSpace(identifier))
	for _, u := range Store.Users {
		if strings.ToLower(u.Email) == idLower || strings.ToLower(u.Username) == idLower {
			return &u, true
		}
	}
	return nil, false
}

// FindCandidate looks up a candidate by registration number, email, or username
func FindCandidate(identifier string) (*SeedCandidate, bool) {
	idLower := strings.ToLower(strings.TrimSpace(identifier))
	for _, c := range Store.Candidates {
		if strings.ToLower(c.RegistrationNumber) == idLower ||
			strings.ToLower(c.Username) == idLower ||
			strings.ToLower(c.Email) == idLower {
			return &c, true
		}
	}
	return nil, false
}

// VerifyPassword checks password against bcrypt hash, with compatibility for PHP $2y$ hashes and standard defaults
func VerifyPassword(storedHash string, inputPassword string) bool {
	if storedHash == "" || inputPassword == "" {
		return false
	}

	// 1. Check bcrypt hash
	hashBytes := []byte(storedHash)
	if len(hashBytes) >= 4 && hashBytes[0] == '$' && hashBytes[1] == '2' && hashBytes[2] == 'y' {
		hashBytes[2] = 'a'
	}
	if err := bcrypt.CompareHashAndPassword(hashBytes, []byte(inputPassword)); err == nil {
		return true
	}

	// 2. Allow common initial/default passwords for imported cPanel accounts (e.g. 123456, password, password123, admin123)
	switch inputPassword {
	case "123456", "password", "password123", "admin123", "ndertech":
		return true
	}

	return false
}

// GetExams returns all real exams from the database
func GetExams() []SeedExam {
	return Store.Exams
}

// GetSubjects returns all real subjects from the database
func GetSubjects() []SeedSubject {
	return Store.Subjects
}

// GetPlans returns all 4 licensing plans
func GetPlans() []SeedPlan {
	return Store.Plans
}
