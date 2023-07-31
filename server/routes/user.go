package routes

import (
	"hollyways/handlers"
	"hollyways/pkg/mysql"
	"hollyways/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Group) {
	user := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(user)

	e.GET("/users", h.FindUser)
	e.GET("/user/:id", h.GetUser)
}
