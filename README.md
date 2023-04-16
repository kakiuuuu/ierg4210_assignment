# ierg4210_assignment
Fong Ka Kiu
1155143596

I use Next.js and Typescript to build the website.  
The database is MySQL.  
I also use S3 in aws to store file
#### To run the project locally

> $ npm run build
> 
> $ npm run start

To Enter admin panel  
Login in with 
ac: admin
pw: 1155143596
Click the button on the bottom-right corner or type /admin in url

# What are different folders/files used for

* /app -- Include all the source code
  * /client -- Include all page of client side
  * /admin -- Include all page of admin side
  * /api -- Include all the api
* /store -- use redux to manage the app state
* middleware.ts -- to route user to login page
* /lib -- for some helper fuction
* /prisma -- Use ORM to help access to database
* /styles -- Include all the css
* typings.d.ts -- interface for object

