import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuardSession } from './auth/authenticated.session.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Post /login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any{
    console.log("Finally Logged In");
    
    return {msg: "Logged In Successfully"};
  }

  @UseGuards(AuthenticatedGuardSession)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req): any {
    req.logout();
    return {msg: "Logged Out Successfully"}
  }
}
