const express = require ('express');
const handlebars = require ('handlebars');
const { Sequelize , QueryTypes } = require ('sequelize');
const  connection = require ("./scr/config/connection.json");
const bcrypt = require ('bcrypt');
const session  = require ('express-session');
const flash = require ('express-flash');
const multer = require("multer");
const dayjs = require('dayjs');
// import { INSERT } from 'sequelize/types/query-types.js';
// import { SELECT } from 'sequelize/types/query-types.js';

const app = express();
const port = 3000;

const sequelizeConfig = new Sequelize(connection.development)
const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'scr/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})
const upload = multer({ storage: multerConfig })

app.set("view engine", "hbs");
app.set("views", "scr/views");

app.use("/asset", express.static("scr/asset"));
app.use("/uploads", express.static("scr/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: "bang yang bener dong",
  store: new session.MemoryStore(),
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false, // https => http
  },
  saveUninitialized: true,
  resave: false,
}))

app.use((req, res, next) => {
  console.log(`LOG: ${req.method} ${req.path}`);
  if (req.method === "POST") {
    console.log(" body:", req.body);
  } else {
    console.log(" params:", req.params);
  }
  next();
});

app.get('/AddProject', AddProject);
app.post("/AddProject", upload.single("image"), handleAddProject);
app.get("/deleteProject/:id", handleDeleteProject);
app.get('/home', home);
app.get('/myProject', myProject);
app.get('/project-detail/:id', projectDetail);
app.get('/testimoni', testimoni);
app.get("/contact-me", contactMe);
app.get("/project_edit/:id", projectEdit);
app.post("/AddProject:id/update", projectUpdate);
app.get("/registrasi", formRegistrasi);
app.post("/registrasi", registrasi);
app.get("/login", formLogin);
app.post("/login", login);
app.post("/project", projectPost);
app.get("/logout", logout);

let data = [
    {
        project: "test",
        description: "test",
        date1: "2024-03-06",
        date2: "2024-03-19",
        node: true,
        next: true, 
        react: true, 
        golang: true,
        diff: getDistenceTime(new Date("02/04/2024"), new Date("03/04/2024"))
    }
]

function getDistenceTime(date1, date2) {
    let timeStart = date1;
    let timeEnd = date2;
    let getDistenceTime = date1 - date2; 
    console.log(getDistenceTime);
  
    const diffTime = Math.abs(timeEnd - timeStart);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
  
    if (days === 1) {
      return "1 day";
    }
  
    if (days < 30) {
      return days + " days";
    }
  
    if (months === 1) {
      return "1 month";
    }
  
    if (months < 12) {
      return months + " months";
    }
  
    if (years === 1) {
      return "1 year";
    }
  
    return years + " years";
    
  }
 function AddProject(req, res){ 
    res.render("AddProject")
  } 
function contactMe(req, res){
    res.render("contact-me")
}
function formRegistrasi(req, res){ 
  res.render("registrasi")
} 
async function registrasi(req, res){ 
  try{
  let { name, email, password }=req.body
  bcrypt.hash(password, 10, async function(err, dataHash){
    if(err){
      res.redirect("/registrasi")
    }else{
      await sequelizeConfig.query( `INSERT INTO users(name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${dataHash}', NOW(), NOW())`)
    }
  } )
  req.flash("succes", "register succesfull")
  res.redirect("login")
}catch(error){
  console.log(error);
}
} 
function formLogin(req, res){
  res.render("login")
}
async function login(req, res){
  try{
    const {email, password} = req.body;
    const queryName = `SELECT * FROM users WHERE email = '${email}'`;

    const cekEmail = await sequelizeConfig.query(queryName, {
      type: QueryTypes.SELECT,
    });
    if (!cekEmail.length) {
      req.flash("danger", "Email has not been registered");
      return res.redirect("/login");
    }
    
    await bcrypt.compare(
      password,
      cekEmail[0].password,
      function (err, result) {
        if (!result) {
          req.flash("danger", "Password wrong");
          return res.redirect("/login");
        } else {
          req.session.isLogin = true;
          req.session.user = cekEmail[0].name;
          req.session.idUser = cekEmail[0].id;
          req.flash("succes", "login succes");

          return res.redirect("home");
        }
      }
    );
    
    
  }catch(error){
    console.log(error);
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      } else {
          res.redirect("/login");
      }
  });
}

