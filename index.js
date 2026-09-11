const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Your free backend is running from an iPhone!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
