import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('/admin/client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // @Post()
  // create(@Body() createClientDto: CreateClientDto) {
  //   return this.clientsService.create(createClientDto);
  // }

  @Get('/store')
  @Render('admin/client/store')
  storeClient() {
    return;
  }

  @Post('/store')
  @Redirect('/admin/client')
  async store(@Body() createClientDto: CreateClientDto) {
    await this.clientsService.create(createClientDto);
  }

  // @Get()
  // findAll() {
  //   return this.clientsService.findAll();
  // }

  @Get('/')
  @Render('admin/client/index')
  async index() {
    const clients = await this.clientsService.findAll();
    const viewData = [];
    viewData['clients'] = clients;
    console.log(`Client List: ${JSON.stringify(clients)}`);
    return {
      viewData: viewData,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.clientsService.findOne(id);
  // }

  @Get('/:id')
  @Render('admin/client/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['client'] = await this.clientsService.findOne(+id);
    return {
      viewData: viewData,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(id, updateClientDto);
  // }

  @Post('/:id/update')
  @Redirect('/admin/client')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    await this.clientsService.update(+id, updateClientDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.clientsService.remove(id);
  // }

  @Post('/:id')
  @Redirect('/admin/user')
  async remove(@Param('id') id: number) {
    return this.clientsService.remove(+id);
  }
}
