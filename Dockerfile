FROM node:19.6.0
ENV NODE_ENV=production
WORKDIR /app
COPY ./ .
RUN npm install nodemon -g
RUN npm install
EXPOSE 3000
CMD ["nodemon","index.js"]