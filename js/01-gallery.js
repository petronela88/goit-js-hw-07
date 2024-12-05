

import basicLightbox from "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/+esm";
import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector("ul.gallery");
const fragment = new DocumentFragment();
const liTemplate = new DOMParser().parseFromString(
    `<li class="gallery__item">
     <a class="gallery__link" href="#">
       <img class="gallery__image" src="#" alt="Image description" />
     </a>
   </li>`,
    "text/html"
).body.firstElementChild;

function appendFromGalleryItem(item) {
    const clone = liTemplate.cloneNode(true);
    const img = clone.querySelector("img");
    const a = clone.querySelector("a");

    img.src = item.preview;
    img.alt = item.description;
    a.href = item.original;

    fragment.appendChild(clone);

    a.addEventListener("click", (event) => {
        event.preventDefault();
        const instance = basicLightbox.create(
            `<img src="${item.original}" alt="${item.description}">`
        );
        instance.show();

        document.addEventListener("keydown", handleKeyPress);

        function handleKeyPress(e) {
            if (e.key === "Escape") {
                instance.close();
                document.removeEventListener("keydown", handleKeyPress);
            }
        }
    });
}

galleryItems.forEach(appendFromGalleryItem);
gallery.appendChild(fragment);
