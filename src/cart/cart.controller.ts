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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import {
  ADD_ITEM_TO_CART_RESPONSE_EXAMPLE,
  GET_CART_RESPONSE_EXAMPLE,
} from './dto/examples/get-cart-response.example';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Controller('cart')
@ApiTags('Carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('item')
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully added to the cart',
    content: {
      'application/json': { example: ADD_ITEM_TO_CART_RESPONSE_EXAMPLE },
    },
  })
  async addItemToCart(
    @Req() req: any,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItemToCart(createCartItemDto, req.user.Cart.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get Cart for authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'User cart successfully retrieved',
    content: {
      'application/json': {
        examples: {
          'user cart': {
            value: GET_CART_RESPONSE_EXAMPLE,
          },
        },
      },
    },
  })
  async getCart(@Req() req: any) {
    return this.cartService.getCart(req.user.Cart.id);
  }

  @Patch('item/:id')
  @ApiOperation({ summary: 'Update item in cart' })
  @ApiParam({
    name: 'id',
    description: 'Cart item id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Cart item details successfully updated',
    content: {
      'application/json': {
        example: ADD_ITEM_TO_CART_RESPONSE_EXAMPLE,
      },
    },
  })
  async updateCartItem(
    @Param('id') id: number,
    @Body() updateCartDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(+id, updateCartDto);
  }

  @Delete('item/:id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({
    name: 'id',
    description: 'Cart item id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Item successfully removed from cart',
    content: {
      'application/json': {
        example: ADD_ITEM_TO_CART_RESPONSE_EXAMPLE,
      },
    },
  })
  async removeItem(@Param('id') id: number) {
    return this.cartService.removeCartItem(+id);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear Cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart successfully cleared',
    content: {
      'application/json': {
        example: {
          count: 2,
        },
      },
    },
  })
  async clearCart(@Req() req: any) {
    return this.cartService.clearCart(req.user.Cart.id);
  }

  @Get('total')
  @ApiOperation({ summary: 'Get Cart Total' })
  async getCartTotal(@Req() req: any) {
    return this.cartService.calculateCartTotal(req.user.Cart.id);
  }
}
