/* =========================
   TASKFLOW APP
========================= */

/* =========================
   PAGE NAVIGATION
========================= */

const pages =
    document.querySelectorAll("section");

function showPage(pageId) {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    /* PROTECT PAGES */

    if (
        (
            pageId === "dashboardPage" ||
            pageId === "profilePage"
        ) &&
        !currentUser
    ) {

        showToast(
            "Please login first"
        );

        showPage("authPage");

        return;
    }

    pages.forEach(page => {

        page.classList.add(
            "hidden"
        );
    });

    const targetPage =
        document.getElementById(
            pageId
        );

    if (targetPage) {

        targetPage.classList.remove(
            "hidden"
        );
    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });
}

/* =========================
   NAVBAR ELEMENTS
========================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const profileNavBtn =
    document.getElementById(
        "profileNavBtn"
    );

const dashboardNavBtn =
    document.getElementById(
        "dashboardNavBtn"
    );

/* =========================
   UPDATE NAVBAR
========================= */

function updateNavbar() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    if (currentUser) {

        logoutBtn.classList.remove(
            "hidden"
        );

        profileNavBtn.classList.remove(
            "hidden"
        );

        dashboardNavBtn.classList.remove(
            "hidden"
        );

    } else {

        logoutBtn.classList.add(
            "hidden"
        );

        profileNavBtn.classList.add(
            "hidden"
        );

        dashboardNavBtn.classList.add(
            "hidden"
        );
    }
}

/* =========================
   AUTH TOGGLE
========================= */

function toggleAuth(type) {

    const login =
        document.getElementById(
            "loginContainer"
        );

    const register =
        document.getElementById(
            "registerContainer"
        );

    if (type === "register") {

        login.classList.add(
            "hidden"
        );

        register.classList.remove(
            "hidden"
        );

    } else {

        register.classList.add(
            "hidden"
        );

        login.classList.remove(
            "hidden"
        );
    }
}

/* =========================
   STORAGE FUNCTIONS
========================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            "users"
        )
    ) || [];
}

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

/* =========================
   REGISTER USER
========================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const name =
                document.getElementById(
                    "registerName"
                ).value;

            const email =
                document.getElementById(
                    "registerEmail"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const mobile =
                document.getElementById(
                    "registerMobile"
                ).value;

            const dob =
                document.getElementById(
                    "registerDob"
                ).value;

            const age =
                document.getElementById(
                    "registerAge"
                ).value;

            const gender =
                document.getElementById(
                    "registerGender"
                ).value;

            const education =
                document.getElementById(
                    "registerEducation"
                ).value;

            const college =
                document.getElementById(
                    "registerCollege"
                ).value;

            const location =
                document.getElementById(
                    "registerLocation"
                ).value;

            const occupation =
                document.getElementById(
                    "registerOccupation"
                ).value;

            const skills =
                document.getElementById(
                    "registerSkills"
                ).value;

            const linkedin =
                document.getElementById(
                    "registerLinkedin"
                ).value;

            const github =
                document.getElementById(
                    "registerGithub"
                ).value;

            const website =
                document.getElementById(
                    "registerWebsite"
                ).value;

            const bio =
                document.getElementById(
                    "registerBio"
                ).value;

            let users = getUsers();

            const existingUser =
                users.find(
                    user =>
                    user.email === email
                );

            if (existingUser) {

                showToast(
                    "Account already exists!"
                );

                return;
            }

            const newUser = {

                id: Date.now(),

                name,

                email,

                password,

                mobile,

                dob,

                age,

                gender,

                education,

                college,

                location,

                occupation,

                skills,

                linkedin,

                github,

                website,

                bio,

                tasks: []
            };

            users.push(newUser);

            saveUsers(users);

            showToast(
                "Registration Successful!"
            );

            toggleAuth("login");

            registerForm.reset();
        });
}

/* =========================
   LOGIN USER
========================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            const users = getUsers();

            const user =
                users.find(
                    user =>
                    user.email === email &&
                    user.password === password
                );

            if (!user) {

                showToast(
                    "Invalid Email or Password"
                );

                return;
            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            updateNavbar();

            loadProfile();

            showPage(
                "dashboardPage"
            );

            loadTasks();

            showToast(
                `Welcome ${user.name}`
            );

            loginForm.reset();
        });
}

/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "currentUser"
            );

            updateNavbar();

            showPage(
                "homePage"
            );

            showToast(
                "Logged Out Successfully"
            );
        });
}

/* =========================
   PROFILE
========================= */

function loadProfile() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    if (!currentUser) return;

    setText(
        "profileInitial",
        currentUser.name ?
        currentUser.name.charAt(0) :
        "U"
    );

    setText(
        "profileMainName",
        currentUser.name
    );

    setText(
        "profileMainRole",
        currentUser.occupation
    );

    setText(
        "profileName",
        currentUser.name
    );

    setText(
        "profileEmail",
        currentUser.email
    );

    setText(
        "profileMobile",
        currentUser.mobile
    );

    setText(
        "profileDob",
        currentUser.dob
    );

    setText(
        "profileAge",
        currentUser.age
    );

    setText(
        "profileGender",
        currentUser.gender
    );

    setText(
        "profileEducation",
        currentUser.education
    );

    setText(
        "profileCollege",
        currentUser.college
    );

    setText(
        "profileLocation",
        currentUser.location
    );

    setText(
        "profileOccupation",
        currentUser.occupation
    );

    setText(
        "profileSkills",
        currentUser.skills
    );

    setText(
        "profileLinkedin",
        currentUser.linkedin
    );

    setText(
        "profileGithub",
        currentUser.github
    );

    setText(
        "profileWebsite",
        currentUser.website
    );

    setText(
        "profileBio",
        currentUser.bio
    );
}

