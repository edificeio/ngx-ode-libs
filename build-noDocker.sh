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

clean () {
  rm -rf node_modules
  rm -rf dist
}

init () {
  npm rebuild node-sass --no-bin-links && npm install
}

build () {
  npm run build-$LIB
}

buildAndCopy () {
  npm run build-$LIB && cp -r dist/$LIB $COPY_DEST
}

publish () {
  LOCAL_BRANCH=`echo $GIT_BRANCH | sed -e "s|origin/||g"`
  cd dist/$LIB && npm publish --tag $LOCAL_BRANCH
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
