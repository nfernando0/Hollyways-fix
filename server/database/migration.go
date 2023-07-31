package database

import (
	"fmt"
	"hollyways/models"
	"hollyways/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Profile{},
		&models.Fund{},
		&models.Donated{},
	)

	if err != nil {
		panic(err)
	}
	fmt.Println("Migration Successfully")
}
