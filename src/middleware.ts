import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE } from "./config";

export async function onRequest (context, next) {
   if (ACCESS_TOKEN !== '') {
      if (Date.now() < ACCESS_TOKEN_EXPIRE) {
         console.log(context.url);
         await fetch(`${context.url.origin}/api/token`).catch(error => error);
      }
   }

   // return a Response or the result of calling `next()`
   return next();
};