const { createServer } = require('http');
const fs = require('fs');
const { getMovies, getMovie, getSeries, getSerie, getSongs, getSong, addMovie, addSeries, 
    addSong, deleteMovie, deleteSeries, deleteSong, updateMovies, updateSeries, updateSongs } = require('./file-manager');
const url = require('url');

exports.server = createServer((req,res) => {
    const parsedUrl = url.parse(req.url,true);
    const urlPath = parsedUrl.pathname
   
    const urlSegments = urlPath.split('/')
    const path = urlSegments[1];
    let paramId = urlSegments[2];
  
    if(req.method === 'GET'){
        if (urlPath === '/') {
            fs.readFile('api-docs.html', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Failed to load documentation');
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        }
       else if(path === 'movies'){
            if(paramId){
                paramId = paramId.replaceAll("%20", " ");
                getMovie(paramId).then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({movies: result}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to load movie'}))
                })
            }else{
                getMovies().then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({movies: result}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to load movies'}))
                })
            }
            
        }
        else if(path === 'series'){
            if(paramId){
                paramId = paramId.replaceAll("%20", " ");
                getSerie(paramId).then(result => {
                console.log({result});
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({series: result}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to load the series'}))
                })
            }else{
                getSeries().then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({series: result}))
                    }).catch(err => {
                        console.log({err});
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({error: 'Failed to load series'}))
                    })
            }
            
        }
        else if(path === 'songs'){
            if(paramId){
                paramId = paramId.replaceAll("%20", " ");
                getSong(paramId).then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({songs: result}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to load song'}))
                })
            }else{
                getSongs().then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({songs: result}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to load songs'}))
                })
            }
            
        }else{
            res.statusCode = 404;
            res.end();
        }
    }
    else if(req.method === 'POST'){
       if(path === 'movies'){
        req.on('data',data => {
            const jsonData = JSON.parse(data)
            const {name,year,restriction,hours,rating} = jsonData;
            console.log(jsonData);
            addMovie(name,year,restriction,hours,rating).then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'value received and added',movies: {name,year,restriction,hours,rating}}))
            }).catch(err => {
                console.log({err});
                res.statusCode = 500;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'err'}))
            })
    
            
        })
        }
        else if(path === 'series'){
            req.on('data',data => {
                const jsonData = JSON.parse(data)
                const {name,year,restriction,hours,rating} = jsonData;
                console.log(jsonData);
                addSeries(name,year,restriction,hours,rating).then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'value received and added',series: {name,year,restriction,hours,rating}}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'err'}))
                })
        
                
            })
        }
        else if(path === 'songs'){
            req.on('data',data => {
                const jsonData = JSON.parse(data)
                const {name,year,artist,genre} = jsonData;
                console.log(jsonData);
                addSong(name,year,artist,genre).then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'value received and added',songs: {name,year,artist,genre}}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'err'}))
                })
        
                
            })
        }
        else{
            req.statusCode = 404;
            res.end();
        }
   }
   else if(req.method === 'DELETE'){

        if(path === 'movies'){
            if(paramId){
                paramId = paramId.replaceAll("%20", " ");
                deleteMovie(paramId).then(result => {
                    console.log({result});
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'deleted'}))
                }).catch(err => {
                    console.log({err});
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({error: 'Failed to delete movie'}))
                })
            }
            
            }
            else if(path === 'series'){
                if(paramId){
                    paramId = paramId.replaceAll("%20", " ");
                    deleteSeries(paramId).then(result => {
                        console.log({result});
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({message: 'deleted'}))
                    }).catch(err => {
                        console.log({err});
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({error: 'Failed to delete series'}))
                    })
                }
            }
            else if(path === 'songs'){
                if(paramId){
                    paramId = paramId.replaceAll("%20", " ");
                    deleteSong(paramId).then(result => {
                        console.log({result});
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({message: 'deleted'}))
                    }).catch(err => {
                        console.log({err});
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({error: 'Failed to delete song'}))
                    })
                }
            }
            else{
                req.statusCode = 404;
                res.end();
            }
    }
    else if(req.method === 'PUT'){
        if(path === 'movies'){
            if(paramId){
                paramId = paramId.replaceAll("%20", " ");
                req.on('data',data => {
                    const jsonData = JSON.parse(data)
                    const {name,year,restriction,hours,rating} = jsonData;
                    updateMovies(paramId,year,restriction,hours,rating).then(result => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({message: 'updated',movies: [{name: paramId,year,restriction,hours,rating}]}))
                    }).catch(err => {
                        console.log({err});
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json')
                        res.end(JSON.stringify({message: 'err'}))
                    })
            
                    
                })
            }
            
            }
            else if(path === 'series'){
                if(paramId){
                    paramId = paramId.replaceAll("%20", " ");
                    req.on('data',data => {
                        const jsonData = JSON.parse(data)
                        const {name,year,restriction,hours,rating} = jsonData;
                        updateSeries(paramId,year,restriction,hours,rating).then(result => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json')
                            res.end(JSON.stringify({message: 'updated',series: [{name: paramId,year,restriction,hours,rating}]}))
                        }).catch(err => {
                            console.log({err});
                            res.statusCode = 500;
                            res.setHeader('Content-Type','application/json')
                            res.end(JSON.stringify({message: 'err'}))
                        })
                
                        
                    })
                }
            }
            else if(path === 'songs'){
                if(paramId){
                    paramId = paramId.replaceAll("%20", " ");
                    req.on('data',data => {
                        const jsonData = JSON.parse(data)
                        const {name,year,artist,genre} = jsonData;
                        updateSongs(paramId,year,artist,genre).then(result => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json')
                            res.end(JSON.stringify({message: 'updated',songs: [{name: paramId,year,artist,genre}]}))
                        }).catch(err => {
                            console.log({err});
                            res.statusCode = 500;
                            res.setHeader('Content-Type','application/json')
                            res.end(JSON.stringify({message: 'err'}))
                        })
                
                        
                    })
                }
            }
            else{
                req.statusCode = 404;
                res.end();
            }
    }

});