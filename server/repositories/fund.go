package repositories

import (
	"hollyways/models"

	"gorm.io/gorm"
)

type FundRepository interface {
	FindFund() ([]models.Fund, error)
	GetFund(ID int) (models.Fund, error)
	CreateFund(fund models.Fund) (models.Fund, error)
	GetFundUser(UserID int) ([]models.Fund, error)
	GetFundDonate(DonatedID int) ([]models.Fund, error)
}

func RepositoryFund(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindFund() ([]models.Fund, error) {
	var funds []models.Fund
	err := r.db.Preload("Donated").Preload("User.Profile").Preload("Donated.User").Find(&funds).Error

	return funds, err
}

func (r *repository) GetFund(ID int) (models.Fund, error) {
	var fund models.Fund
	err := r.db.Preload("Donated").Preload("User.Profile").Preload("Donated.User").First(&fund, ID).Error

	return fund, err
}

func (r *repository) CreateFund(fund models.Fund) (models.Fund, error) {
	err := r.db.Create(&fund).Error

	return fund, err
}

func (r *repository) GetFundUser(UserID int) ([]models.Fund, error) {
	var funds []models.Fund
	err := r.db.Preload("Donated").Preload("User.Profile").Preload("Donated.User").Where("user_id = ?", UserID).Order("id DESC").Find(&funds).Error

	return funds, err
}

func (r *repository) GetFundDonate(DonatedID int) ([]models.Fund, error) {
	var funds []models.Fund
	err := r.db.Preload("Donated").Preload("User").Preload("Donated.User").Where("donated_id = ?", DonatedID).Or("user_id = ?", DonatedID).Preload("Donated").Order("id DESC").Find(&funds).Error

	return funds, err
}
