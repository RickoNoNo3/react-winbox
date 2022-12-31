yarn install
yarn build
git add .
git commit -m "publish"
npm version patch
npm publish
git push
