let N=2
let M=2
let Editmode=false
let ProductNameList=['치킨 18000','피자 23000','짜장면 12000','회 30000','맥주 9000','만두 10000','음료 3000']
let PersonNameList=['Kim','Park','Lee','Jeon','Choi','Jeong','Lim']
let StringToCopy=""
let T,EditButton,info,CalcButton,ResultPage,ResultText,CloseButton,DetailText,CopyButton

window.onload = function InitSet(){
    T=document.getElementById('MainTable')
    EditButton=document.getElementById('EditButton')
    info=document.getElementById('info')
    CalcButton=document.getElementById('CalcButton')
    ResultPage=document.getElementById('ResultPage')
    ResultText=document.getElementById('ResultText')
    CloseButton=document.getElementById('CloseButton')
    DetailText=document.getElementById('DetailText')
    CopyButton=document.getElementById('CopyButton')
    AddCol(); AddCol(); AddCol(); AddRow(); AddRow();
}

function AddCol(){
    let FirstRow=T.rows[0]
    let FirstCell=FirstRow.insertCell(M-1);
    let Newinput=document.createElement('input')
    Newinput.setAttribute('type','text')
    Newinput.setAttribute('placeholder',PersonNameList[(M-2)%7])
    Newinput.addEventListener('mouseover',WarnCol)
    Newinput.addEventListener('mouseout',UnWarnCol)
    Newinput.addEventListener('click',DeleteCol)
    FirstCell.appendChild(Newinput)
    for(let i=1;i<N-1;i++){
        let Row=T.rows[i]
        let NewCell=Row.insertCell(-1);
        let Newinput=document.createElement('input')
        Newinput.setAttribute('type','checkbox')
        NewCell.addEventListener('mouseover',WarnCell)
        NewCell.addEventListener('mouseout',UnWarnCell)
        NewCell.addEventListener('click',DisableCell)
        NewCell.className='pay'
        Newinput.addEventListener('click',CheckClick)
        Newinput.className='unchecked'
        for(let j=1;j<M-1;j++){
            if(T.rows[i].cells[j].childNodes[0].className==='checked'){
                Newinput.className='disabled'
                Newinput.disabled=true
                break
            }
        }
        NewCell.appendChild(Newinput)
    }
    M++
}
function AddRow(){
    let NewRow=T.insertRow(N-1)
    let FirstCell=NewRow.insertCell(0);
    let Newinput=document.createElement('input')
    Newinput.setAttribute('type','text')
    Newinput.setAttribute('placeholder',ProductNameList[(N-2)%7])
    Newinput.addEventListener('mouseover',WarnRow)
    Newinput.addEventListener('mouseout',UnWarnRow)
    Newinput.addEventListener('click',DeleteRow)
    FirstCell.appendChild(Newinput)
    for(let i=1;i<M-1;i++){
        let NewCell=NewRow.insertCell(i);
        let Newinput=document.createElement('input')
        Newinput.setAttribute('type','checkbox')
        NewCell.addEventListener('mouseover',WarnCell)
        NewCell.addEventListener('mouseout',UnWarnCell)
        NewCell.addEventListener('click',DisableCell)
        NewCell.className='pay'
        Newinput.addEventListener('click',CheckClick)
        Newinput.className='unchecked'
        NewCell.appendChild(Newinput)
    }
    N++
}
function Howtouse(){
    alert('\n\
    좌측에 항목의 이름, 가격을 띄어쓰기로 구분하여 입력하세요.\n\
    상단에는 참여한 사람의 이름을 적어주세요.\n\n\
    각 항목마다 결제한 사람에 체크해주세요.\n\n\
    행이나 열을 삭제하고 싶거나, \n\
    특정 항목의 불참자를 반영하려면 Edit 버튼을 누르세요.')
}

function WarnCell(e){
    if(!Editmode) return
    if(e.target.className==='notpay') e.target.style.background='#9cffad'
    else e.target.style.background='#ff9c9c'
}
function UnWarnCell(e){
    if(!Editmode) return
    if(e.target.className==='notpay') e.target.style.background='gray'
    else e.target.style.background='white'
}
function DisableCell(e){
    if(!Editmode) return
    if(e.target.className==='pay'){
        e.target.className='notpay'
        e.target.style.background='gray'
    }else{
        e.target.className='pay'
        e.target.style.background='white'
    }
}

