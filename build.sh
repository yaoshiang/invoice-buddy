pushd frontend
npm run build
popd

cp -r frontend/dist backend/app/