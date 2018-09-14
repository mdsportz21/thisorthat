run:  
1. Run front end react server (start_TOT_react)  
2. Run back end http server (start_TOT_rest_python_server)  
  
Install  
1. npm install rc-progress  
<!-- 2. yarn add react-tournament-bracket   -->

Deploy
1. cd this-or-that
2. heroku git:remote -a damp-ridge-24839
2. git push heroku master


Dependencies
https://github.com/mdsportz21/react-tournament-bracket.git

Local Bracket  
0. git clone https://github.com/mdsportz21/react-tournament-bracket.git
0.5. cd this-or-that
1. npm link ../react-tournament-bracket/
1.5. cd react-tournament-bracket
2. npx babel src --out-dir lib

Sources:  
  1. https://github.com/goatslacker/alt  
  1. https://react-table.js.org/#/story/readme  
  1. https://github.com/moodysalem/react-tournament-bracket  
  1. https://stackoverflow.com/questions/31234500/create-react-component-dynamically - Creating react components dynamically 
  1. https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment - building production assets
  1. https://devcenter.heroku.com/articles/nodejs-support - Set NODE_ENV to test



  Documentation  
  1. https://code.google.com/archive/p/jsdoc-toolkit/wikis/TagParam.wiki

  Todo
  1. Highlight winning subject

  * https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm
  * https://flow.org/en/docs/install/

  * CORS Fix: CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "https://damp-ridge-24839.herokuapp.com"]}})
  * Try using flow for types: https://flow.org/en/docs/types/modules/#importing-and-exporting-types-