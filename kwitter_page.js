var firebaseConfig = {
    apiKey: "AIzaSyBUOXNdEdZk2SYPnrv33sq3pQ9yr9TvJa8",
    authDomain: "kwitter1-38e05.firebaseapp.com",
    databaseURL: "https://kwitter1-38e05-default-rtdb.firebaseio.com",
    projectId: "kwitter1-38e05",
    storageBucket: "kwitter1-38e05.appspot.com",
    messagingSenderId: "525283043917",
    appId: "1:525283043917:web:b8a743b8a7d8af0d410a04",
    measurementId: "G-2H7B3VS9LC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");



function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                username = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + username + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                button_with_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> Like:"+like+"</span></button>";

                row = name_with_tag + message_with_tag + button_with_tag+ span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });

}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}