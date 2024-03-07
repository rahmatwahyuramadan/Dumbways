let dataBlogs = []

function addBlog(event) {
    event.preventDefault();

    let title = document.getElementById("input-blog-title").value;
    let content = document.getElementById("input-blog-content").value;
    let postAt = new Date()

    let dataBlog = [
        title,
        content,
        postAt,
    ];

    dataBlogs.push(dataBlog)
    console.log(newdate)

    renderBlog()
}

