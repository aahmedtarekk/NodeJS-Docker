const http = require('http'); // Import the HTTP module

// Define the port to listen on
const port = 3000;

// Create a server
const server = http.createServer((req, res) => {
  // Set the HTTP response headers
  res.statusCode = 200; // Status OK
  res.setHeader('Content-Type', 'text/plain'); // Plain text response

  // Send the message as a response
  res.end('Hello World');
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
