import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/exception/forbidden.exception';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { ValidatePipe } from '../common/pipe/validate.pipe';
// import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { ExcludeNullInterceptor } from '../common/interceptor/exclude.null.interceptor';
import { TransformInterceptor } from '../common/interceptor/transform.interceptor';
import { TimeoutInterceptor } from '../common/interceptor/timeout.interceptor';

@Controller('cats') // 装饰器指定路径前缀
@UseInterceptors(new LoggingInterceptor()) // 拦截器
@UseFilters(new HttpExceptionFilter()) // 控制器作用域
@UseInterceptors(new ExcludeNullInterceptor()) // 拦截器
@UseInterceptors(new TransformInterceptor()) // 拦截器
@UseInterceptors(new TimeoutInterceptor()) // 拦截器
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return ' This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  // 要将相应重定向到特定的URL，可以使用@Redirect 装饰器或特定于库的相应对象
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs/com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get(':id')
  findOne1(@Param('id') id): string {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findAll1(): Observable<any[]> {
    return of([]);
  }

  @Get()
  async findAll2(): Promise<any[]> {
    return [];
  }

  @Post()
  async create1(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a ne cat';
  }

  @Post()
  async create2(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll3(): Observable<Cat[]> {
    return of(this.catsService.findAll());
  }

  @Get()
  findAll4() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // 覆盖整个相应正文的实例
  @Get()
  async findAll5() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get()
  findAll6() {
    throw new ForbiddenException();
  }

  @Post()
  @Roles('admin')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidatePipe())
  async create4(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }
}
