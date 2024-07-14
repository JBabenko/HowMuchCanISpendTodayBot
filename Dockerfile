FROM node:21

ARG BOT_TOKEN
ARG SPREAD_SHEET_ID
ARG G_CLIENT_ID
ARG G_CLIENT_SECRET

ENV BOT_TOKEN=${BOT_TOKEN}
ENV SPREAD_SHEET_ID=${SPREAD_SHEET_ID}
ENV G_CLIENT_ID=${G_CLIENT_ID}
ENV G_CLIENT_SECRET=${G_CLIENT_SECRET}

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "bot.js" ]