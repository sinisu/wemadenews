const API_KEY=`1ca59444f6184e01a70725c06a31ae22`
let news=[];
const getLatestNews = async ()=>{
    const url= new URL(`https://wemadenews.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
    const response = await fetch(url) //fetch는 url로 정보를 요청하는것
    const data = await response.json();
    news = data.articles;
    console.log("dataja",news);
};

getLatestNews();