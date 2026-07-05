/* =====================================================
    AUTH LOGIN
===================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}

async function loginUser(e) {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (!email) {

        alert("Vui lòng nhập email.");

        return;

    }

    if (!password) {

        alert("Vui lòng nhập mật khẩu.");

        return;

    }

    try {

        console.log("Đang đăng nhập...");

        const { data, error } =
            await window.supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });

        if (error) {

            throw error;

        }

        console.log("Login Success!");

        console.log(data.user);

        const { data: profile, error: profileError } =
            await window.supabaseClient

                .from("profiles")

                .select("*")

                .eq("id", data.user.id)

                .single();

        if (profileError) {

            console.error(profileError);

        }

        if (profile) {

            localStorage.setItem(

                "userProfile",

                JSON.stringify(profile)

            );

        }

        alert("🎉 Đăng nhập thành công!");

        window.location.href = "index.html";

    }

    catch (err) {

        console.error(err);

        if (err.message.includes("Invalid login credentials")) {

            alert("Sai email hoặc mật khẩu.");

        }

        else {

            alert(err.message);

        }

    }

}