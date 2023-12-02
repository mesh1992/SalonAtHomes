import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('/admin/user')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminsService.create(createAdminDto);
  // }

  @Get('/store')
  @Render('admin/user/store')
  storeAdmin() {
    return;
  }

  @Post('/store')
  @Redirect('/admin/user')
  async store(@Body() createAdminDto: CreateAdminDto) {
    await this.adminsService.create(createAdminDto);
  }

  // @Get()
  // findAll() {
  //   return this.adminsService.findAll();
  // }

  @Get('/')
  @Render('admin/user/index')
  async index() {
    const admins = await this.adminsService.findAll();
    const viewData = [];
    viewData['admins'] = admins;
    console.log(`Admin List: ${JSON.stringify(admins)}`);
    return {
      viewData: viewData,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminsService.findOne(+id);
  // }

  @Get('/:id')
  @Render('admin/user/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['admin'] = await this.adminsService.findOne(+id);
    return {
      viewData: viewData,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminsService.update(+id, updateAdminDto);
  // }

  @Post('/:id/update')
  @Redirect('/admin/user')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    await this.adminsService.update(+id, updateAdminDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminsService.remove(+id);
  // }

  @Post('/:id')
  @Redirect('/admin/user')
  async remove(@Param('id') id: number) {
    return this.adminsService.remove(+id);
  }
}
