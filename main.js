// id`s
const image = document.getElementById("post-image");
const title = document.getElementById("post-title");
const text = document.getElementById("post-text");
const url = document.getElementById("post-url");
const loadImageInput = document.getElementById("load-image");
const preloader = document.getElementById("preloader");
const form = document.getElementById("create-post");
const listPosts = document.querySelector(".posts-inner");
const message = document.getElementById("error");
const loadMoreBtn = document.getElementById("load-more");

console.log(listPosts)

//block`s()
let countVisiblePosts = 10;
let addedPosts = 10;
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

];

console.log(postsCol.length, 'length of array')

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
    image.style.display = "none";
};

const renderPosts = () => {
    listPosts.innerHTML = "";

    console.log(postsCol)

    if (countVisiblePosts > postsCol.length) {
        countVisiblePosts = postsCol.length;
        loadMoreBtn.style.display = "none";
    }


    if (postsCol.length < 11) {
        loadMoreBtn.style.display = "none";
        addedPosts = countVisiblePosts
        listPosts.length = 10;

    }
    else if (postsCol.length > 10 && loadMoreBtn.onclick !== onclick) {
            listPosts.length = 10;
            // if(postsCol.length < 20 ){
            //     addedPosts++
            // }
        // addedPosts = countVisiblePosts;

        if (postsCol.length % 10 === 1) {
            loadMoreBtn.style.display = "block";
            console.log(222)
            console.log(listPosts.length % 10 !== 1,'? true')
            console.log(listPosts.length)
        }  if(postsCol.length === addedPosts)  {
            loadMoreBtn.style.display = "none";
            console.log(111)
        }

    }


        const arrToShow = postsCol.slice(0, addedPosts);

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


        if(postsCol.length > 11 && addedPosts < countVisiblePosts ){
            addedPosts = countVisiblePosts;
            if(!addedPosts % 10 === 1 ){
                let tmp = addedPosts; // 6
                console.log(tmp)
                addedPosts += 10 - tmp;
            }// else if() {
            //
            //
            // }
        }
        console.log(countVisiblePosts,'plus + 10')
        console.log(addedPosts,'added on click')
        renderPosts();
    };

    window.onload = () => {
        renderPosts();
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        addPost();
        countVisiblePosts++
        console.log(countVisiblePosts, 'countVisible')
        renderPosts();
        message.innerHTML = "";
    };