package models

type User struct {
	Id       int               `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string            `json:"fullname" form:"fullname" gorm:"varchar(255)"`
	Username string            `json:"username" form:"username" gorm:"varchar(255)"`
	Email    string            `json:"email" form:"email" gorm:"varchar(255)"`
	Password string            `json:"password" form:"password" gorm:"varchar(255)"`
	Donateds []DonatedResponse `json:"donateds" gorm:"foreignKey:UserId"`
	Funds    []FundResponse            `json:"funds" gorm:"foreignKey:UserId"`
}

type UserResponse struct {
	Id       int    `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string `json:"fullname" form:"fullname" gorm:"varchar(255)"`
	Email    string `json:"email" form:"email" gorm:"varchar(255)"`
}

func (UserResponse) TableName() string {
	return "users"
}
