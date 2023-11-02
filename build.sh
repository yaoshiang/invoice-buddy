pushd frontend
npm run build
popd

cp -r frontend/build backend/app/