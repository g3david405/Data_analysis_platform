FROM node:14.15-slim

WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN rm -rf node_modules package-lock.json && npm install

#ENV NODE_OPTIONS = "--max-old-space-size=4096"

COPY . ./

CMD ["npm", "start"]