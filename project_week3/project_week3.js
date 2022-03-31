var listItemLeft = document.getElementById('menu-left-mobile');
let listItemNav = document.getElementById('nav-menu');
const menuNavIcon = document.getElementById('header-content-item');

function onClick() {
    listItemLeft.classList.toggle("menu-click");
}

function onClickNavMenu() {
    listItemNav.classList.toggle('menu-click');
    menuNavIcon.classList.toggle('active');
}


window.addEventListener("scroll", onScroll);

function onScroll() {
    if(window.pageYOffset <= 60) {
        listItemLeft.classList.remove('hidden-menu');
    }
    else {
        listItemLeft.classList.add('hidden-menu');
    }
}