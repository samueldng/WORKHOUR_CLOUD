const https = require('https');
const http = require('http');

// Ignore SSL certificate errors for localhost
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { ...options, agent }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test login
    console.log('Testing login endpoint...');
    const loginData = await makeRequest('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin'
      })
    });
    
    console.log('Login response:', loginData);
    
    if (loginData.access_token) {
      console.log('Testing projects endpoint with token...');
      // Test projects endpoint with token
      const projectsData = await makeRequest('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.access_token}`,
        },
      });
      
      console.log('Projects response:', projectsData);
    }
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testAPI();