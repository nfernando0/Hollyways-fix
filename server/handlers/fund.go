package handlers

import (
	"context"
	"fmt"
	funddto "hollyways/dto/fund"
	resultdto "hollyways/dto/result"
	"hollyways/models"
	"hollyways/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// var path_file = "http://localhost:5000/uploads/"

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

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: funds})
}

func (h *handlerFund) GetFund(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var fund models.Fund
	fund, err := h.FundRepository.GetFund(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: fund})
}

func (h *handlerFund) CreateFund(c echo.Context) error {

	dataFile := c.Get("dataFile").(string)
	title := c.FormValue("title")
	donation := c.FormValue("donation")
	description := c.FormValue("description")

	donationInt, _ := strconv.Atoi(donation)

	request := funddto.FundRequest{
		Title:       title,
		Image:       dataFile,
		Donation:    donationInt,
		Description: description,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "hollyways"})

	if err != nil {
		fmt.Println(err.Error())
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	fund := models.Fund{
		Title:       request.Title,
		Image:       resp.SecureURL,
		Donation:    request.Donation,
		Description: request.Description,
		UserId:      int(userId),
	}

	fund, err = h.FundRepository.CreateFund(fund)
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
