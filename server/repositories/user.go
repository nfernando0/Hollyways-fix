package repositories

import (
	"hollyways/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUser() ([]models.User, error)
	GetUser(ID int) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUser() ([]models.User, error) {
	var users []models.User
	err := r.db.Preload("Funds").Preload("Donateds").Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Funds").Preload("Donateds").First(&user, ID).Error

	return user, err
}
