# swagger-express-ts
Generate and serve swagger.json

## Getting started
First, install [inversify-express-utils](https://www.npmjs.com/package/inversify-express-utils).

```sh
npm install inversify inversify-express-utils reflect-metadata --save
```

Install [swagger-express-ts](https://github.com/olivierlsc/swagger-express-ts).

```sh
npm install swagger-express-ts --save
```

## The Basics

### Step 1: configure express

```ts
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { VersionController } from "./version/version.controller";
import * as swagger from "./lib/swagger-specification";
import { SwaggerDefinition } from "swagger-express-ts";

// set up container
const container = new Container();

// bind your controllers to Controller
container.bind<interfaces.Controller>( TYPE.Controller )
    .to( VersionController ).whenTargetNamed( VersionController.TARGET_NAME );

// create server
const server = new InversifyExpressServer( container );

server.setConfig( ( app: any ) => {
    app.use( swagger.express( {
        definition : {
            basePath : "/", // Optional. Default is "/"
            info : {
                title : "Mon api",
                version : "1.0",
                contact : {},
                license : {
                    name : ""
                }
            },
            schemes : [ SwaggerDefinition.Scheme.HTTPS, SwaggerDefinition.Scheme.HTTP ], // Optional. Default is SwaggerDefinition.Scheme.HTTP
            produces : [ SwaggerDefinition.Produce.JSON, SwaggerDefinition.Produce.XML ], // Optional. Default is SwaggerDefinition.Produce.JSON
            consumes : [ SwaggerDefinition.Consume.JSON, SwaggerDefinition.Consume.XML ] // Optional. Default is SwaggerDefinition.Produce.JSON
        }
    } ) );
} );

server.setErrorConfig( ( app: any ) => {
    app.use( ( err: Error, request: express.Request, response: express.Response, next: express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

const app = server.build();
app.listen( 3000 );
console.info( "Server is listening on port : 3000 );

```

### Step 2: Decorate your controllers

```ts
import * as express from "express";
import { injectable } from "inversify";
import { controller, httpGet, interfaces, httpPost } from "inversify-express-utils";
import { ApiPath, ApiGet, ApiPost } from "swagger-express-ts";
import "reflect-metadata";
const pkg = require( "../../package.json" );

@ApiPath( {
    path : "/version",
    name : "Version",
    description : "Everything about version"
} )
@controller( "/version" )
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = "VersionController";

    @ApiGet( {
        description : "Version object",
        summary : "Get version"
    } )
    @httpGet( "/" )
    public getVersions( request: express.Request, response: express.Response, next: express.NextFunction ): void {
        response.json( {
            description : pkg.description,
            name : pkg.name,
            version : pkg.version,
        } );
    }
}

```

## For any questions, suggestions, or feature requests
[Please file an issue](https://github.com/olivierlsc/swagger-express-ts/issues)!
