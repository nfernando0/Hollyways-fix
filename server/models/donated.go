package models

type Donated struct {
	ID           int        `json:"id" gorm:"primary_key:auto_increment"`
	UserID       int        `json:"user_id"`
	User         UserDonate `json:"user"`
	FundID       int        `json:"fund_id"`
	FundDonate   FundDonate `json:"fund"`
	DonateAmount int        `json:"donate_amount"`
	Status       string     `json:"status" gorm:"default:pending"`
}

type DonateFund struct {
	ID            int           `json:"donate_id" gorm:"primary_key:auto_increment"`
	FundID        int           `json:"fund_id"`
	FunDonateResp FunDonateResp `json:"fund" gorm:"foreignKey:FundID"`
	DonateAmount  int           `json:"donate_amount"`
	UserID        int           `json:"user_id"`
	User          UserDonate    `json:"user"`
	Status        string        `json:"status" gorm:"default:pending"`
}

func (DonateFund) TableName() string {
	return "donateds"
}
