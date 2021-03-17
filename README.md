# Electric Vehicle Charger Registry

<h2> Project Description </h2>
A blockchain registry for  Electric Vehicle Charging Stations. The system will track, manage and enable accurate and reliable 
data sharing on an open platform where operators provide stations to serve owners of electric vehicles and all the participants are protected from unfair practises.
<hr>
<h2> Network participants </h2>
<ol>
    <li> <strong> Service Providers: </strong>
        Investors who purchased EV Charging equipment from manufacturers and rented a location in a 
        parking lot for hosting these chargers.
    </li>
    <li> <strong> Controller: </strong>
        A parking lot owner that hosts those devices or a utility company to which the device is connected
    </li>   
    <li> <strong> Users: </strong>
        Owners of electric vehicles who visit a location to charge their vehicles.
    </li>  
</ol>
<hr>

<h2> Problem </h2>
With the improvement in battery technology, and incentives from various governments we are seeing an increase in demand 
for electric vehicles. An open blockchain platform to cater for more Charging Station, tracking and managing them in an
environment with multiple participating Service Provider will be very useful.
<hr>

<h2> Goal </h2>
The goal of this project is to develop an open platform with tamper-proof data for collaboration between 
EV Charging Equipment Manufacturers, Vehicle Manufacturers, and Service Providers to meet the charging needs of 
growing Electric Vehicle Owners.
<hr>

<h2> Stakeholders </h2>
<ul>
    <li> <strong> Vehicle Manufacturers: </strong> Makers of Electric Vehicles. </li>
    <li> <strong> EV Charger Manufacturers : </strong>   EV Charging Stations Manufacturers. </li>
    <li> <strong> Service Providers : </strong>   Owners of EV Charging Stations. </li>    
    <li> <strong> Users: </strong>   Electric Vehicle Owners. </li>
    <li> <strong> Development Team </strong>  </li>
</ul>


<h2> Team </h2>

| Name                | Designation        |
|------------------	|------------------	|
| Moayyad Alfaris    | Development Team    |
| Oluwaseun Soetan    | Development Team    |
| Trung Ngo            | Development Team    |
| Temple Okosun        | Development Team    |

<br><hr>

<h2> Measuring Success </h2>
<ul>
    <li> A user should be able to determine the availability of charging stations for use within a 
    specific geographic location 
    </li>
    <li> Having zero data breach incidence related to devices and controllers </li>
</ul>
<hr>

<h2> Transition descriptions </h2>
<h3> Transition Functions </h3>
<ul>
    <li> Register Controller </li>
    <li> Update Controller </li>
    <li> Register Device </li>
    <li> Assign Controller </li>
    <li> Change Controller </li>
    <li> Execute Device Command  </li>
    <li> Update Device </li>
    <li> Update Device Status </li> 
</ul>

<h3> Other Functions </h3>
<ul>
    <li> Get All Controllers </li>
    <li> Get Device Controller </li>
    <li> Get Device Logs </li>
    <li> Get Controller Devices </li>
    <li> Change Controller </li>
    <li> Execute Device Command  </li>
    <li> Get Device </li>
    <li> Get All Devices </li> 
</ul>
<br>

<h2> Transition Functions Details </h2>

