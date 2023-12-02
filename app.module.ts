import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { OrdersModule } from './orders/orders.module';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { MailModule } from './mail/mail.module';
import { ServicesService } from './services/services.service';
import { Service } from './services/entities/service.entity';
import { StaffMember } from './staff-members/entities/staff-member.entity';
import { StaffMembersService } from './staff-members/staff-members.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ServicesModule,
    StaffMembersModule,
    OrdersModule,
    AdminsModule,
    ClientsModule,
    MailModule,
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([StaffMember]),
  ],
  controllers: [AppController],
  providers: [AppService, ServicesService, StaffMembersService],
})
export class AppModule {}
