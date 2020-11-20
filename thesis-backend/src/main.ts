import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors:
            {
                origin: ['http://localhost:4200', 'http://localhost:3001'],
//                origin: 'http://localhost:4200',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                preflightContinue: false
            }
    });
    // set default app prefix with api so that it is not necessary in each controller
    app.setGlobalPrefix('api');
    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
