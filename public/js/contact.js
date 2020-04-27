$(document).ready(function() {
  $('#sendBtn').on("click", () => {
    const contact = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#textarea').val()
    };
    
    if (!contact.name || !contact.email || !contact.message) {
      return;
    };

    sendMessage(contact.name, contact.email, contact.message);

    M.toast({html: 'Thank You! You should expect a response soon!', classes: 'rounded white-text'});

    $('#name').val("");
    $('#email').val("");
    $('#textarea').val("");    
  });

  function sendMessage(name, email, message) {
    $.post("/api/messages", {
      name: name,
      email: email,
      message: message
    });
  };  
});