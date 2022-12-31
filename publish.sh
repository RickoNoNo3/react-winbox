#!/bin/bash
yarn install
yarn build
npm install
git add .
git commit -m "publish from $(date +'%Y-%m-%d %H:%M:%S')"
npm version patch
npm publish
git push
