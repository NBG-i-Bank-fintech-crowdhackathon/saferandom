var dbPool = require("../../db/DBPool"),
    Auth = require("../../utils/auth");

module.exports = function(req, res, next){
    dbPool.getConnection(function(error, connection){
        if (error) return next(error);
        var post = req.body,
            onlyMine = post && post.mine == "true",
            searchTitle = post && post.keyword && post.keyword.trim().length ? post.keyword.trim() : null;
        console.log("Get contests", post, onlyMine, searchTitle, Auth.loggedIn);
        if (onlyMine && !Auth.loggedIn) {
            return next("Login");
        }
        var query = 'SELECT * FROM `contest`\n',
            params = [],
            whereAdded = false;
        if(onlyMine){
            query+= "Where organizer_id = ?";
            params.push(Auth.user.id);
            whereAdded = true;
        }
        if(searchTitle != null){
            query += (whereAdded ? " And" : "Where") + " title Like ?";
            params.push(searchTitle + "%");
        }
        console.log(query, params);
        connection.query(query, params, function(err, rows) {
            if (err) return next(err);
            console.log('The rows: ', rows);
            res.send(rows);
            connection.release();
        });
    });
};