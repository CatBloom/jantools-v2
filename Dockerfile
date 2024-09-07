FROM node:22

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . ./

CMD ["yarn", "dev", "--host"]