run:  
1. npm start 
2. Run back end http server (start_TOT_rest_python_server)
3. ./node_modules/.bin/eslint FILE --fix 
  
Install  
1. npm install rc-progress  
<!-- 2. yarn add react-tournament-bracket   -->

Deploy
1. cd this-or-that
2. heroku git:remote -a damp-ridge-24839
2. git push heroku master


Dependencies
https://github.com/mdsportz21/react-tournament-bracket.git

Test with local react-tournament-bracket  
0. git clone https://github.com/mdsportz21/react-tournament-bracket.git
0.5. cd this-or-that
1. npm link ../react-tournament-bracket/
1.5. cd react-tournament-bracket
2. npx babel src --out-dir lib

Test with remote react-tournament-bracket (untested)
1. npm unlink ../react-tournament-bracket/
2. npm i react-tournament-bracket@github:mdsportz21/react-tournament-bracket

Update react-tournament-bracket
1. In react-tournament bracket, Make changes
2. npm run build
3. push
4. In this-or-that, rm -rf node_modules && npm i

Sources:  
  1. https://github.com/goatslacker/alt  
  1. https://react-table.js.org/#/story/readme  
  1. https://github.com/moodysalem/react-tournament-bracket  
  1. https://stackoverflow.com/questions/31234500/create-react-component-dynamically - Creating react components dynamically 
  1. https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment - building production assets
  1. https://devcenter.heroku.com/articles/nodejs-support - Set NODE_ENV to test
  1. https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/ - Securing your React App / Create an API
  1. https://github.com/auth0-blog/react-flux-jwt-authentication-sample/tree/dd1fba7791a51f3d26af66d32931e36f55ebb869/src - JWT on frontend
  1. https://auth0.com/docs/tokens/id-token - create an API so that we get a JWT access token

  Documentation  
  1. https://code.google.com/archive/p/jsdoc-toolkit/wikis/TagParam.wiki

  Todo
  9-18-18:
  1. Figure out how to deal with image loading lag
  9-17-18: 
  1. Test bracket pagination 
  2. display seed in react tournament bracket component
  3. figure out how to fix react-specific linting issues

  * https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm
  * https://flow.org/en/docs/install/

  * CORS Fix: CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "https://damp-ridge-24839.herokuapp.com"]}})
  * Try using flow for types: https://flow.org/en/docs/types/modules/#importing-and-exporting-types-