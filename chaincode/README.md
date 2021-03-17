# Instruction of integrating chaincode to end-to-end app in specific VM
## Set up chaincode on specific VM (GCP) on top of backend and frontend
1. In GCP, clone the EVCharger git repo 

2. Copy <em>chaincode</em> directory into  <em>fabric-samples/chaincode/ </em>

3. Create <em>EVCharger</em> directory to contain chaincode 

3. In /chaincode// directory , run  `$ npm install `
 
4. Run 
`$ node enrollAdmin.js`

5. Run startFabric.sh file 
 `$ ./startFabric.sh`

6. Create EVChargerApp/ directory and move frontend/ and backend/ directory. 
 `$ ..... [something here]`


7. Inside /backend// directory, create /wallet/ directory and copy [identityUser]  from /chaincode directory 


8. Inside /backend// directory, create /gateway/ directory and copy [connection-profile.json] from [/testnetworkorganization]// directory 


9. Edit [config.js] in backend/ directory as wallet directory path, wallet directory name, connection directory path, connection directory name, 

`[maybe can copy snipet of code here]`

10. Run  `npm instal`  in <em> backend directory 
 
11. Run `<code>npm start </code>` to monitor the backend services

12. In GCP’s interface,  edit firewall rules to allow matching port (8000) to backend 

14. Test API backend call on GCP’s VM  

`curl —request POST localhost:8000/device/register —header ‘Content-Type: application/json’ —data-raw ‘{“brand”: “Microsoft”,”model”: “Two”,”Mac”: “89:334:00:89”,”powerType”: “AC”,”location”: {“long”: “56”,”lat”: “45”}}’`
Result: 
[maybe screenshot]

15. Edit  [config.js ] by server IP to the IP  in GCP’s interface …. 
`[maybe can copy snipet of code here]`

15. Run `npm install`  in / frontend/ directory 
 
11. Run <code>npm start </code> to see front-end interaction 

12. Similar to the equivalent step in frontend of GCP’s interface,  edit firewall rules to allow matching port (3000) to frontend
---
##  Instruction/ Animation for configurations within GCP ???




