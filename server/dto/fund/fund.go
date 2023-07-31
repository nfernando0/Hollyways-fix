package funddto

import "hollyways/models"

type FundRequest struct {
	Title       string `json:"title" form:"title" validate:"required"`
	Image       string `json:"image" form:"image" validate:"required"`
	Donation    int    `json:"donation" form:"donation" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
}

type FundResponse struct {
	Title       string      `json:"title" form:"title"`
	Image       string      `json:"image" form:"image"`
	UserID      int         `json:"user_id"`
	User        models.User `json:"user"`
	Donation    int         `json:"donation" form:"donation"`
	Description string      `json:"description" form:"description"`
}
