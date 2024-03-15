const express = require ('express');
const handlebars = require ('handlebars');
const { Sequelize , QueryTypes } = require ('sequelize');
const  connection = require ("./scr/config/connection.json");
const bcrypt = require ('bcrypt');
const session  = require ('express-session');
const flash = require ('express-flash');
const multer = require("multer")
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

function home(req, res){
  res.render("home", {
    isLogin: req.session.isLogin,
    user: req.session.user
  });
}
async function myProject(req, res){
  try {
    
    const  queryName = `SELECT p.id, p.project, p.date1, p.date2, p.node, p.next, p.react, p.golang, p.description,p.author, p.image, p."updatedAt", u.name AS author 
    FROM projects p 
    LEFT JOIN "users" u ON p.author = u.id 
    ORDER BY id DESC`
    const projects = await sequelizeConfig.query(queryName, { type: QueryTypes.SELECT })
    
    const obj = projects.map((data) => {
      return {
        ...data,
        isLogin: req.session.isLogin
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
    const  queryName = `SELECT * FROM projects WHERE id=${id}`
    const projects = await sequelizeConfig.query(queryName, { type: QueryTypes.SELECT })
    
    const obj = projects.map((data) => {
      return {
        ...data,
        author: "Putri Maharani Chan"
      }
    });

    // const formatDuration = new Intl.DateTimeFormat("id", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // });

    // const newData = data.map((item) => {
    //   return {
    //     ...item,
    //     duration: formatDuration.formatRange(item.date1, item.date2)
    //   };
    // });

    res.render("project-detail", {
      data: projects,
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
    const {project, description, date1, date2, node, next, react, golang} = req.body
    const author = req.session.idUser;
    const image = req.file.filename;
    const queryName = `INSERT INTO projects(
      project, date1, date2, description, node, next, react, golang, author, image, "createdAt", "updatedAt")
      VALUES ('${project}', '${date1}', '${date2}', '${description}', '${node}', '${next}', '${react}', '${golang}', '${author}', '${image}', NOW(), NOW());`

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
    const data = await sequelizeConfig.query(
      `SELECT * FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.INSERT,
      }
    );

    const newData = data[0].map((item) => {
      return {
        ...item,
        start_date: new Date(item.date1).toLocaleDateString("en-CA"),
        end_date: new Date(item.date2).toLocaleDateString("en-CA"),
      };
    });

    res.render("project_edit", {
      data: newData[0],
      id,
      currentUrl: req.path,
    });
  } catch (error) {
    console.log(error);
  }
};

async function projectPost (req, res){
  try {
    const { project, description, date1, date2, node, next, react, golang } = req.body;

    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();
    const is_node = node ? true : false;
    const is_react = react ? true : false;
    const is_next = next ? true : false;
    const is_golang = golang ? true : false;

    await sequelize.query(
      `INSERT INTO projects(project, start_date, end_date, node, react, next, type, description, diff_date, create_at, update_at) VALUES ('${project}', '${start_date}', '${end_date}', ${is_node}, ${is_react}, ${is_next}, ${is_golang}, '${description}', '${diff_date}', NOW(), NOW())`,
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