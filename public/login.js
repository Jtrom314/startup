(async () => {
    let authenticated = false;
    let userName = localStorage.getItem('userName');
    if (userName) {
        const nameEl = document.querySelector('#userName');
        userName = nameEl.value;
        console.log(userName);
        const user = await getUser(nameEl.value)
        authenticated = user?.authenticated;
    }

    if (authenticated) {
        document.querySelector('#playerName').textContent = userName;
        setDisplay('loginControls', 'none');
        setDisplay('playControls', 'block');
      } else {
        setDisplay('loginControls', 'block');
        setDisplay('playControls', 'none');
      }

})();

async function loginUser() {
    loginOrCreate('/api/auth/login');
}

async function createUser() {
    loginOrCreate('/api/auth/create');
}

async function loginOrCreate(endpoint) {
    const userName = document.querySelector("#userName")?.value;
    const passWord = document.querySelector("#passWord")?.value;
    const package = {
        email: userName,
        password: passWord
    }
    const response = await fetch(endpoint, {
        method: 'post',
        headers: { 'content-type' : 'application/json'},
        body: JSON.stringify(package),
      });
    const body = await response.json();
    if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        window.location.href = 'question.html';
    } else {
        console.log(`⚠ Error: ${body.msg}`)
    }
}

function logout() {
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = "/"));
}

async function getUser(email) {
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
        return response.json();
    }
    return null;
}

function vote() {
    window.location.href = 'question.html'
}
function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }