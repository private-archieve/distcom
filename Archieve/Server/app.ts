// import { Application, Context, Router } from 'https://deno.land/x/oak/mod.ts';
// import { v4 as uuidv4 } from "https://deno.land/std/uuid/mod.ts";
// import * as cookies from "https://deno.land/std/http/cookie.ts";


// import { checkUserExists, getBlogPosts, getBlogPostByURL, RegisterUserWallet, LoginUserWallet } from './Database/Database.ts';

// const app = new Application();

// const csrfProtection = async (ctx: Context, next: Function) => {
//   const csrfToken = ctx.request.headers.get("csrf-token");
//   if (!csrfToken || csrfToken !== ctx.cookies.get("csrf-token")) {
//     ctx.response.status = 403;
//     ctx.response.body = { error: "CSRF token invalid or missing." };
//     return;
//   }
//   await next();
// };

// // CORS middleware
// app.use(async (ctx: Context, next: Function) => {
//   const allowedOrigins = ['http://localhost:3000']; // You can modify as needed
//   const origin = ctx.request.headers.get("Origin");

//   if (allowedOrigins.includes(origin)) {
//     ctx.response.headers.set("Access-Control-Allow-Origin", origin);
//   }

//   ctx.response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token");
//   ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   ctx.response.headers.set("Access-Control-Allow-Credentials", "true");

//   if (ctx.request.method === "OPTIONS") {
//     ctx.response.status = 200;
//     return;
//   }

//   await next();
// });


// app.use(async (ctx: Context, next: Function) => {
//   const csrfToken = uuidv4.generate();  // Generate CSRF token
//   ctx.cookies.set("csrf-token", csrfToken, { httpOnly: true });
//   ctx.response.body = { csrfToken };
//   await next();
// });


// const router = new Router();


// router.get('/Blogs/:url', csrfProtection, async (ctx: Context) => {
//   try {
//     const blogUrl = ctx.params.url;
//     const blogPost = await getBlogPostByURL(blogUrl);
//     ctx.response.status = 200;
//     ctx.response.body = blogPost;
//   } catch (error) {
//     console.error('Failed to fetch blog post:', error);
//     if (error instanceof Error && error.message === 'Blog post not found') {
//       ctx.response.status = 404;
//       ctx.response.body = { error: 'Blog post not found' };
//     } else {
//       ctx.response.status = 500;
//       ctx.response.body = { error: 'Internal Server Error' };
//     }
//   }
// });

// // Route to retrieve blogs by filter
// router.get('/Blogs/:filter', csrfProtection, async (ctx: Context) => {
//   try {
//     const filter = ctx.params.filter;
//     const filteredBlogs = await getBlogPosts(filter);
//     ctx.response.status = 200;
//     ctx.response.body = filteredBlogs;
//   } catch (error) {
//     console.error('Failed to fetch blog posts:', error);
//     if (error instanceof Error && error.message === 'Blog post not found') {
//       ctx.response.status = 404;
//       ctx.response.body = { error: 'Blog post not found' };
//     } else {
//       ctx.response.status = 500;
//       ctx.response.body = { error: 'Internal Server Error' };
//     }
//   }
// });

// // Route to register a user's wallet
// router.post('/WalletRegister', csrfProtection, async (ctx: Context) => {
//   try {
//     const body = await ctx.request.body().value;
//     const walletAddress = body.RegisterRequest?.walletAddress;

//     if (!walletAddress) {
//       ctx.response.status = 400;
//       ctx.response.body = { message: 'Wallet address cannot both be undefined.', status: 'Bad Request' };
//       return;
//     }

//     const userExists = await checkUserExists(walletAddress);
//     if (!userExists) {
//       await RegisterUserWallet(walletAddress);
//       ctx.response.status = 201;
//       ctx.response.body = { message: 'Successfully Registered!', status: 'Ok' };
//     } else {
//       ctx.response.status = 409;
//       ctx.response.body = { message: 'User already exists!', status: 'Conflict' };
//     }
//   } catch (error) {
//     console.error('Registration error:', error);
//     ctx.response.status = 500;
//     ctx.response.body = { message: 'Registration failed!', status: 'Error' };
//   }
// });

// // Route for user login using a wallet address
// router.post('/LoginWallet', csrfProtection, async (ctx: Context) => {
//   try {
//     const body = await ctx.request.body().value;
//     const walletAddress = body?.walletAddress;

//     if (!walletAddress) {
//       ctx.response.status = 400;
//       ctx.response.body = { message: 'Wallet address is required.', status: 'Bad Request' };
//       return;
//     }

//     const userExists = await checkUserExists(walletAddress);
//     if (userExists) {
//       const token = await LoginUserWallet(walletAddress);
//       ctx.response.status = 200;
//       ctx.response.body = { message: 'Login successful!', token: token, status: 'Ok' };
//     } else {
//       ctx.response.status = 404;
//       ctx.response.body = { message: 'User does not exist!', status: 'Not Found' };
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     ctx.response.status = 500;
//     ctx.response.body = { message: 'Login failed!', status: 'Error' };
//   }
// });

// // Register routes
// app.use(router.routes());
// app.use(router.allowedMethods());

// // Start the server
// const port = 3040;
// console.log(`Server listening on port ${port}`);
// await app.listen({ port });
