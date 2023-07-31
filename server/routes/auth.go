package routes

import (
	"hollyways/handlers"
	"hollyways/pkg/middleware"
	"hollyways/pkg/mysql"
	"hollyways/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoute(e *echo.Group) {
	auth := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(auth)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}
