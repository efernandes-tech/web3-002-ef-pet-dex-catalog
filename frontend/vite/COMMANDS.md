# Commands:

```cmd
mkdir ./frontend
cd ./frontend
npm create vite@latest vite -- --template react-ts
cd ./vite
npm install
npm run dev
```

```cmd
cd ./frontend/vite
npm i @chakra-ui/react @emotion/react
npm i -D vite-tsconfig-paths
npm i react-router-dom
```

```cmd
cd ./frontend/vite
npx @chakra-ui/cli snippet list
npx @chakra-ui/cli snippet add provider
```

```cmd
cd ./frontend/vite
npm install ethers
npx @chakra-ui/cli snippet add toaster
npm install lucide-react
```

```cmd
cd ./frontend/vite

tar --exclude='*/node_modules*' \
    --exclude='*/dist*' \
    -cvf build-ef-pet-dex-catalog.tar .

caprover deploy \
  --caproverUrl https://caprover.edersonfernandes.tec.br \
  --appName ef-pet-dex-catalog \
  --tarFile ./build-ef-pet-dex-catalog.tar
```

```cmd

```

```cmd

```

```cmd

```

```cmd

```

```cmd

```
