export interface MessageBroker {
  publish: <TMessage>(message: TMessage, routingKey: string) => Promise<void>
}
