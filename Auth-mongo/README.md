# The is an Auth Service

## Tech Used

Typescript
Express
MongoDB (Database)
Mongoose
Docker (for running MongoDB container)
Multer (for Image upload)
Sharp (for Image resize)

**_ About Auth Service _**

1. I used Model, View & Controller
2. -Controller folder: control the router logic
3. Middlewares folder: control the middlware logic
4. helpers folder: container required functions
5. db folder: Schema of USER

## Running a MongoDB Docker container

```
docker run -d -p 27017:27017 -v ~<folder>:data/db --name <name> mongodb
```

Stopping a Container:

```
docker container stop <container>
```

Rerunning the same Container :

1. Delete the previous
2. rerun the previous contianer by:

```
docker ps -a
docker start <container>
```

## Setup Typescript Environment

Commands:

```
npm init -y
npm i -D Typescript
npm i -D nodemon
npm i express mongoose cors body-parser compression cookie-parser ts-node sharp multer
npm i @types/express @types/mongoose @types/cors @types/body-parser @types/compression @types/cookie-parser @types/ts-node @types/multer

```

Make tsconfig.ts:

````
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "baseUrl": "src",
    "outDir": "dist",
    "sourceMap": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*"]
}
```

Make nodemon.json

```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "exec": "ts-node ./src/index.ts"
}
```

Enter in script package.json
```
"start": "nodemon"```
````
