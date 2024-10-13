/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000';

export interface Message {
  pdf: string;
  highlights: any;
  watchers: { name: string; colorIndex: number }[];
}

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });
  }

  public sendMessage({ 
    pdf,
    highlights,
    watchers
  }: Message) {
    this.socket.emit('message', {
      pdf, highlights, watchers
    });
  }

  public onMessage(callback: ({ 
    pdf, highlights, watchers
  }: Message) => void) {
    this.socket.on('message', callback);
  }

  public offMessage(callback: ({ 
    pdf, highlights, watchers
  }: Message) => void) {
    this.socket.off('message', callback);
  }
}

export default new SocketService();
