const randomString = require('randomstring');
const fs = require('fs');
const path = require('path');

const UploadFile = (req, res) => {
  var file = req.files.file; //.file-poleto so ke go isprakjame//

  console.log(file);
  if(file.size > 10 * 1024 * 1024){
    return res.status(500).send('Filesize too big');
  }
    //express !?//
  var allowedTypes = [
      'image/png', 
      'image/jpg', 
      'image/jpeg', 
      'image/jpeg',
      // 'image/jfif', 
      'image/gif' 
  ];

    if(allowedTypes.indexOf(file.mimetype) == -1){
        return res.status(500).send('Filetype not on the list');
    };

    var prefix = randomString.generate({
        lenght: 10,
        charset: 'alphanumeric'
    });

    const folderName = `./uploads/${req.user.id}`;
    if(!fs.existsSync(folderName)){
      fs.mkdirSync(folderName);
    };

  file.mv(`./uploads/${req.user.id}/${prefix}_${file.name}`, err =>{
      if(err){
          console.log(err)
          return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send({
          filename: `${prefix}_${file.name}`
      });
  });
};


const DownloadFile = (req, res) => {
  
  let filepath = path.resolve(`${__dirname}/../uploads/${req.user.id}/${req.params.filename}`);
    if(fs.existsSync(filepath)){
      res.sendFile(filepath);
    } else {
      res.status(404).send(`not found`)
    }
}


module.exports = {
    UploadFile,
    DownloadFile
}