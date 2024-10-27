package db

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB struct {
	Database *mongo.Database
}

var mongoDB *MongoDB

func Init() (*MongoDB, error) {
	if mongoDB == nil {
		db, err := connect()
		if err != nil {
			return nil, err
		}
		mongoDB = &MongoDB{Database: db}
	}
	return mongoDB, nil
}

func GetConnection() *MongoDB {
	return mongoDB
}

func connect() (*mongo.Database, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	url := os.Getenv("DATABASE_URL")
	clientOptions := options.Client().ApplyURI(url)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, fmt.Errorf("erro ao conectar ao mongodb: %v", err.Error())
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("erro ao fazer ping no mongodb: %v", err.Error())
	}
	dbName := os.Getenv("DB_NAME")
	fmt.Println("Conexão ao MongoDB estabelecida com sucesso!")
	database := client.Database(dbName)
	return database, nil
}

func Disconnect() {
	if mongoDB == nil {
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoDB.Database.Client().Disconnect(ctx)
}
