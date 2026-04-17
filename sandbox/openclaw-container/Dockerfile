FROM node:22-bookworm

ARG OPENCLAW_VERSION=2026.4.15

ENV DEBIAN_FRONTEND=noninteractive \
    OPENCLAW_HOME=/srv/openclaw/home \
    HOME=/srv/openclaw/home

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    ffmpeg \
    git \
    python3 \
    make \
    g++ \
    pkg-config \
    libvips-dev \
 && rm -rf /var/lib/apt/lists/*

RUN npm install -g "openclaw@${OPENCLAW_VERSION}"

RUN mkdir -p /srv/openclaw/home /srv/openclaw/workspace /srv/openclaw/secrets /opt/openclaw-bootstrap

WORKDIR /srv/openclaw/workspace

COPY bin/container-entrypoint.sh /usr/local/bin/container-entrypoint.sh
RUN chmod +x /usr/local/bin/container-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/container-entrypoint.sh"]
CMD ["openclaw", "gateway"]
