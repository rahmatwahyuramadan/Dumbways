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
  
  // show all testimonial datas
  function Testimonials() {
    let dataHTML = ''
  
    data.forEach(function (data) {
      dataHTML += `
      <div class="testimoni" id="getTestimoni">
        <div class="rootCard">
          <div class="testimonial">
            <img
              class="image-card"
              src="${data.image}"/>
            <p class="quote">${data.comment}</p>
            <p class="author">- ${data.name}</p>
          </div>
        </div>
      </div>
      `
    })
  
    document.getElementById("getTestimoni").innerHTML = dataHTML
  }
  Testimonials()
  
  
  
  const FilterTestimonial = (rating) => {
    let dataHTML = ''
  
    const dataFiltered = data.filter((data) => {
      return data.rating === rating
    })
  
    if(!dataFiltered.length) {
      dataHTML += `<h1 class="title">Data not found!!</h1>`
    } else {
      dataFiltered.forEach((data) => {
        console.log(data)
        dataHTML += `
        <div class="testimoni" id="getTestimoni">
          <div class="rootCard">
            <div class="testimonial">
              <img class="image-card" src="${data.image}"/>
              <p class="quote">${data.comment}</p>
              <p class="author">- ${data.name}</p>
            </div>
          </div>
        </div>
        `
      })
    }
    document.getElementById("getTestimoni").innerHTML = dataHTML
  }