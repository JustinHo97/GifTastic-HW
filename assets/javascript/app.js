$(document).ready(function () {

    var buttons = ["Freddiew", "Seananners", "Mr. Sark", "Nigga Higa", "videogamedunkey", "", "ProZD"];

    createButtons(buttons);

    function createButtons(buttons) {
        $("#buttons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var button = $("<button>");
            button.addClass("search-term");
            button.attr("data-search", buttons[i]);
            button.text(buttons[i]);
            $("#buttons").append(button);
        }
    }

    $("#add-button").on("click", function (event) {
        event.preventDefault();
        var search = $("#button-input").val().trim();
        buttons.push(search);
        createButtons(buttons);
        $("#button-input").val("");
    });

    $(document).on("click", ".search-term", function () {
        var name = $(this).data("search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                var results = response.data;
                var allgifs = $("<div>");
                allgifs.addClass("all-gifs");
                for (var i = 0; i < results.length; i++) {
                    var box = $("<div>");
                    box.addClass("gif-box");
                    box.html(results[i].rating + "<br>");
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animated", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("gif");
                    box.append(image);
                    allgifs.append(box);
                    $("#gifs").prepend(allgifs);
                }
            })

    });

    $(document).on("click",".gif", function(){
        if($(this).attr("data-state") === "still"){
            $(this).attr("src", ($(this).data("animated")));
            $(this).attr("data-state", "animated");
        }
        else {
            $(this).attr("src", ($(this).data("still")));
            $(this).attr("data-state", "still");
        }
    })
});