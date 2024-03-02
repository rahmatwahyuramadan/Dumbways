import express from 'express';
import handlebars from 'handlebars';
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "scr/views");

app.use("/asset", express.static("scr/asset"));

app.get('/blog', (req, res)=>{
    res.render("Blog")
});
app.get('/AddProject', (req, res)=>{
    res.render("AddProject")
});
app.get('/home', (req, res)=>{
    res.render("home")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })