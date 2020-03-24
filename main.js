//FIREBASE CODE
var firebaseConfig = {
    apiKey: "AIzaSyAcDEkJKQp8MFxrClzw6SXpsQWufTWoItA",
    authDomain: "reservation-site-543e2.firebaseapp.com",
    databaseURL: "https://reservation-site-543e2.firebaseio.com",
    projectId: "reservation-site-543e2",
    storageBucket: "reservation-site-543e2.appspot.com",
    messagingSenderId: "922004965082",
    appId: "1:922004965082:web:e5f0d6d2436fcb5db807e3"
  };
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//RESERVATION
var reservationData = {};
$("#reservationDay").on("click",function(){
    reservationData.date=$("this").text();
    });
 
$("#makeReservation").on("submit",function(e){
        e.preventDefault();
        reservationData.name=$("#name").val();
        database.ref("reservationData").push(reservationData);
    });

function getReservations(){
    database.ref("reservationData").on("value",function(results){
        var allReservations = results.val();
        var reservation = [];
        for (var item in allReservations) {
            var context = {
              name: allReservations[item].name,
              date: allReservations[item].date,
              reservationId: item
            };
        var source = $("#reservation-template").html();
        var template = Handlebars.compile(source);
        var reservationTableElement = template(context);
        reservation.push(reservationTableElement);   
    }
    $("#existingReservation").append(reservation);
})}

getReservations();
