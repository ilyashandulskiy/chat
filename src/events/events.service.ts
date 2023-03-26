import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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
  async handleEvent(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const { id } = await this.prisma.message.create({ data });
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { file: true },
    });
    console.log('new message', message, 'to', message.chatId);

    this.server.to(message.chatId).emit('message', message);
  }

  afterInit() {
    console.log('gateway init');
  }

  handleDisconnect() {
    console.log('gateway disconnect');
  }

  handleConnection(socket: Socket) {
    socket.join(socket.handshake.headers.chatid);
    console.log('gateway connecting', {
      id: socket.id,
      chat: socket.handshake.headers.chatid,
    });
  }
}
