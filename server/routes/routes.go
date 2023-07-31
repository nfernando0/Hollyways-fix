package routes

import "github.com/labstack/echo/v4"

func ROuteInit(e *echo.Group) {
	UserRoute(e)
	AuthRoute(e)
	FundRoute(e)
	DonatedRoute(e)
}
