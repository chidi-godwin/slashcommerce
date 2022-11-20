import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
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
  @Get()
  findAll(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @Patch('')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
