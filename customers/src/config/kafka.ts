import {Kafka} from "kafkajs"
import {config} from "dotenv"

config()

const KAFKA_BROKER = process.env.KAFKA_BROKER ?? "localhost:9092"

const kafka = new Kafka({
    clientId: "customer-app",
    brokers: [KAFKA_BROKER]
})

export default kafka