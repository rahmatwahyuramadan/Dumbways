class Testimoni {
    // properties
    constructor(image, massage, person) {
        this._image = image;
        this._massage = massage;
        this._person = person;
    }
  
    // methods
    get image() {
        return this._image;
      }
    
    get massage() {
        return this._massage;
      }
    
    get person() {
        return this._person;
      }
    
    set image(val) {
        if (val === "") {
          console.log("Image cannot be empty");
          return;
        }
    
        this._image = val;
      }
    
    set massage(val) {
        if (val === "") {
          console.log("Quote cannot be empty");
          return;
        }
    
        this._massage = val;
      }
    
      set person(val) {
        if (val === "") {
          console.log("Name cannot be empty");
          return;
        }
    
        this._person = val;
      }
  }

  let testimonials = document.getElementById("getTestimoni");

window.addEventListener("load", () => {
  if (testimonials === undefined) {
    return;
  }

  dataTestimonials = [
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      massage: "Menyala abangku",
      person: "Jonny",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      massage: "Tipis-tipis capt",
      person: "Andre",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      massage: "kelas capt",
      person: "Mega",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      massage: "Kelas yang punya setengah Indonesia",
      person: "Lutfi"
    }
  ];

  dataTestimonials.forEach((data) => {
    let testimonial = new Testimoni(data.image, data.massage, data.person);

    testimonials.innerHTML += `
    <div class="testimoni" id="getTestimoni">
    <div class="rootCard">
        <div>
            <img src="${testimonial.image}" alt="">
        </div>
        <div>
            <q>${testimonial.massage}</q>
        </div>
        <div>
            <blockquote>-${testimonial.person}</blockquote>
        </div>
    </div>
    </div>
    `;
  });
});