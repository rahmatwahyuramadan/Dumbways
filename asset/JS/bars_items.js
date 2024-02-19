let isHumbergerOpen = false;

const openHamburger = () => {
    let humburgerItemElement = document.getElementById("humburger-list-item");

    if (isHumbergerOpen == false) {
        humburgerItemElement.style.display = "block";
        isHumbergerOpen = true;
    } else {
        humburgerItemElement.style.display = "none"
        isHumbergerOpen = false;
    }
}