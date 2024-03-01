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
    uploadImage(uploadInput, "image"); // Corrected variable name
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
                bannerPath = `${location.origin}/${data}`; // Corrected string interpolation
                banner.style.backgroundImage = `url("${bannerPath}")`; // Corrected style setting
            }
         })
    }
} 

const addImage = (imagepath, alt) => {
    let curPos = contentField.selectionStart; // Corrected variable name
    let textToInsert = `\r![${alt}](${imagepath}]\r`; // Corrected string interpolation
    contentField.value = contentField.value.slice(0, curPos) + textToInsert + contentField.value.slice(curPos); // Corrected variable name
}
