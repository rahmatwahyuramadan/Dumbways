let dataProjects = [];

function addProject(event) {
  event.preventDefault();

  let Project = document.getElementById("input-project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let Description = document.getElementById("description").value;
  let inputNodeJS = document.getElementById("inputNodeJS").checked;
  let inputJavaScript = document.getElementById("inputJavaScript").checked;
  let inputReactJS = document.getElementById("inputReactJS").checked;
  let inputTypescript = document.getElementById("inputTypescript").checked;

  let dataProject = {
    Project,
    startDate,
    endDate,
    Description,
    inputNodeJS,
    inputJavaScript,
    inputReactJS,
    inputTypescript
  };

  dataProjects.push(dataProject);

  console.log(dataProjects);

  renderProject();
}

function renderProject() {
    document.getElementById("addProject").innerHTML = "";
  
    for (let index = 0; index < dataProjects.length; index++) {
      document.getElementById("addProject").innerHTML += `
      <div id="addProject">
      <div class="project-list-item">
          <h1>${dataProjects[index].Project}</h1>
          <p class="paragraf">
          ${dataProjects[index].Description}
          </p>
          <img src="asset/css/Gambar/playstore.png" alt="">
          <img src="asset/css/Gambar/android.png" alt="">
          <img src="asset/css/Gambar/java.png" alt="">
          <div class="button">
              <button class="buttom-group">Edit</button>
              <button class="buttom-group">Delete</button>
      </div>
      </div>`;
    }
}