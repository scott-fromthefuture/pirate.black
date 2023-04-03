// reveal contact information
function reveal(contact, subject) {
  //decode
  contact = atob(contact);
  subject = atob(subject);

  var email = document.getElementById("email");

  email.href = 'mailto:' + contact + '?subject=' + subject;
  email.innerText = contact;
}