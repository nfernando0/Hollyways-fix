package handlers

import (
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

func HandlerFund(fund repositories.FundRepository) *handlerFund {
	return &handlerFund{FundRepository: fund}
}

func (h *handlerFund) FindFund(c echo.Context) error {
	funds, err := h.FundRepository.FindFund()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}

	// for i, p := range funds {
	// 	imagePath := os.Getenv("PATH_FILE") + p.Image
	// 	funds[i].Image = imagePath
	// }

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: funds})
}

func (h *handlerFund) GetFund(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var fund models.Fund
	fund, err := h.FundRepository.GetFund(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest})
	}

	// fund.Image = os.Getenv("PATH_FILE") + fund.Image

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fund})
}

func (h *handlerFund) CreateFund(c echo.Context) error {

	// dataFile := c.Get("dataFile").(string)
	title := c.FormValue("title")
	donatiom := c.FormValue("donation")
	description := c.FormValue("description")
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	donationInt, _ := strconv.Atoi(donatiom)


	fund := models.Fund{
		Title:       title,
		// Image:       resp.SecureURL,
		Donation:    donationInt,
		Description: description,
		UserId:      int(userId),
	}

	fund, err := h.FundRepository.CreateFund(fund)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusInternalServerError})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fund})
}

func (h *handlerFund) GetFundById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	fund, err := h.FundRepository.GetFundById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fund})
}
