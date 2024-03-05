import express from 'express';
import handlebars from 'handlebars';
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "scr/views");

app.use("/asset", express.static("scr/asset"));
app.use(express.urlencoded({ extended: false }));

app.get('/AddProject', AddProject);
app.post("/AddProject", handleAddProject);
app.get("/deleteProject/:id", handleDeleteProject);
app.get('/home', home);
app.get('/myProject', myProject);
app.get('/project-detail/:id', projectDetail);
app.get('/testimoni', testimoni);
app.get("/contact-me", contactMe);

const datas = []

function AddProject(req, res){
    res.render("AddProject")
}
function contactMe(req, res){
    res.render("contact-me")
}
function home(req, res){
    res.render("home")
}
function myProject(req, res){
    res.render("myProject", {datas})
}
function projectDetail(req, res){
    const id = req.params.id
    
    res.render("project-detail", {id}, {datas})
}
function testimoni(req, res){
    res.render("testimoni")
}
function handleAddProject(req, res){
    // const project = req.body.project
    // const description = req.body.description
    // console.log("berhasil submit data :", project)
    // console.log("berhasil submit data descripsi :", description)
    
    const {project, description, durasi} = req.body
    console.log(project, "," , description, ",", durasi)
    
    datas.push({ project, description, durasi });

    res.redirect("/myProject")
}
function handleDeleteProject(req, res) {
    const { id } = req.params;
  
    datas.splice(id, 1);
  
    res.redirect("/myProject");
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })