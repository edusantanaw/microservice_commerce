package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/edusantanaw/microservice_commerce/messages/db"
	"go.mongodb.org/mongo-driver/bson"
)

type CustomerHandler struct{}

type Customer struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}

func (c *CustomerHandler) Handler(message []byte) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	db := db.GetConnection()
	collection := db.Database.Collection("customer")
	customer := Customer{}
	err := json.Unmarshal(message, &customer)
	if err != nil {
		return err
	}
	insertCustomer := bson.D{
		{Key: "id", Value: customer.Id},
		{Key: "name", Value: customer.Name},
		{Key: "email", Value: customer.Email},
		{Key: "phone", Value: customer.Phone},
	}
	result, err := collection.InsertOne(ctx, insertCustomer)
	if err != nil {
		return fmt.Errorf("erro ao inserir documento: %v", err.Error())
	}
	fmt.Printf("Documento inserido com ID: %v\n", result.InsertedID)
	return nil
}
