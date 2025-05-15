import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { LoginDto } from './dto/login.dto';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from "bcrypt"
import { Request, Response } from 'express';
import { CustomerDocument } from '../customer/schemas/customer.schema';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    console.log(admin);
    if (!admin) {
      throw new UnauthorizedException("email yoki pas xatooku");
    }

    const isValid = bcrypt.compare(loginDto.password, admin.hashed_password);

    if (!isValid) {
      throw new UnauthorizedException("email yoki pas xatooku");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("admin_refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();
    return { message: "zor", accessToken, adminId: admin._id };
  }

  async signOut(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("admin not");
    }

    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("admin_refresh_token");

    return { message: "Eson-omon chiqib olding" };
  }
  async adminRefreshToken(id: string, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (id !== decodedToken.id) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const user = await this.adminService.findOne(id);
    if (!user || !user.hashed_refresh_token) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const match = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!match) {
      throw new ForbiddenException("Refresh token mos emas");
    }

    const tokens = await this.generateTokens(user);

    user.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();

    res.cookie("admin_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }

  ////// =============================Customer=======================================================

  async CustomergenerateToken(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      phone: customer.phone,
      email: customer.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  
  async logincustomer(loginDto: LoginDto, res: Response) {
    const customer = await this.customerService.findByEmail(loginDto.email);
    console.log(customer);

    if (!customer) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      customer.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki parol xato 2");
    }

    const { accessToken, refreshToken } =
      await this.CustomergenerateToken(customer);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const refresh_token = await bcrypt.hash(refreshToken, 7);
    customer.hashed_password = refresh_token;
    await customer.save();
    return {
      message: "Xush kelibsiz",
      customerId: customer._id,
      accessToken,
    };
  }

  async logoutCustomer(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new BadRequestException("Token yo'q yoki noto'g'ri");
    }

    const customer =
      await this.customerService.findCustomerByRefresh(refreshToken);

    if (!customer) {
      throw new BadRequestException("Token noto'g'ri yoki customer topilmadi");
    }

    customer.hashed_refresh_token = "";
    await customer.save();

    res.clearCookie("refresh_token");

    return { message: "Muvoffaqiyatli chiqib ketdingiz" };
  }

  async refreshCustomerToken(req: Request, res: Response) {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      throw new UnauthorizedException("Token mavjud emas");
    }

    const customer = await this.customerService.findAll();
    const foundCustomer = customer.find(async (cust) => {
      if (!cust.hashed_refresh_token) return false;
      return await bcrypt.compare(oldRefreshToken, cust.hashed_refresh_token);
    });

    if (!foundCustomer) {
      throw new ForbiddenException("Refresh token yaroqsiz");
    }

    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const { accessToken, refreshToken } = await this.CustomergenerateToken(
        foundCustomer as CustomerDocument
      );

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });

      const hashedRefresh = await bcrypt.hash(refreshToken, 7);
      foundCustomer.hashed_refresh_token = hashedRefresh;
      await foundCustomer.save();

      return {
        accessToken,
        message: "Yangi tokenlar muvaffaqiyatli yaratildi",
      };
    } catch (error) {
      throw new ForbiddenException("Token yaroqsiz yoki muddati o'tgan");
    }
  }
}
