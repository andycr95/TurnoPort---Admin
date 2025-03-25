FROM oven/bun:1-alpine
WORKDIR /usr/src/app


COPY package.json ./
COPY bun.lockb ./




RUN bun install

COPY . .

RUN bun prisma migrate dev --name init

RUN bun prisma generate

RUN bun next build

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["bun", "next", "start"]

