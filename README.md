PS:-Build a smart Node.js tool that reads any Swagger/OpenAPI file and auto-generates backend code
— specifically, Express routes and controller functions — for all the APIs defined in the Swagger file.


I created a Node.js-based code generation tool that parses any Swagger/OpenAPI spec file **(swagger.yaml)**
and dynamically generates backend boilerplate code **(complete generated folder)**
This includes Express routes and stubbed controller functions.
the main logic of program is in index.js

The generator  create and wrote everything to a generated/ folder:
1.routes.js: All Express routes
2.controller.js: All stub handler functions


in terminal write :-
npm i
node index.js
