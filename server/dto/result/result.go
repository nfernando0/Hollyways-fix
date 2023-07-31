package resultdto

type SuccessResult struct {
	Data interface{} `json:"data"`
	Code int         `json:"code"`
}

type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
