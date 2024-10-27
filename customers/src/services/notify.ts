import producer from "../config/producer";

export async function notifyTopic(topic: string, message: unknown) {
  try {
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    const { message } = error as Error;
    console.log(`Falha ao notificar topico ${topic}: ${message}`);
  }
}
