package models

import "time"

type Fund struct {
	Id          int               `json:"id" gorm:"primary_key:auto_increment"`
	Title       string            `json:"title" form:"title" gorm:"varchar(255)"`
	Image       string            `json:"image" form:"image" gorm:"varchar(255)"`
	Donation    int               `json:"donation" form:"donation" gorm:"varchar(255)"`
	Description string            `json:"description" form:"description" gorm:"varchar(255)"`
	UserId      int               `json:"user_id"`
	User        UserResponse      `json:"user"`
	Donateds    []DonatedResponse `json:"donateds" gorm:"foreignKey:UserId"`
	CreateAt    time.Time         `json:"create_at"`
}

type FundResponse struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Image       string `json:"image"`
	UserId      int    `json:"user_id"`
	User        User   `json:"-"`
	Donation    int    `json:"donation"`
	Description string `json:"description"`
}

func (FundResponse) TableName() string {
	return "funds"
}
