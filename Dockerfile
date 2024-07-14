FROM node:21
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "bot.js" ]