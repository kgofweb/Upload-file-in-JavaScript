// DOM elements
const form = document.querySelector('form');
const fileInput = document.querySelector('.file-input');
const progressArea = document.querySelector('.progress-area');
const uploadArea = document.querySelector('.upload-area');

// Event listener
form.addEventListener('click', () => {
  fileInput.click();
})

fileInput.addEventListener('change', evt => {
  // 
  let file = evt.target.files[0];

  if(file) {
    // Get file name
    let fileName = file.name;
    // 
    uploadFile(fileName);
  }
})

function uploadFile(name) {
  // Create new xml obj
  let xhr = new XMLHttpRequest();

  // POST request to specified URL File
  xhr.open('POST', 'php/upload.php');
  xhr.upload.addEventListener('progress', ({ loaded, total }) => {
    // Get percentage of loaded
    let fileLoaded = Math.floor((loaded / total) * 100);
    // Get file size
    let fileTotal = Math.floor(total / 1000);

    let porgressHTML = `
      <li class="row">
        <i class="uil uil-file-check-alt"></i>
        <div class="content">
          <div class="details">
            <span class="name">${name} - Uploading</span>
            <span class="percent">${fileLoaded}%</span> 
          </div>

          <div class="progress-bar">
            <div class="progress" style="width: ${fileLoaded}%"></div>
          </div>
        </div>
      </li>
    `;
    // Insert to HTML
    progressArea.innerHTML = porgressHTML;

    let uploadedHTML = `
      <li class="row">
        <div class="content">
          <i class="uil uil-file-check-alt"></i>
          <div class="details">
            <span class="name">image_01.png - Uploaded</span>
            <span class="size">3 Mb</span>
          </div>
        </div>
        <i class="uil uil-check"></i>
      </li>
    `;

    // uploadArea.innerHTML = uploadedHTML;
  });

  // formData is an object to easily send form data
  let formData = new FormData(form);

  // Send form data to php
  xhr.send(formData);
}