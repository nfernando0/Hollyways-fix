package handlers

import (
	resultdto "hollyways/dto/result"
	"hollyways/repositories"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(user repositories.UserRepository) *handler {
	return &handler{UserRepository: user}
}

func (h *handler) FindUser(c echo.Context) error {
	users, err := h.UserRepository.FindUser()

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: user})
}
