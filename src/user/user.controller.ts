import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  user,
  userWithStoreOwner,
} from './dto/examples/response/create-user-response.example';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.guard';
import {
  createStoreOwnerExample,
  createUserExample,
} from './dto/examples/body/create-user-body.example';
import { UpdateUserExample } from './dto/examples/body/update-user.example';

@Controller('user')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Create User',
    examples: {
      'Create User': {
        value: createUserExample,
        description: 'Create User/Customer',
      },
      'Create Shop Owner': {
        value: createStoreOwnerExample,
        description: 'Create Store Owner, a user that can create stores',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    content: {
      'application/json': {
        examples: {
          'User Created': {
            value: user,
          },
          'Store Owner Created': {
            value: userWithStoreOwner,
          },
        },
      },
    },
  })
  @Post('signup')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user Details' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully fetched.',
    content: {
      'application/json': {
        example: user,
      },
    },
  })
  @Get()
  findAll(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
    description: 'Update User',
    examples: {
      'Update User': {
        value: UpdateUserExample,
        description: 'Update User/Customer',
      },
    },
  })
  @Patch('')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a user's account" })
  @ApiResponse({
    status: 200,
    description: 'The user account has been successfully deleted.',
    content: {
      'application/json': {
        example: user,
      },
    },
  })
  @Delete('')
  remove(@Req() req) {
    return this.userService.remove(req.user.id);
  }
}
