// script.js

// Update information on the website by editing the Google Sheet below:
// https://docs.google.com/spreadsheets/d/1Gtw1_VK2bbvvd4YjwduPQ-jgx4a8W_LopHeCtidQ3jQ/edit?usp=sharing

// This script fetches data from a Google Apps Script web app that reads the Google Sheet
document.getElementById("year").textContent = new Date().getFullYear();

// When client creates their own Google Sheet, they need to update this URL
const API_URL = "https://script.google.com/macros/s/AKfycbz6zZvJD-zbuT4bTBCu9gVkf4KuDrSFCURbvimML3_tAuDVICWX8G3IyBw-EfRQ1IlDWg/exec";

// Helper function for fallback images
function getImage(url, fallback) {
    if (!url || url.trim() === "") return fallback;
    return url;
}

// Add the '+' sign to phone numbers because can't write '+49' directly in Google Sheets
function formatPhone(p) {
    if (!p) return "";
    return p.startsWith("+") ? p : "+" + p;
}

// Placeholders of photos
const DOCTOR_PLACEHOLDER =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor";

const ASSISTANT_PLACEHOLDER =
  "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Assistant";

const SERVICE_PLACEHOLDER =
  "https://api.dicebear.com/7.x/shapes/svg?seed=Medical+Service";

// Function to safely apply background image with fallback
  function applyBackgroundImage(url) {
    if (!url || url.trim() === "") return;

    const img = new Image();
    img.src = url;

    img.onload = () => {
        document.body.style.background = `url('${url}') no-repeat center/cover`;
    };

    img.onerror = () => {
        console.warn("Background image failed to load:", url);
    };
}

// Fetch data from the Google Apps Script web app
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const info = data.clinicInfo;

    // Apply background image
    applyBackgroundImage(info.background_image_url);

    // Header
    document.getElementById("clinic-title").textContent =
      info.clinic_name || (info.doctor_name + " Clinic");
    document.getElementById("clinic-tagline").textContent =
      info.tagline || info.clinic_description || "";

    // Doctor Section
    document.getElementById("doctor-section").innerHTML = `
      <img src="${getImage(info.doctor_photo_url, DOCTOR_PLACEHOLDER)}"
        onerror="this.src='${DOCTOR_PLACEHOLDER}'"
        class="w-40 h-40 rounded-full shadow bg-gray-100" />
      <div>
        <h2 class="text-4xl font-bold">${info.doctor_name}</h2>
        <p class="mt-3 text-lg">${info.doctor_description}</p>
      </div>
    `;

    // Services
    const servicesDiv = document.getElementById("services-list");
    servicesDiv.innerHTML = "";
    data.services.forEach(service => {
      servicesDiv.innerHTML += `
        <div class="p-5 bg-white rounded-lg shadow flex items-center gap-4">
          <img src="${getImage(service.image_url, SERVICE_PLACEHOLDER)}"
            onerror="this.src='${SERVICE_PLACEHOLDER}'"
            class="w-12 h-12 rounded-full shadow bg-gray-50 p-1" />
          <div>
            <h3 class="text-xl font-bold">${service.title}</h3>
            <p class="mt-1">${service.description}</p>
          </div>
        </div>
      `;
    });

    // Assistants
    const assistantsDiv = document.getElementById("assistants-list");
    assistantsDiv.innerHTML = "";
    data.assistants.forEach(staff => {
      assistantsDiv.innerHTML += `
        <div class="p-5 bg-white rounded-lg shadow text-center">
          <img src="${getImage(staff.photo_url, ASSISTANT_PLACEHOLDER)}"
               onerror="this.src='${ASSISTANT_PLACEHOLDER}'"
               class="w-24 h-24 rounded-full mx-auto shadow bg-gray-100" />
          <h3 class="text-xl font-bold mt-3">${staff.name}</h3>
          <p class="text-blue-600 font-medium">${staff.role}</p>
          <p class="mt-2 text-sm">${staff.description}</p>
        </div>
      `;
    });

    // Contact section
    const contactFields = [
      ["Address", info.address],
      ["Phone", formatPhone(info.phone)],
      ["Fax", info.fax],
      ["Email", info.email],
      ["Opening Hours", info.opening_hours],
      ["Holiday Schedule", info.holiday_schedule],
    ];

    let contactHTML = "";

    contactFields.forEach(([label, value]) => {
      // Only display the info if its value is not blank
      if (value && value.trim() !== "") {
        contactHTML += `<p><strong>${label}:</strong> ${value}</p>`;
      }
    });

    document.getElementById("contact-details").innerHTML = contactHTML;

    // Google Maps iframe (dynamic)
    if (info.address) {
        const trimmed = info.address.trim();

        // Only show map if address has at least 5 characters and contains a letter/number
        if (trimmed.length >= 5 && /[a-zA-Z0-9]/.test(trimmed)) {
            const mapDiv = document.getElementById("map");
            const encoded = encodeURIComponent(trimmed);

            mapDiv.innerHTML = `
                <iframe
                  src="https://www.google.com/maps?q=${encoded}&output=embed"
                  class="w-full h-64 rounded-lg shadow"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            `;
        } else {
            console.log("Address is too short or invalid, map not displayed.");
        }
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error loading data. Please check the Google Script URL.");
  });