class Testimoni {
    // properties
    constructor(image, comment, author, rate) {
        this._image = image;
        this._comment = comment;
        this._author = author;
        this._rate = rate;
    }
  
    // methods
    get image() {
        return this._image;
      }
    
    get comment() {
        return this._comment;
      }
    
    get author() {
        return this._author;
      }

    get rate() {
        return this._rate;
      }
    
    set image(val) {
        if (val === "") {
          console.log("Image cannot be empty");
          return;
        }
    
        this._image = val;
      }
    
    set comment(val) {
        if (val === "") {
          console.log("Quote cannot be empty");
          return;
        }
    
        this._comment = val;
      }
    
      set author(val) {
        if (val === "") {
          console.log("Name cannot be empty");
          return;
        }
    
        this._author = val;
      }
    
      set rate(val) {
        if (val === "") {
          console.log("Rate cannot be empty");
          return;
        }
    
        this._author = val;
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
      comment: "Menyala abangku",
      author: "Jonny",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      comment: "Tipis-tipis capt",
      author: "Andre",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      comment: "kelas capt",
      author: "Mega",
    },
    {
      image: "asset/css/Gambar/projectGambar.jpg",
      comment: "Kelas yang punya setengah Indonesia",
      author: "Lutfi"
    }
  ];

  dataTestimonials.forEach((data) => {
    let testimonial = new Testimoni(data.image, data.comment, data.author);

    testimonials.innerHTML += `
    <div class="testimoni" id="getTestimoni">
    <div class="rootCard">
        <div>
            <img src="${testimonial.image}" alt="">
        </div>
        <div>
            <q>${testimonial.comment}</q>
        </div>
        <div>
            <blockquote>-${testimonial.author}</blockquote>
        </div>
    </div>
    </div>
    `;
  });
});