FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD npm run dev

# docker build -t backend-dev .
# docker run -it --rm -p 3000:3000 backend-dev