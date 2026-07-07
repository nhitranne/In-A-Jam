console.log("PROFILE JS RUNNING");
/* =====================================================
   PROFILE
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const wrap = document.getElementById("accountWrap");
console.log("wrap =", wrap);
    if (!wrap) return;

    const {
        data: { session }
    } = await window.supabaseClient.auth.getSession();
    console.log("session =", session);

    if (!session) {

        wrap.innerHTML = `
            <a class="icon-btn"
               title="Đăng nhập"
               href="login.html">
               👤
            </a>
        `;

        return;
    }

    const { data: profile, error } =
        await window.supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

    if (error) {

        console.error(error);

        return;

    }

    const firstLetter =
        (profile.full_name || "?")
            .charAt(0)
            .toUpperCase();

    wrap.innerHTML = `

<div class="account-trigger" id="accountTrigger">
${firstLetter}
</div>

<div class="account-menu" id="accountMenu">

<div class="am-name">
${profile.full_name}
</div>

<div class="am-email">
${profile.email}
</div>

<hr>

<a href="orders.html">
📦 Đơn hàng của tôi
</a>


<hr>

<button id="logoutBtn">
Đăng xuất
</button>

</div>

`;

    injectStyle();

    document
        .getElementById("accountTrigger")
        .onclick = (e) => {

        e.stopPropagation();

        document
            .getElementById("accountMenu")
            .classList.toggle("show");

    };

    // Đóng dropdown khi bấm ra ngoài
    document.addEventListener("click", (e) => {

        const menu = document.getElementById("accountMenu");
        const trigger = document.getElementById("accountTrigger");

        if (!menu || !trigger) return;

        if (!menu.contains(e.target) && !trigger.contains(e.target)) {
            menu.classList.remove("show");
        }

    });

    document
        .getElementById("logoutBtn")
        .onclick = async () => {

        await logout();

    };

});

function injectStyle(){

if(document.getElementById("profileStyle"))
return;

const style=document.createElement("style");

style.id="profileStyle";

style.textContent=`

.account-wrap{
position:relative;
}

.account-trigger{

width:38px;
height:38px;

border-radius:50%;

background:#C97B3D;

color:white;

display:flex;

align-items:center;

justify-content:center;

font-weight:bold;

cursor:pointer;

}

.account-menu{

display:none;

position:absolute;

right:0;

top:48px;

width:220px;

background:white;

border-radius:14px;

padding:15px;

box-shadow:0 8px 20px rgba(0,0,0,.15);

z-index:999;

}

.account-menu.show{

display:block;

}

.account-menu a,
.account-menu button{

display:block;

width:100%;

padding:12px 10px;

text-align:left;

background:none;

border:none;

cursor:pointer;

font-size:14px;

}

.account-menu a:hover,
.account-menu button:hover{

background:#F8EFE8;

}

.account-menu button{

color:#b03b2e;

font-weight:600;

}

.am-name{

font-weight:bold;

}

.am-email{

font-size:12px;

margin-bottom:10px;

color:#777;

}

`;

document.head.appendChild(style);

}