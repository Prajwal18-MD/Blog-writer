const blogTitleField = document.querySelector('.title');
const contentField = document.querySelector('.article');

const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () =>{
    uploadImage(uploadInput, "image"); 
})

const uploadImage = (uploadFile, uploadType) => {
    const[file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);
        
        fetch('/upload', {
            method: 'post',
            body:formdata
        }).then(res => res.json())
         .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            }else{
                bannerPath = `${location.origin}/${data}`; 
                banner.style.backgroundImage = `url("${bannerPath}")`; 

                if(contentField.value.length && blogTitleField.value.length){
                    saveBlogToFirestore();
                }
            }
         })
    }else{
        alert("upload Image only");
    
    }
} 

const addImage = (imagepath, alt) => {
    let curPos = contentField.selectionStart; 
    let textToInsert = `\r![${alt}](${imagepath})\r`; 
    contentField.value = contentField.value.slice(0, curPos) + textToInsert + contentField.value.slice(curPos); 
}

let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

publishBtn.addEventListener('click', () =>{
if(contentField.value.length && blogTitleField.value.lemgth){
    let docName;
    if(blogID[0] == 'editor'){
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.valuesplit("-").join("-");
        let id = '';
        for(let i=0 ; i<4 ; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
    }
        docName = `${blogTitle}-${id}`;
    }else{
        docName = decodeURI(blogID[0]);
    }

     
     let date = new Date();

     db.collection("blogs").doc(docName).set({
        title: blogTitleField.value,
        article: contentField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
        author: auth.currentUser.email.split("@")[0]
     })
     .then(()=>{
        location.href = `/${docName}`;
     })
     .catch((err) => {
        console.error(err);
     })
   }
})

auth.onAuthStateChanged((user) =>{
    if(!user){
        location.replace("/admin");
    }
})


let blogID = location.pathname.split("/");
blogID.shift();

if(blogID[0] != "editor"){
    let docRef = db.collection("blogs").doc(decodeURI(blogID[0]));
    docRef.get().then((doc) => {
        if(doc.exists){
            let data = doc.data();
            bannerPath = data.bannerImage;
            banner.style.backgroundImage = `url(${bannerPath})`;
            blogTitleField.value = data.title;
            contentField.value = data.article;
        }else{
          location.replace("/");  
        }
    })
}