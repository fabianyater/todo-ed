import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-23-21-229-200.compute-1.amazonaws.com',
      port: 5432,
      username: 'qkhsbikerxpfci',
      password:
        '38e40d76a8e2de28bfdde7300bcd4cf7b650ef482e39878c8867043126b0f03d',
      database: 'detuk0fvdb7gtd',
      entities: ['dist/entities/*.entity.js'],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UserModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
