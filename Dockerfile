FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json ./
COPY server.js ./
COPY public ./public

EXPOSE 8080

USER node

CMD ["node", "server.js"]
