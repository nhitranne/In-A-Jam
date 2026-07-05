/* =====================================================
    AUTH REGISTER
===================================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", registerUser);

}

async function registerUser(e) {

    e.preventDefault();

    const firstName =
        document.getElementById("regFirstName").value.trim();

    const lastName =
        document.getElementById("regLastName").value.trim();

    const email =
        document.getElementById("regEmail").value.trim();

    const phone =
        document.getElementById("regPhone").value.trim();

    const password =
        document.getElementById("regPassword").value;

    const confirm =
        document.getElementById("regConfirm").value;

    const agree =
        document.getElementById("regTerms").checked;

    if (!firstName) {

        alert("Vui lòng nhập tên.");

        return;

    }

    if (!lastName) {

        alert("Vui lòng nhập họ.");

        return;

    }

    if (!email) {

        alert("Vui lòng nhập email.");

        return;

    }

    if (!phone) {

        alert("Vui lòng nhập số điện thoại.");

        return;

    }

    if (password.length < 6) {

        alert("Mật khẩu phải có ít nhất 6 ký tự.");

        return;

    }

    if (password !== confirm) {

        alert("Mật khẩu xác nhận không khớp.");

        return;

    }

    if (!agree) {

        alert("Bạn cần đồng ý điều khoản.");

        return;

    }

    console.log({
        firstName,
        lastName,
        email,
        phone,
        password
    });
    try {

    console.log("Bắt đầu gọi Supabase signUp...");

    const { data, error } =
        await window.supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {

                data: {

                    first_name: firstName,

                    last_name: lastName,

                    phone: phone

                }

            }

        });

        console.log("Kết quả signUp:", data, error);
        
    if (error) {

        throw error;

    }

    console.log("Supabase User:", data.user);

    const { error: profileError } =
    await window.supabaseClient
        .from("profiles")
        .insert({

            id: data.user.id,

            full_name: `${lastName} ${firstName}`,

            email: email,

            phone: phone,

            avatar_url: null

        });

if (profileError) {

    console.error(profileError);

} else {

    console.log("Profile created!");

}

    alert("🎉 Đăng ký thành công!\n\nVui lòng kiểm tra email để xác thực tài khoản.");

}
catch (err) {

    console.error(err);

    alert(err.message);

}

}