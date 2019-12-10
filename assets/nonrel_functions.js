const reloadFunction = () => {
    location.reload();
}

/* checkbox function */

const check = () => {
    let isChecked = document.getElementById("myCheck").checked;
    localStorage.setItem("checked", isChecked);
}

module.exports = { reloadFunction, check };