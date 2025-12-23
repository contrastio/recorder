FROM node:20-alpine AS build

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build


FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --timeout=5s \
  CMD curl --fail --show-headers http://localhost:80/ || exit 1
