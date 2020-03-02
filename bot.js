const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {

    var mes = receivedMessage.content.toLowerCase();
    var pers;
    var allPers = [];
    var prevrole;
    var prevroleAll = [];

    switch (mes) {
         case "!speak":
	 var rand = Math.ceil(Math.random()*3); //Generates a random number 1-3
             switch (rand) {
                case 1:
                    receivedMessage.channel.send("`Hello.`")
                    break;
                case 2:
                    receivedMessage.channel.send("`Helperbot 5000 is currently online.`")
                    break;
                case 3: 
                    receivedMessage.channel.send("`Type !commands for all commands.`")
                    break;
             }
             break;
         case "!help":
             receivedMessage.channel.send("`I offer no help.`")
             break;
         case "!stop":
             receivedMessage.channel.send("`You can't stop me.`")
             break;
         case "no":
             receivedMessage.channel.send("`What do you mean, no??`")
             break;
         case "!whoisright": //Settle arguments
             var flip = Math.ceil(Math.random()*2);
             if (flip == 1) {
                 receivedMessage.channel.send("`Person 1 is right`");
             } else if (flip == 2) {
                 receivedMessage.channel.send("`Person 2 is right`");
             }
             break;
	 case "!commands":
	     receivedMessage.channel.send("`COMMANDS: !speak, !help, !stop, no, !whoisright, !convert [message], !ban [username] [4 digit timer in seconds]`");
	     break;
    }
    if(mes.substring(0, 8) == "!convert"){ //Takes in a string and turns it into emojis
	 var text = mes.substring(9);
         var outputText = "";
	 for(var i=0; i<text.length; i++) {
	      if(text.substring(i, i+1) == " ") {
	           outputText = outputText + ":red_circle:";
              } else {
		   outputText = outputText + ":regional_indicator_" + text.substring(i, i+1) + ": ";
              }
	 }
	 receivedMessage.channel.send(outputText)
    }
    if(mes.substring(0, 4) == "!ban"){ //Restrict a user's access to the server for a specified time period by taking away all ranks and restoring them
	 if(receivedMessage.member.highestRole.id == 380520431876046862 || receivedMessage.member.highestRole.id == 380537644930826240){ //Check if the user calling has enough privilege
	      if(mes.substring(5, 20) == "helperbot 5000"){
	         receivedMessage.channel.send("`You cannot ban me.`");   
              }
	      if(mes.substring(5, 8) == "all"){ //Bans all members of lower-ranks for a specified time interval
                   receivedMessage.channel.send("`Begone!`");
		   var time = parseInt(mes.substring(mes.length-3, mes.length), 10);
		   var people = receivedMessage.guild.members.array();
	           for(var i=0; i<people.length; i++){
			allPers[i] = people[i];
		        prevroleAll[i] = people[i].highestRole.id;
			people[i].removeRoles(['569676657351458818', '380928365063831553', '433480373435891713', '512093579485773824']);
		   }
                   setTimeout(waitAll, time*1000);
		   function waitAll() {
		        for(var i=0; i<allPers.length; i++){
			     allPers[i].addRole(prevroleAll[i]);
			}
		   }
	      }
	      var usern = mes.substring(5, mes.length-5).toLowerCase();
	      var people = receivedMessage.guild.members.array();
	      for(var i=0; i<people.length; i++){ //Search for the specified user
                   if(usern == people[i].user.username.toLowerCase() && mes.substring(5, 20) != "helperbot 5000"){
			receivedMessage.channel.send("`Scanning...`");
			receivedMessage.channel.send("`Found you. Banned!`");
			prevrole = people[i].highestRole.id;
			var time = parseInt(mes.substring(mes.length-3, mes.length), 10);
			pers = people[i];
			people[i].removeRoles(['569676657351458818', '380928365063831553', '433480373435891713', '512093579485773824']);
			setTimeout(wait, time*1000);
			function wait() {
			     pers.addRole(prevrole);
			}
		   }
	      }
         }else{
              receivedMessage.channel.send("`You lack permission.`");
         }
    }
})

client.on('ready', () => {
    var generalChannel = client.channels.array(); // Replace with known channel ID
})