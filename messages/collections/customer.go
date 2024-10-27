package collections

import (
	"context"
	"fmt"
	"time"

	"github.com/edusantanaw/microservice_commerce/messages/db"
)

func createCustomerCollection() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	db := db.GetConnection()
	if db == nil {
		return fmt.Errorf("conexao nao encontrada")
	}
	if err := db.Database.CreateCollection(ctx, "customer"); err != nil {
		return err
	}
	fmt.Println("collection criada")
	return nil
}