| Function Name           	| Input                                                                	| Output       	| Role                              	| Description                                  	|
|-------------------------	|----------------------------------------------------------------------	|--------------	|-----------------------------------	|----------------------------------------------	|
| Register Controller     	| Controller ID <br>Controller Name <br>Service Provider <br>Location  	| None         	| Super System (Administrator <br>  	| Registers new controller.                    	|
| Update Controller       	| Location <br>Service Provider                                        	| None         	| Super System <br>                 	| Updates controller details.                  	|
| Register Device         	| Device ID <br>Brand <br>Model <br>MAC <br>Power Type <br>Location    	| None         	| Super System <br>                 	| Registers a new device.                      	|
| Assign Controller       	| Device ID <br>Controller ID                                          	| None         	| Super System <br>                 	| Assigns the device to the first controller.  	|
| Change Controller       	| Device ID <br>Controller ID                                          	| None         	| Super System <br>                 	| Assigns the device to a new controller.      	|
| Execute Device Command  	| Device ID <br>Command                                                	| Result <br>  	| Controller Adminstrator           	| Sends a command for execution on a device.   	|
| Update Device           	| Device ID <br>Current Temperature                                    	| None         	| Device                            	| Update device information                    	|
| Update Device Status    	| Device ID <br>In Use                                                 	| None         	| Device                            	| Update if the device is in use.              	|
<br>

---

<h2> Other Functions Details </h2>

| Function Name           	| Input               	| Output                                       	| Role                         	| Description                                             	|
|-------------------------	|---------------------	|----------------------------------------------	|------------------------------	|---------------------------------------------------------	|
| Get All Controllers     	| None                	| Array of Controller ID                       	| Super System <br>            	| Returns all the registered controllers in the network.  	|
| Get Device Controller   	| Device ID           	| Controller ID                                	| Device                       	| Returns who controls this device.                       	|
| Get Device Logs         	| Device ID           	| Array of Logs                                	| Controller                   	| Returns log data from a device.                         	|
| Get Controller Devices  	| Controller ID <br>  	| Array of Controller Devices                  	| Controller <br>Super System  	| Returns list of devices of a particular controller.     	|
| Get Device              	| Device ID <br>      	| Brand <br>Model <br>Power Type <br>Location  	| User                         	| Return device information to a user.                    	|
| Get All Devices         	| None                	| Array of Device ID                           	| Super System                 	| Returns a list of all devices.                          	|
<br>
---

<h2> State data descriptions </h2>
<h3> Controller </h3>
<ul>
    <li> Controller </li>
    <li> Controller ID </li>
    <li> Controller Name </li>
    <li> Location (Long, Lat) </li>
    <li> Service Provider </li>
    <li> Devices : [
                    Device ID, 
                    Device Log History [ ]
                ]
    </li>
</ul>

| Field Name                	| Type            	| Example    	|
|---------------------------	|-----------------	|------------	|
| Controller ID             	| Number          	| 1234       	|
| Controller Name           	| String          	| “”         	|
| Location                  	| [float, float]  	| Long, Lat  	|
| Service Provider          	| Number          	| 1234       	|
| Devices                   	| Array           	| []         	|
|      Device ID            	| Number          	| 1234       	|
|      Device Log History   	| Array           	| []         	|
|            Log            	| String          	| “”         	|
<br><hr>

<h3> Device </h3>
<ul>
    <li> Device ID (Unique Identifier) </li>
    <li> Brand </li>
    <li> Model </li>
    <li> MAC Address  </li>
    <li> Location (Long, Lat) </li>
    <li> Status (On/Off)  </li>
    <li> Last seen (Date/Time) </li>
    <li> Power Type (AC/DC) </li>
    <li> Current Temp (in Celsius)  </li>
    <li> In use (Charging or Not) </li>
    <li> Last executed command  </li>
    <li> Last execution date/time </li>
    <li> Controller ID </li>
</ul>

| Field Name         	| Type          	| Example                               	|
|--------------------	|---------------	|---------------------------------------	|
| Device ID          	| Number        	| 123                                   	|
| Brand              	| String        	| “”                                    	|
| Model              	| String        	| “”                                    	|
| MAC Address        	| String        	| Format: “ABC-123-XYZ”                 	|
| Location           	| Float, Float  	| Long, Lat                             	|
| Status             	| Boolean       	| On = True, Off = False                	|
| Last seen          	| Date/Time     	|                                       	|
| Power Type         	| String        	| AC or DC                              	|
| Current Temp       	| Double        	| In Celsius                            	|
| In use             	| Boolean       	| True for charging, False of stand by  	|
| Last Command       	| String        	| Command text                          	|
| Last Command Date  	| Date/Time     	|                                       	|
| Controller ID      	| Number        	| 123                                   	|
<br>
---
<h2> Role Descriptions </h2>
<ul>
    <li> Controller </li>
    <li> Device </li>
    <li> Super System  </li>
    <li> User  </li>
</ul>

| Role          	| Description                                               	| Access Rights                                                	|
|---------------	|-----------------------------------------------------------	|--------------------------------------------------------------	|
| Controller    	| A controller device for multiple EV Chargers.             	| Read and write access to device including execute commands.  	|
| Device        	| An EV Charger Device.                                     	| Read access to device data.                                  	|
| Super System  	| Main terminal that carries out administrative functions.  	| Read and write access to controllers.                        	|
| User          	| EV Charger user                                           	| Read access to a device.                                     	|
<br>
---
<h2> Blockchain Architectural Diagrams </h2>

![alt text](documentation/IOTRegStateDiagram.png?raw=true) <br>

![alt text](documentation/EVCharger-HLF.png?raw=true) <br>

![alt text](documentation/BlockchainArchitecture.png?raw=true) <br>

---
<h2> BACKEND – RESTful API endpoints </h2>

| Endpoint     	| Path            	| HTTP method 	| Query input                                                                   	| Output                        	|
|--------------	|-----------------	|-------------	|-------------------------------------------------------------------------------	|-------------------------------	|
| /controller  	| /all <br>       	| GET         	| None                                                                          	| Object - All controllers      	|
|              	| /register       	| POST        	| controllerName,<br>serviceProvider,<br>location.long,<br>location.lat         	|  success/fail                 	|
|              	| /update         	| POST        	| controllerID,<br>serviceProvider, <br>location.long, <br>location.lang        	|  success/fail                 	|
|              	| /change         	| POST        	| deviceID, <br>newControllerID                                                 	|  success/fail                 	|
|              	| /assign         	| POST        	| deviceID, <br>controllerID                                                    	| success/fail                  	|
|              	| /devices        	| GET         	| id                                                                            	| Object - Controller's devices 	|
| /devices     	| /all            	| GET         	|                                                                               	| Object - All devices          	|
|              	| /id             	| GET         	| deviceId                                                                      	| Object- A device's details    	|
|              	| /update         	| POST        	| deviceId, <br>currentTemp                                                     	| success/fail                  	|
|              	| /updateStatus   	| POST        	| deviceId                                                                      	| success/fail                  	|
|              	| /controller     	| GET         	| deviceId                                                                      	| Object - Controller Id        	|
|              	| /register       	| POST        	| brand, <br>model, <br>mac, <br>powerType,<br>location.long, <br>location.lat  	| success/fail                  	|
|              	| /executeCommand 	| POST        	| deviceId, <br>command                                                         	| success/fail                  	|
<br>
