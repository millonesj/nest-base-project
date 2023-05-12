FROM node:16-alpine as builder

RUN mkdir /app/
WORKDIR /app

COPY . ./
RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

VOLUME /tmp
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /opt/app/
WORKDIR /opt/app

RUN adduser --disabled-password app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
RUN chown -R app:app /opt/app/dist
USER app

CMD ["node", "dist/main"]