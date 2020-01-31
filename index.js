'use strict';


function displayResults(htmlString){
    $('.js-results').removeClass('hidden');
    $('.js-results').html(htmlString);
}

function generateHtml(json){
    console.log(json);
    
    let resultsHtml = [];
    json.map(obj=> resultsHtml.push(`<li>REPO:"${obj.full_name}", (link: <a href="${obj.html_url}" target="_blank">${obj.html_url}</a>)</li>`));
    
    console.log(resultsHtml.join(""));
    return resultsHtml.join("");
}

function getRepos(userInput){
    console.log(`getRepos called with "${userInput}" passed in...`);
    let url = `https://api.github.com/users/${userInput}/repos`

    fetch(url)
    .then(response=> {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson=> {
        console.log(responseJson);
        let results = generateHtml(responseJson);
        displayResults(results);
    })
    .catch(err=> {
        console.log(`Something went wrong with the fetch...${err.message}`);
    });
}


function watchForm(){
    console.log('watchform running and wating...');

    $('form').on('submit', e=> {
        e.preventDefault();
        console.log('watchform Triggered!');
        let userInput = $(e.target).find('input').val();
        getRepos(userInput);
    })
}


function handleApp(){
    console.log("DOM loaded, page ready...");
    watchForm();
}





$(handleApp);