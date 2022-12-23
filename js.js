//how to connect mongodb?
var db = null // global variable to hold the connection

MongoClient.connect('mongodb://localhost:27017/', function(err, client) {
    if(err) { console.error(err) }
    db = client.db('test') // once connected, assign the connection to the global variable
})

app.get('/', function(req, res) {
    db.collection('test').find({}).toArray(function(err, docs) {
        if(err) { console.error(err) }
        res.send(JSON.stringify(docs))
    })
})


var conn = MongoClient.connect('mongodb://localhost:27017/') // returns a Promise

app.get('/', function(req, res) {
    conn.then(client=> client.db('test').collection('test').find({}).toArray(function(err, docs) {
        if(err) { console.error(err) }
        res.send(JSON.stringify(docs))
    }))
})

//how to reverse array?

var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var length = array.length;


function temporarySwap(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}


function temporarySwapHalf(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0; left < length / 2; left += 1)
    {
        right = length - 1 - left;
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}


function xorSwap(array)
{
    var i = null;
    var r = null;
    var length = array.length;
    for (i = 0, r = length - 1; i < r; i += 1, r -= 1)
    {
        var left = array[i];
        var right = array[r];
        left ^= right;
        right ^= left;
        left ^= right;
        array[i] = left;
        array[r] = right;
    }
    return array;
}


function xorSwapHalf(array)
{
    var i = null;
    var r = null;
    var length = array.length;
    for (i = 0; i < length / 2; i += 1)
    {
        r = length - 1 - i;
        var left = array[i];
        var right = array[r];
        left ^= right;
        right ^= left;
        left ^= right;
        array[i] = left;
        array[r] = right;
    }
    return array;
}


function destructuringSwap(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        [array[left], array[right]] = [array[right], array[left]];
    }
    return array;
}


function destructuringSwapHalf(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0; left < length / 2; left += 1)
    {
        right = length - 1 - left;
        [array[left], array[right]] = [array[right], array[left]];
    }
    return array;
}


for (length -= 2; length > -1; length -= 1)
{
    array.push(array[length]);
    array.splice(length, 1);
}



