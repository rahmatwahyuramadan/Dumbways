let dataProjects = [];

function addProject(event) {
  event.preventDefault();

  let Project = document.getElementById("input-project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let Description = document.getElementById("description").value;
  let inputNodeJS = document.getElementById("inputNodeJS").checked;
  let inputNextJS = document.getElementById("inputNextJS").checked;
  let inputReactJS = document.getElementById("inputReactJS").checked;
  let inputGolang = document.getElementById("inputGolang").checked;

  let dataProject = {
    Project,
    startDate,
    endDate,
    Description,
    inputNodeJS,
    inputNextJS,
    inputReactJS,
    inputGolang
  };

  dataProjects.push(dataProject);

  console.log(dataProjects);

  renderProject();
}

function renderProject() {
    document.getElementById("addProject").innerHTML = "";
  
    for (let index = 0; index < dataProjects.length; index++) {
      let techIcons = "";
      if (dataProjects[index].inputNodeJS){
        techIcons += `<i class="fa-brands fa-node-js"></i>`
      };
      if (dataProjects[index].inputNextJS){
        techIcons += `<i class="fa-brands fa-js"></i>`
      };
      if (dataProjects[index].inputReactJS){
        techIcons += `<i class="fa-brands fa-react"></i>`
      };
      if (dataProjects[index].inputGolang){
        techIcons += `<i class="fa-brands fa-golang"></i>`
      };

      document.getElementById("addProject").innerHTML += `
      <div class="container">
       <div class="projectList" id="addProject">
      <div class="project-list-item">
      <img src="asset/css/Gambar/projectGambar.jpg" alt="" class="projectImage">
        <div>
          ${dataProjects[index].Project}
        </div>
        <div>
          <p class="paragraf">
            ${dataProjects[index].Description}
          </p>
        </div>
        <div>
          ${techIcons}
        </div>
        <div class="buttonProject">
          <button class="buttom-group">Edit</button>
          <button class="buttom-group">Delete</button>
        </div>
      </div>
      </div>
      </div>`;
    }
}
