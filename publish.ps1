yarn install
yarn build
git add .
git commit -m "publish from $(date +'%Y-%m-%d %H:%M:%S')"
npm version patch
npm publish
git push
