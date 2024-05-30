FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start

# docker build -t backend .
# docker run -it --rm -p 3000:3000 backend