
function onClick() {
    var listItemLeft = document.getElementById('menu-left-mobile');
    listItemLeft.classList.toggle("menu-click");
}

function onClickNavMenu() {
    var listItemNav = document.getElementById('nav-menu');
    listItemNav.classList.toggle('menu-click');

    var menuNavIcon = document.getElementById('header-content-item')
    menuNavIcon.classList.toggle('active');
}