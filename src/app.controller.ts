import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ERole } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { SignUpDto } from './auth/signup.dto';
import { UsersService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService: UsersService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('api/auth/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto.username, signUpDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/test/profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getProfile(req.user.username);
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get('api/test/user')
  getProtected() {
    return "protected data";
  }
}
// import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService, private authservice: AuthService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Req() req) {
//     return this.authservice.login(req.user);
//   }
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Req() req) {
    
//     return req.user;
//   }

// }

// // import { Controller, Get } from '@nestjs/common';
// // import { AppService } from './app.service';

// // @Controller()
// // export class AppController {
// //   constructor(private readonly appService: AppService) {}

// //   @Get()
// //   getHello(): string {
// //     return this.appService.getHello();
// //   }

  
// // }

