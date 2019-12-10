const reloadFunction = () => {
    location.reload();
}

/* checkbox function */

function check() {
    var isChecked = document.getElementById("myCheck").checked;
    localStorage.setItem("checked", isChecked);
}

module.exports = { reloadFunction, check };