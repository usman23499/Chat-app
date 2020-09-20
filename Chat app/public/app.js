var email=localStorage['Email'] || 'defaultValue';
var Friendemail=localStorage['FriendEmail'] || 'defaultValue';
var myname=localStorage['Name'] || 'defaultValue';
var image=localStorage['image1'] || 'defaultValue';

document.getElementById("changename").innerHTML=myname;
// document.getElementById("myimage").src=image;
console.log(image)
// document.getElementById('myimage').innerHTML = '<img src="'+image+'"/>';

var text=document.getElementById("mytext");
var button=document.getElementById("mybutton");
var spiner=document.getElementById("spiner");
//var chat=document.getElementById("chat");
var Fulldata="";
var chatdiv=document.getElementById("chatdiv");

if (email==="defaultValue"){
window.location="index.html";
}
else if (Friendemail==="defaultValue" ){
    window.location="Chosefriend.html";
    }
let send=()=>{

if(text.value.length!==0){

    var Mychat={
                name : email,
                data : text.value,
                key : email+Friendemail, 
                myname: myname
            }
        
    
    firebase.database().ref('Chat').child("usman2").push(Mychat);
}


text.value=""
}

function getfirebasedata(){
    firebase.database().ref('Chat').child("usman2").on('child_added',function(data){

        if (data.val().key===email+Friendemail || data.val().key===Friendemail+email){
        
        
        
        Fulldata=Fulldata+data.val().data+"\n";
        console.log(Fulldata)
        // chat.style.textAlign="right"
        // chat.innerHTML=`${Fulldata}`
        
        var makediv=document.createElement('div');

        var forupname=document.createElement('p');
        var textforp=document.createTextNode(data.val().myname);
       
        forupname.setAttribute('class','forp');
        forupname.appendChild(textforp);
        makediv.appendChild(forupname);

        var settext=document.createTextNode(data.val().data);
        makediv.appendChild(settext);
        if(data.val().name !==email){
            
        
            makediv.setAttribute('class','rightdiv');
            chatdiv.appendChild(makediv);
        
        }
        else{
        makediv.setAttribute('class','leftdiv');
            chatdiv.appendChild(makediv);
        }
        }

        makediv.scrollIntoView()

    })  
    
    firebase.database().ref('Chat').once('child_added',function(data){
        text.style.visibility="visible";
        button.style.visibility="visible";
        spiner.style.visibility="collapse";
        
                })
   


}

getfirebasedata()

let makedefult=()=>{
   
    firebase.auth().signout()
    .then(()=>{
        localStorage['Email']="defaultValue";
        localStorage['FriendEmail'] ="defaultValue";
        localStorage['Name']="defaultValue";
        localStorage['image1']="defaultValue"
    })
    .catch(()=>{

    })
}
// text.style.visibility="visible";
// button.style.visibility="visible";
// spiner.style.visibility="collapse";
