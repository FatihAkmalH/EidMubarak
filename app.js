const inputBox = document.querySelector(".input-box input"),
inputCard = document.querySelector(".input-box"),
doneButton = document.querySelector(".input-box button"),
nama = document.querySelector(".nama"),
konten = document.querySelector(".content");

inputBox.onkeyup = ()=>{
    let dataName = inputBox.value;//ambil nama yang di input
    if (dataName.trim() != 0){ //kalau box tidak kosong atau hanya sepasi
        doneButton.classList.add("active");
    } else {
        doneButton.classList.remove("active");
    }
}

mainTask();

//kalau klik tombol selesai
doneButton.onclick = ()=>{
    let dataName = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Name"); //akses local storage
    if(getLocalStorage == null) {
        list_array = [];//buat array kosong
    } else {
        list_array = JSON.parse(getLocalStorage); //ubah json string ke js object
    }
    list_array.push(dataName); //add user data
    localStorage.setItem("New Name", JSON.stringify(list_array)); //ubah js object ke json string
    mainTask();
    doneButton.classList.remove("active");
    inputCard.style.display = "none";
    konten.style.transition = "all 1s ease-in-out";
    konten.style.visibility = "visible";
    konten.style.opacity = "1";
}

// Bikin function mainTask()
function mainTask() {
    let getLocalStorage = localStorage.getItem("New Name"); //akses lokal storage
    if (getLocalStorage == null) {
        list_array = [];//buat array kosong
    } else {
        list_array = JSON.parse(getLocalStorage); //ubah json string ke js object
    }
    let newName = "";
    list_array.forEach((element, index)=>{
        newName += `${element} <span onclick="hapusNama(${index});"><i class="bx bx-trash"></i></span>`;
    });
    nama.innerHTML = newName; //tambah nama ke tag span
    inputBox.value = "";
}

//buat function hapus
function hapusNama(index) {
    let getLocalStorage = localStorage.getItem("New Name");
    list_array = JSON.parse(getLocalStorage);
    list_array.splice(index, 1); //hapus nama yang sudah ada

    //setelah diapus update local storage
    localStorage.setItem("New Name", JSON.stringify(list_array));
    mainTask();
    inputCard.style.display = "block";
    konten.style.visibility = "hidden";
    konten.style.opacity = "0";
}