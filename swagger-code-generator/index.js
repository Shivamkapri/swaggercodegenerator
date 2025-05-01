const SwaggerParser = require("swagger-parser");
const fs = require("fs-extra");

async function generateCode() {
  try {
    const api = await SwaggerParser.parse("swagger.yaml");
    const paths = api.paths;

    let routeCode = `const express = require('express');\nconst router = express.Router();\nconst controller = require('./controller');\n\n`;
    let controllerCode = ``;

    for (const path in paths) {
      const expressPath = path.replace(/{(.*?)}/g, ':$1'); // /users/{id}  to converted  /users/:id

      for (const method in paths[path]) {
        const summary = paths[path][method].summary || '';
        const functionName = generateFunctionName(method, path);

        // Add to route file
        routeCode += `router.${method}('${expressPath}', controller.${functionName}); // ${summary}\n`;

        // Add to controller file
        controllerCode += `exports.${functionName} = (req, res) => {\n    res.send("${functionName} called");\n};\n\n`;
      }
    }

    routeCode += `\nmodule.exports = router;\n`;

    // Write to /generated folder
    await fs.ensureDir('generated');
    await fs.writeFile('generated/routes.js', routeCode);
    await fs.writeFile('generated/controller.js', controllerCode);

    console.log(" Code generated successfully in the 'generated' folder.");

  } catch (err) {
    console.error(" Error:", err.message);
  }
}

function generateFunctionName(method, path) {
  const cleanPath = path.replace(/[{}]/g, '').replace(/\//g, '_').replace(/:/g, '');
  return `${method}${cleanPath}`;
}

generateCode();
