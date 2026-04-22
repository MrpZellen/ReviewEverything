const express = require('express');
const app = express();



app.get('/', (req, res) => {
      res.json(
        {
            'isServingJSON': true,
        }
      )
})


app.listen(3100, () => {
      console.log('wowee zowee port 3100')
})