function findx(target,mode){
    if(mode===0){
        for(let i=1;i<M-1;i++){
            if(T.rows[0].cells[i].childNodes[0]===target){
                return i
            }
        }
    }else{
        for(let i=1;i<N-1;i++){
            if(T.rows[i].cells[0].childNodes[0]===target){
                return i
            }
        }
    }
    return -1
}
function UnWarnCol(e){
    let x=findx(e.target,0)
    if(!Editmode || x<=0) return
    for(let i=0;i<N-1;i++){
        if(T.rows[i].cells[x].className==='notpay') T.rows[i].cells[x].style.background='gray'
        else T.rows[i].cells[x].style.background='white'
    }
    T.rows[0].cells[x].childNodes[0].style.background='#4d4d4d'
}
function UnWarnRow(e){
    let x=findx(e.target,1)
    if(!Editmode || x<=0) return
    for(let i=0;i<M-1;i++){
        if(T.rows[x].cells[i].className==='notpay') T.rows[x].cells[i].style.background='gray'
        else T.rows[x].cells[i].style.background='white'
    }
    T.rows[x].cells[0].childNodes[0].style.background='#4d4d4d'
}
function WarnCol(e){
    let x=findx(e.target,0)
    if(!Editmode || x<=0) return
    for(let i=0;i<N-1;i++){
        if(T.rows[i].cells[x].className==='notpay') T.rows[i].cells[x].style.background='#895454'
        else T.rows[i].cells[x].style.background='#ff9797'
    }
    T.rows[0].cells[x].childNodes[0].style.background='rgb(158 0 0)'
}
function WarnRow(e){
    let x=findx(e.target,1)
    if(!Editmode || x<=0) return
    for(let i=0;i<M-1;i++){
        if(T.rows[x].cells[i].className==='notpay') T.rows[x].cells[i].style.background='#895454'
        else T.rows[x].cells[i].style.background='#ff9797'
    }
    T.rows[x].cells[0].childNodes[0].style.background='rgb(158 0 0)'
}
function DeleteCol(e){
    let x=findx(e.target,0)
    if(!Editmode || x<=0) return
    for(let i=0;i<N-1;i++){
        if(T.rows[i].cells[x].childNodes[0].className==='checked'){
            for(let j=0;j<M-1;j++){
                T.rows[i].cells[j].childNodes[0].className='unchecked'
            }
        }
        T.rows[i].deleteCell(x)
    }
    M--
}
function DeleteRow(e){
    let x=findx(e.target,1)
    if(!Editmode || x<=0) return
    T.deleteRow(x)
    N--
}

function findcheckxy(target){
    for(let i=1;i<N-1;i++){
        for(let j=1;j<M-1;j++){
            if(T.rows[i].cells[j].childNodes[0]===target){
                return i*1000+j
            }
        }
    }
    return -1
}
function CheckClick(e){
    let ret=findcheckxy(e.target)
    if(ret<=0) return
    let x=parseInt(ret/1000); let y=ret%1000;
    if(e.target.className==='unchecked'){
        e.target.className='checked'
        for(let i=1;i<M-1;i++){
            if(i===y) continue
            T.rows[x].cells[i].childNodes[0].disabled=true
            T.rows[x].cells[i].childNodes[0].className='disabled'
        }
    }else{
        e.target.className='unchecked'
        for(let i=1;i<M-1;i++){
            if(i===y) continue
            T.rows[x].cells[i].childNodes[0].disabled=false
            T.rows[x].cells[i].childNodes[0].className='unchecked'
        }
    }
}
function CloseResult(){
    ResultPage.style.visibility="hidden"
    CopyButton.style.visibility="hidden"
    CalcButton.style.visibility="visible"
    info.style.visibility="visible"
    EditButton.style.visibility="visible"
    T.style.visibility="visible"
    while(DetailText.hasChildNodes()){
        DetailText.removeChild(DetailText.firstChild)
    }
}
function Copy(){
    console.log(StringToCopy)
    var Clip = document.createElement("textarea")
    document.body.appendChild(Clip)
    Clip.value=StringToCopy
    Clip.select()
    document.execCommand("copy")
    CopyButton.style.visibility="hidden"
    document.body.removeChild(Clip)
}

