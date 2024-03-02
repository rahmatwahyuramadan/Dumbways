class Testimonial {
    #quote =""
    #image =""

    constructor(quote, image) {
        this.#quote = quote
        this.#image = image
    }

    get quote() {
        return this.#quote
    }

    get image() {
        return this.#image
    }

    get showTestimoni() {
        return `<div class="testimoni" id="getTestimoni">
        <div class="rootCard">
            <div>
                <img src="${this.image}" alt="">
            </div>
            <div>
                <q>${this.quote}</q>
            </div>
            <div>
                <blockquote>-${this.author}</blockquote>
            </div>
        </div>
        </div>`}
}

class Author extends Testimonial {
    #author = ""
  
    constructor(author, quote, image) {
      super(quote, image)
      this.#author = author
    }
  
    get author() {
      return this.#author
    }
  }


const user = new Testimonial(
    "mantap",
    "asset/css/Gambar/projectGambar.jpg"
)

const user1 = new Author(
    "Rahmat",
    "menyala abangku",
    "asset/css/Gambar/projectGambar.jpg"
)

let data = [user, user1]
let dataForHTML = ''

for( let i = 0; i < data.length; i++) {
    dataForHTML += data[i].showTestimoni
  }

document.getElementById("getTestimoni").innerHTML = dataForHTML