export interface MessageBroker {
  publish: <TMessage>(message: TMessage) => void
}
