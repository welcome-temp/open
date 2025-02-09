function storePropertyAndOpenForm(product) {
    localStorage.setItem('selectedProperty', JSON.stringify(product));
    openFormPopup();
}

function storePropertyAndOpenForm(sales) {
    localStorage.setItem('selectedProperty', JSON.stringify(sales));
    openFormPopup();
}
function storePropertyAndOpenForm(rent) {
    localStorage.setItem('selectedProperty', JSON.stringify(rent));
    openFormPopup();
}



document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch products from the API
        const response = await fetch('/api/properties');
        
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }

        const products = await response.json();
        const productContainer = document.querySelector('#product-container'); // Ensure this container exists.

        // Ensure the container is empty before adding new elements
        productContainer.innerHTML = '';

        // Generate product HTML
        let productHTML = '';
        products.forEach(product => {
            productHTML += `
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    
                <div class="property-item rounded overflow-hidden"  data-price="${product.price}"
                         data-type="${product.type}"
                         data-location="${product.location}">

                        <div class="position-relative overflow-hidden">
                              <!-- Image with modal trigger -->
            <a href="#" data-bs-toggle="modal" data-bs-target="#propertyModal" onclick='viewProperty(${JSON.stringify(product)})'>
                <img class="img-fluid" src="${product.image}" alt="">
            </a>
                            <div class="rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3" style="background-color: #dbc519;">${product.purpose}</div>
                            <div class="bg-white rounded-top position-absolute start-0 bottom-0 mx-4 pt-1 px-3" style="color: #dbc519;">${product.type}</div>
                        </div>
                        <div class="p-4 pb-0">
                            <h5 class="mb-3" style="color: #dbc519;">${product.price}</h5>
                            <a class="d-block h5 mb-2" >${product.description}</a>
                            <p><i class="fa fa-map-marker-alt me-2" style="color: #dbc519;"></i>${product.location}</p>
                        </div>
                        <div class="d-flex border-top">
                            <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined me-2" style="color: #dbc519;"></i>${product.size}</small>
                            <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed me-2" style="color: #dbc519;"></i>${product.bed}</small>
                            <small class="flex-fill text-center py-2"><i class="fa fa-bath me-2" style="color: #dbc519;"></i>${product.bath}</small>
                        </div>
                      <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
   <button class="btn py-3 px-5 schedule-visit" style="background-color: #dbc519;" 
    onclick='storePropertyAndOpenForm(${JSON.stringify(product)})'>Schedule a visit</button>

                      </div>

                    </div>
                </div>
                <br><br>
            `;
        });

        // Insert all products into the container at once
        productContainer.innerHTML = productHTML;

    } catch (error) {
        console.error('Error fetching products:', error);
        displayMessage('Failed to load properties. Please try again later.');
    }
});



document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch products from the API
        const second_response = await fetch('/api/sale_properties');
        
        if (!second_response.ok) {
            throw new Error('Failed to fetch properties');
        }

        const sell_properties = await second_response.json();
        const salesContainer = document.querySelector('#salesContainer'); // Ensure this container exists.

        // Ensure the container is empty before adding new elements
        salesContainer.innerHTML = '';

        // Generate product HTML
        let salesHTML = '';
        sell_properties.forEach(sales => {
            salesHTML += `
               <div class="col-lg-4 col-md-6">
                                <div class="property-item rounded overflow-hidden">
                                    <div class="position-relative overflow-hidden">
                                          <!-- Image with modal trigger -->
            <a href="#" data-bs-toggle="modal" data-bs-target="#propertyModal" onclick='viewProperty(${JSON.stringify(sales)})'>
                <img class="img-fluid" src="${sales.image}" alt="">
            </a>
                                        <div class=" rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3" style="background-color: #dbc519;">${sales.purpose}</div>
                                        <div class="bg-white rounded-top position-absolute start-0 bottom-0 mx-4 pt-1 px-3" style="color: #dbc519;">${sales.type}</div>
                                    </div>
                                    <div class="p-4 pb-0">
                                        <h5 class=" mb-3" style="color: #dbc519;">${sales.price}</h5>
                                        <a class="d-block h5 mb-2">${sales.description}</a>
                                        <p><i class="fa fa-map-marker-alt me-2" style="color: #dbc519;"></i>${sales.location}</p>
                                    </div>
                                    <div class="d-flex border-top">
                                        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined  me-2" style="color: #dbc519;"></i> ${sales.size}</small>
                                        <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed me-2" style="color: #dbc519;"></i>${sales.bed}</small>
                                        <small class="flex-fill text-center py-2"><i class="fa fa-bath me-2" style="color: #dbc519;"></i>${sales.bath}</small>
                                    </div>
                                    <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
   <button class="btn py-3 px-5 schedule-visit" style="background-color: #dbc519;" 
    onclick='storePropertyAndOpenForm(${JSON.stringify(sales)})'>Schedule a visit</button>

                                    </div>
                                </div>
                            </div>
            `;
        });

        // Insert all products into the container at once
        salesContainer.innerHTML = salesHTML;

    } catch (error) {
        console.error('Error fetching products:', error);
        displayMessage('Failed to load properties. Please try again later.');
    }
});





