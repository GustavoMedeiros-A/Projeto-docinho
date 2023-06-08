import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { Ingredient } from './typeorm/entities/Ingredients';
import { Product } from './typeorm/entities/Product';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'projeto_docinho_database',
      entities: [User, Ingredient, Product],
      synchronize: true,
    }),
    UsersModule,
    IngredientsModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
