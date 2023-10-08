const express = require('express');
const app = express();
app.use(express.static("datasetRenderer/render/"));
app.listen(3001, console.log(`Server ruleaza pe port ${3001}`));
