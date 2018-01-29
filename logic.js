//setup variables
//==========================================================
const authKey = "28972db747a94e5aa19d7aa6651f5fcf";

var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear     = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + authKey;

//  variable to track number of articles
var articleCounter = 0;


//functions
//==========================================================
function runQuery(numArticles, queryURL){

    // AJAX function
    $.ajax({url: queryURL, method: "GET"})
        .done(function(NYTData) {

            $("#wellSection").empty();
            
            for(var i=0; i<numArticles; i++) {
                
                
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "articleWell-" + i);
                $("#wellSection").append(wellSection);

                //chech if things exist
                if(NYTData.response.docs[i].headline != "null"){
                    console.log(NYTData.response.docs[i].headline.main);
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }

                if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                    console.log(NYTData.response.docs[i].byline.original);
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                }

                //attach content to approp well
                
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
            
                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);
            }
            

            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);
        });
       
}




//main process
//==========================================================
$("#searchBtn").on("click", function() {

    //Get the 
    queryTerm = $("#search").val().trim();
    

    //add in the search term
    var newURL = queryURLBase + "&q=" + queryTerm;
    
    //Get the Number of records
    numResults = $("#numRecords").val();
    
    //Get the Start Year and End Year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

if(parseInt(startYear)) {
    // add the necessary fields
    startYear += "0101";
    //add the date info to the URL
    newURL += "&begin_date=" + startYear;
}

if(parseInt(endYear)) {
    // add the necessary fields
    endYear += "0101";
    // add the date info to the URL
    newURL += "&end_date=" + endYear;
}

    //send the AJAX call the newly assembled URL
    runQuery(numResults, newURL);
    return false;
});

//1. retrieve user input, convert to variables
//2. use variables to run an AJAX xall to the New York Times
//break down the NYT object into usable fields
//danamically generate html content



// 5. dealing with 'edge cases'---bugs, etc.