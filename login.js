function login() {
    const nameEl = document.querySelector('#userName');
    localStorage.setItem("userName", nameEl.value);
    console.log(nameEl.value);
    window.location.href = "question.html";
}