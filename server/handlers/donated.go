package handlers

import (
	"fmt"
	resultdto "hollyways/dto/result"
	"hollyways/models"
	"hollyways/repositories"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerDonated struct {
	DonatedRepository repositories.DonatedRepository
}

func HandlerDonated(donatedRepository repositories.DonatedRepository) *handlerDonated {
	return &handlerDonated{DonatedRepository: donatedRepository}
}

func (h *handlerDonated) FindDonated(c echo.Context) error {
	donates, err := h.DonatedRepository.FindDonated()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: donates})
}

func (h *handlerDonated) GetDonated(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var donated models.Donated
	donated, err := h.DonatedRepository.GetDonated(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: donated})
}

func (h *handlerDonated) CreateDonated(c echo.Context) error {

	var donatedIsMatch = false
	var donatedId int
	for !donatedIsMatch {
		donatedId = int(time.Now().Unix())
		donatedData, _ := h.DonatedRepository.GetDonated(donatedId)
		if donatedData.Id == 0 {
			donatedIsMatch = true
		}
	}

	userLogin := c.Get("userLogin")
	userID := userLogin.(jwt.MapClaims)["id"].(float64)
	donateAmount := c.FormValue("donate_amount")
	fundid, _ := strconv.Atoi(c.FormValue("fund_id"))

	donateInt, _ := strconv.Atoi(donateAmount)

	donated := models.Donated{
		Id:           donatedId,
		UserId:       int(userID),
		FundId:       fundid,
		DonateAmount: donateInt,
	}
	donated, err := h.DonatedRepository.CreateDonated(donated)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(donated.Id),
			GrossAmt: int64(donated.DonateAmount),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: donated.User.Fullname,
			Email: donated.User.Email,
		},
	}
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: snapResp})
}

func (h *handlerDonated) GetDonatedByUserID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	donated, err := h.DonatedRepository.GetDonatedByUserID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: donated})
}

func (h *handlerDonated) GetDonatedByFund(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	donated, err := h.DonatedRepository.GetDonatedByFund(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Data: donated})
}
func (h *handlerDonated) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	fmt.Print("ini payloadnya", notificationPayload)
	order_id, _ := strconv.Atoi(orderId)

	donated, _ := h.DonatedRepository.GetDonated(order_id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.DonatedRepository.UpdateDonated("pending", order_id)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			h.DonatedRepository.UpdateDonated("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		SendMail("success", donated)
		h.DonatedRepository.UpdateDonated("success", order_id)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.DonatedRepository.UpdateDonated("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.DonatedRepository.UpdateDonated("failed", order_id)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.DonatedRepository.UpdateDonated("pending", order_id)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: notificationPayload})
}

func SendMail(status string, donated models.Donated) {

	if status != donated.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "DumbMerch <demo.dumbways@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var Name = donated.User.Fullname
		var donate_amount = strconv.Itoa(donated.DonateAmount)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", donated.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, Name, donate_amount, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + donated.User.Email)
	}
}
