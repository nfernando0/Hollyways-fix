package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	// "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {
	var err error

	dsn := "root:@tcp(127.0.0.1:3306)/hollyways-web?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})


	if err != nil {
		panic(err)
	}
	fmt.Println("Connect to database")
}