/* =========================
   SAFE TEXT SETTER
========================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerText =
            value || "Not Provided";
    }
}

/* =========================
   TASK ELEMENTS
========================= */

const taskForm =
    document.getElementById(
        "taskForm"
    );

const taskContainer =
    document.getElementById(
        "taskContainer"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const filterStatus =
    document.getElementById(
        "filterStatus"
    );

/* =========================
   CREATE TASK
========================= */

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "currentUser"
                    )
                );

            if (!currentUser) {

                showToast(
                    "Please login first"
                );

                return;
            }

            let users = getUsers();

            const task = {

                id: Date.now(),

                title: document.getElementById(
                    "title"
                ).value,

                description: document.getElementById(
                    "description"
                ).value,

                status: document.getElementById(
                    "status"
                ).value,

                priority: document.getElementById(
                    "priority"
                ).value,

                dueDate: document.getElementById(
                    "dueDate"
                ).value
            };

            const userIndex =
                users.findIndex(
                    user =>
                    user.email ===
                    currentUser.email
                );

            users[userIndex]
                .tasks.push(task);

            saveUsers(users);

            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    users[userIndex]
                )
            );

            taskForm.reset();

            loadTasks();

            showToast(
                "Task Created Successfully"
            );
        });
}

/* =========================
   LOAD TASKS
========================= */

function loadTasks() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    if (!currentUser) return;

    renderTasks(
        currentUser.tasks || []
    );

    updateStats(
        currentUser.tasks || []
    );
}

/* =========================
   RENDER TASKS
========================= */

function renderTasks(tasks) {

    if (!taskContainer) return;

    taskContainer.innerHTML = "";

    const search =
        searchInput ?
        searchInput.value.toLowerCase() :
        "";

    const filter =
        filterStatus ?
        filterStatus.value :
        "";

    const filteredTasks =
        tasks.filter(task => {

            const searchMatch =
                task.title
                .toLowerCase()
                .includes(search);

            const filterMatch =
                filter === "" ||
                task.status === filter;

            return (
                searchMatch &&
                filterMatch
            );
        });

    if (filteredTasks.length === 0) {

        taskContainer.innerHTML = `

            <div class="glass-card page-card">

                <h2>
                    No Tasks Found
                </h2>

                <p>
                    Create your first task 🚀
                </p>

            </div>
        `;

        return;
    }

    filteredTasks.forEach(task => {

        const priorityClass =

            task.priority === "High" ?
            "priority-high"

        : task.priority === "Medium" ?
            "priority-medium"

        : "priority-low";

        const card =
            document.createElement("div");

        card.className =
            "glass-card task-card";

        card.innerHTML = `

            <h3>
                ${task.title}
            </h3>

            <p>
                ${task.description}
            </p>

            <div>

                <span
                    class="badge status-badge"
                >
                    ${task.status}
                </span>

                <span
                    class="badge ${priorityClass}"
                >
                    ${task.priority}
                </span>

            </div>

            <div class="task-date">

                Due:
                ${new Date(
                    task.dueDate
                ).toLocaleDateString()}

            </div>

            <div class="task-actions">

                <button
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>
        `;

        taskContainer.appendChild(
            card
        );
    });
}

/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    let users = getUsers();

    let currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    const userIndex =
        users.findIndex(
            user =>
            user.email ===
            currentUser.email
        );

    users[userIndex].tasks =
        users[userIndex].tasks.filter(
            task => task.id !== id
        );

    saveUsers(users);

    localStorage.setItem(
        "currentUser",
        JSON.stringify(
            users[userIndex]
        )
    );

    loadTasks();

    showToast(
        "Task Deleted"
    );
}

/* =========================
   UPDATE STATS
========================= */

function updateStats(tasks) {

    setText(
        "totalTasks",
        tasks.length
    );

    setText(
        "pendingTasks",

        tasks.filter(
            task =>
            task.status === "Pending"
        ).length
    );

    setText(
        "progressTasks",

        tasks.filter(
            task =>
            task.status ===
            "In Progress"
        ).length
    );

    setText(
        "completedTasks",

        tasks.filter(
            task =>
            task.status ===
            "Completed"
        ).length
    );
}

/* =========================
   FILTERS
========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        loadTasks
    );
}

if (filterStatus) {

    filterStatus.addEventListener(
        "change",
        loadTasks
    );
}

/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.className =
        "toast";

    toast.innerText =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);
}

/* =========================
   AUTO LOGIN
========================= */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

updateNavbar();

if (currentUser) {

    loadProfile();

    showPage(
        "dashboardPage"
    );

    loadTasks();

} else {

    showPage(
        "homePage"
    );
}
fetch('https://taskflow-5s1g.onrender.com/api/projects')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));
