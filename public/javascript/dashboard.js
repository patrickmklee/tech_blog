
// async function viewPost() {
//     const response = await fetch('/api/post/logout', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' }
//     });
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector
//   document.querySelector('#logout').addEventListener('click', logout);

function bindButtons(){
    document.getElementById('Submit').addEventListener('click', sendRequest());
}
