FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

RUN apk add --update git curl python linux-headers libgcc libstdc++ binutils-gold nodejs nodejs-npm

WORKDIR /usr/share/nginx/html

RUN rm -Rf /usr/share/nginx/html/*

COPY . .

RUN npm install &&  npm run build && mv ./build/* /usr/share/nginx/html