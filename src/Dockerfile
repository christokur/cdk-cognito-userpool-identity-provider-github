# Build stage
FROM node:20-slim AS builder
ARG GIT_URL=https://github.com/christokur/github-cognito-openid-wrapper
ARG GIT_BRANCH=master
ARG VERSION=0.0.0  # Add this line

RUN echo "Building version ${VERSION}"  # This will print the version to the build output

RUN apt-get update && apt-get install -y --no-install-recommends \
  git \
  ca-certificates \
  openssh-client \
  python3 \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Clone and build the application
RUN git clone --depth 1 --branch ${GIT_BRANCH} ${GIT_URL}
WORKDIR /github-cognito-openid-wrapper

# Copy and verify .npmrc
COPY .npmrc /root/.npmrc
RUN ls -la /root/.npmrc || (echo ".npmrc not found in /root/.npmrc!" && exit 1)

RUN npm ci && \
    npm run build && \
    mv dist-lambda /asset

# Final stage
FROM node:20-slim
WORKDIR /
COPY --from=builder /asset /asset

# Set the entrypoint
ENTRYPOINT ["/bin/sh", "-c"]
