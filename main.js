// id`s
const image = document.getElementById("post-image");
const title = document.getElementById("post-title");
const text = document.getElementById("post-text");
const url = document.getElementById("post-url");
const loadImageInput = document.getElementById("load-image");
const form = document.getElementById("create-post");
const message = document.getElementById("error");
const loadMoreBtn = document.getElementById("load-more");

let countVisiblePosts = 0;
let addedPosts = 0;
const postsCol = [];

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
    const preloader = document.getElementById("preloader");
    const listPosts = document.querySelector(".posts-inner");

    preloader.style.display = "block";

    listPosts.innerHTML = "";

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


        if (postsCol.length % 10 === 1) {
            loadMoreBtn.style.display = "block";

        }  if(postsCol.length === addedPosts)  {
            loadMoreBtn.style.display = "none";

        }

    }


        const arrToShow = postsCol.slice(0, addedPosts);

        for (const item of arrToShow) {
            listPosts.innerHTML += createPost(item);
        }

    if(postsCol.length > 0){
        let lastImageInList = listPosts.children[listPosts.childElementCount-1].children[0].children[0]
        lastImageInList.onload = () => preloader.style.display = "none";
    }else {
        preloader.style.display = "none";
    }

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


        if(postsCol.length >= 11 && addedPosts < countVisiblePosts ){
            addedPosts = countVisiblePosts;
            if(!addedPosts % 10 === 1 ){
                let tmp = addedPosts; // 6
                addedPosts += 10 - tmp;
            }
        }

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
        renderPosts();
        message.innerHTML = "";
    };