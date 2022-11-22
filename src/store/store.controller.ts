import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createStoreBodyExample } from './dto/examples/body/create-store-body.example';
import {
  createStoreErrorResponseExample,
  createStoreSuccessResponseExample,
} from './dto/examples/response/create-store-response.example';
import { Public } from 'src/auth/public.guard';
import { getAllStoresResponseExample } from './dto/examples/response/get-all-stores-response.example';

@ApiTags('Stores')
@Controller('store')
// @UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Store' })
  @ApiBody({
    type: CreateStoreDto,
    description: 'Create Store',
    examples: {
      'Create Store': {
        value: createStoreBodyExample,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The store has been successfully created.',
    content: {
      'application/json': {
        examples: {
          'Store Created': {
            value: createStoreSuccessResponseExample,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Duplicate Store Error.',
    content: {
      'application/json': {
        examples: {
          'Store Created': {
            value: createStoreErrorResponseExample,
          },
        },
      },
    },
  })
  create(@Req() req: any, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(req.user.id, createStoreDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all Stores' })
  @ApiResponse({
    status: 200,
    description: 'Get all stores',
    content: {
      'application/json': {
        example: getAllStoresResponseExample,
      },
    },
  })
  findAll() {
    return this.storeService.findAll();
  }

  @ApiOperation({ summary: 'Get store by id' })
  @ApiResponse({
    status: 200,
    description: 'Store value has been successfully fetched.',
    content: {
      'application/json': {
        example: createStoreSuccessResponseExample,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
