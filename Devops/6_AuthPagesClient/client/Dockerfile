FROM node:alpine

ARG DOCKER_NODE_ENV
ENV VITE_REACT_APP_NODE_ENV=${DOCKER_NODE_ENV}

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; \
      then echo "Your REACT_APP_NODE_ENV for Production staging = $VITE_REACT_APP_NODE_ENV"; \
      else echo "You your 'REACT_APP_NODE_ENV' for Development = $VITE_REACT_APP_NODE_ENV"; \
    fi

RUN mkdir -p /usr/restaurant/client

WORKDIR /usr/restaurant/client

COPY package*.json .

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; \
    then npm install --omit=dev; \
    else npm install; \
    fi

COPY . .

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; \
    then npm run build; \
    fi

ENTRYPOINT ["npm"]
