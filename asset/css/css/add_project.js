let dataProjects = [];

function dataProject(event) {
  event.preventDefault();

  let Project = document.getElementById("input-project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let Description = document.getElementById("description").value;
  let Technologies = document.getElementById("technologies");

  let dataProject = {
    Project,
    Description: Description,
  };

  dataProjects.push(dataProject);

  console.log(dataProjects);

  renderProject();
}

function renderProject() {
    document.getElementById("project").innerHTML = "";
  
    for (let index = 0; index < dataProjects.length; index++) {
      document.getElementById("project").innerHTML += `
      <div id="project">
            <div class="project-list-item">
                <h1>${dataProjects[index].project}</h1>
                <p>
                ${dataProjects[index].description}
                </p>
                <img src="asset/css/Gambar/playstore.png" alt="">
                <img src="asset/css/Gambar/android.png" alt="">
                <img src="asset/css/Gambar/java.png" alt="">
                <div class="button">
                    <button class="buttom-group">Edit</button>
                    <button class="buttom-group">Delete</button>
            </div>
      </div>
      `;
    }
}