function home(req, res){
  res.render("home", {
    isLogin: req.session.isLogin,
    user: req.session.user
  });
}
async function myProject(req, res){
  try {
    
    const  queryName = `SELECT p.id, p.project, p.date1, p.date2, p.node, p.next, p.react, p.golang, p.description,p.author, p.image, p."updatedAt",p.tech, u.name AS author 
    FROM projects p 
    LEFT JOIN "users" u ON p.author = u.id 
    ORDER BY id DESC`
    const projects = await sequelizeConfig.query(queryName, { type: QueryTypes.SELECT })
    
    const obj = projects.map((data) => {
      return {
        ...data,
        isLogin: req.session.isLogin,
        
      }
    })

    res.render("myProject", {data: obj});
  } catch(error){
    console.log(error);
  }
}
async function projectDetail(req, res){
  try {
    const id = req.params.id;
    
    const data = (await sequelizeConfig.query(
      `SELECT * FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    ))[0];

    console.log(data);
    
    data.start_date = dayjs(data.date1).format("DD - MM - YYYY")
    data.end_date = dayjs(data.date2).format("DD - MM - YYYY")
      data.duration = dayjs(data.date2).diff(data.date1,"days")
      
      console.log("229",data);
      res.render("project-detail", {
      currentUrl: req.path,
      data,
    });
  }catch(error){
    console.log(error);
  }
}
function testimoni(req, res){
    res.render("testimoni")
}
async function handleAddProject(req, res){
    try {
    const {project, description, date1, date2, node, next, react, golang,tech} = req.body
    console.log(req.body);
    const author = req.session.idUser;
    const image = req.file.filename;
    const queryName = `INSERT INTO projects(
      project, date1, date2, description, author, image,tech, "createdAt", "updatedAt")
      VALUES ('${project}', '${date1}', '${date2}', '${description}','${author}',  '${image}', '{${tech}}' ,NOW(), NOW());`

    await sequelizeConfig.query(queryName)
    res.redirect("/myProject")

} catch (error) {
  console.log(error)}
}
async function handleDeleteProject(req, res) {
  try{
    const { id } = req.params;
    const queryName = `DELETE FROM projects WHERE id=${id}`
    await sequelizeConfig.query(queryName)
    res.redirect("/myProject");
}catch(error){
  console.log(error);
}
}
async function projectEdit  (req, res)  {
  try {
    const { id } = req.params;
    const author = req.session.idUser;
    const image = req.file.filename;
    const data = await sequelizeConfig.query(
      `SELECT * FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.INSERT,
      }
    );
    const obj = project.map((data) => {
      return {
          ...data
      }
  })
  console.log(obj);


  res.render("project_edit", {
      data: obj[0],
      isLogin: req.session.isLogin,
      user: req.session.user
  });
    
  } catch (error) {
    console.log(error);
  }
};

async function projectPost (req, res){
  try {
    const { project, description, date1, date2, node, next, react, golang } = req.body;

    const duration = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();
    const is_node = node ? true : false;
    const is_next = next ? true : false;
    const is_react = react ? true : false;
    const is_golang = golang ? true : false;

    await sequelizeConfig.query(
      `INSERT INTO projects(project, date1, date2, node, next, react, golang, description, duration, create_at, update_at) VALUES ('${project}', '${start_date}', '${end_date}', ${is_node}, ${is_next}, ${is_react}, ${is_golang}, '${description}', '${duration}', NOW(), NOW())`,
      {
        type: QueryTypes.INSERT,
      }
    );

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

async function projectUpdate (req, res) {
  try {
    const { id } = req.params;
    const { project, description, date1, date2, node, next, react, golang } = req.body;

    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const startDate = new Date(date1).toISOString();
    const endDate = new Date(date2).toISOString();
    const is_node = node ? true : false;
    const is_react = react ? true : false;
    const is_next = next ? true : false;
    const is_golang = golang ? true : false;

    await sequelizeConfig.query(
      `UPDATE projects SET name='${project}', start_date='${date1}', end_date='${date2}', node=${is_node}, react=${is_react}, next=${is_next}, type=${is_golang}, description='${description}', diff_date='${diff_date}', update_at=NOW() WHERE id=${id}`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })