require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 5000;

app.get('/',(req, res)=>{
    res.send('server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})