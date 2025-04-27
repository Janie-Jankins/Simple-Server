const http = require('http')
const fs = require('fs');
const {open, readFile, appendFile, readFileSync, writeFile} = require('fs');

const DATA_FILE = "database.json";

const createCollections = () => {
    readFile(DATA_FILE, 'utf8', (err, data) => {
        console.log(data);
        const dataCollections = {
            movies: [
                {name: 'The Karate Kid', year: 1984, restriction: 'PG', hours: '2h6m', rating: '7.3/10'},
                {name:'Beauty And The Beast', year: 2017, restriction: 'PG', hours: '2h9m', rating: '7.1/10'},
                {name: 'Green Lantern', year: 2011, restriction:'PG-13',hours:'1h54m',rating:'5.5/10'},
                {name:'Batman Begins',year: 2005, restriction:'PG-13', hours:'2h20m',rating:'8.2/10'}
            ],
            
            series: [
                {name:'Suits',year:'2011-2019',restriction:'TV-14',hours:'45m',rating:'8.4/10'},
                {name:'Prison Break',year:'2005-2017',restriction:'TV-14',hours:'44m',rating:'8.3/10'},
                {name:'Peaky Blinders',year:'2013-2022',restriction:'TV-MA',hours:'1h',rating:'8.7/10'},
                {name:'Breaking Bad',year:'2008-2013',restriction:'TV-MA',hours:'45m',rating:'9.5/10'}
            ],
            
            songs: [
                {name:'Headlines',year:'2015',artist:'Drake',genre:'R&B/Soul, Hip-Hop/Rap'},
                {name:'Loyal',year:'2013',artist:'Chris Brown, Lil Wayne, Tyga',genre:'Dance pop'},
                {name:'Adorn',year:'2012',artist:'Miguel',genre:'Classic soul'},
                {name:'Empire State Of Mind',year:'2009',artist:'Jay-z, Alicia Keys',genre:'Hip-Hop/Rap'}   
            ]};
        writeFile(DATA_FILE, JSON.stringify(dataCollections),err => {
            if(err) throw err
            console.log("Collections created");
            
        })
        
    }) 
}

exports.createFile = () => {
    open(DATA_FILE, 'wx', (err,fd) => {
        if(err && err.code === "EEXIST"){
            console.log("file exists");
            return
        }else{
            console.log("creating collections");
            createCollections();
        }
    })
}
exports.getMovies = async() => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.movies;
    
}
exports.getMovie = async(movieId) => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.movies.filter(movies => movies.name === movieId)
}

exports.getSeries = async() => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.series;
    
}
exports.getSerie = async(seriesId) => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.series.filter(series => series.name === seriesId)
}
exports.getSongs = async() => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.songs;
    
}
exports.getSong = async(songId) => {
    const data = readFileSync(DATA_FILE);
    console.log({data});
    const jsonData = JSON.parse(data);
    console.log({jsonData});
    return jsonData.songs.filter(songs => songs.name === songId)
}

exports.addMovie = async(name,year,restriction,hours,rating) => {
    readFile(DATA_FILE, 'utf8', (err,data) => {
        console.log({data});
        const jsonData = JSON.parse(data);
        console.log({jsonData});
        jsonData.movies.push({
            name: name,
            year: year,
            restriction: restriction,
            hours: hours,
            rating: rating
        })
        
        writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
            if(err) throw err
            console.log('data updated');
            
        })
    })
}

exports.addSeries = async(name,year,restriction,hours,rating) => {
    readFile(DATA_FILE, 'utf8', (err,data) => {
        console.log({data});
        const jsonData = JSON.parse(data);
        console.log({jsonData});
        jsonData.series.push({
            name: name,
            year: year,
            restriction: restriction,
            hours: hours,
            rating: rating
        })
        
        writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
            if(err) throw err
            console.log('data updated');
            
        })
    })
}

exports.addSong = async(name,year,artist,genre) => {
    readFile(DATA_FILE, 'utf8', (err,data) => {
        console.log({data});
        const jsonData = JSON.parse(data);
        console.log({jsonData});
        jsonData.songs.push({
            name: name,
            year: year,
            artist: artist,
            genre: genre
        })
        
        writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
            if(err) throw err
            console.log('data updated');
            
        })
    })
}
exports.deleteMovie = async (movieId) => {
    const data = readFileSync(DATA_FILE);
    console.log({ data });
    const jsonData = JSON.parse(data);
    console.log({ jsonData });
    
    jsonData.movies = jsonData.movies.filter(movies => movies.name !== movieId);

    console.log({jsonData : jsonData.movies});
    

    writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Data deleted');
    });
}
exports.deleteSong = async (songId) => {
    const data = readFileSync(DATA_FILE);
    console.log({ data });
    const jsonData = JSON.parse(data);
    console.log({ jsonData });
    
    jsonData.songs = jsonData.songs.filter(song => song.name !== songId);

    writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Data updated');
    });
}
exports.deleteSeries = async (seriesId) => {
    const data = readFileSync(DATA_FILE);
    console.log({ data });
    const jsonData = JSON.parse(data);
    console.log({ jsonData });
    
    jsonData.series = jsonData.series.filter(series => series.name !== seriesId);

    writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Data updated');
    });
}
exports.updateMovies = async(movieId, year, restriction, hours, rating) => {
    try {
        const data = readFileSync(DATA_FILE);
        let jsonData = JSON.parse(data);
        
        jsonData.movies = jsonData.movies.map(movie => {
            if(movieId === movie.name) {
                return {
                    name: movie.name,
                    year: year,
                    restriction: restriction,
                    hours: hours,
                    rating: rating
                };
            } else {
                return movie;
            }
        });
        
        return new Promise((resolve, reject) => {
            writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error('Error updating file:', err);
                    reject(err);
                } else {
                    console.log('Data updated successfully');
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.error('Error in updateMovies:', error);
        throw error;
    }
}

exports.updateSeries = async(seriesId, year, restriction, hours, rating) => {
    try {
        const data = readFileSync(DATA_FILE);
        let jsonData = JSON.parse(data);
        
        jsonData.series = jsonData.series.map(serie => {
            if(seriesId === serie.name) {
                return {
                    name: serie.name,
                    year: year,
                    restriction: restriction,
                    hours: hours,
                    rating: rating
                };
            } else {
                return serie;
            }
        });
        
        return new Promise((resolve, reject) => {
            writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error('Error updating file:', err);
                    reject(err);
                } else {
                    console.log('Data updated successfully');
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.error('Error in updateSeries:', error);
        throw error;
    }
}

exports.updateSongs = async(songId, year, artist,genre) => {
    try {
        const data = readFileSync(DATA_FILE);
        let jsonData = JSON.parse(data);
        
        jsonData.songs = jsonData.songs.map(song => {
            if(songId === song.name) {
                return {
                    name: song.name,
                    year: year,
                    artist: artist,
                    genre: genre
                };
            } else {
                return song;
            }
        });
        
        return new Promise((resolve, reject) => {
            writeFile(DATA_FILE, JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error('Error updating file:', err);
                    reject(err);
                } else {
                    console.log('Data updated successfully');
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.error('Error in updateSeries:', error);
        throw error;
    }
}


