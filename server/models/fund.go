package models

type Fund struct {
	Id          int       `json:"id" gorm:"primary_key:auto_increment"`
	Title       string    `json:"title" form:"title" gorm:"type: varchar(255)"`
	Image       string    `json:"image" form:"image" gorm:"type: varchar(255)"`
	Donation    int       `json:"donation" form:"donation" gorm:"type: int"`
	Description string    `json:"description" form:"description" gorm:"type: varchar(255)"`
	UserID      int       `json:"user_id"`
	User        UserFund  `json:"user" gorm:"foreignKey:UserID"`
	DonatedID   int       `json:"donated_id"`
	Donated     []Donated `json:"donated"`
}

type FundDonate struct {
	Id          int        `json:"id"`
	UserID      int        `json:"user_id"`
	DonatedID   int        `json:"donated_id"`
	User        UserDonate `json:"-"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
}

type FunDonateResp struct {
	Id          int    `json:"id"`
	UserID      int    `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (FunDonateResp) TableName() string {
	return "funds"
}

func (FundDonate) TableName() string {
	return "funds"
}
