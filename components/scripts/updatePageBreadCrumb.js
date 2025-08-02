export function updateText(){
    const pageName = document.body.getAttribute("data-page");
    if(!pageName){
        return;
    }
    const capitalized = pageName[0].toUpperCase() + pageName.slice(1);
    console.log(capitalized);
    document.querySelectorAll('.current-page').forEach(page=>{
        page.textContent=capitalized;
    });

}