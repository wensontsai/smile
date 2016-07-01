# Smile
Show off them pretty pearlies!

Webpack, React/Redux, Node/Express.
User auth with JSON Web Tokens, state-wide notifications system.


### DEVELOPMENT
Serves up on localhost:3000

#### Setup
1. Install Node Modules:  
```npm i``` and 
```cd server && npm i```

2. Install Test Runner:  
```npm i -g mocha```

3. Install Database Migration Environment:  
```npm install -g sequelize-cli```

4. Install Elasticsearch:  
```brew update```
```brew install elasticsearch```
https://gist.github.com/jpalala/ab3c33dd9ee5a6efbdae

#### Run 
1.  Client
  1. Run tests:  
```npm run test:watch```

  2. Run webpack to compile front-end in dev mode:  
```npm start```

2.  Server
  1.  Run tests:  
```cd server && npm run test:watch```

  2.  Run Babel to transpile Node/Express back-end for API routes:  
```cd server && npm run build-dev:watch```

3.  Elasticsearch
  1.  Run:  
``` elasticsearch ```