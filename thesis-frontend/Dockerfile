FROM nginx:1.17.1-alpine
# copy nginx conf
COPY nginx.conf /etc/nginx/nginx.conf
# copy build artefact
COPY /dist/thesis-frontend /usr/share/nginx/html
