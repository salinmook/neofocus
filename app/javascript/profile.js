console.log("PROFILE JS LOADED");
document.addEventListener("turbo:load", () => {
    const slider = document.querySelector(".avatar-slider-container");
    const items = document.querySelectorAll(".avatar-item");
    //const btnRight = document.querySelector(".arrow.right");
    //const btnLeft = document.querySelector(".arrow.left");
    if (!slider || items.length === 0) return;
       let index = parseInt(slider.dataset.initialIndex) || 0;

       window.showSlide = function (i) {
            const total = items.length;
            index = (i + total) % total;

            const itemWidth = items[0].offsetWidth;
            slider.style.transform = `translateX(-${index * itemWidth}px)`;
            console.log("CURRENT INDEX:", index);
       };
       showSlide(index);
       window.nextSlide = function() {
        showSlide(index + 1);
       };
       
    });
       function autoSaveprofile() {
         const form = document.querySelector("#profile-form");
         if (!form)return;
         const formData = new FormData(form);
         fetch(form.action, {
            method: "PATCH",
            headers: {
               "X-CSRF-Token":
               document.querySelector('meta[name="csrf-token"]').content,
               "Accept": "application/json"
            },
            body: formData
         });
       }
       let typingTimer;
       document.addEventListener("input", (e) => {
         if (e.target.classList.contains("auto-save-input")){
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
               autoSaveprofile();
            }, 600);
         }
       });
       document.addEventListener("change" ,(e) => {
         if (e.target.classList.contains("auto-save-radio")){
            autoSaveprofile();
         }
       });