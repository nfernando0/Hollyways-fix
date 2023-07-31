package models

type Profile struct {
	Id     int    `json:"id" gorm:"primary_key:auto_increment"`
	Image  string `json:"image" form:"image" gorm:"type: varchar(255)"`
	UserID int    `json:"user_id"`
}
