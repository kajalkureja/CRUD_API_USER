import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/user/user.service';
import { ERole } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await this.userService.findOne(user.username);

    return requiredRoles.some((role) => dbUser.roles?.some((r) => r.name == role));
  }
}