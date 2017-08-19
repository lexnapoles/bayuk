export default (server, fileToServe) => {
  server.get('*', (req, res) => res.sendFile(fileToServe));

  return server;
};
