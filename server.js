/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express.io');
var bodyParser = require('body-parser');
var app = express().http().io();
var spotifyPlaylist = require('spotify-playlist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.get('/helpers.json', function(req, res) {
  fs.readFile('helpers.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/helpers', function(req, res) {
  res.sendfile(__dirname+'/public/helper.html');
});

app.post('/helpers.json', function(req, res) {
  fs.readFile('helpers.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('helpers.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});
app.get('/getTrack', function(req, res) {

  spotifyPlaylist.playlistUri('spotify:user:spotify:playlist:6RU5ydGPBQ8fJKWAqMj8Hg', function(err,results){
    var playlist_tracks = results.playlist.tracks;
    index = 0;
    res.send( playlist_tracks[0].id);
  }); //Normal spotify URI. 
  // spotifyPlayList.playlist('syknyk', '0Idyatn0m08Y48tiOovNd9', console.log); //Using username and playlist ID as parameters.
});
app.get('/now_playing', function(req, res) {
    res.sendfile(__dirname+'/public/now_playing.html'); //Normal spotify URI. 
  // spotifyPlayList.playlist('syknyk', '0Idyatn0m08Y48tiOovNd9', console.log); //Using username and playlist ID as parameters.
});



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
