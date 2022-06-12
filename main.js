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
const posts = [
    {
        "image": "/images/avatar-1.jpg",
        "title": "Marco em Polo",
        "text": "Student Lorem ipsum dolor sit amet.",
        "url": "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal"
    },
    {
        "image": "/images/avatar-2.jpg",
        "title": "Alberto De Manelo",
        "text": "Senior Fullstek dev",
        "url": "https://parceljs.org/features/development/"
    },
    {
        "image": "/images/avatar-3.jpg",
        "title": "Emet la Lorem",
        "text": "Airplane Pilot",
        "url": "https://ru.wikipedia.org/wiki/Boeing"
    },
    {
        "image": "/images/avatar-5.jpg",
        "title": "Tomara Wane",
        "text": "nurse",
        "url": "https://index.minfin.com.ua/reference/coronavirus/geography/"
    },
    {
        "image": "/images/avatar-4.jpg",
        "title": "Lora Bethovenchini",
        "text": "musician",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-6.jpg",
        "title": "Test(enter name)",
        "text": "teacher",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-7.jpg",
        "title": "Test(enter name)",
        "text": "Music Producer",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-8.jpg",
        "title": "Test(enter name)",
        "text": "Finance Manager",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-9.jpg",
        "title": "Test(enter name)",
        "text": "Student Lorem ipsum dolor sit amet.",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-10.jpg",
        "title": "Test(enter name)",
        "text": "Shop-assistant",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-11.jpg",
        "title": "Test(enter name)",
        "text": "Professional Sportsman",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-12.jpg",
        "title": "Test(enter name)",
        "text": "Finance Manager",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    },
    {
        "image": "/images/avatar-14.jpg",
        "title": "Alex",
        "text": "Junior Frond-end Developer",
        "url": "https://t.me/zholudev111"
    },
    {
        "image": "/images/avatar-13.jpg",
        "title": "Alex",
        "text": "Junior Sandwich Developer",
        "url": "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/"
    }


];

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

const regexps = {
    cyrillic: new RegExp(/^[\s\u0400-\u04FF]+$/)
}


const createPost = (postURL, imageURL, title, text) => {
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
    const newPost = {
        image: image.src,
        title: title.value,
        text: text.value,
        url: url.value
    }
    posts.push(newPost);
    form.reset();
    image.style.display = 'none';
}



const renderPosts = () => {
    preloader.style.display = 'block';

    listPosts.innerHTML = '';
    if (countVisiblePosts > posts.length) {
        countVisiblePosts = posts.length;
        loadMoreBtn.style.display = 'none';
    }
    if (loadMoreBtn.style.display === 'none') {
        countVisiblePosts = posts.length;
    }
    for (let i = 0; i < countVisiblePosts; i++) {
        const {image, title, text, url} = posts[i];
        listPosts.innerHTML += createPost(url, image, title, text);
    }

    const lastImageInList = listPosts.children[listPosts.childElementCount - 1].children[0].children[0];
    lastImageInList.onload = () => {
        preloader.style.display = 'none';
    }
}

const  textFields = ()=>{

    let max_chars = 250;

    if(text.value.length > max_chars) {
        this.value = this.value.substring(0, max_chars);
    }

}

const titleFields = (title) =>{

    title.oninput = (title)=>{
        title.value = title.value.substring(0,20);
    }
}

const validateFields = () => {
    if (!isFileImage(loadImageInput.files[0])) {
        message.textContent = 'Файл должен быть картинкой!';
        return false;
    }
    if (!regexps.cyrillic.test(title.value)) {
        message.textContent = '\nЗаголовок должен иметь только кириллические символы!';
        return false;
    }
    if (!regexps.cyrillic.test(text.value)) {
        message.textContent = '\nТекст должен иметь только кириллические символы!';
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


const textLength = document.querySelector('#value');

text.oninput = () =>{

   let symbols =  0;
   symbols++;
   console.log(symbols)

}