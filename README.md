# About

This is a backend REST-API authentication and authorization template written on NestJS.

## Installation
     1) git clone https://github.com/jadegnew/auth_nestjs.git
     2) npm install
### **Important**
Make sure to create an .env file in root directory with this content:  

|FIELD|VALUE|
|----------------|-------------------------------|
|POSTGRES_HOST|`DB host`|
|POSTGRES_PORT|`DB port`|
|POSTGRES_USER|`DB username`|
|POSTGRES_PASSWORD|`DB password`|
|POSTGRES_DB|`DB name`|
|HOST|`Server host`|
|PORT|`Server port`|
|JWT_SECRET|`Your secret key`|
|JWT_EXPIRATION_TIME|`Expiration time of your access token`|

## Current endpoints

```mermaid
graph TD;
    /-->/auth;
    /auth-->/registration;
    /auth-->/login;
    /auth-->/logout;
```
### Request examples

 - `@POST`  registration
```go
{ 
	"email": "someemail@gmail.com",
	"username": "somename",
	"password": "somepassword"
}
```

 - `@POST`  login
```go
{ 
	"email": "someemail@gmail.com",
	"password": "somepassword"
}
```

 - `@Get`  logout
 ```go
 Empty body
 ```
 
 # Usage
Please note, that mechanisms to hide password from response are not added yet, so we can see password="" in response. I`ll deal with that later.
## Registration
### Registration  attempt on nonexistent email
![Registration  attempt on nonexistent email](https://lh3.googleusercontent.com/pw/AMWts8CKfvgssKiwwE8E-3_9EW5hScwzKoVkl6AVZe48aioesFR8qxRRuguOHgr2V_BtBtnVcm8j0Sw5j2uuG9cNW4GB4xqAnXiUICfUiRhWN7zJI3V9aVRiPx4pXH5sRwHnsysqgxtCVCao2-L2Zfiv5V8=w866-h644-no?authuser=0)
### Registration attempt on existing email
![Registration attempt on existing email](https://lh3.googleusercontent.com/pw/AMWts8B5PELX6EjUDEsTjfgiXyYwG6h5af6abCCSmsIULCW88uysp0ZDMgrdzolzE--gbs3TLGFeoN4hf8eVLHAXX2YR-eXfxoSxhme9JjFV_KituKsHe6BhGltLtOPM48-w0F3RmlZrak8GfJlA6O460bc=w863-h669-no?authuser=0)

## Login
### Login attempt with correct data![Login attempt with correct data](https://lh3.googleusercontent.com/pw/AMWts8C34yLelr7zrqqfKG-uoFzTDZpSoZkD1jr9dSxSn_DIxeyQ5DUKBrI4EX-OktzlOPoemj2KA9YiGNUaoGsPmyoozMLfAt6EDiLD0UbY3JjxcKXlwLNlgG55IChCW4k9gwebAgte7KvF5LbxvNy0ZMc=w861-h668-no?authuser=0)
### Login attempt with incorrect data
![Login attempt with incorrect data](https://lh3.googleusercontent.com/pw/AMWts8D4PAHaGDOW0oyGj9NswL4Fxox8SYY8BS6kkLw0hUOyfSfYnBtFfv3p9jfYaH_R5P_suVne2rbVjuRR8__NO7bAQ6yS3kvC-osRRgl5xFDOMUgav8QndllePKlYwFdTjb95zc21zVqFdV5R2_2h7uc=w863-h715-no?authuser=0)
## Logout
![Logout](https://lh3.googleusercontent.com/pw/AMWts8CORrvlrUQ1tQyWUlCGBrDU03gsXbdbQvZeVPhVPA8GNM2Z1gSTnJ9C03y8kdjy8JbIZJYOpCBpP7MRedwgYY9pD8OZ2wuolk1TJYh07QZSQycc43dLhr4PlDqKxPZd9LdT10VyCMyIHemodbwwnMc=w867-h669-no?authuser=0)

# How to use JWT auth guards
To use access token validation in any endpoint that need authorization you might follow this steps:

 - Create controller for the route
 - Add `JwtAuthenticationGuard` to this controller
 - Create the logic you need

### Example:
```
@UseGuards(LocalAuthenticationGuard)
@Get('your-route-here')
somefunc(){
	return 'Success!'
}
```
If user with valid token will send request to this route `JwtAuthenticationGuard` will check validity of users token.

#### Sending a request without token
![Sending a request without token](https://lh3.googleusercontent.com/pw/AMWts8Bed5sXj3jeMhkrdyxhH5AJJ9GQoWbVP4hs1C93YehezEaTiCGpJcgy79OMarzzRFbtZdRVVBovg3E6dTlJIZ_fhXmQBWTyYdmbduwemC5C2Ll9jHyQGjYuGdntyg-ndj1VXnk2pIahNO0BTdoRzxc=w862-h667-no?authuser=0)
#### Sending a request with valid token
![Sending a request with valid token](https://lh3.googleusercontent.com/pw/AMWts8A17RR0QMqaJtBvXfqoX82QD3-If0IHgm0OqkFkzTTV5YkN3sJq7qFqyEMwDkwxcUTakFqkOk9AxMCZGmLJinq5-q7WdEIncp3h4ulfzaT0F2lCV01vpnayccMpOOAqNqXJ_ziZWlVdu7kXvV4X5zY=w864-h641-no?authuser=0)
