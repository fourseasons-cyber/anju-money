/* =========================================================
   安居資金顧問
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       Scroll Reveal
    ===================================================== */

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(function (item) {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(function (item) {
            item.classList.add("visible");
        });

    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqTitles = document.querySelectorAll(".faq-title");

    faqTitles.forEach(function (button) {

        button.addEventListener("click", function () {

            const faqItem = button.closest(".faq-item");

            if (!faqItem) {
                return;
            }

            const isOpen = faqItem.classList.contains("open");


            /* 關閉其他 FAQ */

            document.querySelectorAll(".faq-item").forEach(function (item) {

                item.classList.remove("open");

                const title = item.querySelector(".faq-title");

                if (title) {
                    title.setAttribute("aria-expanded", "false");
                }

            });


            /* 如果原本是關閉的，就打開 */

            if (!isOpen) {

                faqItem.classList.add("open");

                button.setAttribute("aria-expanded", "true");

            }

        });

    });


    /* =====================================================
       回到頂端
    ===================================================== */

    const topBtn = document.getElementById("topBtn");

    function checkScroll() {

        if (!topBtn) {
            return;
        }

        if (window.scrollY > 350) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    }

    window.addEventListener("scroll", checkScroll, {
        passive: true
    });

    checkScroll();


    if (topBtn) {

        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       電話輸入
    ===================================================== */

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g, "");

        });

    }


    /* =====================================================
       Google Form 表單送出
    ===================================================== */

    const form = document.getElementById("contactForm");

    const submitBtn = document.getElementById("submitBtn");

    const formMessage = document.getElementById("formMessage");

    const googleFrame = document.getElementById("googleFormFrame");


    if (form) {

        let isSubmitting = false;

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            if (isSubmitting) {
                return;
            }


            /* HTML5 驗證 */

            if (!form.checkValidity()) {

                form.reportValidity();

                return;

            }


            /* 電話格式檢查 */

            const phone = phoneInput
                ? phoneInput.value.trim()
                : "";

            if (!/^09\d{8}$/.test(phone)) {

                if (formMessage) {

                    formMessage.textContent =
                        "請輸入正確的 10 碼手機號碼，例如 0912345678。";

                    formMessage.className =
                        "form-message error";

                }

                if (phoneInput) {
                    phoneInput.focus();
                }

                return;

            }


            isSubmitting = true;


            if (submitBtn) {

                submitBtn.disabled = true;
                submitBtn.classList.add("loading");

            }


            if (formMessage) {

                formMessage.textContent = "";
                formMessage.className = "form-message";

            }


            /*
             * Google Form 使用 target="googleFormFrame"
             * 因此送出後不會離開目前網站。
             */

            form.submit();


            /*
             * Google Form 跨網域無法可靠地透過 JS 讀取回應內容，
             * 所以使用固定時間顯示成功訊息。
             *
             * 表單資料會直接進入 Google Form 所連結的試算表。
             */

            window.setTimeout(function () {

                if (formMessage) {

                    formMessage.textContent =
                        "感謝您的諮詢！資料已送出，我們將盡快與您聯繫。";

                    formMessage.className =
                        "form-message success";

                }


                form.reset();


                if (submitBtn) {

                    submitBtn.disabled = false;
                    submitBtn.classList.remove("loading");

                }


                isSubmitting = false;

            }, 1500);

        });

    }


    /* =====================================================
       平滑跳轉
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});