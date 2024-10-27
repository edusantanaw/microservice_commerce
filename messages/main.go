package main

import (
	"log"

	"github.com/edusantanaw/microservice_commerce/messages/collections"
	"github.com/edusantanaw/microservice_commerce/messages/db"
	"github.com/edusantanaw/microservice_commerce/messages/handlers"
	"github.com/edusantanaw/microservice_commerce/messages/kafka"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar .env: %v", err)
	}
	_, err = db.Init()
	defer db.Disconnect()
	if err != nil {
		log.Fatalf(err.Error())
	}
	if err = collections.CreateCollections(); err != nil {
		log.Fatalf("Erro ao criar collection %s", err.Error())
	}
	customerHandler := &handlers.CustomerHandler{}
	kafka.Consumer("customer", customerHandler)
}
