const image = document.getElementById("post-image");
const title = document.getElementById("post-title");
const text = document.getElementById("post-text");
const url = document.getElementById("post-url");
const loadImageInput = document.getElementById("load-image");
const form = document.getElementById("create-post");
const listPosts = document.querySelector(".posts-inner");
const message = document.getElementById("error");
const loadMoreBtn = document.getElementById("load-more");


let countVisiblePosts = 10;
const postsCol = [
    [
        "/images/avatar-1.jpg",
        "Marco em Polo",
        "Student Lorem ipsum dolor sit amet.",
        "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal",
    ],

    [
        "/images/avatar-2.jpg",
        "Alberto De Manelo",
        "Senior Fullstek dev",
        "https://parceljs.org/features/development/",
    ],

    [
        "/images/avatar-3.jpg",
        "Emet la Lorem",
        "Airplane Pilot",
        "https://ru.wikipedia.org/wiki/Boeing",
    ],

    [
        "/images/avatar-5.jpg",
        "Tomara Wane",
        "nurse",
        "https://index.minfin.com.ua/reference/coronavirus/geography/",
    ],

    [
        "/images/avatar-4.jpg",
        "Lora Bethovenchini",
        "musician",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-6.jpg",
        "Test(enter name)",
        "teacher",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-7.jpg",
        "Test(enter name)",
        "Music Producer",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-8.jpg",
        "Test(enter name)",
        "Finance Manager",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-9.jpg",
        "Test(enter name)",
        "Student Lorem ipsum dolor sit amet.",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-10.jpg",
        "Test(enter name)",
        "Shop-assistant",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-11.jpg",
        "Test(enter name)",
        "Professional Sportsman",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-12.jpg",
        "Test(enter name)",
        "Finance Manager",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],

    [
        "/images/avatar-14.jpg",
        "Alex",
        "Junior Frond-end Developer",
        "https://t.me/zholudev111",
    ],

    [
        "/images/avatar-13.jpg",
        "Alex",
        "Junior Sandwich Developer",
        "https://www.olx.ua/d/hobbi-otdyh-i-sport/muzykalnye-instrumenty/q-%D0%B0%D0%BA%D0%BA%D0%BE%D1%80%D0%B4%D0%B5%D0%BE%D0%BD/",
    ],
];

function isFileImage(file) {
    return file && file["type"].split("/")[0] === "image";
}

const regexps = {
    cyrillic: new RegExp(/^[\s\u0400-\u04FF]+$/),
};

const createPost = (arrTmp) => {
    const [imageURL, title, text, postURL] = arrTmp;

    return `
    <div class="post">
      <a href="${postURL}" class="post-wrapper">
        <img width="300" height="300" src="${imageURL}" alt="Post image">
        <span class="title">${title}</span>
        <span class="text">${text}</span>
      </a>
    </div>
  `;
};

const addPost = () => {
    postsCol.push([image.src, title.value, text.value, url.value]);
    form.reset();
    image.src = "";
    countVisiblePosts++
    image.style.display = "none";
};

const renderPosts = () => {
    const preloader = document.getElementById("preloader");

    listPosts.innerHTML = "";


    if (countVisiblePosts > postsCol.length) {
        countVisiblePosts = postsCol.length;
        loadMoreBtn.style.display = "none";
    }

    const arrToShow = postsCol.slice(0, countVisiblePosts);

    for (const item of arrToShow) {
        listPosts.innerHTML += createPost(item);
    }

    preloader.style.display = "none";
};

const textFields = (str) => {
    let max_chars = 250;

    if (str.length > max_chars) {
        text.value = text.value.substring(0, max_chars);
    }
};

const titleFields = () => {
    title.value = title.value.substring(0, 20);
};

title.oninput = function () {
    titleFields();
};

text.oninput = function (e) {
    textFields(e.target.value);
};

const validateField = (elem, type) => {
    const errorMsg = {
        img: "Файл должен быть картинкой!",
        title: [
            "Пожалуйста, введите Свою Профессию!",
            "Заголовок должен иметь только кириллические символы!",
        ],
        text: [
            "Пожалуйста, введите Ваше имя!",
            "Текст должен иметь только кириллические символы!",
        ],
    };
    const errorArr = [];

    switch (type) {
        case "img":
            if (!isFileImage(elem)) {
                errorArr.push(errorMsg[type]);
            }
            break;
        case "title":
        case "text":
            if (!elem.value.length) {
                errorArr.push(errorMsg[type][0]);
            }

            if (!regexps.cyrillic.test(elem.value)) {
                errorArr.push(errorMsg[type][1]);
            }
            break;
    }

    return errorArr.reduce((acc, item) => acc + `<p>${item}</p><br/>`, "");
};

const validateFields = () => {
    let resultStr = "";
    message.innerHTML = "";

    resultStr += validateField(loadImageInput.files[0], "img");
    resultStr += validateField(title, "title");
    resultStr += validateField(text, "text");

    if (resultStr.length) {
        message.innerHTML += resultStr;
        return false;
    }

    return true;
};

loadImageInput.onchange = () => {
    const [file] = loadImageInput.files;
    if (isFileImage(file)) {
        image.src = URL.createObjectURL(file);
        image.style.display = "block";
    }
};

loadMoreBtn.onclick = () => {
    countVisiblePosts += 10;
    renderPosts();
};

window.onload = () => {
    renderPosts();
};

form.onsubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    addPost();
    renderPosts();
    message.innerHTML = "";
};
