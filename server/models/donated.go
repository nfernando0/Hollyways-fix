package models

import "time"

type Donated struct {
	Id           int          `json:"id" gorm:"primary_key:auto_increment"`
	DonateAmount int          `json:"donate_amount"`
	Status       string       `json:"status" gorm:"default:pending"`
	UserId       int          `json:"user_id"`
	FundId       int          `json:"fund_id"`
	Fund         FundResponse `json:"fund"`
	User         UserResponse `json:"user"`
	CreateAt     time.Time    `json:"create_at"`
}

type DonatedResponse struct {
	Id           int    `json:"id"`
	DonateAmount int    `json:"donate_amount"`
	UserId       int    `json:"user_id"`
	FundId       int    `json:"fund_id"`
	Status       string `json:"status" gorm:"default:pending"`
}

func (DonatedResponse) TableName() string {
	return "donateds"
}
