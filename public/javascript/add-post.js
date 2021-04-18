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

if (window.location.pathname === '/new'){
  document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
} else {
  document.querySelector('#new-post-form').addEventListener('submit', editFormHandler);
}


