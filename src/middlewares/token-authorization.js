import jwt from 'jsonwebtoken';

require('dotenv').config;

import {
  readFileAsync
} from '../services/file'

module.exports = {
  validateToken: async (ctx, next) => {
    //const key = await readFileAsync(process.env.JWT_PUBLIC_KEY_PATH); //read from key file
    const key = process.env.JWT_SECRET_KEY //read from env

    //check through header for token
    const authorizationHeaader = ctx.request.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = ctx.request.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        result = await jwt.verify(token, key);

        await next();

      } catch (err) {
        ctx.status = 400,
          ctx.body = {
            message: "Invalid token" + err
          }
      }
    } else if (ctx.request.query.token) {
      const token = ctx.request.query.token;
      try {
        result = await jwt.verify(token, key);
        await next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      ctx.response.status = 401;
      ctx.response.body = result;
    }
  },
};