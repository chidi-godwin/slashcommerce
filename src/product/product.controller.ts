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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CREATE_STORE_EXAMPLE } from './dto/examples/create-store.example';
import {
  CREATE_STORE_RESPONSE,
  GET_ALL_STORES_EXAMPLE,
} from './dto/examples/create-store-response.example';

@Controller('product')
@ApiTags('Products')
// @UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product for a store' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Create a product for a store',
    examples: {
      'Create Store': {
        value: CREATE_STORE_EXAMPLE,
      },
    },
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
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
