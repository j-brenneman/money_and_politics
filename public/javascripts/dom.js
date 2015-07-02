var about = document.getElementsByClassName('showBio');
var bio = document.getElementsByClassName('bio');
var connect = {};

for (var i = 0; i < about.length; i++) {
  connect[about[i].id] = bio[i];
  about[i].addEventListener('click', function () {
    connect[this.id].style.display = 'inline-block';
  });
}
