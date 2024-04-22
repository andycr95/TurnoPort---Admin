FROM oven/bun:1-alpine
WORKDIR /usr/src/app


COPY package.json ./
COPY bun.lockb ./



ENV NEXT_TELEMETRY_DISABLED 1


RUN bun install

COPY . .

RUN bun next build

EXPOSE 3000

CMD ["bun", "next", "start"]

