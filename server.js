import app from './server/build/main'

const server = app.listen(app.get('port'), () => {
  const { address, port } = server.address();
  console.log(`Server listening at http://${address}:${port}`);
});
