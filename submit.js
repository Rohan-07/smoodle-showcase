document.getElementById('screenshot').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('imagePreview');
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById('projectForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  try {
    const response = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Project submitted successfully!');
      window.location.href = 'index.html';
    } else {
      alert('Error submitting project: ' + result.message);
    }
  } catch (error) {
    alert('Error submitting project: ' + error.message);
  }
});
