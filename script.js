// Dynamic mobile menu toggle & active tab highlight
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    // Set active link in navbar based on current page HTML
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });

    // Donation Preset Button Toggle (used in donate.html)
    const presetBtns = document.querySelectorAll(".preset-btn");
    const customAmountInput = document.getElementById("custom-amount");

    presetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            presetBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (customAmountInput) {
                customAmountInput.value = btn.dataset.amount;
            }
        });
    });
});