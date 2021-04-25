//ADD YOUR FIREBASE LINKS
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

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}