package repositories

import (
	"hollyways/models"

	"gorm.io/gorm"
)

type FundRepository interface {
	FindFund() ([]models.Fund, error)
	GetFund(ID int) (models.Fund, error)
	CreateFund(fund models.Fund) (models.Fund, error)
	GetFundById(ID int) ([]models.Fund, error)
}

func RepositoryFund(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindFund() ([]models.Fund, error) {
	var funds []models.Fund
	err := r.db.Preload("Donateds").Find(&funds).Error

	return funds, err
}

func (r *repository) GetFund(ID int) (models.Fund, error) {
	var fund models.Fund
	err := r.db.Preload("Donateds").First(&fund, ID).Error

	return fund, err
}

func (r *repository) CreateFund(fund models.Fund) (models.Fund, error) {
	err := r.db.Create(&fund).Error

	return fund, err
}

func (r *repository) GetFundById(ID int) ([]models.Fund, error) {
	var fund []models.Fund
	err := r.db.Where("user_id = ?", ID).Preload("Donateds").Find(&fund).Error

	return fund, err
}
