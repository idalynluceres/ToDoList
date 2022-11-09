// *** Typing Animation *** \\
let titleAnimation = new Typed(".title", 
{
    strings:[" ", "Awesome Goals to Achieve!", "My Life Plan!", "My Life’s Must Do’s!", "Things to Do Before I Kick the Bucket!"],
    typeSpeed:150,
    BackSpeed:60,
    loop:true
});
// *** RT Date *** \\
var todayDate = new Date();
var getTodayDate = todayDate.getDate();
var getTodayMonth =  todayDate.getMonth()+1;
var getTodayFullYear = todayDate.getFullYear();
var getCurrentHours = todayDate.getHours();
var getCurrentMinutes = todayDate.getMinutes();
var getCurrentAmPm = getCurrentHours >= 12 ? 'PM' : 'AM';
getCurrentHours = getCurrentHours % 12;
getCurrentHours = getCurrentHours ? getCurrentHours : 12; 
getCurrentMinutes = getCurrentMinutes < 10 ? '0'+getCurrentMinutes : getCurrentMinutes;
var getCurrentDateTime = getTodayDate + '-' + getTodayMonth + '-' + getTodayFullYear + ' ' + getCurrentHours + ':' + getCurrentMinutes + ' ' + getCurrentAmPm;
document.getElementById("displayDate").innerHTML = "Today is " + getCurrentDateTime + ". How are you doin'?";
// *** Form *** \\
let addListBtn = document.querySelector("#btnAdd");
addListBtn.addEventListener("click", addItem);

function addItem()
{
    // get value from input
    let listTitle = document.querySelector("#listTitle").value;
    if(listTitle == "")
    {
        swal("Empty.", "Please type something.", "info");
    }
    else
    {
    // get the parent node
    let itemList = document.querySelector("#itemList");
    // create child nodes
    let listItem = document.createElement("div");
    let listInput = document.createElement("input");
    listInput.type = "text";
    // disabled attribute
    listInput.setAttribute("disabled", "");
    listInput.value = listTitle;
    // save the default value
    listInput.defaultValue = listTitle;
    // create edit button
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
    btnEdit.classList = "btnEdit";
    btnEdit.addEventListener("click", editItem);
    // create delete button
    let btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.classList = "btnDelete";
    btnDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
    btnDelete.addEventListener("click", delItem);

    // append
    itemList.appendChild(listItem);
    listItem.appendChild(listInput);
    listItem.appendChild(btnEdit);
    listItem.appendChild(btnDelete);

    function delItem()
    {
        listItem.remove();
        addListBtn.removeAttribute("disabled", "")
        swal(listInput.value + " was deleted!", "Changes saved!", "info");
    }

    if (itemList.childElementCount > 9)
    {
        addListBtn.setAttribute("disabled", ""),
        swal({
            icon: 'error',
            title: 'Oops...Unable to add.',
            text: 'Please remove items to add another.'
          })
    }
    else if (itemList.childElementCount < 9)
    {
        addListBtn.removeAttribute("disabled", "")
    }

    function editItem()
    {
        //  remove disabled attribute
        listInput.removeAttribute("disabled", "");
        // disable edit button to avoid multiple save buttons
        btnEdit.setAttribute("disabled", "");

        // create save button
        let btnSave = document.createElement("button");
        btnSave.innerHTML = "<i class='fa-solid fa-floppy-disk'></i>"
        btnSave.classList = "btnSave";
        btnSave.addEventListener("click", saveItem)

        // append buttons
        listItem.appendChild(btnSave);
        
        function saveItem()
        {
            let text = "Do you want to proceed and save " + listInput.value + " to your list?";

            if (confirm(text) === true)
            {
                // enable edit button again
                btnEdit.removeAttribute("disabled", "");
                // get new item
                let newItem = listInput.value;
                listInput.defaultValue = newItem;
                // disable
                listInput.setAttribute("disabled", "");
                // hide save button
                listItem.removeChild(btnSave);
                // add text to alert
                text = listInput.value + " was successfully added!";
            }
            else
            {
                text = "No changes were made.";

                // enable edit button again
                btnEdit.removeAttribute("disabled", "");
                // disable
                listInput.setAttribute("disabled", "");
                // hide save button
                listItem.removeChild(btnSave);
                // change the value to its default value
                listInput.value = listInput.defaultValue;
            }
            swal(text);
        }
    }
    }
};