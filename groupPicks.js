
var ThesisGroups = function(nameList, groupSizes){
  this.nameList = nameList;
  this.groupSizes = groupSizes;
  this.pickMatrix = [];
  this.finalGroups = [];
  this.rankedArray = [];

}

ThesisGroups.prototype.generateMatrix = function(nameList){
  var size = this.nameList.length;

  var zeroArray =[];
  for(var i =0; i< size; i++){
    for(var j = 0; j < size; j++){
      zeroArray.push(0);
    }
    this.pickMatrix.push(zeroArray);
    zeroArray=[];
  }
};

ThesisGroups.prototype.generateFinalGroups= function(groupSizes){
  var zeroArray =[];
  for(var i =0; i< groupSizes.length; i++){
    this.finalGroups.push(zeroArray);
    zeroArray=[];
  }
}

ThesisGroups.prototype.addPicks = function(name, indivPicks){
  //indivPicks needs to be an array of names
  var pickerColIndex = this.nameList.indexOf(name);

  for(var i = 0; i< indivPicks.length; i++){
    var pickeeRowIndex = this.nameList.indexOf( indivPicks[i] );
    this.pickMatrix[pickeeRowIndex][pickerColIndex] = 1;
  }
}

ThesisGroups.prototype.pickedRanksCondensed = function(){
  var size = this.nameList.length;
  var finalRank = 0


  for(var i = 0; i< size; i++){
    // Rows per name
    var finalRank = 0
    for(var j = 0; j < size; j++){
      //Col per picker
      finalRank += this.pickMatrix[i][j];
    }
    this.rankedArray.push(finalRank);
  }
  console.log("Final condensed: ", this.rankedArray)
};


ThesisGroups.prototype.assignGroups = function(){
  var max = this.nameList.length;
  var assignedNames = {};
  //Seed first two people in each group
  for(var gn = 0; gn < 5; gn++){
  for(var i = 0; i< max; i++){ //lowest value in rankedArray
    //find index of fewest rankings
    for(var j = 0; j< max; j++){ //steps through People
      var currentPerson = this.nameList[j];
      //console.log("current: ", currentPerson, "assigned: ", assignedNames[currentPerson] );
      if((this.rankedArray[j] === i) && (!assignedNames[currentPerson])){
        //assign group
        //var randomGroupIndex = randomGroup(groupSizes.length);
        var currentGroup = this.finalGroups[gn]
        //check if group is full
        //console.log("Group", randomGroupIndex, " length checks: ", currentGroup.length, groupSizes[randomGroupIndex]);
        if((!assignedNames[currentPerson]) ){
        //find one of their ranked people
          for(var k = 0; k < this.nameList.length; k++){
            if((this.pickMatrix[j][k]===1) && (!assignedNames[this.nameList[k]])){
              assignedNames[currentPerson] = true;
              assignedNames[this.nameList[k]] = true;

              this.finalGroups[gn].push(currentPerson);
              this.finalGroups[gn].push(this.nameList[k]);
              console.log("Assigned people: ", assignedNames)
              console.log(currentPerson, " and ", this.nameList[k], " assigned to ", gn);
              console.log("FinalGroup updated: ", this.finalGroups)

            }
          }
          console.log("FinalGroup updated: ", this.finalGroups)
        }
        }
      }
    }
  }

  console.log("Final Final Groups: ", this.finalGroups);
};

ThesisGroups.prototype.assignRoundOne = function(){};

ThesisGroups.prototype.assignNextRounds = function(){};




ThesisGroups.prototype.randomGroup= function(size){
  return  Math.floor(size * Math.random())
}

var buildGroups = function(){
  var mks19 = ["Suzanne", "Shu", "Matt", "Carter", "Jason", "Ricky", "David",
      "Brendan", "Adi", "Colin", "Ian", "Thomas", "Patrick", "James", "Chris",
      "Ryan", "Mike", "Jim", "Yoshi", "Richie", "Vincent", "Stephen"];

  var MKS19 = new ThesisGroups(mks19, [5,5,4,4,4])

  MKS19.generateMatrix(mks19);
  MKS19.generateFinalGroups([5,5,4,4,4]);

 // Generate random picks
    for(var i = 0; i < mks19.length; i++){
      var localPicks = [];
      for(var j = 0; j<6; j++){
        var randomPerson = MKS19.randomGroup(mks19.length);
        localPicks.push( mks19[randomPerson])
      }
      MKS19.addPicks(mks19[i], localPicks);
    }
  MKS19.pickedRanksCondensed();
  MKS19.assignGroups();
}

buildGroups();



