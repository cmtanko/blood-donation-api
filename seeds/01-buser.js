exports.seed = function (knex, Promise) {
  var tblName = 'buser';

  var rows = [
   
  ];

  return knex(tblName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tblName);
    });
};
