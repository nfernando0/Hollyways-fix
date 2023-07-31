package handlers

import (
	"fmt"
	funddto "hollyways/dto/fund"
	resultdto "hollyways/dto/result"
	"hollyways/models"
	"hollyways/repositories"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerFund struct {
	FundRepository repositories.FundRepository
}

var path_file = "http://localhost:5000/uploads/"

func HandlerFund(fund repositories.FundRepository) *handlerFund {
	return &handlerFund{FundRepository: fund}
}

func (h *handlerFund) FindFund(c echo.Context) error {
	funds, err := h.FundRepository.FindFund()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}

	for i, p := range funds {
		funds[i].Image = path_file + p.Image
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: funds})
}

func (h *handlerFund) GetFund(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var fund models.Fund
	fund, err := h.FundRepository.GetFund(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest})
	}

	fund.Image = path_file + fund.Image

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fund})
}

func (h *handlerFund) CreateFund(c echo.Context) error {

	title := c.FormValue("title")
	donatiom := c.FormValue("donation")
	description := c.FormValue("description")
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	donationInt, _ := strconv.Atoi(donatiom)

	fund := models.Fund{
		Title:       title,
		Donation:    donationInt,
		Description: description,
		UserID:      int(userId),
	}

	fund, err := h.FundRepository.CreateFund(fund)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusInternalServerError})
	}
	fund, _ = h.FundRepository.GetFund(fund.Id)

	if err != nil {
		fmt.Println(err.Error())
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseFund(fund)})
}

func convertResponseFund(u models.Fund) funddto.FundResponse {
	return funddto.FundResponse{
		Title:       u.Title,
		Image:       u.Image,
		Description: u.Description,
		Donation:    u.Donation,
	}
}

func (h *handlerFund) GetFundUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	fundraising, err := h.FundRepository.GetFundUser(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fundraising})
}

func (h *handlerFund) GetFundDonate(c echo.Context) error {
	userLogin := c.Get("userLogin")
	donateId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	fundraising, err := h.FundRepository.GetFundDonate(donateId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fundraising})
}
