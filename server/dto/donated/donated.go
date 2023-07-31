package donateddto


type DonatedRequest struct {
	DonateAmount int `json:"donate_amount" form:"donate_amount" validate:"required"`
	// UserID       int `json:"user_id"`
	// FundID       int `json:"fund_id"`
	Status string `json:"status" form:"status" validate:"required"`
}

type DonateResponse struct {
	// ID           int               `json:"id"`
	// User         models.UserDonate `json:"user"`
	// Fund         models.FundDonate `json:"fund"`
	Status       string            `json:"status"`
	DonateAmount int               `json:"donate_amount" form:"donate_amount" validate:"required"`
}

type UpdateDonate struct {
	DonateAmount int `json:"donate_amount" form:"donate_amount" validate:"required"`
}
