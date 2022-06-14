// id`s
const image = document.getElementById('post-image');
const title = document.getElementById('post-title');
const text = document.getElementById('post-text');
const url = document.getElementById('post-url');
const loadImageInput = document.getElementById('load-image');
const preloader = document.getElementById('preloader');
const form = document.getElementById('create-post');
const listPosts = document.querySelector('.posts-inner');
const message = document.getElementById('error');
const loadMoreBtn = document.getElementById('load-more');


//block`s()
let countVisiblePosts = 11;
const postsCol = [

    [
        "/images/avatar-1.jpg",
        "Marco em Polo",
        "Student Lorem ipsum dolor sit amet.",
        "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal"
    ],


    ["/images/avatar-2.jpg",
        "Alberto De Manelo",
        "Senior Fullstek dev",
        "https://parceljs.org/features/development/"
    ],


    [
        "/images/avatar-3.jpg",
        "Emet la Lorem",
        "Airplane Pilot",
        "https://ru.wikipedia.org/wiki/Boeing"
    ],

    [
        "/images/avatar-5.jpg",
        "Tomara Wane",
        "nurse",
        "https://index.minfin.com.ua/reference/coronavirus/geography/"
    ],
    [
        "/images/avatar-4.jpg",
        "Lora Bethovenchini",
        "musician",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],
    [
        "/images/avatar-6.jpg",
        "Test(enter name)",
        "teacher",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],
    [

        "/images/avatar-7.jpg",
        "Test(enter name)",
        "Music Producer",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"

    ],
    [

        "/images/avatar-8.jpg",
        "Test(enter name)",
        "Finance Manager",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"

    ],

    [
        "/images/avatar-9.jpg",
        "Test(enter name)",
        "Student Lorem ipsum dolor sit amet.",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],

    [
        "/images/avatar-10.jpg",
        "Test(enter name)",
        "Shop-assistant",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],

    [
        "/images/avatar-11.jpg",
        "Test(enter name)",
        "Professional Sportsman",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],

    [   "/images/avatar-12.jpg",
        "Test(enter name)",
        "Finance Manager",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],

    [   "/images/avatar-14.jpg",
        "Alex",
        "Junior Frond-end Developer",
        "https://t.me/zholudev111"
    ],

    [   "/images/avatar-13.jpg",
        "Alex",
        "Junior Sandwich Developer",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    ],
];



function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

const regexps = {
    cyrillic: new RegExp(/^[\s\u0400-\u04FF]+$/)
}


const createPost = (arrTmp) => {

    let postURL = '';
    let imageURL = '';
    let title = '';
    let text = '';

    for (let i = 0; i < arrTmp.length - 1; i++) {
        postURL = arrTmp[3]
        imageURL = arrTmp[0]
        title = arrTmp[1]
        text = arrTmp[2]
    }

    console.log(postURL)
    console.log(imageURL)
    console.log(title)
    console.log(text)

    return `
    <div class="post">
      <a href="${postURL}" class="post-wrapper">
        <img width="300" height="300" src="${imageURL}" alt="Post image">
        <span class="title">${title}</span>
        <span class="text">${text}</span>
      </a>
    </div>
  `;
}


 const addPost = () => {

     let newPost = []


    let imgTmp = image.src;
    let titleTmp = title.value;
    let textTmp = text.value;
    let urlTmp = url.value;

     newPost.push(imgTmp)
     newPost.push(titleTmp)
     newPost.push(textTmp)
     newPost.push(urlTmp)






    console.log(newPost,"new post")

    postsCol.push(newPost);

    form.reset();
    image.style.display = 'none';
}




const renderPosts = () => {




    preloader.style.display = 'block';

    listPosts.innerHTML = '';

    if (countVisiblePosts > postsCol.length) {
        countVisiblePosts = postsCol.length;
        loadMoreBtn.style.display = 'none';
    }

    if (loadMoreBtn.style.display === 'none') {
        countVisiblePosts = postsCol.length;
    }



    if(countVisiblePosts === 11){
        for (let i = 0; i < countVisiblePosts; i++) {
            const item = postsCol[i]
            listPosts.innerHTML += createPost(item);
        }
    }else{

        for (let i = 0; i < countVisiblePosts; i++) {
            const item = postsCol[i]
            listPosts.innerHTML += createPost(item);
        }

    }


    console.log(postsCol.length)

    const lastImageInList = listPosts.children[listPosts.childElementCount - 1].children[0].children[0];
    lastImageInList.onload = () => {
        preloader.style.display = 'none';
    }

    console.log(postsCol.length)
    console.log(postsCol)
}

const textFields = () => {

    let max_chars = 250;

    if (text.value.length > max_chars) {
        this.value = this.value.substring(0, max_chars);
    }

}

const titleFields = (title) => {

    title.oninput = (title) => {
        title.value = title.value.substring(0, 20);
    }
}

const validateFields = () => {
    if (!isFileImage(loadImageInput.files[0])) {
        message.innerHTML += `<p>Файл должен быть картинкой!</p><br/>`;
        return false;
    }

    if (text.value.length === 0) {
        message.innerHTML += `<p>Пожалуйста, введите Ваше имя!</p><br/>`;
        return false
    }

    if (title.value.length === 0) {
        message.innerHTML += `<p>Пожалуйста, введите Свою Профессию!</p><br/>`
        return false
    }

    if (!regexps.cyrillic.test(title.value)) {
        message.innerHTML += `<p>Заголовок должен иметь только кириллические символы!</p><br/>`;
        return false;
    }

    if (!regexps.cyrillic.test(text.value)) {
        message.innerHTML += `<p>Текст должен иметь только кириллические символы!</p><br/>`;
        return false;
    }





    titleFields(title);
    textFields(text);

    return true;
}


loadImageInput.onchange = () => {
    const [file] = loadImageInput.files;
    if (isFileImage(file)) {
        image.src = URL.createObjectURL(file);
        image.style.display = 'block';
    }
}


loadMoreBtn.onclick = () => {
    countVisiblePosts += 10;
    renderPosts();
    console.log(postsCol.length)
}

window.onload = () => {
    renderPosts();
}

form.onsubmit = e => {
    e.preventDefault();
    const isValid = validateFields();
    isValid ? addPost() : null;
    renderPosts();
}


