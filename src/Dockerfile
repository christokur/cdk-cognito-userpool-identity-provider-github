FROM node:20-slim
ARG GIT_URL
ARG GIT_BRANCH

# Override the entrypoint with /bin/sh
ENTRYPOINT ["/bin/sh", "-c"]

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  git \
  ca-certificates \
  openssh-client \
  python3 \
  build-essential

RUN bash -c "[ -e /usr/bin/python ] || ln -s /usr/bin/python3 /usr/bin/python"
RUN git clone --depth 1 --branch ${GIT_BRANCH} ${GIT_URL}
WORKDIR /github-cognito-openid-wrapper
RUN npm ci
RUN npm run build
RUN mv dist-lambda /asset
