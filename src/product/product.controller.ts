import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CREATE_STORE_EXAMPLE,
  CREATE_STORE_WITH_DISCOUNT_EXAMPLE,
} from './dto/examples/create-store.example';
import {
  CREATE_STORE_RESPONSE,
  GET_ALL_STORES_EXAMPLE,
} from './dto/examples/create-store-response.example';
import { StoreGuard } from '../auth/store.guard';
import { ROLE } from '../auth/role.enum';
import { ProductGuard } from '../auth/product.guard';

@Controller('product')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, StoreGuard(ROLE.OWNER))
  @Post('store/:storeId')
  @ApiOperation({ summary: 'Create a product for a store' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Create a product for a store',
    examples: {
      'Create Store': {
        value: CREATE_STORE_EXAMPLE,
      },
      'Create Store with discount': {
        value: CREATE_STORE_WITH_DISCOUNT_EXAMPLE,
      },
    },
  })
  @ApiParam({
    name: 'storeId',
    description: 'Store ID',
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    content: {
      'application/json': {
        example: CREATE_STORE_RESPONSE,
      },
    },
  })
  create(
    @Param('storeId') storeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto, +storeId);
  }

  // Get all products for a store
  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get all products for a store' })
  @ApiParam({
    name: 'storeId',
    description: 'Store ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully created.',
    content: {
      'application/json': {
        examples: {
          'Get all products for a store': {
            value: GET_ALL_STORES_EXAMPLE,
          },
        },
      },
    },
  })
  async getStoreProducts(@Param('storeId') storeId: string) {
    return this.productService.getStoreProducts(+storeId);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Products successfully retrieved',
    content: {
      'application/json': {
        examples: {
          'Get all products': {
            value: GET_ALL_STORES_EXAMPLE,
          },
        },
      },
    },
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get a product by Id' })
  @ApiParam({
    name: 'id',
    description: 'Product Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product details successfully retrieved',
    content: {
      'application/json': {
        example: CREATE_STORE_RESPONSE,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, ProductGuard())
  @ApiOperation({ summary: 'Update a product by Id' })
  @ApiParam({
    name: 'id',
    description: 'Product Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated',
    content: {
      'application/json': {
        example: CREATE_STORE_RESPONSE,
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, ProductGuard())
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by Id' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully deleted',
    content: {
      'application/json': {
        example: CREATE_STORE_RESPONSE,
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