document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Fetch products from the API
      const tird_response = await fetch('/api/rent_properties');
      
      if (!tird_response.ok) {
          throw new Error('Failed to fetch rent properties');
      }

      const rent_properties = await tird_response.json();
      const rentContainer = document.querySelector('#rentContainer'); // Ensure this container exists.

      // Ensure the container is empty before adding new elements
      rentContainer.innerHTML = '';

      // Generate product HTML
      let rentHTML = '';
      rent_properties.forEach(rent => {
          rentHTML += `
                            <div class="col-lg-4 col-md-6">
                                <div class="property-item rounded overflow-hidden">
                                    <div class="position-relative overflow-hidden">
                                          <!-- Image with modal trigger -->
            <a href="#" data-bs-toggle="modal" data-bs-target="#propertyModal" onclick='viewProperty(${JSON.stringify(rent)})'>
                <img class="img-fluid" src="${rent.image}" alt="">
            </a>
                                        <div class=" rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3" style="background-color: #dbc519;">${rent.purpose}</div>
                                        <div class="bg-white rounded-top position-absolute start-0 bottom-0 mx-4 pt-1 px-3" style="color: #dbc519;">${rent.type}</div>
                                    </div>
                                    <div class="p-4 pb-0">
                                        <h5 class=" mb-3" style="color: #dbc519;">${rent.price}</h5>
                                        <a class="d-block h5 mb-2">${rent.description}</a>
                                        <p><i class="fa fa-map-marker-alt me-2" style="color: #dbc519;"></i>${rent.location}</p>
                                    </div>
                                    <div class="d-flex border-top">
                                        <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined  me-2" style="color: #dbc519;"></i>${rent.size}</small>
                                        <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed  me-2" style="color: #dbc519;"></i>${rent.bed}</small>
                                        <small class="flex-fill text-center py-2"><i class="fa fa-bath me-2" style="color: #dbc519;"></i>${rent.bath}</small>
                                    </div>
                                
                                    <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
 <button class="btn py-3 px-5 schedule-visit" style="background-color: #dbc519;" 
    onclick='storePropertyAndOpenForm(${JSON.stringify(rent)})'>Schedule a visit</button>

                                    </div>
                                </div>
                            </div>
          `;
      });

      // Insert all products into the container at once
      rentContainer.innerHTML = rentHTML;

  } catch (error) {
      console.error('Error fetching products:', error);
      displayMessage('Failed to load properties. Please try again later.');
  }
});
//end of properties area
//
//
//


function openFormPopup() {
    document.getElementById('visitFormPopup').style.display = 'block';
}

function closeFormPopup() {
    document.getElementById('visitFormPopup').style.display = 'none';
}

