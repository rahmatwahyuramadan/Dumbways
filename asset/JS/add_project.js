let dataProjects = [];

function addProject(event) {
  event.preventDefault();

  let Project = document.getElementById("input-project-name").value;
  let startDate = new Date(document.getElementById("start-date").value);
  let endDate = new Date(document.getElementById("end-date").value);
  let Description = document.getElementById("description").value;
  let inputNodeJS = document.getElementById("inputNodeJS").checked;
  let inputNextJS = document.getElementById("inputNextJS").checked;
  let inputReactJS = document.getElementById("inputReactJS").checked;
  let inputGolang = document.getElementById("inputGolang").checked;
  let postAt = new Date

  let dataProject = {
    Project,
    startDate,
    endDate,
    Description,
    inputNodeJS,
    inputNextJS,
    inputReactJS,
    inputGolang,
    postAt
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
          Durasi : ${getDistenceTime(dataProjects[index].startDate, dataProjects[index].endDate)}
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

// function getFullDate(time) {
//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "Mei",
//     "Jun",
//     "Jul",
//     "Ags",
//     "Sep",
//     "Okt",
//     "Nov",
//     "Des",
//   ];

//   const year = time.getFullYear();
//   const month = time.getMonth();
//   const date = time.getDate();
//   const hour = time.getHours();
//   const minute = time.getMinutes();

//   return `${date} ${monthNames[month]} ${year} - ${hour}:${minute} WIB`;
// }

function getDistenceTime(startDate, endDate) {
  let timeStart = startDate;
  let timeEnd = endDate;
  let getDistenceTime = endDate - startDate; 
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
