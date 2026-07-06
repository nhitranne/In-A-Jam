/* ===========================================
   SUPABASE CONFIG
=========================================== */

const SUPABASE_URL = "https://ipdtylgintyociozcpbi.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZHR5bGdpbnR5b2Npb3pjcGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMjU1MTUsImV4cCI6MjA5ODgwMTUxNX0.2QenADIXuGpAveJ88QJfRYy2-Vp3Bu8GckCp1XHytNw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

/* ===========================================
   AUTH
=========================================== */

async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {
        console.error(error.message);
        return null;
    }

    return user;
}


async function getSession() {

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();

    if (error) {

        console.error(error.message);

        return null;

    }

    return data.session;

}


/* ===========================================
   LOGOUT
=========================================== */

async function logout() {

    await supabaseClient.auth.signOut();

    window.location.href = "index.html";

}


/* ===========================================
   LOGIN STATUS
=========================================== */

async function checkLoginStatus() {

    const user = await getCurrentUser();

    if (!user) {

        console.log("Guest");

        return;

    }

    console.log("Login:", user.email);

}

/* ===========================================
   UPDATE ACCOUNT UI
=========================================== */

async function updateAccountUI(){

    const wrap = document.getElementById("accountWrap");

    if(!wrap) return;

    const user = await getCurrentUser();

    if(!user){

        wrap.innerHTML = `
            <a class="icon-btn" title="Đăng nhập" href="login.html">
                👤
            </a>
        `;

        return;
    }

    const firstName =
        user.user_metadata?.first_name ||
        user.email.charAt(0).toUpperCase();

    wrap.innerHTML = `
        <div class="account-dropdown">
            <button class="icon-btn" id="accountBtn">
                ${firstName}
            </button>

            <div class="account-menu">

                <a href="orders.html">
                    📦 Đơn hàng của tôi
                </a>

                <hr>

                <button id="logoutBtn">
                    Đăng xuất
                </button>

            </div>
        </div>
    `;

    document
        .getElementById("logoutBtn")
        .addEventListener("click", logout);

}

/* ===========================================
   START
=========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkLoginStatus();

    await updateAccountUI();

});


/* ===========================================
   EXPORT
=========================================== */

window.supabaseClient = supabaseClient;

window.logout = logout;

window.getCurrentUser = getCurrentUser;

window.getSession = getSession;