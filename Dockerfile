FROM node:12.13.0-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV  MONGODB_URL=MONGODB_URL
EXPOSE 3000
CMD node app