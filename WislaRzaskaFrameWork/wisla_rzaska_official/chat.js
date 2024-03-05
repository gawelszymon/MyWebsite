// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyApG-QtFsq6qrSw8rPhc1HeaP-_UcSIlI0",
    authDomain: "wislarzaskachat.firebaseapp.com",
    projectId: "wislarzaskachat",
    storageBucket: "wislarzaskachat.appspot.com",
    messagingSenderId: "873497067089",
    appId: "1:873497067089:web:a04babd5a160719b2c8270"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG.

  //gonna make a function to rejact unavaiable nick

// Pobierz dostęp do bazy danych Firebase


// Przykład użycia:


  class WISLA_RZASKA_CHAT{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator.
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'Wisła Rząska Chat'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() creates the join form
    create_join_form(){                         //enter formularz
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!
      var parent = this;

      var usedUserNames = [];

      var ref = db.ref('chats/');

      ref.once('value')
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var data = childSnapshot.val();
                  var name = data.name;
                  usedUserNames.push(name);
                  console.log('Użytkownik na wejściu:', name);
                });
              })
              .catch(function(error) {
                console.error('Wystąpił błąd:', error);
              });

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var joinInputs = JSON.parse(localStorage.getItem('joinInputs')) || [];

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'Podaj nazwę użytkownika (brak spacja)'

      join_input.onkeyup = function () {

                  //próba wywołania tablica użytkowników
       /* for(var i = 0; i < userNames.length; i++) {
                    console.log("Użytkownik z tablicy: ", userNames[i]);
                } */

        if (join_input.value.length > 0 && !usedUserNames.includes(join_input.value) && !join_input.value.includes(' ')) {
          join_button.classList.add('enabled')
          join_button.onclick = function () {
            parent.save_name(join_input.value)
            joinInputs.push(join_input.value)

            // Zapis aktualnej historii do localStorage
            localStorage.setItem('userHistory', JSON.stringify(joinInputs));

            join_container.remove()
            parent.create_chat()
            console.log(joinInputs);
          }
        } else {
          join_button.classList.remove('enabled')
          join_button.onclick = function() { };
        }
      }


      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }



    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT Chat HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Make the title smaller by making it 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')     //odpowiada za niewidoczny przycisk wysyłania wiadomości
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()}...`
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Enable the loading circle in the 'chat_content_container'
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" is really just deleting the name from the localStorage

      chat_logout.onclick = function() {
        // Pobierz referencję do bazy danych Firebase
        var ref = db.ref('chats/');

        // Pobierz wartość name, którą chcesz usunąć
        var nameToDelete = localStorage.getItem('name');

        // Sprawdź, czy nameToDelete nie jest puste
        if (nameToDelete) {
          // Zlokalizuj odpowiednie rekordy w bazie danych Firebase na podstawie nameToDelete
          ref.orderByChild('name').equalTo(nameToDelete).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              // Zaktualizuj pole 'name' na null w rekordach zamiast usuwać rekordy
              childSnapshot.ref.update({ name: nameToDelete + "(logout)" });
            });

            // Po aktualizacji pól 'name' w Firebase, wyczyść localStorage i przejdź do strony głównej
            localStorage.clear();
            parent.home();
          });
        } else {
          console.error('Brak wartości "name" w localStorage.');
        }
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }

    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      // if the local storage name is null and there is no message
      // then return/don't send the message. The user is somehow hacking
      // to send messages. Or they just deleted the
      // localstorage themselves. But hacking sounds cooler!!
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var userNames = [];

      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }



        // Now this is straight up from stack overflow 🤣
        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message

          userNames.push(name);

          console.log('Użytkownik:', name);
          console.log('Wiadomość:', message);

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          if (name == "Trener_Rafał" || name == "Trener_Łukasz" || name == "Trener_Gulio" || name == "Trener_Rafał(logout)" || name == "Trener_Łukasz(logout)" || name == "Trener_Gulio(logout)") {
              message_user.style.color = '#333399';
              message_user.style.opacity = 1;
              message_user.style.fontWeight = 'bold';
              message_user.style.fontSize = '15px';
          }

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;

       // console.log('Użytkownik z tablicy: ', userNames[0]);        //tablica użutkowników

        for(var i = 0; i < userNames.length; i++) {
            console.log("Użytkownik z tablicy: ", userNames[i]);
        }

    })

    }
  }
  // So we've "built" our app. Let's make it work!!
  var app = new WISLA_RZASKA_CHAT()
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if(app.get_name() != null){
    app.chat()
  }
}



/*
plan jest taki, aby nazwa dołączającego do czatu użytkowanika dodawała się do listy użytkowników (tj. tabeka stringów w javie script), jeśli w tej liście nie ma już
tak owego użytkownika, w przypadku gdy tak owa nazwa użytkownika już jest, strona prosi użytkownika o powtórne wpisanie nazwy użytkownika
w momencie, gdy użytkownik robi logout automatycznie jego nazwa użytkownika usuwana jest z list użytkowników
*/