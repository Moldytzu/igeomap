const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("datasetRenderer/render/"));
app.listen(port, console.log(`Server ruleaza pe port ${port}`));
