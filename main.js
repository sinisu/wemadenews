const API_KEY=`1ca59444f6184e01a70725c06a31ae22`
let newsList=[];
const menus=document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
const sideMenus=document.querySelectorAll(".side-menus button")
sideMenus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
const userSearch=document.getElementById("search-input")
userSearch.addEventListener("focus",()=>userSearch.value="")
let url= new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}&pageSize=20`);


const getWeNews = async ()=>{
    const response = await fetch(url) //fetch는 url로 정보를 요청하는것
    const data = await response.json();
    newsList = data.articles;
    render();
}

const getLatestNews = ()=>{
    url= new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}&pageSize=20`);
    // 과제 제출시 https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}
    getWeNews();
    console.log("dataja",newsList);
};

getLatestNews();

const getNewsByCategory=async(event)=>{
    const category=event.target.textContent.toLowerCase();
    const sidecategory=event.target.textContent.toLowerCase();
    url = new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&category=${category||sidecategory}&apiKey=${API_KEY}&pageSize=20`);
    getWeNews();
};

const enterKey=()=>{
    switch(event.key){
        case "Enter": searchNews();
    }
}

const searchNews=async()=>{
    const searchWord=document.getElementById("search-input").value;
    url = new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&q=${searchWord}&apiKey=${API_KEY}&pageSize=20`);
    getWeNews();
}

const openNav=()=> {
    document.getElementById("mySidenav").style.width = "18rem";
}

const closeNav=()=> {
    document.getElementById("mySidenav").style.width = "0";
}

const openSearchBox=()=>{
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display==="inline"){
        inputArea.style.display = "none";
    } else{
        inputArea.style.display = "inline";
    }
}

const imgError=(img)=>{
    img.onerror=null;
    img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news-view">
    <div class="col-lg-4">
        <img class="main-imgsize" src="${news.urlToImage}" onerror="imgError(this)">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description==null || news.description ==""
                ?"내용없음"
                : news.description.length>200
                ? news.description.substring(0,200)+"..."
                : news.description}</p>
        <div>${news.source.name||"no source"} ${moment(news.publishedAt).fromNow()}</div>
    </div>
</div>`
).join('');

    document.getElementById("news-article").innerHTML=newsHTML
}


    const calenderArea=document.getElementById("calendar-area")
    const times=moment().format('LL');
    calenderArea.innerHTML=`${times}`

    const calenderAreas=document.getElementById("calendar-areas")
    calenderAreas.innerHTML=`${times}`