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
   NOTE
   ---------------------------------------------
   Việc render nút tài khoản (chữ cái đầu tên,
   dropdown "Đơn hàng của tôi" / "Đăng xuất")
   được xử lý DUY NHẤT bởi js/profile.js.

   Trước đây file này có tự chạy updateAccountUI()
   khi DOMContentLoaded, chạy song song với
   profile.js (và với đoạn script riêng ở cart.html /
   login.html) khiến 2-3 đoạn code cùng ghi đè lên
   #accountWrap. Bên nào chạy xong sau cùng sẽ đè lên
   bên kia, gây ra hiện tượng chữ hiển thị đè lên nhau
   và nút không bấm được để mở dropdown.

   => KHÔNG tự động gọi updateAccountUI/checkLoginStatus
   ở đây nữa. Mọi trang chỉ cần include:
     <script src="js/supabase.js"></script>
     <script src="js/profile.js"></script>
=========================================== */

/* ===========================================
   EXPORT
=========================================== */

window.supabaseClient = supabaseClient;

window.logout = logout;

window.getCurrentUser = getCurrentUser;

window.getSession = getSession;