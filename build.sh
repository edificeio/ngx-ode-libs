#!/bin/bash

if [ "$#" -gt 3 ]; then
  echo "Usage: $0 <clean|init|build|publish> <lib>"
  echo "Example: $0 clean"
  echo "Example: $0 init"
  echo "Example: $0 build ngx-ode-core"
  echo "Example: $0 buildAndCopy ngx-ode-core ../entcore/admin/src/main/ts/node_modules"
  echo "Example: $0 publish ngx-ode-core"
  exit 1
fi

ACTION=$1
LIB=$2
COPY_DEST=$3

if [ ! -e node_modules ]
then
  mkdir node_modules
fi

if [ -z ${USER_UID:+x} ]
then
  export USER_UID=1000
  export GROUP_GID=1000
fi

clean () {
  rm -rf node_modules
}

init () {
  docker compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "npm rebuild node-sass --no-bin-links && npm install"
}

build () {
  docker compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "npm run build-$LIB"
}

buildAndCopy () {
  docker compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "npm run build-$LIB && cp -r dist/$LIB $COPY_DEST"
}

publish () {
  LOCAL_BRANCH=`echo $GIT_BRANCH | sed -e "s|origin/||g"`
  docker compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "cd dist/$LIB && npm publish --tag $LOCAL_BRANCH"
}

case $ACTION in
  clean)
    clean
    ;;
  init)
    init
    ;;
  build)
    build
    ;;
  buildAndCopy)
    buildAndCopy
    ;;
  publish)
    publish
    ;;
  *)
    echo "Invalid argument : $ACTION"
esac
