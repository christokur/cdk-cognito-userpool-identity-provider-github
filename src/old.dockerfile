FROM node:20-slim
ARG GIT_URL=https://github.com/christokur/github-cognito-openid-wrapper
ARG GIT_BRANCH=master

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

RUN bash -c '[ "$HOME" = "/root" ] || (echo "HOME is NOT /root!" && exit 1)'

# Copy and verify .npmrc
COPY .npmrc /root/.npmrc
RUN ls -la /root/.npmrc || (echo ".npmrc not found in /root/.npmrc!" && exit 1)

RUN bash -c ' \
'

RUN bash -c "ls -al /root/.npmrc || true"

RUN npm ci
RUN npm run build
RUN mv dist-lambda /asset