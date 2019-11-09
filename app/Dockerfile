FROM nginx:alpine
WORKDIR /usr/app

RUN apk add --update git curl python linux-headers libgcc libstdc++ binutils-gold nodejs nodejs-npm

COPY . .

RUN npm install &&  npm run build && rm -Rf /usr/share/nginx/html/* && mv ./build/* /usr/share/nginx/html