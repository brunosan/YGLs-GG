window.onload = function() { init(); };

var public_spreadsheet_url = '1GD_kSSKe_bIdV_AAwAA9IZ-YmGg9V8f4AqWvmVd9xYA';
var data;

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
    callback: showInfo,
    simpleSheet: true } );
  RenderGoals();
}

function showInfo(data, tabletop) {
    console.log(data);
    updateGoals(data);
}

function goal_html_block(goal){
    goal=("00" + goal).substr(-2,2);
    return '<div class="col-sm-2 col-xs-6 thumb " > <button class="thumbnail"  data-toggle="modal" data-target="#goal-modal" data-goal="'+goal+'" >     <img src="images/TGG_Icon_Color_'+goal+'.png" class="img-responsive"  alt=""> <span id="goal-'+goal+'-note"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Loading</span> </button> </div>';
}
function YGL_list_html_block(ygl,num){
   return '<tr><th scope="row">'+ygl+'</th><td>'+num+'</td></tr>';
 }

function RenderGoals(){

  for(i = 1; i < 18; i++) {
    $( "#goal-list" ).append( goal_html_block(i) );
  }
}

function updateGoals(data){

  // Init variables on template
  var YGLs = {};
  var Goals = {};
  var Goals_text = {};
  for(i = 0; i <= 17; i++) Goals[i]=0;

  //Parse responses filling YGLs and Goals
  for(i = 0; i < data.length; i++) {
    var response = data[i];
    console.log(response);
    var responseGoals = response["Global Goal"].split(',');
    YGLs[response["YGL PoC"]] = ( YGLs[response["YGL PoC"]] || 0) +1;
    for(j = 0; j < responseGoals.length; j++) {
      var responseGoal = responseGoals[j].trim().split('-')[0];
      Goals[responseGoal] = (Goals[responseGoal] || 0) + 1;
    }
    console.log("DUMP: ",response," Response Goals: ",responseGoals," Goals: ",Goals," YGLS: ",YGLs);
  }

  //UPDATE THE LSIT
  for (var key in YGLs){
    $( "#YGLlist" ).append( YGL_list_html_block( key,YGLs[key] ));
  }
  for (var key in Goals){
    var pkey =("00" + key).substr(-2,2);
    $("#goal-"+pkey+"-note").text(Goals[key]+" Projects");
  }

  $('#goal-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var goal = button.data('goal'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('Projects for Goal' + goal);
    console.log(data);
  });


}