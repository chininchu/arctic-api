const apiUrl = "https://api.artic.edu/api/v1/artworks/search";
const fields = "id,title,artist_display,date_display,image_id,thumbnail";
const gallery = document.querySelector("#gallery");
const collectionStatus = document.querySelector("#collection-status");
const resultCount = document.querySelector("#result-count");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#art-search");
const loadMoreButton = document.querySelector("#load-more");
const artworkTemplate = document.querySelector("#artwork-template");

let page = 1;
let currentSearch = "";
let iiifUrl = "https://www.artic.edu/iiif/2";
let hasMore = true;

function imageUrl(imageId) {
  return `${iiifUrl}/${imageId}/full/600,/0/default.jpg`;
}

function artworkUrl(id) {
  return `https://www.artic.edu/artworks/${id}`;
}

function renderArtworks(artworks) {
  const fragment = document.createDocumentFragment();

  artworks
    .filter(({ image_id: imageId }) => imageId)
    .forEach((artwork) => {
      const card = artworkTemplate.content.cloneNode(true);
      const link = card.querySelector("a");
      const image = card.querySelector("img");
      const title = card.querySelector("h3");
      const details = card.querySelector("p");

      link.href = artworkUrl(artwork.id);
      image.alt = artwork.title;
      image.addEventListener("error", () => {
        if (artwork.thumbnail?.lqip && image.src !== artwork.thumbnail.lqip) {
          image.src = artwork.thumbnail.lqip;
          image.classList.add("image-preview");
        }
      });
      image.src = imageUrl(artwork.image_id);
      title.textContent = artwork.title;
      details.textContent =
        [artwork.artist_display, artwork.date_display]
          .filter(Boolean)
          .join(" / ") || "Artist and date unavailable";
      fragment.appendChild(card);
    });

  gallery.appendChild(fragment);
}

async function getArtworks({ reset = false } = {}) {
  if (reset) {
    page = 1;
    gallery.replaceChildren();
  }

  collectionStatus.textContent = "";
  gallery.setAttribute("aria-busy", "true");
  loadMoreButton.disabled = true;
  loadMoreButton.hidden = false;

  const params = new URLSearchParams({
    limit: "16",
    page: String(page),
    fields,
    "query[term][is_public_domain]": "true",
  });

  if (currentSearch) params.set("q", currentSearch);

  try {
    const response = await fetch(`${apiUrl}?${params}`);
    if (!response.ok) throw new Error("The collection could not be loaded.");

    const payload = await response.json();
    iiifUrl = payload.config?.iiif_url || iiifUrl;
    const artworks = payload.data || [];
    renderArtworks(artworks);

    hasMore = Boolean(payload.pagination?.next_url) && artworks.length > 0;
    resultCount.textContent = currentSearch
      ? `Results for ${currentSearch}`
      : "Public-domain works";
    collectionStatus.textContent = artworks.length
      ? ""
      : "No images matched that search.";
    loadMoreButton.hidden = !hasMore;
    page += 1;
  } catch (error) {
    collectionStatus.textContent = error.message;
    resultCount.textContent = "Collection unavailable";
    loadMoreButton.hidden = true;
  } finally {
    gallery.setAttribute("aria-busy", "false");
    loadMoreButton.disabled = false;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  currentSearch = searchInput.value.trim();
  getArtworks({ reset: true });
});

loadMoreButton.addEventListener("click", () => getArtworks());

await getArtworks();
