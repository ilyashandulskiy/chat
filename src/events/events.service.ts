import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from '../message/dto/message.dto';
import { Server } from 'net';

@WebSocketGateway({ cors: true })
export class EventsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: MessageDto) {
    console.log('new message', data);
    this.server.emit('message', data);
  }

  afterInit() {
    console.log('gateway init');
  }

  handleDisconnect() {
    console.log('gateway disconnect');
  }

  handleConnection() {
    console.log('gateway connecting');
  }
}
