
/* Menu Tablet & mobile */
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
    if(window.pageYOffset <= 35) {
        listItemLeft.classList.remove('hidden-menu');
    }
    else {
        listItemLeft.classList.add('hidden-menu');
    }
}

/* Modal */
var contentList = [
    {
        title: 'WWF',
        description: 'The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.',
        userName: 'Hoàng Văn Thoáng'
    },
    {
        title: 'WTF',
        description: 'The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.',
        userName: 'Hoàng Văn Thái'
    },
];

let addModal = document.getElementById('modal-add');
let btnAdd = document.getElementById('btn-add');
let done = document.getElementById('submit');


btnAdd.onclick = function openModal() {
    addModal.style.display = 'block';

    const _form = document.getElementById('form-addContent');
    const title = _form.elements['title'].value = '';
    const desc = _form.elements['desc'].value = '';
    const author = _form.elements['author'].value = '';
}

function closeModal() {
    addModal.style.display = 'none';
}

window.onclick = function() {
    if(event.target == addModal) {
        addModal.style.display = 'none';
    }
}
//handle add

function start() {
    showList();
}

start();

function showList() {

var listContent= document.querySelector('#list-content');

    var htmls = contentList.map((content)=> {
        return `
        <div class="content-right--item">
            <section class="content-right-details bgr-orange" 
                <p class="content-right--item-title">
                    ${content.title}             
                </p>
                <article>
                <p class="content-right--item-desc">
                    ${content.description}       
                </p>
                </article>
             <div class="content-right--name-user">
                    ${content.userName}  
             </div>
           </section>
        </div>
        `
    })
    listContent.innerHTML = htmls.join('')
}


done.onclick = function() {
    event.preventDefault();
    const _form = document.getElementById('form-addContent');
    const title = _form.elements['title'].value;
    const desc = _form.elements['desc'].value;
    const author = _form.elements['author'].value;

    addPost(title, desc, author);
    showList();
    closeModal();
}

function addPost(title, desc, author) {

    if(title != '' && desc != '' && author != '') {
        contentList.push({
            title: title,
            description: desc,
            userName: author
        })
    }
}