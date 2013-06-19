

Template.characterList.characters = function () {
  return Characters.find({}, {sort: {acted: 1, initiative: 1}});
};
