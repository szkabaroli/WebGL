import express from 'express';
import path from 'path';
const app = express();

const models = [
    {name:'hello', img:'fbx.jpg', link:'/view.html?model=test&texture=grid'},
    {name:'hello', img:'fbx.jpg', link:'/view.html?model=cube&texture=col'}
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