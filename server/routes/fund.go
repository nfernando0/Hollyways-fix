package routes

import (
	"hollyways/handlers"
	"hollyways/pkg/middleware"
	"hollyways/pkg/mysql"
	"hollyways/repositories"

	"github.com/labstack/echo/v4"
)

func FundRoute(e *echo.Group) {
	f := repositories.RepositoryFund(mysql.DB)
	h := handlers.HandlerFund(f)

	e.GET("/funds", h.FindFund)
	e.GET("/fund/:id", h.GetFund)
	e.POST("/fund", middleware.Auth(h.CreateFund))
	e.GET("/fund/user/:id", middleware.Auth(h.GetFundById))
}
