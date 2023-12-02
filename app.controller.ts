import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { StaffMembersService } from './staff-members/staff-members.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly servicesService: ServicesService,
    private readonly staffMembersService: StaffMembersService,
  ) {}

  @Get()
  @Render('client/index')
  async root() {
    const viewData = [];
    const services = await this.servicesService.findAll();
    const staffs = await this.staffMembersService.findAll();
    viewData['services'] = services;
    viewData['staffs'] = staffs;
    console.log(`services: ${JSON.stringify(services)}`);
    console.log(`staffs: ${JSON.stringify(staffs)}`);
    return {
      viewData: viewData,
    };
  }
}
