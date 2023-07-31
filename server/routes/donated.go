package routes

import (
	"hollyways/handlers"
	"hollyways/pkg/middleware"
	"hollyways/pkg/mysql"
	"hollyways/repositories"

	"github.com/labstack/echo/v4"
)

func DonatedRoute(e *echo.Group) {
	user := repositories.RepositoryDonated(mysql.DB)
	h := handlers.HandlerDonated(user)

	e.GET("/donateds", h.FindDonated)
	e.GET("/donated/:id", h.GetDonated)
	e.POST("/donated", middleware.Auth(h.CreateDonated))
	e.GET("/donated-user", middleware.Auth(h.GetDonatedUser))
	e.POST("/notification", h.Notification)
}
