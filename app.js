const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const bcrypt = require('bcrypt');
const path = require('path');


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front-end')));


// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tienes un usuario diferente
  password: '', // Cambia esto si tienes una contraseña
  database: 'proyecto_sms' // Reemplaza con el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
  });

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Campañas SMS');
});

// Ruta para obtener todas las campañas
app.get('/api/campanas', (req, res) => {
  connection.query('SELECT * FROM campanas', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener las campañas' });
    }
    res.json(results);
  });
});

app.post('/api/campanas', (req, res) => {
    const nuevaCampana = req.body; // Esperando un JSON en el cuerpo de la solicitud
    connection.query('INSERT INTO campanas SET ?', nuevaCampana, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear la campaña' });
        }
        res.status(201).json({ message: 'Campaña creada', id: results.insertId });
    });
});

// Ruta para crear una nueva campaña
app.post('/api/campanas', (req, res) => {
  const nuevaCampana = req.body; // Esperando un JSON en el cuerpo de la solicitud
  connection.query('INSERT INTO campanas SET ?', nuevaCampana, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al crear la campaña' });
    }
    res.status(201).json({ message: 'Campaña creada', id: results.insertId });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ruta para actualizar una campaña
app.put('/api/campanas/:id', (req, res) => {
    const { id } = req.params;
    const actualizadaCampana = req.body;
    
    connection.query('UPDATE campanas SET ? WHERE id = ?', [actualizadaCampana, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al actualizar la campaña' });
      }
      res.json({ message: 'Campaña actualizada' });
    });
  });
  
  // Ruta para eliminar una campaña
  app.delete('/api/campanas/:id', (req, res) => {
    const { id } = req.params;
  
    connection.query('DELETE FROM campanas WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al eliminar la campaña' });
      }
      res.json({ message: 'Campaña eliminada' });
    });
  });
  
  // Ruta para autenticar al usuario
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Aquí deberías verificar las credenciales con la base de datos
    // Por simplicidad, vamos a suponer que las credenciales son correctas
    if (username === 'admin' && password === 'admin') { // Cambia esto por la verificación real
        // Si las credenciales son correctas, responde con un token
        res.json({ token: 'tu_token_aqui' }); // Genera y envía un token real
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'login.html'));
});

app.get('/gestion_campanas', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'gestion_campanas.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'register.html'));
});


// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error al hashear la contraseña' });
        }

        // Insertar el nuevo usuario en la base de datos
        const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
        db.query(sql, [username, hash], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado' });
        });
    });
});