function submitVisitForm() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const timestamp = new Date().toLocaleString();
    
    if (!fullName || !phone || !email) {
        alert("Please fill in all fields");
        return;
    }
    
    const property = JSON.parse(localStorage.getItem('selectedProperty')) || {};
    const visitData = { fullName, phone, email, timestamp, property };
    localStorage.setItem('visitData', JSON.stringify(visitData));
    
    window.location.href = 'visit.html';
}











//
//
//
//start of 

//end of 
//
//
//







// Display error message function
function displayMessage(message) {
    const messageContainer = document.querySelector('#message-container');
    messageContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Auto-remove the alert after 5 seconds
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}











//curosel slides
let currentSlide = 0;
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slideCount = slideElements.length;

// Clone the first slide and append it to the end
const firstSlideClone = slideElements[0].cloneNode(true);
slides.appendChild(firstSlideClone);

function updateSlidePosition() {
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlidePosition();
}

// Move to the next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide === slideCount) {
    setTimeout(() => {
      slides.style.transition = 'none';
      currentSlide = 0;
      slides.style.transform = `translateX(0)`;
    }, 500);
  }
  updateSlidePosition();
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

// Initialize
updateSlidePosition();

  
  const popupOverlay = document.getElementById('popupOverlay');
const popupContent = document.getElementById('popupContent');
function showPopup(slideIndex) {
    const slideDetails = [
        { title: 'cozy duplex', details: 'going for 8.5m' },
        { title: 'Bugalow ', details: 'going for 8.5m' },
        { title: 'nice apartment', details: 'going for 8.5m' },
    ];

    if (slideDetails[slideIndex - 1]) {  // Fix index reference
        popupContent.querySelector('h2').textContent = slideDetails[slideIndex - 1].title;
        popupContent.querySelector('p').textContent = slideDetails[slideIndex - 1].details;
    } else {
        popupContent.querySelector('h2').textContent = 'No Title';
        popupContent.querySelector('p').textContent = 'No Details available.';
    }

    // Show the popup
    popupOverlay.style.display = 'flex';
}


function closePopup() {
  // Hide the overlay
  popupOverlay.style.display = 'none';
}

// Attach event listeners to close the popup when clicking outside the content
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});
//end of curosel
//
//
//

//
//
//
// modal property 

function viewProperty(product) {
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalPrice").textContent = product.price;
    document.getElementById("modalDescription").textContent = product.description;
    document.getElementById("modalLocation").textContent = product.location;
    document.getElementById("modalSize").textContent = product.size;
    document.getElementById("modalBed").textContent = product.bed;
    document.getElementById("modalBath").textContent = product.bath;
}


//end of modal property
//
//
//
const search_btn = document.getElementById("search_btn");
const search_bar = document.getElementById("search_bar");

search_btn.addEventListener('click', (e) => {
    search_bar.style.display = "block";
  });

  search_bar.addEventListener('mouseout', (e) => {
    search_bar.style.display = "none";
  });
  search_bar.addEventListener('mouseover', (e) => {
    search_bar.style.display = "block";
  });
function filterProperties() {
    let priceInput = document.getElementById("searchPrice");
    let typeInput = document.getElementById("searchType");
    let locationInput = document.getElementById("searchLocation");

    let price = priceInput ? priceInput.value : "";
    let type = typeInput ? typeInput.value.toLowerCase() : "";
    let location = locationInput ? locationInput.value.toLowerCase() : "";

    let properties = document.querySelectorAll(".property-item");

    properties.forEach(property => {
        let propertyPrice = parseInt(property.getAttribute("data-price")) || 0;
        let propertyType = property.getAttribute("data-type")?.toLowerCase() || "";
        let propertyLocation = property.getAttribute("data-location")?.toLowerCase() || "";

        let matchesPrice = price ? propertyPrice <= parseInt(price) : true;
        let matchesType = type ? propertyType === type : true;
        let matchesLocation = location ? propertyLocation === location : true;

        if (matchesPrice && matchesType && matchesLocation) {
            property.parentElement.style.display = "block"; // Show property
        } else {
            property.parentElement.style.display = "none"; // Hide property
        }
    });
}
