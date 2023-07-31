package models

type User struct {
	ID       int       `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string    `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Username string    `json:"username" form:"username" gorm:"type: varchar(255)"`
	Email    string    `json:"email" form:"email" gorm:"type: varchar(255)"`
	Phone    string    `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Password string    `json:"password" form:"password" gorm:"type: varchar(255)"`
	Profile  Profile   `json:"profile"`
	FundID   int       `json:"fund_id"`
	Fund     []Fund    `json:"fund"`
	Donated  []Donated `json:"donate"`
}

type UserFund struct {
	ID        int     `json:"id" gorm:"primary_key:auto_increment"`
	ProfileID int     `json:"-"`
	Profile   Profile `json:"-"`
	Username  string  `json:"username" form:"username" gorm:"type: varchar(255)"`
	Email     string  `json:"email" form:"email" gorm:"type: varchar(255)"`
	Phone     string  `json:"phone" form:"phone" gorm:"type: varchar(255)"`
}

type UserDonate struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Username string `json:"username" form:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" form:"email" gorm:"type: varchar(255)"`
	Phone    string `json:"phone" form:"phone" gorm:"type: varchar(255)"`
}

func (UserDonate) TableName() string {
	return "users"
}

func (UserFund) TableName() string {
	return "users"
}
