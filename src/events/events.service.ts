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
import { CreateMessageDto } from '../message/dto/createMessage.dto';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class EventsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleEvent(@MessageBody() data: CreateMessageDto, socket: Socket) {
    const { id } = await this.prisma.message.create({ data });
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { file: true },
    });
    console.log('new message', message);
    this.server.emit('message', message);
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
