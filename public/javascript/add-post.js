const postForm = document.querySelector('#form-post-editor');
async function editFormHandler(event) {
  event.preventDefault();
  console.log(event.target);
  const post_id = JSON.parse(event.target.getAttribute('data-id'));
  console.log(post_id);
  const title = document.querySelector('input[name="post-title"]').value;
  const text = document.querySelector('textarea[name="post-text"]').value;

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert(response.statusText);
  }
}

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const text = document.querySelector('textarea[name="post-text"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// if (window.location.pathname === '/new'){
//   document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
// } else {
//   document.querySelector('#new-post-form').addEventListener('submit', editFormHandler);
// }
// const eventHandler = async function(event) {
//   if (event.target.
// }

window.addEventListener('DOMContentLoaded', (event) => {
  if (!(event.target.URL.match(/\/dashboard\/.+/))) return;
  event.preventDefault();
  console.log('DOM fully loaded and parsed');

    // document.getElementById('form-post-editor').addEventListener('submit', newFormHandler); 

  if (event.target.URL.match('/dashboard/new')){
    postForm.addEventListener('submit', newFormHandler);
    return
    // document.getElementById("form-post-editor").addEventListener('submit', newFormHandler);
  } 
  // else if (event.target.URL.match(/\/edit\/[0-9]+/)) {
  postForm.addEventListener('submit', editFormHandler);
    // document.querySelector('#form-post-editor').addEventListener('submit', editFormHandler);
  // }
});
