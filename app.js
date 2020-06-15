const name=document.querySelector(".name")
const container=document.querySelector(".test-container")
const register=document.querySelector(".register")
const start=document.querySelector(".basla")
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
const question=document.querySelector(".question");
const options=document.querySelector(".options").children;
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionNumber=document.querySelector(".total-number");
const answerTrackerContainer=document.querySelector(".answer-tracker");
let correctAnswerSpan=document.querySelector(".correct-answer");
let totalQuestionSpan=document.querySelector(".total-question");
let percent=document.querySelector(".percent")
let questionIndex;
let index=0;
let myArray=[];
let score=0;

///ad daxil edilmedikde teste icaze vermemesi ucun
function basla(){
    if(!name.value==''){
        register.style.display="none";
        container.style.display="block";
    }
    else{
        alert("adinizi daxil edin")
    }
    

}


//suallar variantlar ve cavablar

let suallar=[
    {
        sual:'el classico hansi qarsilasmaya deyilir',
        variantlar: ['barcelona vs real madrid','fenerbahce vs qalatasaray','boca vs river plate','milan vs inter'],
        cavab:0
    },
    {
        sual:'futbol uzre 2006 dunya cempionu?',
        variantlar: ['almanya','italiya','brazilya','fransa'],
        cavab:1
    },
    {
        sual:' flaqman hansi komandaya deyirler?',
        variantlar: ['qarabag','qebele','neftchi','zire'],
        cavab:2
    },
    {
        sual:'cempionlar liqasinda en cox titulu olan italiya klubu?',
        variantlar: ['milan','inter','roma','yuventus'],
        cavab:0
    },
    {
        sual:'bunlardan hansi barcelonada oynamayib?',
        variantlar: ['pato','ronaldinho','messi','maradona'],
        cavab:0
    },
    
];
/// nece sualdan ibaret oldugunu gosterir
totalQuestionNumber.innerHTML=suallar.length

//load funksiyasi ile sual ve variantlari yuklemek
function load(){  
    questionNumberSpan.innerHTML=index+1   //necenci sualda oldugumuzu gosterir
    question.innerHTML=suallar[questionIndex].sual;  //sual
    op1.innerHTML=suallar[questionIndex].variantlar[0];//variantlar
    op2.innerHTML=suallar[questionIndex].variantlar[1];
    op3.innerHTML=suallar[questionIndex].variantlar[2];
    op4.innerHTML=suallar[questionIndex].variantlar[3];
    index++ //necenci sualdan oldugumuzu gostermek ucun novbeti suala kecdikde index artsin
}
///suallari tesadufi olaraq vermesi ucun funksiya
function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*suallar.length); ///objectden tesadufi suallar verir
    let dublicate=0; //tekrar sualin olmamasi ucun yaratdigim deyisen
    if(index==suallar.length){ 
        suallarBitdi();// suallar bitdikde bu funksiyani cagiracaq
    }
    else{
        if(myArray.length>0){
            for(let i=0;i<myArray.length;i++){  //tekrar sual oldugda break elesin 
                if(myArray[i]==randomNumber){
                    dublicate=1;
                    break;
                }
            }
            if(dublicate==1){   
                randomQuestion();
            }
            else{
                questionIndex=randomNumber;
                load();
            }
        }
        if(myArray.length==0){
            questionIndex=randomNumber;
            load();
        }

        
        myArray.push(randomNumber)
        
    }
}



//sualin yoxlanmasi ucun funksiya
function check(element){
    if(element.id==suallar[questionIndex].cavab){  ///html idler 0dan 3e kimi secmisem 
        element.classList.add("correct") //duz cavab oldugda cssden gelen animasiyali background-color
        updateAnswerTracker("duz")//asagdaki dairelerde duz cavab verdikde rengi yasil olsun
        score++  ///duz oldugda score artsin
        
    }
    else{
        element.classList.add("wrong")
        updateAnswerTracker("sehv")
    }
    disableOptions(); //eger sual cavabladigda diger variantlara clicki blocklamaq ucun
}

function disableOptions(){
    for(let i=0;i<options.length;i++){
        options[i].classList.add("disabled");
        if(options[i].id==suallar[questionIndex].cavab){
            options[i].classList.add("correct");
        }
    }
}
//novbeti suala kecdikde disable olmasin ve elave etdiyim classlari silsin
//sonra validate() funksiyasinda cagirilsin
function enableOptions(){  
    for(let i=0;i<options.length;i++){
        options[i].classList.remove("disabled","correct","wrong")
    }
}

//suallarin sayi qeder daireler yaransin asagida
function answerTracker(){
    for(let i=0;i<suallar.length;i++){
        const div=document.createElement("div");//yeni element yaratmaq ucun
        answerTrackerContainer.appendChild(div) //yaradilmis elementin valideyne menimsetmek ucun
    }
}

//asagidaki dairelere sehv ve duz oldugda class menimsetmek ucun 
//sonra bu funksiya check() funksiyasi icinde cagiralacaq neticeye uygun bacgroun-color deyisecek
function updateAnswerTracker(className){
    answerTrackerContainer.children[index-1].classList.add(className)
}

//eger variantlar secilmeden nexte basdigda alert cixsin
//eger her sey qaydasindadirsa enableOptions() ve randomQuestion() funksiyalari cagirilsin
function validate(){
    if(!options[0].classList.contains("disabled")){
        alert('suali cavablandirmalisiz')
    }
    else{
        enableOptions();
        randomQuestion();
    }
}

//validate() islesin
function next(){
    validate()
}

//suallar bitdikde evvelceden css display none olan elemnet gorsensin
//neticede nece sualdan necsini bildiyim gorsensin ve bunu faizle ifade etsin
function suallarBitdi(){
    document.querySelector(".end").classList.add("result");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan.innerHTML=suallar.length;
    percent.innerHTML=(score/suallar.length)*100;
}

//eger yeniden test etmek isteyiremse reload()
function tryAgain(){
    window.location.reload()
}

window.onload=function(){
    randomQuestion();
    answerTracker();
}