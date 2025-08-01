export function showSuccess(message, redirectURL) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: message,
        text: `Redirecting to ${redirectURL}...`,
        timer: 1500,
        showConfirmButton: false,
    });

    setTimeout(() => {
        window.location.href = redirectURL;
    }, 1500);
}

export function showFail(message) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    });
}