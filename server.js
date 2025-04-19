const movies = {
    theKarateKid: ['The Karate Kid','1984','PG','2h6m','7.3/10'],
    beautyAndTheBeast: ['Beauty and The Beast','2017','PG','2h9m','7.1/10'],
    greenLantern: ['Green Lantern','2011','PG-13','1h54m','5.5/10'],
    batmanBegins: ['Batman Begins','2005','PG-13','2h20m','8.2/10']
}

const series = {
    suits: ['Suits','2011-2019','TV-14','45m','8.4/10'],
    prisonBreak: ['Prison Break','2005-2017','TV-14','44m','8.3/10'],
    peakyBlinders: ['Peaky Blinders','2013-2022','TV-MA','1h','8.7/10'],
    breakingBad: ['Breaking Bad','2008-2013','TV-MA','45m','9.5/10']
}

const songs = {
    headlines: ['Headlines','2015','Drake',['R&B/Soul','Hip-Hop/Rap']],
    loyal: ['Loyal','2013',['Chris Brown','Lil Wayne','Tyga'],'Dance pop'],
    adorn: ['Adorn','2012','Miguel','Classic soul'],
    empire: ['Empire State of Mind','2009',['Jay-z','Alicia Keys'],'Hip-Hop/Rap']   
}

const http = require('http')

const server = http.createServer((req,res) => {
    if(req.method === 'GET'){
        if(req.url === '/'){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain')
            res.end("Hello From Node.js")
       }
       else if(req.url === '/movies'){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({movies: movies}))
        }
        else if(req.url === '/series'){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({series: series}))
        }
        else if(req.url === '/songs'){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({songs: songs}))
        }else{
            res.statusCode = 404;
            res.end();
        }
    }
    else if(req.method === 'POST'){
        
        let body = '';

       req.on('data',(chunk) => {
           body += chunk.toString();
       })
       if(req.url === '/movies'){
        req.on('end',() => {
            movies.newVal = [body];
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify({message: 'value received and added',movies}))
        })
        }
        else if(req.url === '/series'){
            req.on('end',() => {
                series.newVal = [body];
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'value received and added',series}))
            })
        }
        else if(req.url === '/songs'){
            req.on('end',() => {
                songs.newVal = [body];
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'value received and added',songs}))
            })
        }
        else{
            req.statusCode = 404;
            res.end();
        }
   }
   else if(req.method === 'DELETE'){
        
        let body = '';

        req.on('data',(chunk) => {
            body += chunk.toString();
        })
        if(req.url === '/movies'){
            req.on('end',() => {
                delete movies[body]
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'value received and deleted',movies}))
            })
            }
            else if(req.url === '/series'){
                req.on('end',() => {
                    delete series[body]
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'value received and added',series}))
                })
            }
            else if(req.url === '/songs'){
                req.on('end',() => {
                    delete songs[body]
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'value received and added',songs}))
                })
            }
            else{
                req.statusCode = 404;
                res.end();
            }
    }
    else if(req.method === 'PUT'){
        
        let body = '';

        req.on('data',(chunk) => {
            body += chunk.toString();
        })
        if(req.url === '/movies'){
            req.on('end',() => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify({message: 'entry recieved and updated',data:body}))
            })
            }
            else if(req.url === '/series'){
                req.on('end',() => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'entry received and updated',data:body}))
                })
            }
            else if(req.url === '/songs'){
                req.on('end',() => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({message: 'entry received and updated',data:body}))
                })
            }
            else{
                req.statusCode = 404;
                res.end();
            }
    }

});
server.listen(3000,() => {
    console.log("Server is running");
    
})