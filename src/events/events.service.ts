import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'net';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/createMessage.dto';

@WebSocketGateway({ cors: true })
export class EventsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: CreateMessageDto, socket: Socket) {
    console.log('new message', data);
    this.messageService.create(data);
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