function Edit(){
    Editmode=!Editmode
    EditButton.setAttribute('value',Editmode?'Finish':'Edit')
    info.style.visibility=Editmode?'visible':'hidden'
    CalcButton.style.display=Editmode?'none':'block'
    for(let i=0;i<N-1;i++){
        let Row=T.rows[i]
        for(let j=0;j<M-1;j++){
            let Cell=Row.cells[j]
            if(i*i+j*j===0) continue
            if(i===0 || j===0){
                Cell.childNodes[0].ReadOnly=Editmode
                Cell.childNodes[0].style.background=Editmode?'#4d4d4d':'white'
            }else{
                Cell.childNodes[0].disabled=Editmode
                if(Cell.childNodes[0].className==='disabled') Cell.childNodes[0].disabled=true
            }
        }
    }
    T.rows[N-1].cells[0].childNodes[0].disabled=Editmode
    T.rows[N-1].cells[0].childNodes[0].style.background=Editmode?'gray':'white'
    T.rows[0].cells[M-1].childNodes[0].disabled=Editmode
    T.rows[0].cells[M-1].childNodes[0].style.background=Editmode?'gray':'white'
}
function Calc(){
    let Productname=[] //항목 이름
    let Price=[] //항목의 가격
    let payman=[] //돈을 낸 사람 번호
    let name=[] //사람의 이름
    let pays=[] //각자 낸 값
    let needtopay=[] //서로 내야할 돈
    let ProudctDividedN=[]
    let TotalPrice=0
    StringToCopy=""

    if(N==2 || M==2){
        alert("항목 및 사람 수는 1 이상이어야 합니다.")
        return
    }
    for(let i=1;i<N-1;i++){
        let S=T.rows[i].cells[0].childNodes[0].value
        if(S==="") S=T.rows[i].cells[0].childNodes[0].placeholder
        let Slist=S.split(" ")
        if(isNaN(Slist[Slist.length-1])){
            console.log(Slist[Slist.length-1])
            alert("항목의 가격을 올바르게 입력했는지 확인해주세요.")
            return
        }
        let P=Number(Slist[Slist.length-1])
        Slist.pop()
        Price.push(P)
        Productname.push(Slist.join(" "))
        let peoplelist=[] //돈을 내야할 사람들
        let temp=-1
        for(let j=1;j<M-1;j++){
            if(T.rows[i].cells[j].childNodes[0].className==='checked'){
                temp=j;
            }
            if(T.rows[i].cells[j].className==='pay'){
                peoplelist.push(j-1)
            }
            if(i==1){
                let nameS=T.rows[0].cells[j].childNodes[0].value
                if(nameS==="") nameS=T.rows[0].cells[j].childNodes[0].placeholder
                name.push(nameS)
                pays.push(0)
                needtopay.push(0)
            }
        }
        if(temp===-1){
            alert("각 항목에 대해 결제한 사람을 체크해 주세요.")
            return
        }else{
            payman.push(temp-1)
        }
        let peoplesize=peoplelist.length
        if(peoplesize===0){
            alert("각 항목에 대해 참여자가 적어도 1명은 있어야 합니다.")
            return
        }
        let result=P/peoplesize
        ProudctDividedN.push(parseInt(result))
        for(let i=0;i<peoplesize;i++){
            needtopay[peoplelist[i]]+=parseInt(result)
        }
    }
    for(let i=0;i<N-2;i++){
        TotalPrice+=Price[i]
        pays[payman[i]]+=Price[i]
    }

    let V=[]
    for(let i=0;i<M-2;i++){
        V.push({val:parseInt(needtopay[i]-pays[i]), idx:i})
        needtopay[i]-=pays[i]
    }
    V.sort(function(a,b){return b.val-a.val})
    //for(let i=0;i<V.length;i++){console.log(name[V[i].idx]+"가 내야 할 돈 "+String(V[i].val))}
    let Answer=[]
    while(V.length>1){
        let HowMuch=Math.min(V[0].val,V[V.length-1].val*(-1))
        Answer.push({giver:V[0].idx,receiver:V[V.length-1].idx,money:HowMuch})
        if(V[0].val<V[V.length-1].val*(-1)){
            V[V.length-1].val+=HowMuch
            V.shift()
        }else{
            V[0].val-=HowMuch
            V.pop()
        }
        V.sort(function(a,b){return b.val-a.val})
        //for(let i=0;i<V.length;i++){console.log(name[V[i].idx]+"가 내야 할 돈 "+String(V[i].val))}
    }
    Answer.sort(function(a,b){return a.giver-b.giver})

    AnswerString="\n"
    for(let i=0;i<Answer.length;i++){
        if(Answer[i].money===0) continue
        AnswerString+=name[Answer[i].giver]+" ==== "+String(Answer[i].money)+" ====> "+name[Answer[i].receiver]+"\n"
    }

    let Dstrings=[]
    for(let i=0;i<M-2;i++){
        Dstrings.push(name[i]+" --> ")
    }
    for(let i=0;i<N-2;i++){
        for(let j=0;j<M-2;j++){
            if(T.rows[i+1].cells[j+1].className==='pay'){
                Dstrings[j]+="+"+String(ProudctDividedN[i])+"["+Productname[i]+"]"
            }
        }
    }
    for(let i=0;i<N-2;i++){
        Dstrings[payman[i]]+="-"+String(Price[i])+"["+Productname[i]+"]"
    }
    for(let i=0;i<M-2;i++){
        Dstrings[i]+=" = "+String(parseInt(needtopay[i]))
        let newtext=document.createElement('div')
        newtext.className="Longtext"
        newtext.innerText=Dstrings[i]
        DetailText.appendChild(newtext)
        StringToCopy+=Dstrings[i]+"\n"
    }

    console.log(needtopay); console.log(Answer);  

    T.style.visibility="hidden"
    CalcButton.style.visibility="hidden"
    info.style.visibility="hidden"
    EditButton.style.visibility="hidden"
    ResultPage.style.visibility="visible"
    CopyButton.style.visibility="visible"

    ResultText.innerText=AnswerString
    StringToCopy="<Result>  // 정산 결과"+AnswerString+"\n<Detail>  // 내야 할 돈 계산 과정\n"+StringToCopy
}