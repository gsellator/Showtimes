var express = require('express'),
    request = require('request'),
    allocine = require('allocine-api');

// App Setup
var app = express(),
    fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//Helpers
var padStr = function(i) {
    return (i < 10) ? "0" + i : "" + i;
}

app.locals.printDate = function() {
    var temp = new Date();
    return padStr(temp.getDate()) + '/' + padStr(1 + temp.getMonth()) + '/' + padStr(temp.getFullYear());
}

app.locals.secondsToTime = function(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var obj = {
        "h": hours,
        "m": padStr(minutes)
    };

    if (obj.h > 0)
        return obj.h + 'h' + obj.m;
    else
        return obj.m + 'min';
}

// Routes
app.get('/', function(req, res) {
    res.render('test.ejs');
});

app.get('/edition/', function(req, res) {
    console.log(req.query);

    var today = new Date(); 
    if (today.getDay() != 3) {
        console.log('204');
        res.status(204);
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end();
    } else {
        if (req.query.cinema){
            allocine.api('showtimelist', {theaters: req.query.cinema}, function(error, result) {
                if(error) { console.log('Error : '+ error); return; }
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.render('index.ejs', {item: result.feed.theaterShowtimes[0]});
            });
        } else {
            allocine.api('showtimelist', {theaters: 'C0159'}, function(error, result) {
                if(error) { console.log('Error : '+ error); return; }
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.render('index.ejs', {item: result.feed.theaterShowtimes[0]});
            });
        }
    }
});

app.get('/sample/', function(req, res) {
    console.log(req.query);
    allocine.api('showtimelist', {theaters: 'C0159'}, function(error, result) {
        if(error) { console.log('Error : '+ error); return; }
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.render('index.ejs', {item: result.feed.theaterShowtimes[0]});
    });
});

app.post('/validate_config/', function(req, res) {
    console.log('validate_config');
    res.status(200);
    res.send({"valid": true});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3070);