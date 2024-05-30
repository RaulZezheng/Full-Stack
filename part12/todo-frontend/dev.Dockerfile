FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm install


CMD ["npm", "run", "dev", "--", "--host"]

# docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" front-dev

# docker build -f ./dev.Dockerfile  -t front-dev .