const API_KEY=`1ca59444f6184e01a70725c06a31ae22`
let newsList=[];
const getLatestNews = async ()=>{
    const url= new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}&pageSize=20`);
    // 과제 제출시 https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}
    const response = await fetch(url) //fetch는 url로 정보를 요청하는것
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dataja",newsList);
};

getLatestNews();

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

const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news-view">
    <div class="col-lg-4">
        <img class="main-imgsize" src="${news.urlToImage||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}">
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