import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin/sign-in")
  async signIn(
    @Body() signInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(signInDto, res);
  }

  @Post("admin/sign-out")
  async signOutAdmin(
    @CookieGetter("admin_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refresh_token, res);
  }

  @Post("admin/:_id/refresh")
  async adminRefreshToken(
    @Param("_id") id: string, // ❌ ParseIntPipe olib tashlandi
    @CookieGetter("admin_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminRefreshToken(id, refresh_token, res);
  }

  @Post("customer/login")
  async logincust(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logincustomer(loginDto, res);
  }

  @Post("customer/logout")
  async logoutcust(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutCustomer(req, res);
  }

  @Post("customer/refresh")
  async refreshadmincust(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshCustomerToken(req, res);
  }
}
