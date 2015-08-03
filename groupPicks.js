
var ThesisGroups = function(nameList, groupSizes){
  this.nameList = nameList;
  this.groupSizes = groupSizes;
  this.pickMatrix = [];
  this.finalGroups = [];
  this.rankedArray = [];
  this.assignedNames = {};
  this.sortedRanks=[];
  this.groupCumulativePicks=[];
}

ThesisGroups.prototype.sortRanks = function(){
  var temp = this.rankedArray.slice();
  this.sortedRanks = temp.sort(function(a, b){return b-a});
  console.log("sortedRanks", this.sortedRanks)
};


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

ThesisGroups.prototype.addGroupPicks = function(name, groupNumber){
  var pickerColIndex = this.nameList.indexOf(name);

  if(this.groupCumulativePicks.length===0
    || !this.groupCumulativePicks[groupNumber]
    ){
  // First time through for generation
   this.groupCumulativePicks[groupNumber]=[];
   for(var i = 0; i< this.nameList.length; i++){
     if(this.pickMatrix[i][pickerColIndex] === 1){
       this.groupCumulativePicks[groupNumber].push(1);
     }else{
       this.groupCumulativePicks[groupNumber].push(0);
      }
    }
  }else{
  for(var i = 0; i< this.nameList.length; i++){
    //var pickeeRowIndex = this.nameList.indexOf( name);

    if( (this.pickMatrix[i][pickerColIndex]) === 1
      || (this.groupCumulativePicks[groupNumber][i]===1 )){
      this.groupCumulativePicks[groupNumber][i]=1;
    }else{
      this.groupCumulativePicks[groupNumber][i]=0;
      }
    }

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


ThesisGroups.prototype.assignRoundOne = function(){
  var max = this.nameList.length;

  //Seed first one person in each group
  for(var g = 0; g <this.groupSizes.length; g++){
    var groupNotSeeded = true;
    var currentRanking = this.sortedRanks[this.sortedRanks.length - 1]
     //find index of fewest rankings

     for(var j = 0; j< max; j++){ //steps through People
      var currentPerson = this.nameList[j];

      if((this.rankedArray[j] === currentRanking) && (!this.assignedNames[currentPerson])
         && groupNotSeeded){

              var currentGroup = this.finalGroups[g]
              this.assignedNames[currentPerson] = true;
              this.sortedRanks.pop();

              this.finalGroups[g].push(currentPerson);
              console.log(currentPerson, " assigned to ", g);
              //Need to add this person's pick to group picks
              this.addGroupPicks(currentPerson, g);
              console.log("GroupCumPicks: ", this.groupCumulativePicks[g]);
              groupNotSeeded = false;
            }
          }
          console.log("FirstRounds updated: ", this.finalGroups)
        }

  //console.log("Final Groups, Round 1: ", this.finalGroups);
  console.log("sortedRanks: ", this.sortedRanks)
};

ThesisGroups.prototype.assignNextRounds = function(){
  var max = this.nameList.length;

  for(var g = 0; g <this.groupSizes.length; g++){
    //Look up seeded person's picks
    var seededPerson = this.finalGroups[g][this.finalGroups[g].length-1];
    var seededIndex = this.nameList.indexOf(seededPerson);
    var seededsPicks = this.pickMatrix[seededIndex];
    //console.log("Seeded: ", seededPerson, seededIndex, this.pickMatrix[seededIndex]);

    var groupNotSeeded = true;
    //var currentRanking = this.sortedRanks[this.sortedRanks.length - 1]
     //find index of fewest rankings

     for(var j = 0; j< max; j++){ //steps through People
      var currentPerson = this.nameList[j];
      //debugger;
      if(
            //(this.rankedArray[j] === currentRanking)
         //&&
         (!this.assignedNames[currentPerson])
         && (groupNotSeeded)
         && (seededsPicks[j]===1 )
         && (this.finalGroups[g].length < this.groupSizes[g])
         ){
        //assign group
        //var randomGroupIndex = randomGroup(groupSizes.length);
              var currentGroup = this.finalGroups[g]
              this.assignedNames[currentPerson] = true;
              //this.sortedRanks.pop();

              this.finalGroups[g].push(currentPerson);
              console.log(currentPerson, " assigned to ", g);
              this.addGroupPicks(currentPerson, g);
              console.log("GroupCumPicks: ", this.groupCumulativePicks[g]);
              groupNotSeeded = false;
            }
          }
          //console.log("NextRounds updated: ", this.finalGroups)
        }
};

ThesisGroups.prototype.assignGroups = function(){
  console.log("Final Final Groups: ", this.finalGroups);
};


ThesisGroups.prototype.groupsFullCheck= function(){
  var currentGroups = this.finalGroups;
  var expectedGroups = this.groupSizes;
  for(var i = 0; i < currentGroups.length; i++){
    if(currentGroups[i].length !== expectedGroups[i].length){
      return false;
    }
    return true;
  }
}


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
  MKS19.sortRanks();
  MKS19.assignRoundOne();
  MKS19.assignNextRounds();
  MKS19.assignNextRounds();
  MKS19.assignNextRounds();
  MKS19.assignNextRounds();

  console.log("FinalFinal Groups: ", MKS19.finalGroups);
  console.log("assignedNames: ", MKS19.assignedNames);
}

buildGroups();



