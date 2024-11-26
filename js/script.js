var button = document.querySelector(".appointment-button");
var form = document.querySelector(".appointment-container");

if (form != null) {
    var firstDate = form.querySelector("[name=date-1]");
    var secondDate = form.querySelector("[name=date-2]");
    var adult = form.querySelector("[name=adult]");
    var children = form.querySelector("[name=children]");
    var formInput = form.querySelectorAll("input");
    var isStorageSupport = true;
    var storage = "";
    try {
        storage = localStorage.getItem("adult");
    } catch (err) {
        isStorageSupport = false;
    }
    form.classList.add("appointment-hide");
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        if (form.classList.contains("appointment-hide")) {
            form.classList.remove("appointment-hide");
            form.classList.remove("appointment-animation-close");
            form.classList.add("appointment-animation-open");
            setTimeout(function () {firstDate.focus();}, 2001);
            if (storage) {
                adult.value = storage;
            }
        } else {
            form.classList.remove("appointment-animation-open");
            form.classList.remove("appointment-error");
            form.classList.add("appointment-animation-close");
            form.classList.add("appointment-hide");
        }
    });
    form.addEventListener("submit", function (evt) {
        if (!firstDate.value || !secondDate.value || !adult.value || !children.value) {
            evt.preventDefault();
            for (var i = 0; i < formInput.length; i++) {
               formInput[i].classList.add("appointment-input-empty");
            }
            form.classList.remove("appointment-error");
            form.offsetWidth = form.offsetWidth;
            form.classList.add("appointment-error");
        } else {
            if (isStorageSupport) {
                localStorage.setItem("adult", adult.value);
            }
        }
    });
    document.addEventListener("click", function (evt) {
        if (evt.target.classList.contains("button-more")) {
            ++evt.target.parentElement.querySelector("input").value;
        } else if (evt.target.classList.contains("button-less") && evt.target.parentElement.querySelector("input").value > 0) {
            --evt.target.parentElement.querySelector("input").value;
        }
    });
    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (form.classList.contains("appointment-animation-open")) {
                form.classList.remove("appointment-animation-open");
                form.classList.add("appointment-animation-close");
                form.classList.add("appointment-hide");
            } else {
                form.classList.add("appointment-hide");
            }
        }
    });
}
