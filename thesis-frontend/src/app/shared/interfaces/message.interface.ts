
export type MessageType = 'error' | 'success';

export interface IMessage {
  type: MessageType;
  text: string;
}
