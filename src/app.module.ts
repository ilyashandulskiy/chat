import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { EventsModule } from './events/events.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ChatModule,
    MessageModule,
    EventsModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      renderPath: '.',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
