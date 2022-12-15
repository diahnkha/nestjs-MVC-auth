import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { AuthExceptionFilter } from './auth/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from './auth/common/guards/authenticated.guard';
import { LoginGuard } from './auth/common/guards/login.guards';

@Controller()
@UseFilters(AuthExceptionFilter)

export class AppController {
  @Get('/')
  // @Render('login')
  index(@Request() req, @Res() res) {
    if (req.user){
      return res.redirect('/home');
    }
    return res.render('login', { message: req.flash('loginError') } );
    
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}