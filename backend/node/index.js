const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Establece el directorio de destino para los archivos cargados
const app = express();

