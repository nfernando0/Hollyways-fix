package repositories

import (
	"hollyways/models"

	"gorm.io/gorm"
)

type DonatedRepository interface {
	FindDonated() ([]models.Donated, error)
	GetDonated(ID int) (models.Donated, error)
	UpdateDonated(status string, orderId int) error
	CreateDonated(donated models.Donated) (models.Donated, error)
	GetDonatedUser(UserID int) ([]models.Donated, error)
}

func RepositoryDonated(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindDonated() ([]models.Donated, error) {
	var donates []models.Donated
	err := r.db.Preload("FundDonate").Preload("User").Find(&donates).Error

	return donates, err
}

func (r *repository) GetDonated(ID int) (models.Donated, error) {
	var donated models.Donated
	err := r.db.Preload("FundDonate").Preload("User").Order("id DESC").First(&donated, ID).Error

	return donated, err
}

func (r *repository) CreateDonated(donated models.Donated) (models.Donated, error) {
	err := r.db.Create(&donated).Error

	return donated, err
}

func (r *repository) GetDonatedUser(UserID int) ([]models.Donated, error) {
	var donates []models.Donated
	err := r.db.Preload("FundDonate").Preload("User").Where("user_id = ?", UserID).Order("id DESC").Find(&donates).Error

	return donates, err
}

func (r *repository) UpdateDonated(status string, orderId int) error {
	var donated models.Donated
	err := r.db.Preload("User").Order("id DESC").First(&donated, orderId).Update("status", status).Error

	if status != donated.Status && status == "success" {
		var fund models.Fund
		r.db.First(&fund, donated.FundID)
		r.db.Save(&fund)
	}

	donated.Status = status
	err = r.db.Save(&donated).Error

	return err
}
