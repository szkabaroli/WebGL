import express from 'express';
import path from 'path';
const app = express();

const models = [
    {name:'Dragon', img:'dragon.png', link:'/view.html?model=dragon&texture=col&name=Dragon'},
    {name:'Bunny', img:'bunny.png', link:'/view.html?model=cube&texture=col&name=Bunny'}
]

app.use(express.static(path.join(__dirname, '../', 'static')));
app.use(express.static(path.join(__dirname, '../', 'resources')));

app.get('/', (req,res)=>{res.sendFile(path.join(__dirname, '../', 'index.html'))});

app.get('/api/models', (req,res)=>{
    res.json(models);
});

app.listen(3000, () => {
    console.log('server is running on port 3000!')
});