function getData() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phonenumber = document.getElementById("phonenumber").value
    let subject = document.getElementById("subject").value
    let massage = document.getElementById("massage").value

    if(name == ""){
        return alert("please type your name")
    }
    else if(email == ""){
        return alert("please type your email")
    }
    else if(phonenumber == ""){
        return alert("please type your phonenumber")
    }
    else if(subject == ""){
        return alert("please type your subject")
    }
    else if(massage == ""){
        return alert("please type your massage")
    }

    const emailDestination = "rahmatwahyuramadan@gmail.com"
    let a = document.createElement("a")
    a.href = `mailto:"${emailDestination}?subject=${subject}&body= halo bang saya ${name}, saya ingin ${massage}, silahkan anda menghubungi saya ${phonenumber}`
    a.click()

    const data = {
        name,
        email,
        phonenumber,
        subject,
        massage,
    }

    console.log(data)
}