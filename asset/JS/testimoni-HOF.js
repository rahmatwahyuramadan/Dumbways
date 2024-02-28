const data = [
    {
      name: "Padil",
      comment: "Keren banget bang",
      image: "asset/css/Gambar/orang1.jpeg",
      rating: 1
    },
    {
      name: "Azzam",
      comment: "Mantap abangku",
      image: "asset/css/Gambar/orang2.jpeg",
      rating: 5
    },
    {
      name: "Janggar",
      comment: "Ga tau aku tu bang",
      image: "asset/css/Gambar/orang3.jpeg",
      rating: 5
    },
    {
      name: "Mega Chan",
      comment: "eh ha'ah laaa",
      image: "asset/css/Gambar/orang4.jpeg",
      rating: 2
    },
    {
      name: "Prabroro",
      comment: "Gas Makan siang Gratis",
      image: "asset/css/Gambar/orang5.jpeg",
      rating: 4
    },
  ]

  const getData = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = "https://api.npoint.io/1465052a4f4453fb4ba3";
  
      xhr.open("GET", url);
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Request gagal. Status code: ", xhr.status);
        }
      };
    });
  };
  
  // show all testimonial datas
    const Testimonials = async () =>  {
    let dataHTML = ''
    const data = await getData();
    const dataTestimonials = data.data;
  
    console.log(dataTestimonials);

    dataTestimonials.forEach((data) => {
      let testimonial = new Testimoni(
        data.image,
        data.comment,
        data.author,
        data.rate
      ); 

      dataHTML += `
      <div class="testimoni" id="getTestimoni">
        <div class="rootCard">
          <div class="testimonial">
            <img
              class="image-card"
              src="${testimonial.image}"/>
            <p class="quote">${testimonial.comment}</p>
            <p class="author">- ${testimonial.author}</p>
            <p class="author">- ${testimonial.rate}</p>
          </div>
        </div>
      </div>
      `
    })
  
    document.getElementById("getTestimoni").innerHTML = dataHTML
  }
  Testimonials()
  
  
  
  const FilterTestimonial = async (rating) => {
    let testimonials = document.getElementById("getTestimoni");
    const data = await getData();
    const dataTestimonials = data.data;
  
    let filteredData = dataTestimonials.filter((data) => data.rate === rating);

    testimonials.innerHTML = "";

    filteredData.forEach((data) => {
    let testimonial = new Testimoni(
      data.image,
      data.comment,
      data.author,
      data.rate
    );
  
    dataHTML += `
      <div class="testimoni" id="getTestimoni">
        <div class="rootCard">
          <div class="testimonial">
            <img
              class="image-card"
              src="${testimonial.image}"/>
            <p class="quote">${testimonial.comment}</p>
            <p class="author">- ${testimonial.author}</p>
            <p class="author">- ${testimonial.rate}</p>
          </div>
        </div>
      </div>
      `
    })

    document.getElementById("getTestimoni").innerHTML = dataHTML
  }

  window.addEventListener("load", async () => {
    if (new Testimoni() === undefined) {
      return;
    }
  
    await Testimonials();
  });