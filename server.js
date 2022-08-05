const express  =  require('express');
const app  =  express();
const fs  =  require('fs')


app.get('/video', (req, res) => {
    const range =  req.headers.range;
    const filePath =  './adobe.mp4';
    const fileSize =  fs.statSync(filePath).size 
    const chunkSize = 1 * 1e+6; 
    const start  =  Number(range.replace(/\D/g, ''));
    const end  = Math.min(start + chunkSize, fileSize  -1); 
    const contentLength =  end - start + 1;

    // set headers
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);  

    // create & set stream
    const stream  =  fs.createReadStream(filePath, {start, end});
    stream.pipe(res)


})

const port  =  3000;
app.listen(port, () => console.log(`running on ${port}`))