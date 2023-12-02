import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { email } = createClientDto;

    // Check if the email is already registered
    const existingClient = await this.clientsRepository.findOne({
      where: { email },
    });
    if (existingClient) {
      throw new ConflictException(`Client with email ${email} already exists`);
    }

    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { clientID: id },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const existingClient = await this.findOne(id);
    this.clientsRepository.merge(existingClient, updateClientDto);
    return this.clientsRepository.save(existingClient);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientsRepository.remove(client);
  }
}
