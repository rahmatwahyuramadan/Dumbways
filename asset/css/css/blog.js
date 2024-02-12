function addBlog(event) {
    event.preventDefault();

    let title = document.getElementById("input-blog-title").value;
    let content = document.getElementById("input-blog-content").value;

    let dataObject = [
        {
            name : "rahmat"
            age : 23
        },
        {
            name : "wahyu"
            age : 21
        }
    ];

    console.log("data ArrayOfObject : ", dataObject)
}