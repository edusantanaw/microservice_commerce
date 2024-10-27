package kafka

import (
	"fmt"
	"log"

	"github.com/IBM/sarama"
)

type EventHandler interface {
	Handler(message []byte) error
}

func Consumer(topic string, eventHandler EventHandler) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	consumer, err := sarama.NewConsumer([]string{"localhost:9092"}, config)
	if err != nil {
		log.Fatalf("Erro ao criar consumidor Kafka: %v", err)
	}
	defer consumer.Close()

	partitionConsumer, err := consumer.ConsumePartition(topic, 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatalf("Erro ao consumir partição: %v", err)
	}
	defer partitionConsumer.Close()

	for msg := range partitionConsumer.Messages() {
		fmt.Printf("Mensagem recebida no topico %s:  %s\n", topic, string(msg.Value))
		err := eventHandler.Handler(msg.Value)
		if err != nil {
			fmt.Println(err.Error())
		}
	}
}
